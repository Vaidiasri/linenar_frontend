import { useEffect, useRef, useState, useCallback } from 'react'

interface UseSocketReturn {
  socket: WebSocket | null
  isConnected: boolean
  lastMessage: MessageEvent | null
}

const RECONNECT_INTERVAL = 3000 // 3 seconds
const MAX_RECONNECT_ATTEMPTS = 5

/**
 * Custom hook to manage WebSocket connection
 * @param url WebSocket URL to connect to
 * @param token Authentication token
 */
export const useSocket = (url: string, token: string | null): UseSocketReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null)

  const reconnectAttempts = useRef(0)
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    if (!token) return

    // Prevent multiple connections
    if (socketRef.current?.readyState === WebSocket.OPEN) return

    // Construct WebSocket URL with token
    const wsUrl = new URL(url)
    wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:'
    // Backend expects token as query param since WS headers are limited
    wsUrl.searchParams.append('token', token)

    console.log('Connecting to WebSocket...', wsUrl.toString())

    // Cleanup previous connection if any (defensive)
    if (socketRef.current) {
      socketRef.current.close()
    }

    const ws = new WebSocket(wsUrl.toString())
    socketRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket Connected')
      setIsConnected(true)
      setSocket(ws)
      reconnectAttempts.current = 0 // Reset attempts on success
    }

    ws.onmessage = (event) => {
      setLastMessage(event)
    }

    ws.onclose = (event) => {
      console.log('WebSocket Disconnected', event.code, event.reason)
      setIsConnected(false)
      setSocket(null)
      socketRef.current = null

      // Attempt reconnection if not closed cleanly and not Policy Violation
      if (token && reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS && event.code !== 1008) {
        reconnectTimerRef.current = setTimeout(() => {
          reconnectAttempts.current += 1
          console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`)
          connect()
        }, RECONNECT_INTERVAL)
      } else if (event.code === 1008) {
        console.error('WebSocket Policy Violation (Auth Failed). Not reconnecting.')
        // Optional: Trigger logout or showing error
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error)
      ws.close() // Ensure close handles retry
    }
  }, [url, token])

  useEffect(() => {
    connect()

    return () => {
      // Cleanup on unmount
      if (socketRef.current) {
        socketRef.current.close()
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current)
      }
    }
  }, [connect])

  return { socket, isConnected, lastMessage }
}
