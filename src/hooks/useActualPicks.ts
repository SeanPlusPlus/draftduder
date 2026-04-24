import { useEffect, useState } from 'react'
import type { ActualPickMap } from '../lib/scoring'
import { supabase } from '../lib/supabase'

export type ActualPick = {
  id: string
  pick: number
  prospect_id: string
}

export const useActualPicks = () => {
  const [actuals, setActuals] = useState<ActualPickMap>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('actual_picks')
      .select('id, pick, prospect_id')
      .order('pick', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setActuals(new Map(data.map((row) => [row.prospect_id, row.pick])))
        }
        setLoading(false)
      })

    const channel = supabase
      .channel('actual_picks_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'actual_picks' },
        (payload) => {
          const row = payload.new as ActualPick
          setActuals((prev) => new Map(prev).set(row.prospect_id, row.pick))
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'actual_picks' },
        (payload) => {
          const oldRow = payload.old as Partial<ActualPick>
          const newRow = payload.new as ActualPick
          setActuals((prev) => {
            const next = new Map(prev)
            // Remove old prospect mapping if prospect changed
            if (oldRow.prospect_id && oldRow.prospect_id !== newRow.prospect_id) {
              next.delete(oldRow.prospect_id)
            }
            next.set(newRow.prospect_id, newRow.pick)
            return next
          })
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'actual_picks' },
        (payload) => {
          const prospectId = (payload.old as Partial<ActualPick>).prospect_id
          if (prospectId) {
            setActuals((prev) => {
              const next = new Map(prev)
              next.delete(prospectId)
              return next
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { actuals, loading, draftStarted: actuals.size > 0 }
}
