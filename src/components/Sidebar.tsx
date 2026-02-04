'use client'

import { useState, useEffect } from 'react'
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
  X,
  Users
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Vidéos', href: '/videos', icon: Video },
  { name: 'Plan d\'action', href: '/tasks', icon: CheckSquare },
  { name: 'Influenceurs', href: '/influencers', icon: Users },
  { name: 'Fournisseurs', href: '/suppliers', icon: Truck },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
  { name: 'Mode Film', href: '/film-mode', icon: Tv },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fermer le menu quand on change de page
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Mobile Header - Fixed */}
      <header 
        className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 px-4 flex items-center justify-between"
        style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #262626' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          >
            <Leaf className="w-5 h-5" style={{ color: '#22c55e' }} />
          </div>
          <span className="font-bold" style={{ color: '#ffffff' }}>SporeLife</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#262626' }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" style={{ color: '#ffffff' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: '#ffffff' }} />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#0a0a0a', borderRight: '1px solid #262626' }}
      >
        {/* Logo */}
        <div 
          className="flex items-center justify-between px-4 h-16"
          style={{ borderBottom: '1px solid #262626' }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            >
              <Leaf className="w-5 h-5" style={{ color: '#22c55e' }} />
            </div>
            <div>
              <h1 className="font-bold" style={{ color: '#ffffff' }}>SporeLife</h1>
              <p className="text-xs" style={{ color: '#737373' }}>60 Days Challenge</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#171717' }}
          >
            <X className="w-5 h-5" style={{ color: '#a3a3a3' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: isActive ? '#22c55e' : 'transparent',
                  color: isActive ? '#ffffff' : '#a3a3a3'
                }}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid #262626' }}>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ 
              backgroundColor: pathname === '/settings' ? '#22c55e' : 'transparent',
              color: pathname === '/settings' ? '#ffffff' : '#a3a3a3'
            }}
          >
            <Settings className="w-5 h-5" />
            Paramètres
          </Link>
          <div className="mt-4 px-3">
            <div className="text-xs" style={{ color: '#737373' }}>
              Jour <span style={{ color: '#22c55e', fontWeight: 'bold' }}>1</span> / 60
            </div>
            <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
              <div className="h-full rounded-full" style={{ width: '1.67%', backgroundColor: '#22c55e' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:flex flex-col w-64 flex-shrink-0"
        style={{ backgroundColor: '#0a0a0a', borderRight: '1px solid #262626' }}
      >
        {/* Logo */}
        <div 
          className="flex items-center gap-3 px-6 py-5"
          style={{ borderBottom: '1px solid #262626' }}
        >
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          >
            <Leaf className="w-6 h-6" style={{ color: '#22c55e' }} />
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: '#ffffff' }}>SporeLife</h1>
            <p className="text-xs" style={{ color: '#737373' }}>60 Days Challenge</p>
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: isActive ? '#22c55e' : 'transparent',
                  color: isActive ? '#ffffff' : '#a3a3a3'
                }}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid #262626' }}>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ 
              backgroundColor: pathname === '/settings' ? '#22c55e' : 'transparent',
              color: pathname === '/settings' ? '#ffffff' : '#a3a3a3'
            }}
          >
            <Settings className="w-5 h-5" />
            Paramètres
          </Link>
          <div className="mt-4 px-3">
            <div className="text-xs" style={{ color: '#737373' }}>
              Jour <span style={{ color: '#22c55e', fontWeight: 'bold' }}>1</span> / 60
            </div>
            <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#262626' }}>
              <div className="h-full rounded-full" style={{ width: '1.67%', backgroundColor: '#22c55e' }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
