import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('on render there should be 20 listings', async () => {
  render(<App />);

  let allListings = [];
  await screen.findAllByTestId('listing').then(listings => allListings = listings);

  expect(allListings.length === 20).toBeTruthy();
});

