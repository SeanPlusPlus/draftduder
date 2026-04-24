import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type EntryType = 'human' | 'robot'

export type EntryPick = {
  slot: number
  prospect_id: string
  prospect_name: string
  prospect_position: string
  prospect_college: string
  prospect_logo_url: string
}

export type Entry = {
  player_name: string
  created_at: string
  entry_type: EntryType
  picks: EntryPick[]
}

export const useLeaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('predictions')
      .select('player_name, slot, created_at, entry_type, prospect_id, prospects(name, position, college, logo_url)')
      .order('slot', { ascending: true })
      .then(({ data }) => {
        if (!data) {
          setLoading(false)
          return
        }

        const grouped: Record<string, Entry> = {}
        for (const row of data) {
          const name = row.player_name
          if (!grouped[name]) {
            grouped[name] = {
              player_name: name,
              created_at: row.created_at,
              entry_type: (row.entry_type as EntryType) || 'human',
              picks: [],
            }
          }
          const prospect = row.prospects as unknown as {
            name: string
            position: string
            college: string
            logo_url: string
          }
          grouped[name].picks.push({
            slot: row.slot,
            prospect_id: row.prospect_id,
            prospect_name: prospect.name,
            prospect_position: prospect.position,
            prospect_college: prospect.college,
            prospect_logo_url: prospect.logo_url,
          })
        }

        const sorted = Object.values(grouped).sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
        setEntries(sorted)
        setLoading(false)
      })
  }, [])

  return { entries, loading }
}
