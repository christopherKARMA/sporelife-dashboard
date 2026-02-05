'use client'

import { useEffect, useState } from 'react'
import { 
  Video, 
  CheckSquare, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  Play,
  Clock,
  Zap,
  Calendar
} from 'lucide-react'
import { tasks as initialTasks, Task, CHALLENGE_START_DATE } from '@/lib/data'

const getDateForDay = (day: number, startDate: string): Date => {
  const start = new Date(startDate)
  const result = new Date(start)
  result.setDate(result.getDate() + day - 1)
  return result
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  })
}

const getCurrentDay = (startDate: string): number => {
  const start = new Date(startDate)
  const today = new Date()
  const diffTime = today.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, Math.min(60, diffDays))
}

const categoryLabels: Record<string, string> = {
  product: '🧪 Produit',
  supplier: '📦 Fournisseur',
  content: '🎬 Contenu',
  admin: '📋 Admin',
  marketing: '📣 Marketing',
  legal: '⚖️ Légal',
}

const assigneeEmoji: Record<string, string> = {
  chris: '🎬',
  lucas: '📊',
  both: '👥',
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/10 text-red-500 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-500 border-green-500/20',
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [startDate, setStartDate] = useState<string>(CHALLENGE_START_DATE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedTasks = localStorage.getItem('sporelife-tasks')
    const savedStartDate = localStorage.getItem('sporelife-start-date')
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (e) {
        console.error('Error loading tasks:', e)
      }
    }
    
    if (savedStartDate) {
      setStartDate(savedStartDate)
    }
    
    setIsLoaded(true)
  }, [])

  const currentDay = getCurrentDay(startDate)
  const currentWeek = Math.ceil(currentDay / 7)
  
  const doneCount = tasks.filter(t => t.status === 'done').length
  const videoCount = tasks.filter(t => t.isVideo).length
  const videoDoneCount = tasks.filter(t => t.isVideo && t.status === 'done').length
  const chrisCount = tasks.filter(t => (t.assignee === 'chris' || t.assignee === 'both') && t.status !== 'done').length
  const lucasCount = tasks.filter(t => (t.assignee === 'lucas' || t.assignee === 'both') && t.status !== 'done').length

  const todayTasks = tasks.filter(t => t.day === currentDay)
  const upcomingTasks = tasks
    .filter(t => t.day >= currentDay && t.day <= currentDay + 3 && t.status !== 'done')
    .sort((a, b) => a.day - b.day)
    .slice(0, 6)

  const overdueTasks = tasks.filter(t => t.day < currentDay && t.status !== 'done')

  const stats = [
    {
      name: 'Progression',
      value: `${Math.round((doneCount / tasks.length) * 100)}%`,
      subtext: `${doneCount}/${tasks.length} tâches`,
      icon: CheckSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Vidéos',
      value: `${videoDoneCount}`,
      subtext: `sur ${videoCount} prévues`,
      icon: Video,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      name: 'Jour actuel',
      value: `J${currentDay}`,
      subtext: `Semaine ${currentWeek}`,
      icon: Calendar,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      name: 'En retard',
      value: `${overdueTasks.length}`,
      subtext: 'tâches à rattraper',
      icon: Clock,
      color: overdueTasks.length > 0 ? 'text-red-500' : 'text-green-500',
      bgColor: overdueTasks.length > 0 ? 'bg-red-500/10' : 'bg-green-500/10',
    },
  ]

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p style={{ color: '#a3a3a3' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ 
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
        border: '1px solid rgba(251, 146, 60, 0.2)'
      }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#ffffff' }}>
              🍑 Boost ton Mood
            </h1>
            <p style={{ color: '#a3a3a3' }} className="mt-2">
              Challenge 60 jours • Ice Tea Pêche-Mangue aux Champignons
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm" style={{ color: '#22c55e' }}>
                  Jour {currentDay} • {formatDate(getDateForDay(currentDay, startDate))}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold" style={{ color: '#f97316' }}>{currentDay}</div>
            <div className="text-sm" style={{ color: '#a3a3a3' }}>/60 jours</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: '#a3a3a3' }}>Progression du challenge</span>
            <span style={{ color: '#22c55e' }}>{Math.round((currentDay / 60) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${(currentDay / 60) * 100}%`,
                background: 'linear-gradient(90deg, #f97316, #ec4899)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl p-4"
            style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: '#a3a3a3' }}>{stat.subtext}</p>
              <p className="text-sm font-medium mt-1" style={{ color: '#737373' }}>{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <div>
              <p className="font-semibold" style={{ color: '#ffffff' }}>Chris</p>
              <p className="text-sm" style={{ color: '#a3a3a3' }}>{chrisCount} tâches restantes</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold" style={{ color: '#ffffff' }}>Lucas</p>
              <p className="text-sm" style={{ color: '#a3a3a3' }}>{lucasCount} tâches restantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tâches du jour */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#ffffff' }}>
              <Zap className="w-5 h-5 text-yellow-500" />
              Aujourd'hui (J{currentDay})
            </h2>
            <span className="text-sm px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
              {todayTasks.filter(t => t.status === 'done').length}/{todayTasks.length}
            </span>
          </div>
          
          {todayTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p style={{ color: '#737373' }}>Aucune tâche prévue aujourd'hui</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${task.status === 'done' ? 'opacity-60' : ''}`}
                  style={{ backgroundColor: '#262626' }}
                >
                  <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-green-500' : 'bg-orange-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through' : ''}`} style={{ color: '#ffffff' }}>
                      {task.isVideo && '🎬 '}{task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: '#737373' }}>
                        {categoryLabels[task.category]} • {assigneeEmoji[task.assignee]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <a href="/tasks" className="block mt-4 text-center text-sm py-2 rounded-lg" style={{ backgroundColor: '#262626', color: '#22c55e' }}>
            Voir toutes les tâches →
          </a>
        </div>

        {/* Prochaines tâches */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#ffffff' }}>
              <Clock className="w-5 h-5 text-blue-500" />
              À venir
            </h2>
          </div>
          
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: '#262626' }}
              >
                <div className="text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: '#171717', color: '#a3a3a3' }}>
                  J{task.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#ffffff' }}>
                    {task.isVideo && '🎬 '}{task.title}
                  </p>
                  <span className="text-xs" style={{ color: '#737373' }}>
                    {assigneeEmoji[task.assignee]} {task.assignee === 'both' ? 'Chris & Lucas' : task.assignee === 'chris' ? 'Chris' : 'Lucas'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>
                  {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overdue tasks warning */}
      {overdueTasks.length > 0 && (
        <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-semibold" style={{ color: '#ef4444' }}>
              {overdueTasks.length} tâche{overdueTasks.length > 1 ? 's' : ''} en retard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {overdueTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              >
                <span className="text-xs font-medium" style={{ color: '#ef4444' }}>J{task.day}</span>
                <span className="text-sm truncate" style={{ color: '#ffffff' }}>{task.title}</span>
              </div>
            ))}
          </div>
          {overdueTasks.length > 4 && (
            <p className="text-sm mt-3" style={{ color: '#a3a3a3' }}>
              + {overdueTasks.length - 4} autres tâches en retard
            </p>
          )}
          <a href="/tasks" className="inline-block mt-4 text-sm font-medium" style={{ color: '#ef4444' }}>
            Voir et rattraper →
          </a>
        </div>
      )}

      {/* Product Info */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>
          📦 Le produit
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#262626' }}>
            <span className="text-2xl">🍑</span>
            <p className="text-sm font-medium mt-2" style={{ color: '#ffffff' }}>Pêche-Mangue</p>
            <p className="text-xs" style={{ color: '#737373' }}>Saveur</p>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#262626' }}>
            <span className="text-2xl">🧠</span>
            <p className="text-sm font-medium mt-2" style={{ color: '#ffffff' }}>Lion's Mane</p>
            <p className="text-xs" style={{ color: '#737373' }}>Focus</p>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#262626' }}>
            <span className="text-2xl">⚡</span>
            <p className="text-sm font-medium mt-2" style={{ color: '#ffffff' }}>Cordyceps</p>
            <p className="text-xs" style={{ color: '#737373' }}>Énergie</p>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#262626' }}>
            <span className="text-2xl">😴</span>
            <p className="text-sm font-medium mt-2" style={{ color: '#ffffff' }}>Reishi + Chaga</p>
            <p className="text-xs" style={{ color: '#737373' }}>Bien-être</p>
          </div>
        </div>
        <p className="text-center mt-4 text-lg font-medium" style={{ color: '#f97316' }}>
          "L'eau, mais en mieux" 💧
        </p>
      </div>
    </div>
  )
}
