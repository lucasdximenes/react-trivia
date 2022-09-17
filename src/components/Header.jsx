import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      player: { name, assertions, score, gravatarEmail },
    } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <img
          src={ gravatar }
          alt={ `${name} gravatar` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <p data-testid="header-assertions">{assertions}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: propTypes.shape({
    name: propTypes.string,
    assertions: propTypes.number,
    score: propTypes.number,
    gravatarEmail: propTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Header);
