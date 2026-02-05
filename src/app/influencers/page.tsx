'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Search,
  Instagram,
  Youtube,
  ExternalLink,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Package,
  Video,
  Edit3,
  Save,
  GripVertical,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react'
import { supabase, Influencer } from '@/lib/supabase'

type InfluencerStatus = 'to_contact' | 'contacted' | 'negotiating' | 'accepted' | 'shipped' | 'content_received' | 'declined'
type Platform = 'tiktok' | 'instagram' | 'youtube'
type ViewMode = 'kanban' | 'list'

const statusConfig: Record<InfluencerStatus, { label: string; color: string; bgColor: string; icon: any; description: string }> = {
  to_contact: { 
    label: 'À démarcher', 
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10 border-gray-500/30',
    icon: Clock,
    description: 'Pas encore contacté'
  },
  contacted: { 
    label: 'Contacté', 
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    icon: MessageCircle,
    description: 'En attente de réponse'
  },
  negotiating: { 
    label: 'En discussion', 
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30',
    icon: AlertCircle,
    description: 'Échanges en cours'
  },
  accepted: { 
    label: 'Accepté', 
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/30',
    icon: CheckCircle,
    description: 'Prêt à envoyer'
  },
  shipped: { 
    label: 'Colis envoyé', 
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/30',
    icon: Package,
    description: 'En attente du contenu'
  },
  content_received: { 
    label: 'Contenu reçu', 
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    icon: Video,
    description: 'Partenariat terminé'
  },
  declined: { 
    label: 'Refusé', 
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/30',
    icon: XCircle,
    description: 'N\'a pas accepté'
  },
}

// Colonnes pour le Kanban (ordre d'affichage)
const kanbanColumns: InfluencerStatus[] = ['to_contact', 'contacted', 'negotiating', 'accepted', 'shipped', 'content_received']

const platformConfig: Record<Platform, { label: string; color: string; icon: any }> = {
  tiktok: { 
    label: 'TikTok', 
    color: 'bg-[#ff0050]/10 text-[#ff0050]',
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    )
  },
  instagram: { 
    label: 'Instagram', 
    color: 'bg-[#E4405F]/10 text-[#E4405F]',
    icon: Instagram
  },
  youtube: { 
    label: 'YouTube', 
    color: 'bg-[#FF0000]/10 text-[#FF0000]',
    icon: Youtube
  },
}

