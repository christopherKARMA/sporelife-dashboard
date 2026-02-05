'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Mail,
  Globe,
  MapPin,
  X,
  ExternalLink,
  Edit2,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { supabase, SupplierDB } from '@/lib/supabase'

const statusConfig = {
  pending: { label: 'À contacter', color: 'bg-gray-500/10 text-gray-400' },
  contacted: { label: 'Contacté', color: 'bg-blue-500/10 text-blue-400' },
  negotiating: { label: 'En négo', color: 'bg-yellow-500/10 text-yellow-400' },
  accepted: { label: 'Validé ✓', color: 'bg-green-500/10 text-green-400' },
  rejected: { label: 'Refusé', color: 'bg-red-500/10 text-red-400' },
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierDB[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<SupplierDB | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    product_type: 'Poudres champignons',
    country: 'France',
    notes: ''
  })

  // Fetch suppliers from Supabase
  const fetchSuppliers = async () => {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching suppliers:', error)
      return
    }

    setSuppliers(data || [])
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await fetchSuppliers()
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('suppliers-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'suppliers' }, () => {
        fetchSuppliers()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredSuppliers = suppliers.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false
    if (filterType !== 'all' && !s.product_type.toLowerCase().includes(filterType.toLowerCase())) return false
    return true
  })

  const updateStatus = async (supplierId: string, newStatus: SupplierDB['status']) => {
    const { error } = await supabase
      .from('suppliers')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', supplierId)

    if (error) {
      console.error('Error updating supplier status:', error)
      return
    }

    setSuppliers(suppliers.map(s => s.id === supplierId ? { ...s, status: newStatus } : s))
  }

  const openAddModal = () => {
    setEditingSupplier(null)
    setFormData({ name: '', contact_name: '', email: '', phone: '', website: '', product_type: 'Poudres champignons', country: 'France', notes: '' })
    setShowModal(true)
  }

  const openEditModal = (supplier: SupplierDB) => {
    setEditingSupplier(supplier)
    setFormData({
      name: supplier.name,
      contact_name: supplier.contact_name || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      website: supplier.website || '',
      product_type: supplier.product_type,
      country: supplier.country,
      notes: supplier.notes || ''
    })
    setShowModal(true)
  }

  const saveSupplier = async () => {
    if (!formData.name.trim()) return
    setIsSaving(true)

    if (editingSupplier) {
      const { error } = await supabase
        .from('suppliers')
        .update({
          name: formData.name,
          contact_name: formData.contact_name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          website: formData.website || null,
          product_type: formData.product_type,
          country: formData.country,
          notes: formData.notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingSupplier.id)

      if (error) {
        console.error('Error updating supplier:', error)
        setIsSaving(false)
        return
      }
    } else {
      const { error } = await supabase
        .from('suppliers')
        .insert({
          name: formData.name,
          contact_name: formData.contact_name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          website: formData.website || null,
          product_type: formData.product_type,
          country: formData.country,
          notes: formData.notes || null,
          status: 'pending'
        })

      if (error) {
        console.error('Error creating supplier:', error)
        setIsSaving(false)
        return
      }
    }

    await fetchSuppliers()
    setIsSaving(false)
    setShowModal(false)
  }

  const deleteSupplier = async (supplierId: string) => {
    if (!confirm('Supprimer ce fournisseur ?')) return

    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', supplierId)

    if (error) {
      console.error('Error deleting supplier:', error)
      return
    }

    setSuppliers(suppliers.filter(s => s.id !== supplierId))
  }

  // Grouper par type
  const groupedSuppliers = filteredSuppliers.reduce((acc, supplier) => {
    let category = 'Autres'
    if (supplier.product_type.includes('Poudre') || supplier.product_type.includes('Extrait')) category = '🍄 Poudres & Extraits'
    else if (supplier.product_type.includes('Packaging') || supplier.product_type.includes('Sachet')) category = '📦 Packaging'
    else if (supplier.product_type.includes('Façonnier') || supplier.product_type.includes('façonnage')) category = '🏭 Façonniers'
    else if (supplier.product_type.includes('Arôme')) category = '🧪 Arômes'
    if (!acc[category]) acc[category] = []
    acc[category].push(supplier)
    return acc
  }, {} as { [key: string]: SupplierDB[] })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p style={{ color: '#a3a3a3' }}>Chargement depuis Supabase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#ffffff' }}>Fournisseurs</h1>
          <p style={{ color: '#a3a3a3' }} className="mt-1">{suppliers.length} contacts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchSuppliers()}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#262626' }}
            title="Rafraîchir"
          >
            <RefreshCw className="w-5 h-5" style={{ color: '#a3a3a3' }} />
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#22c55e', color: '#ffffff' }}>
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = suppliers.filter(s => s.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className="rounded-xl p-2 text-center"
              style={{ backgroundColor: '#171717', border: filterStatus === key ? '1px solid #22c55e' : '1px solid #262626' }}
            >
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>{count}</p>
              <p className="text-xs truncate" style={{ color: '#a3a3a3' }}>{config.label}</p>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm"
          style={{ backgroundColor: '#171717', border: '1px solid #262626', color: '#ffffff' }}
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
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>{category}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categorySuppliers.map((supplier) => {
                const status = statusConfig[supplier.status]
                return (
                  <div key={supplier.id} className="rounded-xl p-4" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate" style={{ color: '#ffffff' }}>{supplier.name}</h3>
                        <div className="flex items-center gap-2 text-xs mt-1" style={{ color: '#737373' }}>
                          <MapPin className="w-3 h-3" />
                          {supplier.country}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={supplier.status}
                          onChange={(e) => updateStatus(supplier.id, e.target.value as SupplierDB['status'])}
                          className={`px-2 py-1 text-xs rounded ${status.color}`}
                          style={{ backgroundColor: 'transparent', border: 'none' }}
                        >
                          {Object.entries(statusConfig).map(([key, { label }]) => (
                            <option key={key} value={key} style={{ backgroundColor: '#171717', color: '#ffffff' }}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>
                        {supplier.product_type}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm mb-3">
                      {supplier.email && (
                        <a href={`mailto:${supplier.email}`} className="flex items-center gap-2" style={{ color: '#737373' }}>
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate text-xs">{supplier.email}</span>
                        </a>
                      )}
                      {supplier.website && (
                        <a href={supplier.website} target="_blank" className="flex items-center gap-2" style={{ color: '#737373' }}>
                          <Globe className="w-3.5 h-3.5" />
                          <span className="truncate text-xs">{supplier.website.replace('https://', '').replace('www.', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {supplier.notes && (
                      <p className="text-xs italic pt-2" style={{ borderTop: '1px solid #262626', color: '#737373' }}>{supplier.notes}</p>
                    )}

                    <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #262626' }}>
                      <button onClick={() => openEditModal(supplier)} className="flex-1 px-3 py-1.5 rounded text-xs" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>
                        <Edit2 className="w-3 h-3 inline mr-1" /> Modifier
                      </button>
                      <button onClick={() => deleteSupplier(supplier.id)} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: '#262626', color: '#ef4444' }}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="text-center py-12 rounded-xl" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
          <p style={{ color: '#a3a3a3' }}>Aucun fournisseur trouvé</p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
          >
            Ajouter le premier fournisseur
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-md rounded-xl p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#171717', border: '1px solid #262626' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: '#ffffff' }}>{editingSupplier ? 'Modifier' : 'Ajouter'} un fournisseur</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" style={{ color: '#737373' }} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Nom entreprise *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Contact</label>
                  <input type="text" value={formData.contact_name} onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Pays</label>
                  <input type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Site web</label>
                <input type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Type de produit</label>
                <select value={formData.product_type} onChange={(e) => setFormData({...formData, product_type: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }}>
                  <option>Poudres champignons</option>
                  <option>Poudres champignons (extraits)</option>
                  <option>Packaging (sachets, boîtes)</option>
                  <option>Sachets stick individuels</option>
                  <option>Sachets doypack</option>
                  <option>Façonnier compléments alimentaires</option>
                  <option>Arômes naturels</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#a3a3a3' }}>Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', color: '#ffffff' }} rows={2} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#262626', color: '#a3a3a3' }}>Annuler</button>
              <button 
                onClick={saveSupplier} 
                disabled={isSaving}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50" 
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
              >
                {isSaving ? 'Enregistrement...' : editingSupplier ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
