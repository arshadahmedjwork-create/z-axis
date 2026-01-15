create table public.blogs (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  content text not null,
  image_url text not null,
  published boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint blogs_pkey primary key (id),
  constraint blogs_slug_key unique (slug)
);

alter table public.blogs enable row level security;

create policy "Enable read access for all users" on public.blogs
  for select using (published = true);

create policy "Enable all access for admins" on public.blogs
  for all using (
    exists (
      select 1 from public.admin_emails
      where admin_emails.email = auth.email()
    )
  );
