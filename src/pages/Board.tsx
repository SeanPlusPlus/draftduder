import { useProspects } from '../hooks/useProspects'

const posColor: Record<string, string> = {
  QB: '#e74c3c',
  RB: '#2ecc71',
  WR: '#3498db',
  TE: '#e67e22',
  OT: '#9b59b6',
  OG: '#9b59b6',
  C: '#9b59b6',
  EDGE: '#e74c3c',
  DT: '#e74c3c',
  LB: '#f39c12',
  CB: '#1abc9c',
  S: '#1abc9c',
}

export const Board = () => {
  const { prospects, loading } = useProspects()

  return (
    <main>
      <span className="tag">2026 NFL Draft</span>
      <h1>
        Best<br />
        Available<span className="dot">.</span>
      </h1>
      <p>ESPN's top prospects — scraped, stored, rendered.</p>

      <div className="board">
        {loading && <div className="feed-empty">Loading...</div>}
        {!loading && prospects.length === 0 && (
          <div className="feed-empty">No prospects loaded yet.</div>
        )}
        {prospects.map((p) => (
          <div key={p.id} className="prospect-row">
            <span className="prospect-rank">{p.rank}</span>
            <img
              className="prospect-logo"
              src={p.logo_url}
              alt={p.college}
              loading="lazy"
            />
            <div className="prospect-info">
              <span className="prospect-name">{p.name}</span>
              <span className="prospect-college">{p.college}</span>
            </div>
            <span
              className="prospect-pos"
              style={{ background: `${posColor[p.position] ?? '#666'}25`, color: posColor[p.position] ?? '#666' }}
            >
              {p.position}
            </span>
          </div>
        ))}
      </div>

      <div className="footer">v{__APP_VERSION__} — data via espn</div>
    </main>
  )
}
