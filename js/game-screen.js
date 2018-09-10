import {HeaderView} from './header-view';
import {GameScreenView} from './game-screen-view';
import selectScreen from './select-screen.js';
import {answeredQuestion} from './playing.js';
import backToGreeting from './back.js';

export const newGameScreen = (currentQuestion, currentAnswers, currentLives) => {
  const gameHeader = new HeaderView(true, {timer: 15, lives: currentLives});
  const gameScreen = new GameScreenView(currentQuestion, currentAnswers);
  gameHeader.onBack = backToGreeting;

  if (currentQuestion.type === 1) {
    const question1 = [];
    const question2 = [];

    gameScreen.gameInputs.forEach((it) => {
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

    gameScreen.onChecked = () => {
      if (allAnswered(allQuestions)) {
        let newAnswer = {
          "answer": ((question1.find((it) => it.checked).value === currentQuestion.answers[0].correct) && (question2.find((it) => it.checked).value === currentQuestion.answers[1].correct)),
          "time": 15
        };
        answeredQuestion(newAnswer);
      }
    };
  } else {
    gameScreen.onChecked = (_inputElem) => {
      let newAnswer;
      if (currentQuestion.type === 2) {
        newAnswer = {
          "answer": (_inputElem.value === currentQuestion.answers[0].correct),
          "time": 15
        };
      } else {
        const selectedImg = _inputElem.querySelector(`img`);
        newAnswer = {
          "answer": (selectedImg.getAttribute(`alt`).indexOf(String(currentQuestion.answers.findIndex((it) => it.correct) + 1)) !== -1),
          "time": 15
        };
      }
      answeredQuestion(newAnswer);
    };
  }
  selectScreen(gameHeader.element, gameScreen.element);
};
