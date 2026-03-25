import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatArea } from './ChatArea';
import '@testing-library/jest-dom';

describe('ChatArea Component', () => {
  const defaultProps = {
    messages: [],
    status: 'idle' as const,
    contextActive: false,
    onSend: jest.fn(),
    onUpload: jest.fn().mockResolvedValue(true),
    onShare: jest.fn(),
    onToggleSidebar: jest.fn(),
  };

  beforeAll(() => {
    // Mock scroll into view and scrollTo since jsdom doesn't support them fully
    window.HTMLElement.prototype.scrollTo = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders EmptyState when there are no messages', () => {
    render(<ChatArea {...defaultProps} />);
    expect(screen.getByText('DRAGZONE READY')).toBeInTheDocument();
  });

  it('renders messages correctly', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'Hello', timestamp: new Date() },
      { id: '2', role: 'assistant' as const, content: 'Hi there', timestamp: new Date() }
    ];
    render(<ChatArea {...defaultProps} messages={messages} />);
    
    // We expect the message text to appear
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there')).toBeInTheDocument();
    
    // Empty state should not be visible
    expect(screen.queryByText('DRAGZONE READY')).not.toBeInTheDocument();
  });

  it('renders TypingIndicator when status is typing', () => {
    render(<ChatArea {...defaultProps} status="typing" />);
    // Typing indicator has text PARSING...
    expect(screen.getByText('PARSING...')).toBeInTheDocument();
  });
});
