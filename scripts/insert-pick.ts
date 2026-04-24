import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const pickNumber = Number(process.argv[2])
const prospectName = process.argv[3]

if (!pickNumber || !prospectName) {
  console.error('Usage: bun run pick <pick_number> "<prospect_name>"')
  process.exit(1)
}

const { data: prospect, error: findErr } = await supabase
  .from('prospects')
  .select('id, name, position, college')
  .ilike('name', prospectName)
  .single()

if (findErr || !prospect) {
  console.error(`Prospect "${prospectName}" not found:`, findErr?.message)
  process.exit(1)
}

const { error } = await supabase
  .from('actual_picks')
  .upsert({ pick: pickNumber, prospect_id: prospect.id }, { onConflict: 'pick' })

if (error) {
  console.error('Insert failed:', error.message)
  process.exit(1)
}

console.log(`Pick ${pickNumber}: ${prospect.name} (${prospect.position}, ${prospect.college})`)
