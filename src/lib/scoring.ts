/** Map of prospect_id → actual pick number (1-32) */
export type ActualPickMap = Map<string, number>

export type PickScore = {
  slot: number
  prospectId: string
  points: number
  actualPick: number | null // null = didn't go round 1
}

/** Score a single slot: 7 pts max, -1 per slot of distance, 0 if 7+ away or undrafted */
export const scoreSlot = (
  predictedSlot: number,
  prospectId: string,
  actuals: ActualPickMap,
): PickScore => {
  const actualPick = actuals.get(prospectId) ?? null
  const points = actualPick === null ? 0 : Math.max(0, 7 - Math.abs(predictedSlot - actualPick))
  return { slot: predictedSlot, prospectId, points, actualPick }
}

/** Score an entire entry (32 picks). Returns per-pick scores + total. */
export const scoreEntry = (
  picks: { slot: number; prospectId: string }[],
  actuals: ActualPickMap,
): { pickScores: PickScore[]; total: number } => {
  const pickScores = picks.map((p) => scoreSlot(p.slot, p.prospectId, actuals))
  const total = pickScores.reduce((sum, ps) => sum + ps.points, 0)
  return { pickScores, total }
}
