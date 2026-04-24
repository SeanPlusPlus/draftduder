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
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { actuals, loading, draftStarted: actuals.size > 0 }
}
