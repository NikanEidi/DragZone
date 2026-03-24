import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageBubble } from './MessageBubble';
import '@testing-library/jest-dom';

describe('MessageBubble Component', () => {
  it('renders user message properly', () => {
    const message = {
      id: 'msg-1',
      role: 'user' as const,
      content: 'This is a test message',
      timestamp: new Date()
    };
    render(<MessageBubble message={message} index={0} />);
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
  });

  it('renders assistant message with dragon icon avatar', () => {
    const message = {
      id: 'msg-2',
      role: 'assistant' as const,
      content: 'I am your assistant',
      timestamp: new Date()
    };
    const { container } = render(<MessageBubble message={message} index={1} />);
    expect(screen.getByText('I am your assistant')).toBeInTheDocument();
    
    // Assistant should render the dragon image
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});
