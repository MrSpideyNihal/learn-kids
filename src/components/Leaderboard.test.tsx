import { render, screen, waitFor } from '@testing-library/react';
import { Leaderboard } from './Leaderboard';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Mock soundSystem
vi.mock('../utils/sound', () => ({
  __esModule: true,
  soundSystem: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playVictory: vi.fn(),
  },
  default: {
    speak: vi.fn(),
    playTap: vi.fn(),
    playCorrect: vi.fn(),
    playIncorrect: vi.fn(),
    playCoin: vi.fn(),
    playVictory: vi.fn(),
  },
}));

describe('Leaderboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset global fetch mock
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders loading animation initially', () => {
    (globalThis.fetch as any).mockResolvedValueOnce(new Promise(() => {})); // hung promise
    render(<Leaderboard activePlayerId="user-123" />);

    // Verify loading state is shown
    expect(screen.getByText(/Loading High Scores/i)).toBeInTheDocument();
  });

  it('renders leaderboard items after successful fetch', async () => {
    const mockData = {
      success: true,
      leaderboard: [
        { playerId: 'user-1', nickname: 'Alex', score: 120, coinsEarned: 50, rank: 1 },
        { playerId: 'user-2', nickname: 'Zoe', score: 90, coinsEarned: 30, rank: 2 },
      ],
      playerRank: null,
    };

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Leaderboard activePlayerId="user-123" />);

    // Wait for loader to disappear and leaderboard lists to render
    await waitFor(() => {
      expect(screen.queryByText(/Loading High Scores/i)).not.toBeInTheDocument();
    });

    // Check highscore players display
    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Zoe')).toBeInTheDocument();
    expect(screen.getByText('120 pts')).toBeInTheDocument();
  });
});
