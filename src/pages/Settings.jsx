/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getTriviaCategories } from '../services/triviaAPI';
import { addConfig } from '../redux/actions';

class Settings extends Component {
  _isMounted = false;

  state = {
    categories: [],
    numberOfQuestions: '',
    category: '',
    difficulty: '',
    type: '',
  };

  async componentDidMount() {
    this._isMounted = true;
    const {
      config: { numberOfQuestions, category, difficulty, type },
    } = this.props;
    const { trivia_categories: categories } = await getTriviaCategories();
    if (this._isMounted) {
      this.setState({
        categories,
        numberOfQuestions,
        category,
        difficulty,
        type,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { numberOfQuestions, category, difficulty, type } = this.state;
    const { addConfigAction, history } = this.props;
    addConfigAction({ numberOfQuestions, category, difficulty, type });
    history.push('/');
  };

  render() {
    const { categories, numberOfQuestions, category, difficulty, type } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <form action="#">
          <label htmlFor="number-of-questions">
            Number of Questions:
            <input
              type="number"
              name="numberOfQuestions"
              id="number-of-questions"
              data-testid="question-input-number"
              onChange={ this.handleChange }
              value={ numberOfQuestions }
            />
          </label>
          <label htmlFor="category">
            Category:
            <select
              name="category"
              id="category"
              data-testid="question-category-select"
              onChange={ this.handleChange }
              value={ category }
            >
              <option value="">Any</option>
              {categories.map((cat) => (
                <option key={ cat.id } value={ cat.id }>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty:
            <select
              name="difficulty"
              id="difficulty"
              data-testid="question-difficulty-select"
              onChange={ this.handleChange }
              value={ difficulty }
            >
              <option value="">Any</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>
          </label>
          <label htmlFor="type">
            Type:
            <select
              name="type"
              id="type"
              data-testid="question-type-select"
              onChange={ this.handleChange }
              value={ type }
            >
              <option value="">Any</option>
              <option value="multiple">Múltipla Escolha</option>
              <option value="boolean">Verdadeiro ou Falso</option>
            </select>
          </label>
          <button
            type="button"
            data-testid="btn-add-settings"
            onClick={ this.handleSubmit }
          >
            Save Settings
          </button>
          <button
            type="button"
            data-testid="btn-goBack-settings"
            onClick={ () => history.push('/') }
          >
            Go Back
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addConfigAction: (config) => dispatch(addConfig(config)),
});

const mapStateToProps = (state) => ({
  config: state.config,
});

Settings.propTypes = {
  addConfigAction: propTypes.func.isRequired,
  config: propTypes.shape({
    numberOfQuestions: propTypes.string,
    category: propTypes.string,
    difficulty: propTypes.string,
    type: propTypes.string,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
