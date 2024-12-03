import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => 'mock-token'),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock NProgress
jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn()
}));

// Mock axios
jest.mock('axios', () => ({
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} }))
  }
}));

// Mock all API functions
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
  localStorage.getItem.mockReturnValue('mock-token');
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});