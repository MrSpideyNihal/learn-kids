import { soundSystem } from './sound';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('SoundSystem Component State', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock Web Speech synthesis API
    class MockSpeechSynthesisUtterance {
      text: string;
      rate: number = 1.0;
      pitch: number = 1.0;
      voice: any = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
    (window as any).speechSynthesis = {
      cancel: vi.fn(),
      speak: vi.fn(),
      getVoices: () => [],
    };
  });

  it('should toggle and persist SFX mute state', () => {
    soundSystem.setSfxMuted(true);
    expect(soundSystem.getSfxMuted()).toBe(true);
    expect(localStorage.getItem('sfxMuted')).toBe('true');

    soundSystem.setSfxMuted(false);
    expect(soundSystem.getSfxMuted()).toBe(false);
    expect(localStorage.getItem('sfxMuted')).toBe('false');
  });

  it('should toggle and persist Music mute state', () => {
    soundSystem.setMusicMuted(true);
    expect(soundSystem.getMusicMuted()).toBe(true);
    expect(localStorage.getItem('musicMuted')).toBe('true');

    soundSystem.setMusicMuted(false);
    expect(soundSystem.getMusicMuted()).toBe(false);
    expect(localStorage.getItem('musicMuted')).toBe('false');
  });

  it('should invoke SpeechSynthesis when speak is called', () => {
    soundSystem.setSfxMuted(false);
    soundSystem.speak('Tiger');
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
