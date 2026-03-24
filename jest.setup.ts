import '@testing-library/jest-dom';

// JSDOM doesn't implement scrollTo
Element.prototype.scrollTo = jest.fn();
