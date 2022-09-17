/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getTriviaQuestions } from '../services/triviaAPI';
import {
  getLocalStorageTriviaToken,
  deleteTriviaToken,
  savePlayerRanking,
} from '../services/localStorage';
import { addScoreAndAssertions, resetState } from '../redux/actions';

import Header from '../components/Header';

class Game extends Component {
  _isMounted = false;

  state = {
    questions: [],
    actualQuestion: 0,
    answered: false,
    timer: 30,
  };

  async componentDidMount() {
    this._isMounted = true;
    await this.initGame();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initGame = async () => {
    const INVALID_TOKEN_CODE = 3;
    const {
      history,
      config: { numberOfQuestions, category, difficulty, type },
    } = this.props;

    const TOKEN = getLocalStorageTriviaToken();
    const { response_code: resCode, results } = await getTriviaQuestions(
      TOKEN,
      numberOfQuestions,
      category,
      difficulty,
      type,
    );
    if (resCode === INVALID_TOKEN_CODE) {
      deleteTriviaToken();
      history.push('/');
    }

    // Shuffle the answers
    const questions = results.map((question) => {
      const RANDOM_FACTOR = 0.5;
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = question;
      const answers = [...incorrectAnswers, correctAnswer];
      const shuffledAnswers = answers.sort(() => Math.random() - RANDOM_FACTOR);
      return { ...question, answers: shuffledAnswers };
    });

    if (this._isMounted) {
      this.setState({ questions }, () => this.startTimer());
    }
  };

  handleAnswer = (answer) => {
    const { questions, actualQuestion, timer } = this.state;
    this.setState({ answered: true });
    clearInterval(this.timerId);
    if (questions[actualQuestion].correct_answer === answer) {
      const { addScoreAndAssertionsAction } = this.props;
      const { difficulty } = questions[actualQuestion];
      const DEFAULT_POINTS = 10;
      const difficulties = ['easy', 'medium', 'hard'];
      const score = DEFAULT_POINTS + (timer * difficulties.indexOf(difficulty) + 1);
      addScoreAndAssertionsAction({ score, assertions: 1 });
    }
  };

  // countDown timer
  countDownTimer = () => {
    const { timer, answered } = this.state;
    if (timer > 0 && !answered && this._isMounted) {
      this.setState({ timer: timer - 1 });
    }
    if (timer === 0) {
      clearInterval(this.timerId);
      this.setState({ answered: true });
    }
  };

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.timerId = setInterval(() => {
      this.countDownTimer();
    }, ONE_SECOND);
  };

  nextQuestion = () => {
    const { questions, actualQuestion } = this.state;
    const { history } = this.props;
    if (actualQuestion < questions.length - 1) {
      this.setState(
        { actualQuestion: actualQuestion + 1, answered: false, timer: 30 },
        () => this.startTimer(),
      );
    } else {
      const { player } = this.props;
      savePlayerRanking(player);
      history.push('/feedback');
    }
  };

  render() {
    const { questions, actualQuestion, answered, timer } = this.state;
    const { history, resetStateAction } = this.props;
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center bg-gray-800 text-white h-screen">
          <div className="mt-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={ () => {
                history.push('/');
                resetStateAction();
              } }
            >
              Cancel game
            </button>
          </div>
          {questions?.length > 0 ? (
            <div
              className="flex flex-col items-center bg-gray-800 text-white h-screen"
              data-testid="question"
            >
              <div className="mt-4 mb-4">
                <span
                  data-testid="question-timer"
                  className="text-2xl font-bold"
                >
                  {`Timer: ${timer}`}
                </span>
              </div>
              {questions[actualQuestion] && (
                <div className="flex flex-col">
                  <span
                    data-testid="question-category"
                    className="text-lg text-center mb-4"
                  >
                    {`Category: ${questions[actualQuestion].category}`}
                  </span>
                  <span
                    data-testid="question-text"
                    className="text-xl mb-4 mx-4"
                    dangerouslySetInnerHTML={ {
                      __html: questions[actualQuestion].question,
                    } }
                  />
                  <div
                    data-testid="answer-options"
                    className="flex flex-col items-center gap-2"
                  >
                    {questions[actualQuestion].answers.map((answer, index) => (
                      <button
                        key={ index }
                        type="button"
                        data-testid={
                          questions[actualQuestion].correct_answer === answer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-1/2 mx-auto "
                        dangerouslySetInnerHTML={ { __html: answer } }
                        aria-label="answer"
                        style={
                          answered
                            ? {
                              border:
                                  questions[actualQuestion].correct_answer
                                  === answer
                                    ? '3px solid rgb(6, 240, 15)'
                                    : '3px solid red',
                            }
                            : {}
                        }
                        disabled={ answered }
                        onClick={ () => {
                          this.handleAnswer(answer);
                        } }
                      />
                    ))}
                  </div>
                  {answered && (
                    <button
                      type="button"
                      data-testid="btn-next"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
                      onClick={ this.nextQuestion }
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              data-testid="loading"
              className="flex flex-col items-center h-full"
            >
              <h1
                data-testid="loading"
                className="text-2xl font-bold text-center mt-4"
              >
                No questions found. Please, try again with different settings.
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  addScoreAndAssertionsAction: propTypes.func.isRequired,
  resetStateAction: propTypes.func.isRequired,
  player: propTypes.shape({
    name: propTypes.string,
    assertions: propTypes.number,
    score: propTypes.number,
    gravatarEmail: propTypes.string,
  }).isRequired,
  config: propTypes.shape({
    numberOfQuestions: propTypes.string,
    category: propTypes.string,
    difficulty: propTypes.string,
    type: propTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScoreAndAssertionsAction: (payload) => dispatch(addScoreAndAssertions(payload)),
  resetStateAction: () => dispatch(resetState()),
});

const mapStateToProps = (state) => ({
  player: state.player,
  config: state.config,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
