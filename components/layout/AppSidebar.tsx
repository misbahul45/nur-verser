'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { User, Settings, LogOut } from 'lucide-react'
import { menuItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

const AppSidebar = () => {
  const pathName = usePathname()

  return (
    <>
      {pathName !== '/' && pathName !== '/signin' && pathName !== '/signup' && (
        <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
          <SidebarHeader className="border-b border-gray-200 bg-white">
            <div className="flex items-center px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-primary-foreground font-bold text-sm">QC</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900">Nur Quran</span>
                </div>
              </div>
              <div className="ml-auto md:hidden">
                <SidebarTrigger className="hover:bg-gray-50 transition-colors" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-4 bg-white">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathName === item.path}
                    tooltip={item.title}
                    className="group relative overflow-hidden hover:bg-gray-50 transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-r-2 data-[state=active]:border-primary rounded-lg"
                  >
                    <a href={item.path} className="flex items-center gap-3 px-3 py-2.5 w-full">
                      <item.icon
                        className={`h-5 w-5 transition-colors ${pathName === item.path ? 'text-primary' : 'text-gray-500'}`}
                      />
                      <span className="font-medium text-gray-700 data-[state=active]:text-primary">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-4 bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 justify-start p-3 hover:bg-gray-50 transition-all duration-200 rounded-lg text-gray-700"
                >
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-lg border border-gray-200">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <User className="h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  )
}

export default AppSidebar