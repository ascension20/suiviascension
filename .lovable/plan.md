## Plan d'implémentation — Phase 1 bis

### 1. Base de données (1 migration)

Nouvelles tables :
- **planning_events** : `user_id`, `type` (course/quest/ds), `title`, `subject`, `event_date`, `start_time`, `end_time`, `description`, `linked_quest_id`, `source` (manual/ical), `ical_uid`
- **deepwork_sessions** : `user_id`, `started_at`, `ended_at`, `duration_seconds`, `xp_earned`
- **onboarding_data** : `user_id`, `first_name`, `last_name`, `language`, `timezone`, `school_level`, `school_name`, `specialties[]`, `options[]`, `goals`, `activities[]`, `ical_url`, `tutorial_completed`, `engagement_signed`
- **initial_grades** : `user_id`, `subject`, `grade`, `coefficient`

Étendre `profiles` : `ical_url`, `onboarding_completed`, `tutorial_completed`, `today_xp`, `today_xp_date`, `total_deepwork_seconds`, `total_deepwork_sessions`.

RLS standard (élève voit/édite ses données, coach voit tout).

### 2. Planning (`src/components/Planning/`)

- **PlanningMini.tsx** : remplace la to-do list dans le dashboard. Affiche uniquement quêtes + DS de la semaine en cours, vue compacte, bouton "Agrandir".
- **PlanningFull.tsx** (dans un Dialog plein écran ou page dédiée) :
  - Navigation semaine ←/→/aujourd'hui
  - Desktop : grille 7 colonnes
  - Mobile : sélecteur de jour avec badges violet (quêtes) / rouge (DS)
  - Bouton "+" flottant → modal de création
  - Clic événement → modal édition/suppression
  - Couleurs : amber (cours), violet (quête), rose (DS)
  - Affiche aussi les événements iCal (parsés côté client)
- **EventFormModal.tsx** : type toggle, titre, matière, date, heure début/fin (pas 5 min), description.
- **QuestValidationModal.tsx** : durée, difficulté, note, photo (+20%). Animation "+X XP".
- **lib/xp-planning.ts** : calcul XP quête (difficulté × durée, plafond 100/jour via `today_xp`).
- **lib/ical-parser.ts** : utilise `ical.js` pour parser l'URL stockée, filtre semaine courante.

### 3. Deepwork (`src/components/Deepwork/`)

- **DeepworkWidget.tsx** : remplace le Pomodoro en haut du dashboard.
  - Bannière amber, gros bouton circulaire ▶/⏸
  - État inactif : "Lancer une session deepwork", chrono 00:00
  - État actif : bannière "En deep work en ce moment", bouton violet, chrono temps réel, "X min de focus"
  - XP progressif : 0–15 min = 1/min, 15–30 = 2/min, >30 = 3/min
  - À l'arrêt : insert `deepwork_sessions`, MAJ profil, animation "+X XP"
- **DeepworkStats.tsx** (sur profil/dashboard) : cumul heures, nb sessions, graphique 30 jours.

### 4. Onboarding (`src/pages/Onboarding.tsx`)

8 étapes (0–7) avec barre de progression, boutons Précédent/Suivant, scroll top.
- Étape 0 : signup (prénom, nom, email, mdp avec toggle 👁️) → `supabase.auth.signUp`
- Étape 1 : langue + timezone (défauts fr / Europe/Paris)
- Étape 2 : niveau (Collège/2nde/1ère/Term), établissement, spécialités (limites), options
- Étape 3 : objectifs (textarea)
- Étape 4 : grille d'activités multi-select + "Autre" texte libre
- Étape 5 : URL iCal + bouton "Vérifier" (fetch HEAD/parse simple)
- Étape 6 : notes (0–20) + coef par matière, couleurs dynamiques
- Étape 7 : checkbox engagement + "C'est parti" → save tout → `/student`

Redirection : si `onboarding_completed = false`, rediriger vers `/onboarding` depuis App.tsx.

### 5. Tutoriel interactif

- **TutorialOverlay.tsx** : 7 bulles séquentielles, overlay sombre semi-transparent avec trou autour de la cible (via `getBoundingClientRect` + clip-path).
- Étapes : planning, type quête, valider, ajouter DS, deepwork, classement, fin (+15 XP).
- Déclenché si `tutorial_completed = false` après onboarding.

### 6. Audio (placeholders)

- `public/music/lofi.mp3` et `public/music/xp.wav` : téléchargés depuis sources libres (pixabay/freesound CC0).
- Hook `useAudioFeedback` : joue `xp.wav` à chaque gain XP.
- Toggle musique lofi (loop, vol bas) — bouton dans header ou settings. État dans localStorage.

### 7. Intégration Dashboard

`StudentDashboard.tsx` :
- Remplacer `<PomodoroTimer>` par `<DeepworkWidget>`
- Remplacer la Tab "Mes tâches"/Pomodoro slot par `<PlanningMini>` avec bouton agrandir → `<PlanningFull>` en Dialog plein écran
- Garder les autres sections inchangées

### Notes techniques
- Dépendances ajoutées : `ical.js`
- Pas de fichiers `chronometer` supprimés brutalement : on remplace l'usage dans le dashboard, on garde les composants si réutilisés ailleurs
- Toutes les couleurs via tokens (amber, violet, rose existent déjà via tailwind)
- Pas de modification de `src/integrations/supabase/types.ts` (auto-régénéré)

### Ordre d'exécution
1. Migration BDD
2. Onboarding (page + redirection)
3. Deepwork widget + intégration dashboard
4. Planning mini + full + iCal
5. Validation quêtes depuis planning
6. Tutoriel interactif
7. Audio + toggle

Prêt à lancer la migration et le code dès ton OK.
