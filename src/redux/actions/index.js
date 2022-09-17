const LOGIN = 'LOGIN';
const ADD_SCORE = 'ADD_SCORE';
const RESET_STATE = 'RESET_STATE';
const ADD_CONFIG = 'ADD_CONFIG';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addScoreAndAssertions = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const addConfig = (payload) => ({
  type: ADD_CONFIG,
  payload,
});
