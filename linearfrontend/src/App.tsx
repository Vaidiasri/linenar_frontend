import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Menu as MenuIcon } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import './App.css'

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger>
            <MenuIcon className="size-4" />
          </SidebarTrigger>
          <span className="font-semibold">Menu</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
