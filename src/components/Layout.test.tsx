import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { describe, expect, it, vi } from 'vitest';

describe('Layout Component', () => {
  it('renders children and displays tabs and coin balance', () => {
    const setActiveTab = vi.fn();
    const setSfxMuted = vi.fn();
    const setMusicMuted = vi.fn();

    render(
      <Layout
        activeTab="guess"
        setActiveTab={setActiveTab}
        coins={150}
        sfxMuted={false}
        setSfxMuted={setSfxMuted}
        musicMuted={true}
        setMusicMuted={setMusicMuted}
      >
        <div data-testid="child-content">Hello Kids Game!</div>
      </Layout>
    );

    // Verify child content renders
    expect(screen.getByTestId('child-content')).toHaveTextContent('Hello Kids Game!');

    // Verify coins balance pill renders
    expect(screen.getByText('150')).toBeInTheDocument();

    // Verify navigation label text is present
    expect(screen.getAllByText('Guess')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Match')[0]).toBeInTheDocument();
  });
});
