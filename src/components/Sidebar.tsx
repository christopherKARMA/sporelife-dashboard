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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a0a0a] border-b border-neutral-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10">
            <Leaf className="w-5 h-5 text-green-500" />
          </div>
          <span className="font-bold text-white">SporeLife</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`
          lg:hidden fixed top-0 left-0 z-50 h-full w-72
          bg-[#0a0a0a] border-r border-neutral-800
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-500/10">
              <Leaf className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h1 className="font-bold text-white">SporeLife</h1>
              <p className="text-xs text-neutral-500">60 Days Challenge</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-neutral-800">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/settings'
                ? 'bg-green-500 text-white'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            Paramètres
          </Link>
          <div className="mt-4 px-3">
            <div className="text-xs text-neutral-500">
              Jour <span className="text-green-500 font-bold">1</span> / 60
            </div>
            <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full w-[1.67%] bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a0a0a] border-r border-neutral-800 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10">
            <Leaf className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">SporeLife</h1>
            <p className="text-xs text-neutral-500">60 Days Challenge</p>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-neutral-800">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/settings'
                ? 'bg-green-500 text-white'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            Paramètres
          </Link>
          <div className="mt-4 px-3">
            <div className="text-xs text-neutral-500">
              Jour <span className="text-green-500 font-bold">1</span> / 60
            </div>
            <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full w-[1.67%] bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-14 flex-shrink-0" />
    </>
  )
}
