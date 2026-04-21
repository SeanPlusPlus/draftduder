import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const picks = [
  { pick: 1, team: 'Las Vegas Raiders', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/lv.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 2, team: 'New York Jets', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/nyj.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 3, team: 'Arizona Cardinals', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/ari.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 4, team: 'Tennessee Titans', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/ten.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 5, team: 'New York Giants', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/nyg.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 6, team: 'Cleveland Browns', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/cle.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 7, team: 'Washington Commanders', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/wsh.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 8, team: 'New Orleans Saints', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/no.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 9, team: 'Kansas City Chiefs', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/kc.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 10, team: 'New York Giants', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/nyg.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 11, team: 'Miami Dolphins', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/mia.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 12, team: 'Dallas Cowboys', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/dal.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 13, team: 'Los Angeles Rams', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/lar.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 14, team: 'Baltimore Ravens', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/bal.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 15, team: 'Tampa Bay Buccaneers', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/tb.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 16, team: 'New York Jets', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/nyj.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 17, team: 'Detroit Lions', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/det.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 18, team: 'Minnesota Vikings', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/min.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 19, team: 'Carolina Panthers', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/car.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 20, team: 'Dallas Cowboys', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/dal.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 21, team: 'Pittsburgh Steelers', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/pit.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 22, team: 'Los Angeles Chargers', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/lac.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 23, team: 'Philadelphia Eagles', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/phi.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 24, team: 'Cleveland Browns', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/cle.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 25, team: 'Chicago Bears', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/chi.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 26, team: 'Buffalo Bills', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/buf.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 27, team: 'San Francisco 49ers', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/sf.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 28, team: 'Houston Texans', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/hou.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 29, team: 'Kansas City Chiefs', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/kc.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 30, team: 'Miami Dolphins', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/mia.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 31, team: 'New England Patriots', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/ne.png&h=80&scale=crop&w=80&location=origin' },
  { pick: 32, team: 'Seattle Seahawks', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/sea.png&h=80&scale=crop&w=80&location=origin' },
]

const { error } = await supabase.from('draft_order').insert(picks)

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${picks.length} picks`)
