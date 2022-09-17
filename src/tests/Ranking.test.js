import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('test ranking page', () => {
  it('test if the ranking page is rendered', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const rankingTitle = screen.getByTestId('ranking-title');
    expect(rankingTitle).toBeInTheDocument();
  });

  it('should have a button to go back when clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');

    const backButton = screen.getByRole('button', { name: /return/i });
    expect(backButton).toBeInTheDocument();
    userEvent.click(backButton);
    expect(history.location.pathname).toBe('/');
  });

  it('should have a button to go home when clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');

    const loginButton = screen.getByRole('button', { name: /home/i });
    expect(loginButton).toBeInTheDocument();
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/');
  });

  it('should render the sorted ranking', () => {
    // mock the localStorage
    const mockLocalStorage = {
      getItem: jest.fn(() =>
        JSON.stringify([
          {
            name: 'Player 1',
            score: 10,
            picture:
              'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
          },
          {
            name: 'Player 2',
            score: 20,
            picture:
              'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
          },
          {
            name: 'Player 3',
            score: 30,
            picture:
              'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
          },
        ]),
      ),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const peopleOne = screen.getByTestId('player-name-0');
    const peopleTwo = screen.getByTestId('player-name-1');
    const peopleThree = screen.getByTestId('player-name-2');
    expect(peopleOne).toHaveTextContent('Player 3');
    expect(peopleTwo).toHaveTextContent('Player 2');
    expect(peopleThree).toHaveTextContent('Player 1');
  });
});
