import { useEffect, useState } from 'react'
import { type Message, supabase } from '../lib/supabase'

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setMessages(data)
      })

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return messages
}
