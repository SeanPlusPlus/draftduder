import { useState } from 'react'
import { useDraftOrder } from '../hooks/useDraftOrder'
import { type Entry, useLeaderboard } from '../hooks/useLeaderboard'

const timeAgo = (ts: string) => {
  const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const EntryDetail = ({ entry }: { entry: Entry }) => {
  const { picks: draftOrder } = useDraftOrder()

  return (
    <div className="board">
      {entry.picks.map((pick) => {
        const team = draftOrder.find((d) => d.pick === pick.slot)
        return (
          <div key={pick.slot} className="prospect-row">
            <span className="prospect-rank">{pick.slot}</span>
            {team && (
              <img
                className="prospect-logo"
                src={team.logo_url}
                alt={team.team}
                loading="lazy"
              />
            )}
            <img
              className="prospect-logo college-logo"
              src={pick.prospect_logo_url}
              alt={pick.prospect_college}
              loading="lazy"
            />
            <div className="prospect-info">
              <span className="prospect-name">{pick.prospect_name}</span>
              <span className="prospect-college">{pick.prospect_position} · {pick.prospect_college}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const Leaderboard = () => {
  const { entries, loading } = useLeaderboard()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <main>
      <span className="tag">Leaderboard</span>
      <h1>
        Who's<br />
        In<span className="dot">.</span>
      </h1>
      <p>
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'} locked in.
        Scores go live when the draft starts.
      </p>

      <div className="board">
        {loading && <div className="feed-empty">Loading...</div>}
        {!loading && entries.length === 0 && (
          <div className="feed-empty">No entries yet.</div>
        )}
        {entries.map((entry) => (
          <div
            key={entry.player_name}
            className={`leaderboard-entry ${expanded === entry.player_name ? 'expanded' : ''}`}
          >
            <div
              className="leaderboard-row"
              onClick={() =>
                setExpanded(expanded === entry.player_name ? null : entry.player_name)
              }
            >
              <span className="leaderboard-name">{entry.player_name}</span>
              <span className="leaderboard-meta">
                {entry.picks.length} picks · {timeAgo(entry.created_at)}
              </span>
              <span className="leaderboard-score">—</span>
            </div>
            {expanded === entry.player_name && <EntryDetail entry={entry} />}
          </div>
        ))}
      </div>

      <div className="footer">v{__APP_VERSION__} — scores pending</div>
    </main>
  )
}
