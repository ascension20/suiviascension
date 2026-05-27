import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { fetchICal, parseICal, icalToPlanningEvent } from '@/lib/ical-parser';

type Level = 'Collège' | 'Seconde' | 'Première' | 'Terminale';
const LEVELS: Level[] = ['Collège', 'Seconde', 'Première', 'Terminale'];

const SPECIALTIES = [
  'Mathématiques',
  'Physique-Chimie',
  'SVT',
  'NSI',
  'SES',
  'HGGSP',
  'LLCER Anglais',
  'LLCER Espagnol',
  'LLCER Allemand',
  'LLCER Arabe',
  'LLCER Chinois',
  'Humanités, Littérature et Philosophie (HLP)',
  'Sciences de l\'ingénieur (SI)',
  'Arts plastiques',
  'Arts – Musique',
  'Arts – Cinéma / Audiovisuel',
  'Arts – Théâtre',
  'Arts – Danse',
  'Biologie-Écologie',
  'LCA Latin',
  'LCA Grec',
  'EPPCS',
];
const OPTIONS_LIST = [
  'Latin',
  'Grec ancien',
  'LV3',
  'Section européenne',
  'Section internationale',
  'EPS renforcé',
  'Maths complémentaires',
  'Maths expertes',
  'DGEMC',
  'Arts plastiques',
  'Musique',
  'Cinéma-Audiovisuel',
  'Théâtre',
  'Danse',
  'Informatique',
  'Chef-d\'œuvre',
];

const ACTIVITIES = [
  { key: 'sport', icon: '🏃', label: 'Sport' },
  { key: 'music', icon: '🎵', label: 'Musique' },
  { key: 'art', icon: '🎨', label: 'Art / Dessin' },
  { key: 'theatre', icon: '🎭', label: 'Théâtre' },
  { key: 'reading', icon: '📚', label: 'Lecture' },
  { key: 'coding', icon: '💻', label: 'Coding' },
  { key: 'gaming', icon: '🎮', label: 'Jeux vidéo' },
  { key: 'travel', icon: '✈️', label: 'Voyages' },
  { key: 'volunteer', icon: '🤝', label: 'Bénévolat' },
  { key: 'other', icon: '📈', label: 'Autre' },
];

const BASE_SUBJECTS_BY_LEVEL: Record<Level, string[]> = {
  'Collège':   ['Maths', 'Français', 'Histoire-Géo', 'Anglais', 'SVT', 'Physique-Chimie', 'EPS'],
  'Seconde':   ['Maths', 'Français', 'Histoire-Géo', 'Anglais', 'SVT', 'Physique-Chimie', 'SES', 'EPS'],
  'Première':  ['Français', 'Histoire-Géo', 'Anglais', 'EPS'],
  'Terminale': ['Histoire-Géo', 'Anglais', 'Philosophie', 'EPS'],
};

function getSubjectsForLevel(level: Level | null, specialties: string[], options: string[]): string[] {
  const base = BASE_SUBJECTS_BY_LEVEL[level ?? 'Seconde'] ?? [];
  const extras: string[] = [];
  for (const s of specialties) if (!base.includes(s)) extras.push(s);
  for (const o of options)     if (!base.includes(o) && !extras.includes(o)) extras.push(o);
  return [...base, ...extras];
}

function gradeColor(g: number) {
  if (g >= 16) return 'text-emerald-400';
  if (g >= 14) return 'text-green-400';
  if (g >= 12) return 'text-yellow-400';
  if (g >= 10) return 'text-orange-400';
  return 'text-red-400';
}

