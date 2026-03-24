import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('renders DRAGZONE title correctly', () => {
    render(<Header status="idle" />);
    expect(screen.getByText('DRAGZONE')).toBeInTheDocument();
    expect(screen.getByText('PREMIUM ENGINE')).toBeInTheDocument();
  });

  it('displays the correct layout status indicators', () => {
    const { container } = render(<Header status="thinking" />);
    // Check if cloud engine container is rendered
    expect(container.querySelector('.flex-1')).toBeInTheDocument();
    
    // Check for "LUXURY" pill (Desktop scale)
    expect(screen.getByText('LUXURY')).toBeInTheDocument();
    expect(screen.getByText('SECURE')).toBeInTheDocument();
    expect(screen.getByText('99.99%')).toBeInTheDocument();
  });
});
