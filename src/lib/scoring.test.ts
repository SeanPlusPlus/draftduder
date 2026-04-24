import { describe, expect, test } from 'bun:test'
import type { ActualPickMap } from './scoring'
import { scoreEntry, scoreSlot } from './scoring'

const makeActuals = (entries: [string, number][]): ActualPickMap =>
  new Map(entries)

describe('scoreSlot', () => {
  const actuals = makeActuals([['p1', 1], ['p2', 5], ['p3', 32]])

  test('exact match = 7 points', () => {
    expect(scoreSlot(1, 'p1', actuals)).toMatchObject({ points: 7, actualPick: 1 })
    expect(scoreSlot(5, 'p2', actuals)).toMatchObject({ points: 7, actualPick: 5 })
    expect(scoreSlot(32, 'p3', actuals)).toMatchObject({ points: 7, actualPick: 32 })
  })

  test('1 slot away = 6 points', () => {
    expect(scoreSlot(2, 'p1', actuals).points).toBe(6)
    expect(scoreSlot(4, 'p2', actuals).points).toBe(6)
    expect(scoreSlot(6, 'p2', actuals).points).toBe(6)
  })

  test('sliding scale down to 1 point at 6 away', () => {
    expect(scoreSlot(3, 'p1', actuals).points).toBe(5) // 2 away
    expect(scoreSlot(4, 'p1', actuals).points).toBe(4) // 3 away
    expect(scoreSlot(5, 'p1', actuals).points).toBe(3) // 4 away
    expect(scoreSlot(6, 'p1', actuals).points).toBe(2) // 5 away
    expect(scoreSlot(7, 'p1', actuals).points).toBe(1) // 6 away
  })

  test('7+ slots away = 0 points', () => {
    expect(scoreSlot(8, 'p1', actuals).points).toBe(0)  // exactly 7 away
    expect(scoreSlot(15, 'p1', actuals).points).toBe(0) // way off
    expect(scoreSlot(32, 'p1', actuals).points).toBe(0) // max distance
  })

  test('undrafted prospect = 0 points', () => {
    const result = scoreSlot(1, 'unknown', actuals)
    expect(result.points).toBe(0)
    expect(result.actualPick).toBeNull()
  })

  test('returns correct slot and prospectId', () => {
    const result = scoreSlot(10, 'p2', actuals)
    expect(result.slot).toBe(10)
    expect(result.prospectId).toBe('p2')
  })
})

describe('scoreEntry', () => {
  test('sums all pick scores', () => {
    const actuals = makeActuals([['p1', 1], ['p2', 2], ['p3', 3]])
    const picks = [
      { slot: 1, prospectId: 'p1' }, // exact = 7
      { slot: 2, prospectId: 'p2' }, // exact = 7
      { slot: 3, prospectId: 'p3' }, // exact = 7
    ]
    const { total, pickScores } = scoreEntry(picks, actuals)
    expect(total).toBe(21)
    expect(pickScores).toHaveLength(3)
  })

  test('perfect 32-pick entry = 224 points', () => {
    const entries: [string, number][] = Array.from({ length: 32 }, (_, i) => [`p${i}`, i + 1])
    const actuals = makeActuals(entries)
    const picks = entries.map(([id, slot]) => ({ slot, prospectId: id }))
    expect(scoreEntry(picks, actuals).total).toBe(224)
  })

  test('all misses = 0 points', () => {
    const actuals = makeActuals([['p1', 1]])
    const picks = [
      { slot: 1, prospectId: 'unknown1' },
      { slot: 2, prospectId: 'unknown2' },
    ]
    expect(scoreEntry(picks, actuals).total).toBe(0)
  })

  test('empty actuals = 0 points', () => {
    const actuals: ActualPickMap = new Map()
    const picks = [{ slot: 1, prospectId: 'p1' }]
    expect(scoreEntry(picks, actuals).total).toBe(0)
  })

  test('mixed results score correctly', () => {
    const actuals = makeActuals([['p1', 1], ['p2', 10]])
    const picks = [
      { slot: 1, prospectId: 'p1' },  // exact = 7
      { slot: 5, prospectId: 'p2' },  // 5 away = 2
      { slot: 3, prospectId: 'gone' }, // undrafted = 0
    ]
    expect(scoreEntry(picks, actuals).total).toBe(9)
  })
})
