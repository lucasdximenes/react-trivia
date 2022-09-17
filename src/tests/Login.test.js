import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test the login page', () => {
  it('test if inputs of login page is rendered', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
  });

  it('test if the play button is disabled if the inputs are empty', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeDisabled();
  });

  it('test if the play button is enabled if the inputs are filled', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'player@gmail.com');
    userEvent.type(nameInput, 'Player');
    expect(playButton).toBeEnabled();
  });

  it('test if the play button redirect to game page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.type(emailInput, 'player@gmail.com');
    userEvent.type(nameInput, 'Player');
    userEvent.click(playButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
  });

  it('test if the settings button redirect to settings page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
  });

  it('test if the ranking button redirect to ranking page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const rankingButton = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankingButton);
    expect(history.location.pathname).toBe('/ranking');
  });
});
