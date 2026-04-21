import { Link } from 'react-router'
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
      <span className="tag">2026 NFL Draft</span>
      <h1>
        draft<br />
        duder<span className="dot">.</span>
      </h1>
      <p>
        10 players. 32 picks. 100 prospects. Predict the first round of the
        2026 NFL Draft and score points for accuracy.{' '}
        <Link to="/about" className="inline-link">How scoring works →</Link>
      </p>

      <div className="card-grid">
        <Link to="/board" className="card card-link">
          <h3>Board</h3>
          <p>Browse the top 100 prospects.</p>
        </Link>
        <Link to="/about" className="card card-link">
          <h3>Scoring</h3>
          <p>7 pts max per slot. 224 max total.</p>
        </Link>
      </div>

      <div className="feed">
        <h3 className="feed-header">Activity</h3>
        {messages.length === 0 && (
          <div className="feed-empty">No activity yet.</div>
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
