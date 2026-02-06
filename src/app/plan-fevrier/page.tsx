'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Globe,
  Search,
  ShoppingBag,
  Truck,
  Store,
  FileText,
  RefreshCw,
  Target,
  Calendar
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FebTask {
  id: string
  title: string
  description: string | null
  category: 'site' | 'seo' | 'amazon' | 'fournisseur' | 'distribution' | 'admin' | 'contenu'
  priority: 'high' | 'medium' | 'low'
  assignee: 'chris' | 'lucas' | 'both'
  status: 'todo' | 'in_progress' | 'done'
  week: number
  deadline: string | null
  created_at: string
  updated_at: string
}

const categoryConfig = {
  site: { label: 'Site/Pages', emoji: '🌐', color: 'bg-blue-500/10 text-blue-400', icon: Globe },
  seo: { label: 'SEO/Blog', emoji: '🔍', color: 'bg-green-500/10 text-green-400', icon: Search },
  amazon: { label: 'Amazon', emoji: '📦', color: 'bg-orange-500/10 text-orange-400', icon: ShoppingBag },
  fournisseur: { label: 'Fournisseur', emoji: '🏭', color: 'bg-purple-500/10 text-purple-400', icon: Truck },
  distribution: { label: 'Distribution', emoji: '🏪', color: 'bg-cyan-500/10 text-cyan-400', icon: Store },
  admin: { label: 'Admin', emoji: '📋', color: 'bg-gray-500/10 text-gray-400', icon: FileText },
  contenu: { label: 'Contenu', emoji: '🎬', color: 'bg-pink-500/10 text-pink-400', icon: FileText },
}

