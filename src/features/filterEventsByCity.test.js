import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature.md');

defineFeature(feature, test => {
    test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn\'t searched for any city', () => {
        });

        when('the user opens the app', () => {
            render(<App />);
        });

        then('the user should see the list of upcoming events.', async () => {
            await waitFor(() => {
                const eventList = screen.getAllByTestId('event');
                expect(eventList).toHaveLength(mockData.length);
            });
        });
    });

    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        given('the main page is open', () => {
            const locations = extractLocations(mockData);
            render(<CitySearch locations={locations} updateEvents={() => {}} />);
        });

        when('the user starts typing in the city textbox', () => {
            const cityInput = screen.getByRole('textbox');
            userEvent.type(cityInput, 'Berlin');
        });

        then('the user should receive a list of cities (suggestions) that match what they\'ve typed', () => {
            const suggestions = screen.getAllByRole('listitem');
            expect(suggestions).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        let cityInput;

        given('user was typing "Berlin" in the city textbox', () => {
            render(<App />);
            cityInput = screen.getByRole('textbox');
            userEvent.type(cityInput, 'Berlin');
        });

        and('the list of suggested cities is showing', () => {
            const suggestions = screen.getAllByRole('listitem');
            expect(suggestions).toHaveLength(2);
        });

        when('the user selects a city (e.g., "Berlin, Germany") from the list', () => {
            const suggestion = screen.getByText('Berlin, Germany');
            userEvent.click(suggestion);
        });

        then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {
            expect(cityInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            await waitFor(() => {
                const eventList = screen.getAllByTestId('event');
                const berlinEvents = mockData.filter(event => event.location === 'Berlin, Germany');
                expect(eventList).toHaveLength(berlinEvents.length);
            });
        });
    });
});