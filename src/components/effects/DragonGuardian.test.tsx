import React from 'react';
import { render } from '@testing-library/react';
import { DragonGuardian } from './DragonGuardian';
import '@testing-library/jest-dom';

describe('DragonGuardian Component', () => {
  it('renders the interactive dragon elements', () => {
    const { container } = render(<DragonGuardian />);
    // Verify that the wrapper images for the complex overlay are rendered
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Check one of the SVG files is used
    expect(images[0]).toHaveAttribute('src');
  });
});
