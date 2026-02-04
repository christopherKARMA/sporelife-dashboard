'use client'

import { 
  Video, 
  CheckSquare, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Clock
} from 'lucide-react'

// Données de démo - seront remplacées par Supabase
const stats = [
  {
    name: 'Vidéos publiées',
    value: '0',
    change: '+0',
    changeType: 'neutral',
    icon: Video,
  },
  {
    name: 'Tâches complétées',
    value: '0',
    total: '24',
    changeType: 'neutral',
    icon: CheckSquare,
  },
  {
    name: 'Followers TikTok',
    value: '0',
    change: '+0',
    changeType: 'neutral',
    icon: Users,
  },
  {
    name: 'Engagement',
    value: '0%',
    change: '+0%',
    changeType: 'neutral',
    icon: TrendingUp,
  },
]

const recentVideos = [
  // Vide pour le moment
]

const upcomingTasks = [
  { id: 1, title: 'Définir le concept des poudres', status: 'todo', priority: 'high', category: 'product' },
  { id: 2, title: 'Contacter 5 fournisseurs', status: 'todo', priority: 'high', category: 'supplier' },
  { id: 3, title: 'Filmer présentation du projet', status: 'todo', priority: 'medium', category: 'content' },
  { id: 4, title: 'Créer compte TikTok dédié', status: 'todo', priority: 'medium', category: 'content' },
  { id: 5, title: 'Rechercher conditionnement', status: 'todo', priority: 'medium', category: 'product' },
]

const priorityColors = {
  high: 'bg-red-500/10 text-red-500 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-500 border-green-500/20',
}

const categoryLabels = {
  product: '🧪 Produit',
  supplier: '📦 Fournisseur',
  content: '🎬 Contenu',
  admin: '📋 Admin',
  other: '📌 Autre',
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans le challenge 60 jours SporeLife 🍄
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              {stat.change && (
                <div className={`flex items-center text-sm ${
                  stat.changeType === 'increase' ? 'text-green-500' :
                  stat.changeType === 'decrease' ? 'text-red-500' :
                  'text-muted-foreground'
                }`}>
                  {stat.changeType === 'increase' && <ArrowUpRight className="w-4 h-4" />}
                  {stat.changeType === 'decrease' && <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {stat.value}
                {stat.total && <span className="text-muted-foreground font-normal">/{stat.total}</span>}
              </p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vidéos récentes */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Vidéos récentes</h2>
            <a href="/videos" className="text-sm text-primary hover:underline">
              Voir tout →
            </a>
          </div>
          
          {recentVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Play className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Aucune vidéo pour le moment</p>
              <a href="/videos" className="mt-2 text-sm text-primary hover:underline">
                Ajouter une vidéo
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Liste des vidéos ici */}
            </div>
          )}
        </div>

        {/* Tâches à faire */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Prochaines tâches</h2>
            <a href="/tasks" className="text-sm text-primary hover:underline">
              Voir tout →
            </a>
          </div>
          
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {categoryLabels[task.category as keyof typeof categoryLabels]}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Normal' : 'Basse'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline du jour */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Timeline - Jour 1</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Aujourd'hui</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            <div className="relative flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                <span className="text-xs text-primary-foreground font-bold">1</span>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-medium text-foreground">Lancement du challenge</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Présentation du projet, setup du bureau, premier jour de tournage
                </p>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center z-10">
                <span className="text-xs text-muted-foreground font-bold">2</span>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-medium text-muted-foreground">Définition du produit</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Choix des saveurs, dosages, format des sachets
                </p>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center z-10">
                <span className="text-xs text-muted-foreground font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Recherche fournisseurs</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact des premiers fournisseurs de poudres et conditionnement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
