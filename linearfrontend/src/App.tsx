import { Button } from '@/components/ui/button'
import { useLinearViewer } from './hooks/use-linear-viewer'
import './App.css'

function App() {
  const { data: viewer, isLoading, error } = useLinearViewer()

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8 p-8 max-w-2xl w-full">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">Linear Secure Fetch</h1>
          <p className="text-xl text-slate-300">TanStack Query + Axios + Vite Env</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Current Viewer</h2>

          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/20 text-red-200 rounded-lg">
              Error fetching viewer: {(error as Error).message}
            </div>
          )}

          {viewer && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {viewer.avatarUrl && (
                <img
                  src={viewer.avatarUrl}
                  alt={viewer.name}
                  className="size-20 rounded-full border-4 border-white/20"
                />
              )}
              <div className="text-left bg-black/20 p-6 rounded-xl w-full">
                <p className="text-slate-400 text-sm uppercase tracking-wider font-bold mb-1">
                  Authenticated As
                </p>
                <p className="text-2xl text-white font-medium">{viewer.name}</p>
                <p className="text-slate-300">{viewer.email}</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                    {viewer.timezone || 'UTC'}
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                    ID: {viewer.id}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10">
            <Button onClick={() => window.location.reload()}>Refresh Data</Button>
          </div>
        </div>

        <div className="text-sm text-slate-400 space-y-2">
          <p>✅ TanStack Query v5 Integrated</p>
          <p>✅ Secure Environment Variables</p>
          <p>✅ Typed API Responses</p>
        </div>
      </div>
    </div>
  )
}

export default App
