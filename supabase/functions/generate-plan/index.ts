import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify caller is coach
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user: caller } } = await supabase.auth.getUser(token);
    if (!caller) return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: roleCheck } = await supabase.from("user_roles").select("role").eq("user_id", caller.id).eq("role", "coach").single();
    if (!roleCheck) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { studentUserId } = await req.json();
    if (!studentUserId) return new Response(JSON.stringify({ error: "studentUserId requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Fetch all student data
    const now = new Date();
    const [profileRes, diffsRes, examsRes, tasksRes, questsRes, sessionsRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", studentUserId).single(),
      supabase.from("difficulties").select("*").eq("user_id", studentUserId).eq("resolved", false).order("created_at", { ascending: false }),
      supabase.from("exams").select("*").eq("user_id", studentUserId).gte("exam_date", now.toISOString().split("T")[0]).order("exam_date", { ascending: true }),
      supabase.from("student_tasks").select("*").eq("user_id", studentUserId).eq("completed", false),
      supabase.from("quests").select("*").eq("assigned_to", studentUserId).eq("completed", false),
      supabase.from("timer_sessions").select("*").eq("user_id", studentUserId).gte("created_at", new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    const profile = profileRes.data;
    const diffs = diffsRes.data || [];
    const upcomingExams = examsRes.data || [];
    const pendingTasks = tasksRes.data || [];
    const pendingQuests = questsRes.data || [];
    const recentSessions = sessionsRes.data || [];

    // Calculate hours by subject over last 2 weeks
    const hoursBySubject: Record<string, number> = {};
    let totalMinutes = 0;
    recentSessions.forEach((s: any) => {
      hoursBySubject[s.subject] = (hoursBySubject[s.subject] || 0) + s.duration_minutes;
      totalMinutes += s.duration_minutes;
    });

    // Get past grades for context
    const { data: pastExams } = await supabase.from("exams").select("subject, grade").eq("user_id", studentUserId).not("grade", "is", null);
    const gradesBySubject: Record<string, number[]> = {};
    (pastExams || []).forEach((e: any) => {
      if (!gradesBySubject[e.subject]) gradesBySubject[e.subject] = [];
      gradesBySubject[e.subject].push(e.grade);
    });
    const averages: Record<string, number> = {};
    Object.entries(gradesBySubject).forEach(([s, g]) => {
      averages[s] = Math.round((g.reduce((a, b) => a + b, 0) / g.length) * 10) / 10;
    });

    const prompt = `Tu es un coach scolaire expert. Génère un plan de travail pour la semaine à venir pour cet élève.

PROFIL :
- Pseudo : ${profile?.pseudo || "Élève"}
- Niveau : ${profile?.total_xp || 0} XP, série de ${profile?.streak || 0} jours
- Heures travaillées (2 dernières semaines) : ${Math.round(totalMinutes / 60)}h
- Répartition par matière : ${Object.entries(hoursBySubject).map(([s, m]) => `${s}: ${Math.round(m / 60)}h`).join(", ") || "Aucune donnée"}

MOYENNES PAR MATIÈRE :
${Object.entries(averages).map(([s, a]) => `- ${s}: ${a}/20`).join("\n") || "Aucune note disponible"}

DS À VENIR :
${upcomingExams.map((e: any) => {
  const days = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return `- ${e.subject} dans ${days} jours (${e.exam_date})${e.chapters ? ` — Chapitres: ${e.chapters}` : ""}${e.stress_level === "stressed" ? " ⚠️ STRESSÉ" : ""}`;
}).join("\n") || "Aucun DS prévu"}

DIFFICULTÉS OUVERTES :
${diffs.map((d: any) => `- ${d.subject} (${d.severity}): ${d.description}`).join("\n") || "Aucune difficulté signalée"}

QUÊTES EN COURS :
${pendingQuests.map((q: any) => `- ${q.title} (${q.subject}, ${q.xp_reward} XP)`).join("\n") || "Aucune quête"}

TÂCHES PERSO EN COURS :
${pendingTasks.map((t: any) => `- ${t.description} (${t.subject})`).join("\n") || "Aucune tâche"}

INSTRUCTIONS :
1. Propose un plan jour par jour (lundi à dimanche)
2. Adapte la charge selon les DS imminents (prioriser les matières avec DS proche)
3. Donne des créneaux réalistes (25-50min par session, pas plus de 2h/jour)
4. Intègre les difficultés ouvertes dans le plan (exercices ciblés)
5. Si l'élève est stressé pour un DS, propose une session de révision la veille
6. Sois encourageant mais concret
7. Format : utilise des emojis pour les matières, sois structuré avec des bullets points
8. Chaque jour doit avoir un objectif clair

Réponds en français.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Tu es un coach scolaire bienveillant et stratégique. Tu crées des plans de travail personnalisés et motivants." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessaie dans quelques secondes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés. Recharge dans les paramètres." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur IA" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiResult = await response.json();
    const planContent = aiResult.choices?.[0]?.message?.content || "Erreur lors de la génération du plan.";

    // Save the plan
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
    const weekStartStr = weekStart.toISOString().split("T")[0];

    await supabase.from("weekly_plans").insert({
      user_id: studentUserId,
      created_by: caller.id,
      plan_content: planContent,
      week_start: weekStartStr,
    });

    return new Response(JSON.stringify({ plan: planContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-plan error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
