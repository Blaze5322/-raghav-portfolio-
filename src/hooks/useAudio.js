import { useRef, useCallback } from 'react'

export function useAudio() {
  const ctxRef = useRef(null)
  const startedRef = useRef(false)

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx

      // Wind layers
      const windFreqs = [80, 120, 200]
      const winds = windFreqs.map((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.value = 0.006 + i * 0.003
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        return { osc, gain }
      })

      // Modulate wind over time
      const modulateWind = () => {
        const now = ctx.currentTime
        winds.forEach((w, i) => {
          w.gain.gain.setTargetAtTime(0.004 + Math.random() * 0.012, now, 1.5 + i * 0.5)
          w.osc.frequency.setTargetAtTime(60 + i * 40 + Math.random() * 20, now, 2)
        })
      }
      setInterval(modulateWind, 2500)

      // Crackle buffer
      const sampleRate = ctx.sampleRate
      const crackleBuf = ctx.createBuffer(1, sampleRate * 0.05, sampleRate)
      const data = crackleBuf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.3))
      }

      // Crackle scheduler
      const crackle = () => {
        if (Math.random() < 0.45) {
          const src = ctx.createBufferSource()
          const g = ctx.createGain()
          src.buffer = crackleBuf
          g.gain.value = 0.015 + Math.random() * 0.035
          const filter = ctx.createBiquadFilter()
          filter.type = 'bandpass'
          filter.frequency.value = 1200 + Math.random() * 800
          src.connect(filter)
          filter.connect(g)
          g.connect(ctx.destination)
          src.start()
        }
        setTimeout(crackle, 150 + Math.random() * 700)
      }
      crackle()

    } catch (e) {
      console.warn('Audio unavailable:', e)
    }
  }, [])

  return { startAudio: start }
}
