/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { resetState } from '../redux/actions';
import { getLocalStorageRanking } from '../services/localStorage';

class Ranking extends Component {
  render() {
    const { history, resetStateAction } = this.props;
    const ranking = getLocalStorageRanking().sort((a, b) => b.score - a.score);
    return (
      <div className="flex flex-col items-center h-screen bg-gray-800 text-white">
        <h1 data-testid="ranking-title" className="text-2xl font-bold mt-4">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4 w-1/2"
          onClick={ () => {
            history.goBack();
          } }
        >
          Return
        </button>
        <button
          type="button"
          data-testid="btn-go-home"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4 w-1/2"
          onClick={ () => {
            resetStateAction();
            history.push('/');
          } }
        >
          Home
        </button>
        <div className="flex flex-col items-center mt-4">
          {ranking.map((player, index) => (
            <div
              key={ index }
              className="flex flex-col items-center p-4 rounded-lg mt-4 w-80 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              <img
                src={ player.picture }
                alt={ `player ${player.name}` }
                className="rounded-full w-20 h-20"
              />
              <span
                data-testid={ `player-name-${index}` }
                className="text-2xl font-bold"
              >
                {player.name}
              </span>
              <span
                data-testid={ `player-score-${index}` }
                className="text-2xl font-bold"
              >
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetStateAction: () => dispatch(resetState()),
});

Ranking.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func,
    push: propTypes.func,
  }).isRequired,
  resetStateAction: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
