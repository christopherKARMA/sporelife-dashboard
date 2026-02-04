'use client'

import { useState } from 'react'
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Database,
  Calendar,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [challengeStartDate, setChallengeStartDate] = useState('2024-02-04')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Configurez votre dashboard SporeLife
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Challenge Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Challenge 60 Jours</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Date de début du challenge
              </label>
              <input
                type="date"
                value={challengeStartDate}
                onChange={(e) => setChallengeStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Le compteur de jours sera calculé à partir de cette date
              </p>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Profil</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nom de la marque
              </label>
              <input
                type="text"
                defaultValue="SporeLife"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Membres de l'équipe
              </label>
              <input
                type="text"
                defaultValue="Chris, Lucas"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Bell className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Rappels quotidiens</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir un rappel pour filmer et publier
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Données</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Exporter les données</p>
                <p className="text-sm text-muted-foreground">
                  Télécharger toutes vos données en JSON
                </p>
              </div>
              <button className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:bg-accent transition-colors">
                Exporter
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div>
                <p className="font-medium text-red-400">Réinitialiser</p>
                <p className="text-sm text-muted-foreground">
                  Supprimer toutes les données et recommencer
                </p>
              </div>
              <button className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors">
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Save className="w-5 h-5" />
        {saved ? 'Sauvegardé !' : 'Sauvegarder'}
      </button>
    </div>
  )
}
