'use client'

import { useState } from 'react'
import { 
  Plus, 
  Truck,
  Phone,
  Mail,
  Globe,
  MapPin,
  Check,
  X,
  Clock,
  MessageSquare,
  ExternalLink
} from 'lucide-react'
import { suppliers as initialSuppliers, Supplier } from '@/lib/data'

const statusConfig = {
  pending: { label: 'À contacter', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Clock },
  contacted: { label: 'Contacté', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: MessageSquare },
  negotiating: { label: 'En négo', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: MessageSquare },
  accepted: { label: 'Validé ✓', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: Check },
  rejected: { label: 'Refusé', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: X },
}

const productTypeLabels: { [key: string]: string } = {
  'Poudres champignons (extraits)': '🍄 Poudres',
  'Poudres champignons': '🍄 Poudres',
  'Extraits végétaux & champignons': '🍄 Extraits',
  'Packaging (sachets, boîtes)': '📦 Packaging',
  'Sachets stick individuels': '📦 Sachets stick',
  'Sachets doypack': '📦 Doypack',
  'Packaging alimentaire': '📦 Packaging',
  'Façonnier compléments alimentaires': '🏭 Façonnier',
  'Conseil réglementaire + façonnage': '🏭 Conseil/Façon',
  'Arômes naturels': '🧪 Arômes',
  'Arômes alimentaires': '🧪 Arômes',
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSuppliers = suppliers.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false
    if (filterType !== 'all' && !s.product_type.toLowerCase().includes(filterType.toLowerCase())) return false
    return true
  })

  const updateStatus = (supplierId: string, newStatus: Supplier['status']) => {
    setSuppliers(suppliers.map(s => s.id === supplierId ? { ...s, status: newStatus } : s))
  }

  // Grouper par type de produit
  const groupedSuppliers = filteredSuppliers.reduce((acc, supplier) => {
    let category = 'Autres'
    if (supplier.product_type.includes('Poudre') || supplier.product_type.includes('Extrait')) {
      category = '🍄 Poudres & Extraits'
    } else if (supplier.product_type.includes('Packaging') || supplier.product_type.includes('Sachet')) {
      category = '📦 Packaging'
    } else if (supplier.product_type.includes('Façonnier') || supplier.product_type.includes('façonnage')) {
      category = '🏭 Façonniers'
    } else if (supplier.product_type.includes('Arôme')) {
      category = '🧪 Arômes'
    }
    if (!acc[category]) acc[category] = []
    acc[category].push(supplier)
    return acc
  }, {} as { [key: string]: Supplier[] })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Fournisseurs</h1>
        <p className="text-muted-foreground mt-1">
          {suppliers.length} contacts • {suppliers.filter(s => s.status === 'accepted').length} validés
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2 lg:gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = suppliers.filter(s => s.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className={`bg-card border rounded-xl p-2 lg:p-4 text-center transition-colors ${
                filterStatus === key ? 'border-primary' : 'border-border'
              }`}
            >
              <p className="text-xl lg:text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground truncate">{config.label}</p>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Tous les types</option>
          <option value="poudre">🍄 Poudres</option>
          <option value="packaging">📦 Packaging</option>
          <option value="façon">🏭 Façonniers</option>
          <option value="arôme">🧪 Arômes</option>
        </select>
      </div>

      {/* Suppliers by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSuppliers).map(([category, categorySuppliers]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-foreground mb-3">{category}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categorySuppliers.map((supplier) => {
                const status = statusConfig[supplier.status]

                return (
                  <div
                    key={supplier.id}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {supplier.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.country}
                        </div>
                      </div>
                      <select
                        value={supplier.status}
                        onChange={(e) => updateStatus(supplier.id, e.target.value as Supplier['status'])}
                        className={`px-2 py-1 text-xs rounded border ${status.color} bg-transparent cursor-pointer`}
                      >
                        {Object.entries(statusConfig).map(([key, { label }]) => (
                          <option key={key} value={key} className="bg-card text-foreground">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                        {productTypeLabels[supplier.product_type] || supplier.product_type}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm mb-3">
                      {supplier.email && (
                        <a 
                          href={`mailto:${supplier.email}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate text-xs">{supplier.email}</span>
                        </a>
                      )}
                      {supplier.website && (
                        <a 
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span className="truncate text-xs">{supplier.website.replace('https://', '').replace('www.', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {supplier.notes && (
                      <p className="text-xs text-muted-foreground italic border-t border-border pt-2">
                        {supplier.notes}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
