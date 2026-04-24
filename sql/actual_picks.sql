-- Tracks real draft results as picks happen
create table actual_picks (
  id uuid default gen_random_uuid() primary key,
  pick integer not null unique check (pick between 1 and 32),
  prospect_id uuid not null references prospects(id),
  created_at timestamptz default now()
);

alter table actual_picks enable row level security;
create policy "Anyone can read" on actual_picks for select using (true);
create policy "Anyone can insert" on actual_picks for insert with check (true);
create policy "Anyone can update" on actual_picks for update using (true) with check (true);
alter publication supabase_realtime add table actual_picks;
