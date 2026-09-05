import { useState } from 'react';
import { Loader2, X, CalendarPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { fetchICal, parseICal, icalToPlanningEvent } from '@/lib/ical-parser';

interface Props {
  userId: string;
  currentUrl: string | null;
  onClose: () => void;
  /** Called after a successful save so the planner can reload */
  onSaved: (url: string | null) => void;
}

export function IcalSettingsModal({ userId, currentUrl, onClose, onSaved }: Props) {
  const [url, setUrl] = useState(currentUrl ?? '');
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const save = async () => {
    setStatus('saving');
    setMessage(null);
    const clean = url.trim();

    try {
      await supabase.from('user_private').upsert(
        { user_id: userId, ical_url: clean || null },
        { onConflict: 'user_id' },
      );

      if (!clean) {
        await supabase.from('planning_events').delete().eq('user_id', userId).eq('source', 'ical');
        onSaved(null);
        onClose();
        return;
      }

      const txt = await fetchICal(clean);
      const rangeStart = new Date();
      const rangeEnd = new Date();
      rangeEnd.setMonth(rangeEnd.getMonth() + 3);
      const parsed = parseICal(txt, rangeStart, rangeEnd);

      if (parsed.length > 0) {
        await supabase.from('planning_events').delete().eq('user_id', userId).eq('source', 'ical');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const rows = parsed.map(e => { const { id: _id, ...rest } = icalToPlanningEvent(e, userId); return rest; });
        await supabase.from('planning_events').insert(rows);
      }

      onSaved(clean);
      onClose();
    } catch {
      setStatus('error');
      setMessage("Impossible de lire ce lien. Vérifie qu'il s'agit bien d'un lien iCal (.ics) valide.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold flex items-center gap-2">
            <CalendarPlus size={15} className="text-primary" />
            Emploi du temps (iCal)
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary"><X size={14} /></button>
        </div>

        <p className="text-xs text-muted-foreground">
          Colle le lien d'abonnement de ton agenda (Pronote, EcoleDirecte, Google Agenda…).
          Tes cours des 3 prochains mois seront importés automatiquement.
        </p>

        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://… .ics"
          className="w-full h-9 px-3 rounded-md bg-secondary border border-border text-sm"
        />

        {message && <p className="text-xs text-destructive">{message}</p>}

        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={status === 'saving'}
            className="flex-1 h-9 rounded-md text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            {status === 'saving' ? <Loader2 size={14} className="animate-spin" /> : null}
            {currentUrl ? 'Mettre à jour' : 'Importer mon emploi du temps'}
          </button>
          {currentUrl && (
            <button
              onClick={() => { setUrl(''); }}
              className="h-9 px-3 rounded-md text-xs border border-border hover:bg-secondary"
            >
              Effacer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
