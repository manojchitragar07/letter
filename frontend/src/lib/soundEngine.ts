// Organic Web Audio API Synthesizer for Dearly
// Zero external network latency, 100% reliable, rich tactile acoustic micro-interactions!

import { AudioTrackId } from "@/types/letter";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentTrackNodes: { stop: () => void } | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.45;
  private lastTypeSoundTime: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Realistic fountain pen scratching sound on textured parchment
  public playPenScratchSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    // Rate limit typing sounds so fast typing doesn't sound harsh
    const now = ctx.currentTime;
    if (now - this.lastTypeSoundTime < 0.08) return;
    this.lastTypeSoundTime = now;

    const bufferSize = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2400 + Math.random() * 800, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.04);
  }

  // Vintage typewriter key tap sound
  public playTypewriterSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;
    if (now - this.lastTypeSoundTime < 0.08) return;
    this.lastTypeSoundTime = now;

    // Click tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Hot brass seal pressing into molten wax sound
  public playWaxSealStampSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Play realistic envelope opening, wax break, and paper slide sound
  public playEnvelopeOpenSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;

    // 1. Wax seal crack / fracture (sharp crystalline pop)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = "sawtooth";
    snapOsc.frequency.setValueAtTime(480, now);
    snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.07);

    snapGain.gain.setValueAtTime(0.4 * this.volume, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.08);

    // 2. Paper rustle noise (unfolding physical paper)
    const bufferSize = ctx.sampleRate * 0.55;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now + 0.05);
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.5);
    filter.Q.setValueAtTime(1.6, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.24 * this.volume, now + 0.18);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now + 0.02);
    whiteNoise.stop(now + 0.6);

    // 3. Warm welcoming bell chime / harmonic chime
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(523.25, now + 0.35); // C5
    chimeGain.gain.setValueAtTime(0.2 * this.volume, now + 0.35);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start(now + 0.35);
    chimeOsc.stop(now + 1.7);
  }

  // Soft stamp placement sound
  public playStickerPlaceSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.07);

    gain.gain.setValueAtTime(0.22 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Start continuous soothing atmosphere track with vinyl warmth
  public playAtmosphere(trackId: AudioTrackId) {
    this.stopAtmosphere();
    if (trackId === "none" || this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    let isPlaying = true;
    let timerId: NodeJS.Timeout | null = null;

    if (trackId === "rain") {
      // Continuous soothing rain generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
      }

      const rainSource = ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(750, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28 * this.volume, ctx.currentTime + 2);

      rainSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      rainSource.start();

      this.currentTrackNodes = {
        stop: () => {
          try {
            gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
            setTimeout(() => {
              rainSource.stop();
              rainSource.disconnect();
            }, 800);
          } catch (e) {}
        },
      };
      return;
    }

    // Melodic tracks
    const melodyMap: Record<string, number[]> = {
      piano: [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 293.66], // C major arpeggio
      musicbox: [523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33], // Higher bell chime
      acoustic: [196.0, 246.94, 293.66, 392.0, 329.63, 246.94, 220.0, 196.0], // Warm fingerpicking
      lofi: [220.0, 261.63, 329.63, 392.0, 293.66, 349.23, 440.0, 523.25], // Mellow minor-7th
    };

    const notes = melodyMap[trackId] || melodyMap.piano;
    let step = 0;

    const playNote = () => {
      if (!isPlaying || !ctx || this.isMuted) return;

      const freq = notes[step % notes.length];
      step++;

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      if (trackId === "musicbox") {
        osc.type = "sine";
      } else if (trackId === "piano") {
        osc.type = "triangle";
      } else if (trackId === "lofi") {
        osc.type = "sine";
      } else {
        osc.type = "triangle";
      }

      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.22 * this.volume, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + (trackId === "musicbox" ? 2.0 : 2.8));

      osc.connect(noteGain);
      noteGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);

      const tempo = trackId === "musicbox" ? 750 : 1100;
      timerId = setTimeout(playNote, tempo);
    };

    playNote();

    this.currentTrackNodes = {
      stop: () => {
        isPlaying = false;
        if (timerId) clearTimeout(timerId);
      },
    };
  }

  public stopAtmosphere() {
    if (this.currentTrackNodes) {
      this.currentTrackNodes.stop();
      this.currentTrackNodes = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAtmosphere();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
