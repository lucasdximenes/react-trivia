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
        <div>
          <h1 data-testid="feedback-text">
            {assertions >= MINIMUM_ASSERTIONS
              ? 'Well Done!'
              : 'Could be better...'}
          </h1>
          <h2 data-testid="feedback-total-score">{score}</h2>
          <h2 data-testid="feedback-total-question">{assertions}</h2>
          <button
            type="button"
            data-testid="btn-play-again"
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
