import { useState } from 'react'
import { useDraftOrder } from '../hooks/useDraftOrder'
import { type Prospect, useProspects } from '../hooks/useProspects'
import { supabase } from '../lib/supabase'

export const Predict = () => {
  const { prospects } = useProspects()
  const { picks: draftOrder } = useDraftOrder()
  const [slots, setSlots] = useState<Record<number, Prospect>>({})
  const [selected, setSelected] = useState<Prospect | null>(null)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const placed = new Set(Object.values(slots).map((p) => p.id))
  const available = prospects.filter(
    (p) =>
      !placed.has(p.id) &&
      (search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.position.toLowerCase().includes(search.toLowerCase()) ||
        p.college.toLowerCase().includes(search.toLowerCase())),
  )

  const filledCount = Object.keys(slots).length

  const handleProspectClick = (p: Prospect) => {
    setSelected(selected?.id === p.id ? null : p)
    setError('')
  }

  const handleSlotClick = (slot: number) => {
    if (!selected) return
    setSlots((prev) => ({ ...prev, [slot]: selected }))
    setSelected(null)
    setError('')
  }

  const handleRemove = (slot: number) => {
    setSlots((prev) => {
      const next = { ...prev }
      delete next[slot]
      return next
    })
  }

  const handleSave = () => {
    if (filledCount < 32) {
      setError(`Fill all 32 slots. You have ${filledCount}.`)
      return
    }
    setShowModal(true)
  }

  const handleSubmit = async () => {
    const name = playerName.trim()
    if (!name) return

    setSaving(true)
    const rows = Object.entries(slots).map(([slot, prospect]) => ({
      player_name: name,
      slot: Number(slot),
      prospect_id: prospect.id,
    }))

    const { error: err } = await supabase.from('predictions').insert(rows)
    setSaving(false)

    if (err) {
      setError(`Save failed: ${err.message}`)
      setShowModal(false)
      return
    }

    setSaved(true)
    setShowModal(false)
  }

  if (saved) {
    return (
      <main>
        <span className="tag">Locked in</span>
        <h1>
          Done<span className="dot">.</span>
        </h1>
        <p>
          {playerName}'s mock draft is saved. Good luck.
        </p>
        <div className="footer">v{__APP_VERSION__}</div>
      </main>
    )
  }

  return (
    <main className="predict-page">
      <span className="tag">Your picks</span>
      <h1>
        Mock<br />
        Draft<span className="dot">.</span>
      </h1>
      <p>
        Tap a prospect, then tap a slot to place them.{' '}
        <strong>{filledCount}/32</strong>
      </p>

      {error && <div className="predict-error">{error}</div>}

      <div className="predict-layout">
        <div className="predict-col">
          <div className="predict-col-header">
            Prospects
            <input
              className="predict-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="predict-list">
            {available.map((p) => (
              <div
                key={p.id}
                className={`predict-prospect ${selected?.id === p.id ? 'selected' : ''}`}
                onClick={() => handleProspectClick(p)}
              >
                <img src={p.logo_url} alt={p.college} className="predict-logo" />
                <div className="predict-prospect-info">
                  <span className="predict-prospect-name">{p.name}</span>
                  <span className="predict-prospect-meta">{p.college} · {p.position}</span>
                </div>
                <span className="predict-prospect-rank">#{p.rank}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="predict-col">
          <div className="predict-col-header">Round 1</div>
          <div className="predict-list">
            {draftOrder.map((pick) => {
              const prospect = slots[pick.pick]
              return (
                <div
                  key={pick.pick}
                  className={`predict-slot ${!prospect && selected ? 'droppable' : ''} ${prospect ? 'filled' : ''}`}
                  onClick={() => !prospect && handleSlotClick(pick.pick)}
                >
                  <span className="predict-slot-num">{pick.pick}</span>
                  <img src={pick.logo_url} alt={pick.team} className="predict-logo" />
                  {prospect ? (
                    <>
                      <div className="predict-prospect-info">
                        <span className="predict-prospect-name">{prospect.name}</span>
                        <span className="predict-prospect-meta">{prospect.position} · {prospect.college}</span>
                      </div>
                      <button
                        type="button"
                        className="predict-remove"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(pick.pick)
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="predict-slot-team">{pick.team}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <button type="button" className="predict-save" onClick={handleSave}>
        Save Mock Draft
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Who are you?</h2>
            <p>Enter your name to lock in your picks.</p>
            <input
              className="modal-input"
              type="text"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
            <button
              type="button"
              className="predict-save"
              onClick={handleSubmit}
              disabled={saving || !playerName.trim()}
            >
              {saving ? 'Saving...' : 'Lock it in'}
            </button>
          </div>
        </div>
      )}

      <div className="footer">v{__APP_VERSION__}</div>
    </main>
  )
}
