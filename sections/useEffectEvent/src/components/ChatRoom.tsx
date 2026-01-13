interface ChatRoomProps {
  roomId: string
  onRoomChange: (roomId: string) => void
  messages: string[]
}

function ChatRoom({ roomId, onRoomChange, messages }: ChatRoomProps) {
  const rooms = ['general', 'random', 'help', 'announcements']

  return (
    <div className="chat-room">
      <div className="room-selector">
        <label>Chat Room:</label>
        <select value={roomId} onChange={(e) => onRoomChange(e.target.value)}>
          {rooms.map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
      </div>

      <div className="messages">
        <h3>Connection Log</h3>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ChatRoom
