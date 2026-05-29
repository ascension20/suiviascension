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
  withFile?: boolean;
  text: string;
}

export interface PromptGroup {
  label: string;
  prompts: Prompt[];
}

// ─── GENERAL ─────────────────────────────────────────────────────────────────

export const GENERAL_SECTIONS: GeneralSection[] = [
  {
    title: '🧠 Mémoriser intelligemment',
    cards: [
      {
        hot: true,
        title: 'La révision active, pas passive',
        desc: 'Relire ses cours ne sert <strong>presque à rien</strong>. Ce qui ancre durablement : se tester, reformuler, reproduire sans support. <strong>La règle : si tu n\'as pas fermé ton cours pour te tester, tu n\'as pas révisé.</strong> Ferme, teste-toi, vérifie ce qui manque, recommence.',
      },
      {
        hot: true,
        title: 'La répétition espacée (Anki)',
        desc: 'Le cerveau oublie selon une courbe prévisible. <strong>Réviser juste avant d\'oublier</strong> = mémorisation longue durée avec un minimum d\'effort. Installe Anki, crée tes flashcards (ou génère-les avec l\'IA), fais 15 min par jour. Un lycéen qui utilise Anki sérieusement <strong>a 3× moins à réviser en période d\'exam</strong> qu\'un lycéen qui ne l\'utilise pas.',
      },
      {
        title: 'Le journal d\'erreurs',
        desc: 'Un cahier dédié : chaque erreur → <strong>type d\'erreur → cause racine → règle à retenir</strong>. Relis ce journal la veille de chaque exam, pas tes cours. Ce que tu rates régulièrement = ce qui peut te coûter des points. Ce que tu réussis déjà = ne pas perdre de temps à le réviser.',
      },
    ],
  },
  {
    title: '⚡ Travailler efficacement',
    cards: [
      {
        title: 'Blocs de travail courts et intenses',
        desc: '25-50 min de travail <strong>sans téléphone, sans onglets inutiles</strong>, pause de 10 min. Répété 3-4 fois = une session efficace. Travailler 3h de façon concentrée vaut largement plus que 7h de travail dilué. <strong>Quantifie ta session avant de commencer</strong> : "je vais refaire 8 exos sur les suites."',
      },
      {
        title: 'Être actif en cours pour gagner du temps',
        desc: 'La meilleure façon de réduire le temps de révision, c\'est de <strong>comprendre en cours plutôt qu\'après.</strong> Pose des questions, refais les exemples du prof dans ta tête, note ce que tu n\'as pas compris immédiatement — pas le cours en entier. Un élève qui suit activement en cours a déjà fait 50% du travail de révision. <strong>Ce qui est compris en classe n\'est pas à réapprendre chez soi.</strong>',
      },
      {
        title: 'L\'IA comme prof disponible 24h/24',
        desc: 'Utilise l\'IA pour <strong>trois choses précises</strong> : (1) te faire interroger sur un chapitre, (2) critiquer tes productions écrites, (3) générer des exercices ou flashcards ciblés. <strong>Ne lui demande pas de faire à ta place</strong> — demande-lui de créer les conditions pour que tu travailles toi-même.',
      },
    ],
  },
  {
    title: '🎯 Penser stratégiquement',
    cards: [
      {
        hot: true,
        title: 'Faire des annales d\'abord',
        desc: 'Avant de réviser un chapitre, <strong>regarde les annales</strong>. Ce que l\'exam demande réellement ≠ ce que le cours contient. Identifier les types de questions, la structure attendue, le vocabulaire évalué = <strong>réviser ce qui compte, pas tout</strong>. C\'est la différence entre 4 heures efficaces et 10 heures perdues.',
      },
      {
        hot: true,
        title: 'La règle des 80/20',
        desc: 'Dans chaque matière, <strong>20% des notions tombent dans 80% des examens</strong>. Identifie ces 20% (annales + correction des DS) et maîtrise-les à 100% avant de t\'attaquer au reste. Un élève qui maîtrise parfaitement les fondamentaux bat un élève qui survole tout.',
      },
      {
        title: 'Comprendre les attentes avant tout',
        desc: 'Chaque matière a un <strong>format d\'évaluation précis</strong> avec ses critères implicites. Connais-les avant de réviser : en histoire-géo on attend un plan structuré et des exemples précis, en maths une rédaction rigoureuse étape par étape, en SVT une démarche scientifique. <strong>Réviser sans connaître les attentes = travailler dans le vide.</strong>',
      },
      {
        title: 'Gérer son temps en exam : ne jamais s\'acharner',
        desc: 'Si une question bloque après 5 min, <strong>passe à la suivante et reviens à la fin.</strong> Les questions difficiles en début de sujet font perdre du temps sur des questions faciles en fin. Souvent, les dernières questions d\'un exercice sont plus accessibles qu\'elles n\'y paraissent une fois le reste traité. <strong>Note la question skippée pour ne pas l\'oublier.</strong>',
      },
    ],
  },
];

