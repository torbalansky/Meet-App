import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockData } from '../mock-data';

// Mock API functions
jest.mock('../api', () => ({
  ...jest.requireActual('../api'),
  getEvents: jest.fn(() => Promise.resolve(mockData)),
  checkToken: jest.fn(() => Promise.resolve({ error: false }))
}));

const feature = loadFeature('./src/features/showHideEventDetails.feature.md');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user is viewing a list of events', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
    });

    when('the user sees an event element', () => {
      expect(screen.getAllByTestId('event')).toBeDefined();
    });

    then('the event element should be collapsed by default', () => {
      const eventDetails = screen.queryByTestId('event-details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user is viewing a collapsed event element', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
    });

    when('the user clicks on the "Show details" button', async () => {
      const showDetailsButton = screen.getAllByText('Show details')[0];
      await userEvent.click(showDetailsButton);
    });

    then('the event element should expand, displaying the event details', () => {
      const eventDetails = screen.getByTestId('event-details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user is viewing an expanded event element', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId('event-list')).toBeInTheDocument();
      });
      const showDetailsButton = screen.getAllByText('Show details')[0];
      await userEvent.click(showDetailsButton);
    });

    when('the user clicks on the "Hide details" button', async () => {
      const hideDetailsButton = screen.getByText('Hide details');
      await userEvent.click(hideDetailsButton);
    });

    then('the event element should collapse, hiding the event details', () => {
      const eventDetails = screen.queryByTestId('event-details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});