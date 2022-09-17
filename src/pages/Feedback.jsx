/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { resetState } from '../redux/actions';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history, resetStateAction } = this.props;
    const MINIMUM_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center h-screen bg-gray-800 text-white">
          <span data-testid="feedback-text" className="text-2xl font-bold mt-4">
            {assertions >= MINIMUM_ASSERTIONS
              ? 'Well Done!'
              : 'Could be better...'}
          </span>
          <span
            data-testid="feedback-total-score"
            className="text-2xl font-bold mt-4"
          >
            {`Score: ${score}`}
          </span>
          <span
            data-testid="feedback-total-question"
            className="text-2xl font-bold mt-4"
          >
            {`Questions correct: ${assertions}`}
          </span>
          <button
            type="button"
            data-testid="btn-play-again"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
            onClick={ () => {
              resetStateAction();
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetStateAction: () => dispatch(resetState()),
});

Feedback.propTypes = {
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  resetStateAction: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
