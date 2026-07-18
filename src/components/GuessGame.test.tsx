import { render, screen } from '@testing-library/react';
import { GuessGame } from './GuessGame';
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
  },
  default: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
  },
}));

describe('GuessGame Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the streak counter and multiple choice buttons', () => {
    const onEarnCoins = vi.fn();
    render(<GuessGame onEarnCoins={onEarnCoins} />);

    // Check that the streak is displayed
    expect(screen.getByText(/Streak: 0/i)).toBeInTheDocument();

    // Check that we have options buttons rendered
    const optionButtons = screen.getAllByRole('button').filter(
      (btn) => btn.getAttribute('aria-label')?.startsWith('Select')
    );
    expect(optionButtons.length).toBeGreaterThanOrEqual(3);
  });
});
