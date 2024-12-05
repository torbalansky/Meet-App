import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents, extractLocations, checkToken } from '../api';

jest.mock('../api');

const mockData = [
  {
    "kind": "calendar#event",
    "id": "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
    "summary": "Learn JavaScript",
    "location": "London, UK",
    "start": {
      "dateTime": "2020-05-19T16:00:00+02:00",
    },
    "end": {
      "dateTime": "2020-05-19T17:00:00+02:00",
    }
  },
  {
    "kind": "calendar#event",
    "id": "3qtd6uscq4tsi6gc7nmmtpqlct_20200520T120000Z",
    "summary": "React is Fun",
    "location": "Berlin, Germany",
    "start": {
      "dateTime": "2020-05-20T14:00:00+02:00",
    },
    "end": {
      "dateTime": "2020-05-20T15:00:00+02:00",
    }
  }
];

describe('App', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
    getEvents.mockResolvedValue(mockData);
    extractLocations.mockReturnValue(['London, UK', 'Berlin, Germany']);
    checkToken.mockResolvedValue({ error: null });
  });

  test('renders the App component', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Meet App')).toBeInTheDocument();
    });
  });

  test('fetches events and locations on mount', async () => {
    render(<App />);
    await waitFor(() => {
      expect(getEvents).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Learn JavaScript')).toBeInTheDocument();
      expect(screen.getByText('React is Fun')).toBeInTheDocument();
    });
  });

  test('updates the number of events correctly', async () => {
    render(<App />);
    await waitFor(() => {
      const input = screen.getByLabelText(/Select number of events/i);
      fireEvent.change(input, { target: { value: '1' } });
    });
    
    await waitFor(() => {
      expect(screen.getByText('Learn JavaScript')).toBeInTheDocument();
      expect(screen.queryByText('React is Fun')).not.toBeInTheDocument();
    });
  });

  test('searches for events by city', async () => {
    render(<App />);
    
    // Wait for the initial render
    await waitFor(() => {
      expect(screen.getByText('Meet App')).toBeInTheDocument();
    });
  
    // Find and click the search input
    const searchInput = screen.getByPlaceholderText(/Search for a city/i);
    fireEvent.change(searchInput, { target: { value: 'Berlin' } });
  
    // Wait for suggestions to appear and click on Berlin
    await waitFor(() => {
      // Use a more specific selector to find the suggestion list item
      const berlinOption = screen.getAllByText('Berlin, Germany')[0]; // Get the first occurrence (the suggestion item)
      fireEvent.click(berlinOption);
    });
  
    // Verify that only Berlin events are shown
    await waitFor(() => {
      const events = screen.getAllByTestId('event');
      expect(events).toHaveLength(1);
      expect(screen.getByText('React is Fun')).toBeInTheDocument();
      expect(screen.queryByText('Learn JavaScript')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('handles "See all cities" correctly', async () => {
    render(<App />);
    await waitFor(() => {
      const citySearch = screen.getByPlaceholderText(/Search for a city/i);
      fireEvent.change(citySearch, { target: { value: '' } });
      fireEvent.click(screen.getByTestId('caret-icon'));
    });

    await waitFor(() => {
      expect(screen.getByText('London, UK')).toBeInTheDocument();
      expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
    });
  });
});