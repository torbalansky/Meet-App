import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => 'mock-token'),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor(callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock NProgress
jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn()
}));

// Mock API functions
jest.mock('./api', () => ({
  getEvents: jest.fn(() => Promise.resolve([])),
  extractLocations: jest.fn(() => []),
  checkToken: jest.fn(() => Promise.resolve({ error: false })),
  getAccessToken: jest.fn(() => 'mock-token'),
  getOrRenewAccessToken: jest.fn(() => Promise.resolve('mock-token'))
}));

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});