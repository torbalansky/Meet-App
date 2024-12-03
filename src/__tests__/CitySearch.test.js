import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../CitySearch';

describe('<CitySearch /> component', () => {
  const mockLocations = [
    'London, UK',
    'Berlin, Germany',
    'Paris, France',
    'New York, USA'
  ];
  const mockUpdateEvents = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    render(
      <CitySearch 
        locations={mockLocations} 
        updateEvents={mockUpdateEvents} 
      />
    );
  });

  test('renders search input', () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  test('shows suggestions when input receives focus', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.click(searchInput);

    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeInTheDocument();
    
    // Check if all locations are shown
    const suggestions = within(suggestionList).getAllByRole('listitem');
    expect(suggestions).toHaveLength(mockLocations.length + 1); // +1 for "See all cities"
  });

  test('updates suggestions when user types', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.type(searchInput, 'Lon');

    const suggestionList = screen.getByRole('list');
    const suggestions = within(suggestionList).getAllByRole('listitem');
    
    // Should only show London and "See all cities"
    expect(suggestions).toHaveLength(2);
    expect(suggestions[0]).toHaveTextContent('London, UK');
  });

  test('shows info alert when no cities match search', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.type(searchInput, 'XYZ');

    const infoAlert = screen.getByText('City not found. Try another city.');
    expect(infoAlert).toBeInTheDocument();
  });

  test('updates query when suggestion is clicked', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.click(searchInput);

    const londonSuggestion = screen.getByText('London, UK');
    await userEvent.click(londonSuggestion);

    expect(searchInput).toHaveValue('London, UK');
    expect(mockUpdateEvents).toHaveBeenCalledWith('London, UK');
  });

  test('handles "See all cities" click correctly', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.click(searchInput);

    const seeAllCities = screen.getByText('See all cities');
    await userEvent.click(seeAllCities);

    expect(searchInput).toHaveValue('');
    expect(mockUpdateEvents).toHaveBeenCalledWith('all');
  });

  test('toggles suggestions with caret icon click', async () => {
    const caretIcon = screen.getByTestId('caret-icon');
    
    // Initially, suggestions should be hidden
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    // Click to show suggestions
    await userEvent.click(caretIcon);
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Click again to hide suggestions
    await userEvent.click(caretIcon);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('hides suggestions when clicking outside', () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    fireEvent.focus(searchInput);
    
    // Suggestions should be visible
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    // Suggestions should be hidden
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('is case insensitive when filtering cities', async () => {
    const searchInput = screen.getByPlaceholderText('Search for a city');
    await userEvent.type(searchInput, 'lon');

    const suggestions = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(suggestions[0]).toHaveTextContent('London, UK');
  });
});