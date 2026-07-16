import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const MECA_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'L\'atome le plus électronégatif est…',
    options: [
      { label: 'a', text: '$\\text{C}$' },
      { label: 'b', text: '$\\text{O}$' },
      { label: 'c', text: '$\\text{F}$' },
      { label: 'd', text: '$\\text{H}$' },
    ],
    answer: 'c',
  },
  {
    n: 2,
    text: 'Une liaison est considérée apolaire si…',
    options: [
      { label: 'a', text: '$\\Delta\\chi<0{,}4$' },
      { label: 'b', text: '$\\Delta\\chi>0{,}4$' },
      { label: 'c', text: '$\\Delta\\chi=1$' },
      { label: 'd', text: '$\\Delta\\chi>1{,}7$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Dans une liaison $\\text{C}-\\text{O}$, le $\\delta-$ est porté par…',
    options: [
      { label: 'a', text: 'le carbone' },
      { label: 'b', text: 'l\'oxygène' },
      { label: 'c', text: 'les deux' },
      { label: 'd', text: 'aucun' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Un site donneur possède…',
    options: [
      { label: 'a', text: 'une charge $\\delta+$' },
      { label: 'b', text: 'un doublet non liant ou une charge négative' },
      { label: 'c', text: 'un proton' },
      { label: 'd', text: 'un carbocation' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Une flèche courbe part…',
    options: [
      { label: 'a', text: 'du site accepteur vers le donneur' },
      { label: 'b', text: 'du site donneur vers l\'accepteur' },
      { label: 'c', text: 'd\'un atome vers un autre' },
      { label: 'd', text: 'au hasard' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Une flèche courbe représente le mouvement…',
    options: [
      { label: 'a', text: 'd\'un atome' },
      { label: 'b', text: 'd\'un doublet d\'électrons' },
      { label: 'c', text: 'd\'un proton' },
      { label: 'd', text: 'd\'une charge' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Un intermédiaire réactionnel est…',
    options: [
      { label: 'a', text: 'présent dans le bilan' },
      { label: 'b', text: 'formé puis consommé' },
      { label: 'c', text: 'consommé puis régénéré' },
      { label: 'd', text: 'un catalyseur' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Le rendement d\'une synthèse vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{n_{\\max}}{n_{\\text{obtenu}}}$' },
      { label: 'b', text: '$\\dfrac{n_{\\text{obtenu}}}{n_{\\max}}$' },
      { label: 'c', text: '$n_{\\text{obtenu}}\\times n_{\\max}$' },
      { label: 'd', text: '$1-n_{\\text{obtenu}}$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'L\'économie d\'atomes est une grandeur…',
    options: [
      { label: 'a', text: 'expérimentale' },
      { label: 'b', text: 'théorique, calculée sur l\'équation' },
      { label: 'c', text: 'égale au rendement' },
      { label: 'd', text: 'qui dépend des pertes' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Une réaction d\'addition a une économie d\'atomes de…',
    options: [
      { label: 'a', text: '$50\\,\\%$' },
      { label: 'b', text: '$83\\,\\%$' },
      { label: 'c', text: '$100\\,\\%$' },
      { label: 'd', text: 'variable' },
    ],
    answer: 'c',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const MECA_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'meca-1',
    context: 'Électronégativités (Pauling) : $\\text{H}\\ 2{,}20$ · $\\text{C}\\ 2{,}55$ · $\\text{Br}\\ 2{,}96$ · $\\text{N}\\ 3{,}04$ · $\\text{Cl}\\ 3{,}16$ · $\\text{O}\\ 3{,}44$ · $\\text{F}\\ 3{,}98$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir l\'électronégativité. Classer par électronégativité croissante : $\\text{C}$, $\\text{F}$, $\\text{H}$, $\\text{N}$, $\\text{O}$.' },
      ],
    }],
  },
  {
    id: 'meca-2',
    context: 'Seuil : $\\Delta\\chi<0{,}4$ ⟹ liaison considérée apolaire.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour chacune des liaisons suivantes, calculer $\\Delta\\chi$, indiquer si elle est polarisée, et placer les charges partielles : $\\text{C}-\\text{O}$ ; $\\text{O}-\\text{H}$ ; $\\text{C}-\\text{Cl}$ ; $\\text{C}-\\text{N}$.' },
      ],
    }],
  },
  {
    id: 'meca-3',
    context: 'Sites donneurs et accepteurs de doublet d\'électrons.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir un site donneur et un site accepteur de doublet d\'électrons. Citer, pour chacun, les trois façons de le reconnaître.' },
      ],
    }],
  },
  {
    id: 'meca-4',
    context: 'Reconnaître un site à partir de sa structure électronique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Indiquer si chaque espèce est un site donneur ou accepteur, en justifiant : $\\text{HO}^-$ ; $\\text{H}^+$ ; le carbone d\'un $\\text{C}=\\text{O}$ ; l\'oxygène d\'un $\\text{C}=\\text{O}$ ; $\\text{NH}_3$.' },
      ],
    }],
  },
  {
    id: 'meca-5',
    context: 'La convention de la flèche courbe.',
    parts: [{
      questions: [
        { n: 'a', text: 'Que représente une flèche courbe ? D\'où part-elle et où pointe-t-elle ?' },
        { n: 'b', text: 'Citer les trois erreurs les plus fréquentes.' },
      ],
    }],
  },
  {
    id: 'meca-6',
    context: 'Rendement : $\\eta=\\dfrac{n_{\\text{obtenu}}}{n_{\\max}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une synthèse peut donner au maximum $0{,}100\\,\\text{mol}$ de produit ; on en obtient $0{,}072\\,\\text{mol}$. Calculer le rendement.' },
      ],
    }],
  },
  {
    id: 'meca-7',
    context: 'L\'architecture d\'un protocole de synthèse.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer, dans l\'ordre, les quatre étapes d\'un protocole de synthèse. Donner une technique pour chacune.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'meca-8',
    context: 'Le cas structurant de la liaison $\\text{C}-\\text{H}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\Delta\\chi(\\text{C}-\\text{H})$. Cette liaison est-elle polarisée ?' },
        { n: 'b', text: 'Quelle conséquence pour un carbone entouré uniquement d\'atomes de carbone et d\'hydrogène ?' },
      ],
    }],
  },
  {
    id: 'meca-9',
    context: 'Le seuil de $0{,}4$ est une convention commode.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\Delta\\chi(\\text{C}-\\text{Br})$. Comparer au seuil de $0{,}4$.' },
        { n: 'b', text: 'Que peut-on en conclure sur cette liaison, et quelle prudence cela impose-t-il quant à l\'usage d\'un seuil ?' },
      ],
    }],
  },
  {
    id: 'meca-10',
    context: 'Plus $\\Delta\\chi$ est grand, plus la liaison est polarisée.',
    parts: [{
      questions: [
        { n: 'a', text: 'Parmi $\\text{C}-\\text{F}$, $\\text{C}-\\text{Cl}$ et $\\text{C}-\\text{Br}$, laquelle est la plus polarisée ? Justifier par le calcul.' },
        { n: 'b', text: 'Dans laquelle le carbone porte-t-il le $\\delta+$ le plus marqué ?' },
      ],
    }],
  },
  {
    id: 'meca-11',
    context: 'Le chlorométhane $\\text{CH}_3-\\text{Cl}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Repérer le site accepteur et justifier.' },
        { n: 'b', text: 'Pourquoi les hydrogènes ne constituent-ils pas des sites significatifs ?' },
      ],
    }],
  },
  {
    id: 'meca-12',
    context: 'L\'éthanal $\\text{CH}_3-\\text{CHO}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Identifier un site donneur et un site accepteur.' },
        { n: 'b', text: 'Une même molécule peut-elle porter les deux ? Justifier.' },
      ],
    }],
  },
  {
    id: 'meca-13',
    context: 'Réaction $\\text{H}_2\\text{O}+\\text{H}^+\\to\\text{H}_3\\text{O}^+$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Identifier le site donneur et le site accepteur, puis décrire la flèche courbe et la liaison formée.' },
      ],
    }],
  },
  {
    id: 'meca-14',
    context: 'Rupture d\'une liaison polarisée.',
    parts: [{
      questions: [
        { n: 'a', text: 'Lors de la rupture d\'une liaison $\\text{C}-\\text{Br}$, d\'où part la flèche courbe et où pointe-t-elle ? Quelle espèce se forme ? Justifier par l\'électronégativité.' },
      ],
    }],
  },
  {
    id: 'meca-15',
    context: 'Équation bilan et mécanisme réactionnel.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelle différence entre l\'équation bilan et le mécanisme réactionnel ?' },
        { n: 'b', text: 'Que se passe-t-il lorsqu\'on additionne toutes les étapes d\'un mécanisme ?' },
      ],
    }],
  },
  {
    id: 'meca-16',
    context: 'Un rendement est toujours inférieur à $100\\,\\%$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pourquoi un rendement est-il toujours inférieur à $100\\,\\%$ ? Citer trois causes de nature différente.' },
      ],
    }],
  },
  {
    id: 'meca-17',
    context: 'Économie d\'atomes : $\\text{EA}=\\dfrac{M(\\text{produit désiré})}{\\sum M(\\text{réactifs})}\\times 100$. Masses molaires : $\\text{H}=1{,}0$ · $\\text{C}=12{,}0$ · $\\text{O}=16{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'économie d\'atomes de l\'estérification $\\text{CH}_3\\text{COOH}+\\text{C}_2\\text{H}_5\\text{OH}\\to\\text{CH}_3\\text{COOC}_2\\text{H}_5+\\text{H}_2\\text{O}$. Où part le complément ?' },
      ],
    }],
  },
  {
    id: 'meca-18',
    context: 'Le chauffage à reflux.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'est-ce qu\'un chauffage à reflux ? Quel double avantage présente-t-il ?' },
        { n: 'b', text: 'Modifie-t-il l\'état final du système ? Justifier.' },
      ],
    }],
  },
  {
    id: 'meca-19',
    context: 'Déplacer un équilibre à l\'aide du critère $Q_r$ vs $K$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer deux moyens d\'augmenter le taux d\'avancement final d\'une synthèse limitée. Justifier chacun à l\'aide du critère $Q_r$ vs $K$.' },
      ],
    }],
  },
  // ── TIER 3 — approfondissement ★★★ ─────────────────────────────────────────
  {
    id: 'meca-20',
    context: 'Repérer systématiquement les sites d\'une molécule.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire la méthode permettant de repérer systématiquement les sites donneurs et accepteurs d\'une molécule.' },
        { n: 'b', text: 'Quelles liaisons peut-on ignorer d\'emblée ?' },
      ],
    }],
  },
  {
    id: 'meca-21',
    context: 'Un intermédiaire réactionnel et un catalyseur sont tous deux absents de l\'équation bilan.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer précisément pourquoi, dans chaque cas — et en quoi les deux raisons sont opposées.' },
      ],
    }],
  },
  {
    id: 'meca-22',
    context: 'Ce que le mécanisme ne dit pas.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le mécanisme d\'une réaction permet-il de prévoir son sens d\'évolution ? Son état final ?' },
        { n: 'b', text: 'Justifier, et indiquer quelle grandeur répond à ces questions.' },
      ],
    }],
  },
  {
    id: 'meca-23',
    context: 'Masses molaires : $\\text{H}=1{,}0$ · $\\text{C}=12{,}0$ · $\\text{Br}=80{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'économie d\'atomes de l\'addition $\\text{C}_2\\text{H}_4+\\text{Br}_2\\to\\text{C}_2\\text{H}_4\\text{Br}_2$. Comparer au résultat de l\'estérification.' },
        { n: 'b', text: 'Pourquoi la chimie verte privilégie-t-elle les additions ?' },
      ],
    }],
  },
  {
    id: 'meca-24',
    context: 'Deux grandeurs de nature différente.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction a une économie d\'atomes de $100\\,\\%$ mais un rendement de $40\\,\\%$. Y a-t-il contradiction ? Expliquer la différence de nature entre les deux grandeurs.' },
      ],
    }],
  },
  {
    id: 'meca-25',
    context: 'Les principes de la chimie verte.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer quatre principes de la chimie verte. Pour chacun, indiquer brièvement le bénéfice visé.' },
      ],
    }],
  },
  // ── TIER 4 — sujets type bac ◆ ─────────────────────────────────────────────
  {
    id: 'meca-26',
    context: 'On étudie la réaction $\\text{HO}^-+\\text{CH}_3-\\text{Br}\\to\\text{CH}_3-\\text{OH}+\\text{Br}^-$. Données : $\\chi(\\text{H})=2{,}20$ · $\\chi(\\text{C})=2{,}55$ · $\\chi(\\text{Br})=2{,}96$ ; seuil $\\Delta\\chi<0{,}4$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\Delta\\chi(\\text{C}-\\text{Br})$ et placer les charges partielles sur cette liaison. Justifier que le carbone est un site accepteur.' },
        { n: 'b', text: 'Pourquoi les liaisons $\\text{C}-\\text{H}$ du groupe $\\text{CH}_3$ ne créent-elles pas de site accepteur ? Répondre par le calcul.' },
        { n: 'c', text: 'Identifier le site donneur de $\\text{HO}^-$. Citer les deux raisons qui en font un site donneur.' },
        { n: 'd', text: 'Décrire la première flèche courbe : point de départ, point d\'arrivée, liaison formée.' },
        { n: 'e', text: 'Une seconde flèche courbe est nécessaire. D\'où part-elle, où pointe-t-elle, et quelle espèce libère-t-elle ? Justifier par l\'électronégativité.' },
        { n: 'f', text: 'Vérifier que les charges se conservent entre les réactifs et les produits.' },
      ],
    }],
  },
  {
    id: 'meca-27',
    context: 'L\'aspirine est synthétisée selon : acide salicylique $\\text{C}_7\\text{H}_6\\text{O}_3$ + anhydride éthanoïque $\\text{C}_4\\text{H}_6\\text{O}_3$ → aspirine $\\text{C}_9\\text{H}_8\\text{O}_4$ + acide éthanoïque $\\text{C}_2\\text{H}_4\\text{O}_2$. On introduit $m=5{,}00\\,\\text{g}$ d\'acide salicylique et un **excès** d\'anhydride éthanoïque. Après transformation, isolement et purification, on recueille $4{,}80\\,\\text{g}$ d\'aspirine. Données : $\\text{H}=1{,}0$ · $\\text{C}=12{,}0$ · $\\text{O}=16{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les masses molaires des quatre espèces. Vérifier la conservation de la masse sur l\'équation.' },
        { n: 'b', text: 'Calculer la quantité de matière initiale d\'acide salicylique. Quel est le réactif limitant ? Justifier.' },
        { n: 'c', text: 'En déduire $n_{\\max}$ puis $m_{\\max}$ d\'aspirine.' },
        { n: 'd', text: 'Calculer le rendement de la synthèse. Le retrouver par un calcul en quantités de matière.' },
        { n: 'e', text: 'Calculer l\'économie d\'atomes de cette synthèse. Que devient le complément ?' },
        { n: 'f', text: 'Le rendement et l\'économie d\'atomes sont différents. Expliquer pourquoi ces deux grandeurs ne mesurent pas la même chose.' },
        { n: 'g', text: 'Citer une technique permettant de vérifier la pureté de l\'aspirine obtenue, et une permettant de confirmer sa structure.' },
      ],
    }],
  },
  {
    id: 'meca-28',
    context: 'On réalise l\'estérification $\\text{CH}_3\\text{COOH}+\\text{C}_2\\text{H}_5\\text{OH}\\rightleftharpoons\\text{CH}_3\\text{COOC}_2\\text{H}_5+\\text{H}_2\\text{O}$, de constante $K=4{,}0$, en mélangeant $0{,}500\\,\\text{mol}$ d\'acide et $0{,}500\\,\\text{mol}$ d\'alcool. On obtient $25{,}0\\,\\text{g}$ d\'ester.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $x_{\\max}$ puis la masse maximale d\'ester si la transformation était totale.' },
        { n: 'b', text: 'La transformation est limitée. Sachant que pour un mélange équimolaire et $K=4{,}0$ on a $\\tau=\\tfrac{2}{3}$, calculer $x_f$ puis la masse d\'ester attendue **à l\'équilibre**.' },
        { n: 'c', text: 'Calculer le rendement expérimental de la synthèse (par rapport à $m_{\\max}$).' },
        { n: 'd', text: 'Comparer ce rendement au taux d\'avancement à l\'équilibre. Interpréter l\'écart.' },
        { n: 'e', text: 'Calculer l\'économie d\'atomes. Cette grandeur dépend-elle du rendement ? Justifier.' },
        { n: 'f', text: 'Proposer deux modifications du protocole permettant d\'augmenter la masse d\'ester obtenue. Justifier chacune à l\'aide de $Q_r$ et $K$.' },
        { n: 'g', text: 'Du point de vue de la chimie verte, l\'estérification est-elle une réaction satisfaisante ? Discuter en s\'appuyant sur l\'économie d\'atomes et sur la nature du sous-produit.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const MECA_CORRECTIONS: Record<string, Correction> = {
  'meca-1': {
    steps: [
      { n: '1', text: 'L\'**électronégativité** $\\chi$ mesure la tendance d\'un atome à **attirer à lui** les électrons d\'une liaison covalente qu\'il forme.' },
      { n: '2', text: 'Par ordre croissant : $\\text{H}\\ (2{,}20) < \\text{C}\\ (2{,}55) < \\text{N}\\ (3{,}04) < \\text{O}\\ (3{,}44) < \\text{F}\\ (3{,}98)$.' },
    ],
    result: '$\\text{H}<\\text{C}<\\text{N}<\\text{O}<\\text{F}$.',
  },
  'meca-2': {
    steps: [
      { n: '1', text: '$\\text{C}-\\text{O}$ : $\\Delta\\chi=3{,}44-2{,}55=0{,}89$ → **polarisée**, $\\text{C}^{\\delta+}-\\text{O}^{\\delta-}$.' },
      { n: '2', text: '$\\text{O}-\\text{H}$ : $\\Delta\\chi=3{,}44-2{,}20=1{,}24$ → **très polarisée**, $\\text{O}^{\\delta-}-\\text{H}^{\\delta+}$.' },
      { n: '3', text: '$\\text{C}-\\text{Cl}$ : $\\Delta\\chi=3{,}16-2{,}55=0{,}61$ → **polarisée**, $\\text{C}^{\\delta+}-\\text{Cl}^{\\delta-}$.' },
      { n: '4', text: '$\\text{C}-\\text{N}$ : $\\Delta\\chi=3{,}04-2{,}55=0{,}49$ → **polarisée**, $\\text{C}^{\\delta+}-\\text{N}^{\\delta-}$.' },
      { n: '5', text: 'Dans tous les cas, l\'atome le **plus électronégatif** attire le doublet liant et porte $\\delta-$.' },
    ],
    result: 'Toutes polarisées : $0{,}89$ · $1{,}24$ · $0{,}61$ · $0{,}49$ — le plus électronégatif porte $\\delta-$.',
  },
  'meca-3': {
    steps: [
      { n: '1', text: '**Site donneur** : zone **riche** en électrons, capable de céder un doublet. On le reconnaît à un **doublet non liant**, une **charge négative**, ou une **liaison multiple** $\\text{C}=\\text{C}$.' },
      { n: '2', text: '**Site accepteur** : zone **pauvre** en électrons, capable de capter un doublet. On le reconnaît à une charge partielle $\\delta+$, ou à une **charge positive** ($\\text{H}^+$, carbocation).' },
    ],
    result: 'Donneur : doublet non liant · charge négative · liaison multiple. Accepteur : $\\delta+$ · charge positive.',
  },
  'meca-4': {
    steps: [
      { n: '1', text: '$\\text{HO}^-$ : **donneur** — charge négative *et* doublets non liants sur l\'oxygène.' },
      { n: '2', text: '$\\text{H}^+$ : **accepteur** — charge positive, aucun électron.' },
      { n: '3', text: 'Le carbone d\'un $\\text{C}=\\text{O}$ : **accepteur** — il porte $\\delta+$, l\'oxygène plus électronégatif attirant le doublet.' },
      { n: '4', text: 'L\'oxygène d\'un $\\text{C}=\\text{O}$ : **donneur** — doublets non liants et $\\delta-$.' },
      { n: '5', text: '$\\text{NH}_3$ : **donneur** — l\'azote porte un doublet non liant.' },
    ],
    result: 'donneur · accepteur · accepteur · donneur · donneur.',
  },
  'meca-5': {
    steps: [
      { n: '1', text: 'Une flèche courbe représente le **mouvement d\'un doublet d\'électrons**. Elle part **toujours** du site donneur et pointe **toujours** vers le site accepteur.' },
      { n: '2', text: '**Erreur 1** : faire suivre à la flèche un **atome** ou une **charge** — elle ne suit que les **électrons**.' },
      { n: '3', text: '**Erreur 2** : la faire partir d\'un site $\\delta+$ — toujours faux, elle va du **riche vers le pauvre**.' },
      { n: '4', text: '**Erreur 3** : la faire partir d\'un atome « en général » plutôt que d\'un **doublet** précis (non liant ou liant).' },
    ],
    result: 'Mouvement d\'un doublet, du donneur vers l\'accepteur. Erreurs : suivre un atome/une charge, partir d\'un $\\delta+$, partir d\'un atome et non d\'un doublet.',
  },
  'meca-6': {
    steps: [
      { n: '1', text: '$\\eta=\\dfrac{n_{\\text{obtenu}}}{n_{\\max}}=\\dfrac{0{,}072}{0{,}100}=0{,}72$.' },
      { n: '2', text: 'Soit $\\eta=72\\,\\%$.' },
    ],
    result: '$\\eta=72\\,\\%$.',
  },
  'meca-7': {
    steps: [
      { n: '1', text: '**Transformation** — chauffage à reflux, catalyseur, réactif en excès.' },
      { n: '2', text: '**Isolement** — extraction liquide-liquide, décantation, filtration.' },
      { n: '3', text: '**Purification** — recristallisation (solide), distillation (liquide).' },
      { n: '4', text: '**Identification** — CCM, spectroscopie IR ou RMN, mesure de la température de fusion.' },
    ],
    result: 'Transformation → isolement → purification → identification.',
  },
  'meca-8': {
    steps: [
      { n: '1', text: '$\\Delta\\chi(\\text{C}-\\text{H})=2{,}55-2{,}20=0{,}35$.' },
      { n: '2', text: 'Comme $0{,}35<0{,}4$, la liaison $\\text{C}-\\text{H}$ est considérée **apolaire**.' },
      { n: '3', text: '**Conséquence essentielle** : un carbone entouré uniquement de $\\text{C}$ et de $\\text{H}$ ne porte **aucune charge partielle**. Il n\'est donc **pas un site accepteur**. C\'est pourquoi, dans un mécanisme, on ignore d\'emblée tout le squelette hydrocarboné et l\'on ne s\'intéresse qu\'aux liaisons impliquant $\\text{O}$, $\\text{N}$ ou un halogène.' },
    ],
    result: '$\\Delta\\chi=0{,}35<0{,}4$ — apolaire ; le squelette $\\text{C}/\\text{H}$ ne crée aucun site.',
  },
  'meca-9': {
    steps: [
      { n: '1', text: '$\\Delta\\chi(\\text{C}-\\text{Br})=2{,}96-2{,}55=0{,}41$.' },
      { n: '2', text: 'C\'est **tout juste** au-dessus du seuil de $0{,}4$ : la liaison est donc formellement polarisée, mais **faiblement**. Le carbone porte un $\\delta+$ réel mais peu marqué.' },
      { n: '3', text: '**Prudence imposée** : le seuil de $0{,}4$ est une **convention commode**, pas une frontière physique. Autour de cette valeur, la polarisation ne bascule pas brutalement — elle varie continûment. Un écart de $0{,}41$ contre $0{,}35$ ne traduit pas une différence de nature, seulement de degré. Il faut donc lire ce seuil comme un **repère**, non comme une loi.' },
    ],
    result: '$\\Delta\\chi=0{,}41$ — polarisée, mais très faiblement : cas limite.',
  },
  'meca-10': {
    steps: [
      { n: '1', text: '$\\Delta\\chi(\\text{C}-\\text{F})=3{,}98-2{,}55=1{,}43$ · $\\Delta\\chi(\\text{C}-\\text{Cl})=0{,}61$ · $\\Delta\\chi(\\text{C}-\\text{Br})=0{,}41$.' },
      { n: '2', text: 'La plus polarisée est donc $\\text{C}-\\text{F}$, et de loin.' },
      { n: '3', text: 'C\'est également dans $\\text{C}-\\text{F}$ que le carbone porte le $\\delta+$ le plus marqué : plus $\\Delta\\chi$ est grand, plus le doublet est attiré vers l\'halogène et plus le carbone est appauvri en électrons.' },
    ],
    result: '$\\text{C}-\\text{F}$ ($\\Delta\\chi=1{,}43$) > $\\text{C}-\\text{Cl}$ ($0{,}61$) > $\\text{C}-\\text{Br}$ ($0{,}41$).',
  },
  'meca-11': {
    steps: [
      { n: '1', text: '$\\Delta\\chi(\\text{C}-\\text{Cl})=0{,}61>0{,}4$ : la liaison est polarisée, le chlore porte $\\delta-$ et le **carbone porte $\\delta+$**. C\'est donc le **carbone** qui est le site accepteur.' },
      { n: '2', text: 'Les hydrogènes ne constituent pas de sites significatifs car $\\Delta\\chi(\\text{C}-\\text{H})=0{,}35<0{,}4$ : ces liaisons sont **apolaires** et ne créent aucune charge partielle exploitable.' },
    ],
    result: 'Site accepteur = le carbone lié au chlore.',
  },
  'meca-12': {
    steps: [
      { n: '1', text: 'Dans l\'éthanal $\\text{CH}_3-\\text{CHO}$, le groupe $\\text{C}=\\text{O}$ porte les deux sites : **site donneur** = l\'**oxygène** (doublets non liants et $\\delta-$) ; **site accepteur** = le **carbone** du carbonyle ($\\delta+$).' },
      { n: '2', text: '**Oui**, une même molécule peut porter les deux, et c\'est même très fréquent : il suffit qu\'elle contienne une liaison polarisée. Les deux atomes de cette liaison jouent alors des rôles opposés — l\'un s\'appauvrit, l\'autre s\'enrichit. La polarisation crée *simultanément* un donneur et un accepteur.' },
    ],
    result: 'Donneur : l\'oxygène. Accepteur : le carbone du carbonyle. Une liaison polarisée crée simultanément les deux.',
  },
  'meca-13': {
    steps: [
      { n: '1', text: '**Site donneur** : l\'**oxygène** de $\\text{H}_2\\text{O}$, qui porte deux doublets non liants. **Site accepteur** : $\\text{H}^+$, qui porte une charge positive et ne possède aucun électron.' },
      { n: '2', text: 'La flèche courbe part d\'un **doublet non liant de l\'oxygène** et pointe vers $\\text{H}^+$. Le doublet devient alors **liant** : une liaison $\\text{O}-\\text{H}$ se forme, et l\'ion $\\text{H}_3\\text{O}^+$ est obtenu.' },
      { n: '3', text: 'C\'est la réaction acide-base relue à l\'échelle des électrons : ce que Brønsted décrit comme un « transfert de proton » est, du point de vue électronique, un doublet de l\'eau qui capture un proton nu.' },
    ],
    result: 'Doublet non liant de l\'oxygène → $\\text{H}^+$ : la liaison $\\text{O}-\\text{H}$ se forme, $\\text{H}_3\\text{O}^+$ est obtenu.',
  },
  'meca-14': {
    steps: [
      { n: '1', text: 'La flèche part du **doublet liant** de la liaison $\\text{C}-\\text{Br}$ et pointe vers le **brome**.' },
      { n: '2', text: '**Justification** : $\\chi(\\text{Br})=2{,}96>\\chi(\\text{C})=2{,}55$. Le brome, plus électronégatif, **conserve** le doublet liant lors de la rupture. Il repart donc avec les deux électrons.' },
      { n: '3', text: 'L\'espèce formée est l\'ion **bromure** $\\text{Br}^-$ : le brome, neutre dans la liaison, emporte un électron supplémentaire et acquiert une charge négative.' },
    ],
    result: 'Du doublet liant vers $\\text{Br}$ ⟹ formation de $\\text{Br}^-$.',
  },
  'meca-15': {
    steps: [
      { n: '1', text: 'L\'**équation bilan** décrit le *résultat* global de la transformation : réactifs → produits. Elle ne dit rien du chemin suivi.' },
      { n: '2', text: 'Le **mécanisme** décrit ce chemin : la suite des **étapes élémentaires**, chacune traduite par des flèches courbes, avec les intermédiaires réactionnels successifs.' },
      { n: '3', text: 'En **additionnant** toutes les étapes, les **intermédiaires se simplifient** (chacun est produit dans une étape et consommé dans une autre) et l\'on retrouve exactement l\'**équation bilan**. C\'est d\'ailleurs une vérification utile d\'un mécanisme proposé.' },
    ],
    result: 'Le bilan dit le résultat, le mécanisme le chemin ; en sommant les étapes, les intermédiaires se simplifient et l\'on retrouve le bilan.',
  },
  'meca-16': {
    steps: [
      { n: '1', text: '**Cause thermodynamique** : la transformation peut être **limitée** ($\\tau<1$). L\'équilibre borne le rendement, quel que soit le soin apporté.' },
      { n: '2', text: '**Cause technique** : des **pertes** surviennent lors de l\'isolement et de la purification (produit resté en solution, cristaux perdus au filtre).' },
      { n: '3', text: '**Cause chimique** : des **réactions parasites** consomment une partie des réactifs pour former d\'autres produits.' },
    ],
    result: 'Thermodynamique (transformation limitée) · technique (pertes) · chimique (réactions parasites).',
  },
  'meca-17': {
    steps: [
      { n: '1', text: '$M(\\text{CH}_3\\text{COOH})=60{,}0$ ; $M(\\text{C}_2\\text{H}_5\\text{OH})=46{,}0$ ; $M(\\text{ester})=88{,}0\\,\\text{g·mol}^{-1}$.' },
      { n: '2', text: '$\\text{EA}=\\dfrac{88{,}0}{60{,}0+46{,}0}=\\dfrac{88{,}0}{106{,}0}\\approx 83{,}0\\,\\%$.' },
      { n: '3', text: 'Le complément ($17{,}0\\,\\%$, soit $18{,}0\\,\\text{g·mol}^{-1}$) part en **eau**, sous-produit inévitable de cette équation. C\'est une perte **structurelle** : même avec un rendement de $100\\,\\%$, ces $17\\,\\%$ de matière ne se retrouveraient pas dans l\'ester.' },
    ],
    result: '$\\text{EA}\\approx 83{,}0\\,\\%$ — le reste part en eau.',
  },
  'meca-18': {
    steps: [
      { n: '1', text: 'Le **chauffage à reflux** consiste à porter le mélange à ébullition en surmontant le ballon d\'un **réfrigérant** : les vapeurs se condensent et **retombent** dans le milieu réactionnel.' },
      { n: '2', text: '**Double avantage** : on **accélère** la réaction (la température est un facteur cinétique) **sans perdre** de matière — les espèces volatiles, réactifs comme produits, sont intégralement récupérées. C\'est la résolution d\'une tension : chauffer pour aller vite, sans que rien ne s\'échappe.' },
      { n: '3', text: '**Non**, le reflux ne modifie **pas l\'état final**. La température est un facteur **cinétique** : elle agit sur la *durée* nécessaire pour atteindre l\'équilibre, pas sur l\'équilibre lui-même. ($K$ dépend certes de $T$, mais l\'effet visé et exploité au lycée est bien l\'accélération.)' },
    ],
    result: 'Reflux : accélère sans perte de matière ; n\'altère pas l\'état final (facteur cinétique).',
  },
  'meca-19': {
    steps: [
      { n: '1', text: '**Moyen 1 — introduire un réactif en excès.** En augmentant la concentration d\'un réactif, on **diminue** $Q_{r,i}$ (le réactif est au dénominateur de $Q_r$). On a donc $Q_{r,i}<K$ : le système évolue dans le **sens direct**, consommant davantage le réactif limitant. Son $\\tau$ augmente.' },
      { n: '2', text: '**Moyen 2 — éliminer un produit au fur et à mesure** (par distillation, par exemple). En retirant un produit, on **diminue** le numérateur de $Q_r$, donc $Q_r$ chute sous $K$. Le système évolue à nouveau dans le **sens direct** pour rétablir $Q_r=K$ — et ce, en continu.' },
      { n: '3', text: 'Dans les deux cas, le principe est le même : on **éloigne $Q_r$ de $K$ par le bas**, et le système répond en formant des produits.' },
    ],
    result: 'Excès d\'un réactif · élimination d\'un produit — tous deux font $Q_r<K$ ⟹ sens direct.',
  },
  'meca-20': {
    steps: [
      { n: '1', text: 'Repérer les **atomes électronégatifs** ($\\text{O}$, $\\text{N}$, halogènes) et y placer les $\\delta-$.' },
      { n: '2', text: 'Le partenaire de chaque liaison polarisée porte $\\delta+$ : ce sont les **sites accepteurs**.' },
      { n: '3', text: 'Repérer les **doublets non liants**, les **charges négatives** et les **liaisons multiples** : ce sont les **sites donneurs**.' },
      { n: '4', text: 'Repérer les **charges positives** : sites accepteurs.' },
      { n: '5', text: 'On peut ignorer d\'emblée toutes les liaisons $\\text{C}-\\text{H}$ et $\\text{C}-\\text{C}$ : $\\Delta\\chi=0{,}35$ et $0$ respectivement, donc apolaires.' },
    ],
    result: 'Électronégatifs → $\\delta-$ ; leurs partenaires → accepteurs ; doublets/charges −/liaisons multiples → donneurs. Ignorer $\\text{C}-\\text{H}$ et $\\text{C}-\\text{C}$.',
  },
  'meca-21': {
    steps: [
      { n: '1', text: 'Les deux sont bien absents du bilan, mais pour des raisons **opposées**.' },
      { n: '2', text: '**Intermédiaire réactionnel** : il est **formé puis consommé**. Il n\'existe ni au début ni à la fin — il n\'apparaît qu\'*en cours de route*. Il se simplifie dans la somme des étapes.' },
      { n: '3', text: '**Catalyseur** : il est **consommé puis régénéré**. Il existe au début *et* à la fin, en **quantité inchangée** — il n\'est absent du bilan que parce qu\'il se retrouve identique de part et d\'autre.' },
      { n: '4', text: 'En somme : l\'intermédiaire n\'est présent *ni* au début *ni* à la fin ; le catalyseur est présent *aux deux*. Leur ordre d\'apparition est inversé : formé-puis-consommé contre consommé-puis-régénéré.' },
    ],
    result: 'Intermédiaire : formé → consommé (ni au début ni à la fin) · catalyseur : consommé → régénéré (au début et à la fin).',
  },
  'meca-22': {
    steps: [
      { n: '1', text: '**Non dans les deux cas.** Le mécanisme décrit *comment* la transformation se produit — le chemin, les étapes, les intermédiaires. Il ne dit rien sur *jusqu\'où* elle va.' },
      { n: '2', text: 'Le **sens d\'évolution** est donné par le critère $Q_{r,i}$ vs $K$ ; l\'**état final** est fixé par $K$ et l\'état initial (via $\\tau$). Ce sont des grandeurs **thermodynamiques**, totalement indépendantes du mécanisme.' },
      { n: '3', text: 'C\'est la même distinction que cinétique/thermodynamique : le mécanisme et la vitesse décrivent le trajet, $K$ décide de la destination.' },
    ],
    result: 'C\'est $K$ (et le critère $Q_{r,i}$ vs $K$) qui répond, pas le mécanisme.',
  },
  'meca-23': {
    steps: [
      { n: '1', text: '$M(\\text{C}_2\\text{H}_4)=28{,}0$ ; $M(\\text{Br}_2)=160{,}0$ ; $M(\\text{C}_2\\text{H}_4\\text{Br}_2)=188{,}0\\,\\text{g·mol}^{-1}$.' },
      { n: '2', text: 'Vérification : $28{,}0+160{,}0=188{,}0$ ✓ — toute la masse des réactifs se retrouve dans le produit. $\\text{EA}=\\dfrac{188{,}0}{188{,}0}=\\mathbf{100\\,\\%}$.' },
      { n: '3', text: 'Contre $83{,}0\\,\\%$ pour l\'estérification. La différence tient à la **nature de la réaction** : dans une **addition**, les réactifs s\'assemblent **intégralement** en un unique produit — il n\'y a **aucun sous-produit**. Dans une **substitution**, un fragment est nécessairement **expulsé** (ici l\'eau) : une part de la masse est perdue par construction.' },
      { n: '4', text: 'La chimie verte privilégie donc les additions : elles atteignent l\'économie d\'atomes maximale et ne génèrent, par principe, aucun déchet.' },
    ],
    result: 'Addition : $\\text{EA}=100\\,\\%$ · substitution : $\\text{EA}<100\\,\\%$ (sous-produit obligatoire).',
  },
  'meca-24': {
    steps: [
      { n: '1', text: '**Aucune contradiction** : les deux grandeurs sont de **nature différente** et ne mesurent pas la même chose.' },
      { n: '2', text: 'L\'**économie d\'atomes** est **théorique** : elle se calcule sur la seule **équation**, avant toute manipulation. $\\text{EA}=100\\,\\%$ signifie simplement qu\'*aucun sous-produit n\'est prévu* — que l\'équation est parfaite sur le papier.' },
      { n: '3', text: 'Le **rendement** est **expérimental** : il dépend du protocole, de l\'équilibre, des pertes et des réactions parasites. $\\eta=40\\,\\%$ signifie qu\'*en pratique*, on n\'a récupéré que $40\\,\\%$ du possible.' },
      { n: '4', text: 'Autrement dit : l\'EA juge l\'**équation**, $\\eta$ juge la **manipulation**. Une équation irréprochable peut être mal exploitée — et inversement.' },
    ],
    result: 'Aucune contradiction : l\'EA juge l\'équation (théorique), $\\eta$ juge la manipulation (expérimental).',
  },
  'meca-25': {
    steps: [
      { n: '1', text: '**Maximiser l\'économie d\'atomes** (privilégier les additions) — bénéfice : moins de déchets par construction, la matière première finit dans le produit.' },
      { n: '2', text: '**Limiter les déchets à la source** plutôt que les traiter après coup — bénéfice : éviter le coût et l\'impact du traitement.' },
      { n: '3', text: '**Utiliser des solvants moins nocifs**, voire aucun — bénéfice : réduire la toxicité et les rejets.' },
      { n: '4', text: '**Recourir à la catalyse** plutôt qu\'à des réactifs stœchiométriques — bénéfice : de petites quantités, régénérées, au lieu de réactifs consommés en masse.' },
      { n: '5', text: '**Économiser l\'énergie** (travailler près de la température ambiante) — bénéfice : moindre consommation, moindre coût. **Employer des matières premières renouvelables** — bénéfice : ne pas épuiser les ressources fossiles.' },
    ],
    result: 'EA maximale · déchets limités à la source · solvants moins nocifs · catalyse · économie d\'énergie · matières renouvelables.',
  },
  'meca-26': {
    steps: [
      { n: 'a', text: '$\\Delta\\chi(\\text{C}-\\text{Br})=2{,}96-2{,}55=0{,}41>0{,}4$ : la liaison est polarisée. Le brome, plus électronégatif, attire le doublet liant et porte $\\delta-$ ; le carbone porte $\\delta+$ : $\\text{C}^{\\delta+}-\\text{Br}^{\\delta-}$. Le carbone, appauvri en électrons, est donc un **site accepteur** de doublet.' },
      { n: 'b', text: '$\\Delta\\chi(\\text{C}-\\text{H})=2{,}55-2{,}20=0{,}35<0{,}4$ : ces liaisons sont **apolaires**. Elles ne créent aucune charge partielle, donc aucun site accepteur. Seule la liaison $\\text{C}-\\text{Br}$ polarise le carbone.' },
      { n: 'c', text: 'Le site donneur de $\\text{HO}^-$ est l\'**oxygène**, pour **deux** raisons cumulées : il porte des **doublets non liants**, disponibles pour être cédés ; et l\'ion porte une **charge négative**, ce qui le rend particulièrement riche en électrons.' },
      { n: 'd', text: 'La première flèche courbe part d\'un **doublet non liant de l\'oxygène** de $\\text{HO}^-$ et pointe vers le **carbone $\\delta+$** de $\\text{CH}_3-\\text{Br}$. Ce doublet devient liant : la liaison $\\text{C}-\\text{O}$ se forme.' },
      { n: 'e', text: 'Une seconde flèche est nécessaire, car le carbone ne peut pas former une cinquième liaison. Elle part du **doublet liant de $\\text{C}-\\text{Br}$** et pointe vers le **brome**. Justification : $\\chi(\\text{Br})=2{,}96>\\chi(\\text{C})=2{,}55$, donc le brome **conserve** le doublet lors de la rupture. Il libère l\'ion **bromure** $\\text{Br}^-$.' },
      { n: 'f', text: '**Réactifs** : $\\text{HO}^-$ porte $-1$ et $\\text{CH}_3-\\text{Br}$ est neutre ⟹ charge totale $=-1$. **Produits** : $\\text{CH}_3-\\text{OH}$ est neutre et $\\text{Br}^-$ porte $-1$ ⟹ charge totale $=-1$. Les charges se **conservent** ✓. C\'est une vérification systématique : la charge négative a simplement **migré** de l\'oxygène vers le brome, au fil des deux flèches.' },
    ],
    result: '$\\text{C}^{\\delta+}-\\text{Br}^{\\delta-}$ ($\\Delta\\chi=0{,}41$) · $\\text{C}-\\text{H}$ apolaire ($0{,}35$) · flèche 1 : doublet de $\\text{HO}^-\\to\\text{C}$ · flèche 2 : doublet $\\text{C}-\\text{Br}\\to\\text{Br}$ ⟹ $\\text{Br}^-$ · charge $-1$ conservée.',
  },
  'meca-27': {
    steps: [
      { n: 'a', text: '$M(\\text{C}_7\\text{H}_6\\text{O}_3)=7\\times 12{,}0+6\\times 1{,}0+3\\times 16{,}0=138{,}0\\,\\text{g·mol}^{-1}$. $M(\\text{C}_4\\text{H}_6\\text{O}_3)=48{,}0+6{,}0+48{,}0=102{,}0$ · $M(\\text{C}_9\\text{H}_8\\text{O}_4)=108{,}0+8{,}0+64{,}0=180{,}0$ · $M(\\text{C}_2\\text{H}_4\\text{O}_2)=60{,}0\\,\\text{g·mol}^{-1}$. **Conservation** : réactifs $138{,}0+102{,}0=240{,}0$ ; produits $180{,}0+60{,}0=240{,}0$ ✓.' },
      { n: 'b', text: '$n=\\dfrac{m}{M}=\\dfrac{5{,}00}{138{,}0}\\approx 3{,}62\\times 10^{-2}\\,\\text{mol}$. L\'anhydride étant introduit en **excès**, le réactif **limitant** est l\'**acide salicylique** : c\'est lui qui s\'épuise le premier et fixe donc le maximum possible.' },
      { n: 'c', text: 'Les nombres stœchiométriques valant $1$ : $n_{\\max}(\\text{aspirine})=n(\\text{salicylique})\\approx 3{,}62\\times 10^{-2}\\,\\text{mol}$. $m_{\\max}=n_{\\max}\\times M=3{,}62\\times 10^{-2}\\times 180{,}0\\approx 6{,}52\\,\\text{g}$.' },
      { n: 'd', text: '$\\eta=\\dfrac{m_{\\text{obtenue}}}{m_{\\max}}=\\dfrac{4{,}80}{6{,}52}\\approx 0{,}736$, soit $73{,}6\\,\\%$. *Vérification par les quantités* : $n_{\\text{obtenu}}=\\dfrac{4{,}80}{180{,}0}\\approx 2{,}67\\times 10^{-2}\\,\\text{mol}$, d\'où $\\eta=\\dfrac{2{,}67\\times 10^{-2}}{3{,}62\\times 10^{-2}}\\approx 73{,}6\\,\\%$ ✓ — identique, comme attendu puisque le rapport des masses et celui des quantités coïncident (même $M$).' },
      { n: 'e', text: '$\\text{EA}=\\dfrac{M(\\text{aspirine})}{M(\\text{salicylique})+M(\\text{anhydride})}=\\dfrac{180{,}0}{240{,}0}=\\mathbf{75{,}0\\,\\%}$. Le complément ($25{,}0\\,\\%$, soit $60{,}0\\,\\text{g·mol}^{-1}$) part en **acide éthanoïque** — le sous-produit inévitable de cette équation.' },
      { n: 'f', text: '$\\eta=73{,}6\\,\\%$ et $\\text{EA}=75{,}0\\,\\%$ : leur proximité est une **coïncidence**, elles ne mesurent pas la même chose. L\'**économie d\'atomes** est **théorique** : elle ne dépend que de l\'**équation**. Elle vaudrait $75{,}0\\,\\%$ même avec une synthèse parfaite, car l\'acide éthanoïque est produit par construction. Le **rendement** est **expérimental** : il dépend du protocole, des pertes lors de l\'isolement et de la purification, des réactions parasites. Il varierait d\'un binôme à l\'autre — l\'EA, jamais.' },
      { n: 'g', text: '**Pureté** : mesure de la **température de fusion** (une valeur nette et conforme à la référence signe un produit pur ; un intervalle large et abaissé trahit des impuretés), ou une **CCM** (une tache unique). **Structure** : la **spectroscopie IR** (bandes $\\text{C}=\\text{O}$ de l\'ester et de l\'acide, disparition du $\\text{O}-\\text{H}$ phénol) ou la **RMN du proton**.' },
    ],
    result: '$M$ : $138{,}0$ / $102{,}0$ / $180{,}0$ / $60{,}0$ · $n_{\\max}=3{,}62\\times 10^{-2}\\,\\text{mol}$ · $m_{\\max}=6{,}52\\,\\text{g}$ · $\\eta=73{,}6\\,\\%$ · $\\text{EA}=75{,}0\\,\\%$.',
  },
  'meca-28': {
    steps: [
      { n: 'a', text: 'Les réactifs sont en quantités égales et de nombres stœchiométriques $1$ : ils s\'épuiseraient ensemble, donc $x_{\\max}=0{,}500\\,\\text{mol}$. $m_{\\max}=x_{\\max}\\times M(\\text{ester})=0{,}500\\times 88{,}0=\\mathbf{44{,}0\\,\\text{g}}$.' },
      { n: 'b', text: '$x_f=\\tau\\times x_{\\max}=\\dfrac{2}{3}\\times 0{,}500\\approx 0{,}333\\,\\text{mol}$. Masse d\'ester attendue **à l\'équilibre** : $m_{\\text{éq}}=0{,}333\\times 88{,}0\\approx 29{,}3\\,\\text{g}$.' },
      { n: 'c', text: '$\\eta=\\dfrac{25{,}0}{44{,}0}\\approx 0{,}568$, soit $56{,}8\\,\\%$.' },
      { n: 'd', text: 'Le taux d\'avancement à l\'équilibre vaut $\\tau=\\tfrac{2}{3}\\approx 66{,}7\\,\\%$, alors que le rendement mesuré n\'est que de $56{,}8\\,\\%$. **Interprétation** : ces deux nombres décrivent deux limitations **successives et de natures différentes**. Le passage de $100\\,\\%$ à $66{,}7\\,\\%$ est d\'origine **thermodynamique** : la transformation est limitée, $K=4{,}0$ borne l\'avancement — aucun soin expérimental ne permettrait de le dépasser. Le passage de $66{,}7\\,\\%$ à $56{,}8\\,\\%$ est d\'origine **expérimentale** : ce sont les **pertes** lors de l\'isolement et de la purification, et d\'éventuelles réactions parasites. L\'écart de $\\approx 10$ points mesure donc exactement la **qualité de la manipulation** — et lui seul est améliorable à protocole constant.' },
      { n: 'e', text: '$\\text{EA}=\\dfrac{88{,}0}{60{,}0+46{,}0}=\\dfrac{88{,}0}{106{,}0}\\approx \\mathbf{83{,}0\\,\\%}$. **Non**, elle ne dépend **pas** du rendement : elle se calcule sur la seule **équation**, à partir des masses molaires. Elle vaudrait $83{,}0\\,\\%$ que l\'on obtienne $25{,}0\\,\\text{g}$ ou $44{,}0\\,\\text{g}$ d\'ester.' },
      { n: 'f', text: '**Modification 1 — introduire l\'alcool en excès.** Augmenter $[\\text{alcool}]$ **diminue** $Q_{r,i}$ (l\'alcool est au dénominateur). On a alors $Q_{r,i}<K$ : le système évolue dans le **sens direct** et l\'acide est consommé davantage. Le $\\tau$ de l\'acide augmente. **Modification 2 — éliminer l\'eau au fur et à mesure** (distillation, desséchant). Retirer l\'eau **diminue** le numérateur de $Q_r$, qui chute sous $K$. Le système répond en formant continûment de l\'ester pour rétablir $Q_r=K$. Dans les deux cas, le mécanisme est identique : on maintient $Q_r<K$, et le système ne cesse d\'évoluer dans le sens direct.' },
      { n: 'g', text: 'Bilan **nuancé**. **Points favorables** : $\\text{EA}=83{,}0\\,\\%$ est une valeur **honorable** — l\'essentiel de la matière finit dans l\'ester. Surtout, le sous-produit est de l\'**eau** : totalement inoffensive, sans traitement ni retraitement nécessaire. C\'est le meilleur déchet possible. **Points défavorables** : l\'EA n\'atteint pas $100\\,\\%$ car il s\'agit d\'une **substitution**, qui expulse nécessairement un fragment — une addition ferait mieux par construction. De plus, la réaction est **limitée** et **lente** : elle exige un chauffage prolongé (coût énergétique) et un catalyseur acide. **Conclusion** : l\'estérification est **acceptable** du point de vue de la chimie verte — une bonne économie d\'atomes et un déchet anodin — mais perfectible sur le plan énergétique.' },
    ],
    result: '$m_{\\max}=44{,}0\\,\\text{g}$ · $m_{\\text{éq}}\\approx 29{,}3\\,\\text{g}$ · $\\eta=56{,}8\\,\\%$ contre $\\tau=66{,}7\\,\\%$ (l\'écart = les pertes) · $\\text{EA}=83{,}0\\,\\%$, indépendante de $\\eta$.',
  },
};
