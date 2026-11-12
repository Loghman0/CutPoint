-- CutPoint initial schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  banner_url text,
  role text check (role in ('Editor', 'Creator', 'Viewer')) default 'Viewer',
  bio text,
  level integer default 1,
  xp integer default 0,
  is_verified boolean default false,
  available_for_hire boolean default false,
  specialties text[] default '{}',
  software text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Edits Table (Videos)
create table public.edits (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text not null,
  category text not null,
  software text[] default '{}',
  likes_count integer default 0,
  views_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Likes Table
create table public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  edit_id uuid references public.edits(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, edit_id)
);

-- 4. Follows Table
create table public.follows (
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (follower_id, following_id)
);

-- Reusable Row Level Security (RLS) configuration
alter table public.profiles enable row level security;
alter table public.edits enable row level security;
alter table public.likes enable row level security;
alter table public.follows enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);
create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

create policy "Edits are viewable by everyone." on public.edits
  for select using (true);
create policy "Authenticated users can create edits." on public.edits
  for insert with check (auth.role() = 'authenticated');
create policy "Users can update own edits." on public.edits
  for update using (auth.uid() = author_id);
create policy "Users can delete own edits." on public.edits
  for delete using (auth.uid() = author_id);

create policy "Likes are viewable by everyone." on public.likes
  for select using (true);
create policy "Authenticated users can insert likes." on public.likes
  for insert with check (auth.role() = 'authenticated');
create policy "Users can delete own likes." on public.likes
  for delete using (auth.uid() = user_id);

create policy "Follows viewable by everyone." on public.follows
  for select using (true);
create policy "Authenticated users can follow." on public.follows
  for insert with check (auth.role() = 'authenticated' and auth.uid() = follower_id);
create policy "Users can unfollow." on public.follows
  for delete using (auth.uid() = follower_id);

-- Setup trigger to automatically create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'Viewer')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Setup Storage buckets
insert into storage.buckets (id, name, public) values ('videos', 'videos', true);
insert into storage.buckets (id, name, public) values ('thumbnails', 'thumbnails', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

create policy "Videos are publicly accessible."
  on storage.objects for select using (bucket_id = 'videos');
create policy "Authenticated users can upload videos."
  on storage.objects for insert with check (bucket_id = 'videos' and auth.role() = 'authenticated');

create policy "Thumbnails are publicly accessible."
  on storage.objects for select using (bucket_id = 'thumbnails');
create policy "Authenticated users can upload thumbnails."
  on storage.objects for insert with check (bucket_id = 'thumbnails' and auth.role() = 'authenticated');

create policy "Avatars are publicly accessible."
  on storage.objects for select using (bucket_id = 'avatars');
create policy "Authenticated users can upload avatars."
  on storage.objects for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
