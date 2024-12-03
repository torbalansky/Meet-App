import React from 'react';
import { render, screen, within } from '@testing-library/react';
import EventList from '../EventList';

describe('<EventList /> component', () => {
  const mockEvents = [
    {
      id: 1,
      summary: 'Test Event 1',
      location: 'Berlin, Germany',
      start: {
        dateTime: '2023-06-15T19:00:00Z'
      },
      description: 'Test Description 1'
    },
    {
      id: 2,
      summary: 'Test Event 2',
      location: 'London, UK',
      start: {
        dateTime: '2023-06-16T19:00:00Z'
      },
      description: 'Test Description 2'
    },
    {
      id: 3,
      summary: 'Test Event 3',
      location: 'Paris, France',
      start: {
        dateTime: '2023-06-17T19:00:00Z'
      },
      description: 'Test Description 3'
    }
  ];

  test('renders list of events', () => {
    render(<EventList events={mockEvents} />);
    
    const eventList = screen.getByRole('list');
    const eventItems = within(eventList).getAllByRole('listitem');
    
    expect(eventItems).toHaveLength(mockEvents.length);
  });

  test('renders correct event content', () => {
    render(<EventList events={mockEvents} />);
    
    mockEvents.forEach(mockEvent => {
      expect(screen.getByText(mockEvent.summary)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    });
  });

  test('renders empty list when no events are provided', () => {
    render(<EventList events={[]} />);
    
    const eventList = screen.getByRole('list');
    const eventItems = within(eventList).queryAllByRole('listitem');
    
    expect(eventItems).toHaveLength(0);
  });

  test('renders Event components for each event', () => {
    render(<EventList events={mockEvents} />);
    
    const eventComponents = screen.getAllByTestId('event');
    expect(eventComponents).toHaveLength(mockEvents.length);
  });

  test('maintains event order', () => {
    render(<EventList events={mockEvents} />);
    
    const eventTitles = screen.getAllByRole('heading', { level: 2 });
    
    eventTitles.forEach((title, index) => {
      expect(title).toHaveTextContent(mockEvents[index].summary);
    });
  });
});