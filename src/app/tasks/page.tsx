'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Video,
  Users,
  Package,
  Calendar,
  Settings,
  RefreshCw
} from 'lucide-react'
import { supabase, TaskDB } from '@/lib/supabase'

const CHALLENGE_START_DATE = '2025-02-10'

const categoryConfig = {
  product: { label: 'Produit', emoji: '🧪', color: 'bg-purple-500/10 text-purple-400' },
  supplier: { label: 'Fournisseur', emoji: '📦', color: 'bg-blue-500/10 text-blue-400' },
  content: { label: 'Contenu', emoji: '🎬', color: 'bg-pink-500/10 text-pink-400' },
  admin: { label: 'Admin', emoji: '📋', color: 'bg-gray-500/10 text-gray-400' },
  marketing: { label: 'Marketing', emoji: '📣', color: 'bg-orange-500/10 text-orange-400' },
  legal: { label: 'Légal', emoji: '⚖️', color: 'bg-yellow-500/10 text-yellow-400' },
}

const priorityConfig = {
  high: { label: 'Urgent', color: 'text-red-400', icon: AlertTriangle },
  medium: { label: 'Normal', color: 'text-yellow-400', icon: Clock },
  low: { label: 'Basse', color: 'text-green-400', icon: CheckCircle2 },
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskDB[]>([])
  const [startDate] = useState<string>(CHALLENGE_START_DATE)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskDB | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'product' as TaskDB['category'],
    priority: 'medium' as TaskDB['priority'],
    assignee: 'chris' as TaskDB['assignee'],
    is_video: false,
    day: 1
  })

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

    setTasks(data || [])
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
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const currentDay = getCurrentDay(startDate)

  const filteredTasks = tasks.filter(task => {
    if (filterType === 'chris' && task.assignee !== 'chris' && task.assignee !== 'both') return false
    if (filterType === 'lucas' && task.assignee !== 'lucas' && task.assignee !== 'both') return false
    if (filterType === 'videos' && !task.is_video) return false
    if (filterType === 'product' && task.category !== 'product') return false
    if (filterStatus !== 'all' && task.status !== filterStatus) return false
    return true
  })

  const weeks = groupByWeek(filteredTasks)
  const todoCount = tasks.filter(t => t.status === 'todo').length
  const doneCount = tasks.filter(t => t.status === 'done').length
  const videoCount = tasks.filter(t => t.is_video).length
  const videoDoneCount = tasks.filter(t => t.is_video && t.status === 'done').length

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId)

    if (error) {
      console.error('Error updating task:', error)
      return
    }

    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus as TaskDB['status'] } : task
    ))
  }

  const toggleWeek = (week: number) => {
    if (expandedWeeks.includes(week)) {
      setExpandedWeeks(expandedWeeks.filter(w => w !== week))
    } else {
      setExpandedWeeks([...expandedWeeks, week])
    }
  }

  const openAddModal = () => {
    setEditingTask(null)
    setFormData({ 
      title: '', 
      description: '', 
      category: 'content', 
      priority: 'medium', 
      assignee: 'chris',
      is_video: false,
      day: currentDay 
    })
    setShowModal(true)
  }

  const openEditModal = (task: TaskDB) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category,
      priority: task.priority,
      assignee: task.assignee,
      is_video: task.is_video || false,
      day: task.day
    })
    setShowModal(true)
  }

  const saveTask = async () => {
    if (!formData.title.trim()) return
    setIsSaving(true)

    if (editingTask) {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          priority: formData.priority,
          assignee: formData.assignee,
          is_video: formData.is_video,
          day: formData.day,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingTask.id)

      if (error) {
        console.error('Error updating task:', error)
        setIsSaving(false)
        return
      }
    } else {
      const { error } = await supabase
        .from('tasks')
        .insert({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          priority: formData.priority,
          assignee: formData.assignee,
          is_video: formData.is_video,
          day: formData.day,
          status: 'todo'
        })

      if (error) {
        console.error('Error creating task:', error)
        setIsSaving(false)
        return
      }
    }

    await fetchTasks()
    setIsSaving(false)
    setShowModal(false)
  }

  const deleteTask = async (taskId: string) => {
    if (!confirm('Supprimer cette tâche ?')) return

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Error deleting task:', error)
      return
    }

    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const resetProgress = async () => {
    if (!confirm('Remettre toutes les tâches à zéro ?')) return

    const { error } = await supabase
      .from('tasks')
      .update({ status: 'todo', updated_at: new Date().toISOString() })
      .neq('status', 'placeholder')

    if (error) {
      console.error('Error resetting tasks:', error)
      return
    }

    await fetchTasks()
  }

  const weekLabels: { [key: number]: string } = {
    1: 'Teasing & Concept',
    2: 'Sélection Fournisseurs',
    3: 'Formulation & Shopify',
    4: 'Contenu Éducatif',
    5: 'Pré-lancement',
    6: 'Production & Expédition',
    7: 'Lancement Public',
    8: 'Scale & Optimisation',
    9: 'Bilan & Suite'
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
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#ffffff' }}>
            🍑 Boost ton Mood
          </h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">
            Jour {currentDay}/60 • {formatDate(getDateForDay(currentDay, startDate))}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchTasks()}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#262626' }}
            title="Rafraîchir"
          >
            <RefreshCw className="w-5 h-5" style={{ color: '#a3a3a3' }} />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#262626' }}
          >
            <Settings className="w-5 h-5" style={{ color: '#a3a3a3' }} />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#ffffff' }}>Progression globale</span>
          <span className="text-sm" style={{ color: '#22c55e' }}>{tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
          <div 
            className="h-full rounded-full transition-all duration-500" 
            style={{ 
              width: `${tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0}%`,
              backgroundColor: '#22c55e'
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs" style={{ color: '#737373' }}>
          <span>{doneCount}/{tasks.length} tâches</span>
          <span>{videoDoneCount}/{videoCount} vidéos</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-xl font-bold" style={{ color: '#ffffff' }}>{todoCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>À faire</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-xl font-bold" style={{ color: '#22c55e' }}>{doneCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Terminées</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-xl font-bold" style={{ color: '#ec4899' }}>{videoCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Vidéos</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-xl font-bold" style={{ color: '#f97316' }}>{currentDay}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Jour</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            filterType === 'all' ? 'ring-2 ring-green-500' : ''
          }`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterType === 'all' ? '#22c55e' : '#a3a3a3' }}
        >
          <Users className="w-4 h-4" />
          Tout
        </button>
        <button
          onClick={() => setFilterType('chris')}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            filterType === 'chris' ? 'ring-2 ring-cyan-500' : ''
          }`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterType === 'chris' ? '#06b6d4' : '#a3a3a3' }}
        >
          🎬 Chris
        </button>
        <button
          onClick={() => setFilterType('lucas')}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            filterType === 'lucas' ? 'ring-2 ring-emerald-500' : ''
          }`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterType === 'lucas' ? '#10b981' : '#a3a3a3' }}
        >
          📊 Lucas
        </button>
        <button
          onClick={() => setFilterType('videos')}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            filterType === 'videos' ? 'ring-2 ring-pink-500' : ''
          }`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterType === 'videos' ? '#ec4899' : '#a3a3a3' }}
        >
          <Video className="w-4 h-4" />
          Vidéos
        </button>
        <button
          onClick={() => setFilterType('product')}
          className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            filterType === 'product' ? 'ring-2 ring-purple-500' : ''
          }`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterType === 'product' ? '#a855f7' : '#a3a3a3' }}
        >
          <Package className="w-4 h-4" />
          Produit
        </button>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm ml-auto"
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#ffffff' }}
        >
          <option value="all">Tous statuts</option>
          <option value="todo">À faire</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      {/* Tasks by Week */}
      <div className="space-y-4">
        {Object.entries(weeks).sort(([a], [b]) => Number(a) - Number(b)).map(([weekNum, weekTasks]) => {
          const week = Number(weekNum)
          const isExpanded = expandedWeeks.includes(week)
          const weekDone = weekTasks.filter(t => t.status === 'done').length
          const weekVideos = weekTasks.filter(t => t.is_video).length
          const startDay = (week - 1) * 7 + 1
          const endDay = Math.min(week * 7, 60)
          const isCurrentWeek = currentDay >= startDay && currentDay <= endDay
          const weekStartDate = formatDate(getDateForDay(startDay, startDate))
          const weekEndDate = formatDate(getDateForDay(endDay, startDate))
          
          return (
            <div 
              key={week} 
              className={`rounded-xl overflow-hidden ${isCurrentWeek ? 'ring-2 ring-green-500/50' : ''}`} 
              style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
            >
              <button
                onClick={() => toggleWeek(week)}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {isCurrentWeek && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    <span className="text-lg font-semibold" style={{ color: '#ffffff' }}>S{week}</span>
                  </div>
                  <span className="text-sm hidden sm:inline" style={{ color: '#22c55e' }}>{weekLabels[week] || ''}</span>
                  <span className="text-xs" style={{ color: '#737373' }}>{weekStartDate} → {weekEndDate}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                      {weekDone}/{weekTasks.length}
                    </span>
                    {weekVideos > 0 && (
                      <span className="px-2 py-0.5 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                        <Video className="w-3 h-3" />
                        {weekVideos}
                      </span>
                    )}
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" style={{ color: '#737373' }} /> : <ChevronDown className="w-5 h-5" style={{ color: '#737373' }} />}
              </button>
              
              {isExpanded && (
                <div style={{ borderTop: '1px solid #262626' }}>
                  {weekTasks.sort((a, b) => a.day - b.day).map((task) => {
                    const category = categoryConfig[task.category as keyof typeof categoryConfig]
                    const priority = priorityConfig[task.priority]
                    const assignee = assigneeConfig[task.assignee]
                    const PriorityIcon = priority.icon
                    const taskDate = formatDate(getDateForDay(task.day, startDate))
                    const isToday = task.day === currentDay
                    const isPast = task.day < currentDay && task.status !== 'done'

                    return (
                      <div 
                        key={task.id} 
                        className={`px-4 py-3 ${task.status === 'done' ? 'opacity-60' : ''} ${isToday ? 'bg-green-500/5' : ''} ${isPast ? 'bg-red-500/5' : ''}`} 
                        style={{ borderBottom: '1px solid #262626' }}
                      >
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleTaskStatus(task.id, task.status)} className="mt-0.5 flex-shrink-0">
                            {task.status === 'done' ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                            ) : (
                              <Circle className="w-5 h-5" style={{ color: isPast ? '#ef4444' : '#737373' }} />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isToday ? 'bg-green-500/20 text-green-400' : ''}`} style={{ color: isToday ? undefined : '#737373' }}>
                                J{task.day} • {taskDate}
                              </span>
                              {task.is_video && (
                                <span className="px-1.5 py-0.5 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                                  <Video className="w-3 h-3" />
                                </span>
                              )}
                              {category && <span className={`px-1.5 py-0.5 rounded text-xs ${category.color}`}>{category.emoji}</span>}
                              {assignee && <span className={`px-1.5 py-0.5 rounded text-xs ${assignee.color}`}>{assignee.emoji}</span>}
                              <PriorityIcon className={`w-3 h-3 ${priority.color}`} />
                            </div>
                            <h3 className={`font-medium text-sm ${task.status === 'done' ? 'line-through' : ''}`} style={{ color: '#ffffff' }}>{task.title}</h3>
                            {task.description && <p className="text-xs mt-1 line-clamp-2" style={{ color: '#737373' }}>{task.description}</p>}
                          </div>

                          <div className="flex items-center gap-1">
                            <button onClick={() => openEditModal(task)} className="p-1.5 rounded" style={{ backgroundColor: '#262626' }}>
                              <Edit2 className="w-3.5 h-3.5" style={{ color: '#a3a3a3' }} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="p-1.5 rounded" style={{ backgroundColor: '#262626' }}>
                              <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
                            </button>
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

      {tasks.length === 0 && (
        <div className="text-center py-12 rounded-xl" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p style={{ color: '#a3a3a3' }}>Aucune tâche trouvée</p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
          >
            Créer la première tâche
          </button>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md rounded-xl p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: '#ffffff' }}>{editingTask ? 'Modifier' : 'Ajouter'} une tâche</h2>
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
                  placeholder="Titre de la tâche"
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
                  placeholder="Description optionnelle"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as TaskDB['category']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
                      <option key={key} value={key}>{emoji} {label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Assigné à</label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value as TaskDB['assignee']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="chris">🎬 Chris</option>
                    <option value="lucas">📊 Lucas</option>
                    <option value="both">👥 Les deux</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Priorité</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as TaskDB['priority']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="high">🔴 Urgent</option>
                    <option value="medium">🟡 Normal</option>
                    <option value="low">🟢 Basse</option>
                  </select>
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
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_video}
                    onChange={(e) => setFormData({...formData, is_video: e.target.checked})}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm flex items-center gap-2" style={{ color: '#a3a3a3' }}>
                    <Video className="w-4 h-4" style={{ color: '#ec4899' }} />
                    C'est une vidéo à tourner
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>Annuler</button>
              <button 
                onClick={saveTask} 
                disabled={isSaving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50" 
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
              >
                {isSaving ? 'Enregistrement...' : editingTask ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#ffffff' }}>
                <Settings className="w-5 h-5" />
                Paramètres
              </h2>
              <button onClick={() => setShowSettings(false)}><X className="w-5 h-5" style={{ color: '#737373' }} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 flex items-center gap-2" style={{ color: '#a3a3a3' }}>
                  <Calendar className="w-4 h-4" />
                  Date de début du challenge (Jour 1)
                </label>
                <p className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}>
                  {startDate}
                </p>
                <p className="text-xs mt-1" style={{ color: '#737373' }}>
                  Jour actuel: {currentDay} • {formatDate(getDateForDay(currentDay, startDate))}
                </p>
              </div>

              <div className="pt-4" style={{ borderTop: '1px solid #262626' }}>
                <button
                  onClick={resetProgress}
                  className="w-full px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Remettre la progression à zéro
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowSettings(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#22c55e', color: '#ffffff' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
