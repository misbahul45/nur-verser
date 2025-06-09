'use client'
import React, { useState } from 'react'
import { Menu, X, BookOpen, LogIn } from 'lucide-react'
import { navigation } from '@/constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { signoutAction } from '@/actions/auth.actions'

const AppNavbar = ({ user = null }: { user: any | null }) => {
  const [pathname] = useState('/')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router=useRouter()
  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 shadow-2xl overflow-hidden" aria-label="Main navigation">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-12 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-8 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            <Link href={'/'} className="flex items-center cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="lg:text-2xl sm:text-xl text-lg font-bold text-white tracking-wide">Nur Quran</h1>
              </div>
            </Link>

            <div className="hidden md:flex space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    pathname === item.path
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                      : 'text-emerald-100 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                    >
                      <span className="capitalize">{user.name || user.email?.split('@')[0] || 'User'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-sm border border-emerald-200/50">
                    <DropdownMenuItem
                      onClick={() => router.push('/dashboard')}
                      className="cursor-pointer hover:bg-emerald-50"
                    >
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await signoutAction()
                      }}
                      className="cursor-pointer hover:bg-emerald-50"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  href="/signin"
                  className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </a>
              )}
              
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-emerald-800/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    pathname === item.path || (pathname === '/' && item.path === '/')
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-emerald-100 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Navigate to ${item.label} on mobile`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {!user && (
                <a
                  href="/signin"
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-emerald-100 hover:text-white hover:bg-white/10 transition-all duration-300 border-t border-white/10 mt-2 pt-4"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </a>
              )}
              {user && (
                <div className="border-t border-white/10 mt-2 pt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center space-x-2 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                      >
                        <span className="capitalize">{user.name || user.email?.split('@')[0] || 'User'}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-sm border border-emerald-200/50">
                      <DropdownMenuItem
                        onClick={() => router.push('/dashboard')}
                        className="cursor-pointer hover:bg-emerald-50"
                      >
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                         await signoutAction()
                        }}
                        className="cursor-pointer hover:bg-emerald-50"
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default AppNavbar