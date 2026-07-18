import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('renders App component and checks parent gate text', () => {
  render(<App />);
  const headingElement = screen.getByText(/ASK AN ADULT/i);
  expect(headingElement).toBeInTheDocument();
});
