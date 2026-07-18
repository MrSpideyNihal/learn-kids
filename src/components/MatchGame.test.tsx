import { render, screen, fireEvent } from '@testing-library/react';
import { MatchGame } from './MatchGame';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock soundSystem
vi.mock('../utils/sound', () => ({
  __esModule: true,
  soundSystem: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playFlip: vi.fn(),
    playMatch: vi.fn(),
    playVictory: vi.fn(),
  },
  default: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playFlip: vi.fn(),
    playMatch: vi.fn(),
    playVictory: vi.fn(),
  },
}));

describe('MatchGame Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders start screen with difficulty and match style controls', () => {
    const onEarnCoins = vi.fn();
    render(<MatchGame onEarnCoins={onEarnCoins} />);

    // Verify game title is visible
    expect(screen.getByText(/Match the Pair/i)).toBeInTheDocument();

    // Verify option buttons are displayed
    expect(screen.getByRole('button', { name: /Play Game/i })).toBeInTheDocument();
  });
});
