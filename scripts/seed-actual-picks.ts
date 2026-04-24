import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

// Fetch all prospects to pick from
const { data: prospects, error: fetchErr } = await supabase
  .from('prospects')
  .select('id, rank, name')
  .order('rank', { ascending: true })
  .limit(32)

if (fetchErr || !prospects) {
  console.error('Failed to fetch prospects:', fetchErr?.message)
  process.exit(1)
}

// Simulate: top 32 prospects go in a shuffled order (close to rank but not exact)
const shuffled = [...prospects]
for (let i = shuffled.length - 1; i > 0; i--) {
  // Bias swaps toward nearby positions for realistic results
  const maxSwap = Math.min(i, 5)
  const j = i - Math.floor(Math.random() * maxSwap)
  ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
}

const pickCount = Number(process.argv[2]) || 32 // pass a number to seed partial draft

const rows = shuffled.slice(0, pickCount).map((prospect, i) => ({
  pick: i + 1,
  prospect_id: prospect.id,
}))

// Clear existing actual picks first
await supabase.from('actual_picks').delete().gte('pick', 1)

const { error } = await supabase.from('actual_picks').insert(rows)

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${rows.length} actual picks:`)
for (const row of rows) {
  const prospect = prospects.find((p) => p.id === row.prospect_id)
  console.log(`  Pick ${row.pick}: ${prospect?.name}`)
}
