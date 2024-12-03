import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';
import { mockData } from '../mock-data';

// Mock the API calls
jest.mock('../api');

describe('<App /> component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock the getEvents function to return mockData
    getEvents.mockResolvedValue(mockData);
  });

  test('renders main app components', () => {
    render(<App />);
    
    expect(screen.getByText('Meet App')).toBeInTheDocument();
    expect(screen.getByTestId('city-search')).toBeInTheDocument();
    expect(screen.getByTestId('number-of-events')).toBeInTheDocument();
    expect(screen.getByTestId('event-list')).toBeInTheDocument();
  });

  test('renders event list with correct number of events', async () => {
    render(<App />);
    
    await waitFor(() => {
      const eventElements = screen.getAllByTestId('event');
      expect(eventElements).toHaveLength(mockData.length);
    });
  });

  test('updates events when city is selected', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Wait for initial events to load
    await waitFor(() => {
      expect(screen.getAllByTestId('event')).toHaveLength(mockData.length);
    });

    // Find and click the city search input
    const cityInput = screen.getByPlaceholderText('Search for a city');
    await user.click(cityInput);
    await user.type(cityInput, 'London');

    // Select London from suggestions
    const londonOption = screen.getByText('London, UK');
    await user.click(londonOption);

    // Verify that events are filtered
    await waitFor(() => {
      const filteredEvents = screen.getAllByTestId('event');
      expect(filteredEvents.length).toBeLessThanOrEqual(mockData.length);
    });
  });

  test('updates number of events when user changes the number', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for initial events to load
    await waitFor(() => {
      expect(screen.getAllByTestId('event')).toHaveLength(mockData.length);
    });

    // Find and change the number of events input
    const numberInput = screen.getByTestId('number-of-events-input');
    await user.clear(numberInput);
    await user.type(numberInput, '10');

    // Verify that the number of events is updated
    await waitFor(() => {
      const eventElements = screen.getAllByTestId('event');
      expect(eventElements).toHaveLength(10);
    });
  });

  test('displays warning when offline', async () => {
    // Mock navigator.onLine to be false
    const originalOnline = window.navigator.onLine;
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      writable: true
    });

    render(<App />);

    expect(screen.getByText('Offline mode: List loaded from cache.')).toBeInTheDocument();

    // Restore original onLine value
    Object.defineProperty(window.navigator, 'onLine', {
      value: originalOnline,
      writable: true
    });
  });

  test('renders charts with event data', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('event-genre')).toBeInTheDocument();
      expect(screen.getByTestId('scatter-chart')).toBeInTheDocument();
    });
  });

  test('shows welcome screen when no token is present', () => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);

    render(<App />);
    expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();

    // Restore original localStorage
    jest.restoreAllMocks();
  });
});