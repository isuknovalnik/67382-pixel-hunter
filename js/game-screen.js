import render from './render.js';
import backToGreeting from './back.js';
import {gameStats} from './game-stats.js';
import {headerTemplate} from './header.js';
import {answeredQuestion} from './playing.js';

const forms = [
  null,
  `<form class="game__content">`,
  `<form class="game__content  game__content--wide">`,
  `<form class="game__content  game__content--triple">`,
];

const imgTails = [
  null,
  `width="468" height="458">`,
  `width="705" height="455">`,
  `width="304" height="455">`,
];

export const newGameScreen = (currentQuestion, currentAnswers, currentLives) => {
  const template = `<section class="game">
    <p class="game__task">${currentQuestion.task}</p>
    ${forms[currentQuestion.type]}
      <div class="game__option">
        <img src="${currentQuestion.answers[0].answer}" alt="Option 1" ${imgTails[currentQuestion.type]}
        ${(currentQuestion.type < 3) ? `<label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>` : ``}
      </div>
      ${(currentQuestion.type === 1) ? `<div class="game__option">
        <img src="${currentQuestion.answers[1].answer}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>` : ``}
      ${(currentQuestion.type === 3) ? `<div class="game__option  game__option--selected">
        <img src="${currentQuestion.answers[1].answer}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${currentQuestion.answers[2].answer}" alt="Option 3" width="304" height="455">
      </div>` : ``}
    </form>
    ${gameStats(currentAnswers)}
  </section>`;

  const gameScreen = render(headerTemplate(true, {timer: 15, lives: currentLives}) + template);
  const backButton = gameScreen.querySelector(`.back`);
  backToGreeting(backButton);

  let gameInputs;
  let gameChecked;
  if (currentQuestion.type === 3) {
    gameInputs = gameScreen.querySelectorAll(`.game__option`);
  } else {
    gameInputs = gameScreen.querySelectorAll(`input`);
  }

  if (currentQuestion.type === 1) {
    const question1 = [];
    const question2 = [];

    gameInputs.forEach((it) => {
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

    gameChecked = (gameInput) => {
      gameInput.addEventListener(`click`, () => {
        if (allAnswered(allQuestions)) {
          let newAnswer = {
            "answer": ((question1.find((it) => it.checked).value === currentQuestion.answers[0].correct) && (question2.find((it) => it.checked).value === currentQuestion.answers[1].correct)),
            "time": 15
          };
          answeredQuestion(newAnswer);
        }
      });
    };
  } else {
    gameChecked = (gameInput) => {
      gameInput.addEventListener(`click`, () => {
        let newAnswer;
        if (currentQuestion.type === 2) {
          newAnswer = {
            "answer": (gameInput.value === currentQuestion.answers[0].correct),
            "time": 15
          };
        } else {
          const selectedImg = gameInput.querySelector(`img`);
          newAnswer = {
            "answer": (selectedImg.getAttribute(`alt`).indexOf(String(currentQuestion.answers.findIndex((it) => it.correct) + 1)) !== -1),
            "time": 15
          };
        }
        answeredQuestion(newAnswer);
      });
    };
  }

  gameInputs.forEach(gameChecked);

  return gameScreen;
};
