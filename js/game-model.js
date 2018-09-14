import {
  INITIAL_GAME,
  TEST_QUESTIONS,
  changeLevel,
  changeAnswers,
  changeLives,
  scoring,
  TEST_ANSWERS_2,
  TEST_ANSWERS_3,
  TEST_RESULT_3
} from './data/quest.js';

export default class GameModel {
  constructor() {
    this.resetGame();
  }

  get state() {
    return Object.freeze(this._state);
  }

  get question() {
    return TEST_QUESTIONS[this._state.level];
  }

  results(isWin) {
    if (isWin) {
      return [this._state.answers, scoring(this._state.answers, this._state.lives), TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3];
    } else {
      return [this._state.answers, `FAIL`, TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3];
    }
  }

  addAnswer(answer, time) {
    changeAnswers(this._state, answer, time);
  }

  updateLives(lives) {
    changeLives(this._state, lives);
  }

  updateLevel(level) {
    changeLevel(this._state, level);
  }

  resetGame() {
    this._state = Object.assign({}, INITIAL_GAME);
  }

  tick() {
    this._state = Object.assign({}, this._state, {
      time: this._state.time + 1
    });
  }
}
