import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type DraftPick = {
  id: string
  pick: number
  team: string
  logo_url: string
}

export const useDraftOrder = () => {
  const [picks, setPicks] = useState<DraftPick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('draft_order')
      .select('*')
      .order('pick', { ascending: true })
      .then(({ data }) => {
        if (data) setPicks(data)
        setLoading(false)
      })
  }, [])

  return { picks, loading }
}
