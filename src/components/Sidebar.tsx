'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Video, 
  CheckSquare, 
  Truck, 
  BarChart3, 
  Settings,
  Tv,
  Leaf
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Vidéos', href: '/videos', icon: Video },
  { name: 'Plan d\'action', href: '/tasks', icon: CheckSquare },
  { name: 'Fournisseurs', href: '/suppliers', icon: Truck },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
  { name: 'Mode Film', href: '/film-mode', icon: Tv },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-foreground">SporeLife</h1>
          <p className="text-xs text-muted-foreground">60 Days Challenge</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
          Paramètres
        </Link>
        <div className="mt-4 px-3">
          <div className="text-xs text-muted-foreground">
            Jour <span className="text-primary font-bold">1</span> / 60
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-[1.67%] bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
