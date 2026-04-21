import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const prospects = [
  { rank: 1, name: 'Arvell Reese', college: 'Ohio State', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 2, name: 'Fernando Mendoza', college: 'Indiana', position: 'QB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/84.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 3, name: 'David Bailey', college: 'Texas Tech', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2641.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 4, name: 'Jeremiyah Love', college: 'Notre Dame', position: 'RB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/87.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 5, name: 'Francis Mauigoa', college: 'Miami', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2390.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 6, name: 'Caleb Downs', college: 'Ohio State', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 7, name: 'Sonny Styles', college: 'Ohio State', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 8, name: 'Mansoor Delane', college: 'LSU', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/99.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 9, name: 'Rueben Bain Jr.', college: 'Miami', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2390.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 10, name: 'Makai Lemon', college: 'USC', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/30.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 11, name: 'Kenyon Sadiq', college: 'Oregon', position: 'TE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2483.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 12, name: 'Jordyn Tyson', college: 'Arizona State', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/9.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 13, name: 'Carnell Tate', college: 'Ohio State', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 14, name: 'Monroe Freeling', college: 'Georgia', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/61.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 15, name: 'Olaivavega Ioane', college: 'Penn State', position: 'OG', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/213.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 16, name: 'Jermod McCoy', college: 'Tennessee', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2633.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 17, name: 'Kadyn Proctor', college: 'Alabama', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/333.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 18, name: 'Akheem Mesidor', college: 'Miami', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2390.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 19, name: 'Spencer Fano', college: 'Utah', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/254.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 20, name: 'Dillon Thieneman', college: 'Oregon', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2483.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 21, name: 'Emmanuel McNeil-Warren', college: 'Toledo', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2649.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 22, name: 'Avieon Terrell', college: 'Clemson', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/228.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 23, name: 'Denzel Boston', college: 'Washington', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/264.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 24, name: 'Omar Cooper Jr.', college: 'Indiana', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/84.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 25, name: 'Keldric Faulk', college: 'Auburn', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2.png&h=80&scale=crop&w=80&location=origin' },
]

const { error } = await supabase.from('prospects').insert(prospects)

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${prospects.length} prospects`)
