import { useState, useEffect, useEffectEvent } from 'react'
import ChatRoom from '../components/ChatRoom'
import ThemeToggle from '../components/ThemeToggle'

/**
 * SOLUTION: Use useEffectEvent to read latest props/state without
 * causing Effect to re-run.
 *
 * Effect Events:
 * - Are non-reactive (don't trigger Effect re-runs)
 * - Always read the latest values
 * - Must only be called from inside Effects
 */
function Solution() {
  const [roomId, setRoomId] = useState('general')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [messages, setMessages] = useState<string[]>([])

  // Extract the analytics call into an Effect Event
  const onConnected = useEffectEvent(() => {
    console.log('📊 Analytics: Connected with theme:', theme)
    // theme is read here but doesn't cause Effect to re-run
  })

  useEffect(() => {
    console.log(`🔌 Connecting to "${roomId}" room...`)
    setMessages(prev => [...prev, `Connected to ${roomId}`])

    // Call the Effect Event (has access to latest theme)
    onConnected()

    return () => {
      console.log(`🔌 Disconnecting from "${roomId}" room...`)
      setMessages(prev => [...prev, `Disconnected from ${roomId}`])
    }
  }, [roomId]) // ✅ onConnected is stable, theme not needed

  return (
    <div className="example">
      <div className="explanation">
        <h2>✅ The Solution</h2>
        <p>
          Now changing the theme doesn't cause reconnection! The
          analytics still logs the correct theme value.
        </p>
        <p>
          <code>useEffectEvent</code> lets us read the latest theme
          without including it in the dependency array.
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

export default Solution