const priorityConfig = {
  high: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10' },
  medium: { label: 'Normal', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  low: { label: 'Basse', color: 'text-green-400', bg: 'bg-green-500/10' },
}

const assigneeConfig = {
  chris: { label: 'Chris', emoji: '🎬', color: 'bg-cyan-500/10 text-cyan-400' },
  lucas: { label: 'Lucas', emoji: '📊', color: 'bg-emerald-500/10 text-emerald-400' },
  both: { label: 'Tous', emoji: '👥', color: 'bg-violet-500/10 text-violet-400' },
}

const weekLabels: { [key: number]: { title: string, dates: string } } = {
  1: { title: 'Semaine 1', dates: '3-9 Fév' },
  2: { title: 'Semaine 2', dates: '10-16 Fév' },
  3: { title: 'Semaine 3', dates: '17-23 Fév' },
  4: { title: 'Semaine 4', dates: '24-28 Fév' },
}

// Initial tasks for February
const initialTasks: Omit<FebTask, 'id' | 'created_at' | 'updated_at'>[] = [
  // SEMAINE 1 - Site & Optimisations
  { title: 'Optimiser page Lion\'s Mane (title, meta, contenu)', description: 'Ajouter mots-clés, FAQ, sections bienfaits. C\'est le produit star (50% CA)', category: 'site', priority: 'high', assignee: 'chris', status: 'todo', week: 1, deadline: '2026-02-07' },
  { title: 'Vérifier images WebP sur toutes les pages', description: 'S\'assurer que les nouvelles images optimisées sont bien affichées', category: 'site', priority: 'medium', assignee: 'chris', status: 'todo', week: 1, deadline: '2026-02-07' },
  { title: 'Optimiser pages Cordyceps, Chaga, Reishi', description: 'Même travail que Lion\'s Mane : titles, metas, contenu enrichi', category: 'site', priority: 'medium', assignee: 'chris', status: 'todo', week: 1, deadline: '2026-02-09' },
  { title: 'Test PageSpeed après optimisations', description: 'Objectif : score > 80 sur mobile', category: 'site', priority: 'medium', assignee: 'chris', status: 'todo', week: 1, deadline: '2026-02-09' },
  { title: 'Relancer Typo (distributeur Suisse)', description: 'URGENT : ça fait des mois qu\'il repousse. APPELER, pas juste message', category: 'distribution', priority: 'high', assignee: 'lucas', status: 'todo', week: 1, deadline: '2026-02-07' },
  { title: 'Fixer RDV avec Typo cette semaine', description: 'Ne pas lâcher tant qu\'on a pas une date de RDV concrète', category: 'distribution', priority: 'high', assignee: 'lucas', status: 'todo', week: 1, deadline: '2026-02-09' },
  
  // SEMAINE 2 - Amazon & SEO
  { title: 'Finaliser fiches produits Amazon', description: 'Tous les produits doivent être en ligne et optimisés', category: 'amazon', priority: 'high', assignee: 'chris', status: 'todo', week: 2, deadline: '2026-02-14' },
  { title: 'Configurer FBA ou expédition Amazon', description: 'Décider du mode de livraison et le mettre en place', category: 'amazon', priority: 'high', assignee: 'lucas', status: 'todo', week: 2, deadline: '2026-02-14' },
  { title: 'Publier article SEO #1 : Lion\'s Mane bienfaits', description: 'Article complet 1500+ mots avec FAQ', category: 'seo', priority: 'medium', assignee: 'chris', status: 'todo', week: 2, deadline: '2026-02-12' },
  { title: 'Publier article SEO #2 : Cordyceps énergie', description: 'Article complet ciblant "cordyceps énergie sport"', category: 'seo', priority: 'medium', assignee: 'chris', status: 'todo', week: 2, deadline: '2026-02-16' },
  { title: 'Rechercher 3 fournisseurs ice tea', description: 'Demander devis, MOQ, délais pour les boissons en poudre', category: 'fournisseur', priority: 'high', assignee: 'lucas', status: 'todo', week: 2, deadline: '2026-02-16' },
  { title: 'Démarcher 10 nouveaux influenceurs', description: 'Continuer le travail de prospection', category: 'contenu', priority: 'medium', assignee: 'lucas', status: 'todo', week: 2, deadline: '2026-02-16' },
  
  // SEMAINE 3 - Conditionnement & Distribution
  { title: 'Trouver solution conditionnement poudres', description: 'Usine ou process interne optimisé pour ne plus se prendre la tête', category: 'fournisseur', priority: 'high', assignee: 'lucas', status: 'todo', week: 3, deadline: '2026-02-21' },
  { title: 'Comparer devis fournisseurs ice tea', description: 'Faire tableau comparatif : prix, MOQ, qualité, délais', category: 'fournisseur', priority: 'high', assignee: 'lucas', status: 'todo', week: 3, deadline: '2026-02-21' },
  { title: 'Publier article SEO #3 : Chaga antioxydant', description: 'Mettre en avant le score ORAC exceptionnel', category: 'seo', priority: 'medium', assignee: 'chris', status: 'todo', week: 3, deadline: '2026-02-19' },
  { title: 'Publier article SEO #4 : Reishi sommeil', description: 'Article ciblant "reishi sommeil stress"', category: 'seo', priority: 'medium', assignee: 'chris', status: 'todo', week: 3, deadline: '2026-02-23' },
  { title: 'Avancer intégration pharmacie Suisse (Typo)', description: 'Suivre le dossier, envoyer docs demandés', category: 'distribution', priority: 'high', assignee: 'lucas', status: 'todo', week: 3, deadline: '2026-02-23' },
  { title: 'Préparer visuels pour Amazon Ads', description: 'Si Amazon ready, préparer les créatives pub', category: 'amazon', priority: 'low', assignee: 'chris', status: 'todo', week: 3, deadline: '2026-02-23' },
  
  // SEMAINE 4 - Finalisation avant Mars
  { title: 'BILAN : Boutique Amazon 100% opérationnelle', description: 'Vérifier que tout est en place et fonctionnel', category: 'amazon', priority: 'high', assignee: 'both', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'BILAN : Conditionnement poudres résolu', description: 'Solution trouvée et en place', category: 'fournisseur', priority: 'high', assignee: 'lucas', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'BILAN : Fournisseur ice tea choisi', description: 'Décision prise, devis validé, prêt à commander en mars', category: 'fournisseur', priority: 'high', assignee: 'lucas', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'BILAN : 4+ articles SEO publiés', description: 'Vérifier que les 4 articles sont en ligne', category: 'seo', priority: 'medium', assignee: 'chris', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'BILAN : Dossier Typo avancé', description: 'Au minimum un accord de principe ou date de mise en rayon', category: 'distribution', priority: 'high', assignee: 'lucas', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'Préparer plan Mars (build in public)', description: 'Détailler les tâches du challenge 60 jours', category: 'admin', priority: 'medium', assignee: 'both', status: 'todo', week: 4, deadline: '2026-02-28' },
  { title: 'Contacter Jessica (partenariat lancement)', description: 'Proposer le deal ambassadrice pour les boissons', category: 'contenu', priority: 'medium', assignee: 'chris', status: 'todo', week: 4, deadline: '2026-02-28' },
]

export default function PlanFevrierPage() {
  const [tasks, setTasks] = useState<FebTask[]>([])
  const [filterAssignee, setFilterAssignee] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 2, 3, 4])
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<FebTask | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'site' as FebTask['category'],
    priority: 'medium' as FebTask['priority'],
    assignee: 'chris' as FebTask['assignee'],
    week: 1,
    deadline: ''
  })

  // Check and create table if needed, then fetch tasks
  const initializeAndFetch = async () => {
    // Try to fetch first
    const { data, error } = await supabase
      .from('february_tasks')
      .select('*')
      .order('week', { ascending: true })
      .order('priority', { ascending: true })

    if (error && error.code === '42P01') {
      // Table doesn't exist, will be created via SQL
      console.log('Table february_tasks not found, please run the SQL migration')
      setIsLoading(false)
      return
    }

    if (error) {
      console.error('Error fetching tasks:', error)
      setIsLoading(false)
      return
    }

    // If no tasks, insert initial ones
    if (!data || data.length === 0) {
      const { error: insertError } = await supabase
        .from('february_tasks')
        .insert(initialTasks)

      if (insertError) {
        console.error('Error inserting initial tasks:', insertError)
      } else {
        // Fetch again after insert
        const { data: newData } = await supabase
          .from('february_tasks')
          .select('*')
          .order('week', { ascending: true })
          .order('priority', { ascending: true })
        setTasks(newData || [])
      }
    } else {
      setTasks(data)
    }
    
    setIsLoading(false)
  }

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('february_tasks')
      .select('*')
      .order('week', { ascending: true })
      .order('priority', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
      return
    }

    setTasks(data || [])
  }

  useEffect(() => {
    initializeAndFetch()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('february-tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'february_tasks' }, () => {
        fetchTasks()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const getCurrentWeek = (): number => {
    const today = new Date()
    const day = today.getDate()
    if (day <= 9) return 1
    if (day <= 16) return 2
    if (day <= 23) return 3
    return 4
  }

  const currentWeek = getCurrentWeek()

  const filteredTasks = tasks.filter(task => {
    if (filterAssignee !== 'all' && task.assignee !== filterAssignee && task.assignee !== 'both') return false
    if (filterCategory !== 'all' && task.category !== filterCategory) return false
    return true
  })

  const groupedByWeek = filteredTasks.reduce((acc, task) => {
    if (!acc[task.week]) acc[task.week] = []
    acc[task.week].push(task)
    return acc
  }, {} as { [key: number]: FebTask[] })

  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.status === 'done').length
  const chrisTasks = tasks.filter(t => t.assignee === 'chris' || t.assignee === 'both')
  const chrisDone = chrisTasks.filter(t => t.status === 'done').length
  const lucasTasks = tasks.filter(t => t.assignee === 'lucas' || t.assignee === 'both')
  const lucasDone = lucasTasks.filter(t => t.status === 'done').length

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done'
    
    const { error } = await supabase
      .from('february_tasks')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId)

    if (error) {
      console.error('Error updating task:', error)
      return
    }

    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus as FebTask['status'] } : task
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
      category: 'site', 
      priority: 'medium', 
      assignee: 'chris',
      week: currentWeek,
      deadline: ''
    })
    setShowModal(true)
  }

  const openEditModal = (task: FebTask) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category,
      priority: task.priority,
      assignee: task.assignee,
      week: task.week,
      deadline: task.deadline || ''
    })
    setShowModal(true)
  }

  const saveTask = async () => {
    if (!formData.title.trim()) return
    setIsSaving(true)

    if (editingTask) {
      const { error } = await supabase
        .from('february_tasks')
        .update({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          priority: formData.priority,
          assignee: formData.assignee,
          week: formData.week,
          deadline: formData.deadline || null,
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
        .from('february_tasks')
        .insert({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          priority: formData.priority,
          assignee: formData.assignee,
          week: formData.week,
          deadline: formData.deadline || null,
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
      .from('february_tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Error deleting task:', error)
      return
    }

    setTasks(tasks.filter(t => t.id !== taskId))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p style={{ color: '#a3a3a3' }}>Chargement du plan février...</p>
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
            <Target className="w-8 h-8" style={{ color: '#f97316' }} />
            Plan Février 2026
          </h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">
            Objectif : Tout prêt avant le lancement Mars 🚀
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
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#f97316', color: '#ffffff' }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#ffffff' }}>Progression totale</span>
            <span className="text-sm font-bold" style={{ color: '#f97316' }}>{totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0}%</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0}%`, backgroundColor: '#f97316' }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#737373' }}>{doneTasks}/{totalTasks} tâches</p>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2" style={{ color: '#ffffff' }}>🎬 Chris</span>
            <span className="text-sm font-bold" style={{ color: '#06b6d4' }}>{chrisTasks.length > 0 ? Math.round((chrisDone / chrisTasks.length) * 100) : 0}%</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${chrisTasks.length > 0 ? (chrisDone / chrisTasks.length) * 100 : 0}%`, backgroundColor: '#06b6d4' }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#737373' }}>{chrisDone}/{chrisTasks.length} tâches</p>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2" style={{ color: '#ffffff' }}>📊 Lucas</span>
            <span className="text-sm font-bold" style={{ color: '#10b981' }}>{lucasTasks.length > 0 ? Math.round((lucasDone / lucasTasks.length) * 100) : 0}%</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${lucasTasks.length > 0 ? (lucasDone / lucasTasks.length) * 100 : 0}%`, backgroundColor: '#10b981' }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#737373' }}>{lucasDone}/{lucasTasks.length} tâches</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterAssignee('all')}
          className={`px-3 py-2 rounded-lg text-sm ${filterAssignee === 'all' ? 'ring-2 ring-orange-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterAssignee === 'all' ? '#f97316' : '#a3a3a3' }}
        >
          👥 Tout
        </button>
        <button
          onClick={() => setFilterAssignee('chris')}
          className={`px-3 py-2 rounded-lg text-sm ${filterAssignee === 'chris' ? 'ring-2 ring-cyan-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterAssignee === 'chris' ? '#06b6d4' : '#a3a3a3' }}
        >
          🎬 Chris
        </button>
        <button
          onClick={() => setFilterAssignee('lucas')}
          className={`px-3 py-2 rounded-lg text-sm ${filterAssignee === 'lucas' ? 'ring-2 ring-emerald-500' : ''}`}
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: filterAssignee === 'lucas' ? '#10b981' : '#a3a3a3' }}
        >
          📊 Lucas
        </button>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm ml-auto"
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#ffffff' }}
        >
          <option value="all">Toutes catégories</option>
          {Object.entries(categoryConfig).map(([key, { label, emoji }]) => (
            <option key={key} value={key}>{emoji} {label}</option>
          ))}
        </select>
      </div>

      {/* Tasks by Week */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map(week => {
          const weekTasks = groupedByWeek[week] || []
          const isExpanded = expandedWeeks.includes(week)
          const weekDone = weekTasks.filter(t => t.status === 'done').length
          const weekInfo = weekLabels[week]
          const isCurrentWeek = week === currentWeek
          
          return (
            <div 
              key={week} 
              className={`rounded-xl overflow-hidden ${isCurrentWeek ? 'ring-2 ring-orange-500/50' : ''}`} 
              style={{ backgroundColor: '#171717', border: '1px solid #262626' }}
            >
              <button
                onClick={() => toggleWeek(week)}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {isCurrentWeek && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                    <Calendar className="w-5 h-5" style={{ color: '#f97316' }} />
                    <span className="text-lg font-semibold" style={{ color: '#ffffff' }}>{weekInfo.title}</span>
                  </div>
                  <span className="text-sm" style={{ color: '#737373' }}>{weekInfo.dates}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                    {weekDone}/{weekTasks.length} ✓
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" style={{ color: '#737373' }} /> : <ChevronDown className="w-5 h-5" style={{ color: '#737373' }} />}
              </button>
              
              {isExpanded && (
                <div style={{ borderTop: '1px solid #262626' }}>
                  {weekTasks.length === 0 ? (
                    <div className="px-4 py-8 text-center" style={{ color: '#737373' }}>
                      Aucune tâche pour cette semaine
                    </div>
                  ) : (
                    weekTasks.map((task) => {
                      const category = categoryConfig[task.category]
                      const priority = priorityConfig[task.priority]
                      const assignee = assigneeConfig[task.assignee]
                      const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done'

                      return (
                        <div 
                          key={task.id} 
                          className={`px-4 py-3 ${task.status === 'done' ? 'opacity-60' : ''} ${isOverdue ? 'bg-red-500/5' : ''}`} 
                          style={{ borderBottom: '1px solid #262626' }}
                        >
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleTaskStatus(task.id, task.status)} className="mt-0.5 flex-shrink-0">
                              {task.status === 'done' ? (
                                <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e' }} />
                              ) : (
                                <Circle className="w-5 h-5" style={{ color: isOverdue ? '#ef4444' : '#737373' }} />
                              )}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`px-1.5 py-0.5 rounded text-xs ${category.color}`}>{category.emoji} {category.label}</span>
                                <span className={`px-1.5 py-0.5 rounded text-xs ${assignee.color}`}>{assignee.emoji}</span>
                                <span className={`px-1.5 py-0.5 rounded text-xs ${priority.bg} ${priority.color}`}>{priority.label}</span>
                                {task.deadline && (
                                  <span className={`text-xs ${isOverdue ? 'text-red-400' : ''}`} style={{ color: isOverdue ? undefined : '#737373' }}>
                                    📅 {new Date(task.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                  </span>
                                )}
                              </div>
                              <h3 className={`font-medium text-sm ${task.status === 'done' ? 'line-through' : ''}`} style={{ color: '#ffffff' }}>{task.title}</h3>
                              {task.description && <p className="text-xs mt-1" style={{ color: '#737373' }}>{task.description}</p>}
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
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Objectifs fin février */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #f97316' }}>
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#f97316' }}>
          🎯 Objectifs fin février (avant de lancer le build in public)
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: '#a3a3a3' }}>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            Boutique Amazon 100% opérationnelle
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            Poudres conditionnées (process optimisé)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            Fournisseur ice tea choisi + budget estimé
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            Distribution Suisse (Typo) avancée
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            4+ articles SEO publiés
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#737373' }} />
            Pages produits optimisées (Lion&apos;s Mane en priorité)
          </li>
        </ul>
      </div>

      {/* Modal */}
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
                    onChange={(e) => setFormData({...formData, category: e.target.value as FebTask['category']})}
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
                    onChange={(e) => setFormData({...formData, assignee: e.target.value as FebTask['assignee']})}
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
                    onChange={(e) => setFormData({...formData, priority: e.target.value as FebTask['priority']})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value="high">🔴 Urgent</option>
                    <option value="medium">🟡 Normal</option>
                    <option value="low">🟢 Basse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Semaine</label>
                  <select
                    value={formData.week}
                    onChange={(e) => setFormData({...formData, week: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                  >
                    <option value={1}>Semaine 1 (3-9 Fév)</option>
                    <option value={2}>Semaine 2 (10-16 Fév)</option>
                    <option value={3}>Semaine 3 (17-23 Fév)</option>
                    <option value={4}>Semaine 4 (24-28 Fév)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>Annuler</button>
              <button 
                onClick={saveTask} 
                disabled={isSaving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50" 
                style={{ backgroundColor: '#f97316', color: '#ffffff' }}
              >
                {isSaving ? 'Enregistrement...' : editingTask ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// Rebuild Fri Feb  6 16:58:36 CET 2026
