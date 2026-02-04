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
  Filter,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react'
import { videos as initialVideos, Video as VideoType } from '@/lib/data'

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

// Grouper par semaine
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

  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(v => v.status === filter)

  const weeks = groupByWeek(filteredVideos)

  const toggleWeek = (week: number) => {
    if (expandedWeeks.includes(week)) {
      setExpandedWeeks(expandedWeeks.filter(w => w !== week))
    } else {
      setExpandedWeeks([...expandedWeeks, week])
    }
  }

  const updateVideoStatus = (videoId: string, newStatus: VideoType['status']) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, status: newStatus } : v))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Vidéos</h1>
        <p className="text-muted-foreground mt-1">
          {videos.length} vidéos planifiées sur 60 jours
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2 lg:gap-4">
        {Object.entries(statusLabels).map(([key, { label }]) => {
          const count = videos.filter(v => v.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? 'all' : key)}
              className={`bg-card border rounded-xl p-2 lg:p-4 text-center transition-colors ${
                filter === key ? 'border-primary' : 'border-border'
              }`}
            >
              <p className="text-xl lg:text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground truncate">{label}</p>
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
          const mainVideos = weekVideos.filter(v => v.type === 'main').length
          
          return (
            <div key={week} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleWeek(week)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    Semaine {week}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Jour {startDay}-{endDay}
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {weekVideos.length} vidéos
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              {isExpanded && (
                <div className="border-t border-border divide-y divide-border">
                  {weekVideos.sort((a, b) => a.day - b.day || (a.type === 'main' ? -1 : 1)).map((video) => (
                    <div
                      key={video.id}
                      className="px-4 py-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <span className="text-xl">{platformIcons[video.platform]}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground font-medium">
                              J{video.day}
                            </span>
                            {video.type === 'main' && (
                              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-yellow-500/10 text-yellow-400 rounded text-xs">
                                <Star className="w-3 h-3" /> Principal
                              </span>
                            )}
                            <select
                              value={video.status}
                              onChange={(e) => updateVideoStatus(video.id, e.target.value as VideoType['status'])}
                              className={`px-2 py-0.5 text-xs rounded border ${statusLabels[video.status].color} bg-transparent cursor-pointer`}
                            >
                              {Object.entries(statusLabels).map(([key, { label }]) => (
                                <option key={key} value={key} className="bg-card text-foreground">
                                  {label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <h3 className="font-medium text-sm lg:text-base text-foreground">
                            {video.title}
                          </h3>

                          {video.description && (
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1 line-clamp-2">
                              {video.description}
                            </p>
                          )}
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
    </div>
  )
}
