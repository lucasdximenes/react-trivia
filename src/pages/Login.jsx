import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import { getTriviaToken } from '../services/triviaAPI';
import { saveTriviaToken } from '../services/localStorage';

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
      <div>
        <form action="#">
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="name">
            Name:
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="btn-play"
            type="button"
            disabled={ !emailRegex.test(email) || name.length < 1 }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
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
