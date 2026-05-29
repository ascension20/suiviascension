import { useState } from 'react';
import { ExternalLink, Play, Lock, BookOpen, ChevronRight } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

type Level = '3ème' | 'Seconde' | 'Première' | 'Terminale';

interface VideoModule {
  id: string;
  title: string;
  duration?: string;        // ex. "12 min"
  videoUrl?: string;        // YouTube embed or direct — empty = coming soon
  thumbnail?: string;       // optional thumbnail URL
}

interface Chapter {
  id: string;
  title: string;
  modules: VideoModule[];
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: Chapter[];
}

// ─── Content catalogue ──────────────────────────────────────────────────────
// Fill in videoUrl when a video is ready; leaving it empty shows "Bientôt".

const CATALOGUE: Record<Level, Subject[]> = {
  '3ème': [
    {
      id: 'maths-3e', name: 'Mathématiques', icon: '📐',
      chapters: [
        { id: 'calcul-litteral', title: 'Calcul littéral', modules: [
          { id: 'v1', title: 'Développer et factoriser' },
          { id: 'v2', title: 'Équations du 1er degré' },
        ]},
        { id: 'geometrie', title: 'Géométrie', modules: [
          { id: 'v3', title: 'Théorème de Pythagore' },
          { id: 'v4', title: 'Théorème de Thalès' },
        ]},
        { id: 'stats-proba', title: 'Stats & Probabilités', modules: [
          { id: 'v5', title: 'Probabilités — les bases' },
        ]},
      ],
    },
    {
      id: 'francais-3e', name: 'Français', icon: '📖',
      chapters: [
        { id: 'lecture', title: 'Compréhension de texte', modules: [
          { id: 'v6', title: 'Analyser un texte littéraire' },
        ]},
        { id: 'redaction', title: 'Rédaction', modules: [
          { id: 'v7', title: 'La dissertation courte' },
        ]},
      ],
    },
    {
      id: 'physique-3e', name: 'Physique-Chimie', icon: '⚗️',
      chapters: [
        { id: 'electricite', title: 'Électricité', modules: [
          { id: 'v8', title: 'Circuits série et parallèle' },
        ]},
      ],
    },
  ],

  'Seconde': [
    {
      id: 'maths-2de', name: 'Mathématiques', icon: '📐',
      chapters: [
        { id: 'fonctions', title: 'Fonctions', modules: [
          { id: 'v10', title: 'Notion de fonction' },
          { id: 'v11', title: 'Variations et extrema' },
        ]},
        { id: 'geometrie-2de', title: 'Géométrie analytique', modules: [
          { id: 'v12', title: 'Vecteurs dans le plan' },
          { id: 'v13', title: 'Droites et équations' },
        ]},
        { id: 'stats-2de', title: 'Statistiques', modules: [
          { id: 'v14', title: 'Indicateurs de dispersion' },
        ]},
      ],
    },
    {
      id: 'pc-2de', name: 'Physique-Chimie', icon: '⚗️',
      chapters: [
        { id: 'mecanique', title: 'Mécanique', modules: [
          { id: 'v15', title: 'Les forces' },
        ]},
        { id: 'chimie-2de', title: 'Chimie', modules: [
          { id: 'v16', title: 'Atomes et molécules' },
        ]},
      ],
    },
    {
      id: 'svt-2de', name: 'SVT', icon: '🌱',
      chapters: [
        { id: 'adn', title: 'ADN & génétique', modules: [
          { id: 'v17', title: 'Structure de l\'ADN' },
        ]},
      ],
    },
  ],

  'Première': [
    {
      id: 'maths-1ere', name: 'Mathématiques', icon: '📐',
      chapters: [
        { id: 'suites', title: 'Suites', modules: [
          { id: 'v20', title: 'Suites arithmétiques' },
          { id: 'v21', title: 'Suites géométriques' },
        ]},
        { id: 'derivation', title: 'Dérivation', modules: [
          { id: 'v22', title: 'Définition et règles de calcul' },
          { id: 'v23', title: 'Applications : variations' },
        ]},
        { id: 'trigo-1ere', title: 'Trigonométrie', modules: [
          { id: 'v24', title: 'Cercle trigonométrique' },
        ]},
      ],
    },
    {
      id: 'physique-1ere', name: 'Physique-Chimie', icon: '⚗️',
      chapters: [
        { id: 'ondes', title: 'Ondes', modules: [
          { id: 'v25', title: 'Caractéristiques d\'une onde' },
        ]},
        { id: 'thermochimie', title: 'Thermochimie', modules: [
          { id: 'v26', title: 'Enthalpie de réaction' },
        ]},
      ],
    },
    {
      id: 'philo-intro', name: 'Philosophie (intro)', icon: '🧠',
      chapters: [
        { id: 'methode-philo', title: 'Méthode', modules: [
          { id: 'v27', title: 'Rédiger une dissertation philo' },
        ]},
      ],
    },
  ],

  'Terminale': [
    {
      id: 'maths-term', name: 'Mathématiques', icon: '📐',
      chapters: [
        { id: 'integrales', title: 'Intégrales', modules: [
          { id: 'v30', title: 'Primitives et intégrales' },
          { id: 'v31', title: 'Calcul d\'aire' },
        ]},
        { id: 'proba-term', title: 'Probabilités avancées', modules: [
          { id: 'v32', title: 'Loi normale' },
          { id: 'v33', title: 'Intervalle de fluctuation' },
        ]},
        { id: 'logarithme', title: 'Logarithme', modules: [
          { id: 'v34', title: 'Fonction ln' },
          { id: 'v35', title: 'Equations avec ln' },
        ]},
        { id: 'exponentielle', title: 'Fonction exponentielle', modules: [
          { id: 'v36', title: 'Propriétés de exp' },
        ]},
      ],
    },
    {
      id: 'physique-term', name: 'Physique-Chimie', icon: '⚗️',
      chapters: [
        { id: 'mecanique-term', title: 'Mécanique', modules: [
          { id: 'v37', title: 'Deuxième loi de Newton' },
          { id: 'v38', title: 'Mouvements dans un champ' },
        ]},
        { id: 'optique', title: 'Optique', modules: [
          { id: 'v39', title: 'Lunette astronomique' },
        ]},
      ],
    },
    {
      id: 'philo-term', name: 'Philosophie', icon: '🧠',
      chapters: [
        { id: 'notions-philo', title: 'Notions clés', modules: [
          { id: 'v40', title: 'La conscience' },
          { id: 'v41', title: 'Le temps' },
          { id: 'v42', title: 'La liberté' },
        ]},
        { id: 'methode-term', title: 'Méthode bac', modules: [
          { id: 'v43', title: 'Dissertation — plan dialectique' },
          { id: 'v44', title: 'Explication de texte' },
        ]},
      ],
    },
  ],
};

