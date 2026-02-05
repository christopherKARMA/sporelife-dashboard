'use client'

import { useState } from 'react'
import { 
  Users, 
  Plus, 
  Search,
  Instagram,
  Youtube,
  Filter,
  ExternalLink,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X
} from 'lucide-react'

// Type pour les influenceurs
type InfluencerStatus = 'not_contacted' | 'contacted' | 'negotiating' | 'accepted' | 'declined'
type Platform = 'tiktok' | 'instagram' | 'youtube'

interface Influencer {
  id: number
  name: string
  username: string
  platform: Platform
  followers: string
  engagement?: string
  status: InfluencerStatus
  lastContact?: string
  notes?: string
  profileUrl?: string
}

// Données de démo
const initialInfluencers: Influencer[] = [
  {
    id: 1,
    name: 'Exemple Influenceur',
    username: '@exemple',
    platform: 'tiktok',
    followers: '50K',
    engagement: '5.2%',
    status: 'not_contacted',
    notes: 'Fait du contenu wellness/lifestyle',
    profileUrl: 'https://tiktok.com/@exemple'
  }
]

const statusConfig = {
  not_contacted: { 
    label: 'Pas contacté', 
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    icon: Clock
  },
  contacted: { 
    label: 'Contacté', 
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    icon: MessageCircle
  },
  negotiating: { 
    label: 'En discussion', 
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    icon: AlertCircle
  },
  accepted: { 
    label: 'Accepté', 
    color: 'bg-green-500/10 text-green-400 border-green-500/20',
    icon: CheckCircle
  },
  declined: { 
    label: 'Refusé', 
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
    icon: XCircle
  },
}

const platformConfig = {
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

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<InfluencerStatus | 'all'>('all')
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  // Formulaire pour nouvel influenceur
  const [newInfluencer, setNewInfluencer] = useState({
    name: '',
    username: '',
    platform: 'tiktok' as Platform,
    followers: '',
    engagement: '',
    status: 'not_contacted' as InfluencerStatus,
    notes: '',
    profileUrl: ''
  })

  // Filtrage
  const filteredInfluencers = influencers.filter(inf => {
    const matchesSearch = inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inf.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || inf.status === filterStatus
    const matchesPlatform = filterPlatform === 'all' || inf.platform === filterPlatform
    return matchesSearch && matchesStatus && matchesPlatform
  })

  // Stats
  const stats = {
    total: influencers.length,
    contacted: influencers.filter(i => i.status !== 'not_contacted').length,
    accepted: influencers.filter(i => i.status === 'accepted').length,
    pending: influencers.filter(i => i.status === 'negotiating' || i.status === 'contacted').length,
  }

  const addInfluencer = () => {
    if (!newInfluencer.name || !newInfluencer.username) return
    
    setInfluencers([
      ...influencers,
      {
        ...newInfluencer,
        id: Date.now(),
        lastContact: newInfluencer.status !== 'not_contacted' ? new Date().toISOString().split('T')[0] : undefined
      }
    ])
    setNewInfluencer({
      name: '',
      username: '',
      platform: 'tiktok',
      followers: '',
      engagement: '',
      status: 'not_contacted',
      notes: '',
      profileUrl: ''
    })
    setShowAddModal(false)
  }

  const updateStatus = (id: number, status: InfluencerStatus) => {
    setInfluencers(influencers.map(inf => 
      inf.id === id 
        ? { ...inf, status, lastContact: new Date().toISOString().split('T')[0] }
        : inf
    ))
  }

  const deleteInfluencer = (id: number) => {
    setInfluencers(influencers.filter(inf => inf.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Influenceurs</h1>
          <p className="text-muted-foreground mt-1">
            Suivi des partenariats et collaborations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.contacted}</p>
              <p className="text-xs text-muted-foreground">Contactés</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.accepted}</p>
              <p className="text-xs text-muted-foreground">Partenaires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un influenceur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as InfluencerStatus | 'all')}
          className="px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Tous les statuts</option>
          {Object.entries(statusConfig).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value as Platform | 'all')}
          className="px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Toutes les plateformes</option>
          {Object.entries(platformConfig).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>

      {/* Liste */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {filteredInfluencers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Aucun influenceur trouvé</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Ajouter le premier influenceur
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredInfluencers.map((influencer) => {
              const StatusIcon = statusConfig[influencer.status].icon
              const PlatformIcon = platformConfig[influencer.platform].icon
              
              return (
                <div key={influencer.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Info principale */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-foreground">{influencer.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${platformConfig[influencer.platform].color}`}>
                          <PlatformIcon className="w-3 h-3" />
                          {influencer.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{influencer.followers} followers</span>
                        {influencer.engagement && <span>• {influencer.engagement} engagement</span>}
                        {influencer.lastContact && <span>• Dernier contact: {influencer.lastContact}</span>}
                      </div>
                      {influencer.notes && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{influencer.notes}</p>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={influencer.status}
                        onChange={(e) => updateStatus(influencer.id, e.target.value as InfluencerStatus)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${statusConfig[influencer.status].color} bg-transparent focus:outline-none`}
                      >
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <option key={key} value={key} className="bg-card text-foreground">
                            {config.label}
                          </option>
                        ))}
                      </select>
                      
                      {influencer.profileUrl && (
                        <a
                          href={influencer.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                      
                      <button
                        onClick={() => deleteInfluencer(influencer.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal Ajout */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a1f] border border-border rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Ajouter un influenceur</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom</label>
                <input
                  type="text"
                  value={newInfluencer.name}
                  onChange={(e) => setNewInfluencer({...newInfluencer, name: e.target.value})}
                  placeholder="Prénom Nom"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pseudo</label>
                <input
                  type="text"
                  value={newInfluencer.username}
                  onChange={(e) => setNewInfluencer({...newInfluencer, username: e.target.value})}
                  placeholder="@username"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Plateforme</label>
                  <select
                    value={newInfluencer.platform}
                    onChange={(e) => setNewInfluencer({...newInfluencer, platform: e.target.value as Platform})}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                    placeholder="10K, 100K..."
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Engagement rate</label>
                <input
                  type="text"
                  value={newInfluencer.engagement}
                  onChange={(e) => setNewInfluencer({...newInfluencer, engagement: e.target.value})}
                  placeholder="5.2%"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">URL du profil</label>
                <input
                  type="url"
                  value={newInfluencer.profileUrl}
                  onChange={(e) => setNewInfluencer({...newInfluencer, profileUrl: e.target.value})}
                  placeholder="https://tiktok.com/@..."
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Statut</label>
                <select
                  value={newInfluencer.status}
                  onChange={(e) => setNewInfluencer({...newInfluencer, status: e.target.value as InfluencerStatus})}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  placeholder="Type de contenu, niche, remarques..."
                  rows={3}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-4 border-t border-border">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={addInfluencer}
                disabled={!newInfluencer.name || !newInfluencer.username}
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
