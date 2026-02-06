import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for the database
export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface Video {
  id: string
  title: string
  description: string | null
  platform: 'tiktok' | 'instagram' | 'youtube'
  status: 'idea' | 'scripted' | 'filmed' | 'editing' | 'published'
  scheduled_date: string | null
  published_date: string | null
  views: number | null
  likes: number | null
  comments: number | null
  shares: number | null
  user_id: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  category: 'product' | 'supplier' | 'content' | 'admin' | 'other'
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  product_type: string
  price_quote: number | null
  currency: string
  status: 'contacted' | 'negotiating' | 'accepted' | 'rejected'
  notes: string | null
  response_date: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export interface DailyStat {
  id: string
  date: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  followers: number
  new_followers: number
  total_views: number
  total_likes: number
  engagement_rate: number | null
  created_at: string
}

export interface Influencer {
  id: string
  name: string
  username: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  followers: string
  engagement: string | null
  status: 'to_contact' | 'contacted' | 'negotiating' | 'accepted' | 'shipped' | 'content_received' | 'declined'
  last_contact: string | null
  notes: string | null
  profile_url: string | null
  niche: string | null
  email: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface TaskDB {
  id: string
  title: string
  description: string | null
  category: 'product' | 'supplier' | 'content' | 'admin' | 'marketing' | 'legal'
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  day: number
  assignee: 'chris' | 'lucas' | 'both'
  is_video: boolean
  created_at: string
  updated_at: string
}

export interface SupplierDB {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  product_type: string
  country: string
  notes: string | null
  status: 'pending' | 'contacted' | 'negotiating' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

export interface FebTaskDB {
  id: string
  title: string
  description: string | null
  category: 'site' | 'seo' | 'amazon' | 'fournisseur' | 'distribution' | 'admin' | 'contenu'
  priority: 'high' | 'medium' | 'low'
  assignee: 'chris' | 'lucas' | 'both'
  status: 'todo' | 'in_progress' | 'done'
  week: number
  deadline: string | null
  created_at: string
  updated_at: string
}