// ─── SECONDE ─────────────────────────────────────────────────────────────────

export const SECONDE_SUBJECTS: SubjectCard[] = [
  {
    code: 'Mx', name: 'Mathématiques',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA t\'interroge sur un chapitre', desc: '"Tu es un prof de maths seconde. Pose-moi 6 exercices progressifs sur [chapitre]. Corrige ma démarche à chaque fois, pas juste le résultat." Rejoue jusqu\'à zéro erreur.' },
          { icon: '✦', tags: ['actif'], title: 'Exos en boucle, cours appris en faisant', desc: 'Ne lis pas le cours d\'abord. <strong>Lance-toi directement dans les exercices.</strong> Quand tu bloques, regarde uniquement la notion qui manque, puis continue. Tu assimiles le cours en contexte — ça reste infiniment mieux.' },
        ],
      },
      {
        label: 'S\'entraîner', methods: [
          { icon: '✦', tags: ['actif'], title: 'Refaire les exos ratés à blanc', desc: 'Pour chaque exo raté : <strong>attends 24h, puis refais-le de mémoire</strong> sans regarder la correction. Ce que tu rates encore = priorité absolue. Ce que tu réussis = acquis.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards formules sur Anki', desc: 'Génère tes flashcards avec l\'IA : <strong>"Fais-moi 15 flashcards Q/R sur les formules et identités remarquables de seconde."</strong> 10 min par jour sur Anki = plus jamais de trou sur les formules.' },
        ],
      },
      {
        label: 'Pendant le contrôle — tous types', methods: [
          { icon: '◆', title: 'Lire tout le sujet avant d\'écrire la première ligne', desc: 'Survole l\'intégralité des questions en 3 min. Identifie celles qui sont courtes ou familières — commence par elles. <strong>Un QCM bien traité en 5 min vaut autant qu\'un exercice raté en 20 min.</strong>' },
          { icon: '◆', title: 'Ne jamais laisser de blanc', desc: 'Même si tu ne sais pas : <strong>écris les données de l\'énoncé, la formule ou la propriété que tu penses utiliser, et le début du raisonnement.</strong> Un blanc = zéro garanti.' },
        ],
      },
      {
        label: 'Pendant le contrôle — exercices de calcul', methods: [
          { icon: '⏱', title: 'Écrire données, inconnue et loi avant toute formule', desc: 'Trois lignes obligatoires : <strong>Données / Inconnue / Loi ou formule utilisée.</strong> Si tu te trompes de loi, le correcteur voit quand même que ta démarche est structurée.' },
          { icon: '⏱', title: 'Vérifier l\'ordre de grandeur de chaque résultat', desc: 'Après chaque résultat : <strong>est-ce que ce nombre a un sens ?</strong> Une probabilité > 1, une longueur négative — ce sont des erreurs détectables en 5 secondes.' },
        ],
      },
    ],
  },
  {
    code: 'PC', name: 'Physique-Chimie',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA génère des contrôles complets sur chaque chapitre', desc: '"Génère un contrôle de physique-chimie niveau seconde sur [chapitre], durée 45 min. Inclus un QCM, un exercice de calcul et une question de raisonnement. Corrige-moi ensuite question par question." Refais jusqu\'à 18+ sans erreur de méthode.' },
          { icon: '✦', tags: ['actif'], title: 'Maîtriser les 5 étapes de résolution jusqu\'à l\'automatisme', desc: 'À chaque exercice, sans exception : <strong>données → inconnue → loi → formule littérale → application numérique + unité.</strong> Un élève qui fait ça systématiquement ramasse presque tous les points de démarche même s\'il se trompe dans le calcul final.' },
        ],
      },
      {
        label: 'S\'entraîner', methods: [
          { icon: '✦', tags: ['actif'], title: 'Refaire à blanc les exos ratés — après 24h minimum', desc: 'Chaque exo raté : lis la correction, <strong>attends 24h, puis refais de zéro sans regarder.</strong> Passé ce délai tu ne te souviens plus de la correction — tu dois reconstruire le raisonnement toi-même.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards : loi + quand l\'utiliser + erreur classique', desc: 'Une flashcard par loi. Recto : nom. Verso : formule + <strong>dans quel contexte l\'appliquer + l\'erreur que font tous les élèves.</strong>' },
        ],
      },
      {
        label: 'Pendant le contrôle — exercices de calcul', methods: [
          { icon: '⏱', title: 'Les 5 étapes dans l\'ordre, sans exception', desc: '<strong>Données → inconnue → loi → formule littérale → application numérique + unité.</strong> Ne saute pas l\'étape formule littérale — c\'est elle qui te protège des erreurs de conversion.' },
          { icon: '⏱', title: 'Continuer avec une valeur fictive si tu bloques', desc: 'Écris <strong>"On admet que [grandeur] = [valeur estimée]"</strong> et continue. Les sous-questions sont souvent notées indépendamment — tu peux récupérer des points sur la méthode même avec un calcul intermédiaire faux.' },
          { icon: '⏱', title: 'Unité à chaque résultat, résultat final encadré', desc: '<strong>Chaque résultat numérique doit avoir son unité.</strong> Un résultat sans unité est une réponse incomplète — point perdu systématiquement.' },
        ],
      },
    ],
  },
  {
    code: 'Fr', name: 'Français',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA corrige tes paragraphes', desc: 'Écris un paragraphe de commentaire, colle-le : <strong>"Évalue ce paragraphe niveau seconde — structure, argument, vocabulaire littéraire. Dis-moi exactement ce qui manque."</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'Analyse à blanc sur texte inconnu', desc: 'Demande à l\'IA un texte littéraire inédit du même siècle que le programme. Analyse-le seul. <strong>Compare ensuite avec l\'analyse de l\'IA</strong> et identifie ce que tu as manqué.' },
        ],
      },
      {
        label: 'Maîtriser le format', methods: [
          { icon: '✦', tags: ['ia','actif'], title: 'Rédiger une intro de commentaire chronométrée', desc: 'Prends un texte du cours, chronomètre 30 min, rédige l\'introduction complète. <strong>Si l\'intro n\'est pas structurée et fluide en 30 min, c\'est la première chose à travailler.</strong> Soumet ensuite à l\'IA pour correction.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['espace'], title: 'Flashcards vocabulaire d\'analyse littéraire', desc: 'Recto : nom du procédé (métaphore, anaphore, ironie...). Verso : définition courte + exemple tiré d\'un texte du cours. <strong>L\'objectif n\'est pas d\'en avoir 50 — c\'est de maîtriser parfaitement ceux qui reviennent tout le temps.</strong>' },
        ],
      },
      {
        label: 'Pendant le contrôle — analyse de texte', methods: [
          { icon: '⏱', title: 'Annoter le texte avant d\'écrire la première phrase', desc: 'Lis le texte deux fois. Pendant la deuxième : <strong>entoure chaque procédé stylistique, souligne les mots-clés, note dans la marge l\'effet produit.</strong> "Anaphore → insistance", "champ lexical de la mort → atmosphère pesante".' },
          { icon: '⏱', title: 'Chaque remarque : procédé → effet → sens', desc: '<strong>Ne jamais citer un procédé sans l\'interpréter, ne jamais interpréter sans citer le texte.</strong> Structure : "L\'auteur utilise [procédé] — par exemple [citation] — ce qui [effet], suggérant ainsi [interprétation]."' },
        ],
      },
    ],
  },
  {
    code: 'HG', name: 'Histoire-Géographie',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['actif'], title: 'Apprendre le plan du cours, pas le cours', desc: 'En histoire-géo, <strong>la structure prime sur les détails.</strong> Mémorise d\'abord le plan complet (titres de parties et sous-parties) avant d\'apprendre les faits. Un plan solide en tête = tu ne perds jamais le fil en exam.' },
          { icon: '✦', tags: ['actif'], title: 'Feuille blanche : restituer le cours sans support', desc: 'Ferme tout. Prends une feuille vierge, reconstitue le plan du chapitre puis remplis chaque partie avec les faits, dates et acteurs. <strong>Ce qui est vide sur ta feuille = ce que tu dois retravailler.</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'L\'IA pose des questions sur ton chapitre', desc: '"Pose-moi 8 questions de contrôle niveau seconde sur [chapitre], mélange faits, dates, acteurs et mécanismes. Corrige mes réponses et explique ce que j\'ai raté." À faire après la feuille blanche.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['espace'], title: 'Flashcards dates-événements-acteurs sur Anki', desc: 'Une flashcard par fait clé : recto = date ou nom, verso = contexte + importance. <strong>En histoire-géo, les faits précis font la différence entre 12 et 16.</strong>' },
        ],
      },
      {
        label: 'Pendant le contrôle — composition', methods: [
          { icon: '⏱', title: 'Plan sur brouillon d\'abord — toujours', desc: 'Jamais de première phrase sans plan complet sur brouillon. <strong>Deux parties minimum, deux sous-parties minimum par partie.</strong> Un plan sans sous-parties = une copie sans argument. 10-15 min de brouillon évitent 2h de hors-sujet.' },
          { icon: '⏱', title: 'Chaque argument ancré dans un fait précis', desc: 'Chaque idée doit s\'appuyer sur <strong>une date, un lieu, un acteur ou un événement précis.</strong> "La mondialisation s\'est accélérée" ne vaut rien. "La mondialisation s\'est accélérée après les accords du GATT de 1947 et l\'OMC en 1995" rapporte des points.' },
        ],
      },
    ],
  },
  {
    code: 'SVT', name: 'SVT',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA t\'interroge sur les mécanismes biologiques', desc: '"Tu es un prof de SVT seconde. Pose-moi 5 questions sur [chapitre] qui testent ma compréhension des mécanismes, pas juste ma mémoire. Corrige ma démarche scientifique à chaque fois."' },
          { icon: '✦', tags: ['actif'], title: 'Expliquer un mécanisme à voix haute sans notes', desc: 'Ferme ton cours et explique le mécanisme à voix haute comme si tu l\'enseignais. <strong>Chaque blocage = une lacune précise à combler.</strong> Ce qui semble "flou" dans ta tête sera noté zéro à l\'exam.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards schémas et définitions', desc: 'Génère tes flashcards : <strong>"Fais-moi 15 flashcards sur [chapitre] SVT seconde — couvre les définitions clés, les organes/structures et les mécanismes."</strong> Inclus des schémas simplifiés quand c\'est utile.' },
        ],
      },
      {
        label: 'Pendant le contrôle — questions de raisonnement', methods: [
          { icon: '⏱', title: 'Toujours raisonner à partir des documents', desc: 'En SVT, les questions de raisonnement demandent toujours de <strong>partir des documents avant de mobiliser tes connaissances.</strong> "D\'après le document 1..." puis "Or, d\'après le cours...". Un raisonnement qui ignore les documents = hors-sujet.' },
          { icon: '⏱', title: 'Schéma bilan si demandé : propre, légendé, titré', desc: '<strong>Un schéma non légendé ne vaut rien.</strong> Titre + flèches + légende complète = schéma noté. Propre ne veut pas dire artistique — il faut que ce soit lisible et structuré.' },
        ],
      },
    ],
  },
];

