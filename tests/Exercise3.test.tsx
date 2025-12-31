import { expect, test, describe, afterEach, beforeEach, mock } from 'bun:test';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Exercise3 from '@/pages/Exercise3';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 157336,
  original_title: 'Interstellar',
  tagline: 'Mankind was born on Earth. It was never meant to die here.',
  overview:
    'The adventures of a group of explorers who make use of a newly discovered wormhole...',
  homepage: 'http://www.interstellarmovie.net/',
  poster_path: '/gEU2QniL6E8ahDaXy4zHQq4ygj.jpg',
  production_companies: [{ name: 'Paramount' }, { name: 'Warner Bros.' }],
  production_countries: [{ name: 'United States of America' }],
  genres: [
    { name: 'Adventure' },
    { name: 'Drama' },
    { name: 'Science Fiction' },
  ],
  release_date: '2014-11-05',
  vote_average: 8.3,
  runtime: 169,
  revenue: 675120017,
  backdrop_path: '/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
};

const mockSearchResults = {
  results: [
    {
      id: 157336,
      original_title: 'Interstellar',
      release_date: '2014-11-05',
    },
    {
      id: 2,
      original_title: 'Interstellar 2',
      release_date: '2025-01-01',
    },
  ],
};

const mockNewMovie = {
  ...mockMovie,
  id: 2,
  original_title: 'Interstellar 2',
  tagline: 'The sequel',
  overview: 'More space adventures',
};

describe('Exercise3 Component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mock((url: string) => {
      if (url.includes('search/movie')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSearchResults),
        });
      }
      if (url.includes('movie/157336')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockMovie),
        });
      }
      if (url.includes('movie/2')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockNewMovie),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    }) as any;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    cleanup();
  });

  test('renders initial movie details', async () => {
    render(<Exercise3 />);

    await waitFor(() => {
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Mankind was born on Earth. It was never meant to die here.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Adventure, Drama, Science Fiction/)
    ).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    const user = userEvent.setup();
    render(<Exercise3 />);

    await waitFor(() => {
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search movie title/i);

    await user.type(searchInput, 'Interstellar');

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent('Interstellar');
      expect(items[0]).toHaveTextContent('2014');
      expect(items[1]).toHaveTextContent('Interstellar 2');
      expect(items[1]).toHaveTextContent('2025');
    });

    const items = screen.getAllByRole('listitem');
    await user.click(items[1]!);

    await waitFor(() => {
      expect(screen.getByText('Interstellar 2')).toBeInTheDocument();
      expect(screen.getByText('The sequel')).toBeInTheDocument();
    });
  });

  test('handles search with no results', async () => {
    global.fetch = mock((url: string) => {
      if (url.includes('search/movie')) {
        return Promise.resolve({
          json: () => Promise.resolve({ results: [] }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockMovie),
      });
    }) as any;

    const user = userEvent.setup();
    render(<Exercise3 />);

    await waitFor(() => {
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search movie title/i);
    await user.type(searchInput, 'NonExistentMovie');

    await new Promise((resolve) => setTimeout(resolve, 500));

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