// Fonction pour mapper les anciens statuts vers les nouveaux
function mapStatus(status: string): InfluencerStatus {
  const mapping: Record<string, InfluencerStatus> = {
    'not_contacted': 'to_contact',
    'to_contact': 'to_contact',
    'contacted': 'contacted',
    'negotiating': 'negotiating',
    'accepted': 'accepted',
    'shipped': 'shipped',
    'content_received': 'content_received',
    'declined': 'declined'
  }
  return mapping[status] || 'to_contact'
}

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('kanban')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Influencer>>({})
  const [saving, setSaving] = useState(false)
  const [showDeclined, setShowDeclined] = useState(false)
  
  const [newInfluencer, setNewInfluencer] = useState({
    name: '',
    username: '',
    platform: 'tiktok' as Platform,
    followers: '',
    engagement: '',
    status: 'to_contact' as InfluencerStatus,
    notes: '',
    profile_url: ''
  })

  useEffect(() => {
    fetchInfluencers()
    
    const channel = supabase
      .channel('influencers_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'influencers' },
        () => fetchInfluencers()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchInfluencers = async () => {
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setInfluencers(data)
    }
    setLoading(false)
  }

  const filteredInfluencers = influencers.filter(inf => {
    const matchesSearch = inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (inf.notes && inf.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const getInfluencersByStatus = (status: InfluencerStatus) => {
    return filteredInfluencers.filter(inf => mapStatus(inf.status) === status)
  }

  const stats = {
    total: influencers.length,
    toContact: influencers.filter(i => mapStatus(i.status) === 'to_contact').length,
    inProgress: influencers.filter(i => ['contacted', 'negotiating'].includes(mapStatus(i.status))).length,
    accepted: influencers.filter(i => mapStatus(i.status) === 'accepted').length,
    shipped: influencers.filter(i => mapStatus(i.status) === 'shipped').length,
    done: influencers.filter(i => mapStatus(i.status) === 'content_received').length,
  }

  const addInfluencer = async () => {
    if (!newInfluencer.name || !newInfluencer.username) return
    
    setSaving(true)
    const { error } = await supabase
      .from('influencers')
      .insert({
        name: newInfluencer.name,
        username: newInfluencer.username.startsWith('@') ? newInfluencer.username : `@${newInfluencer.username}`,
        platform: newInfluencer.platform,
        followers: newInfluencer.followers,
        engagement: newInfluencer.engagement || null,
        status: newInfluencer.status,
        notes: newInfluencer.notes || null,
        profile_url: newInfluencer.profile_url || null,
        last_contact: newInfluencer.status !== 'to_contact' ? new Date().toISOString().split('T')[0] : null
      })

    if (!error) {
      setNewInfluencer({
        name: '', username: '', platform: 'tiktok', followers: '', 
        engagement: '', status: 'to_contact', notes: '', profile_url: ''
      })
      setShowAddModal(false)
    }
    setSaving(false)
  }

  const updateStatus = async (id: string, status: InfluencerStatus) => {
    await supabase
      .from('influencers')
      .update({ status, last_contact: new Date().toISOString().split('T')[0] })
      .eq('id', id)
  }

  const startEditing = (influencer: Influencer) => {
    setEditingId(influencer.id)
    setEditData({
      name: influencer.name,
      username: influencer.username,
      followers: influencer.followers,
      engagement: influencer.engagement,
      notes: influencer.notes,
      profile_url: influencer.profile_url
    })
  }

  const saveEdit = async () => {
    if (!editingId) return
    setSaving(true)
    
    await supabase
      .from('influencers')
      .update(editData)
      .eq('id', editingId)
    
    setEditingId(null)
    setEditData({})
    setSaving(false)
  }

  const deleteInfluencer = async (id: string) => {
    if (!confirm('Supprimer cet influenceur ?')) return
    await supabase.from('influencers').delete().eq('id', id)
  }

  // Composant carte influenceur pour Kanban
  const InfluencerCard = ({ influencer }: { influencer: Influencer }) => {
    const status = mapStatus(influencer.status)
    const config = statusConfig[status]
    const PlatformIcon = platformConfig[influencer.platform]?.icon || Users
    const isEditing = editingId === influencer.id

    return (
      <div className={`bg-card border rounded-lg p-3 mb-2 hover:border-primary/50 transition-all ${isEditing ? 'ring-2 ring-primary' : 'border-border'}`}>
        {isEditing ? (
          // Mode édition
          <div className="space-y-2">
            <input
              type="text"
              value={editData.name || ''}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full px-2 py-1 text-sm bg-muted border border-border rounded text-foreground"
              placeholder="Nom"
            />
            <input
              type="text"
              value={editData.username || ''}
              onChange={(e) => setEditData({...editData, username: e.target.value})}
              className="w-full px-2 py-1 text-sm bg-muted border border-border rounded text-foreground"
              placeholder="@username"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={editData.followers || ''}
                onChange={(e) => setEditData({...editData, followers: e.target.value})}
                className="flex-1 px-2 py-1 text-sm bg-muted border border-border rounded text-foreground"
                placeholder="Followers"
              />
              <input
                type="text"
                value={editData.engagement || ''}
                onChange={(e) => setEditData({...editData, engagement: e.target.value})}
                className="flex-1 px-2 py-1 text-sm bg-muted border border-border rounded text-foreground"
                placeholder="Engagement"
              />
            </div>
            <textarea
              value={editData.notes || ''}
              onChange={(e) => setEditData({...editData, notes: e.target.value})}
              className="w-full px-2 py-1 text-sm bg-muted border border-border rounded text-foreground resize-none"
              placeholder="Notes (produits, adresse, etc.)"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium"
              >
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                Sauver
              </button>
              <button
                onClick={() => { setEditingId(null); setEditData({}) }}
                className="flex-1 px-2 py-1.5 bg-muted text-foreground rounded text-xs font-medium"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          // Mode affichage
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`p-1 rounded ${platformConfig[influencer.platform]?.color || 'bg-gray-500/10'}`}>
                    <PlatformIcon className="w-3 h-3" />
                  </span>
                  <span className="font-medium text-sm text-foreground truncate">{influencer.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{influencer.username}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEditing(influencer)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="Modifier"
                >
                  <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                {influencer.profile_url && (
                  <a
                    href={influencer.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded hover:bg-muted transition-colors"
                    title="Voir le profil"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{influencer.followers}</span>
              {influencer.engagement && (
                <>
                  <span>•</span>
                  <span>{influencer.engagement}</span>
                </>
              )}
            </div>
            
            {influencer.notes && (
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2 bg-muted/50 rounded p-1.5">
                {influencer.notes}
              </p>
            )}
            
            {/* Quick status change */}
            <div className="flex flex-wrap gap-1 mt-2">
              {kanbanColumns.filter(s => s !== status).slice(0, 3).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(influencer.id, s)}
                  className={`px-2 py-0.5 text-[10px] rounded-full border ${statusConfig[s].bgColor} ${statusConfig[s].color} hover:opacity-80 transition-opacity`}
                >
                  → {statusConfig[s].label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Influenceurs</h1>
          <p className="text-sm text-muted-foreground">
            {stats.total} total • {stats.inProgress} en cours • {stats.accepted} à envoyer • {stats.shipped} envoyés • {stats.done} terminés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              title="Vue Kanban"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              title="Vue Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom, pseudo ou notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowDeclined(!showDeclined)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showDeclined ? 'bg-red-500/20 text-red-400' : 'bg-muted text-muted-foreground'}`}
        >
          Refusés ({influencers.filter(i => mapStatus(i.status) === 'declined').length})
        </button>
      </div>

      {/* Vue Kanban */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {kanbanColumns.map(status => {
              const config = statusConfig[status]
              const StatusIcon = config.icon
              const items = getInfluencersByStatus(status)
              
              return (
                <div key={status} className="w-72 flex-shrink-0">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 ${config.bgColor}`}>
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                    <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${config.bgColor} ${config.color}`}>
                      {items.length}
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-b-lg p-2 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto">
                    {items.length === 0 ? (
                      <p className="text-center text-xs text-muted-foreground py-8">
                        {config.description}
                      </p>
                    ) : (
                      items.map(inf => <InfluencerCard key={inf.id} influencer={inf} />)
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Vue Liste */}
      {viewMode === 'list' && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">Influenceur</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Plateforme</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Stats</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Notes</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInfluencers
                  .filter(inf => showDeclined || mapStatus(inf.status) !== 'declined')
                  .map(inf => {
                    const status = mapStatus(inf.status)
                    const config = statusConfig[status]
                    const PlatformIcon = platformConfig[inf.platform]?.icon || Users
                    
                    return (
                      <tr key={inf.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="font-medium text-foreground">{inf.name}</div>
                          <div className="text-xs text-muted-foreground">{inf.username}</div>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${platformConfig[inf.platform]?.color || ''}`}>
                            <PlatformIcon className="w-3 h-3" />
                            {platformConfig[inf.platform]?.label || inf.platform}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          <div>{inf.followers}</div>
                          {inf.engagement && <div className="text-xs">{inf.engagement}</div>}
                        </td>
                        <td className="p-3">
                          <select
                            value={status}
                            onChange={(e) => updateStatus(inf.id, e.target.value as InfluencerStatus)}
                            className={`px-2 py-1 rounded text-xs font-medium border ${config.bgColor} ${config.color} bg-transparent`}
                          >
                            {Object.entries(statusConfig).map(([key, cfg]) => (
                              <option key={key} value={key} className="bg-card text-foreground">
                                {cfg.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3 max-w-xs">
                          <p className="text-xs text-muted-foreground truncate">{inf.notes || '-'}</p>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => startEditing(inf)}
                              className="p-1.5 rounded hover:bg-muted transition-colors"
                            >
                              <Edit3 className="w-4 h-4 text-muted-foreground" />
                            </button>
                            {inf.profile_url && (
                              <a
                                href={inf.profile_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-muted transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                              </a>
                            )}
                            <button
                              onClick={() => deleteInfluencer(inf.id)}
                              className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Refusés (si affiché) */}
      {showDeclined && viewMode === 'kanban' && (
        <div className="mt-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 ${statusConfig.declined.bgColor}`}>
            <XCircle className={`w-4 h-4 ${statusConfig.declined.color}`} />
            <span className={`font-medium text-sm ${statusConfig.declined.color}`}>Refusés</span>
            <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${statusConfig.declined.bgColor} ${statusConfig.declined.color}`}>
              {getInfluencersByStatus('declined').length}
            </span>
          </div>
          <div className="bg-muted/30 rounded-b-lg p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {getInfluencersByStatus('declined').map(inf => (
              <InfluencerCard key={inf.id} influencer={inf} />
            ))}
          </div>
        </div>
      )}

      {/* Modal Ajout */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1f] border border-border rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Ajouter un influenceur</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-muted">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom *</label>
                <input
                  type="text"
                  value={newInfluencer.name}
                  onChange={(e) => setNewInfluencer({...newInfluencer, name: e.target.value})}
                  placeholder="Prénom Nom"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pseudo *</label>
                <input
                  type="text"
                  value={newInfluencer.username}
                  onChange={(e) => setNewInfluencer({...newInfluencer, username: e.target.value})}
                  placeholder="@username"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Plateforme</label>
                  <select
                    value={newInfluencer.platform}
                    onChange={(e) => setNewInfluencer({...newInfluencer, platform: e.target.value as Platform})}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  >
                    {Object.entries(platformConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Followers</label>
                  <input
                    type="text"
                    value={newInfluencer.followers}
                    onChange={(e) => setNewInfluencer({...newInfluencer, followers: e.target.value})}
                    placeholder="10K"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Statut initial</label>
                <select
                  value={newInfluencer.status}
                  onChange={(e) => setNewInfluencer({...newInfluencer, status: e.target.value as InfluencerStatus})}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                >
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
                <textarea
                  value={newInfluencer.notes}
                  onChange={(e) => setNewInfluencer({...newInfluencer, notes: e.target.value})}
                  placeholder="Produits à envoyer, adresse, remarques..."
                  rows={3}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">URL du profil</label>
                <input
                  type="url"
                  value={newInfluencer.profile_url}
                  onChange={(e) => setNewInfluencer({...newInfluencer, profile_url: e.target.value})}
                  placeholder="https://tiktok.com/@..."
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-4 border-t border-border">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-lg font-medium"
              >
                Annuler
              </button>
              <button
                onClick={addInfluencer}
                disabled={!newInfluencer.name || !newInfluencer.username || saving}
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition (pour vue liste) */}
      {editingId && viewMode === 'list' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1f] border border-border rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Modifier l'influenceur</h2>
              <button onClick={() => { setEditingId(null); setEditData({}) }} className="p-2 rounded-lg hover:bg-muted">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom</label>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pseudo</label>
                <input
                  type="text"
                  value={editData.username || ''}
                  onChange={(e) => setEditData({...editData, username: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Followers</label>
                  <input
                    type="text"
                    value={editData.followers || ''}
                    onChange={(e) => setEditData({...editData, followers: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Engagement</label>
                  <input
                    type="text"
                    value={editData.engagement || ''}
                    onChange={(e) => setEditData({...editData, engagement: e.target.value})}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
                <textarea
                  value={editData.notes || ''}
                  onChange={(e) => setEditData({...editData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">URL du profil</label>
                <input
                  type="url"
                  value={editData.profile_url || ''}
                  onChange={(e) => setEditData({...editData, profile_url: e.target.value})}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-4 border-t border-border">
              <button
                onClick={() => { setEditingId(null); setEditData({}) }}
                className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-lg font-medium"
              >
                Annuler
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
