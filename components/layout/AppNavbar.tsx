'use client';
import React, { useState, useMemo } from 'react';
import { Menu, X, BookOpen, LogIn } from 'lucide-react';
import { menuItems } from '@/constants';
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
import { toast } from 'sonner';
import { SidebarTrigger } from '../ui/sidebar';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from '../ui/navigation-menu';
import { useSession } from 'next-auth/react';

const navView=[
  '/',
  '/signin',
  '/signup'
]

const AppNavbar = () => {
  const { data }=useSession();
  const user=data?.user;
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = useMemo(
    () =>
      menuItems.map((item) => {
        return (
          <NavigationMenuItem key={item.title}>
            {item.children ? (
              <>
                <NavigationMenuTrigger className="bg-transparent hover:bg-primary/5 text-white">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={`grid gap-3 p-4 ${item.children.length %2 !== 0 ?"grid-cols-1 w-[300px]":"md:grid-cols-2 lg:w-[600px]"}`}>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.title}
                        title={child.title}
                        href={child.path}
                      >
                        {child.description || `Navigate to ${child.title}`}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link 
                  href={item.path}
                  className="bg-transparent hover:bg-white/10 text-white hover:text-white focus:bg-white/10 focus:text-white"
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        );
      }),
    [pathname]
  );

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-primary/90 via-primary to-primary/80 shadow-lg border-b border-primary/20 backdrop-blur-md ${navView.includes(pathname) ? "block" : "lg:hidden"}`}
      aria-label="Main navigation"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-3 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-3 w-28 h-28 bg-secondary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center border border-white/20 shadow-lg">
                <BookOpen className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">
                Nur Quran
              </h1>
            </div>
          </Link>

          <div className="hidden lg:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="space-x-1">
                {navLinks}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-secondary/20 hover:bg-secondary/30 text-white border-secondary/30 hover:border-secondary/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    <span className="capitalize truncate max-w-[100px] sm:max-w-[120px]">
                      {user.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl">
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard')}
                    className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 text-foreground"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={async () => {
                        try {
                          await signoutAction();
                          router.push('/signin');
                        } catch (error) {
                          toast.error('signout failed');
                        }
                      }}
                      variant="destructive"
                      className="cursor-pointer w-full justify-start bg-destructive/10 hover:bg-destructive/20 text-destructive hover:text-destructive"
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className="hidden lg:flex items-center space-x-2 bg-secondary/20 hover:bg-secondary/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 border border-secondary/30 hover:border-secondary/50"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
            
            <SidebarTrigger className="text-white hover:bg-white/10" />
          </div>
        </div>
      </div>
    </nav>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string; children: React.ReactNode }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link 
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none text-primary/90">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default AppNavbar;