// ─── PREMIÈRE ────────────────────────────────────────────────────────────────

export const PREMIERE_SUBJECTS: SubjectCard[] = [
  {
    code: 'Fr', name: 'Français — EAF',
    categories: [
      {
        label: 'Maîtriser le format — Oral', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'Explication linéaire à blanc, chronométrée', desc: 'Prends un texte au programme. Ferme tes notes. Fais l\'explication linéaire complète à voix haute — mouvements, procédés, interprétations — en 10 min chrono. <strong>Si tu bafouilles ou tu sautes un passage : c\'est ce qu\'il faut retravailler.</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'Simulation d\'entretien EAF sur l\'œuvre choisie', desc: '"Tu es examinateur au bac de français. Je viens de présenter un texte de [titre de l\'œuvre choisie]. Pose-moi 3 questions déstabilisantes sur l\'œuvre, l\'auteur et le parcours associé." Rejoue jusqu\'à répondre sans hésitation.' },
        ],
      },
      {
        label: 'Maîtriser le format — Écrit', methods: [
          { icon: '✦', tags: ['ia','actif'], title: 'Maîtriser la structure du commentaire composé', desc: 'Entraîne-toi sur la construction des axes d\'abord — deux ou trois axes thématiques cohérents avec sous-parties. Soumets ton plan à l\'IA : <strong>"Valide ce plan de commentaire. Est-ce que les axes sont distincts, progressifs, ancrés dans le texte ?"</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'Plan de dissertation détaillé, puis comparaison IA', desc: 'Fais un plan complet : grandes parties → sous-parties → idée principale → exemple associé. Puis demande à l\'IA de comparer avec le sien et d\'expliquer les différences.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['espace'], title: 'Citations classées par thème sur Anki', desc: '15-20 citations par œuvre, classées par thème (amour, pouvoir, mort...). Objectif : <strong>sortir une citation en 10 secondes sur n\'importe quel thème.</strong> En oral, citer le texte précisément = signal de maîtrise immédiat pour l\'examinateur.' },
        ],
      },
      {
        label: 'Pendant l\'épreuve — commentaire', methods: [
          { icon: '⏱', title: '1h de brouillon minimum avant la première phrase', desc: 'Lis le texte trois fois. À la troisième : entoure chaque procédé, note l\'effet dans la marge, puis construis 2-3 axes sur brouillon avec les procédés rattachés à chacun. <strong>Un axe sans procédé = un axe sans preuve. Commence à rédiger seulement quand chaque axe a au moins 2 procédés solides.</strong>' },
          { icon: '⏱', title: 'Structure obligatoire : procédé → citation → effet → sens', desc: 'Chaque remarque suit toujours le même schéma : <strong>procédé identifié + citation courte + effet produit + interprétation.</strong> Une remarque sans cette structure complète = demi-point au lieu d\'un point.' },
        ],
      },
    ],
  },
  {
    code: 'Mx', name: 'Mathématiques',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA t\'interroge et corrige ta démarche', desc: '"Tu es un prof de maths première spécialité. Pose-moi des exercices progressifs sur [chapitre]. Corrige chaque étape de ma démarche, pas seulement le résultat final." Rejoue jusqu\'à zéro erreur de raisonnement.' },
          { icon: '✦', tags: ['actif'], title: 'Exos en boucle, cours consulté au minimum', desc: 'Lance-toi dans les exercices. Bloque, <strong>consulte uniquement la notion qui manque</strong>, continue. C\'est en contexte que les notions s\'ancrent — pas à la relecture.' },
        ],
      },
      {
        label: 'S\'entraîner', methods: [
          { icon: '✦', tags: ['actif'], title: 'Annales bac chronométrées en conditions réelles', desc: '1 sujet complet par semaine, conditions réelles. Corrige-toi toi-même avant de regarder le corrigé. <strong>L\'écart entre les deux = ce qu\'il faut travailler.</strong>' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards formules, définitions et propriétés', desc: '"Génère-moi 20 flashcards sur [chapitre] maths première — couvre formules, définitions et propriétés avec le contexte d\'utilisation pour chacune."' },
          { icon: '✦', tags: ['actif'], title: 'Journal d\'erreurs actif', desc: 'Pour chaque exo raté : <strong>type d\'erreur (calcul, raisonnement, méthode) → cause racine → règle à retenir.</strong> Relis avant chaque DS.' },
        ],
      },
      {
        label: 'Pendant le contrôle', methods: [
          { icon: '◆', title: 'Ne jamais laisser de blanc — poser la démarche', desc: 'Pose toujours ce que tu sais : la propriété que tu penses utiliser, les hypothèses, le début du raisonnement. <strong>Une démarche structurée et incomplète rapporte plus qu\'un résultat juste sans justification.</strong>' },
          { icon: '⏱', title: 'Chaque affirmation justifiée — référence à la propriété', desc: '"D\'après le théorème des valeurs intermédiaires...", "Or f est continue sur [a,b]...". <strong>Une affirmation vraie sans justification = zéro point.</strong>' },
        ],
      },
    ],
  },
  {
    code: 'PC', name: 'Physique-Chimie',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA génère des sujets complets par chapitre', desc: '"Génère un sujet de physique-chimie niveau première sur [chapitre], durée 45 min. Inclus un QCM, deux exercices et une question de synthèse. Corrige-moi question par question."' },
          { icon: '✦', tags: ['actif'], title: 'Résoudre des exercices sans regarder le cours', desc: 'Les 5 étapes systématiques : <strong>données → inconnue → loi → formule littérale → application numérique + unité.</strong> Ce réflexe = les points de démarche même si le résultat final est faux.' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards lois + contexte d\'application + piège', desc: '"Génère des flashcards sur les lois de [chapitre] avec le contexte d\'application et le piège classique pour chacune."' },
        ],
      },
      {
        label: 'Pendant le contrôle', methods: [
          { icon: '⏱', title: 'Continuer avec une valeur fictive si bloqué', desc: 'Écrire <strong>"On admet que [grandeur] = [valeur estimée]"</strong> et continuer. Les sous-questions sont souvent notées indépendamment — récupère les points sur la méthode.' },
        ],
      },
    ],
  },
  {
    code: 'HG', name: 'Histoire-Géographie',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['actif'], title: 'Plan du cours mémorisé avant les faits', desc: '<strong>La structure prime sur les détails.</strong> Mémorise le plan complet (parties + sous-parties) avant d\'apprendre les faits. Un plan solide = fil directeur garanti en exam.' },
          { icon: '✦', tags: ['ia','actif'], title: 'L\'IA simule une question d\'exam ouverte', desc: '"Pose-moi une question de composition ou de question problématisée sur [chapitre] niveau première. Évalue mon plan et mes arguments."' },
        ],
      },
      {
        label: 'Pendant l\'épreuve', methods: [
          { icon: '⏱', title: 'Plan sur brouillon avec sous-parties et exemples', desc: 'Avant la première phrase : plan complet avec <strong>exemples concrets associés à chaque sous-partie.</strong> Un plan sans exemple = une copie sans argument.' },
        ],
      },
    ],
  },
  {
    code: 'SES', name: 'SES',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'L\'IA te pose des questions sur les mécanismes économiques', desc: '"Tu es un prof de SES première. Pose-moi 6 questions sur [chapitre] — mélange définitions, mécanismes et applications. Corrige-moi et explique ce qui manque."' },
          { icon: '✦', tags: ['actif'], title: 'Schéma de causalité à blanc pour chaque mécanisme', desc: 'Ferme ton cours. Dessine les chaînes de causalité du mécanisme (ex: inflation → baisse du pouvoir d\'achat → baisse de la consommation). <strong>Ce qui n\'est pas fluide sur le schéma = ce qui sera bancal à l\'exam.</strong>' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['espace'], title: 'Flashcards définitions d\'auteurs et notions clés', desc: 'Recto : auteur ou notion. Verso : définition + mécanisme en une phrase + exemple chiffré si possible. <strong>En SES, citer un auteur précisément = signal de maîtrise.</strong>' },
        ],
      },
      {
        label: 'Pendant le contrôle — EC3 dissertation', methods: [
          { icon: '⏱', title: 'Plan en 3 parties avec argument + illustration pour chaque', desc: 'Avant d\'écrire : brouillon avec <strong>thèse de chaque partie + au moins un auteur ou donnée chiffrée par sous-partie.</strong> Un argument sans illustration = opinion, pas un argument.' },
        ],
      },
    ],
  },
];

