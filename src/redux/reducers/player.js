const LOGIN = 'LOGIN';
const ADD_SCORE = 'ADD_SCORE';
const RESET_STATE = 'RESET_STATE';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
      score: state.score + action.payload.score,
    };
  case RESET_STATE:
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default player;
