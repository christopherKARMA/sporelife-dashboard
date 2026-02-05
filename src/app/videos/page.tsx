'use client'

import { useState, useEffect } from 'react'
import { 
  Video, 
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Calendar,
  RefreshCw
} from 'lucide-react'
import { supabase, TaskDB } from '@/lib/supabase'

const CHALLENGE_START_DATE = '2025-02-10'

const getDateForDay = (day: number, startDate: string): Date => {
  const start = new Date(startDate)
  const result = new Date(start)
  result.setDate(result.getDate() + day - 1)
  return result
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })
}

const getCurrentDay = (startDate: string): number => {
  const start = new Date(startDate)
  const today = new Date()
  const diffTime = today.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, Math.min(60, diffDays))
}

const assigneeConfig = {
  chris: { label: 'Chris', emoji: '🎬', color: 'bg-cyan-500/10 text-cyan-400' },
  lucas: { label: 'Lucas', emoji: '📊', color: 'bg-emerald-500/10 text-emerald-400' },
  both: { label: 'Tous', emoji: '👥', color: 'bg-violet-500/10 text-violet-400' },
}

const groupByWeek = (tasks: TaskDB[]) => {
  const weeks: { [key: number]: TaskDB[] } = {}
  tasks.forEach(task => {
    const week = Math.ceil(task.day / 7)
    if (!weeks[week]) weeks[week] = []
    weeks[week].push(task)
  })
  return weeks
}

