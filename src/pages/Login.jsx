/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import { getTriviaToken } from '../services/triviaAPI';
import { saveTriviaToken } from '../services/localStorage';

import logo from '../images/trivia-logo.png';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    const { email, name } = this.state;
    const { login: loginAction, history } = this.props;
    e.preventDefault();
    loginAction({ name, gravatarEmail: email });
    const { token } = await getTriviaToken();
    saveTriviaToken(token);
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return (
      <div className="flex flex-col items-center h-screen bg-zinc-900 text-white">
        <img
          src={ logo }
          alt="trivia logo"
          className="w-1/2 md:w-1/4 2xl:w-1/6 mt-16 mb-8"
        />
        <form action="#">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl mb-2 font-bold">
              Email:
            </label>
            <input
              data-testid="input-gravatar-email"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />

            <label htmlFor="name" className="text-xl mb-2 font-bold">
              Name:
            </label>
            <input
              data-testid="input-player-name"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />

            <button
              data-testid="btn-play"
              className="w-48 h-10 mt-4 rounded-md bg-lime-500 transition duration-150 ease-in text-white font-bold hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lime-500"
              type="button"
              disabled={ !emailRegex.test(email) || name.length < 1 }
              onClick={ this.handleSubmit }
            >
              Play
            </button>
          </div>
        </form>
        <div className="flex">
          <button
            type="button"
            data-testid="btn-settings"
            className="w-24 h-10 mt-4 rounded-md bg-zinc-500 transition duration-150 ease-in text-white font-bold hover:bg-zinc-600"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            className="w-24 h-10 mt-4 ml-4 rounded-md bg-zinc-500 transition duration-150 ease-in text-white font-bold hover:bg-zinc-600"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  login: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
