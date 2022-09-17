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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ () => {
            history.goBack();
          } }
        >
          Return
        </button>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            resetStateAction();
            history.push('/');
          } }
        >
          Home
        </button>
        <div>
          {ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ `player ${player.name}` } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
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
