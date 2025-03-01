create table if not exists blogs (
  id bigint primary key generated always as identity,
  title text not null,
  content text not null,
  slug text not null,
  is_pending boolean default true,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.blogs enable row level security;

create policy "Enable read access for all users" on public.blogs
    as permissive for select
    to public
    using (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.blogs
    AS PERMISSIVE FOR ALL
    TO authenticated, service_role
    WITH CHECK (true);
