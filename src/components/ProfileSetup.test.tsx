import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileSetup } from './ProfileSetup';
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

describe('ProfileSetup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders parent gate initially', () => {
    const onComplete = vi.fn();
    render(<ProfileSetup onComplete={onComplete} />);

    // Verify parent gate text is present
    expect(screen.getByText(/ASK AN ADULT/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type the answer/i)).toBeInTheDocument();
  });

  it('submits parent gate and advances step on correct answer', () => {
    const onComplete = vi.fn();
    render(<ProfileSetup onComplete={onComplete} />);

    // Retrieve question content to extract numbers
    const questionText = screen.getByText(/What is \d+ \+ \d+\?/i).textContent || '';
    const numbers = questionText.match(/\d+/g);
    expect(numbers).not.toBeNull();
    const sum = parseInt(numbers![0], 10) + parseInt(numbers![1], 10);

    // Input correct answer
    const input = screen.getByPlaceholderText(/Type the answer/i);
    fireEvent.change(input, { target: { value: String(sum) } });

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Confirm/i });
    fireEvent.click(submitBtn);

    // Verify step advances (should display nickname input field)
    expect(screen.getByLabelText(/Nickname:/i)).toBeInTheDocument();
  });
});