// ─── TERMINALE ────────────────────────────────────────────────────────────────

export const TERMINALE_SUBJECTS: SubjectCard[] = [
  {
    code: 'Mx', name: 'Mathématiques',
    categories: [
      {
        label: 'S\'entraîner', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'Identifier les types de questions qui tombent au bac', desc: 'Fais un maximum d\'annales et note dans un cahier chaque type récurrent — limites, suites, intégrales, probabilités conditionnelles. <strong>La maîtrise de ces types = l\'essentiel de la note.</strong>' },
          { icon: '✦', tags: ['actif'], title: 'Annales bac chronométrées + autocorrection', desc: '1 sujet complet par semaine, conditions réelles. Corrige-toi toi-même avant de regarder le corrigé. L\'écart entre les deux = ce qu\'il faut travailler.' },
        ],
      },
      {
        label: 'Comprendre & ancrer', methods: [
          { icon: '✦', tags: ['actif'], title: 'Exos en boucle, cours consulté au minimum', desc: 'En terminale, l\'essentiel du temps doit être sur les exercices, pas sur le cours. Fais des exos, bloque, <strong>consulte la notion manquante</strong>, continue.' },
          { icon: '✦', tags: ['ia','actif'], title: 'Règle des 5-10 min : réfléchir, puis piste IA', desc: 'Sur un exo qui bloque : force-toi à chercher seul 5 à 10 min. Ce temps de friction est nécessaire. Passé ce délai : <strong>piste IA, jamais la solution directe.</strong>' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['actif'], title: 'Journal d\'erreurs actif', desc: 'Pour chaque exo raté : type d\'erreur (calcul, raisonnement, méthode) → cause racine → règle à retenir. <strong>Relis ce journal avant chaque DS et avant le bac.</strong>' },
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards formules, propriétés et définitions sur Anki', desc: '"Génère-moi 20 flashcards Q/R sur [chapitre] maths terminale, couvre formules, propriétés et définitions."' },
        ],
      },
      {
        label: 'Pendant le contrôle', methods: [
          { icon: '◆', title: 'Repérer les questions indépendantes — les traiter en premier', desc: '3 min de lecture globale. Repère les questions qui ne dépendent pas des précédentes. <strong>En terminale, beaucoup de sujets ont des parties autonomes.</strong>' },
          { icon: '◆', title: 'Ne jamais laisser de blanc — rédiger la démarche', desc: 'Pose toujours ce que tu sais. <strong>En terminale spé, les points de raisonnement sont souvent plus nombreux que les points de résultat.</strong>' },
          { icon: '⏱', title: 'Chaque affirmation justifiée — référence au théorème', desc: '"D\'après le théorème des valeurs intermédiaires...", "Or f est continue sur [a,b], donc d\'après le théorème de Rolle...". <strong>Une affirmation vraie sans justification = zéro point en terminale spé.</strong>' },
          { icon: '⏱', title: 'Si tu bloques sur une étape — admettre et continuer', desc: 'Écrire <strong>"On admet que [résultat]"</strong> et continuer la démonstration. Les questions suivantes sont souvent notées indépendamment du résultat admis.' },
        ],
      },
    ],
  },
  {
    code: 'PC', name: 'Physique-Chimie',
    categories: [
      {
        label: 'S\'entraîner', methods: [
          { hot: true, icon: '✦', tags: ['actif'], title: 'Sujets bac complets en conditions réelles', desc: '1 sujet complet par semaine. Conditions réelles, pas de notes ouvertes. <strong>Ce qui reste imprécis après l\'autocorrection = priorité absolue pour la semaine suivante.</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'L\'IA génère des exercices sur les points faibles', desc: '"Tu es un prof de physique terminale. Je rate systématiquement les exercices sur [type]. Génère-moi 4 exercices progressifs sur ce type précis. Corrige ma démarche étape par étape."' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['ia','espace'], title: 'Flashcards lois avec contexte et piège', desc: 'Une flashcard par loi : recto = nom + domaine d\'application, verso = <strong>formule + conditions d\'application + erreur classique des élèves.</strong>' },
        ],
      },
      {
        label: 'Pendant le contrôle', methods: [
          { icon: '⏱', title: 'Les 5 étapes systématiques sur chaque exercice de calcul', desc: '<strong>Données → inconnue → loi → formule littérale → application numérique + unité.</strong> En terminale, cette rigueur différencie les 15 des 18.' },
          { icon: '⏱', title: 'Admettre et continuer si calcul intermédiaire bloqué', desc: '"On admet que [résultat] = [valeur]." <strong>Les questions suivantes sont notées indépendamment.</strong> Ne reste jamais bloqué plus de 5 min sur un calcul intermédiaire.' },
        ],
      },
    ],
  },
  {
    code: 'Ph', name: 'Philosophie',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['ia','actif'], title: 'Plan de dissertation complet, puis comparaison IA', desc: 'Fais ton plan complet : problématique + 3 parties + sous-parties + exemples et auteurs. Soumets à l\'IA : <strong>"Évalue ce plan de dissertation bac de philo. La problématique est-elle bien posée ? Les parties progressent-elles ?"</strong>' },
          { icon: '✦', tags: ['ia','actif'], title: 'Simulation d\'oral de rattrapage sur une notion', desc: '"Tu es un examinateur au bac de philo. Interroge-moi pendant 10 min sur la notion [liberté / conscience / vérité...]. Pose des questions qui déstabilisent et évalue mes réponses."' },
        ],
      },
      {
        label: 'Mémoriser', methods: [
          { icon: '✦', tags: ['espace'], title: 'Flashcards auteurs : thèse + œuvre + citation clé', desc: 'Recto : nom de l\'auteur. Verso : <strong>thèse principale + œuvre associée + une citation mémorisable.</strong> 15-20 auteurs suffit — maîtrisés à fond plutôt que survolés.' },
          { icon: '✦', tags: ['espace'], title: 'Flashcards notions : définition + problème qu\'elles posent', desc: 'Recto : notion du programme (liberté, temps, langage...). Verso : <strong>définition courte + la tension philosophique centrale + un auteur qui l\'illustre.</strong>' },
        ],
      },
      {
        label: 'Pendant l\'épreuve — dissertation', methods: [
          { icon: '⏱', title: '1h de brouillon avant la première phrase — obligatoire', desc: 'Reformule le sujet, identifie les concepts clés, pose ta problématique, construis ton plan avec sous-parties et exemples. <strong>Commencer à rédiger avant d\'avoir un plan complet = hors-sujet garanti.</strong>' },
          { icon: '⏱', title: 'Chaque argument : thèse + exemple + référence d\'auteur', desc: 'Structure de chaque paragraphe : <strong>idée directrice → développement → exemple concret ou littéraire → référence philosophique précise → mini-conclusion.</strong> Un paragraphe sans auteur = un paragraphe faible.' },
        ],
      },
      {
        label: 'Pendant l\'épreuve — explication de texte', methods: [
          { icon: '⏱', title: 'Identifier la thèse avant d\'identifier les arguments', desc: 'Commence par trouver ce que l\'auteur veut démontrer. <strong>Toute l\'analyse découle de la thèse.</strong> Un élève qui explique le texte sans avoir identifié la thèse commente des phrases isolées.' },
          { icon: '⏱', title: 'Expliquer chaque concept clé du texte', desc: 'Chaque terme important utilisé par l\'auteur doit être expliqué avec tes mots. <strong>"Ce que l\'auteur entend par [terme]..."</strong> Sauter cette étape = ne pas faire d\'explication de texte.' },
        ],
      },
    ],
  },
  {
    code: 'HG', name: 'Histoire-Géographie-Géopolitique',
    categories: [
      {
        label: 'Comprendre & ancrer', methods: [
          { hot: true, icon: '✦', tags: ['actif'], title: 'Maîtriser le plan avant les faits', desc: 'En HGGSP comme en HG, <strong>la structure prime.</strong> Mémorise le plan complet du chapitre en premier. Un plan solide = tu ne perds jamais le fil en composition.' },
          { icon: '✦', tags: ['ia','actif'], title: 'L\'IA simule des questions problématisées', desc: '"Pose-moi une question de composition sur [chapitre] niveau terminale HGGSP. Évalue mon plan, ma problématique et mes arguments."' },
        ],
      },
      {
        label: 'Pendant le contrôle', methods: [
          { icon: '⏱', title: 'Problématique explicite dans l\'introduction', desc: 'La problématique doit être <strong>une vraie question qui n\'a pas de réponse évidente.</strong> "Pourquoi X ?" ou "Dans quelle mesure Y ?" — jamais une question factuelle à laquelle on peut répondre par oui/non.' },
        ],
      },
    ],
  },
];

