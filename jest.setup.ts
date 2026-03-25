import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';

// JSDOM doesn't implement scrollTo
Element.prototype.scrollTo = jest.fn();

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock react-virtuoso with forwardRef to avoid warnings
jest.mock('react-virtuoso', () => ({
  Virtuoso: React.forwardRef(({ data, itemContent, components }: any, ref: any) => {
    return React.createElement('div', { 'data-testid': 'virtuoso', ref },
      components?.Header?.(),
      data.map((item: any, index: number) => React.createElement('div', { key: index }, itemContent(index, item))),
      components?.Footer?.()
    );
  }),
}));
