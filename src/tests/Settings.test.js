import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockState from './helpers/mockState';

describe('Test the settings page', () => {
  it('test if the settings page is rendered', () => {
    renderWithRouterAndRedux(<App />, mockState, '/settings');
    const settingsTitle = screen.getByRole('heading', { name: /settings/i });
    const numberOfQuestionsInput = screen.getByRole('spinbutton', {
      name: /number of questions/i,
    });
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    const difficultyInput = screen.getByRole('combobox', {
      name: /difficulty/i,
    });
    const typeInput = screen.getByRole('combobox', { name: /type/i });
    const saveButton = screen.getByRole('button', { name: /save/i });
    const goBackButton = screen.getByRole('button', { name: /go back/i });
    expect(settingsTitle).toBeInTheDocument();
    expect(numberOfQuestionsInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(difficultyInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  it('test if change redux state of numberOfQuestions on save', async () => {
    renderWithRouterAndRedux(<App />, mockState, '/settings');
    const numberOfQuestionsInput = screen.getByRole('spinbutton', {
      name: /number of questions/i,
    });
    const saveButton = screen.getByRole('button', { name: /save/i });
    userEvent.type(numberOfQuestionsInput, '10');
    userEvent.click(saveButton);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    userEvent.click(settingsButton);

    await waitFor(() => {
      const numberOfQuestionsInput2 = screen.getByRole('spinbutton', {
        name: /number of questions/i,
      });
      expect(numberOfQuestionsInput2).toHaveValue(10);
    });
  });

  it('test go back button redirect to login page', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      mockState,
      '/settings',
    );
    const goBackButton = screen.getByRole('button', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();
    userEvent.click(goBackButton);
    expect(history.location.pathname).toBe('/');
  });
});
