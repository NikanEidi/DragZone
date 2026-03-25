import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  const defaultProps = {
    conversations: [
      { id: '1', title: 'Conversation 1', count: 5 },
      { id: '2', title: 'Test Log 2', count: 1 }
    ],
    activeId: '1',
    onSelect: jest.fn(),
    onNew: jest.fn(),
    onDelete: jest.fn(),
    open: true,
    onClose: jest.fn(),
    collapsed: false,
    onToggleCollapse: jest.fn(),
  };

  it('renders conversations correctly', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByText('DRAGZONE')).toBeInTheDocument();
    expect(screen.getByText('Conversation 1')).toBeInTheDocument();
    expect(screen.getByText('Test Log 2')).toBeInTheDocument();
  });

  it('calls onToggleCollapse when clicking collapse button', () => {
    render(<Sidebar {...defaultProps} />);
    const collapseBtns = screen.getAllByTitle('Collapse sidebar');
    fireEvent.click(collapseBtns[0]);
    expect(defaultProps.onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it('handles collapsed state rendering', () => {
    const { container } = render(<Sidebar {...defaultProps} collapsed={true} />);
    // When collapsed, titles should not be visible as text in the dom directly in the same way,
    // they are rendered as tooltips (titles on buttons)
    expect(screen.queryByText('DRAGZONE')).not.toBeInTheDocument();
    expect(container.querySelector('[title="Conversation 1"]')).toBeInTheDocument();
  });

  it('calls onNew when new protocol button is clicked', () => {
    render(<Sidebar {...defaultProps} />);
    const newBtn = screen.getByText('NEW SESSION');
    fireEvent.click(newBtn);
    expect(defaultProps.onNew).toHaveBeenCalledTimes(1);
  });
});
