import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useSocket } from '@/hooks/use-socket'
import { apiSlice } from '@/store/api/apiSlice'

// WebSocket URL derivation
const WS_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/ws'

interface SocketContextType {
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({ isConnected: false })

export const useSocketContext = () => useContext(SocketContext)

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const token = localStorage.getItem('access_token')
  const { isConnected, lastMessage } = useSocket(WS_URL, token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data)
        const eventType = data.event

        // Handle different event types
        switch (eventType) {
          case 'ISSUE_CREATED':
            dispatch(apiSlice.util.invalidateTags(['Issue', 'Dashboard']))
            toast.success(`New issue created: ${data.title}`)
            break

          case 'ISSUE_UPDATED':
            dispatch(apiSlice.util.invalidateTags(['Issue', 'Dashboard']))
            if (data.issue_id) {
              dispatch(apiSlice.util.invalidateTags([{ type: 'Issue', id: data.issue_id }]))
            }
            toast.info(`Issue updated: ${data.title}`)
            break

          case 'ISSUE_DELETED':
            dispatch(apiSlice.util.invalidateTags(['Issue', 'Dashboard']))
            toast.error(`Issue deleted: ${data.title}`)
            break

          default:
            console.log('Unknown event:', eventType)
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }
  }, [lastMessage, dispatch])

  return <SocketContext.Provider value={{ isConnected }}>{children}</SocketContext.Provider>
}
