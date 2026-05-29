// ─── Types ────────────────────────────────────────────────────────────────────

export type Tag = 'ia' | 'actif' | 'espace';
export type Icon = '✦' | '◆' | '⏱';

export interface Method {
  icon: Icon;
  title: string;
  desc: string;
  tags?: Tag[];
  hot?: boolean;
}

export interface Category {
  label: string;
  methods: Method[];
}

export interface SubjectCard {
  code: string;
  name: string;
  categories: Category[];
}

export interface GeneralCard {
  title: string;
  desc: string;
  hot?: boolean;
}

export interface GeneralSection {
  title: string;
  cards: GeneralCard[];
}

export interface Prompt {
  title: string;
  scope: string;
  text: string;
}

export interface PromptGroup {
  label: string;
  prompts: Prompt[];
}

// ─── GÉNÉRAL ─────────────────────────────────────────────────────────────────

export const GENERAL_SECTIONS: GeneralSection[] = [
  {
    title: `🧠 Mémoriser intelligemment`,
    cards: [
      {
        hot: true,
        title: `La révision active, pas passive`,
        desc: `Relire ses cours ne sert <strong>presque à rien</strong>. Ce qui ancre durablement : se tester, reformuler, reproduire sans support. <strong>La règle : si tu n'as pas fermé ton cours pour te tester, tu n'as pas révisé.</strong> Ferme, teste-toi, vérifie ce qui manque, recommence.`,
      },
      {
        hot: true,
        title: `La répétition espacée (Anki)`,
        desc: `Le cerveau oublie selon une courbe prévisible. <strong>Réviser juste avant d'oublier</strong> = mémorisation longue durée avec un minimum d'effort. Installe Anki, crée tes flashcards (ou génère-les avec l'IA), fais 15 min par jour. Un lycéen qui utilise Anki sérieusement <strong>a 3x moins à réviser en période d'exam</strong> qu'un lycéen qui ne l'utilise pas.`,
      },
      {
        title: `Le journal d'erreurs`,
        desc: `Un cahier dédié : chaque erreur → <strong>type d'erreur → cause racine → règle à retenir</strong>. Relis ce journal la veille de chaque exam, pas tes cours. Ce que tu rates régulièrement = ce qui peut te coûter des points. Ce que tu réussis déjà = ne pas perdre de temps à le réviser.`,
      },
    ],
  },
  {
    title: `⚡ Travailler efficacement`,
    cards: [
      {
        title: `Blocs de travail courts et intenses`,
        desc: `25-50 min de travail <strong>sans téléphone, sans onglets inutiles</strong>, pause de 10 min. Répété 3-4 fois = une session efficace. Travailler 3h de façon concentrée vaut largement plus que 7h de travail dilué. <strong>Quantifie ta session avant de commencer</strong> : "je vais refaire 8 exos sur les suites."`,
      },
      {
        title: `Être actif en cours pour gagner du temps`,
        desc: `La meilleure façon de réduire le temps de révision, c'est de <strong>comprendre en cours plutôt qu'après.</strong> Pose des questions, refais les exemples du prof dans ta tête, note ce que tu n'as pas compris immédiatement — pas le cours en entier. Un élève qui suit activement en cours a déjà fait 50% du travail de révision. <strong>Ce qui est compris en classe n'est pas à réapprendre chez soi.</strong>`,
      },
      {
        title: `L'IA comme prof disponible 24h/24`,
        desc: `Utilise l'IA pour <strong>trois choses précises</strong> : (1) te faire interroger sur un chapitre, (2) critiquer tes productions écrites, (3) générer des exercices ou flashcards ciblés. <strong>Ne lui demande pas de faire à ta place</strong> — demande-lui de créer les conditions pour que tu travailles toi-même.`,
      },
    ],
  },
  {
    title: `🎯 Penser stratégiquement`,
    cards: [
      {
        hot: true,
        title: `Faire des annales d'abord`,
        desc: `Avant de réviser un chapitre, <strong>regarde les annales</strong>. Ce que l'exam demande réellement ≠ ce que le cours contient. Identifier les types de questions, la structure attendue, le vocabulaire évalué = <strong>réviser ce qui compte, pas tout</strong>. C'est la différence entre 4 heures efficaces et 10 heures perdues.`,
      },
      {
        hot: true,
        title: `La règle des 80/20`,
        desc: `Dans chaque matière, <strong>20% des notions tombent dans 80% des examens</strong>. Identifie ces 20% (annales + correction des DS) et maîtrise-les à 100% avant de t'attaquer au reste. Un élève qui maîtrise parfaitement les fondamentaux bat un élève qui survole tout.`,
      },
      {
        title: `Comprendre les attentes avant tout`,
        desc: `Chaque matière a un <strong>format d'évaluation précis</strong> avec ses critères implicites. Connais-les avant de réviser : en histoire-géo on attend un plan structuré et des exemples précis, en maths une rédaction rigoureuse étape par étape, en SVT une démarche scientifique. <strong>Réviser sans connaître les attentes = travailler dans le vide.</strong>`,
      },
      {
        title: `Gérer son temps en exam : ne jamais s'acharner`,
        desc: `Si une question bloque après 5 min, <strong>passe à la suivante et reviens à la fin.</strong> Les questions difficiles en début de sujet font perdre du temps sur des questions faciles en fin. Souvent, les dernières questions d'un exercice sont plus accessibles qu'elles n'y paraissent une fois le reste traité. <strong>Note la question skippée pour ne pas l'oublier.</strong>`,
      },
    ],
  },
];

// ─── SECONDE ─────────────────────────────────────────────────────────────────

