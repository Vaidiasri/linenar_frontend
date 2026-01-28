import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import Auth from '@/components/auth'
import Dashboard from '@/components/dashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'
import './App.css'

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
        path="/"
        element={
          isAuthenticated ? (
            <SidebarProvider>
              <AppSidebar />
              <Dashboard />
            </SidebarProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App
