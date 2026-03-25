import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import '@testing-library/jest-dom';

describe('EmptyState Component', () => {
  it('renders correctly', () => {
    render(<EmptyState />);
    expect(screen.getByText('DRAGZONE READY')).toBeInTheDocument();
    expect(screen.getByText('Initialize neural link to begin transmission')).toBeInTheDocument();
    expect(screen.getByText(/LATENCY 0\.003ms/)).toBeInTheDocument();
  });

  it('contains the dragon logo image', () => {
    const { container } = render(<EmptyState />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'DragZone');
  });
});
