'use client';
import React, { useState, useMemo } from 'react';
import { Menu, X, BookOpen, LogIn } from 'lucide-react';
import { navigation } from '@/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';
import { signoutAction } from '@/actions/auth.actions';

const AppNavbar = ({ user = null }: { user: any | null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = useMemo(
    () =>
      navigation.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            pathname === item.path || (pathname === '/' && item.path === '/')
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-emerald-100 hover:text-white hover:bg-white/10'
          }`}
          aria-label={`Navigate to ${item.label}`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      )),
    [pathname]
  );

  return (
    <nav
      className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 shadow-lg"
      aria-label="Main navigation"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-3 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-3 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-white/20 to-white/10 rounded-md flex items-center justify-center border border-white/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide">
                Nur Quran
              </h1>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks}
          </div>

          <div className="flex items-center space-x-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    <span className="capitalize truncate max-w-[100px] sm:max-w-[120px]">
                      {user.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 bg-white/90 border border-emerald-200/50">
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard')}
                    className="cursor-pointer hover:bg-emerald-50"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      try {
                        await signoutAction();
                        router.push('/signin');
                      } catch (error) {
                        console.error('Sign out failed:', error);
                      }
                    }}
                    className="cursor-pointer hover:bg-emerald-50"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className="hidden lg:flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-white/10 p-1.5 rounded-md transition-all duration-300"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-emerald-800/95 border-t border-white/10 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="px-3 py-2 space-y-1.5">
            {navLinks}
            {!user && (
              <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:text-white hover:bg-white/10 transition-all duration-300 border-t border-white/10"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
            {user && (
              <div className="border-t border-white/10 pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await signoutAction();
                      setIsMobileMenuOpen(false);
                      router.push('/signin');
                    } catch (error) {
                      console.error('Sign out failed:', error);
                    }
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;