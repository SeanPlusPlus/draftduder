import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)
const content = process.argv.slice(2).join(' ')

if (!content) {
  console.error('Usage: bun run push "your message here"')
  process.exit(1)
}

const { error } = await supabase.from('messages').insert({ content })

if (error) {
  console.error('Insert failed:', error.message)
  process.exit(1)
}

console.log(`pushed: "${content}"`)
