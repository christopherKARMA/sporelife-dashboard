-- SporeLife Dashboard - Tables Supabase
-- Exécuter ce SQL dans le Supabase SQL Editor: https://supabase.com/dashboard/project/lvloauvcohfsozzeldfy/sql/new

-- Table Influencers
CREATE TABLE IF NOT EXISTS public.influencers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram', 'youtube')),
  followers TEXT NOT NULL,
  engagement TEXT,
  status TEXT NOT NULL DEFAULT 'not_contacted' CHECK (status IN ('not_contacted', 'contacted', 'negotiating', 'accepted', 'declined')),
  last_contact DATE,
  notes TEXT,
  profile_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('product', 'supplier', 'content', 'admin', 'marketing', 'legal')),
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  day INTEGER NOT NULL,
  assignee TEXT NOT NULL DEFAULT 'chris' CHECK (assignee IN ('chris', 'lucas', 'both')),
  is_video BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Suppliers
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  product_type TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'negotiating', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Daily Stats
CREATE TABLE IF NOT EXISTS public.daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram', 'youtube')),
  followers INTEGER NOT NULL DEFAULT 0,
  new_followers INTEGER NOT NULL DEFAULT 0,
  total_views INTEGER NOT NULL DEFAULT 0,
  total_likes INTEGER NOT NULL DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - but allow all operations for now
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is required for this dashboard)
CREATE POLICY "Allow all operations on influencers" ON public.influencers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on suppliers" ON public.suppliers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on daily_stats" ON public.daily_stats FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_influencers_updated_at BEFORE UPDATE ON public.influencers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.influencers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.suppliers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_stats;
