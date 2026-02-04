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
  GripVertical
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string | null
  category: 'product' | 'supplier' | 'content' | 'admin' | 'other'
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  day: number // Jour du challenge
}

const categoryConfig = {
  product: { label: 'Produit', emoji: '🧪', color: 'bg-purple-500/10 text-purple-400' },
  supplier: { label: 'Fournisseur', emoji: '📦', color: 'bg-blue-500/10 text-blue-400' },
  content: { label: 'Contenu', emoji: '🎬', color: 'bg-pink-500/10 text-pink-400' },
  admin: { label: 'Admin', emoji: '📋', color: 'bg-gray-500/10 text-gray-400' },
  other: { label: 'Autre', emoji: '📌', color: 'bg-yellow-500/10 text-yellow-400' },
}

const priorityConfig = {
  high: { label: 'Urgent', color: 'text-red-400', icon: AlertTriangle },
  medium: { label: 'Normal', color: 'text-yellow-400', icon: Clock },
  low: { label: 'Basse', color: 'text-green-400', icon: CheckCircle2 },
}

// Plan d'action initial pour le challenge 60 jours
const initialTasks: Task[] = [
  // Semaine 1 - Setup & Définition
  { id: '1', title: 'Setup du bureau à Montreux', description: 'Installer le matériel, décorer, préparer l\'espace de tournage', category: 'admin', status: 'todo', priority: 'high', due_date: null, day: 1 },
  { id: '2', title: 'Définir le concept des poudres', description: 'Saveurs, dosages, format, positionnement prix', category: 'product', status: 'todo', priority: 'high', due_date: null, day: 1 },
  { id: '3', title: 'Créer le compte TikTok dédié', description: 'Nom, bio, photo de profil, premiers posts', category: 'content', status: 'todo', priority: 'high', due_date: null, day: 1 },
  { id: '4', title: 'Filmer vidéo de présentation', description: 'Qui on est, le concept du challenge, les objectifs', category: 'content', status: 'todo', priority: 'high', due_date: null, day: 1 },
  { id: '5', title: 'Lister 20 fournisseurs potentiels', description: 'Poudres de champignons, arômes, conditionnement', category: 'supplier', status: 'todo', priority: 'high', due_date: null, day: 2 },
  { id: '6', title: 'Contacter premiers 5 fournisseurs', description: 'Email ou téléphone, demande de devis', category: 'supplier', status: 'todo', priority: 'high', due_date: null, day: 3 },
  { id: '7', title: 'Définir la gamme de produits', description: '3-4 références différentes, noms, bénéfices', category: 'product', status: 'todo', priority: 'medium', due_date: null, day: 4 },
  
  // Semaine 2 - Recherche fournisseurs
  { id: '8', title: 'Analyser les devis reçus', description: 'Comparatif prix, MOQ, délais', category: 'supplier', status: 'todo', priority: 'medium', due_date: null, day: 8 },
  { id: '9', title: 'Sélectionner 2-3 fournisseurs finalistes', description: 'Pour les poudres de champignons', category: 'supplier', status: 'todo', priority: 'medium', due_date: null, day: 10 },
  { id: '10', title: 'Commander échantillons', description: 'Tester la qualité avant commande en gros', category: 'supplier', status: 'todo', priority: 'medium', due_date: null, day: 12 },
  
  // Semaine 3 - Packaging & Design
  { id: '11', title: 'Rechercher conditionneurs', description: 'Entreprises qui font le packaging sachets/pots', category: 'supplier', status: 'todo', priority: 'medium', due_date: null, day: 15 },
  { id: '12', title: 'Créer le design packaging', description: 'Logo, couleurs, étiquettes', category: 'product', status: 'todo', priority: 'medium', due_date: null, day: 17 },
  { id: '13', title: 'Planifier visite usine', description: 'Filmer le processus de fabrication', category: 'content', status: 'todo', priority: 'low', due_date: null, day: 20 },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTasks = tasks.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) return false
    if (filterStatus !== 'all' && task.status !== filterStatus) return false
    return true
  })

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'todo' : 'done'
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plan d'action</h1>
          <p className="text-muted-foreground mt-1">
            Suivez votre progression sur les 60 jours
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle tâche
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-foreground">{todoTasks.length}</p>
          <p className="text-sm text-muted-foreground">À faire</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">{inProgressTasks.length}</p>
          <p className="text-sm text-muted-foreground">En cours</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{doneTasks.length}</p>
          <p className="text-sm text-muted-foreground">Terminées</p>
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

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const category = categoryConfig[task.category]
          const priority = priorityConfig[task.priority]
          const PriorityIcon = priority.icon

          return (
            <div
              key={task.id}
              className={`bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all ${
                task.status === 'done' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.status === 'done' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${category.color}`}>
                      {category.emoji} {category.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Jour {task.day}
                    </span>
                    <PriorityIcon className={`w-4 h-4 ${priority.color}`} />
                  </div>

                  <h3 className={`font-semibold text-foreground ${
                    task.status === 'done' ? 'line-through' : ''
                  }`}>
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                </div>

                <button className="p-1 hover:bg-muted rounded flex-shrink-0">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Nouvelle tâche</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Titre</label>
                <input
                  type="text"
                  placeholder="Ex: Contacter fournisseur X"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  placeholder="Détails de la tâche..."
                  rows={2}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Catégorie</label>
                  <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
                      <option key={key} value={key}>{emoji} {label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Priorité</label>
                  <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="high">🔴 Urgent</option>
                    <option value="medium">🟡 Normal</option>
                    <option value="low">🟢 Basse</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Jour du challenge</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  defaultValue="1"
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