export const SECONDE_SUBJECTS: SubjectCard[] = [
  {
    code: `Mx`, name: `Mathématiques`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `L'IA t'interroge sur un chapitre`,
            desc: `<strong>"Tu es un prof de maths seconde. Pose-moi 6 exercices progressifs sur [chapitre]. Corrige ma démarche à chaque fois, pas juste le résultat."</strong> Rejoue jusqu'à zéro erreur.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Exos en boucle, cours appris en faisant`,
            desc: `Ne lis pas le cours d'abord. <strong>Lance-toi directement dans les exercices.</strong> Quand tu bloques, regarde uniquement la notion qui manque, puis continue. Tu assimiles le cours en contexte — ça reste infiniment mieux.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `Refaire les exos ratés à blanc`,
            desc: `Pour chaque exo raté : <strong>attends 24h, puis refais-le de mémoire</strong> sans regarder la correction. Ce que tu rates encore = priorité absolue. Ce que tu réussis = acquis.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Flashcards formules sur Anki`,
            desc: `Génère tes flashcards avec l'IA : <strong>"Fais-moi 15 flashcards Q/R sur les formules et identités remarquables de seconde."</strong> 10 min par jour sur Anki = plus jamais de trou sur les formules.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire tout le sujet avant d'écrire la première ligne`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Ne jamais laisser de blanc`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices de calcul et problèmes`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Écrire données, inconnue et loi avant toute formule`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Vérifier l'ordre de grandeur de chaque résultat numérique`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `PC`, name: `Physique-Chimie`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `L'IA génère des contrôles complets sur chaque chapitre`,
            desc: `<strong>"Génère un contrôle de physique-chimie niveau seconde sur [chapitre], durée 45 min. Inclus un QCM, un exercice de calcul et une question de raisonnement. Corrige-moi ensuite question par question en expliquant mes erreurs."</strong> Refais jusqu'à 18+ sans erreur de méthode.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Maîtriser les 5 étapes de résolution jusqu'à l'automatisme`,
            desc: `À chaque exercice, sans exception : <strong>données → inconnue → loi → formule littérale → application numérique + unité.</strong> Un élève qui fait ça systématiquement ramasse presque tous les points de démarche même s'il se trompe dans le calcul final. C'est la différence entre 12 et 18.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `Refaire à blanc les exos ratés — après 24h minimum`,
            desc: `Chaque exo raté : lis la correction, <strong>attends 24h, puis refais de zéro sans regarder.</strong> Passé ce délai tu ne te souviens plus de la correction — tu dois reconstruire le raisonnement toi-même.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Flashcards : loi + quand l'utiliser + erreur classique`,
            desc: `Une flashcard par loi. Recto : nom. Verso : formule + <strong>dans quel contexte l'appliquer + l'erreur que font tous les élèves.</strong> Demande à l'IA de les générer : <strong>"Génère des flashcards sur les lois de [chapitre] avec le contexte d'application et le piège classique pour chacune."</strong>`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Ne jamais laisser de blanc — poser la démarche même incomplète`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices de calcul`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Les 5 étapes dans l'ordre, sans exception`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Continuer avec une valeur fictive si tu bloques sur un calcul intermédiaire`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous les résultats numériques`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Unité à chaque résultat, résultat final encadré`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `Fr`, name: `Français`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `L'IA corrige tes paragraphes`,
            desc: `Écris un paragraphe de commentaire, colle-le : <strong>"Évalue ce paragraphe niveau seconde — structure, argument, vocabulaire littéraire. Dis-moi exactement ce qui manque."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Analyse à blanc sur texte inconnu`,
            desc: `Demande à l'IA un texte littéraire inédit du même siècle que le programme. Analyse-le seul. <strong>Compare ensuite avec l'analyse de l'IA</strong> et identifie ce que tu as manqué.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format`, methods: [
          {
            icon: '✦' as Icon,
            title: `Rédiger une intro de commentaire chronométrée`,
            desc: `Prends un texte du cours, chronomètre 30 min, rédige l'introduction complète : accroche + présentation du texte + axes de lecture. <strong>Si l'intro n'est pas structurée et fluide en 30 min, c'est la première chose à travailler.</strong> Soumet ensuite à l'IA pour correction.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Flashcards vocabulaire d'analyse littéraire`,
            desc: `Recto : nom du procédé ou terme (métaphore, anaphore, ironie, champ lexical, modalisation, registre...). Verso : définition courte + exemple tiré d'un texte du cours. <strong>L'objectif n'est pas d'en avoir 50 — c'est de maîtriser parfaitement ceux qui reviennent tout le temps.</strong> Révise sur Anki jusqu'à les utiliser naturellement dans tes analyses sans avoir à chercher.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Relecture syntaxe en toute fin — pas le fond, uniquement ces 3 points`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — analyse de texte et commentaire`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Annoter le texte avant d'écrire la première phrase`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Plan sur brouillon avant la première phrase — axes + procédés par axe`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque remarque suit la structure procédé → effet → sens`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `HG`, name: `Histoire-Géographie`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Apprendre le plan du cours, pas le cours`,
            desc: `En histoire-géo, <strong>la structure prime sur les détails.</strong> Mémorise d'abord le plan complet (titres de parties et sous-parties) avant d'apprendre les faits. Un plan solide en tête = tu ne perds jamais le fil en exam.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Feuille blanche : restituer le cours sans support`,
            desc: `Ferme tout. Prends une feuille vierge, reconstitue le plan du chapitre puis remplis chaque partie avec les faits, dates et acteurs que tu te rappelles. <strong>Ce qui est vide sur ta feuille = ce que tu dois retravailler.</strong>`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `L'IA pose des questions sur ton chapitre`,
            desc: `<strong>"Pose-moi 8 questions de contrôle niveau seconde sur [chapitre], mélange faits, dates, acteurs et mécanismes. Corrige mes réponses et explique ce que j'ai raté."</strong> À faire après la feuille blanche pour cibler ce qui manque encore.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Expliquer le cours à l'oral, sans support`,
            desc: `Ferme tout et explique le chapitre à voix haute comme si tu le faisais à quelqu'un qui ne connaît rien. <strong>Ce que tu bafouilles ou esquives = ce que tu n'as pas vraiment compris.</strong> Plus efficace que la feuille blanche pour détecter les faux acquis — on peut écrire des mots sans comprendre, mais on ne peut pas l'expliquer sans comprendre.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Anki : dates, acteurs, lieux-clés`,
            desc: `Une flashcard = un fait précis. <strong>10 min par jour en répétition espacée</strong> = mémorisation durable sans session de bourrage la veille.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Répondre explicitement à la question posée — dernière phrase de chaque réponse`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — composition et question de cours`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Dégager la problématique en 3 min — avant de chercher ses connaissances`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `10 min de plan sur brouillon, deux colonnes : parties + exemples concrets`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque argument illustré d'un exemple daté, situé, nommé`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — analyse de document`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Présentation du document en premier — nature, auteur, date, contexte`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `SV`, name: `SVT`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `L'IA teste ta vraie compréhension`,
            desc: `<strong>"Demande-moi d'expliquer [mécanisme]. Puis pose-moi 3 questions pour vérifier si j'ai compris la logique, pas juste mémorisé les mots."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Redessiner les schémas de mémoire`,
            desc: `Ferme le cours, redessine chaque schéma clé entièrement. <strong>Si tu ne peux pas le dessiner, tu ne l'as pas compris</strong> — tu l'as juste regardé.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `S'entraîner à l'analyse de documents SVT`,
            desc: `Les exercices SVT comportent souvent des documents (graphiques, schémas, résultats d'expérience). Méthode : <strong>(1) lire le document → (2) extraire la donnée principale → (3) interpréter avec un mécanisme biologique → (4) conclure en répondant à la question.</strong> Demande à l'IA un document inédit pour t'entraîner.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Glossaire scientifique sur Anki via l'IA`,
            desc: `"Génère 25 flashcards définition/terme sur [chapitre] en SVT seconde." Un mot précis en exam = points assurés. Révise jusqu'à mobiliser le bon terme sans chercher.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Conclure chaque réponse en répondant explicitement à la question`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices avec documents`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Lire tous les documents avant de répondre à la première question`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Citer le document et extraire une donnée chiffrée dans chaque réponse`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — schémas`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Titre + légende structurée + crayon gris — dans cet ordre`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `EN`, name: `Anglais`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Conversations en anglais avec l'IA`,
            desc: `<strong>"Let's practice English. Talk to me about [thème du cours] and strictly correct my grammar and vocabulary mistakes after each of my messages."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Correction de productions écrites`,
            desc: `Écris un résumé en anglais, colle-le : <strong>"Correct this. List my 5 main mistakes and explain why they're wrong."</strong> Feedback ciblé sur ce que tu rates vraiment.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `Entraîner la compréhension orale activement`,
            desc: `Écoute 10 min par jour d'un podcast ou d'une vidéo en anglais sur les thèmes du cours (BBC Learning English, TED-Ed...). <strong>Note 3 mots ou expressions que tu n'as pas compris</strong>, cherche leur sens, ajoute-les sur Anki.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `5 expressions avancées par thème`,
            desc: `Par notion, mémorise 5 expressions ou collocations avancées sur Anki. <strong>En exam, une expression précise vaut 3 mots basiques.</strong> Demande à l'IA : "Donne-moi 5 expressions avancées sur [thème] avec exemple en contexte."`,
            tags: ['espace'],
          },
        ],
      },
    ],
  },
];

