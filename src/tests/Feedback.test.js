import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('test feedback page', () => {
  it('test if the feedback page is rendered', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    const feedbackCorrectAnswers = screen.getByTestId(
      'feedback-total-question',
    );
    const playAgainButton = screen.getByRole('button', { name: /play again/i });
    const goRankingButton = screen.getByRole('button', { name: /ranking/i });
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
    expect(feedbackCorrectAnswers).toBeInTheDocument();
    expect(playAgainButton).toBeInTheDocument();
    expect(goRankingButton).toBeInTheDocument();
  });

  it('test if the play again button redirect to login page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const playAgainButton = screen.getByRole('button', { name: /play again/i });
    userEvent.click(playAgainButton);
    expect(history.location.pathname).toBe('/');
  });

  it('test if the ranking button redirect to ranking page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const rankingButton = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');
  });

  it("test if the feedback page is rendered with 'could be better...' with score < 3", () => {
    const { store } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const {
      player: { assertions, score },
    } = store.getState();
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    const feedbackCorrectAnswers = screen.getByTestId(
      'feedback-total-question',
    );
    expect(feedbackText).toHaveTextContent(/could be better\.\.\./i);
    expect(feedbackTotalScore).toHaveTextContent(score);
    expect(feedbackCorrectAnswers).toHaveTextContent(assertions);
  });

  it("test if the feedback page is rendered with 'Well Done!' with score >= 3", () => {
    const mockState = {
      player: {
        name: 'Player',
        assertions: 3,
        score: 33,
        gravatarEmail: 'player@gmail.com',
      },
    };
    const { store } = renderWithRouterAndRedux(<App />, mockState, '/feedback');
    const {
      player: { assertions, score },
    } = store.getState();
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    const feedbackCorrectAnswers = screen.getByTestId(
      'feedback-total-question',
    );
    expect(feedbackText).toHaveTextContent(/well done!/i);
    expect(feedbackTotalScore).toHaveTextContent(score);
    expect(feedbackCorrectAnswers).toHaveTextContent(assertions);
  });
});
