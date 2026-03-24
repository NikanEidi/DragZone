import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useChat } from './hooks/useChat';

// Mock the useChat hook
jest.mock('./hooks/useChat', () => ({
  useChat: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue({
      conversations: [],
      active: { id: '1', title: 'Test', messages: [] },
      activeId: '1',
      status: 'idle',
      sidebarOpen: true,
      sidebarCollapsed: false,
      setActiveId: jest.fn(),
      setSidebarOpen: jest.fn(),
      setSidebarCollapsed: jest.fn(),
      sendMessage: jest.fn(),
      newConversation: jest.fn(),
      deleteConversation: jest.fn(),
      shareConversation: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<App />);
    // Since App has high-performance effects, we check if it mounts
    expect(document.body).toBeDefined();
  });
});
