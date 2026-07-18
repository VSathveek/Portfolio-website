-- Journal entries: one drawing-notebook page per row, private to its owner.
-- Run in the Supabase SQL editor (or via the Supabase CLI). Row Level Security
-- with owner-only policies is what actually makes the journal private.

create table if not exists public.journal_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title      text not null default 'Untitled',
  scene      jsonb,                       -- the Excalidraw scene (elements + appState)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- List a user's entries newest-first efficiently.
create index if not exists journal_entries_user_updated_idx
  on public.journal_entries (user_id, updated_at desc);

-- Keep updated_at fresh on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_journal_entries_updated_at on public.journal_entries;
create trigger set_journal_entries_updated_at
  before update on public.journal_entries
  for each row execute function public.set_updated_at();

-- Row Level Security: a row is only accessible to the authenticated user that owns it.
alter table public.journal_entries enable row level security;

drop policy if exists "Owners can read their entries" on public.journal_entries;
create policy "Owners can read their entries"
  on public.journal_entries for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Owners can create their entries" on public.journal_entries;
create policy "Owners can create their entries"
  on public.journal_entries for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Owners can update their entries" on public.journal_entries;
create policy "Owners can update their entries"
  on public.journal_entries for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Owners can delete their entries" on public.journal_entries;
create policy "Owners can delete their entries"
  on public.journal_entries for delete
  to authenticated
  using (auth.uid() = user_id);
