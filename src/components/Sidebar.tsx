'use client'

import { useState } from 'react'
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
  Leaf,
  Menu,
  X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <>
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
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
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
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
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
    </>
  )

  return (
    <>
      {/* Mobile Header - Fixed with solid background */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-foreground">SporeLife</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar - Solid background */}
      <div className={`
        lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile spacer for fixed header */}
      <div className="lg:hidden h-16 flex-shrink-0" />
    </>
  )
}
