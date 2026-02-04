'use client'

import { useState } from 'react'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Plus
} from 'lucide-react'

interface DailyStat {
  date: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  followers: number
  new_followers: number
  total_views: number
  total_likes: number
  engagement_rate: number
}

const platformConfig = {
  tiktok: { name: 'TikTok', emoji: '📱', color: 'bg-black text-white' },
  instagram: { name: 'Instagram', emoji: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
  youtube: { name: 'YouTube', emoji: '▶️', color: 'bg-red-500 text-white' },
}

// Données de démo - vides au départ
const initialStats: DailyStat[] = []

export default function StatsPage() {
  const [stats, setStats] = useState<DailyStat[]>(initialStats)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok')

  // Calculer les totaux par plateforme
  const latestStatsByPlatform = {
    tiktok: stats.filter(s => s.platform === 'tiktok').sort((a, b) => b.date.localeCompare(a.date))[0],
    instagram: stats.filter(s => s.platform === 'instagram').sort((a, b) => b.date.localeCompare(a.date))[0],
    youtube: stats.filter(s => s.platform === 'youtube').sort((a, b) => b.date.localeCompare(a.date))[0],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistiques</h1>
          <p className="text-muted-foreground mt-1">
            Suivez votre croissance sur les réseaux
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter stats du jour
        </button>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(platformConfig).map(([key, config]) => {
          const latestStat = latestStatsByPlatform[key as keyof typeof latestStatsByPlatform]
          
          return (
            <div
              key={key}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config.emoji}</span>
                  <h3 className="font-semibold text-foreground">{config.name}</h3>
                </div>
                {latestStat && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(latestStat.date).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>

              {latestStat ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      {latestStat.followers.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm">
                      {latestStat.new_followers >= 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">+{latestStat.new_followers}</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">{latestStat.new_followers}</span>
                        </>
                      )}
                      <span className="text-muted-foreground">followers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Vues</p>
                      <p className="font-semibold text-foreground">
                        {latestStat.total_views.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Likes</p>
                      <p className="font-semibold text-foreground">
                        {latestStat.total_likes.toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="font-semibold text-foreground">
                        {latestStat.engagement_rate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Pas encore de données</p>
                  <button
                    onClick={() => {
                      setSelectedPlatform(key as 'tiktok' | 'instagram' | 'youtube')
                      setShowAddModal(true)
                    }}
                    className="mt-2 text-sm text-primary hover:underline"
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
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Historique</h2>
        
        {stats.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Pas encore de données</h3>
            <p className="text-muted-foreground mt-1">
              Commencez à tracker vos stats quotidiennes pour voir l'évolution
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ajouter les stats d'aujourd'hui
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plateforme</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Followers</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Nouveaux</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Vues</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Likes</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {stats.sort((a, b) => b.date.localeCompare(a.date)).map((stat, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(stat.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-lg">{platformConfig[stat.platform].emoji}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-foreground">
                      {stat.followers.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm">
                      <span className={stat.new_followers >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {stat.new_followers >= 0 ? '+' : ''}{stat.new_followers}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-foreground">
                      {stat.total_views.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-foreground">
                      {stat.total_likes.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-foreground">
                      {stat.engagement_rate.toFixed(1)}%
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Ajouter stats du jour
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Plateforme</label>
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as 'tiktok' | 'instagram' | 'youtube')}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="tiktok">📱 TikTok</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="youtube">▶️ YouTube</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Followers total</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nouveaux followers</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Vues totales</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Likes totaux</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Taux d'engagement (%)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
