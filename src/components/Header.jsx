/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      player: { name, score, gravatarEmail },
    } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className="flex flex-col gap-2 bg-slate-700 text-white p-4 md:flex-row md:justify-around md:items-center">
        <img
          src={ gravatar }
          alt={ `${name} gravatar` }
          data-testid="header-profile-picture"
          className="w-24 h-24 rounded-full mx-auto md:mx-0"
        />
        <span
          data-testid="header-player-name"
          className="text-center text-2xl font-bold md:text-left"
        >
          {name}
        </span>
        <span
          data-testid="header-score"
          className="text-center text-2xl font-bold md:text-left"
        >
          {`Score: ${score}`}
        </span>
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
    score: propTypes.number,
    gravatarEmail: propTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Header);
