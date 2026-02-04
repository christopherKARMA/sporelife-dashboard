'use client'

import { useState } from 'react'
import { 
  Plus, 
  Video, 
  ChevronDown,
  ChevronUp,
  Star,
  Edit2,
  Trash2,
  X
} from 'lucide-react'
import { videos as initialVideos, Video as VideoType } from '@/lib/data'

const statusLabels = {
  idea: { label: 'Idée', color: 'bg-gray-500/10 text-gray-400' },
  scripted: { label: 'Scripté', color: 'bg-blue-500/10 text-blue-400' },
  filmed: { label: 'Filmé', color: 'bg-purple-500/10 text-purple-400' },
  editing: { label: 'Montage', color: 'bg-yellow-500/10 text-yellow-400' },
  published: { label: 'Publié', color: 'bg-green-500/10 text-green-400' },
}

const platformIcons = { tiktok: '📱', instagram: '📸', youtube: '▶️' }

const groupByWeek = (videos: VideoType[]) => {
  const weeks: { [key: number]: VideoType[] } = {}
  videos.forEach(video => {
    const week = Math.ceil(video.day / 7)
    if (!weeks[week]) weeks[week] = []
    weeks[week].push(video)
  })
  return weeks
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoType[]>(initialVideos)
  const [filter, setFilter] = useState<string>('all')
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 2])
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'tiktok' as VideoType['platform'],
    day: 1,
    type: 'main' as VideoType['type']
  })

  const filteredVideos = filter === 'all' ? videos : videos.filter(v => v.status === filter)
  const weeks = groupByWeek(filteredVideos)

  const toggleWeek = (week: number) => {
    setExpandedWeeks(expandedWeeks.includes(week) ? expandedWeeks.filter(w => w !== week) : [...expandedWeeks, week])
  }

  const updateVideoStatus = (videoId: string, newStatus: VideoType['status']) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, status: newStatus } : v))
  }

  const openAddModal = () => {
    setEditingVideo(null)
    setFormData({ title: '', description: '', platform: 'tiktok', day: 1, type: 'main' })
    setShowModal(true)
  }

  const openEditModal = (video: VideoType) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description || '',
      platform: video.platform,
      day: video.day,
      type: video.type
    })
    setShowModal(true)
  }

  const saveVideo = () => {
    if (!formData.title.trim()) return
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...v, ...formData, description: formData.description || null } : v))
    } else {
      const newVideo: VideoType = {
        id: `new-${Date.now()}`,
        ...formData,
        description: formData.description || null,
        status: 'idea'
      }
      setVideos([...videos, newVideo])
    }
    setShowModal(false)
  }

  const deleteVideo = (videoId: string) => {
    if (confirm('Supprimer cette vidéo ?')) {
      setVideos(videos.filter(v => v.id !== videoId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#ffffff' }}>Vidéos</h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">{videos.length} vidéos planifiées</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#22c55e', color: '#ffffff' }}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(statusLabels).map(([key, { label }]) => {
          const count = videos.filter(v => v.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? 'all' : key)}
              className="rounded-xl p-2 text-center transition-all"
              style={{ backgroundColor: '#171717', border: filter === key ? '1px solid #22c55e' : '1px solid #262626' }}
            >
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>{count}</p>
              <p className="text-xs truncate" style={{ color: '#a3a3a3' }}>{label}</p>
            </button>
          )
        })}
      </div>

      {/* Videos by Week */}
      <div className="space-y-4">
        {Object.entries(weeks).sort(([a], [b]) => Number(a) - Number(b)).map(([weekNum, weekVideos]) => {
          const week = Number(weekNum)
          const isExpanded = expandedWeeks.includes(week)
          const startDay = (week - 1) * 7 + 1
          const endDay = Math.min(week * 7, 60)
          
          return (
            <div key={week} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
              <button onClick={() => toggleWeek(week)} className="w-full px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold" style={{ color: '#ffffff' }}>Semaine {week}</span>
                  <span className="text-sm" style={{ color: '#737373' }}>J{startDay}-{endDay}</span>
                  <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                    {weekVideos.length} vidéos
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" style={{ color: '#737373' }} /> : <ChevronDown className="w-5 h-5" style={{ color: '#737373' }} />}
              </button>
              
              {isExpanded && (
                <div style={{ borderTop: '1px solid #262626' }}>
                  {weekVideos.sort((a, b) => a.day - b.day || (a.type === 'main' ? -1 : 1)).map((video) => (
                    <div key={video.id} className="px-4 py-3" style={{ borderBottom: '1px solid #262626' }}>
                      <div className="flex items-start gap-3">
                        <span className="text-xl mt-1">{platformIcons[video.platform]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-medium" style={{ color: '#737373' }}>J{video.day}</span>
                            {video.type === 'main' && (
                              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                                <Star className="w-3 h-3" /> Principal
                              </span>
                            )}
                            <select
                              value={video.status}
                              onChange={(e) => updateVideoStatus(video.id, e.target.value as VideoType['status'])}
                              className={`px-2 py-0.5 text-xs rounded ${statusLabels[video.status].color}`}
                              style={{ backgroundColor: 'transparent', border: 'none' }}
                            >
                              {Object.entries(statusLabels).map(([key, { label }]) => (
                                <option key={key} value={key} style={{ backgroundColor: '#171717', color: '#ffffff' }}>{label}</option>
                              ))}
                            </select>
                          </div>
                          <h3 className="font-medium text-sm" style={{ color: '#ffffff' }}>{video.title}</h3>
                          {video.description && <p className="text-xs mt-1 line-clamp-2" style={{ color: '#737373' }}>{video.description}</p>}
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEditModal(video)} className="p-1.5 rounded" style={{ backgroundColor: '#262626' }}>
                            <Edit2 className="w-3.5 h-3.5" style={{ color: '#a3a3a3' }} />
                          </button>
                          <button onClick={() => deleteVideo(video.id)} className="p-1.5 rounded" style={{ backgroundColor: '#262626' }}>
                            <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: '#ffffff' }}>{editingVideo ? 'Modifier' : 'Ajouter'} une vidéo</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: '#737373' }} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Plateforme</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value as VideoType['platform']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="tiktok">📱 TikTok</option>
                    <option value="instagram">📸 Instagram</option>
                    <option value="youtube">▶️ YouTube</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as VideoType['type']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="main">⭐ Principal</option>
                    <option value="bonus">➕ Bonus</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Jour (1-60)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={formData.day}
                  onChange={(e) => setFormData({...formData, day: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>Annuler</button>
              <button onClick={saveVideo} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#22c55e', color: '#ffffff' }}>
                {editingVideo ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
