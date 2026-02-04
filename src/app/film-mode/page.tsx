'use client'

import { 
  Video, 
  CheckSquare, 
  Users, 
  TrendingUp,
  Leaf,
  Tv,
  Calendar,
  Target
} from 'lucide-react'

// Ce mode est conçu pour être filmé - pas de prix, pas de contacts, juste les stats et la progression

export default function FilmModePage() {
  // Données à afficher publiquement
  const currentDay = 1
  const totalDays = 60
  const progressPercent = (currentDay / totalDays) * 100

  const stats = [
    { label: 'Jour', value: currentDay, suffix: `/${totalDays}`, icon: Calendar },
    { label: 'Vidéos publiées', value: 0, icon: Video },
    { label: 'Tâches complétées', value: 0, suffix: '/24', icon: CheckSquare },
    { label: 'Followers', value: 0, icon: Users },
  ]

  const milestones = [
    { day: 1, title: 'Lancement', done: true },
    { day: 7, title: 'Premiers contacts fournisseurs', done: false },
    { day: 14, title: 'Échantillons reçus', done: false },
    { day: 21, title: 'Design packaging validé', done: false },
    { day: 30, title: 'Commande production', done: false },
    { day: 45, title: 'Premiers produits reçus', done: false },
    { day: 60, title: '🎉 Lancement officiel', done: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      {/* Header avec animation */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold text-foreground">SporeLife</h1>
            <p className="text-primary font-medium">60 Days Challenge 🍄</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4">
          <Tv className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="text-sm">Mode Film activé</span>
        </div>
      </div>

      {/* Progress bar géante */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Progression</h2>
            <span className="text-4xl font-bold text-primary">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="h-6 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Jour 1</span>
            <span>Jour 30</span>
            <span>Jour 60</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {stat.value}
              {stat.suffix && <span className="text-xl text-muted-foreground">{stat.suffix}</span>}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Objectifs du challenge
          </h2>

          <div className="relative">
            {/* Ligne de progression */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.day} className="relative flex items-center gap-6">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-bold
                    ${milestone.done 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {milestone.done ? '✓' : milestone.day}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${milestone.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-sm text-muted-foreground">Jour {milestone.day}</p>
                  </div>
                  {milestone.done && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                      Complété ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-muted-foreground">
        <p>Suivez notre aventure sur TikTok @sporelife</p>
        <p className="text-sm mt-1">De l'idée au produit en 60 jours 🚀</p>
      </div>
    </div>
  )
}
