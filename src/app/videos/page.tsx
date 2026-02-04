'use client'

import { useState } from 'react'
import { 
  Plus, 
  Video, 
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Filter
} from 'lucide-react'

interface VideoItem {
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
}

const statusLabels = {
  idea: { label: 'Idée', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  scripted: { label: 'Scripté', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  filmed: { label: 'Filmé', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  editing: { label: 'Montage', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  published: { label: 'Publié', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
}

const platformIcons = {
  tiktok: '📱',
  instagram: '📸',
  youtube: '▶️',
}

// Données de démo
const demoVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Présentation du challenge 60 jours',
    description: 'Introduction du projet, qui on est, pourquoi on fait ça',
    platform: 'tiktok',
    status: 'idea',
    scheduled_date: null,
    published_date: null,
    views: null,
    likes: null,
    comments: null,
    shares: null,
  },
  {
    id: '2',
    title: 'Visite du bureau à Montreux',
    description: 'Tour du local, setup, ambiance',
    platform: 'tiktok',
    status: 'idea',
    scheduled_date: null,
    published_date: null,
    views: null,
    likes: null,
    comments: null,
    shares: null,
  },
]

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>(demoVideos)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(v => v.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vidéos</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos idées et votre calendrier de contenu
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle vidéo
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          Toutes ({videos.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => {
          const count = videos.filter(v => v.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Video className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Aucune vidéo</h3>
          <p className="text-muted-foreground mt-1">
            Commencez par ajouter votre première idée de vidéo
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ajouter une vidéo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full border ${statusLabels[video.status].color}`}>
                  {statusLabels[video.status].label}
                </span>
                <button className="p-1 hover:bg-muted rounded">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{platformIcons[video.platform]}</span>
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {video.title}
                </h3>
              </div>

              {video.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {video.description}
                </p>
              )}

              {video.status === 'published' && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views?.toLocaleString() || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {video.likes?.toLocaleString() || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {video.comments?.toLocaleString() || 0}
                  </div>
                </div>
              )}

              {video.scheduled_date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
                  <Calendar className="w-4 h-4" />
                  Prévu le {new Date(video.scheduled_date).toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Modal - Simplified for now */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Nouvelle vidéo</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  placeholder="Ex: Présentation du projet"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  placeholder="De quoi parle la vidéo..."
                  rows={3}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Plateforme
                </label>
                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="tiktok">📱 TikTok</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="youtube">▶️ YouTube</option>
                </select>
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
