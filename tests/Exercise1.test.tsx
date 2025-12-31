import { expect, test, describe, afterEach } from 'bun:test';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Exercise1 from '@/pages/Exercise1';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Exercise1 Integration Test', () => {
  afterEach(() => {
    cleanup();
  });

  test('full login and logout flow', async () => {
    const user = userEvent.setup();
    render(<Exercise1 />);

    const loginHeading = screen.getByRole('heading', { name: /sign in/i });
    expect(loginHeading).toBeInTheDocument();

    const successMessage = screen.queryByText('Great Work!');
    expect(successMessage?.parentElement).toHaveClass('hidden');

    const logoutButton = screen.queryByRole('button', { name: /sign out/i });
    expect(logoutButton).not.toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /next/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      const successContainer = screen.getByText('Great Work!').parentElement;
      expect(successContainer).not.toHaveClass('hidden');
    });

    const loginFormContainer =
      loginHeading.closest('div')?.parentElement?.parentElement;

    const logoutButtonVisible = await screen.findByRole('button', {
      name: /sign out/i,
    });
    expect(logoutButtonVisible).toBeInTheDocument();

    await user.click(logoutButtonVisible);

    await waitFor(() => {
      const successContainer = screen.getByText('Great Work!').parentElement;
      expect(successContainer).toHaveClass('hidden');
    });

    expect(
      screen.queryByRole('button', { name: /sign out/i })
    ).not.toBeInTheDocument();
  });
});
