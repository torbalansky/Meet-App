const { loadFeature, defineFeature } = require('jest-cucumber');
const { render, within, waitFor, screen } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event');
const App = require('../App').default;  // Note the .default for default exports
const { getEvents } = require('../api');

jest.setTimeout(30000);

const feature = loadFeature('./src/features/filterEventsByCity.feature');

jest.mock('../api');

defineFeature(feature, test => {
  // Mock data setup
  const mockEvents = [
    {
      id: 1,
      kind: "calendar#event",
      summary: "Learn JavaScript",
      location: "London, UK",
    },
    {
      id: 2,
      kind: "calendar#event",
      summary: "React is Fun",
      location: "Berlin, Germany",
    },
    {
        id: 3,
        kind: "calendar#event",
        summary: "React is Fun",
        location: "Berlin, Germany",
      },
      {
        id: 4,
        kind: "calendar#event",
        summary: "React is Fun",
        location: "Berlin, Germany",
      }
  ];

  beforeEach(() => {
    getEvents.mockResolvedValue(mockEvents);
  });

  test('When user has not searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user has not searched for any city', () => {
      // No action needed - this is the default state
    });

    when('the user opens the app', () => {
      render(<App />);
    });

    then('the user should see the list of upcoming events.', async () => {
      await waitFor(() => {
        const eventList = screen.getAllByTestId('event');
        expect(eventList).toHaveLength(2);
      });
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    given('the main page is open', () => {
      render(<App />);
    });

    when('the user starts typing in the city textbox', async () => {
      const cityInput = screen.getByPlaceholderText(/search for a city/i);
      await userEvent.type(cityInput, 'Berlin');
    });

    then('the user should receive a list of cities (suggestions) that match what they have typed', async () => {
      await waitFor(() => {
        const suggestions = screen.getAllByTestId('city-suggestion');
        expect(suggestions).toBeDefined();
        expect(suggestions).toHaveLength(1); // Assuming only Berlin is in the suggestions
        expect(suggestions[0].textContent).toContain('Berlin');
      });
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let cityInput;

    given('user was typing "Berlin" in the city textbox', async () => {
      render(<App />);
      cityInput = screen.getByPlaceholderText(/search for a city/i);
      await userEvent.type(cityInput, 'Berlin');
    });

    and('the list of suggested cities is showing', async () => {
      await waitFor(() => {
        const suggestions = screen.getAllByTestId('city-suggestion');
        expect(suggestions).toBeDefined();
      });
    });

    when('the user selects a city (e.g., "Berlin, Germany") from the list', async () => {
      const berlinSuggestion = screen.getByText('Berlin, Germany');
      await userEvent.click(berlinSuggestion);
    });

    then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {
      expect(cityInput.value).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      await waitFor(() => {
        const eventList = screen.getAllByTestId('event');
        const berlinEvents = eventList.filter(event => 
          within(event).getByText('Berlin, Germany')
        );
        expect(berlinEvents).toHaveLength(1);
        expect(within(berlinEvents[0]).getByText('React is Fun')).toBeInTheDocument();
      });
    });
  });
}); 