import { describe, expect, it } from 'vitest'
import { clock, voiceTime } from './voiceTime'

const clip = (duration: number, currentTime = 0, playbackRate = 1) => ({ duration, currentTime, playbackRate }) as HTMLAudioElement

describe('voice message time', () => {
  it('shows the whole clip length before it plays', () => {
    expect(voiceTime('a b c', clip(13.4), false, false)).toEqual({ seconds: 14, done: 0 })
  })
  it('counts the seconds left and the share heard while it plays', () => {
    const t = voiceTime('a b c', clip(14, 3.5), true, false)
    expect(t.seconds).toBe(11)
    expect(t.done).toBeCloseTo(0.25)
  })
  it('stretches the time in support mode (slower playback)', () => {
    expect(voiceTime('a b c', clip(12), false, true).seconds).toBe(16)
    expect(voiceTime('a b c', clip(12, 6, 0.75), true, true).seconds).toBe(8)
  })
  it('estimates from the words without a clip', () => {
    expect(voiceTime('one two three four five six seven eight nine ten eleven twelve thirteen', undefined, false, false)).toEqual({ seconds: 5, done: 0 })
  })
  it('formats minutes and seconds', () => {
    expect(clock(7)).toBe('0:07')
    expect(clock(75)).toBe('1:15')
  })
})
