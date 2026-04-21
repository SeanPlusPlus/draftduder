import { useDraftOrder } from '../hooks/useDraftOrder'

export const Order = () => {
  const { picks, loading } = useDraftOrder()

  return (
    <main>
      <span className="tag">Round 1</span>
      <h1>
        Draft<br />
        Order<span className="dot">.</span>
      </h1>
      <p>The 32 first-round picks of the 2026 NFL Draft.</p>

      <div className="board">
        {loading ? (
          <div className="feed-empty">Loading...</div>
        ) : picks.length === 0 ? (
          <div className="feed-empty">No draft order loaded yet.</div>
        ) : picks.map((p) => (
          <div key={p.id} className="prospect-row">
            <span className="prospect-rank">{p.pick}</span>
            <img
              className="prospect-logo"
              src={p.logo_url}
              alt={p.team}
              loading="lazy"
            />
            <div className="prospect-info">
              <span className="prospect-name">{p.team}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">v{__APP_VERSION__} — data via espn</div>
    </main>
  )
}
