'use client'

import { useState } from 'react'
import { 
  Plus, 
  CheckSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import { tasks as initialTasks, Task } from '@/lib/data'

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

const groupByWeek = (tasks: Task[]) => {
  const weeks: { [key: number]: Task[] } = {}
  tasks.forEach(task => {
    const week = Math.ceil(task.day / 7)
    if (!weeks[week]) weeks[week] = []
    weeks[week].push(task)
  })
  return weeks
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 2])
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'product' as Task['category'],
    priority: 'medium' as Task['priority'],
    day: 1
  })

  const filteredTasks = tasks.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) return false
    if (filterStatus !== 'all' && task.status !== filterStatus) return false
    return true
  })

  const weeks = groupByWeek(filteredTasks)
  const todoCount = tasks.filter(t => t.status === 'todo').length
  const doneCount = tasks.filter(t => t.status === 'done').length

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'todo' : 'done'
        return { ...task, status: newStatus }
      }
      return task
    }))
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
    setFormData({ title: '', description: '', category: 'product', priority: 'medium', day: 1 })
    setShowModal(true)
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category,
      priority: task.priority,
      day: task.day
    })
    setShowModal(true)
  }

  const saveTask = () => {
    if (!formData.title.trim()) return

    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? {
        ...t,
        ...formData,
        description: formData.description || null
      } : t))
    } else {
      const newTask: Task = {
        id: `new-${Date.now()}`,
        ...formData,
        description: formData.description || null,
        status: 'todo'
      }
      setTasks([...tasks, newTask])
    }
    setShowModal(false)
  }

  const deleteTask = (taskId: string) => {
    if (confirm('Supprimer cette tâche ?')) {
      setTasks(tasks.filter(t => t.id !== taskId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#ffffff' }}>Plan d'action</h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">{tasks.length} tâches sur 60 jours</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-2xl font-bold" style={{ color: '#ffffff' }}>{todoCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>À faire</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-2xl font-bold" style={{ color: '#eab308' }}>{tasks.filter(t => t.status === 'in_progress').length}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>En cours</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>{doneCount}</p>
          <p className="text-xs" style={{ color: '#a3a3a3' }}>Terminées</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm"
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#ffffff' }}
        >
          <option value="all">Toutes catégories</option>
          {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
            <option key={key} value={key}>{emoji} {label}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm"
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#ffffff' }}
        >
          <option value="all">Tous statuts</option>
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      {/* Tasks by Week */}
      <div className="space-y-4">
        {Object.entries(weeks).sort(([a], [b]) => Number(a) - Number(b)).map(([weekNum, weekTasks]) => {
          const week = Number(weekNum)
          const isExpanded = expandedWeeks.includes(week)
          const weekDone = weekTasks.filter(t => t.status === 'done').length
          const startDay = (week - 1) * 7 + 1
          const endDay = Math.min(week * 7, 60)
          
          return (
            <div key={week} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
              <button
                onClick={() => toggleWeek(week)}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold" style={{ color: '#ffffff' }}>Semaine {week}</span>
                  <span className="text-sm" style={{ color: '#737373' }}>J{startDay}-{endDay}</span>
                  <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                    {weekDone}/{weekTasks.length}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" style={{ color: '#737373' }} /> : <ChevronDown className="w-5 h-5" style={{ color: '#737373' }} />}
              </button>
              
              {isExpanded && (
                <div style={{ borderTop: '1px solid #262626' }}>
                  {weekTasks.sort((a, b) => a.day - b.day).map((task) => {
                    const category = categoryConfig[task.category as keyof typeof categoryConfig]
                    const priority = priorityConfig[task.priority]
                    const PriorityIcon = priority.icon

                    return (
                      <div key={task.id} className={`px-4 py-3 ${task.status === 'done' ? 'opacity-60' : ''}`} style={{ borderBottom: '1px solid #262626' }}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0">
                            {task.status === 'done' ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                            ) : (
                              <Circle className="w-5 h-5" style={{ color: '#737373' }} />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-medium" style={{ color: '#737373' }}>J{task.day}</span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${category.color}`}>{category.emoji}</span>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
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
                    onChange={(e) => setFormData({...formData, category: e.target.value as Task['category']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
                      <option key={key} value={key}>{emoji} {label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Priorité</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as Task['priority']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="high">🔴 Urgent</option>
                    <option value="medium">🟡 Normal</option>
                    <option value="low">🟢 Basse</option>
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
              <button onClick={saveTask} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#22c55e', color: '#ffffff' }}>
                {editingTask ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
