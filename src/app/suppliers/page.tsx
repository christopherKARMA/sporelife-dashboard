'use client'

import { useState } from 'react'
import { 
  Plus, 
  Truck,
  Phone,
  Mail,
  Globe,
  MoreVertical,
  Check,
  X,
  Clock,
  MessageSquare
} from 'lucide-react'

interface Supplier {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  product_type: string
  price_quote: number | null
  currency: string
  moq: number | null
  status: 'contacted' | 'negotiating' | 'accepted' | 'rejected' | 'pending'
  notes: string | null
  response_date: string | null
}

const statusConfig = {
  pending: { label: 'À contacter', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Clock },
  contacted: { label: 'Contacté', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: MessageSquare },
  negotiating: { label: 'En négo', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: MessageSquare },
  accepted: { label: 'Accepté', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: Check },
  rejected: { label: 'Refusé', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: X },
}

const productTypes = [
  'Poudre Lion\'s Mane',
  'Poudre Cordyceps',
  'Poudre Reishi',
  'Poudre Chaga',
  'Arômes naturels',
  'Sachets/Packaging',
  'Conditionnement',
  'Étiquettes',
]

// Données de démo
const initialSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'FungiPowder Europe',
    contact_name: 'Marc Dubois',
    email: 'contact@fungipowder.eu',
    phone: '+33 1 23 45 67 89',
    website: 'https://fungipowder.eu',
    product_type: 'Poudre Lion\'s Mane',
    price_quote: null,
    currency: 'EUR',
    moq: null,
    status: 'pending',
    notes: 'Recommandé par un autre entrepreneur',
    response_date: null,
  },
  {
    id: '2',
    name: 'MycoSource',
    contact_name: null,
    email: 'sales@mycosource.com',
    phone: null,
    website: 'https://mycosource.com',
    product_type: 'Poudre Cordyceps',
    price_quote: null,
    currency: 'EUR',
    moq: null,
    status: 'pending',
    notes: 'Trouvé sur Alibaba, vérifié',
    response_date: null,
  },
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSuppliers = suppliers.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false
    if (filterType !== 'all' && s.product_type !== filterType) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fournisseurs</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos contacts et négociations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter fournisseur
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = suppliers.filter(s => s.status === key).length
          return (
            <div key={key} className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className={`text-sm ${config.color.split(' ')[1]}`}>{config.label}</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Tous les statuts</option>
          {Object.entries(statusConfig).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Tous les produits</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Suppliers List */}
      {filteredSuppliers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Truck className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Aucun fournisseur</h3>
          <p className="text-muted-foreground mt-1">
            Commencez par ajouter vos premiers contacts
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ajouter un fournisseur
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSuppliers.map((supplier) => {
            const status = statusConfig[supplier.status]
            const StatusIcon = status.icon

            return (
              <div
                key={supplier.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {supplier.name}
                    </h3>
                    {supplier.contact_name && (
                      <p className="text-sm text-muted-foreground">
                        {supplier.contact_name}
                      </p>
                    )}
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                    {supplier.product_type}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  {supplier.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${supplier.email}`} className="hover:text-primary">
                        {supplier.email}
                      </a>
                    </div>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${supplier.phone}`} className="hover:text-primary">
                        {supplier.phone}
                      </a>
                    </div>
                  )}
                  {supplier.website && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <a href={supplier.website} target="_blank" className="hover:text-primary">
                        {supplier.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>

                {supplier.price_quote && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Devis : <span className="text-foreground font-semibold">{supplier.price_quote} {supplier.currency}</span>
                      {supplier.moq && <span> (MOQ: {supplier.moq})</span>}
                    </p>
                  </div>
                )}

                {supplier.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground italic">
                      {supplier.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-accent transition-colors">
                    Modifier
                  </button>
                  <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                    Mettre à jour statut
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-foreground mb-4">Nouveau fournisseur</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  placeholder="Ex: FungiPowder Europe"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nom du contact
                </label>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@exemple.com"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+33 1 23 45 67 89"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Site web</label>
                <input
                  type="url"
                  placeholder="https://exemple.com"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Type de produit *
                </label>
                <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  {productTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
                <textarea
                  placeholder="Informations supplémentaires..."
                  rows={2}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
