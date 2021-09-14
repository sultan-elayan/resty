import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/app';


test('loads the app and shows the name', async ()=> {
    render(<App/>);
    const method = await waitFor(()=> screen.getByTestId("data-testid"));
    expect(method).toHaveTextContent('get');
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders learn react link', () => {
  render(<App />);
  screen.debug();
});