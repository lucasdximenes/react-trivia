import { MD5 } from 'crypto-js';

export const getLocalStorageTriviaToken = () => {
  const token = localStorage.getItem('token');
  return token || '';
};

export const saveTriviaToken = (token) => {
  localStorage.setItem('token', token);
};

export const deleteTriviaToken = () => {
  localStorage.removeItem('token');
};

export const getLocalStorageRanking = () => {
  const ranking = localStorage.getItem('ranking');
  return ranking ? JSON.parse(ranking) : [];
};

export const savePlayerRanking = (player) => {
  const { name, score, gravatarEmail } = player;
  const ranking = getLocalStorageRanking();
  const newPlayer = {
    name,
    score,
    picture: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`,
  };
  const newRanking = [...ranking, newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};
