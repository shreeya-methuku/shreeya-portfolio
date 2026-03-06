import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Generates an ambient cyberpunk soundscape using the Web Audio API.
 * No external files — pure synthesis: drone pad + shimmer + LFO modulation + delay.
 */
export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const buildAudio = () => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain (controls overall volume)
    const master = ctx.createGain();
    master.gain.value = 0.32;
    master.connect(ctx.destination);
    masterRef.current = master;

    // Delay / pseudo-reverb
    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.35;
    const feedbackGain = ctx.createGain();
    feedbackGain.gain.value = 0.38;
    delay.connect(feedbackGain);
    feedbackGain.connect(delay); // feedback loop
    feedbackGain.connect(master);

    // Low-pass filter for warmth
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.value = 500;
    lpFilter.Q.value = 1.2;
    lpFilter.connect(delay);
    lpFilter.connect(master);

    // ── Drone pad: A minor triad, sub-octave range ──
    const droneNotes = [
      { freq: 55.0,   type: 'sawtooth' as OscillatorType, vol: 0.07 },  // A1
      { freq: 82.41,  type: 'sine'     as OscillatorType, vol: 0.04 },  // E2
      { freq: 110.0,  type: 'sine'     as OscillatorType, vol: 0.035 }, // A2
      { freq: 130.81, type: 'sine'     as OscillatorType, vol: 0.025 }, // C3
      { freq: 164.81, type: 'sine'     as OscillatorType, vol: 0.02 },  // E3
    ];

    droneNotes.forEach(({ freq, type, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(lpFilter);
      osc.start();
      oscillatorsRef.current.push(osc);
    });

    // ── Slow LFO modulating filter cutoff (breathing effect) ──
    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12; // one cycle every ~8s
    lfoDepth.gain.value = 120;  // ±120 Hz sweep on filter
    lfo.connect(lfoDepth);
    lfoDepth.connect(lpFilter.frequency);
    lfo.start();
    oscillatorsRef.current.push(lfo);

    // ── Second LFO gently pulsing master volume ──
    const volLfo = ctx.createOscillator();
    const volLfoDepth = ctx.createGain();
    volLfo.type = 'sine';
    volLfo.frequency.value = 0.06; // very slow pulse
    volLfoDepth.gain.value = 0.06;
    volLfo.connect(volLfoDepth);
    volLfoDepth.connect(master.gain);
    volLfo.start();
    oscillatorsRef.current.push(volLfo);

    // ── High shimmer (A4 / E5 / A5) ──
    const shimmerNotes = [
      { freq: 440.0,  vol: 0.006 },
      { freq: 659.25, vol: 0.004 },
      { freq: 880.0,  vol: 0.003 },
    ];

    shimmerNotes.forEach(({ freq, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      oscillatorsRef.current.push(osc);
    });
  };

  const toggle = () => {
    setShowHint(false);
    if (!isPlaying) {
      if (!ctxRef.current) {
        buildAudio();
      } else {
        ctxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      ctxRef.current?.suspend();
      setIsPlaying(false);
    }
  };

  // Fade in master gain on play
  useEffect(() => {
    if (!masterRef.current || !ctxRef.current) return;
    const gain = masterRef.current;
    if (isPlaying) {
      gain.gain.cancelScheduledValues(ctxRef.current.currentTime);
      gain.gain.setValueAtTime(0, ctxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctxRef.current.currentTime + 1.5);
    } else {
      gain.gain.cancelScheduledValues(ctxRef.current.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.8);
    }
  }, [isPlaying]);

  // Auto-start on first user interaction
  useEffect(() => {
    const startOnInteraction = () => {
      if (!isPlaying) {
        if (!ctxRef.current) buildAudio();
        else ctxRef.current.resume();
        setIsPlaying(true);
        setShowHint(false);
      }
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
    };
    document.addEventListener('click', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);
    return () => {
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
    };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { ctxRef.current?.close(); };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2">
      {/* Tooltip hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2, duration: 0.4 }}
            className="bg-cyber-dark border border-cyber-primary/30 text-cyber-primary text-[10px] font-mono px-3 py-1.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.15)] whitespace-nowrap"
          >
            ♪ ambient music
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-11 h-11 rounded-full bg-cyber-dark border border-cyber-primary/40 flex items-center justify-center shadow-[0_0_14px_rgba(16,185,129,0.2)] hover:shadow-[0_0_22px_rgba(16,185,129,0.4)] transition-shadow"
        title={isPlaying ? 'Mute ambient music' : 'Play ambient music'}
      >
        {isPlaying ? (
          <Volume2 size={16} className="text-cyber-primary" />
        ) : (
          <VolumeX size={16} className="text-gray-500" />
        )}

        {/* Pulsing rings when playing */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-cyber-primary/40 animate-ping" style={{ animationDuration: '1.8s' }} />
            <span className="absolute -inset-2 rounded-full border border-cyber-primary/15 animate-ping" style={{ animationDuration: '2.4s' }} />
          </>
        )}
      </motion.button>
    </div>
  );
};
