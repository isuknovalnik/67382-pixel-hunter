import {
  INITIAL_GAME,
  changeLevel,
  changeAnswers,
  changeLives,
  scoring,
  TEST_ANSWERS_2,
  TEST_ANSWERS_3,
  TEST_RESULT_3
} from './quest.js';

export default class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.resetGame();
  }

  get state() {
    return Object.freeze(this._state);
  }

  get question() {
    return this.questions[this._state.level];
  }

  results(isWin) {
    if (isWin) {
      return [this._state.answers, scoring(this._state.answers, this._state.lives), TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3];
    } else {
      return [this._state.answers, `FAIL`, TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3];
    }
  }

  addAnswer(answer, time) {
    this._state = changeAnswers(this._state, answer, ((time > 0) ? time : 1));
  }

  updateLives(lives) {
    this._state = changeLives(this._state, lives);
  }

  updateLevel(level) {
    this._state = changeLevel(this._state, level);
  }

  resetGame() {
    this._state = Object.assign({}, INITIAL_GAME);
  }

  resetTime() {
    this._state = Object.assign({}, this._state, {
      time: 0
    });
  }

  tick() {
    this._state = Object.assign({}, this._state, {
      time: this._state.time + 1
    });
  }
}
