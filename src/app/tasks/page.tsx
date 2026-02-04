'use client'

import { useState } from 'react'
import { 
  Plus, 
  CheckSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  MoreVertical,
  Filter,
  ChevronDown,
  ChevronUp
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

// Grouper les tâches par semaine
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Plan d'action</h1>
        <p className="text-muted-foreground mt-1">
          {tasks.length} tâches sur 60 jours
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        <div className="bg-card border border-border rounded-xl p-3 lg:p-4 text-center">
          <p className="text-2xl lg:text-3xl font-bold text-foreground">{todoCount}</p>
          <p className="text-xs lg:text-sm text-muted-foreground">À faire</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 lg:p-4 text-center">
          <p className="text-2xl lg:text-3xl font-bold text-yellow-400">{tasks.filter(t => t.status === 'in_progress').length}</p>
          <p className="text-xs lg:text-sm text-muted-foreground">En cours</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 lg:p-4 text-center">
          <p className="text-2xl lg:text-3xl font-bold text-green-400">{doneCount}</p>
          <p className="text-xs lg:text-sm text-muted-foreground">Terminées</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Toutes catégories</option>
          {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
            <option key={key} value={key}>{emoji} {label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Tous les statuts</option>
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
                    {weekDone}/{weekTasks.length}
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
                  {weekTasks.sort((a, b) => a.day - b.day).map((task) => {
                    const category = categoryConfig[task.category as keyof typeof categoryConfig]
                    const priority = priorityConfig[task.priority]
                    const PriorityIcon = priority.icon

                    return (
                      <div
                        key={task.id}
                        className={`px-4 py-3 hover:bg-muted/30 transition-colors ${
                          task.status === 'done' ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {task.status === 'done' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground font-medium">
                                J{task.day}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${category.color}`}>
                                {category.emoji}
                              </span>
                              <PriorityIcon className={`w-3 h-3 ${priority.color}`} />
                            </div>

                            <h3 className={`font-medium text-sm lg:text-base text-foreground ${
                              task.status === 'done' ? 'line-through' : ''
                            }`}>
                              {task.title}
                            </h3>

                            {task.description && (
                              <p className="text-xs lg:text-sm text-muted-foreground mt-1 line-clamp-2">
                                {task.description}
                              </p>
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
    </div>
  )
}
