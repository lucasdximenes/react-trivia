import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockInvalidQuestions, mockQuestions } from './helpers/mockQuestions';

describe('Test the game page', () => {
  it('should render the game page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    expect(history.location.pathname).toBe('/game');
  });

  it('should have a button to cancel game when clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    const button = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });

  it('should disable options when clicked', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockQuestions,
    }));
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const button = screen.getByTestId('correct-answer');
    const wrongButton = screen.getByText(/true/i);
    userEvent.click(button);
    expect(button).toBeDisabled();
    expect(wrongButton).toBeDisabled();
  });

  it('should have a button to next question when click in option', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockQuestions,
    }));
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const button = screen.getByTestId('correct-answer');
    userEvent.click(button);
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should go to next question when click in next button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockQuestions,
    }));
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const button = screen.getByTestId('correct-answer');
    userEvent.click(button);
    const nextButton = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButton);
    expect(nextButton).not.toBeInTheDocument();
  });

  it('should disable options when wait more than 30 seconds', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockQuestions,
    }));
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const button = screen.getByTestId('correct-answer');
    const wrongButton = screen.getByText(/true/i);
    const timer = screen.getByTestId('question-timer');

    await new Promise((resolve) => setTimeout(resolve, 32000));

    expect(button).toBeDisabled();
    expect(wrongButton).toBeDisabled();
  }, 34000);

  it('should go to feedback page when answer all questions', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockQuestions,
    }));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const answerOne = screen.getByTestId('correct-answer');
    userEvent.click(answerOne);
    const nextButtonOne = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonOne);

    const answerTwo = screen.getByTestId('correct-answer');
    userEvent.click(answerTwo);
    const nextButtonTwo = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonTwo);

    const answerThree = screen.getByTestId('correct-answer');
    userEvent.click(answerThree);
    const nextButtonThree = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonThree);

    const answerFour = screen.getByTestId('correct-answer');
    userEvent.click(answerFour);
    const nextButtonFour = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonFour);

    const answerFive = screen.getByText(/akira toriyama/i);
    userEvent.click(answerFive);
    const nextButtonFive = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonFive);

    expect(history.location.pathname).toBe('/feedback');
  });

  it('should return to login page if token has expired', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockInvalidQuestions,
    }));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/');
  });
});
