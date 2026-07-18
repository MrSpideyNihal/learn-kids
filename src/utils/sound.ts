class SynthMusic {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;

  start(ctx: AudioContext) {
    if (this.isPlaying) return;
    this.ctx = ctx;
    this.isPlaying = true;
    let step = 0;
    
    // A soft C major pentatonic scale arpeggio melody loop
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C
    const melody = [0, 2, 3, 4, 3, 2, 4, 5]; // notes order
    
    const playStep = () => {
      if (!this.isPlaying || !this.ctx) return;
      
      // Make sure the audio context is active
      if (this.ctx.state === 'suspended') return;
      
      const noteIdx = melody[step % melody.length];
      const freq = notes[noteIdx];
      
      // Alternate arpeggio notes
      this.playNote(freq, 0.6);
      step++;
    };

    // Run arpeggio step every 600ms
    this.intervalId = setInterval(playStep, 600);
  }

  private playNote(freq: number, duration: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      osc.type = 'triangle'; // Smooth flute-like tone
      osc.frequency.setValueAtTime(freq, now);
      
      // Set very soft volume (background ambient)
      gainNode.gain.setValueAtTime(0.012, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Failed to synthesize background music note:", e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

class SoundSystem {
  private ctx: AudioContext | null = null;
  private sfxMuted: boolean = false;
  private musicMuted: boolean = false;
  private synthMusic: SynthMusic | null = null;

  constructor() {
    // Read from localStorage (safely handles SSR or missing window)
    if (typeof window !== 'undefined') {
      this.sfxMuted = localStorage.getItem('sfxMuted') === 'true';
      this.musicMuted = localStorage.getItem('musicMuted') === 'true';
    }
  }

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setSfxMuted(muted: boolean) {
    this.sfxMuted = muted;
    localStorage.setItem('sfxMuted', String(muted));
  }

  setMusicMuted(muted: boolean) {
    this.musicMuted = muted;
    localStorage.setItem('musicMuted', String(muted));
    if (muted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  getSfxMuted() {
    return this.sfxMuted;
  }

  getMusicMuted() {
    return this.musicMuted;
  }

  playTap() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // AudioContext state blocked
    }
  }

  playCorrect() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const playTone = (freq: number, startDelay: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + startDelay);
        
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.setValueAtTime(0.08, now + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + dur);
        
        osc.start(now + startDelay);
        osc.stop(now + startDelay + dur);
      };

      // Play C-major ascending chord (cheerful)
      playTone(523.25, 0.0, 0.15);  // C5
      playTone(659.25, 0.08, 0.15); // E5
      playTone(783.99, 0.16, 0.15); // G5
      playTone(1046.50, 0.24, 0.35); // C6
    } catch (e) {}
  }

  playIncorrect() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.35);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playMatch() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const playTone = (freq: number, startDelay: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + startDelay);
        gain.gain.setValueAtTime(0.08, now + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + dur);
        osc.start(now + startDelay);
        osc.stop(now + startDelay + dur);
      };

      playTone(880.00, 0.0, 0.12);  // A5
      playTone(1174.66, 0.08, 0.28); // D6
    } catch (e) {}
  }

  playFlip() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.08);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playCoin() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1318.51, now);
      osc2.frequency.setValueAtTime(1975.53, now + 0.08); // B6
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    } catch (e) {}
  }

  playVictory() {
    if (this.sfxMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
      
      const playMelody = (idx: number, startDelay: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notes[idx], now + startDelay);
        gain.gain.setValueAtTime(0.07, now + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + dur);
        osc.start(now + startDelay);
        osc.stop(now + startDelay + dur);
      };

      playMelody(0, 0.0, 0.12);
      playMelody(2, 0.12, 0.12);
      playMelody(4, 0.24, 0.12);
      playMelody(7, 0.36, 0.35);
    } catch (e) {}
  }

  startMusic() {
    if (this.musicMuted) return;
    try {
      const ctx = this.initCtx();
      if (!this.synthMusic) {
        this.synthMusic = new SynthMusic();
      }
      this.synthMusic.start(ctx);
    } catch (e) {}
  }

  stopMusic() {
    if (this.synthMusic) {
      this.synthMusic.stop();
      this.synthMusic = null;
    }
  }

  speak(text: string) {
    if (this.sfxMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85; // Kid-friendly speaking speed
        utterance.pitch = 1.15; // Cheerful pitch
        
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Google'));
        if (enVoice) {
          utterance.voice = enVoice;
        }
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error:", e);
      }
    }
  }
}

// Singleton audio system instance
export const soundSystem = new SoundSystem();
export default soundSystem;
