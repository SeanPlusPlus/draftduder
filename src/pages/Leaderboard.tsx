import { useMemo, useState } from 'react'
import { useActualPicks } from '../hooks/useActualPicks'
import { useDraftOrder } from '../hooks/useDraftOrder'
import { type Entry, type EntryType, useLeaderboard } from '../hooks/useLeaderboard'
import { type ActualPickMap, scoreEntry } from '../lib/scoring'

const timeAgo = (ts: string) => {
  const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const PickScoreBadge = ({ points }: { points: number }) => {
  const cls =
    points === 7 ? 'pick-score exact' :
    points >= 5 ? 'pick-score close' :
    points >= 1 ? 'pick-score far' :
    'pick-score miss'
  return <span className={cls}>+{points}</span>
}

const EntryDetail = ({
  entry,
  actuals,
  draftStarted,
}: {
  entry: Entry
  actuals: ActualPickMap
  draftStarted: boolean
}) => {
  const { picks: draftOrder } = useDraftOrder()
  const scored = draftStarted ? scoreEntry(
    entry.picks.map((p) => ({ slot: p.slot, prospectId: p.prospect_id })),
    actuals,
  ) : null

  return (
    <div className="board">
      {entry.picks.map((pick, i) => {
        const team = draftOrder.find((d) => d.pick === pick.slot)
        const ps = scored?.pickScores[i]
        const isScored = ps && actuals.has(pick.prospect_id)
        return (
          <div
            key={pick.slot}
            className={`prospect-row ${isScored ? (ps.points === 7 ? 'row-exact' : ps.points >= 5 ? 'row-close' : ps.points >= 1 ? 'row-far' : 'row-miss') : ''}`}
          >
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
              <span className="prospect-college">
                {pick.prospect_position} · {pick.prospect_college}
                {isScored && ps.actualPick !== null && ps.actualPick !== pick.slot && (
                  <> · went #{ps.actualPick}</>
                )}
              </span>
            </div>
            {isScored && <PickScoreBadge points={ps.points} />}
          </div>
        )
      })}
    </div>
  )
}

type Filter = 'all' | EntryType

type ScoredEntry = Entry & { score: number | null }

export const Leaderboard = () => {
  const { entries, loading } = useLeaderboard()
  const { actuals, draftStarted } = useActualPicks()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const scored: ScoredEntry[] = useMemo(() => {
    const withScores = entries.map((entry) => {
      if (!draftStarted) return { ...entry, score: null }
      const { total } = scoreEntry(
        entry.picks.map((p) => ({ slot: p.slot, prospectId: p.prospect_id })),
        actuals,
      )
      return { ...entry, score: total }
    })
    // Sort: scored entries by score desc, unscored by created_at
    return withScores.sort((a, b) => {
      if (a.score !== null && b.score !== null) return b.score - a.score
      if (a.score !== null) return -1
      if (b.score !== null) return 1
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
  }, [entries, actuals, draftStarted])

  const filtered = filter === 'all' ? scored : scored.filter((e) => e.entry_type === filter)
  const humanCount = entries.filter((e) => e.entry_type === 'human').length
  const robotCount = entries.filter((e) => e.entry_type === 'robot').length

  return (
    <main>
      <span className="tag">Leaderboard</span>
      <h1>
        {draftStarted ? 'Scores' : "Who's In"}<span className="dot">.</span>
      </h1>
      <p>
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'} locked in.
        {draftStarted
          ? ` ${actuals.size}/32 picks in.`
          : ' Scores go live when the draft starts.'}
      </p>

      <div className="leaderboard-filters">
        <button type="button" className={`leaderboard-filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All ({entries.length})
        </button>
        <button type="button" className={`leaderboard-filter ${filter === 'human' ? 'active' : ''}`} onClick={() => setFilter('human')}>
          🧑 Humans ({humanCount})
        </button>
        <button type="button" className={`leaderboard-filter ${filter === 'robot' ? 'active' : ''}`} onClick={() => setFilter('robot')}>
          🤖 Bots ({robotCount})
        </button>
      </div>

      <div className="board">
        {loading && <div className="feed-empty">Loading...</div>}
        {!loading && filtered.length === 0 && (
          <div className="feed-empty">No entries yet.</div>
        )}
        {filtered.map((entry, rank) => (
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
              <span className={`leaderboard-chevron ${expanded === entry.player_name ? 'open' : ''}`}>›</span>
              {draftStarted && (
                <span className="leaderboard-rank">#{rank + 1}</span>
              )}
              <span className="leaderboard-name">
                {entry.entry_type === 'robot' ? '🤖 ' : ''}{entry.player_name}
              </span>
              <span className="leaderboard-meta">
                {entry.picks.length} picks · {timeAgo(entry.created_at)}
              </span>
              <span className={`leaderboard-score ${entry.score !== null ? 'live' : ''}`}>
                {entry.score !== null ? entry.score : '—'}
              </span>
            </div>
            {expanded === entry.player_name && (
              <EntryDetail entry={entry} actuals={actuals} draftStarted={draftStarted} />
            )}
          </div>
        ))}
      </div>

      <div className="footer">
        v{__APP_VERSION__}
        {draftStarted ? ` — ${actuals.size}/32 picks scored` : ' — scores pending'}
      </div>
    </main>
  )
}
