import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('renders DRAGZONE title correctly', () => {
    render(<Header status="idle" />);
    expect(screen.getByText('DRAGZONE')).toBeInTheDocument();
    expect(screen.getByText('CORE: ONLINE')).toBeInTheDocument();
  });

  it('displays the correct layout status indicators', () => {
    const { container } = render(<Header status="typing" />);
    // Check if cloud engine container is rendered
    expect(container.querySelector('.flex-1')).toBeInTheDocument();
    
    // Check for "PURPLE LINK" pill (Desktop scale)
    expect(screen.getByText('PURPLE LINK')).toBeInTheDocument();
    expect(screen.getByText('SECURE')).toBeInTheDocument();
    expect(screen.getByText('DRAGON')).toBeInTheDocument();
  });
});
