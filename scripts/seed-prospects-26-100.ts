import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

const prospects = [
  { rank: 26, name: 'Kayden McDonald', college: 'Ohio State', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 27, name: 'Peter Woods', college: 'Clemson', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/228.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 28, name: 'Caleb Lomu', college: 'Utah', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/254.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 29, name: 'Zion Young', college: 'Missouri', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/142.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 30, name: 'Cashius Howell', college: 'Texas A&M', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 31, name: 'Colton Hood', college: 'Tennessee', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2633.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 32, name: 'KC Concepcion', college: 'Texas A&M', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 33, name: 'Chase Bisontis', college: 'Texas A&M', position: 'OG', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 34, name: 'Caleb Banks', college: 'Florida', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/57.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 35, name: 'Anthony Hill Jr.', college: 'Texas', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/251.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 36, name: 'Eli Stowers', college: 'Vanderbilt', position: 'TE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/238.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 37, name: 'Ty Simpson', college: 'Alabama', position: 'QB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/333.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 38, name: 'Brandon Cisse', college: 'South Carolina', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2579.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 39, name: 'Chris Johnson', college: 'San Diego State', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/21.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 40, name: 'Zachariah Branch', college: 'Georgia', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/61.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 41, name: 'Max Iheanachor', college: 'Arizona State', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/9.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 42, name: 'Chris Brazzell II', college: 'Tennessee', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2633.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 43, name: 'Germie Bernard', college: 'Alabama', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/333.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 44, name: 'Gabe Jacas', college: 'Illinois', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/356.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 45, name: 'CJ Allen', college: 'Georgia', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/61.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 46, name: 'Jacob Rodriguez', college: 'Texas Tech', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2641.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 47, name: 'Emmanuel Pregnon', college: 'Oregon', position: 'OG', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2483.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 48, name: 'Keionte Scott', college: 'Miami', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2390.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 49, name: 'Christen Miller', college: 'Georgia', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/61.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 50, name: 'Jadarian Price', college: 'Notre Dame', position: 'RB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/87.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 51, name: 'Gennings Dunker', college: 'Iowa', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2294.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 52, name: 'Blake Miller', college: 'Clemson', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/228.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 53, name: 'T.J. Parker', college: 'Clemson', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/228.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 54, name: 'Malachi Lawrence', college: 'UCF', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2116.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 55, name: 'Jake Golday', college: 'Cincinnati', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2132.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 56, name: 'A.J. Haulcy', college: 'LSU', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/99.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 57, name: 'Antonio Williams', college: 'Clemson', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/228.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 58, name: 'Keylan Rutledge', college: 'Georgia Tech', position: 'OG', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/59.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 59, name: 'Malachi Fields', college: 'Notre Dame', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/87.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 60, name: 'Derrick Moore', college: 'Michigan', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/130.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 61, name: 'R Mason Thomas', college: 'Oklahoma', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/201.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 62, name: 'Josiah Trotter', college: 'Missouri', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/142.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 63, name: 'Zxavian Harris', college: 'Ole Miss', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/145.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 64, name: 'Max Klare', college: 'Ohio State', position: 'TE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 65, name: 'Malik Muhammad', college: 'Texas', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/251.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 66, name: "D'Angelo Ponds", college: 'Indiana', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/84.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 67, name: 'Lee Hunter', college: 'Texas Tech', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2641.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 68, name: 'Mike Washington Jr.', college: 'Arkansas', position: 'RB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/8.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 69, name: 'Treydan Stukes', college: 'Arizona', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/12.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 70, name: 'Ted Hurst', college: 'Georgia State', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2247.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 71, name: 'Jalon Kilgore', college: 'South Carolina', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2579.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 72, name: 'Skyler Bell', college: 'UConn', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/41.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 73, name: 'Elijah Sarrett', college: 'Indiana', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/84.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 74, name: 'Keyron Crawford', college: 'Auburn', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 75, name: 'Keith Abney II', college: 'Arizona State', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/9.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 76, name: "De'Zhaun Stribling", college: 'Ole Miss', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/145.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 77, name: 'Chris Bell', college: 'Louisville', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/97.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 78, name: 'Domonique Orange', college: 'Iowa State', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/66.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 79, name: 'Jake Slaughter', college: 'Florida', position: 'C', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/57.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 80, name: 'Sam Hecht', college: 'Kansas State', position: 'C', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2306.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 81, name: 'Deion Burks', college: 'Oklahoma', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/201.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 82, name: 'Zakee Wheatley', college: 'Penn State', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/213.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 83, name: 'Sam Roush', college: 'Stanford', position: 'TE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/24.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 84, name: 'Caleb Tiernan', college: 'Northwestern', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/77.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 85, name: 'Bud Clark', college: 'TCU', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2628.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 86, name: 'Dametrious Crownover', college: 'Texas A&M', position: 'OT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 87, name: 'Garrett Nussmeier', college: 'LSU', position: 'QB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/99.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 88, name: 'Jaishawn Barham', college: 'Michigan', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/130.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 89, name: 'Kyle Louis', college: 'Pittsburgh', position: 'LB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/221.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 90, name: "Ja'Kobi Lane", college: 'USC', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/30.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 91, name: 'Davison Igbinosun', college: 'Ohio State', position: 'CB', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/194.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 92, name: 'Justin Joly', college: 'NC State', position: 'TE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/152.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 93, name: 'Gracen Halton', college: 'Oklahoma', position: 'DT', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/201.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 94, name: 'Joshua Josephs', college: 'Tennessee', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2633.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 95, name: 'Bryce Lance', college: 'North Dakota State', position: 'WR', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2449.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 96, name: 'Dani Dennis-Sutton', college: 'Penn State', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/213.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 97, name: 'Genesis Smith', college: 'Arizona', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/12.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 98, name: 'Kamari Ramsey', college: 'USC', position: 'S', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/30.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 99, name: 'Logan Jones', college: 'Iowa', position: 'C', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2294.png&h=80&scale=crop&w=80&location=origin' },
  { rank: 100, name: 'Romello Height', college: 'Texas Tech', position: 'EDGE', logo_url: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2641.png&h=80&scale=crop&w=80&location=origin' },
]

const { error } = await supabase.from('prospects').insert(prospects)

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${prospects.length} prospects (26-100)`)