// ─── PROMPTS IA ───────────────────────────────────────────────────────────────

export const PROMPT_GROUPS: PromptGroup[] = [
  {
    label: '📎 Avec ton cours en pièce jointe',
    prompts: [
      {
        title: 'Interroge-moi sur mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours en pièce jointe]
Tu es un professeur de [matière] en classe de [niveau]. Je t'envoie mon cours sur [chapitre]. Pose-moi 6 questions progressives basées uniquement sur ce cours : les 2 premières sur les définitions et notions fondamentales, les 2 suivantes sur des applications directes, les 2 dernières sur des cas plus complexes ou des pièges classiques du programme.
Pose une question à la fois. Attends ma réponse avant de passer à la suivante. Corrige ma démarche — pas juste le résultat. Si je me trompe, explique pourquoi avec une référence précise à mon cours, et repose la question différemment jusqu'à ce que je la réussisse.`,
      },
      {
        title: 'Génère des flashcards depuis mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours en pièce jointe]
Génère 20 flashcards Anki à partir de ce cours sur [chapitre] en [matière] niveau [niveau]. Utilise uniquement le contenu de mon cours — pas de notions extérieures.
Format strict :
RECTO : [question courte ou terme à définir — jamais une question fermée oui/non]
VERSO : [réponse précise en 1-2 phrases, avec les mots exacts du cours]
Commence par les définitions fondamentales, finis par les applications et cas particuliers. Rien d'autre dans ta réponse.`,
      },
      {
        title: 'Génère un sujet basé sur mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours en pièce jointe]
Génère un sujet de contrôle de [matière] niveau [niveau] basé uniquement sur ce cours, durée approximative [durée]. Respecte le format exact utilisé en classe : [décris le format — ex: QCM 5 questions + 1 exercice + 1 question de raisonnement].
Contraintes : aucune notion hors programme, aucune indication de réponse, niveau de difficulté réaliste pour un DS de milieu d'année. Génère uniquement le sujet. Quand je te dis "j'ai fini", tu me donnes le corrigé complet basé sur mon cours.`,
      },
      {
        title: 'Corrige ma copie avec mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours ET ta copie en pièces jointes]
Voici la question posée : [colle la question]
Ma réponse : [colle ta réponse]
En te basant sur mon cours joint, corrige comme un professeur exigeant en 4 points : (1) ce qui est juste — cite les passages de mon cours qui le confirment, (2) ce qui est faux ou imprécis — explique l'erreur et indique où se trouve la bonne réponse dans mon cours, (3) ce qui manque que j'aurais dû écrire, (4) une note indicative sur 10 avec justification.`,
      },
      {
        title: 'Donne-moi une piste depuis mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours en pièce jointe]
Je bloque sur cet exercice de [matière]. Énoncé : [colle l'énoncé]
Ce que j'ai essayé : [décris ton raisonnement]
Où je bloque exactement : [sois précis]
Règle absolue : ne me donne pas la solution. En te basant sur mon cours joint, dis-moi si ma piste de départ est correcte. Puis indique-moi uniquement dans quelle partie de mon cours se trouve ce dont j'ai besoin, et pose-moi une seule question pour m'aider à y arriver moi-même.`,
      },
      {
        title: 'Analyse mes erreurs avec mon cours',
        scope: 'Toutes matières · Tous niveaux',
        withFile: true,
        text: `[Joins ton cours ET ta copie corrigée en pièces jointes]
En te basant sur mon cours et ma copie corrigée, analyse mes erreurs en 3 points : (1) pour chaque erreur, identifie le passage précis de mon cours que je n'ai pas maîtrisé, (2) classe ces lacunes par priorité — laquelle est la plus bloquante pour la suite ? (3) construis-moi un programme de révision ciblé pour les 48h à venir : quelles parties de mon cours retravailler, dans quel ordre, et comment vérifier que c'est acquis.`,
      },
    ],
  },
  {
    label: '✦ Sans pièce jointe',
    prompts: [
      {
        title: 'Génère un contrôle complet sur un chapitre',
        scope: 'Toutes matières · Tous niveaux',
        text: `Tu es un professeur de [matière] en classe de [niveau]. Génère un sujet de contrôle complet sur [chapitre], durée [durée]. Respecte le format exact du lycée : [décris le format habituel de la matière]. Niveau de difficulté : réaliste pour un DS de milieu d'année. Ne donne pas le corrigé. Quand je te dis "j'ai fini", fournis le corrigé complet avec les points par question.`,
      },
      {
        title: 'Crée un plan de révision personnalisé',
        scope: 'Toutes matières · Tous niveaux',
        text: `Je passe un contrôle de [matière] dans [X jours]. Les chapitres au programme sont : [liste]. Mes points faibles sont : [liste]. Mon temps de travail disponible est [X heures] réparties sur [X jours].
Construis-moi un plan de révision détaillé jour par jour, avec pour chaque session : ce qu'il faut réviser, dans quel ordre, et comment vérifier que c'est acquis (exercice précis, question à se poser). Priorise ce qui a le plus de poids au contrôle et ce où je suis le plus faible.`,
      },
      {
        title: 'Interroge-moi sur un chapitre',
        scope: 'Toutes matières · Tous niveaux',
        text: `Tu es un professeur de [matière] en classe de [niveau]. Interroge-moi sur [chapitre] avec 6 questions progressives : les 2 premières sur les définitions fondamentales, les 2 suivantes sur des applications, les 2 dernières sur des cas complexes ou des pièges.
Pose une question à la fois. Attends ma réponse. Corrige ma démarche en détail — pas juste le résultat. Si je me trompe, explique l'erreur et repose la question différemment.`,
      },
    ],
  },
];
