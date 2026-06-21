import pg from 'pg';

// ⚠️ IMPORTANT: Replace [YOUR-PASSWORD] with your actual Supabase database password before running this script!
const connectionString = 'postgresql://postgres:Damilare30$@db.gbgfddylymulwsmuywml.supabase.co:5432/postgres';

const client = new pg.Client({
  connectionString,
});

async function setupDatabase() {
  try {
    console.log('Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected to Supabase Postgres!');

    const sql = `
-- 1. Create Storage Bucket for Product Images
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict do nothing;

-- Drop existing policies to prevent "policy already exists" errors if run multiple times
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Auth Insert" on storage.objects;
drop policy if exists "Auth Update" on storage.objects;
drop policy if exists "Auth Delete" on storage.objects;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'product-images' );
create policy "Auth Insert" on storage.objects for insert with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
create policy "Auth Update" on storage.objects for update with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );

-- 2. Create Carts Table
create table if not exists public.carts (
  id uuid default gen_random_uuid() primary key,
  user_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Cart Items Table
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid references public.carts(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  size text not null,
  color text not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(cart_id, product_id, size, color)
);

-- 4. Secure the Products Table
drop policy if exists "Allow public insert access" on public.products;
drop policy if exists "Allow auth insert" on public.products;
drop policy if exists "Allow auth update" on public.products;
drop policy if exists "Allow auth delete" on public.products;

create policy "Allow auth insert" on public.products for insert with check (auth.role() = 'authenticated');
create policy "Allow auth update" on public.products for update using (auth.role() = 'authenticated');
create policy "Allow auth delete" on public.products for delete using (auth.role() = 'authenticated');

-- 5. Set up Cart Policies
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
drop policy if exists "Public carts access" on public.carts;
drop policy if exists "Public cart items access" on public.cart_items;
create policy "Public carts access" on public.carts for all using (true);
create policy "Public cart items access" on public.cart_items for all using (true);
    `;

    console.log('Running SQL Setup...');
    await client.query(sql);
    console.log('✅ Database Schema and Policies created successfully!');

    // Since we are running raw SQL, we can't easily use the Supabase Auth API to create a user here because it requires hashing the password securely.
    // However, the database is now ready for the frontend code!
    console.log('\\n👉 NEXT STEP: Go to Supabase Dashboard -> Authentication -> Users and create a new user (e.g., admin@fyb.com).');

  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