export default function VideosPage() {
  const [allTasks, setAllTasks] = useState<TaskDB[]>([])
  const [startDate] = useState<string>(CHALLENGE_START_DATE)
  const [filter, setFilter] = useState<string>('all')
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('day', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
      return
    }

    setAllTasks(data || [])
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await fetchTasks()
      
      // Auto-expand current week
      const currentDay = getCurrentDay(CHALLENGE_START_DATE)
      const currentWeek = Math.ceil(currentDay / 7)
      setExpandedWeeks([currentWeek, currentWeek + 1])
      
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('videos-tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const currentDay = getCurrentDay(startDate)

  // Filtrer seulement les tâches vidéo
  const videoTasks = allTasks.filter(t => t.is_video)
  
  const filteredVideos = videoTasks.filter(task => {
    if (filter === 'todo') return task.status !== 'done'
    if (filter === 'done') return task.status === 'done'
    if (filter === 'chris') return task.assignee === 'chris' || task.assignee === 'both'
    if (filter === 'lucas') return task.assignee === 'lucas' || task.assignee === 'both'
    return true
  })

  const weeks = groupByWeek(filteredVideos)

  const toggleWeek = (week: number) => {
    setExpandedWeeks(expandedWeeks.includes(week) ? expandedWeeks.filter(w => w !== week) : [...expandedWeeks, week])
  }

  const toggleVideoStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId)

    if (error) {
      console.error('Error updating video status:', error)
      return
    }

    setAllTasks(allTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus as TaskDB['status'] } : task
    ))
  }

  const doneCount = videoTasks.filter(t => t.status === 'done').length
  const todoCount = videoTasks.filter(t => t.status !== 'done').length
  const todayVideos = videoTasks.filter(t => t.day === currentDay)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
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
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3" style={{ color: '#ffffff' }}>
            <Video className="w-8 h-8 text-pink-500" />
            Vidéos TikTok
          </h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">{videoTasks.length} vidéos planifiées sur 60 jours</p>
        </div>
        <button
          onClick={() => fetchTasks()}
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#262626' }}
          title="Rafraîchir"
        >
          <RefreshCw className="w-5 h-5" style={{ color: '#a3a3a3' }} />
        </button>
      </div>

      {/* Progress */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#ffffff' }}>Progression vidéos</span>
          <span className="text-sm" style={{ color: '#ec4899' }}>{videoTasks.length > 0 ? Math.round((doneCount / videoTasks.length) * 100) : 0}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
          <div 
            className="h-full rounded-full transition-all duration-500" 
            style={{ 
              width: `${videoTasks.length > 0 ? (doneCount / videoTasks.length) * 100 : 0}%`,
              backgroundColor: '#ec4899'
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs" style={{ color: '#737373' }}>
          <span>{doneCount} filmées</span>
          <span>{todoCount} restantes</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-xl p-3 text-center transition-all ${filter === 'all' ? 'ring-2 ring-pink-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
        >
          <p className="text-xl font-bold" style={{ color: '#ec4899' }}>{videoTasks.length}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Total</p>
        </button>
        <button
          onClick={() => setFilter('todo')}
          className={`rounded-xl p-3 text-center transition-all ${filter === 'todo' ? 'ring-2 ring-orange-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
        >
          <p className="text-xl font-bold" style={{ color: '#f97316' }}>{todoCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>À filmer</p>
        </button>
        <button
          onClick={() => setFilter('done')}
          className={`rounded-xl p-3 text-center transition-all ${filter === 'done' ? 'ring-2 ring-green-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
        >
          <p className="text-xl font-bold" style={{ color: '#22c55e' }}>{doneCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Filmées</p>
        </button>
        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
        >
          <p className="text-xl font-bold" style={{ color: '#ffffff' }}>{todayVideos.length}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Aujourd'hui</p>
        </div>
      </div>

      {/* Filter by assignee */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-2 rounded-lg text-sm ${filter === 'all' ? 'ring-2 ring-pink-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#a3a3a3' }}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('chris')}
          className={`px-3 py-2 rounded-lg text-sm ${filter === 'chris' ? 'ring-2 ring-cyan-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#a3a3a3' }}
        >
          🎬 Chris
        </button>
        <button
          onClick={() => setFilter('lucas')}
          className={`px-3 py-2 rounded-lg text-sm ${filter === 'lucas' ? 'ring-2 ring-emerald-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#a3a3a3' }}
        >
          📊 Lucas
        </button>
      </div>

      {/* Today's videos */}
      {todayVideos.length > 0 && (
        <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: '#ec4899' }}>
            🎬 Vidéos du jour (J{currentDay})
          </h2>
          <div className="space-y-2">
            {todayVideos.map(video => (
              <div key={video.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#171717' }}>
                <button onClick={() => toggleVideoStatus(video.id, video.status)}>
                  {video.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                  ) : (
                    <Circle className="w-5 h-5" style={{ color: '#737373' }} />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${video.status === 'done' ? 'line-through opacity-60' : ''}`} style={{ color: '#ffffff' }}>
                    {video.title}
                  </p>
                  {video.description && (
                    <p className="text-xs mt-1" style={{ color: '#737373' }}>{video.description}</p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded text-xs ${assigneeConfig[video.assignee].color}`}>
                  {assigneeConfig[video.assignee].emoji}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos by Week */}
      <div className="space-y-4">
        {Object.entries(weeks).sort(([a], [b]) => Number(a) - Number(b)).map(([weekNum, weekVideos]) => {
          const week = Number(weekNum)
          const isExpanded = expandedWeeks.includes(week)
          const weekDone = weekVideos.filter(v => v.status === 'done').length
          const startDay = (week - 1) * 7 + 1
          const endDay = Math.min(week * 7, 60)
          const isCurrentWeek = currentDay >= startDay && currentDay <= endDay
          const weekStartDate = formatDate(getDateForDay(startDay, startDate))
          const weekEndDate = formatDate(getDateForDay(endDay, startDate))
          
          return (
            <div 
              key={week} 
              className={`rounded-xl overflow-hidden ${isCurrentWeek ? 'ring-2 ring-pink-500/50' : ''}`}
              style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
            >
              <button onClick={() => toggleWeek(week)} className="w-full px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {isCurrentWeek && <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />}
                    <span className="text-lg font-semibold" style={{ color: '#ffffff' }}>Semaine {week}</span>
                  </div>
                  <span className="text-xs" style={{ color: '#737373' }}>{weekStartDate} → {weekEndDate}</span>
                  <span className="px-2 py-0.5 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                    <Video className="w-3 h-3" />
                    {weekDone}/{weekVideos.length}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" style={{ color: '#737373' }} /> : <ChevronDown className="w-5 h-5" style={{ color: '#737373' }} />}
              </button>
              
              {isExpanded && (
                <div style={{ borderTop: '1px solid #262626' }}>
                  {weekVideos.sort((a, b) => a.day - b.day).map((video) => {
                    const assignee = assigneeConfig[video.assignee]
                    const taskDate = formatDate(getDateForDay(video.day, startDate))
                    const isToday = video.day === currentDay
                    const isPast = video.day < currentDay && video.status !== 'done'

                    return (
                      <div 
                        key={video.id} 
                        className={`px-4 py-3 ${video.status === 'done' ? 'opacity-60' : ''} ${isToday ? 'bg-pink-500/5' : ''} ${isPast ? 'bg-red-500/5' : ''}`}
                        style={{ borderBottom: '1px solid #262626' }}
                      >
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleVideoStatus(video.id, video.status)} className="mt-0.5 flex-shrink-0">
                            {video.status === 'done' ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                            ) : (
                              <Circle className="w-5 h-5" style={{ color: isPast ? '#ef4444' : '#737373' }} />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-1 ${isToday ? 'bg-pink-500/20 text-pink-400' : ''}`} style={{ color: isToday ? undefined : '#737373' }}>
                                <Calendar className="w-3 h-3" />
                                J{video.day} • {taskDate}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${assignee.color}`}>
                                {assignee.emoji} {assignee.label}
                              </span>
                            </div>
                            <h3 className={`font-medium text-sm ${video.status === 'done' ? 'line-through' : ''}`} style={{ color: '#ffffff' }}>
                              {video.title}
                            </h3>
                            {video.description && (
                              <p className="text-xs mt-1 line-clamp-2" style={{ color: '#737373' }}>{video.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {videoTasks.length === 0 && (
        <div className="text-center py-12 rounded-xl" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <Video className="w-12 h-12 mx-auto mb-4" style={{ color: '#737373' }} />
          <p style={{ color: '#a3a3a3' }}>Aucune vidéo planifiée</p>
          <p className="text-xs mt-2" style={{ color: '#737373' }}>
            Ajoutez des tâches avec l'option "vidéo" dans la page Tâches
          </p>
        </div>
      )}
    </div>
  )
}
