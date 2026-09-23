import { useState, useCallback, useEffect } from 'react';

// Web Audio API procedural sound synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Crisp tactile button click
  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext might be blocked or inactive
    }
  }

  // Bubbly Duolingo-style Pop
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // silent fail
    }
  }

  // Mechanical wrench ratchet sound
  playRatchet() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const time = now + i * 0.035;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600 + i * 150, time);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.02);
      }
    } catch {
      // silent
    }
  }

  // Double chime for success / step completed
  playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {
      // silent
    }
  }

  // Triumphant victory fanfare for verified pass issuance!
  playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 440.0, d: 0.1, t: 0.0 }, // A4
        { f: 554.37, d: 0.1, t: 0.1 }, // C#5
        { f: 659.25, d: 0.12, t: 0.2 }, // E5
        { f: 880.0, d: 0.4, t: 0.32 }, // A5
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.25, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch {
      // silent
    }
  }
}

const engine = new SoundEngine();

export function useSoundEffects() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bir_sound_muted');
      return saved === 'true';
    }
    return false;
  });

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem('bir_sound_muted', String(next));
      if (!next) {
        engine.playPop();
      }
      return next;
    });
  }, []);

  const playClick = useCallback(() => {
    if (!muted) engine.playClick();
  }, [muted]);

  const playPop = useCallback(() => {
    if (!muted) engine.playPop();
  }, [muted]);

  const playRatchet = useCallback(() => {
    if (!muted) engine.playRatchet();
  }, [muted]);

  const playSuccess = useCallback(() => {
    if (!muted) engine.playSuccess();
  }, [muted]);

  const playFanfare = useCallback(() => {
    if (!muted) engine.playFanfare();
  }, [muted]);

  return {
    muted,
    toggleMute,
    playClick,
    playPop,
    playRatchet,
    playSuccess,
    playFanfare,
  };
}
