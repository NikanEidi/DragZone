import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useChat } from './hooks/useChat';

// Mock the useChat hook
jest.mock('./hooks/useChat', () => ({
  useChat: jest.fn(),
}));

describe('App Component', () => {
  beforeAll(() => {
    // Mock Canvas
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
      createRadialGradient: jest.fn(() => ({
        addColorStop: jest.fn()
      })),
      createLinearGradient: jest.fn(() => ({
        addColorStop: jest.fn()
      })),
    })) as any;

    // Mock ResizeObserver
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
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
      uploadFiles: jest.fn(),
      activeContext: ""
    });
  });

  it('renders without crashing', () => {
    render(<App />);
    // Since App has high-performance effects, we check if it mounts
    expect(document.body).toBeDefined();
  });
});
