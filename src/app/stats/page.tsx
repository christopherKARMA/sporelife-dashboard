'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Plus,
  RefreshCw,
  X,
  Trash2
} from 'lucide-react'
import { supabase, DailyStat } from '@/lib/supabase'

const platformConfig = {
  tiktok: { name: 'TikTok', emoji: '📱', color: 'bg-black text-white' },
  instagram: { name: 'Instagram', emoji: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
  youtube: { name: 'YouTube', emoji: '▶️', color: 'bg-red-500 text-white' },
}

export default function StatsPage() {
  const [stats, setStats] = useState<DailyStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok')
  
  // Form refs
  const dateRef = useRef<HTMLInputElement>(null)
  const followersRef = useRef<HTMLInputElement>(null)
  const newFollowersRef = useRef<HTMLInputElement>(null)
  const viewsRef = useRef<HTMLInputElement>(null)
  const likesRef = useRef<HTMLInputElement>(null)
  const engagementRef = useRef<HTMLInputElement>(null)

  // Fetch stats from Supabase
  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching stats:', error)
      return
    }

    setStats(data || [])
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await fetchStats()
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('daily-stats-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_stats' }, () => {
        fetchStats()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Calculer les totaux par plateforme
  const latestStatsByPlatform = {
    tiktok: stats.filter(s => s.platform === 'tiktok').sort((a, b) => b.date.localeCompare(a.date))[0],
    instagram: stats.filter(s => s.platform === 'instagram').sort((a, b) => b.date.localeCompare(a.date))[0],
    youtube: stats.filter(s => s.platform === 'youtube').sort((a, b) => b.date.localeCompare(a.date))[0],
  }

  const saveStats = async () => {
    if (!dateRef.current?.value || !followersRef.current?.value) return
    setIsSaving(true)

    const newStat = {
      date: dateRef.current.value,
      platform: selectedPlatform,
      followers: parseInt(followersRef.current.value) || 0,
      new_followers: parseInt(newFollowersRef.current?.value || '0') || 0,
      total_views: parseInt(viewsRef.current?.value || '0') || 0,
      total_likes: parseInt(likesRef.current?.value || '0') || 0,
      engagement_rate: parseFloat(engagementRef.current?.value || '0') || 0,
    }

    const { error } = await supabase
      .from('daily_stats')
      .insert(newStat)

    if (error) {
      console.error('Error saving stats:', error)
      setIsSaving(false)
      return
    }

    await fetchStats()
    setIsSaving(false)
    setShowAddModal(false)
  }

  const deleteStat = async (statId: string) => {
    if (!confirm('Supprimer cette entrée ?')) return

    const { error } = await supabase
      .from('daily_stats')
      .delete()
      .eq('id', statId)

    if (error) {
      console.error('Error deleting stat:', error)
      return
    }

    setStats(stats.filter(s => s.id !== statId))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p style={{ color: '#a3a3a3' }}>Chargement depuis Supabase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#ffffff' }}>Statistiques</h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">
            Suivez votre croissance sur les réseaux
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchStats()}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#262626' }}
            title="Rafraîchir"
          >
            <RefreshCw className="w-5 h-5" style={{ color: '#a3a3a3' }} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Ajouter stats</span>
          </button>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(platformConfig).map(([key, config]) => {
          const latestStat = latestStatsByPlatform[key as keyof typeof latestStatsByPlatform]
          
          return (
            <div
              key={key}
              className="rounded-xl p-6"
              style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config.emoji}</span>
                  <h3 className="font-semibold" style={{ color: '#ffffff' }}>{config.name}</h3>
                </div>
                {latestStat && (
                  <span className="text-xs" style={{ color: '#737373' }}>
                    {new Date(latestStat.date).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>

              {latestStat ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>
                      {latestStat.followers.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm">
                      {latestStat.new_followers >= 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4" style={{ color: '#22c55e' }} />
                          <span style={{ color: '#22c55e' }}>+{latestStat.new_followers}</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4" style={{ color: '#ef4444' }} />
                          <span style={{ color: '#ef4444' }}>{latestStat.new_followers}</span>
                        </>
                      )}
                      <span style={{ color: '#737373' }}>followers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: '1px solid #262626' }}>
                    <div>
                      <p className="text-sm" style={{ color: '#737373' }}>Vues</p>
                      <p className="font-semibold" style={{ color: '#ffffff' }}>
                        {latestStat.total_views.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: '#737373' }}>Likes</p>
                      <p className="font-semibold" style={{ color: '#ffffff' }}>
                        {latestStat.total_likes.toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm" style={{ color: '#737373' }}>Engagement</p>
                      <p className="font-semibold" style={{ color: '#ffffff' }}>
                        {(latestStat.engagement_rate || 0).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="w-12 h-12 mx-auto mb-2" style={{ color: '#737373' }} />
                  <p style={{ color: '#737373' }}>Pas encore de données</p>
                  <button
                    onClick={() => {
                      setSelectedPlatform(key as 'tiktok' | 'instagram' | 'youtube')
                      setShowAddModal(true)
                    }}
                    className="mt-2 text-sm"
                    style={{ color: '#22c55e' }}
                  >
                    Ajouter des stats
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Historique */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Historique</h2>
        
        {stats.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 mx-auto mb-4" style={{ color: '#737373' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Pas encore de données</h3>
            <p className="mt-1" style={{ color: '#737373' }}>
              Commencez à tracker vos stats quotidiennes pour voir l'évolution
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
            >
              Ajouter les stats d'aujourd'hui
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #262626' }}>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Plateforme</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Followers</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Nouveaux</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Vues</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Likes</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}>Engagement</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: '#737373' }}></th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.id} style={{ borderBottom: '1px solid #262626' }}>
                    <td className="py-3 px-4 text-sm" style={{ color: '#ffffff' }}>
                      {new Date(stat.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-lg">{platformConfig[stat.platform].emoji}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm" style={{ color: '#ffffff' }}>
                      {stat.followers.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm">
                      <span style={{ color: stat.new_followers >= 0 ? '#22c55e' : '#ef4444' }}>
                        {stat.new_followers >= 0 ? '+' : ''}{stat.new_followers}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm" style={{ color: '#ffffff' }}>
                      {stat.total_views.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm" style={{ color: '#ffffff' }}>
                      {stat.total_likes.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm" style={{ color: '#ffffff' }}>
                      {(stat.engagement_rate || 0).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => deleteStat(stat.id)}
                        className="p-1 rounded"
                        style={{ backgroundColor: '#262626' }}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="rounded-xl p-6 w-full max-w-md mx-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ color: '#ffffff' }}>
                Ajouter stats du jour
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" style={{ color: '#737373' }} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Date</label>
                <input
                  ref={dateRef}
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Plateforme</label>
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as 'tiktok' | 'instagram' | 'youtube')}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                >
                  <option value="tiktok">📱 TikTok</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="youtube">▶️ YouTube</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Followers total *</label>
                  <input
                    ref={followersRef}
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Nouveaux followers</label>
                  <input
                    ref={newFollowersRef}
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Vues totales</label>
                  <input
                    ref={viewsRef}
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Likes totaux</label>
                  <input
                    ref={likesRef}
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#a3a3a3' }}>Taux d'engagement (%)</label>
                <input
                  ref={engagementRef}
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm"
                style={{ backgroundColor: '#262626', color: '#a3a3a3' }}
              >
                Annuler
              </button>
              <button
                onClick={saveStats}
                disabled={isSaving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
              >
                {isSaving ? 'Enregistrement...' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
