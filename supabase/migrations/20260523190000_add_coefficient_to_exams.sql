-- Add coefficient column to exams table (per-DS weight, like Pronote)
ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS coefficient NUMERIC(4,2) NOT NULL DEFAULT 1;
