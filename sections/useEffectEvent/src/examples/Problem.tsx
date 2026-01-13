import { useState, useEffect } from 'react'
import ChatRoom from '../components/ChatRoom'
import ThemeToggle from '../components/ThemeToggle'

/**
 * PROBLEM: When theme changes, the Effect re-runs and reconnects to chat.
 *
 * This happens because:
 * 1. Effect depends on `theme` (needs latest value for logging)
 * 2. When theme changes, Effect cleanup runs (disconnect)
 * 3. Effect runs again (reconnect)
 *
 * Result: Unnecessary disconnection/reconnection
 */
function Problem() {
  const [roomId, setRoomId] = useState('general')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    // Simulate connecting to chat room
    console.log(`🔌 Connecting to "${roomId}" room...`)
    setMessages(prev => [...prev, `Connected to ${roomId}`])

    // Log analytics event with current theme
    console.log('📊 Analytics: Connected with theme:', theme)

    // Cleanup: disconnect
    return () => {
      console.log(`🔌 Disconnecting from "${roomId}" room...`)
      setMessages(prev => [...prev, `Disconnected from ${roomId}`])
    }
  }, [roomId, theme]) // ⚠️ Problem: theme in dependency array

  return (
    <div className="example">
      <div className="explanation">
        <h2>❌ The Problem</h2>
        <p>
          Watch the console: changing the theme causes the chat to
          disconnect and reconnect, even though the room hasn't changed.
        </p>
        <p>
          The Effect needs to read the latest <code>theme</code> for
          analytics, but including it in dependencies causes unnecessary
          re-runs.
        </p>
      </div>

      <ThemeToggle theme={theme} onThemeChange={setTheme} />

      <ChatRoom
        roomId={roomId}
        onRoomChange={setRoomId}
        messages={messages}
      />
    </div>
  )
}

export default Problem
