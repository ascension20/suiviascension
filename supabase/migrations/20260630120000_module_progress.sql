-- Table de progression par niveau pour les modules (exercices)
create table public.module_progress (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users(id) on delete cascade,
  module_id    text        not null,
  level_id     text        not null,
  completed_at timestamptz not null default now(),
  xp_earned    integer     not null default 0,
  unique(user_id, module_id, level_id)
);

alter table public.module_progress enable row level security;

create policy "Users read own module progress"
  on public.module_progress for select
  using (auth.uid() = user_id);

create policy "Users insert own module progress"
  on public.module_progress for insert
  with check (auth.uid() = user_id);

create index module_progress_user_module_idx
  on public.module_progress(user_id, module_id);
