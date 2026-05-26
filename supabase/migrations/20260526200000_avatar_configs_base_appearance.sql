-- Ajoute les colonnes d'apparence de base à avatar_configs
ALTER TABLE public.avatar_configs
  ADD COLUMN IF NOT EXISTS skin_color TEXT NOT NULL DEFAULT 'light',
  ADD COLUMN IF NOT EXISTS hair_style TEXT NOT NULL DEFAULT 'shortHairShortFlat',
  ADD COLUMN IF NOT EXISTS hair_color TEXT NOT NULL DEFAULT 'brown';
