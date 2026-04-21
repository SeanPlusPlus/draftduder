import { useMessages } from '../hooks/useMessages'

const timeAgo = (ts: string) => {
  const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export const Home = () => {
  const messages = useMessages()

  return (
    <main>
      <span className="tag">live</span>
      <h1>
        draft<br />
        duder<span className="dot">.</span>
      </h1>
      <p>Push messages from the terminal. They show up here in realtime.</p>

      <div className="feed">
        {messages.length === 0 && (
          <div className="feed-empty">
            No messages yet. Run <code>bun run push "hello"</code> to start.
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="feed-item">
            <span className="feed-content">{msg.content}</span>
            <span className="feed-time">{timeAgo(msg.created_at)}</span>
          </div>
        ))}
      </div>

      <div className="footer">v{__APP_VERSION__} — realtime via supabase</div>
    </main>
  )
}
