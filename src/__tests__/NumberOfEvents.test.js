import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  beforeEach(() => {
    render(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('renders text input', () => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('renders text input with default value', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(32);
  });

  test('changes value when user types', async () => {
    const input = screen.getByRole('spinbutton');
    await userEvent.clear(input);
    await userEvent.type(input, '5');
    expect(input).toHaveValue(5);
  });
});