const LEVELS: Level[] = ['3ème', 'Seconde', 'Première', 'Terminale'];
const METHODS_URL = 'https://ascension20.github.io/methodes/';

// ─── Sub-components ──────────────────────────────────────────────────────────

function VideoCard({ module: m }: { module: VideoModule }) {
  const ready = !!m.videoUrl;
  return (
    <div
      className={`relative rounded-lg border overflow-hidden transition-all duration-200
        ${ready
          ? 'border-amber-500/30 bg-card hover:border-amber-500/60 cursor-pointer group'
          : 'border-border bg-secondary/50 opacity-70'
        }`}
    >
      {/* Thumbnail / placeholder */}
      <div className="aspect-video bg-secondary flex items-center justify-center relative">
        {m.thumbnail
          ? <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover" />
          : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {ready
                ? <Play size={28} className="text-amber-500 group-hover:scale-110 transition-transform" />
                : <Lock size={20} />
              }
              {!ready && <span className="text-xs">Bientôt</span>}
            </div>
          )
        }
        {ready && !m.thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={32} className="text-white" />
          </div>
        )}
        {m.duration && (
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
            {m.duration}
          </span>
        )}
      </div>
      <p className={`px-2 py-1.5 text-xs font-medium leading-snug
        ${ready ? 'text-foreground' : 'text-muted-foreground'}`}>
        {m.title}
      </p>
    </div>
  );
}

function ChapterSection({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(false);
  const readyCount = chapter.modules.filter(m => !!m.videoUrl).length;
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/40 hover:bg-secondary/70 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-amber-400 shrink-0" />
          <span className="font-medium text-sm">{chapter.title}</span>
          <span className="text-xs text-muted-foreground">
            {readyCount}/{chapter.modules.length} vidéo{chapter.modules.length > 1 ? 's' : ''}
          </span>
        </div>
        <ChevronRight size={14} className={`text-muted-foreground transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {chapter.modules.map(m => <VideoCard key={m.id} module={m} />)}
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ResourcesTab() {
  const [activeLevel, setActiveLevel] = useState<Level>('Terminale');
  const [iframeError, setIframeError] = useState(false);

  const subjects = CATALOGUE[activeLevel];

  return (
    <div className="space-y-8 pb-10">

      {/* ── Section 1 : Méthodes ───────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            📚 Méthodes
          </h2>
          <a
            href={METHODS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            Ouvrir <ExternalLink size={12} />
          </a>
        </div>

        {!iframeError ? (
          <>
            <div className="rounded-xl border border-border overflow-hidden shadow-lg"
                 style={{ height: '520px' }}>
              <iframe
                src={METHODS_URL}
                title="Méthodes Ascension"
                className="w-full h-full"
                onError={() => setIframeError(true)}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 text-center">
              Si la page ne s'affiche pas, clique sur{' '}
              <a href={METHODS_URL} target="_blank" rel="noopener noreferrer"
                 className="text-amber-400 underline hover:text-amber-300">Ouvrir</a>.
            </p>
          </>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/50 p-8 text-center">
            <p className="text-muted-foreground mb-3">Impossible d'afficher la page directement ici.</p>
            <a
              href={METHODS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors"
            >
              Ouvrir les méthodes <ExternalLink size={14} />
            </a>
          </div>
        )}
      </section>

      {/* ── Section 2 : Modules vidéo ─────────────────────────────────────── */}
      <section>
        <h2 className="font-display font-bold text-lg flex items-center gap-2 mb-4">
          🎬 Modules vidéo
        </h2>

        {/* Level tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                ${activeLevel === lvl
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                  : 'border-border bg-secondary text-muted-foreground hover:border-amber-500/40 hover:text-foreground'
                }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Subjects */}
        <div className="space-y-6">
          {subjects.map(subject => (
            <div key={subject.id}>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>{subject.icon}</span> {subject.name}
              </h3>
              <div className="space-y-2">
                {subject.chapters.map(ch => (
                  <ChapterSection key={ch.id} chapter={ch} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
