export const getTriviaToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const getTriviaQuestions = async (...args) => {
  const [token, numberOfQuestions, category, difficulty, type] = args;
  let baseURL = 'https://opentdb.com/api.php?';
  baseURL += `amount=${numberOfQuestions}`;
  if (category) baseURL += `&category=${category}`;
  if (difficulty) baseURL += `&difficulty=${difficulty}`;
  if (type) baseURL += `&type=${type}`;
  baseURL += `&token=${token}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  return data;
};

export const getTriviaCategories = async () => {
  const URL = 'https://opentdb.com/api_category.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
