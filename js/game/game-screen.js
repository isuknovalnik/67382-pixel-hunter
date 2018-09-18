import Application from '../application.js';
import {HeaderView} from '../view/header-view';
import {GameScreenView} from '../view/game-screen-view';
import {selectScreen, replaceHeader} from '../select-screen.js';

const TYPE1_FIRST_QUESTION_INPUT = `question1`;
const TYPE1_SECOND_QUESTION_INPUT = `question2`;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.currentQuestion = this.model.question;
    this._timer = null;

    this.gameHeader = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    this.currentGameScreen = new GameScreenView(this.currentQuestion, this.model.state.answers);
    this._backToGreeting = this._backToGreeting.bind(this);
    this.gameHeader.onBack = this._backToGreeting;
    this._createGameHandlers = this._createGameHandlers.bind(this);
  }

  _backToGreeting() {
    this._stopTimer();
    this.model.resetGame();
    Application.showGreeting();
  }

  get element() {
    return [this.gameHeader.element, this.currentGameScreen.element];
  }

  _startTimer() {
    this._timer = setTimeout(() => {
      this.model.tick();
      if (this.model.state.time >= 30) {
        this._stopTimer();
        this._answeredQuestion({"answer": false, "time": 30});
      } else {
        this._updateHeader();
        this._startTimer();
      }
    }, 1000);
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  startPlaying() {
    this._changeGameScreen();
    this._startTimer();
  }

  _createGameHandlers() {
    if (this.currentQuestion.type === 1) {
      const _question1 = [];
      const _question2 = [];

      this.currentGameScreen.gameInputs.forEach((it) => {
        if (it.name === TYPE1_FIRST_QUESTION_INPUT) {
          _question1.push(it);
        } else if (it.name === TYPE1_SECOND_QUESTION_INPUT) {
          _question2.push(it);
        }
      });

      const _allQuestions = [_question1, _question2];

      const _isAnswered = (_question) => {
        return _question.some((it) => it.checked);
      };

      const _allAnswered = (_questions) => {
        return _questions.every((it) => _isAnswered(it));
      };

      this.currentGameScreen.onChecked = () => {
        if (_allAnswered(_allQuestions)) {
          this._stopTimer();
          let _newAnswer = {
            "answer": ((_question1.find((it) => it.checked).value === this.currentQuestion.answers[0].correct) && (_question2.find((it) => it.checked).value === this.currentQuestion.answers[1].correct)),
            "time": this.model.state.time
          };
          this._answeredQuestion(_newAnswer);
        }
      };
    } else {
      this.currentGameScreen.onChecked = (_inputElem) => {
        this._stopTimer();
        let _newAnswer;
        if (this.currentQuestion.type === 2) {
          _newAnswer = {
            "answer": (_inputElem.value === this.currentQuestion.answers[0].correct),
            "time": this.model.state.time
          };
        } else {
          const selectedImg = _inputElem.querySelector(`img`);
          _newAnswer = {
            "answer": (selectedImg.getAttribute(`alt`).indexOf(String(this.currentQuestion.answers.findIndex((it) => it.correct) + 1)) !== -1),
            "time": this.model.state.time
          };
        }
        this._answeredQuestion(_newAnswer);
      };
    }
  }

  _answeredQuestion(_newAnswer) {
    this.model.addAnswer(_newAnswer.answer, _newAnswer.time);
    if (!_newAnswer.answer) {
      const _newLives = this.model.state.lives - 1;
      if (_newLives >= 0) {
        this.model.updateLives(_newLives);
      } else {
        Application.showStats(this.model);
        return;
      }
    }
    if (this.model.state.level < 10) {
      this.startPlaying();
    } else {
      Application.showStats(this.model);
    }
  }

  _changeGameScreen() {
    this.currentQuestion = this.model.question;
    this.model.updateLevel(this.model.state.level + 1);
    this.model.resetTime();
    this.gameHeader = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    this._backToGreeting = this._backToGreeting.bind(this);
    this.gameHeader.onBack = this._backToGreeting;
    this.currentGameScreen = new GameScreenView(this.currentQuestion, this.model.state.answers);
    this._createGameHandlers = this._createGameHandlers.bind(this);
    this._createGameHandlers();
    selectScreen(this.gameHeader.element, this.currentGameScreen.element);
  }

  _updateHeader() {
    const header = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    replaceHeader(header.element, this.gameHeader.element);
    this.gameHeader = header;
    this.gameHeader.onBack = this._backToGreeting;
  }
}
