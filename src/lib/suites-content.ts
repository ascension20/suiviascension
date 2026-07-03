import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const SUITES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La suite $\\left((-1)^n\\right)$ est…',
    options: [
      { label: 'a', text: 'convergente vers $0$' },
      { label: 'b', text: 'bornée mais divergente' },
      { label: 'c', text: 'divergente vers $+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Une suite croissante et majorée…',
    options: [
      { label: 'a', text: 'converge (théorème de la limite monotone)' },
      { label: 'b', text: 'diverge vers $+\\infty$' },
      { label: 'c', text: 'peut ne pas avoir de limite' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Si $u_n < v_n$ pour tout $n$ et les deux suites convergent, à la limite…',
    options: [
      { label: 'a', text: '$\\ell < \\ell\'$ (inégalité stricte conservée)' },
      { label: 'b', text: '$\\ell \\leq \\ell\'$ (une inégalité stricte devient large)' },
      { label: 'c', text: '$\\ell = \\ell\'$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$\\displaystyle\\lim_{n\\to+\\infty}\\dfrac{e^n}{n^2}=$',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$' },
      { label: 'c', text: '$+\\infty$ (croissances comparées : $n^2 \\ll e^n$)' },
    ],
    answer: 'c',
  },
  {
    n: 5,
    text: '$\\displaystyle\\lim_{n\\to+\\infty}\\dfrac{\\ln n}{n}=$',
    options: [
      { label: 'a', text: '$+\\infty$' },
      { label: 'b', text: '$0$ (croissances comparées : $\\ln n \\ll n$)' },
      { label: 'c', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: '$\\sqrt{n^2+n}-n$ tend vers…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$\\dfrac{1}{2}$ (quantité conjuguée)' },
      { label: 'c', text: '$+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Pour prouver $u_n\\to+\\infty$ par comparaison, il faut…',
    options: [
      { label: 'a', text: 'deux suites encadrantes tendant vers $+\\infty$' },
      { label: 'b', text: 'une seule minorante tendant vers $+\\infty$' },
      { label: 'c', text: 'une seule majorante' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Une suite convergente est nécessairement…',
    options: [
      { label: 'a', text: 'monotone' },
      { label: 'b', text: 'bornée' },
      { label: 'c', text: 'positive' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: '$\\displaystyle\\lim_{n\\to+\\infty}\\left(\\dfrac{1}{2}\\right)^n=$',
    options: [
      { label: 'a', text: '$0$ (suite géométrique $|q|<1$)' },
      { label: 'b', text: '$\\dfrac{1}{2}$' },
      { label: 'c', text: '$1$' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: '$\\displaystyle\\sum_{k=0}^{n}\\left(\\dfrac{1}{2}\\right)^k$ tend vers…',
    options: [
      { label: 'a', text: '$1$' },
      { label: 'b', text: '$2$ (somme géométrique : $\\dfrac{1}{1-1/2}$)' },
      { label: 'c', text: '$+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 11,
    text: 'Une suite décroissante et minorée par $0$…',
    options: [
      { label: 'a', text: 'tend nécessairement vers $0$' },
      { label: 'b', text: 'converge (mais pas forcément vers $0$)' },
      { label: 'c', text: 'diverge vers $-\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 12,
    text: 'Si $u_{n+1}=f(u_n)$ avec $f$ continue et $u_n\\to\\ell$, alors…',
    options: [
      { label: 'a', text: '$\\ell=0$' },
      { label: 'b', text: '$\\ell=f(\\ell)$ (la limite est un **point fixe** de $f$)' },
      { label: 'c', text: '$f(\\ell)=0$' },
    ],
    answer: 'b',
  },
];

// ── Corrections ────────────────────────────────────────────────────────────────
export const SUITES_CORRECTIONS: Record<string, Correction> = {
  'suites-1': {
    steps: [
      { n: 'Init.', text: '$4^0-1=0=3\\times 0$ : **P(0) est vraie**.' },
      { n: 'Hérédité', text: 'Supposons $4^n-1=3k$ ($k\\in\\mathbb{N}$). Alors $4^{n+1}-1=4\\cdot 4^n-1=4(3k+1)-1=12k+3=3(4k+1)$.' },
      { text: '**P(n+1) est vraie.**' },
      { n: 'Conclusion', text: 'Par le principe de récurrence, $4^n-1$ est un multiple de $3$ pour tout $n\\in\\mathbb{N}$.' },
    ],
    result: '$4^n-1$ est divisible par $3$ pour tout $n\\in\\mathbb{N}$.',
  },
  'suites-2': {
    steps: [
      { n: 'Init.', text: '$u_0=0\\in[0,2]$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $0\\leq u_n\\leq 2$, alors $2\\leq u_n+2\\leq 4$, donc $\\sqrt{2}\\leq u_{n+1}\\leq 2$. En particulier $0\\leq u_{n+1}\\leq 2$ : **P(n+1) vraie**.' },
      { n: 'Conclusion', text: 'Par récurrence, $0\\leq u_n\\leq 2$ pour tout $n\\in\\mathbb{N}$.' },
    ],
    result: '$0\\leq u_n\\leq 2$ pour tout $n\\in\\mathbb{N}$ — la suite est **bornée**.',
  },
  'suites-3': {
    steps: [
      { n: 'Init.', text: '$70\\times 1{,}14^0+50=120=u_0$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $u_n=70\\times 1{,}14^n+50$, alors $u_{n+1}=1{,}14\\,u_n-7=1{,}14(70\\times 1{,}14^n+50)-7=70\\times 1{,}14^{n+1}+57-7=70\\times 1{,}14^{n+1}+50$.' },
      { n: 'Conclusion', text: 'Par récurrence, $u_n=70\\times 1{,}14^n+50$ pour tout $n\\in\\mathbb{N}$.' },
    ],
    result: '$u_n=70\\times 1{,}14^n+50$.',
  },
  'suites-4': {
    steps: [
      { n: 'Init.', text: '$n=1$ : $\\sum_{k=1}^{1}k=1=\\frac{1\\times 2}{2}$ : **P(1) vraie**.' },
      { n: 'Hérédité', text: 'Si $\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}$, alors $\\sum_{k=1}^{n+1}k=\\frac{n(n+1)}{2}+(n+1)=(n+1)\\left(\\frac{n}{2}+1\\right)=\\frac{(n+1)(n+2)}{2}$.' },
      { n: 'Conclusion', text: 'Par récurrence, $\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}$ pour tout $n\\geq 1$.' },
    ],
    result: '$\\displaystyle\\sum_{k=1}^{n}k=\\dfrac{n(n+1)}{2}$.',
  },
  'suites-5': {
    steps: [
      { n: '1', text: '$|u_n-0|=\\frac{4}{n}<0{,}8\\Leftrightarrow n>5$. On prend $N=5$, et pour $n>N$ : $-0{,}8<u_n<0{,}8$.' },
      { n: '2', text: 'Pour tout $\\varepsilon>0$ : $\\left|\\frac{4}{n}-0\\right|=\\frac{4}{n}\\leq\\varepsilon\\Leftrightarrow n\\geq\\frac{4}{\\varepsilon}$. En choisissant $N=\\lceil 4/\\varepsilon\\rceil$, on a pour tout $n\\geq N$ : $|u_n|\\leq\\varepsilon$.' },
    ],
    result: '$u_n=\\dfrac{4}{n}\\to 0$.',
  },
  'suites-6': {
    steps: [
      { n: '1', text: 'Pour $n\\geq 1$ : $n+5\\geq n>0$, donc $0<\\frac{1}{n+5}\\leq\\frac{1}{n}$.' },
      { n: '2', text: '$0\\to 0$ et $\\frac{1}{n}\\to 0$. Par le **théorème des gendarmes**, $e_n\\to 0$.' },
    ],
    result: '$e_n=\\dfrac{1}{n+5}\\to 0$.',
  },
  'suites-7': {
    steps: [
      { n: '1', text: '$|\\cos n+2\\sin n|\\leq|\\cos n|+2|\\sin n|\\leq 1+2=3$. Donc $-\\frac{3}{n^2}\\leq w_n\\leq\\frac{3}{n^2}$.' },
      { n: '2', text: '$\\pm\\frac{3}{n^2}\\to 0$. Par le **théorème des gendarmes**, $w_n\\to 0$.' },
    ],
    result: '$w_n=\\dfrac{\\cos n+2\\sin n}{n^2}\\to 0$.',
  },
  'suites-8': {
    steps: [
      { n: 'Init.', text: '$w_0=2$, $w_1=\\sqrt{14}\\approx 3{,}74$. $0\\leq 2\\leq\\sqrt{14}\\leq 7$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $0\\leq w_n\\leq w_{n+1}\\leq 7$, alors $x\\mapsto\\sqrt{7x}$ est croissante, donc $w_{n+1}=\\sqrt{7w_n}\\leq\\sqrt{7w_{n+1}}=w_{n+2}\\leq\\sqrt{49}=7$.' },
      { n: 'Conclusion', text: '$(w_n)$ est **croissante** et majorée par $7$, donc elle **converge** (théorème de la limite monotone).' },
    ],
    result: '$(w_n)$ croissante, majorée par $7$ → **converge**.',
  },
  'suites-9': {
    steps: [
      { n: 'Init.', text: '$n=1$ : $1=\\frac{1\\cdot 2\\cdot 3}{6}$ : **P(1) vraie**.' },
      { n: 'Hérédité', text: '$\\sum_{k=1}^{n+1}k^2=\\frac{n(n+1)(2n+1)}{6}+(n+1)^2=\\frac{(n+1)[n(2n+1)+6(n+1)]}{6}=\\frac{(n+1)(2n^2+7n+6)}{6}=\\frac{(n+1)(n+2)(2n+3)}{6}$.' },
      { n: 'Conclusion', text: 'Par récurrence, $\\sum_{k=1}^{n}k^2=\\frac{n(n+1)(2n+1)}{6}$ pour tout $n\\geq 1$.' },
    ],
    result: '$\\displaystyle\\sum_{k=1}^{n}k^2=\\dfrac{n(n+1)(2n+1)}{6}$.',
  },
  'suites-10': {
    steps: [
      { n: 'Init.', text: '$9^0-1=0=8\\times 0$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $9^n-1=8k$, alors $9^{n+1}-1=9\\cdot 9^n-1=9(8k+1)-1=72k+8=8(9k+1)$.' },
      { n: 'Conclusion', text: '$8\\mid 9^n-1$ pour tout $n\\in\\mathbb{N}$.' },
    ],
    result: '$9^n-1$ est divisible par $8$ pour tout $n\\in\\mathbb{N}$.',
  },
  'suites-11': {
    steps: [
      { n: 'Init.', text: '$n=0$ : $(1+a)^0=1\\geq 1+0=1$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $(1+a)^n\\geq 1+na$. Comme $1+a\\geq 1>0$ : $(1+a)^{n+1}=(1+a)(1+a)^n\\geq(1+a)(1+na)=1+(n+1)a+na^2\\geq 1+(n+1)a$.' },
      { n: 'Conclusion', text: '$(1+a)^n\\geq 1+na$ pour tout $n\\in\\mathbb{N}$ et tout $a\\geq 0$.' },
    ],
    result: '$(1+a)^n\\geq 1+na$ (**inégalité de Bernoulli**).',
  },
  'suites-12': {
    steps: [
      { n: '1', text: '$\\sqrt{n}>2020\\Leftrightarrow n>2020^2=4\\,080\\,400$. On prend $N=4\\,080\\,401$.' },
      { n: '2', text: 'Pour tout $A>0$ : $\\sqrt{n}>A\\Leftrightarrow n>A^2$. En prenant $N=\\lfloor A^2\\rfloor+1$, pour tout $n\\geq N$ on a $u_n=\\sqrt{n}>A$. Donc $u_n\\to+\\infty$.' },
    ],
    result: '$u_n=\\sqrt{n}\\to+\\infty$.',
  },
  'suites-13': {
    steps: [
      { n: 'Init.', text: '$e^0=1\\geq 1=1+0$ : **P(0) vraie**.' },
      { n: 'Hérédité', text: 'Si $e^n\\geq n+1$, alors $e^{n+1}=e\\cdot e^n\\geq e(n+1)$. Or $e(n+1)-(n+2)=(e-1)n+(e-2)\\geq 0$ pour $n\\geq 0$ (car $e>2$), donc $e^{n+1}\\geq n+2$.' },
      { n: '2', text: '$n+1\\to+\\infty$ et $e^n\\geq n+1$, donc par **comparaison** $e^n\\to+\\infty$.' },
    ],
    result: '$e^n\\to+\\infty$ (par comparaison avec $n+1$).',
  },
  'suites-14': {
    steps: [
      { n: '1', text: '$\\left|\\frac{2}{3}\\right|<1$ donc $u_n=\\left(\\frac{2}{3}\\right)^n\\to 0$.' },
      { n: '2', text: '$S_n=\\sum_{k=0}^{n}\\left(\\frac{2}{3}\\right)^k=\\frac{1-(2/3)^{n+1}}{1-2/3}=3\\left(1-\\left(\\frac{2}{3}\\right)^{n+1}\\right)\\to 3$.' },
    ],
    result: '$\\lim u_n=0$ ;  $S_n=3\\left(1-\\left(\\frac{2}{3}\\right)^{n+1}\\right)\\to 3$.',
  },
  'suites-15': {
    steps: [
      { n: '1', text: 'FI $\\infty-\\infty$ : $n^2-2n+5=n^2\\left(1-\\frac{2}{n}+\\frac{5}{n^2}\\right)\\to+\\infty$ (terme dominant $n^2$).' },
      { n: '2', text: 'FI $\\frac{\\infty}{\\infty}$ : $\\frac{3n+1}{n^2+2n-8}=\\frac{n\\left(3+\\frac{1}{n}\\right)}{n^2\\left(1+\\frac{2}{n}-\\frac{8}{n^2}\\right)}=\\frac{1}{n}\\cdot\\frac{3+1/n}{1+2/n-8/n^2}\\to 0\\times 3=0$.' },
    ],
    result: '$\\lim_1=+\\infty$ ;  $\\lim_2=0$.',
  },
  'suites-16': {
    steps: [
      { n: '1', text: 'Sur $[0,2]$ : $u_{n+1}-u_n=\\sqrt{u_n+2}-u_n\\geq 0\\Leftrightarrow\\sqrt{u_n+2}\\geq u_n\\Leftrightarrow u_n+2\\geq u_n^2\\Leftrightarrow u_n^2-u_n-2\\leq 0\\Leftrightarrow u_n\\in[-1,2]$. Comme $u_n\\in[0,2]$, **$(u_n)$ est croissante**.' },
      { n: '2', text: '$(u_n)$ est croissante et majorée par $2$ : elle **converge** (théorème de la limite monotone).' },
      { n: '3', text: 'Sa limite $\\ell$ vérifie $\\ell=\\sqrt{\\ell+2}$, soit $\\ell^2-\\ell-2=0$, donc $\\ell=2$ (car $\\ell\\in[0,2]$).' },
    ],
    result: '$(u_n)$ croissante, majorée par $2$ → **converge vers $\\ell=2$**.',
  },
  'suites-17': {
    steps: [
      { n: '1', text: '$v_{n+1}=u_{n+1}-6=0{,}5\\,u_n+3-6=0{,}5(u_n-6)=0{,}5\\,v_n$. $(v_n)$ est **géométrique** de raison $0{,}5$, avec $v_0=u_0-6=1-6=-5$.' },
      { n: '2', text: '$v_n=-5\\times(0{,}5)^n$, d\'où $u_n=6-5\\times(0{,}5)^n$.' },
      { n: '3', text: '$(0{,}5)^n\\to 0$ donc $u_n\\to 6$.' },
      { n: '4', text: '$S_n=\\sum_{k=0}^{n}u_k=6(n+1)-5\\cdot\\frac{1-(0{,}5)^{n+1}}{0{,}5}=6(n+1)-10\\left(1-(0{,}5)^{n+1}\\right)=6n-4+5\\cdot(0{,}5)^n$.' },
    ],
    result: '$u_n=6-5\\,(0{,}5)^n\\to 6$ ;  $S_n=6n-4+5\\,(0{,}5)^n$.',
  },
  'suites-18': {
    steps: [
      { n: '1', text: '**Init.** $u_0=0\\in[0,3]$. **Hérédité.** Si $0\\leq u_n\\leq 3$, alors $3\\leq 2u_n+3\\leq 9$, donc $\\sqrt{3}\\leq u_{n+1}\\leq 3$ : **P(n+1) vraie**.' },
      { n: '2', text: 'Sur $[0,3]$ : $\\sqrt{2u_n+3}-u_n\\geq 0\\Leftrightarrow u_n\\in[-1,3]$. Comme $u_n\\in[0,3]$, **$(u_n)$ est croissante**.' },
      { n: '3', text: 'Croissante et majorée par $3$ → **converge**. La limite vérifie $\\ell=\\sqrt{2\\ell+3}$, donc $\\ell^2-2\\ell-3=0$, d\'où $\\ell=3$ (car $\\ell\\geq 0$).' },
      { n: '4', text: 'Algorithme Python : `u=0; n=0` puis `while u<2.999: u=sqrt(2*u+3); n+=1`. Renvoie **$n=8$**.' },
    ],
    result: '$u_n\\to 3$ ; le rang seuil est $n=8$.',
  },
  'suites-19': {
    steps: [
      { n: '1', text: '$u_1=\\frac{1}{1+1}=\\frac{1}{2}$ ;  $u_2=\\frac{1/2}{1+1/2}=\\frac{1}{3}$.' },
      { n: '2', text: '$v_{n+1}=\\frac{1}{u_{n+1}}=\\frac{1+u_n}{u_n}=\\frac{1}{u_n}+1=v_n+1$. $(v_n)$ est **arithmétique** de raison $1$, avec $v_0=\\frac{1}{u_0}=1$.' },
      { n: '3', text: '$v_n=n+1$, donc $u_n=\\frac{1}{n+1}$.' },
      { n: '4', text: '$\\frac{1}{n+1}\\to 0$ donc $u_n\\to 0$.' },
    ],
    result: '$u_n=\\dfrac{1}{n+1}\\to 0$.',
  },
  'suites-20': {
    steps: [
      { n: '1', text: 'Pour $1\\leq k\\leq n$ : $n^2+1\\leq n^2+k\\leq n^2+n$, donc $\\frac{1}{n^2+n}\\leq\\frac{1}{n^2+k}\\leq\\frac{1}{n^2+1}$. En sommant les $n$ termes : $\\frac{n}{n^2+n}\\leq u_n\\leq\\frac{n}{n^2+1}$.' },
      { n: '2', text: '$\\frac{n}{n^2+n}=\\frac{1}{n+1}\\to 0$ et $\\frac{n}{n^2+1}\\to 0$. Par le **théorème des gendarmes**, $u_n\\to 0$.' },
    ],
    result: '$u_n=\\displaystyle\\sum_{k=1}^{n}\\dfrac{1}{n^2+k}\\to 0$.',
  },
  'suites-21': {
    steps: [
      { n: '1', text: '$u_2=\\frac{2+1}{2}=\\frac{3}{2}$ ;  $u_3=\\frac{3/2+2}{2}=\\frac{7}{4}$.' },
      { n: '2', text: '$v_{n+1}=u_{n+2}-u_{n+1}=\\frac{u_{n+1}+u_n}{2}-u_{n+1}=\\frac{u_n-u_{n+1}}{2}=-\\frac{1}{2}v_n$. $(v_n)$ est **géométrique** de raison $-\\frac{1}{2}$, avec $v_0=u_1-u_0=1$.' },
      { n: '3', text: '$v_n=\\left(-\\frac{1}{2}\\right)^n$. Par téléscopage : $u_n=u_0+\\sum_{k=0}^{n-1}v_k=1+\\frac{1-(-1/2)^n}{3/2}=1+\\frac{2}{3}\\left(1-\\left(-\\frac{1}{2}\\right)^n\\right)=\\frac{5}{3}-\\frac{2}{3}\\left(-\\frac{1}{2}\\right)^n$.' },
      { n: '4', text: '$\\left(-\\frac{1}{2}\\right)^n\\to 0$ donc $u_n\\to\\frac{5}{3}$.' },
    ],
    result: '$u_n=\\dfrac{5}{3}-\\dfrac{2}{3}\\left(-\\dfrac{1}{2}\\right)^n\\to\\dfrac{5}{3}$.',
  },
};

// ── Exercices ──────────────────────────────────────────────────────────────────
export const SUITES_EXERCISES: ExerciseContent[] = [
  {
    id: 'suites-1',
    context: 'Pour tout $n\\in\\mathbb{N}$, on pose $P(n)$ : « $4^n-1$ est un multiple de $3$ ».',
    parts: [{
      questions: [
        { n: '1', text: 'Vérifier $P(0)$.' },
        { n: '2', text: 'Soit $n\\in\\mathbb{N}$, supposer $P(n)$ et montrer $P(n+1)$. (Écrire $4^{n+1}-1=4\\cdot 4^n-1$.)' },
        { n: '3', text: 'Conclure par le principe de récurrence.' },
      ],
    }],
  },
  {
    id: 'suites-2',
    context: 'Soit $(u_n)$ définie par $u_0=0$ et $u_{n+1}=\\sqrt{u_n+2}$. On veut montrer par récurrence que pour tout $n\\in\\mathbb{N}$, $P(n)$ : $0\\leq u_n\\leq 2$.',
    parts: [{
      questions: [
        { n: '1', text: 'Vérifier $P(0)$.' },
        { n: '2', text: 'Supposer $P(n)$ ; en déduire l\'encadrement de $u_n+2$ puis de $u_{n+1}$. Conclure $P(n+1)$.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'suites-3',
    context: 'Soit $(u_n)$ définie par $u_0=120$ et $u_{n+1}=1{,}14\\,u_n-7$. Démontrer par récurrence que pour tout $n\\in\\mathbb{N}$ :',
    data: 'u_n = 70\\times 1{,}14^n + 50',
    parts: [{
      questions: [
        { n: '1', text: 'Vérifier l\'initialisation au rang $0$.' },
        { n: '2', text: 'Supposer la formule vraie au rang $n$ et calculer $u_{n+1}=1{,}14\\,u_n-7$. Montrer que cela donne $70\\times 1{,}14^{n+1}+50$.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'suites-4',
    context: 'Démontrer par récurrence que pour tout entier $n\\geq 1$ :',
    data: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}',
    parts: [{
      questions: [
        { n: '1', text: 'Initialiser au rang $n=1$.' },
        { n: '2', text: 'Rédiger l\'hérédité : développer $\\sum_{k=1}^{n+1}k=\\sum_{k=1}^{n}k+(n+1)$ et factoriser.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'suites-5',
    context: 'Soit $(u_n)_{n\\geq 1}$ définie par $u_n=\\dfrac{4}{n}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer un rang $N$ tel que pour tout $n>N$, $|u_n-0|<0{,}8$.' },
        { n: '2', text: 'Montrer à l\'aide de la définition avec $\\varepsilon$ que $(u_n)$ converge vers $0$.' },
      ],
    }],
  },
  {
    id: 'suites-6',
    context: 'Soit $e_n=\\dfrac{1}{n+5}$ pour $n\\geq 1$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que pour tout $n\\geq 1$, $0<e_n\\leq\\dfrac{1}{n}$.' },
        { n: '2', text: 'En déduire la limite de $(e_n)$.' },
      ],
    }],
  },
  {
    id: 'suites-7',
    context: 'Soit $w_n=\\dfrac{\\cos n+2\\sin n}{n^2}$ pour $n\\geq 1$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que pour tout $n\\geq 1$, $-\\dfrac{3}{n^2}\\leq w_n\\leq\\dfrac{3}{n^2}$.' },
        { n: '2', text: 'En déduire que $(w_n)$ converge vers $0$.' },
      ],
    }],
  },
  {
    id: 'suites-8',
    context: 'Soit $(w_n)$ définie par $w_0=2$ et $w_{n+1}=\\sqrt{7w_n}$. On pose $P(n)$ : $0\\leq w_n\\leq w_{n+1}\\leq 7$.',
    parts: [{
      questions: [
        { n: '1', text: 'Vérifier $P(0)$ numériquement.' },
        { n: '2', text: 'Supposer $P(n)$ ; utiliser la monotonie de $x\\mapsto\\sqrt{7x}$ pour montrer $P(n+1)$.' },
        { n: '3', text: 'En déduire la monotonie de $(w_n)$ et sa convergence.' },
      ],
    }],
  },
  {
    id: 'suites-9',
    context: 'Démontrer par récurrence que pour tout entier $n\\geq 1$ :',
    data: '\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}',
    parts: [{
      questions: [
        { n: '1', text: 'Initialiser au rang $n=1$.' },
        { n: '2', text: 'Rédiger l\'hérédité en calculant $\\sum_{k=1}^{n+1}k^2=\\sum_{k=1}^{n}k^2+(n+1)^2$.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'suites-10',
    context: 'Démontrer que pour tout $n\\in\\mathbb{N}$, $9^n-1$ est divisible par $8$.',
    parts: [{
      questions: [
        { n: '1', text: 'Initialiser en $n=0$.' },
        { n: '2', text: 'Supposer $9^n-1=8k$ ; montrer que $9^{n+1}-1=8(9k+1)$.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'suites-11',
    context: 'Soit $a\\geq 0$ un réel fixé. Démontrer par récurrence que pour tout $n\\in\\mathbb{N}$ :',
    data: '(1+a)^n \\geq 1+na',
    parts: [{
      questions: [
        { n: '1', text: 'Initialiser.' },
        { n: '2', text: 'Rédiger l\'hérédité en multipliant par $(1+a)\\geq 0$ puis en minorer $na^2$.' },
        { n: '3', text: 'Conclure. (Cette inégalité s\'appelle **inégalité de Bernoulli**.)' },
      ],
    }],
  },
  {
    id: 'suites-12',
    context: 'Soit $u_n=\\sqrt{n}$ pour $n\\geq 0$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer un entier $N$ tel que pour tout $n>N$, $u_n>2020$.' },
        { n: '2', text: 'Montrer rigoureusement que $(u_n)$ diverge vers $+\\infty$.' },
      ],
    }],
  },
  {
    id: 'suites-13',
    context: 'On pose $u_n=e^n$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer par récurrence que pour tout $n\\in\\mathbb{N}$, $e^n\\geq n+1$.' },
        { n: '2', text: 'En déduire que $(u_n)$ diverge vers $+\\infty$.' },
      ],
    }],
  },
  {
    id: 'suites-14',
    context: 'On pose $u_n=\\left(\\dfrac{2}{3}\\right)^n$ et $S_n=\\displaystyle\\sum_{k=0}^{n}\\left(\\dfrac{2}{3}\\right)^k$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer $\\displaystyle\\lim_{n\\to+\\infty}u_n$.' },
        { n: '2', text: 'Exprimer $S_n$ sous forme close (somme géométrique), puis calculer $\\displaystyle\\lim_{n\\to+\\infty}S_n$.' },
      ],
    }],
  },
  {
    id: 'suites-15',
    context: 'Déterminer les limites suivantes en levant les formes indéterminées.',
    parts: [{
      questions: [
        { n: '1', text: '$\\displaystyle\\lim_{n\\to+\\infty}(n^2-2n+5)$ — factoriser par $n^2$.' },
        { n: '2', text: '$\\displaystyle\\lim_{n\\to+\\infty}\\dfrac{3n+1}{n^2+2n-8}$ — factoriser par $n^2$ au dénominateur.' },
      ],
    }],
  },
  {
    id: 'suites-16',
    context: 'Soit $(u_n)$ définie par $u_0=0$ et $u_{n+1}=\\sqrt{u_n+2}$. On admet que $0\\leq u_n\\leq 2$ pour tout $n$.',
    parts: [{
      questions: [
        { n: '1', text: 'Étudier le signe de $u_{n+1}-u_n=\\sqrt{u_n+2}-u_n$ sur $[0,2]$ et conclure sur la monotonie.' },
        { n: '2', text: 'Justifier la convergence de $(u_n)$.' },
        { n: '3', text: 'Déterminer la limite en résolvant $\\ell=\\sqrt{\\ell+2}$.' },
      ],
    }],
  },
  {
    id: 'suites-17',
    context: 'Soit $(u_n)$ définie par $u_0=1$ et $u_{n+1}=0{,}5\\,u_n+3$. On pose $v_n=u_n-6$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $(v_n)$ est géométrique et préciser sa raison et $v_0$.' },
        { n: '2', text: 'Exprimer $v_n$ puis $u_n$ en fonction de $n$.' },
        { n: '3', text: 'Déterminer $\\displaystyle\\lim_{n\\to+\\infty}u_n$.' },
        { n: '4', text: 'On pose $S_n=\\displaystyle\\sum_{k=0}^{n}u_k$. Exprimer $S_n$ en fonction de $n$.' },
      ],
    }],
  },
  {
    id: 'suites-18',
    context: 'Soit $(u_n)$ définie par $u_0=0$ et $u_{n+1}=\\sqrt{2u_n+3}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer par récurrence que pour tout $n\\in\\mathbb{N}$, $0\\leq u_n\\leq 3$.' },
        { n: '2', text: 'Montrer que $(u_n)$ est croissante.' },
        { n: '3', text: 'En déduire que $(u_n)$ converge, puis déterminer sa limite.' },
        { n: '4', text: 'Écrire un algorithme Python qui renvoie le plus petit rang $n$ tel que $u_n\\geq 2{,}999$.' },
      ],
    }],
  },
  {
    id: 'suites-19',
    context: 'Soit $(u_n)$ définie par $u_0=1$ et $u_{n+1}=\\dfrac{u_n}{1+u_n}$. On admet que $u_n>0$ pour tout $n$.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $u_1$ et $u_2$.' },
        { n: '2', text: 'Poser $v_n=\\dfrac{1}{u_n}$ et montrer que $(v_n)$ est arithmétique. Préciser sa raison et $v_0$.' },
        { n: '3', text: 'En déduire $u_n$ en fonction de $n$.' },
        { n: '4', text: 'Déterminer $\\displaystyle\\lim_{n\\to+\\infty}u_n$.' },
      ],
    }],
  },
  {
    id: 'suites-20',
    context: 'Pour tout $n\\geq 1$, on pose $u_n=\\displaystyle\\sum_{k=1}^{n}\\dfrac{1}{n^2+k}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Justifier l\'encadrement $\\dfrac{n}{n^2+n}\\leq u_n\\leq\\dfrac{n}{n^2+1}$ en encadrant chaque terme $\\dfrac{1}{n^2+k}$.' },
        { n: '2', text: 'En déduire $\\displaystyle\\lim_{n\\to+\\infty}u_n$ par le théorème des gendarmes.' },
      ],
    }],
  },
  {
    id: 'suites-21',
    context: 'Soit $(u_n)$ définie par $u_0=1$, $u_1=2$ et $u_{n+2}=\\dfrac{u_{n+1}+u_n}{2}$. On pose $v_n=u_{n+1}-u_n$.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $u_2$ et $u_3$.' },
        { n: '2', text: 'Montrer que $(v_n)$ est géométrique et préciser sa raison et $v_0$.' },
        { n: '3', text: 'Exprimer $v_n$, puis $u_n$ via une somme télescopique $u_n=u_0+\\sum_{k=0}^{n-1}v_k$.' },
        { n: '4', text: 'Déterminer $\\displaystyle\\lim_{n\\to+\\infty}u_n$.' },
      ],
    }],
  },
];
