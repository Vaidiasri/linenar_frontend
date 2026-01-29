import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from '@/components/ui/sidebar'

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

function NavLeafItem({ item }: { item: NavItem }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function NavCollapsibleItem({ item }: { item: NavItem }) {
  const isLink = item.url && item.url !== '#'

  return (
    <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
      <SidebarMenuItem>
        {isLink ? <NavSplitTrigger item={item} /> : <NavFullTrigger item={item} />}

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link to={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function NavSplitTrigger({ item }: { item: NavItem }) {
  return (
    <>
      <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      <CollapsibleTrigger asChild>
        <SidebarMenuAction className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90">
          <ChevronRight />
          <span className="sr-only">Toggle</span>
        </SidebarMenuAction>
      </CollapsibleTrigger>
    </>
  )
}

function NavFullTrigger({ item }: { item: NavItem }) {
  return (
    <CollapsibleTrigger asChild>
      <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
  )
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0
          return hasSubItems ? (
            <NavCollapsibleItem key={item.title} item={item} />
          ) : (
            <NavLeafItem key={item.title} item={item} />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
