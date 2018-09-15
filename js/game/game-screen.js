import Application from '../application.js';
import {HeaderView} from '../view/header-view';
import {GameScreenView} from '../view/game-screen-view';
import {selectScreen, replaceHeader} from '../select-screen.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.currentQuestion = this.model.question;
    this._timer = null;

    this.gameHeader = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    this.currentGameScreen = new GameScreenView(this.currentQuestion, this.model.state.answers);
    this.gameHeader.onBack = this.backToGreeting;
    this.createGameHandlers.bind(this);
  }

  backToGreeting() {
    Application.showGreeting();
  }

  get element() {
    return [this.gameHeader.element, this.currentGameScreen.element];
  }

  startTimer() {
    this._timer = setTimeout(() => {
      this.model.tick();
      if (this.model.state.time >= 30) {
        this.stopTimer();
        this.answeredQuestion(false);
      }
      this.updateHeader();
      this.startTimer();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this._timer);
  }

  startPlaying() {
    this.changeGameScreen();
    this.startTimer();
  }

  createGameHandlers() {
    if (this.currentQuestion.type === 1) {
      const question1 = [];
      const question2 = [];

      this.currentGameScreen.gameInputs.forEach((it) => {
        if (it.name === `question1`) {
          question1.push(it);
        } else if (it.name === `question2`) {
          question2.push(it);
        }
      });

      const allQuestions = [question1, question2];

      const isAnswered = (question) => {
        return question.some((it) => it.checked);
      };

      const allAnswered = (questions) => {
        return questions.every((it) => isAnswered(it));
      };

      this.currentGameScreen.onChecked = () => {
        if (allAnswered(allQuestions)) {
          this.stopTimer();
          let newAnswer = {
            "answer": ((question1.find((it) => it.checked).value === this.currentQuestion.answers[0].correct) && (question2.find((it) => it.checked).value === this.currentQuestion.answers[1].correct)),
            "time": this.model.state.time
          };
          this.answeredQuestion(newAnswer);
        }
      };
    } else {
      this.currentGameScreen.onChecked = (_inputElem) => {
        this.stopTimer();
        let newAnswer;
        if (this.currentQuestion.type === 2) {
          newAnswer = {
            "answer": (_inputElem.value === this.currentQuestion.answers[0].correct),
            "time": this.model.state.time
          };
        } else {
          const selectedImg = _inputElem.querySelector(`img`);
          newAnswer = {
            "answer": (selectedImg.getAttribute(`alt`).indexOf(String(this.currentQuestion.answers.findIndex((it) => it.correct) + 1)) !== -1),
            "time": this.model.state.time
          };
        }
        this.answeredQuestion(newAnswer);
      };
    }
  }

  answeredQuestion(newAnswer) {
    this.model.addAnswer(newAnswer.answer, newAnswer.time);
    if (!newAnswer.answer) {
      const newLives = this.model.state.lives - 1;
      if (newLives >= 0) {
        this.model.updateLives(newLives);
      } else {
        Application.showStats(this.model.results(false));
        return;
      }
    }
    if (this.model.state.level < 10) {
      this.startPlaying();
    } else {
      Application.showStats(this.model.results(true));
    }
  }

  changeGameScreen() {
    this.currentQuestion = this.model.question;
    this.model.updateLevel(this.model.state.level + 1);
    this.gameHeader = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    this.gameHeader.onBack = this.backToGreeting;
    this.currentGameScreen = new GameScreenView(this.currentQuestion, this.model.state.answers);
    this.createGameHandlers.bind(this);
    selectScreen(this.gameHeader.element, this.currentGameScreen.element);
  }

  updateHeader() {
    const header = new HeaderView(true, {timer: this.model.state.time, lives: this.model.state.lives});
    replaceHeader(header.element, this.gameHeader.element);
    this.gameHeader = header;
    this.gameHeader.onBack = this.backToGreeting;
  }
}
