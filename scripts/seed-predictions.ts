import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const names = ['Chad McBroski', 'Draftina Picksworth', 'Mock Draftson']

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const { data: prospects } = await supabase
  .from('prospects')
  .select('id')
  .order('rank', { ascending: true })

if (!prospects || prospects.length === 0) {
  console.error('No prospects found')
  process.exit(1)
}

const rows = names.flatMap((name) => {
  const picked = shuffle(prospects).slice(0, 32)
  return picked.map((p, i) => ({
    player_name: name,
    slot: i + 1,
    prospect_id: p.id,
  }))
})

const { error } = await supabase.from('predictions').insert(rows)

if (error) {
  console.error('Insert failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${names.length} entries (${rows.length} rows)`)
