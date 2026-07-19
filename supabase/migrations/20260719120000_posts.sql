-- Blog posts authored in the private studio (/write) and published to /blog.
-- content is an ordered array of blocks: rich-text (Tiptap JSON) and drawings
-- (Excalidraw scene + exported SVG). Public may read only published posts.

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  slug         text not null unique,
  title        text not null default 'Untitled',
  description  text,
  content      jsonb not null default '[]'::jsonb,  -- Block[]
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists posts_published_idx
  on public.posts (published, coalesce(published_at, updated_at) desc);
create index if not exists posts_user_updated_idx
  on public.posts (user_id, updated_at desc);

-- Reuse the shared updated_at trigger function (created by the journal migration).
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

-- Anyone (including logged-out visitors) may read published posts.
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (published = true);

-- The owner can read all of their own posts, including drafts.
drop policy if exists "Owners can read their posts" on public.posts;
create policy "Owners can read their posts"
  on public.posts for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Owners can create their posts" on public.posts;
create policy "Owners can create their posts"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Owners can update their posts" on public.posts;
create policy "Owners can update their posts"
  on public.posts for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Owners can delete their posts" on public.posts;
create policy "Owners can delete their posts"
  on public.posts for delete
  to authenticated
  using (auth.uid() = user_id);
