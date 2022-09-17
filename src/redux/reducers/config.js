const ADD_CONFIG = 'ADD_CONFIG';

const initialState = {
  numberOfQuestions: '5',
  category: '',
  difficulty: '',
  type: '',
};

const config = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CONFIG:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default config;
