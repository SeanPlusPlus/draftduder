import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type Prospect = {
  id: string
  rank: number
  name: string
  college: string
  position: string
  logo_url: string
}

export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('prospects')
      .select('*')
      .order('rank', { ascending: true })
      .then(({ data }) => {
        if (data) setProspects(data)
        setLoading(false)
      })
  }, [])

  return { prospects, loading }
}