export default function OnboardingPage() {
  const { user, refreshProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 0
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // 1
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Paris');

  // 2
  const [level, setLevel] = useState<Level | null>(null);
  const [schoolName, setSchoolName] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  // 3
  const [goals, setGoals] = useState('');

  // 4
  const [activities, setActivities] = useState<string[]>([]);
  const [otherActivity, setOtherActivity] = useState('');

  // 5
  const [icalUrl, setIcalUrl] = useState('');
  const [icalStatus, setIcalStatus] = useState<'idle' | 'checking' | 'ok' | 'error' | 'unverified'>('idle');
  const [icalSkipped, setIcalSkipped] = useState(false);

  // 6
  const [grades, setGrades] = useState<Record<string, { grade: string; coef: string }>>({});

  // 7
  const [engagement, setEngagement] = useState(false);
  const [finalizing, setFinalizing] = useState(false);

  // If already authenticated, skip step 0
  useEffect(() => {
    if (user && step === 0) setStep(1);
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const maxSpecialties = level === 'Terminale' ? 2 : level === 'Première' ? 3 : 0;

  const toggleArr = (arr: string[], v: string, setter: (a: string[]) => void, max?: number) => {
    if (arr.includes(v)) setter(arr.filter(x => x !== v));
    else if (!max || arr.length < max) setter([...arr, v]);
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || password.length < 6) {
      setAuthError('Tous les champs sont requis (mot de passe ≥ 6 caractères).');
      return;
    }
    setSubmittingAuth(true);
    setAuthError('');

    // Step 1 — create the account (ignore "already registered" errors,
    // we'll just sign in with the existing credentials below).
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { pseudo: `${firstName} ${lastName}`, avatar: '🐺' },
      },
    });

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      const isAlreadyExists = msg.includes('already') || msg.includes('registered') || msg.includes('exists');
      if (!isAlreadyExists) {
        // A real error (invalid email, weak password, etc.)
        setAuthError(signUpError.message);
        setSubmittingAuth(false);
        return;
      }
      // Otherwise fall through and try signing in below
    }

    // Step 2 — always sign in to guarantee an active session.
    // This handles: brand-new account, existing account, and the case where
    // signUp succeeds but returns session:null (email confirmation enabled).
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      const msg = signInError.message.toLowerCase();
      if (msg.includes('confirm') || msg.includes('verified') || msg.includes('not confirmed')) {
        setAuthError('✉️ Un email de confirmation a été envoyé à ' + email + '. Confirmez votre adresse puis revenez vous connecter.');
      } else {
        setAuthError(signInError.message);
      }
      setSubmittingAuth(false);
      return;
    }

    const userId = signInData.user?.id;
    if (!userId) {
      setAuthError('Impossible de créer le compte. Veuillez réessayer.');
      setSubmittingAuth(false);
      return;
    }

    // Step 3 — assign the student role (silent fail if already present)
    await supabase.from('user_roles').insert({ user_id: userId, role: 'student' });

    setSubmittingAuth(false);
    setStep(1);
  };

  const checkIcal = async () => {
    if (!icalUrl) return;
    setIcalStatus('checking');
    try {
      // fetchICal already guarantees the response contains BEGIN:VCALENDAR
      // (it falls through all methods and throws if it can't extract calendar data).
      // If it returns → the EDT is readable → show "Lien valide".
      await fetchICal(icalUrl);
      setIcalStatus('ok');
    } catch {
      // Could not extract calendar data (CORS, auth wall, wrong URL, etc.).
      setIcalStatus('unverified');
      setIcalSkipped(true);
    }
  };

  const finalize = async () => {
    if (!engagement) return;
    setFinalizing(true);
    try {
      // Always read the session directly from the Supabase client (localStorage)
      // rather than from the React auth context, which may be stale right after
      // signUp (the context updates asynchronously via onAuthStateChange).
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id ?? user?.id;
      if (!uid) {
        navigate('/login');
        return;
      }

      await supabase.from('onboarding_data').upsert({
        user_id: uid,
        first_name: firstName || null,
        last_name: lastName || null,
        language, timezone,
        school_level: level,
        school_name: schoolName || null,
        specialties, options,
        goals: goals || null,
        activities, other_activity: otherActivity || null,
        engagement_signed: true,
      }, { onConflict: 'user_id' });

      // Initial grades
      const gradeRows = Object.entries(grades)
        .filter(([_, v]) => v.grade !== '')
        .map(([subject, v]) => ({
          user_id: uid, subject,
          grade: Number(v.grade) || null,
          coefficient: Number(v.coef) || 1,
        }));
      if (gradeRows.length) await supabase.from('initial_grades').insert(gradeRows);

      await supabase.from('profiles').update({
        pseudo: firstName ? `${firstName} ${lastName.charAt(0) || ''}`.trim() : undefined,
        class_level: level,
        onboarding_completed: true,
      }).eq('user_id', uid);

      await supabase.from('user_private').upsert({
        user_id: uid,
        ical_url: icalUrl || null,
      }, { onConflict: 'user_id' });

      // Import iCal events into planning_events (3 months ahead).
      // Try even if verification was only 'unverified' — the edge function
      // may succeed during finalize even if it failed during the live check.
      if (icalUrl) {
        try {
          const txt = await fetchICal(icalUrl);
          if (txt.includes('BEGIN:VCALENDAR')) {
            const rangeStart = new Date();
            const rangeEnd   = new Date();
            rangeEnd.setMonth(rangeEnd.getMonth() + 3);
            const parsed = parseICal(txt, rangeStart, rangeEnd);
            if (parsed.length > 0) {
              await supabase.from('planning_events')
                .delete().eq('user_id', uid).eq('source', 'ical');
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const rows = parsed.map(e => { const { id: _id, ...rest } = icalToPlanningEvent(e, uid!); return rest; });
              await supabase.from('planning_events').insert(rows);
            }
          }
        } catch { /* iCal import failures are non-blocking */ }
      }

      // Patch the in-memory profile SYNCHRONOUSLY before navigating.
      // If we called refreshProfile() (async fetch → setProfile) and then
      // navigate() immediately after, React would render StudentDashboard with
      // the STALE profile (onboarding_completed:false) on the first pass →
      // StudentDashboard's effect would redirect back to /onboarding → loop.
      // By updating the profile state directly here, the context is already
      // correct when StudentDashboard renders for the first time.
      updateProfile({ onboarding_completed: true });
      navigate('/student');
    } catch (err) {
      console.error('Onboarding finalize error:', err);
    } finally {
      setFinalizing(false);
    }
  };

  const totalSteps = 7;
  const progressPct = ((step) / totalSteps) * 100;

  const canNext = (() => {
    switch (step) {
      case 0: return false; // handled by signup
      case 2: return !!level;
      case 5: return icalStatus === 'ok' || icalStatus === 'unverified' || icalSkipped;
      case 7: return engagement;
      default: return true;
    }
  })();

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => navigate('/login')} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
          )}
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">{step}/{totalSteps}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card border border-border rounded-xl p-6 md:p-8">
            {step === 0 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Crée ton compte</h1>
                <p className="text-muted-foreground text-sm mb-6">Quelques infos pour démarrer.</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input className="bg-secondary border border-border rounded-md px-3 py-2 text-sm" placeholder="Lucas" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <input className="bg-secondary border border-border rounded-md px-3 py-2 text-sm" placeholder="Martin" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <input type="email" className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm mb-3" placeholder="lucas.martin@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <div className="relative mb-3">
                  <input type={showPwd ? 'text' : 'password'} className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm pr-10" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {authError && <p className="text-destructive text-xs mb-3">{authError}</p>}
                <button onClick={handleSignup} disabled={submittingAuth} className="w-full bg-amber-500 text-white rounded-md py-2.5 text-sm font-medium hover:bg-amber-600 flex items-center justify-center gap-2 disabled:opacity-50">
                  {submittingAuth && <Loader2 size={14} className="animate-spin" />} Créer mon compte
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Déjà un compte ? <button onClick={() => navigate('/login')} className="text-amber-400 hover:underline">Se connecter</button>
                </p>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Langue & Fuseau horaire</h1>
                <p className="text-muted-foreground text-sm mb-6">Pour adapter l'app à toi.</p>
                <label className="text-xs text-muted-foreground mb-1 block">Langue</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm mb-3">
                  <option value="fr">Français</option><option value="en">English</option>
                </select>
                <label className="text-xs text-muted-foreground mb-1 block">Fuseau horaire</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm">
                  <option>Europe/Paris</option><option>Europe/London</option><option>America/New_York</option><option>America/Montreal</option>
                </select>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Parcours académique</h1>
                <p className="text-muted-foreground text-sm mb-6">Pour personnaliser ton suivi.</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {LEVELS.map(l => (
                    <button key={l} onClick={() => { setLevel(l); setSpecialties([]); }}
                      className={`py-2 rounded-md border text-xs font-medium ${level === l ? 'border-amber-500 bg-amber-500/15 text-amber-300' : 'border-border bg-secondary text-muted-foreground'}`}>{l}</button>
                  ))}
                </div>
                <input className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm mb-4" placeholder="Lycée Louis-le-Grand" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
                {maxSpecialties > 0 && (
                  <>
                    <p className="text-xs text-muted-foreground mb-2">Spécialités ({specialties.length}/{maxSpecialties})</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {SPECIALTIES.map(s => (
                        <button key={s} onClick={() => toggleArr(specialties, s, setSpecialties, maxSpecialties)}
                          className={`px-3 py-1.5 rounded-full text-xs border ${specialties.includes(s) ? 'border-amber-500 bg-amber-500/15 text-amber-300' : 'border-border bg-secondary text-muted-foreground'}`}>{s}</button>
                      ))}
                    </div>
                  </>
                )}
                <p className="text-xs text-muted-foreground mb-2">Options</p>
                <div className="flex flex-wrap gap-2">
                  {OPTIONS_LIST.map(o => (
                    <button key={o} onClick={() => toggleArr(options, o, setOptions)}
                      className={`px-3 py-1.5 rounded-full text-xs border ${options.includes(o) ? 'border-amber-500 bg-amber-500/15 text-amber-300' : 'border-border bg-secondary text-muted-foreground'}`}>{o}</button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Tes objectifs cette année</h1>
                <p className="text-muted-foreground text-sm mb-6">Bac avec mention, réussir en maths, intégrer une prépa... Sois honnête !</p>
                <textarea value={goals} onChange={e => setGoals(e.target.value)} rows={6}
                  placeholder="Ex : Je veux décrocher mon bac avec mention Bien, progresser en maths et intégrer une prépa scientifique..."
                  className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
              </>
            )}

            {step === 4 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Tes activités</h1>
                <p className="text-muted-foreground text-sm mb-6">Sélectionne tout ce qui te correspond.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ACTIVITIES.map(a => (
                    <button key={a.key} onClick={() => toggleArr(activities, a.key, setActivities)}
                      className={`p-3 rounded-lg border flex flex-col items-center gap-1 transition ${activities.includes(a.key) ? 'border-amber-500 bg-amber-500/10' : 'border-border bg-secondary'}`}>
                      <span className="text-2xl">{a.icon}</span>
                      <span className="text-xs font-medium">{a.label}</span>
                    </button>
                  ))}
                </div>
                {activities.includes('other') && (
                  <input value={otherActivity} onChange={e => setOtherActivity(e.target.value)} placeholder="Ex : Escrime, bénévolat en refuge..."
                    className="w-full mt-3 bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
                )}
              </>
            )}

            {step === 5 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Emploi du temps 📅</h1>
                <p className="text-muted-foreground text-sm mb-1">Colle ton lien iCal pour synchroniser ton EDT (Pronote, EcoleDirecte, etc.).</p>
                <p className="text-xs text-amber-400/80 mb-4">🎓 En cas de problème pour trouver ton lien, demande de l'aide à ton tuteur.</p>

                {!icalSkipped ? (
                  <>
                    <div className="flex gap-2 mb-2">
                      <input
                        value={icalUrl}
                        onChange={e => { setIcalUrl(e.target.value); setIcalStatus('idle'); }}
                        placeholder="https://... ou webcal://..."
                        className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm"
                      />
                      <button onClick={checkIcal} disabled={!icalUrl || icalStatus === 'checking'}
                        className="px-3 py-2 rounded-md bg-amber-500 text-white text-sm font-medium disabled:opacity-50 flex items-center gap-1">
                        {icalStatus === 'checking' ? <Loader2 size={14} className="animate-spin" /> : 'Vérifier'}
                      </button>
                    </div>

                    {icalStatus === 'ok' && (
                      <p className="text-xs text-emerald-400">✓ Lien valide — ton calendrier sera importé automatiquement.</p>
                    )}
                    {icalStatus === 'error' && (
                      <p className="text-xs text-destructive">❌ Lien invalide ou format non reconnu. Vérifie l'URL.</p>
                    )}
                    {icalStatus === 'unverified' && (
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 mt-1">
                        <p className="text-xs text-emerald-300">
                          ✓ Lien enregistré — les serveurs scolaires (Pronote, EcoleDirecte…) bloquent la vérification depuis le navigateur, c'est tout à fait normal. Ton calendrier sera importé automatiquement.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setIcalSkipped(true)}
                      className="mt-4 text-xs text-muted-foreground hover:text-foreground underline block">
                      Je n'ai pas d'EDT iCal pour l'instant
                    </button>
                  </>
                ) : (
                  <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted-foreground">
                    {icalUrl && (icalStatus === 'unverified') ? (
                      <>✓ Lien enregistré — il sera utilisé pour importer ton EDT.</>
                    ) : (
                      <>EDT non configuré — tu pourras l'ajouter plus tard dans ton profil.</>
                    )}
                    <button onClick={() => setIcalSkipped(false)} className="block mt-2 text-xs text-amber-400 underline">
                      Modifier
                    </button>
                  </div>
                )}
              </>
            )}

            {step === 6 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Premières notes</h1>
                <p className="text-muted-foreground text-sm mb-6">Indique ta dernière note. Laisse vide si tu n'en as pas encore.</p>
                <div className="space-y-2">
                  {getSubjectsForLevel(level, specialties, options).map(s => {
                    const g = grades[s] ?? { grade: '', coef: '1' };
                    const num = Number(g.grade);
                    const color = g.grade ? gradeColor(num) : 'text-foreground';
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="flex-1 text-sm">{s}</span>
                        <input type="number" min={0} max={20} step={0.5} placeholder="—" value={g.grade}
                          onChange={e => setGrades({ ...grades, [s]: { ...g, grade: e.target.value } })}
                          className={`w-20 bg-secondary border border-border rounded-md px-2 py-1.5 text-sm text-center font-bold ${color}`} />
                        <span className="text-xs text-muted-foreground">coef</span>
                        <input
                          type="text" inputMode="decimal" placeholder="1"
                          value={g.coef}
                          onChange={e => setGrades({ ...grades, [s]: { ...g, coef: e.target.value } })}
                          className="w-14 bg-secondary border border-border rounded-md px-2 py-1.5 text-sm text-center" />
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <h1 className="font-display text-2xl font-bold mb-1">Engagement</h1>
                <p className="text-muted-foreground text-sm mb-5">Dernière étape avant de commencer.</p>

                {/* Engagement text */}
                <div className="space-y-3 mb-6 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Prépare-toi à voir{' '}
                    <span className="font-bold text-amber-400">tes notes monter. Dès les prochaines semaines.</span>
                  </p>
                  <p>
                    Le seul effort demandé ici est de{' '}
                    <span className="font-semibold text-foreground">suivre nos méthodes, et être régulier.</span>{' '}
                    Ta discipline, ton organisation, ta moyenne vont décoller, et tu vas le sentir avant même que ton prof te le dise.
                  </p>
                  <p>
                    Gagner{' '}
                    <span className="font-bold text-amber-400">+2, +3 ou +6 points dans sa moyenne</span>
                    , ce n'est pas un rêve : Des centaines d'élèves l'ont fait avant toi, avec les mêmes doutes que toi en ce moment.
                  </p>
                  <p>
                    Tu vas progresser visiblement, semaine après semaine. Tu vas reconnaître des exercices, anticiper les pièges,{' '}
                    <span className="font-semibold text-foreground">comprendre vraiment au lieu d'apprendre par cœur.</span>{' '}
                    Et ce déclic, une fois qu'il est là, plus personne ne te l'enlève.
                  </p>
                  <p className="text-foreground font-semibold border-l-2 border-amber-500 pl-3">
                    La régularité bat le talent. Toujours.
                  </p>
                  <p>
                    Suivre nos méthodes ainsi que les directives de ton tuteur, c'est{' '}
                    <span className="font-bold text-amber-400">le seul coût pour propulser tes notes</span>
                    , et réaliser tes projets scolaires.
                  </p>
                  <p className="font-semibold text-foreground">
                    Dans 3 mois, tu vas regarder ta moyenne et sourire. Dans 6 mois, tu ne te reconnaîtras plus. Allez, on y va. 🚀
                  </p>
                </div>

                <button onClick={() => setEngagement(e => !e)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${engagement ? 'border-amber-500 bg-amber-950/40' : 'border-border bg-secondary'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${engagement ? 'border-amber-500 bg-amber-500' : 'border-muted-foreground'}`}>
                      {engagement && <Check size={14} className="text-black" />}
                    </div>
                    <p className="font-display font-bold text-sm">Je m'engage. La régularité bat le talent. Toujours.</p>
                  </div>
                </button>
                <button onClick={finalize} disabled={!engagement || finalizing}
                  className="w-full mt-4 bg-amber-500 text-white rounded-md py-3 text-sm font-bold hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2">
                  {finalizing && <Loader2 size={14} className="animate-spin" />} C'est parti 🚀
                </button>
              </>
            )}

            {/* Nav buttons */}
            {step > 0 && step < 7 && (
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                <button onClick={() => setStep(s => Math.max(0, s - 1))} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ChevronLeft size={16} /> Précédent
                </button>
                <button onClick={() => setStep(s => Math.min(7, s + 1))} disabled={!canNext}
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-50">
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
