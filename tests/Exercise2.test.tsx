import { expect, test, describe, afterEach } from 'bun:test';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SimpleTodos from '@/components/Exercise2/SimpleTodos';
import '@testing-library/jest-dom';

describe('SimpleTodos Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the initial list of todos', () => {
    render(<SimpleTodos />);

    const heading = screen.getByRole('heading', { name: /simple todos/i });
    expect(heading).toBeInTheDocument();

    const initialTodos = [
      'Book the ticket for today evening',
      'Rent the movie for tomorrow movie night',
      'Confirm the slot for the yoga session tomorrow morning',
      'Drop the parcel at Bloomingdale',
      'Order fruits on Big Basket',
      'Fix the production issue',
      'Confirm my slot for Saturday Night',
      'Get essentials for Sunday car wash',
    ];

    initialTodos.forEach((todoText) => {
      expect(screen.getByText(todoText)).toBeInTheDocument();
    });

    // Check if we have 8 delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(8);
  });

  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<SimpleTodos />);

    const todoToDelete = 'Book the ticket for today evening';
    const todoItem = screen.getByText(todoToDelete).closest('li');
    expect(todoItem).toBeInTheDocument();

    if (!todoItem) throw new Error('Todo item not found');

    const deleteButton = within(todoItem).getByRole('button', {
      name: /delete/i,
    });

    await user.click(deleteButton);

    expect(screen.queryByText(todoToDelete)).not.toBeInTheDocument();

    // Should have 7 items left
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(7);
  });

  test('deletes multiple todos correctly', async () => {
    const user = userEvent.setup();
    render(<SimpleTodos />);

    // Delete first item
    const firstTodo = 'Book the ticket for today evening';
    const firstItem = screen.getByText(firstTodo).closest('li');
    if (!firstItem) throw new Error('First item not found');
    await user.click(
      within(firstItem).getByRole('button', { name: /delete/i })
    );
    expect(screen.queryByText(firstTodo)).not.toBeInTheDocument();

    // Verify the first item is now ID 2
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('2');
    expect(items[0]).toHaveTextContent(
      'Rent the movie for tomorrow movie night'
    );

    // Delete another item
    const secondTodo = 'Rent the movie for tomorrow movie night';
    const secondItem = screen.getByText(secondTodo).closest('li');
    if (!secondItem) throw new Error('Second item not found');
    await user.click(
      within(secondItem).getByRole('button', { name: /delete/i })
    );
    expect(screen.queryByText(secondTodo)).not.toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(6);

    // Verify the first item is now ID 3
    const newItems = screen.getAllByRole('listitem');
    expect(newItems[0]).toHaveTextContent('3');
  });

  test('deletes all todos', async () => {
    const user = userEvent.setup();
    render(<SimpleTodos />);

    const initialCount = 8;

    for (let i = 0; i < initialCount; i++) {
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      await user.click(deleteButtons[0]!);
    }

    const deleteButtons = screen.queryAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(0);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
