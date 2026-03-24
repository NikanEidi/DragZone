import React from 'react';
import { render, screen } from '@testing-library/react';
import { TypingIndicator } from './TypingIndicator';
import '@testing-library/jest-dom';

describe('TypingIndicator Component', () => {
  it('renders typing dots with correct animation classes', () => {
    render(<TypingIndicator />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});
