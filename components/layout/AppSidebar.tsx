'use client'
import React, { useMemo, useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { User, Settings, LogOut, ChevronRight } from 'lucide-react'
import { menuItems } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { UserSession } from '@/types'
import Link from 'next/link'
import { signoutAction } from '@/actions/auth.actions'
import { toast } from 'sonner'

interface MenuItemChild {
  title: string
  path: string
  icon?: React.ElementType
}

interface MenuItem {
  title: string
  path: string
  icon: React.ElementType
  children?: MenuItemChild[];
}

const AppSidebar = ({ user }:{ user?:any }) => {
  const router=useRouter();
  const pathName = usePathname();
  const [openItems, setOpenItems] = useState(new Set<string>());

  const toggleItem = (title: string): void => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(title)) {
      newOpenItems.delete(title)
    } else {
      newOpenItems.add(title)
    }
    setOpenItems(newOpenItems)
  }

  const isParentActive = (item: MenuItem): boolean => {
    if (item.children) {
      return item.children.some((child: MenuItemChild) => pathName === child.path) || pathName === item.path
    }
    return pathName === item.path
  }

  const isPath = useMemo(() => pathName === '/' || pathName === '/signin' || pathName === '/signup', [pathName]);


  return (
    <div className={`${isPath?'lg:hidden':'block'}`}>
        <Sidebar className={`border-r border-gray-200 bg-white shadow-sm`}>
          <SidebarHeader className="border-b border-gray-200 bg-white">
            <div className="flex items-center px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-primary-foreground font-bold text-sm">NQ</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Nur Quran</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-4 bg-white">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item: MenuItem) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible open={openItems.has(item.title)} onOpenChange={() => toggleItem(item.title)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isParentActive(item)}
                          tooltip={item.title}
                          className="group relative overflow-hidden hover:bg-gray-50 transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-r-2 data-[state=active]:border-primary rounded-lg"
                        >
                          <div className="flex items-center gap-3 px-3 py-2.5 w-full">
                            <item.icon
                              className={`h-5 w-5 transition-colors ${isParentActive(item) ? 'text-primary' : 'text-gray-500'}`}
                            />
                            <span className="font-medium text-gray-700">{item.title}</span>
                            <ChevronRight
                              className={`ml-auto h-4 w-4 transition-transform ${openItems.has(item.title) ? 'rotate-90' : ''}`}
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child: MenuItemChild) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathName === child.path}
                                className="hover:bg-gray-50 transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg"
                              >
                                <a href={child.path} className="flex items-center gap-3 px-6 py-2 w-full">
                                  {child.icon && (
                                    <child.icon
                                      className={`h-4 w-4 transition-colors ${pathName === child.path ? 'text-primary' : 'text-gray-500'}`}
                                    />
                                  )}
                                  <span className="text-sm text-gray-700">{child.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
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
                        <span className="font-medium text-gray-700">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-4 bg-white">
              {user?.id?(
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
                    <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Link href={'/profile'}>
                        <User className="h-4 w-4" />
                        <span>View Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={async() =>{
                      try {
                        await signoutAction();
                        router.push('/signin');
                      } catch (error) {
                        toast.error('signout failed');
                      }
                    }} className="flex items-center gap-2 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ):(
                <div className="flex w-full">
                  <Button
                    className='w-full cursor-pointer'
                    asChild
                  >
                    <Link href={'/signin'}>
                        <User size={16} className='font-bold text-white' />
                        <span className="font-medium">Login</span>
                    </Link>
                  </Button>
                </div>
              )}
          </SidebarFooter>
        </Sidebar>
    </div>
  )
}

export default AppSidebar