// ─── PREMIÈRE ────────────────────────────────────────────────────────────────

export const PREMIERE_SUBJECTS: SubjectCard[] = [
  {
    code: `Fr`, name: `Français — EAF`,
    categories: [
      {
        label: `Maîtriser le format — Oral`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Explication linéaire à blanc, chronométrée`,
            desc: `Prends un texte au programme. Ferme tes notes. Fais l'explication linéaire complète à voix haute — mouvements, procédés, interprétations — <strong>en 10 min chrono.</strong> Si tu bafouilles ou tu sautes un passage : c'est ce qu'il faut retravailler.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Simulation d'entretien EAF sur l'œuvre choisie`,
            desc: `<strong>"Tu es examinateur au bac de français. Je viens de présenter un texte de [titre de l'œuvre choisie]. Pose-moi 3 questions déstabilisantes sur l'œuvre, l'auteur et le parcours associé."</strong> Rejoue jusqu'à répondre sans hésitation.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format — Écrit`, methods: [
          {
            icon: '✦' as Icon,
            title: `Maîtriser la structure du commentaire composé`,
            desc: `Pour ceux qui visent le commentaire : entraîne-toi sur la <strong>construction des axes d'abord</strong> — deux ou trois axes thématiques cohérents avec sous-parties. Soumets ton plan à l'IA : <strong>"Valide ce plan de commentaire. Est-ce que les axes sont distincts, progressifs, ancrés dans le texte ?"</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Plan de dissertation détaillé, puis comparaison IA`,
            desc: `Fais un plan complet : <strong>grandes parties → sous-parties → idée principale de chaque sous-partie → exemple associé.</strong> Puis demande à l'IA de comparer avec le sien et d'expliquer les différences.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Citations classées par thème sur Anki`,
            desc: `15-20 citations par œuvre, classées par thème (amour, pouvoir, mort...). <strong>Objectif : sortir une citation en 10 secondes sur n'importe quel thème.</strong> En oral, citer le texte précisément = signal de maîtrise immédiat pour l'examinateur.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant l'épreuve — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Gérer le temps dès la lecture du sujet`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Relecture finale : langue uniquement, pas le fond`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — commentaire`, methods: [
          {
            icon: '⏱' as Icon,
            title: `1h de brouillon minimum avant la première phrase — annotation + plan`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Structure obligatoire de chaque remarque : procédé → citation → effet → sens`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — dissertation`, methods: [
          {
            icon: '⏱' as Icon,
            title: `1h de brouillon minimum avant la première phrase — problématique + plan complet`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `Mx`, name: `Mathématiques`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Se mettre en conditions d'exam sur sujets entiers`,
            desc: `La compétence clé en maths spé première c'est tenir un sujet complet dans le temps imparti. Prends des sujets de première, <strong>chronomètre, aucune aide.</strong> Corrige-toi toi-même avant de regarder le corrigé.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Exos en boucle, cours consulté au besoin`,
            desc: `Ne lis pas le cours avant de faire les exos. Lance-toi, bloque, consulte uniquement ce qui manque, continue. <strong>Tu apprends les maths en faisant des maths, pas en lisant des maths.</strong>`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Refaire les DS notés 48h après`,
            desc: `Après chaque DS rendu : lis la correction, puis <strong>refais l'intégralité du DS 48h plus tard sans regarder.</strong> Pas juste les questions ratées — tout le sujet. Ce que tu rates encore 48h après = vraie lacune à combler.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `5-10 min de réflexion, puis l'IA donne une piste`,
            desc: `Sur un exo bloqué : <strong>réfléchis seul 5 à 10 min.</strong> Passé ce délai, demande à l'IA : "Voici mon raisonnement. Trouve l'erreur de logique et donne-moi une piste, pas la solution." Ce temps de friction est nécessaire — il développe le réflexe de recherche.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Journal d'erreurs : cause racine de chaque faute`,
            desc: `Pour chaque exo raté : note le type d'erreur et sa cause racine. <strong>Relis ce journal avant chaque DS</strong> — c'est là que sont tes vraies lacunes, pas dans le cours.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Flashcards formules, identités et propriétés sur Anki`,
            desc: `Une flashcard par élément clé : formules de trigonométrie, dérivées usuelles, identités remarquables, propriétés des fonctions... <strong>"Génère-moi 20 flashcards Q/R sur [chapitre] maths première spé, couvre formules, propriétés et définitions."</strong> 10 min par jour sur Anki = plus jamais de trou sur les formules en DS.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire tout le sujet avant de commencer`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Ne jamais laisser de blanc`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — démonstrations et raisonnements`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Rédiger chaque étape avec sa justification`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Si tu bloques sur une démonstration, poser ce que tu sais et continuer`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — calculs et applications numériques`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Vérifier le signe et l'ordre de grandeur de chaque résultat`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `SE`, name: `SES`,
    categories: [
      {
        label: `Maîtriser le format`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Entraînement EC1 : définir + mobiliser`,
            desc: `L'EC1 demande définition + mécanisme illustré. <strong>"Donne-moi 5 questions d'EC1 niveau première SES sur [thème]. Corrige mes réponses et dis-moi si la définition est précise et si le mécanisme est bien illustré."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `EC2 : commenter un doc statistique à blanc`,
            desc: `Prends un tableau ou graphique du cours, cache la légende. Rédige ton EC2 : lecture → variations → interprétation → limites. <strong>Soumets à l'IA pour correction de méthode.</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `EC3 : plan + intro chronométrés (20 min)`,
            desc: `Sur un sujet d'EC3 passé, fais plan + intro en 20 min. Compare avec un corrigé. <strong>En première, l'EC3 est une mini-dissertation</strong> — la structure compte autant que le contenu.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Mémoriser qui citer sur quoi en EC3`,
            desc: `Pour chaque grand thème SES, construis un tableau : <strong>thème → auteur → thèse en 1 phrase → œuvre.</strong> En EC3, citer un auteur avec sa thèse = signal de maîtrise. Révise ce tableau sur Anki.`,
            tags: ['ia', 'espace'],
          },
          {
            icon: '✦' as Icon,
            title: `Mécanismes en flashcards cause → effet`,
            desc: `Recto : "Hausse des taux →". Verso : chaîne causale complète + auteur lié. <strong>Les mécanismes sont la colonne vertébrale des SES</strong> — les savoir par cœur libère de l'espace cognitif pour argumenter.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire toutes les questions avant de commencer`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Répondre exactement à ce qui est demandé — lire la consigne mot par mot`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — questions de connaissances`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Définir la notion avant de développer`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Structure AEI : Affirmation → Explication du mécanisme → Illustration`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — analyse de document`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Présenter le document avant d'analyser son contenu`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Citer un chiffre précis et expliquer ce qu'il signifie`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Relier le document à un mécanisme du cours — jamais paraphraser`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — questions rédigées longues`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Conclure en répondant explicitement à la question posée`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `PC`, name: `Physique-Chimie`,
    categories: [
      {
        label: `Rigueur de méthode`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Identifier le type de problème avant d'écrire`,
            desc: `Avant de poser la moindre formule : <strong>force-toi à nommer le type d'exercice</strong> (cinématique, thermodynamique, optique...) et la loi principale à mobiliser. Cette habitude seule élimine la moitié des erreurs de méthode.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Calcul littéral systématique + vérification des unités`,
            desc: `Règle non négociable : <strong>formule littérale complète avant tout chiffre.</strong> Ensuite, vérifie l'homogénéité des unités — si ça ne colle pas, il y a une erreur avant même de calculer.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `La rigueur de rédaction, non négociable`,
            desc: `En physique, <strong>une réponse juste mal rédigée perd des points.</strong> Chaque étape doit être justifiée par écrit : "D'après la loi de Newton...", "En appliquant la conservation de l'énergie..." Le correcteur note la démarche, pas que le résultat.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `Refaire chaque exo raté jusqu'à le réussir seul`,
            desc: `Quand tu rates un exo : lis la correction, <strong>ferme-la, puis attends minimum 24h avant de refaire l'exo de zéro sans regarder.</strong> Répète jusqu'à réussir sans aide.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Reproduire les anciens contrôles en conditions réelles`,
            desc: `Reprends chaque ancien DS : même durée, chronomètre, aucune aide. <strong>Corrige-toi toi-même avant de regarder le corrigé.</strong> L'écart entre ce que tu penses avoir réussi et ce que tu as vraiment réussi = révélateur.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `L'IA génère des contrôles inédits sur mesure`,
            desc: `<strong>"Génère un contrôle de physique-chimie spécialité première sur [chapitre], durée 1h, avec une partie QCM, une partie calcul et une question de synthèse. Corrige ma copie ensuite."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `5-10 min de réflexion, puis on avance`,
            desc: `Sur un exo où tu sèches : <strong>impose-toi 5 à 10 min de réflexion active</strong> — relire l'énoncé, identifier les données, chercher quelle loi s'applique. Passé ce délai : piste IA, jamais la solution directe.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Identifier le type de problème avant d'écrire quoi que ce soit`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Ne pas laisser de blanc — poser la démarche même incomplète`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices de calcul`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Formule littérale complète avant tout chiffre — sans exception`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Vérifier l'homogénéité des unités avant de valider le résultat`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Continuer avec une valeur fictive si un calcul intermédiaire bloque`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `SV`, name: `SVT`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Documents SVT inédits pour s'entraîner`,
            desc: `<strong>"Génère un exercice SVT première avec 2 documents inédits sur [thème]. Je vais l'analyser, puis tu évalues ma démarche scientifique."</strong>`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Comprendre & ancrer`, methods: [
          {
            icon: '✦' as Icon,
            title: `Schémas-bilan de mémoire, puis expliqués à l'oral`,
            desc: `Redessine chaque schéma entièrement de mémoire. Puis <strong>explique-le à voix haute</strong> comme si tu le présentais : chaque flèche, chaque mécanisme. Ce que tu ne peux pas expliquer = ce que tu n'as pas compris.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Entraîner la conclusion de démarche expérimentale`,
            desc: `Après chaque exercice avec documents : rédige une conclusion en suivant <strong>bilan des résultats → réponse à la question posée → lien avec la notion du cours.</strong> C'est la partie la plus pénalisée car la plus souvent bâclée.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Tableaux comparatifs en flashcards`,
            desc: `Mitose vs méiose, ADN vs ARN... <strong>Une flashcard par différence clé.</strong> Les erreurs en SVT viennent presque toujours de paires de notions confondues.`,
            tags: ['espace'],
          },
          {
            icon: '✦' as Icon,
            title: `Glossaire scientifique généré par l'IA sur Anki`,
            desc: `"Génère 25 flashcards définition/terme sur [chapitre] SVT première." En SVT, un mot imprécis = points perdus. Objectif : mobiliser le bon terme sans réfléchir.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Conclure chaque réponse en répondant à la question posée`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices avec documents`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Lire tous les documents avant de répondre à la première question`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Citer le document + donnée chiffrée dans chaque réponse`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Relier chaque résultat expérimental à une notion du cours`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — schémas`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Titre + légende organisée + crayon gris — dans cet ordre`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `NS`, name: `NSI`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Code review guidée par l'IA`,
            desc: `<strong>"Voici mon code. Ne me donne pas la solution. Dis-moi uniquement ce qui est conceptuellement faux et pourquoi."</strong> Tu corriges toi-même après.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Trace d'exécution à la main`,
            desc: `Joue le rôle de la machine : note les valeurs de chaque variable à chaque étape sur papier. <strong>Indispensable pour les boucles et la récursivité</strong> — c'est l'exercice le plus redouté car le moins pratiqué.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `S'entraîner`, methods: [
          {
            icon: '✦' as Icon,
            title: `Reconnaître les patterns des sujets NSI`,
            desc: `Les sujets NSI ont des structures très récurrentes : implémentation d'algo, trace d'exécution, preuve de correction, complexité. <strong>Fais 5 sujets et liste les types de questions</strong> — tu verras que les mêmes formats reviennent.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Complexité et structures sur Anki`,
            desc: `Recto : structure (liste, pile, file...). Verso : complexité des opérations clés. <strong>Récurrent en exam, mémorisé en 15 min.</strong> Génère tes flashcards avec l'IA.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire l'énoncé deux fois avant d'écrire du code`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — questions de code`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Tester mentalement son code avec un exemple simple avant de rendre`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Si tu ne sais pas coder la solution, décrire l'algorithme en français`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — questions théoriques`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Questions théoriques : justifier, pas juste donner la réponse`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `HG`, name: `Histoire-Géographie`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Maîtriser le plan du cours + feuille blanche`,
            desc: `Apprends d'abord la structure complète du chapitre (parties, sous-parties, logique enchaînée). Puis feuille blanche : <strong>reconstitue tout le chapitre de mémoire</strong> — plan, faits clés, acteurs. Ce qui manque = à retravailler.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Expliquer le cours à l'oral, sans support`,
            desc: `Ferme tout et explique le chapitre à voix haute comme si tu le faisais à quelqu'un qui ne connaît rien. <strong>Ce que tu bafouilles ou esquives = ce que tu n'as pas vraiment compris.</strong>`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format`, methods: [
          {
            icon: '✦' as Icon,
            title: `Intro de composition chronométrée (15 min)`,
            desc: `Sur un sujet passé : rédige l'accroche + contextualisation + problématique + annonce de plan en <strong>15 min chrono, conditions réelles.</strong> Compare ensuite avec un corrigé ou soumets à l'IA.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Analyse de document historique : la méthode concrète`,
            desc: `Sur tout document inédit, applique en 20 min chrono : <strong>(1) Présentation</strong> — nature, auteur, date, contexte. <strong>(2) Idée principale.</strong> <strong>(3) Arguments</strong> — 2-3 idées avec citations courtes. <strong>(4) Mise en perspective + limites.</strong> Ne pas paraphraser : interpréter.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Croquis refait de mémoire, chronomètre en main`,
            desc: `Ferme tout. Chronomètre 20 min, redessine le croquis avec figurés et légende structurée. <strong>Regarder un croquis ne sert à rien — le redessiner de mémoire fixe les localisations.</strong>`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Dates, acteurs, lieux-clés sur Anki`,
            desc: `Une flashcard = un fait précis. <strong>10 min par jour en répétition espacée</strong> = mémorisation durable sans session de bourrage la veille.`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Répondre explicitement à la question — dernière phrase de chaque développement`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — composition`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Problématique + plan complet sur brouillon — 10 min minimum`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque argument illustré d'un exemple précis daté et situé`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — analyse de document`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Présentation complète avant l'analyse — nature, auteur, date, contexte`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Interpréter, pas décrire — ce que le document révèle, pas ce qu'il dit`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — croquis géographique`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Titre + légende organisée + figurés clairs — dans cet ordre`,
            desc: ``,
          },
        ],
      },
    ],
  },
];

// ─── TERMINALE ───────────────────────────────────────────────────────────────

export const TERMINALE_SUBJECTS: SubjectCard[] = [
  {
    code: `Mx`, name: `Mathématiques`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Identifier les types de questions qui tombent au bac`,
            desc: `En maths terminale, <strong>il n'y a pas 1000 types de questions différents.</strong> Fais un maximum d'annales et note dans un cahier chaque type récurrent — limites, suites, intégrales, probabilités conditionnelles... La maîtrise de ces types = l'essentiel de la note.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Annales bac chronométrées + autocorrection`,
            desc: `1 sujet complet par semaine, conditions réelles. <strong>Corrige-toi toi-même avant de regarder le corrigé.</strong> L'écart entre les deux = ce qu'il faut travailler.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Comprendre & ancrer`, methods: [
          {
            icon: '✦' as Icon,
            title: `Exos en boucle, cours consulté au minimum`,
            desc: `En terminale, <strong>l'essentiel du temps doit être sur les exercices, pas sur le cours.</strong> Fais des exos, bloque, consulte la notion manquante, continue.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Règle des 5-10 min : réfléchir, puis passer à autre chose`,
            desc: `Sur un exo où tu bloques : <strong>force-toi à chercher seul 5 à 10 min.</strong> Ce temps de friction est nécessaire — il développe le réflexe de recherche. Passé ce délai : piste IA, jamais la solution directe.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Journal d'erreurs actif`,
            desc: `Pour chaque exo raté, note dans un cahier dédié : <strong>type d'erreur (calcul, raisonnement, méthode) → cause racine → règle à retenir.</strong> Relis ce journal avant chaque DS et avant le bac.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Flashcards formules, propriétés et définitions sur Anki`,
            desc: `Une flashcard par élément clé : formules (dérivées, primitives, trigonométrie...), propriétés (limites, continuité...), définitions. <strong>"Génère-moi 20 flashcards Q/R sur [chapitre] maths terminale, couvre formules, propriétés et définitions."</strong>`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire tout le sujet — identifier les questions indépendantes et les bonus`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Ne jamais laisser de blanc — rédiger la démarche même sans résultat`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — démonstrations`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Chaque affirmation justifiée — référence à la propriété ou au théorème`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Si tu bloques sur une étape intermédiaire — admettre et continuer`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — calculs et problèmes`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Vérifier la cohérence du résultat avec le contexte du problème`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `Ph`, name: `Philosophie`,
    categories: [
      {
        label: `Maîtriser le format`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Faire des plans détaillés sur sujets passés`,
            desc: `Prends un sujet au hasard dans les annales. En 1h, produis un plan complet : <strong>problématique + plan en 3 parties avec sous-parties, argument principal de chaque sous-partie et exemple philosophique associé.</strong> Soumets ensuite à l'IA pour critique. C'est la compétence la plus entraînable et la plus déterminante en philo.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `S'entraîner à l'explication de texte`,
            desc: `L'autre épreuve possible au bac. Sur un texte au programme, applique cette méthode : <strong>(1)</strong> Identifier la thèse — ce que l'auteur affirme en une phrase. <strong>(2)</strong> Découper en mouvements — 3-4 étapes logiques. <strong>(3)</strong> Expliquer chaque mouvement : reformuler, citer, analyser le vocabulaire philosophique clé. <strong>(4)</strong> Dégager le présupposé. <strong>(5)</strong> Conclure : thèse, intérêt philosophique, ouverture. Soumets ensuite à l'IA.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Comprendre & ancrer`, methods: [
          {
            icon: '✦' as Icon,
            title: `Défendre une thèse puis son contraire à voix haute`,
            desc: `Prends une notion (la liberté, le temps, la justice...). Défends le oui pendant 2 min à voix haute, puis le non. <strong>Si tu ne trouves pas d'arguments solides des deux côtés, tu ne peux pas traiter un sujet sur cette notion en exam.</strong> Ça force à dépasser la première idée qui vient et à construire une pensée dialectique réelle.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Fiches auteurs : thèse + œuvre + exemple concret`,
            desc: `Recto : philosophe. Verso : thèse en 1 phrase + œuvre + exemple d'application dans une dissertation + critique possible. <strong>Génère-les avec l'IA, vérifie, révise sur Anki.</strong> Objectif : mobiliser un auteur pertinent en moins de 10 secondes sur n'importe quel sujet.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant l'épreuve — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Choisir son sujet en 10 min — et ne plus y revenir`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Gérer le temps : 1h30 à 2h de brouillon, puis rédaction sans interruption`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — dissertation`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Problématique : créer une tension, pas poser une question fermée`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque sous-partie = argument + auteur + exemple concret`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `La thèse doit progresser — chaque partie doit dépasser la précédente`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — explication de texte`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Identifier la thèse en une phrase avant de découper les mouvements`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `SE`, name: `SES`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Simulation complète EC1/EC2/dissertation`,
            desc: `<strong>"Génère un sujet complet de SES terminale : une EC1, une EC2 avec doc statistique, et une dissertation. Évalue mes réponses question par question avec les critères du bac."</strong>`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format`, methods: [
          {
            icon: '✦' as Icon,
            title: `EC2 : maîtriser la lecture de données`,
            desc: `Structure immuable : <strong>présentation du doc → lecture de la donnée la plus importante (avec chiffre précis) → variation/évolution → interprétation avec un mécanisme → limite.</strong> Entraîne-toi sur des graphiques inédits jusqu'à automatisme complet.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Dissertation : 1 plan complet par semaine`,
            desc: `Sur un sujet passé : plan détaillé en 30 min, avec <strong>auteurs + chiffres + mécanismes pour chaque argument.</strong> Soumets le plan à l'IA : "Critique ce plan — progression logique, équilibre, pertinence des auteurs, lien avec le sujet."`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Auteurs + chiffres-clés sur Anki`,
            desc: `Recto : auteur (ex. Keynes). Verso : thèse + œuvre + chiffre ou fait concret associé. <strong>En dissertation, citer un auteur précisément = 2-3 points supplémentaires assurés.</strong>`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Lire toutes les questions avant de répondre à la première`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — EC1`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Structure non négociable : définition + mécanisme + illustration chiffrée`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — EC2`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Présentation du document + donnée chiffrée principale avant tout`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — dissertation`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Problématique économique ou sociologique — pas philosophique`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque argument appuyé sur un auteur + une donnée chiffrée`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `PC`, name: `Physique-Chimie`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `L'IA simule le correcteur sur ta démarche`,
            desc: `<strong>"Je résous ce problème étape par étape en justifiant tout. Joue le rôle d'un correcteur de bac : note chaque étape, signale les manques de justification et les erreurs de méthode."</strong>`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Labolycée : faire tous les sujets de bac`,
            desc: `<strong>labolycee.org</strong> regroupe tous les sujets de bac physique-chimie corrigés, classés par thème. La méthode : fais <strong>tous les sujets d'un thème</strong> avant de passer au suivant — tu vois les patterns qui reviennent.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Comprendre & ancrer`, methods: [
          {
            icon: '✦' as Icon,
            title: `Maîtriser les méthodes, pas les formules`,
            desc: `Pour chaque type de problème, mémorise la <strong>séquence de raisonnement</strong> : "mécanique Newton → bilan forces → choix de repère → 2e loi → équation différentielle..." La méthode s'applique à tous les exos du type, les formules se déduisent.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Refaire chaque exo raté après 24h, de zéro`,
            desc: `Quand tu rates un exo : lis la correction, <strong>ferme-la, puis attends minimum 24h avant de refaire de zéro sans regarder.</strong> Passé ce délai tu dois reconstruire le raisonnement — c'est ça qui ancre.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Règle des 5-10 min : réfléchir, puis avancer`,
            desc: `Sur un exo où tu bloques : <strong>impose-toi 5 à 10 min de réflexion active</strong> — relire, identifier les données, chercher la bonne séquence. Passé ce délai : piste IA, jamais la solution directe.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Rigueur de rédaction à chaque exercice`,
            desc: `Chaque étape doit être justifiée par écrit : <strong>"D'après la loi de Newton...", "En appliquant la conservation de l'énergie..."</strong> En physique terminale, un résultat juste sans justification perd des points. Entraîne cette rigueur dès maintenant.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Identifier le type de problème et la méthode avant d'écrire`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Ne pas laisser de blanc — rédiger la démarche même sans résultat final`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices de calcul`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Formule littérale avant les valeurs numériques — toujours`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Continuer avec une valeur fictive si un calcul intermédiaire bloque`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Vérifier l'homogénéité des unités et l'ordre de grandeur`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `SV`, name: `SVT`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Sujet bac SVT inédit généré par l'IA`,
            desc: `<strong>"Génère un sujet bac SVT terminale complet sur [thème] avec 2 documents inédits. Je le traite entièrement, puis tu évalues ma démarche scientifique selon les critères du bac."</strong>`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Comprendre & ancrer`, methods: [
          {
            icon: '✦' as Icon,
            title: `Schémas-bilan à blanc + expliqués à l'oral`,
            desc: `Redessine le schéma-bilan du chapitre de mémoire une fois par semaine. Puis <strong>explique-le à voix haute</strong> : chaque flèche, chaque mécanisme, chaque organe. Ce que tu ne peux pas expliquer = ce que tu n'as pas compris.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Exploiter un résultat expérimental en 4 étapes`,
            desc: `Face à un graphe ou tableau de résultats : <strong>lire (extraire la donnée chiffrée) → décrire la tendance → interpréter avec un mécanisme biologique → conclure en répondant à la question.</strong> Entraîne cette structure sur chaque document que tu croises.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Tableaux comparatifs terminale en flashcards`,
            desc: `Immunité innée vs adaptative, lymphocyte B vs T, neurone moteur vs sensitif... <strong>Une flashcard par différence clé.</strong> Les confusions entre notions proches sont la première source d'erreurs en SVT terminale.`,
            tags: ['espace'],
          },
          {
            icon: '✦' as Icon,
            title: `Vocabulaire scientifique sur Anki`,
            desc: `"Génère 30 flashcards définition/terme sur [chapitre] SVT terminale." <strong>Un mot imprécis en exam = points perdus.</strong> Objectif : mobiliser le bon terme sans chercher.`,
            tags: ['ia', 'espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Conclure chaque réponse en répondant directement à la question`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — exercices avec documents`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Lire tous les documents avant de répondre à la première question`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Citer le document + donnée chiffrée + mécanisme du cours dans chaque réponse`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — schémas`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Titre précis + légende organisée + crayon gris`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — questions de synthèse`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Structurer la réponse : idée principale + données + mécanisme + lien avec la question`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `GO`, name: `Grand Oral`,
    categories: [
      {
        label: `S'entraîner`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Jury simulé par l'IA, en boucle`,
            desc: `<strong>"Tu es un jury de Grand Oral bac. Ma question est [question]. Je présente 5 min. Pose-moi ensuite 3 questions déstabilisantes sur mon sujet, mes spécialités et mon projet d'études."</strong> Recommence jusqu'à répondre sans hésitation.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Se filmer, s'analyser, corriger`,
            desc: `Enregistre-toi. Regarde avec ce filtre : tics de langage, regard fuyant, débit, posture. <strong>Identifie 1 défaut par session, travaille-le uniquement.</strong> Ne pas regarder toute la vidéo d'un coup — trop décourageant et peu efficace.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format`, methods: [
          {
            icon: '✦' as Icon,
            title: `3 versions chronométrées : 5 / 10 / 15 min`,
            desc: `Maîtrise les 3 durées. <strong>Le jour J, tu adapteras au feeling du jury.</strong> Savoir que tu peux tenir n'importe quelle durée = confort mental qui change tout.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Construire une transition vers l'entretien`,
            desc: `Les 30 dernières secondes de ta présentation sont cruciales : <strong>clôture sur un angle fort qui invite les questions que tu maîtrises le mieux.</strong> C'est une compétence à entraîner : "Comment terminer ma présentation pour orienter l'entretien vers [point fort] ?"`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `20 questions d'entretien anticipées`,
            desc: `<strong>"Ma question Grand Oral est [question]. Génère 20 questions de jury, des plus simples aux plus déstabilisantes."</strong> Entraîne-toi à répondre à toutes — à l'oral, sans notes, chronomètre en main.`,
            tags: ['ia', 'actif'],
          },
        ],
      },
      {
        label: `Pendant l'épreuve — présentation`, methods: [
          {
            icon: '◆' as Icon,
            title: `Les 30 premières secondes donnent le ton — ne pas les improviser`,
            desc: ``,
          },
          {
            icon: '◆' as Icon,
            title: `Parler au jury, pas réciter — regarder, pas lire`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — entretien`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Si tu ne sais pas répondre — le dire clairement et rebondir`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Utiliser les questions du jury pour renforcer ta thèse`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant l'épreuve — transition vers l'entretien`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Terminer sur une ouverture qui oriente les questions que tu maîtrises`,
            desc: ``,
          },
        ],
      },
    ],
  },
  {
    code: `HG`, name: `Histoire-Géographie`,
    categories: [
      {
        label: `Comprendre & ancrer`, methods: [
          {
            hot: true,
            icon: '✦' as Icon,
            title: `Plan du cours + feuille blanche`,
            desc: `Apprends d'abord la structure complète du chapitre. Puis feuille blanche : <strong>reconstitue tout le chapitre de mémoire</strong> — plan, faits clés, acteurs, dates. Ce qui manque = à retravailler.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Expliquer le chapitre à l'oral, sans support`,
            desc: `Ferme tout, explique le chapitre à voix haute comme si tu le présentais à quelqu'un. <strong>Ce que tu bafouilles ou esquives = ce que tu n'as pas vraiment compris.</strong>`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Maîtriser le format`, methods: [
          {
            icon: '✦' as Icon,
            title: `Critique de plan par l'IA`,
            desc: `Propose un plan en 10 min : <strong>"Critique ce plan — progression logique, équilibre des parties, pertinence des exemples, lien avec le sujet."</strong> Reformule jusqu'à avoir un plan solide.`,
            tags: ['ia', 'actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Analyse de document inédit chronométrée (25 min)`,
            desc: `Sur un document que tu n'as jamais vu, applique en 25 min chrono : <strong>(1) Présentation</strong> — nature, auteur, date, contexte. <strong>(2) Thèse/idée principale.</strong> <strong>(3) Arguments</strong> — 2-3 idées avec citations courtes. <strong>(4) Mise en perspective + limites.</strong> Ne pas paraphraser : interpréter.`,
            tags: ['actif'],
          },
          {
            icon: '✦' as Icon,
            title: `Croquis à blanc, 20 min max`,
            desc: `Redessine de mémoire avec légende structurée. <strong>3 fois par semaine</strong> sur les croquis probables — la régularité prime sur les sessions intenses.`,
            tags: ['actif'],
          },
        ],
      },
      {
        label: `Mémoriser`, methods: [
          {
            icon: '✦' as Icon,
            title: `Exemples historiques précis sur Anki`,
            desc: `Recto : thème (ex. "décolonisation violente"). Verso : cas précis + dates + contexte en 3 lignes. <strong>En composition, les exemples précis font la différence entre 12 et 16.</strong>`,
            tags: ['espace'],
          },
        ],
      },
      {
        label: `Pendant le contrôle — tous types`, methods: [
          {
            icon: '◆' as Icon,
            title: `Répondre explicitement à la question — ne jamais supposer que c'est implicite`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — composition`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Problématique + plan complet sur brouillon — 15 min minimum`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Chaque argument doit avoir un exemple précis, daté, situé`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — analyse de document`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Présentation complète en première phrase — nature, auteur, date, contexte`,
            desc: ``,
          },
          {
            icon: '⏱' as Icon,
            title: `Confronter le document à tes connaissances — pas juste le décrire`,
            desc: ``,
          },
        ],
      },
      {
        label: `Pendant le contrôle — croquis géographique`, methods: [
          {
            icon: '⏱' as Icon,
            title: `Titre + légende hiérarchisée + figurés lisibles — dans cet ordre`,
            desc: ``,
          },
        ],
      },
    ],
  },
];

// ─── PROMPTS IA ──────────────────────────────────────────────────────────────

export const PROMPT_GROUPS: PromptGroup[] = [
  {
    label: `📎 Avec ton cours en pièce jointe`,
    prompts: [
      {
        title: `Interroge-moi sur mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours en pièce jointe]

Tu es un professeur de [matière] en classe de [niveau]. Je t'envoie mon cours sur [chapitre]. Pose-moi 6 questions progressives basées uniquement sur ce cours : les 2 premières sur les définitions et notions fondamentales, les 2 suivantes sur des applications directes, les 2 dernières sur des cas plus complexes ou des pièges classiques du programme.

Pose une question à la fois. Attends ma réponse avant de passer à la suivante. Corrige ma démarche — pas juste le résultat. Si je me trompe, explique pourquoi avec une référence précise à mon cours, et repose la question différemment jusqu'à ce que je la réussisse.`,
      },
      {
        title: `Génère des flashcards depuis mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours en pièce jointe]

Génère 20 flashcards Anki à partir de ce cours sur [chapitre] en [matière] niveau [niveau]. Utilise uniquement le contenu de mon cours — pas de notions extérieures.

Format strict :
RECTO : [question courte ou terme à définir — jamais une question fermée oui/non]
VERSO : [réponse précise en 1-2 phrases, avec les mots exacts du cours]

Commence par les définitions fondamentales, finis par les applications et cas particuliers. Rien d'autre dans ta réponse.`,
      },
      {
        title: `Génère un sujet basé sur mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours en pièce jointe]

Génère un sujet de contrôle de [matière] niveau [niveau] basé uniquement sur ce cours, durée approximative [durée]. Respecte le format exact utilisé en classe : [décris le format — ex: QCM 5 questions + 1 exercice + 1 question de raisonnement].

Contraintes : aucune notion hors programme, aucune indication de réponse, niveau de difficulté réaliste pour un DS de milieu d'année. Génère uniquement le sujet. Quand je te dis "j'ai fini", tu me donnes le corrigé complet basé sur mon cours.`,
      },
      {
        title: `Corrige ma copie avec mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours ET ta copie corrigée en pièces jointes]

Voici la question posée : [colle la question]
Ma réponse : [colle ta réponse]

En te basant sur mon cours joint, corrige comme un professeur exigeant en 4 points : (1) ce qui est juste — cite les passages de mon cours qui le confirment, (2) ce qui est faux ou imprécis — explique l'erreur et indique où se trouve la bonne réponse dans mon cours, (3) ce qui manque que j'aurais dû écrire, (4) une note indicative sur 10 avec justification.`,
      },
      {
        title: `Donne-moi une piste depuis mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours en pièce jointe]

Je bloque sur cet exercice de [matière].

Énoncé : [colle l'énoncé]
Ce que j'ai essayé : [décris ton raisonnement]
Où je bloque exactement : [sois précis]

Règle absolue : ne me donne pas la solution. En te basant sur mon cours joint, dis-moi si ma piste de départ est correcte. Puis indique-moi uniquement dans quelle partie de mon cours se trouve ce dont j'ai besoin, et pose-moi une seule question pour m'aider à y arriver moi-même.`,
      },
      {
        title: `Analyse mes erreurs avec mon cours`,
        scope: `Toutes matières · Tous niveaux`,
        text: `[Joins ton cours ET ta copie corrigée en pièces jointes]

En te basant sur mon cours et ma copie corrigée, analyse mes erreurs en 3 points : (1) pour chaque erreur, identifie le passage précis de mon cours que je n'ai pas maîtrisé, (2) classe ces lacunes par priorité — laquelle est la plus bloquante pour la suite ? (3) construis-moi un programme de révision ciblé pour les 48h à venir : quelles parties de mon cours retravailler, dans quel ordre, et comment vérifier que c'est acquis.`,
      },
    ],
  },
  {
    label: `💬 Sans cours — de mémoire`,
    prompts: [
      {
        title: `Interroge-moi sur un chapitre`,
        scope: `Toutes matières · Tous niveaux`,
        text: `Tu es un professeur de [matière] en classe de [niveau]. Je viens de réviser [chapitre] et je veux vérifier que je l'ai vraiment compris.

Pose-moi 6 questions progressives : les 2 premières sur les définitions et notions de base, les 2 suivantes sur des applications directes, les 2 dernières sur des cas plus complexes ou des pièges classiques. Pose une question à la fois. Attends ma réponse avant de passer à la suivante. Corrige ma démarche à chaque fois — pas juste le résultat. Si je me trompe, explique pourquoi et repose la question différemment jusqu'à ce que je la réussisse.`,
      },
      {
        title: `Génère des flashcards Anki`,
        scope: `Toutes matières · Tous niveaux`,
        text: `Génère 20 flashcards sur [chapitre] en [matière] niveau [niveau].

Format strict :
RECTO : [question courte ou terme à définir — jamais une question fermée oui/non]
VERSO : [réponse précise en 1-2 phrases]

Commence par les notions fondamentales, finis par les cas particuliers et les pièges classiques. Rien d'autre dans ta réponse.`,
      },
      {
        title: `Génère un sujet complet inédit`,
        scope: `Toutes matières · Tous niveaux`,
        text: `Génère un sujet de contrôle de [matière] niveau [niveau] sur [chapitre], durée approximative [durée]. Respecte le format exact utilisé au lycée français : [décris le format — ex: QCM 5 questions + 1 exercice de calcul + 1 question de raisonnement]. Niveau réaliste pour un bon DS de milieu d'année.

Génère uniquement le sujet — aucune indication de réponse. Quand je te dis "j'ai fini", tu me donnes le corrigé complet détaillé, question par question.`,
      },
      {
        title: `Corrige ma copie`,
        scope: `Toutes matières · Tous niveaux`,
        text: `Question : [colle la question]
Ma réponse : [colle ta réponse]

Corrige comme un professeur exigeant de [matière] niveau [niveau] en 4 points : (1) ce qui est juste et bien formulé, (2) ce qui est faux ou imprécis — explique l'erreur de fond, pas juste que c'est faux, (3) ce qui manque que j'aurais dû écrire pour avoir tous les points, (4) une note indicative sur 10 avec justification et ma priorité de révision.`,
      },
      {
        title: `Donne-moi une piste, pas la solution`,
        scope: `Toutes matières · Tous niveaux`,
        text: `Je bloque sur cet exercice de [matière] depuis plusieurs minutes.

Énoncé : [colle l'énoncé]
Ce que j'ai essayé : [décris ton raisonnement]
Où je bloque exactement : [sois précis]

Règle absolue : ne me donne pas la solution. Dis-moi d'abord si ma piste de départ est bonne ou mauvaise. Puis pose-moi une seule question qui va m'aider à identifier ce qui me manque. Je veux trouver moi-même.`,
      },
    ],
  },
  {
    label: `🎤 Préparer les oraux`,
    prompts: [
      {
        title: `Grand Oral — jury simulé`,
        scope: `Terminale · 🎙 Utilise l'assistant vocal`,
        text: `Mon sujet de Grand Oral est : [formule ta question]
Mes deux spécialités : [spécialité 1] et [spécialité 2]
Mon projet d'études : [décris en une phrase]

Tu es un jury de Grand Oral, exigeant et sans complaisance. Je vais te présenter mon exposé pendant 5 minutes — je parle, tu écoutes sans interrompre.

Quand j'ai fini, pose-moi 4 questions dans cet ordre : (1) une clarification sur un point flou de ma présentation, (2) une question qui creuse le cœur de mon sujet, (3) une objection ou une limite que je n'ai pas abordée, (4) une question sur le lien avec mon projet d'études ou mes spécialités. Attends ma réponse à chacune avant de passer à la suivante.

À la fin, dis-moi ce qui t'a convaincu, ce qui t'a laissé sur ta faim, et ce que tu aurais voulu entendre.

Je commence : [présente-toi à voix haute si tu utilises l'assistant vocal, ou écris ta présentation]`,
      },
      {
        title: `Oral EAF — entretien sur l'œuvre`,
        scope: `Première · 🎙 Utilise l'assistant vocal`,
        text: `L'œuvre que j'ai choisie : [titre + auteur]
Le parcours associé : [intitulé du parcours]
Le texte que je viens de présenter : [titre ou incipit du texte]

Tu es un examinateur du bac de français. Je viens de terminer mon explication linéaire. Tu as maintenant 10 minutes pour me poser des questions sur l'œuvre entière et le parcours associé — pas sur le texte que je viens d'expliquer.

Pose-moi une question à la fois. Attends ma réponse avant de passer à la suivante. Sois exigeant : si ma réponse est vague ou incomplète, dis-le clairement avant de continuer. Commence par une question ouverte sur l'œuvre, monte progressivement vers des questions plus précises sur le parcours.

À la fin, dis-moi ce que tu as apprécié et ce qui manquait dans mes réponses.`,
      },
    ],
  },
];