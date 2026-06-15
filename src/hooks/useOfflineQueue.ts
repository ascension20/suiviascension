import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QueuedAction {
  id: string;
  type: 'task_complete' | 'quest_complete' | 'task_create';
  payload: any;
  timestamp: number;
}

const QUEUE_KEY = 'ascension_offline_queue';

function getQueue(): QueuedAction[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch { return []; }
}

function saveQueue(queue: QueuedAction[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(getQueue().length);

  const enqueue = useCallback((type: QueuedAction['type'], payload: any) => {
    const queue = getQueue();
    queue.push({ id: crypto.randomUUID(), type, payload, timestamp: Date.now() });
    saveQueue(queue);
    setPendingCount(queue.length);
  }, []);

  const syncQueue = useCallback(async () => {
    const queue = getQueue();
    if (queue.length === 0) return;

    const remaining: QueuedAction[] = [];
    for (const action of queue) {
      try {
        switch (action.type) {
          case 'task_complete':
            await supabase.from('student_tasks').update({ completed: true, completed_at: new Date().toISOString() }).eq('id', action.payload.id);
            break;
          case 'quest_complete':
            await supabase.from('quests').update({ completed: true, completed_at: new Date().toISOString() }).eq('id', action.payload.id);
            break;
          case 'task_create':
            await supabase.from('student_tasks').insert(action.payload);
            break;
        }
      } catch {
        remaining.push(action);
      }
    }
    saveQueue(remaining);
    setPendingCount(remaining.length);
  }, []);

  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); syncQueue(); };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Try syncing on mount if online
    if (navigator.onLine) syncQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncQueue]);

  return { isOnline, pendingCount, enqueue, syncQueue };
}
