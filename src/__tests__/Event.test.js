import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../Event';
import '@testing-library/jest-dom';

describe('<Event /> component', () => {
  const mockEvent = {
    summary: 'Test Event',
    start: {
      dateTime: '2023-06-15T19:00:00Z',
    },
    location: 'Berlin, Germany',
    description: 'This is a test event description',
    htmlLink: 'https://www.google.com/calendar/event?eid=test',
  };

  beforeEach(() => {
    render(<Event event={mockEvent} />);
  });

  test('renders event basic information', () => {
    expect(screen.getByTestId('event')).toBeInTheDocument();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText(/Berlin, Germany/)).toBeInTheDocument();
    expect(screen.getByText(/show details/)).toBeInTheDocument();
  });

  test('by default, event details are hidden', () => {
    expect(screen.queryByText('About Event:')).not.toBeInTheDocument();
    expect(screen.queryByText('See details on Google Calendar')).not.toBeInTheDocument();
    expect(screen.queryByText('This is a test event description')).not.toBeInTheDocument();
  });

  test('shows details when show details button is clicked', () => {
    const button = screen.getByText('show details');
    fireEvent.click(button);

    expect(screen.getByText('About Event:')).toBeInTheDocument();
    expect(screen.getByText('See details on Google Calendar')).toBeInTheDocument();
    expect(screen.getByText('This is a test event description')).toBeInTheDocument();
    expect(screen.getByText('hide details')).toBeInTheDocument();
  });

  test('hides details when hide details button is clicked', () => {
    // First show the details
    fireEvent.click(screen.getByText('show details'));
    
    // Then hide them
    fireEvent.click(screen.getByText('hide details'));

    expect(screen.queryByText('About Event:')).not.toBeInTheDocument();
    expect(screen.queryByText('See details on Google Calendar')).not.toBeInTheDocument();
    expect(screen.queryByText('This is a test event description')).not.toBeInTheDocument();
  });

  test('renders correct date format', () => {
    const dateString = new Date(mockEvent.start.dateTime).toString();
    expect(screen.getByText(dateString)).toBeInTheDocument();
  });
});