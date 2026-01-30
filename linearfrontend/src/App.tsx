import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import Auth from '@/components/auth'
import Dashboard from '@/components/dashboard'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Teams from '@/pages/Teams'
import Members from '@/pages/Members'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route
        element={
          isAuthenticated ? (
            <SidebarProvider className="h-svh overflow-hidden">
              <AppSidebar />
              <SidebarInset>
                <Outlet />
              </SidebarInset>
            </SidebarProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings/members" element={<Members />} />
      </Route>
    </Routes>
  )
}

export default App
