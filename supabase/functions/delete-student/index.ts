import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Verify caller is a coach
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user: caller } } = await supabaseAdmin.auth.getUser(token);
    if (!caller) return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: roleCheck } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", caller.id).eq("role", "coach").single();
    if (!roleCheck) return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { studentUserId } = await req.json();
    if (!studentUserId) return new Response(JSON.stringify({ error: "studentUserId requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Delete all student data (cascading from auth.users handles profiles, user_roles)
    // But we also need to clean up tables without FK to auth.users
    await Promise.all([
      supabaseAdmin.from("quests").delete().eq("assigned_to", studentUserId),
      supabaseAdmin.from("difficulties").delete().eq("user_id", studentUserId),
      supabaseAdmin.from("exams").delete().eq("user_id", studentUserId),
      supabaseAdmin.from("student_tasks").delete().eq("user_id", studentUserId),
      supabaseAdmin.from("timer_sessions").delete().eq("user_id", studentUserId),
      supabaseAdmin.from("badges").delete().eq("user_id", studentUserId),
    ]);

    // Delete profile and role
    await supabaseAdmin.from("profiles").delete().eq("user_id", studentUserId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", studentUserId);

    // Delete auth user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(studentUserId);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
