import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Menu as MenuIcon } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import './App.css'

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 md:hidden">
            <SidebarTrigger>
              <MenuIcon className="size-4" />
            </SidebarTrigger>
          </div>
          <div className="flex items-center gap-2 px-4">
            <span className="text-sm font-medium text-muted-foreground">My Issues</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Today</h2>
                <span className="text-sm text-muted-foreground">Mon, Jan 27</span>
              </div>

              <div className="space-y-4">
                {/* Issue Item 1 */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-xs text-muted-foreground font-mono">LIN-42</span>
                  </div>
                  <div className="size-4 rounded-full border-2 border-orange-500/20 bg-orange-500/10 flex items-center justify-center">
                    <div className="size-1.5 rounded-full bg-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      Refactor sidebar navigation to support collapsible state
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h.01" />
                        <path d="M12 14V4" />
                        <path d="M12 14h.01" />
                      </svg>
                    </div>
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                      JD
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Issue Item 2 */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-xs text-muted-foreground font-mono">LIN-45</span>
                  </div>
                  <div className="size-4 rounded-full border-2 border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                    <div className="size-1.5 rounded-full bg-blue-500/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      Fix styling inconsistencies in mobile drawer
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-5 flex items-center justify-center text-orange-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </div>
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                      JD
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Issue Item 3 */}
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-xs text-muted-foreground font-mono">LIN-51</span>
                  </div>
                  <div className="size-4 rounded-full border-2 border-zinc-500/20 bg-zinc-500/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground line-through truncate group-hover:text-primary transition-colors">
                      Write documentation for the new component library
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-5 flex items-center justify-center text-zinc-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h.01" />
                        <path d="M12 14V4" />
                        <path d="M12 14h.01" />
                      </svg>
                    </div>
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                      JD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
