/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
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
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
        <h1 data-testid="settings-title" className="text-4xl font-bold mb-4">
          Settings
        </h1>
        <form action="#">
          <div className="flex flex-col items-center">
            <label
              htmlFor="number-of-questions"
              className="text-xl mb-2 font-bold"
            >
              Number of Questions:
            </label>
            <input
              type="number"
              name="numberOfQuestions"
              id="number-of-questions"
              data-testid="question-input-number"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
              onChange={ this.handleChange }
              value={ numberOfQuestions }
            />

            <label htmlFor="category" className="text-xl mb-2 font-bold">
              Category:
            </label>
            <select
              name="category"
              id="category"
              data-testid="question-category-select"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
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

            <label htmlFor="difficulty" className="text-xl mb-2 font-bold">
              Difficulty:
            </label>
            <select
              name="difficulty"
              id="difficulty"
              data-testid="question-difficulty-select"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
              onChange={ this.handleChange }
              value={ difficulty }
            >
              <option value="">Any</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>

            <label htmlFor="type" className="text-xl mb-2 font-bold">
              Type:
            </label>
            <select
              name="type"
              id="type"
              data-testid="question-type-select"
              className="w-48 h-10 mb-2 rounded-md text-black text-center font-bold focus:outline-none focus:ring-2 focus:ring-zinc-500"
              onChange={ this.handleChange }
              value={ type }
            >
              <option value="">Any</option>
              <option value="multiple">Múltipla Escolha</option>
              <option value="boolean">Verdadeiro ou Falso</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              data-testid="btn-add-settings"
              className="bg-lime-500 hover:bg-lime-700 transition duration-150 ease-in text-white font-bold py-2 px-4 rounded-md mt-4 mr-4"
              onClick={ this.handleSubmit }
            >
              Save Settings
            </button>

            <button
              type="button"
              data-testid="btn-goBack-settings"
              className="bg-zinc-500 hover:bg-zinc-700 transition duration-150 ease-in text-white font-bold py-2 px-4 rounded-md mt-4"
              onClick={ () => history.push('/') }
            >
              Go Back
            </button>
          </div>
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
