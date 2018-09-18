import {AbstractView} from "./abstract-view";
import {gameStats} from '../game-stats.js';

const TYPE3_OPTIONS_SELECTOR = `.game__option`;

export class GameScreenView extends AbstractView {
  constructor(currentQuestion, currentAnswers) {
    super();
    this.currentQuestion = currentQuestion;
    this.currentAnswers = currentAnswers;
  }

  get template() {
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
    return `<section class="game">
    <p class="game__task">${this.currentQuestion.task}</p>
    ${forms[this.currentQuestion.type]}
      <div class="game__option">
        <img src="${this.currentQuestion.answers[0].answer}" alt="Option 1" ${imgTails[this.currentQuestion.type]}
        ${(this.currentQuestion.type < 3) ? `<label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>` : ``}
      </div>
      ${(this.currentQuestion.type === 1) ? `<div class="game__option">
        <img src="${this.currentQuestion.answers[1].answer}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>` : ``}
      ${(this.currentQuestion.type === 3) ? `<div class="game__option  game__option--selected">
        <img src="${this.currentQuestion.answers[1].answer}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this.currentQuestion.answers[2].answer}" alt="Option 3" width="304" height="455">
      </div>` : ``}
    </form>
    ${gameStats(this.currentAnswers)}
  </section>`;
  }

  get gameInputs() {
    return (this.currentQuestion.type === 3) ? this.element.querySelectorAll(TYPE3_OPTIONS_SELECTOR) : this.element.querySelectorAll(`input`);
  }

  bind() {
    this.gameInputs.forEach((it) => {
      it.addEventListener(`click`, () => {
        this.onChecked(it);
      });
    });
  }

  onChecked(_elem) {
  }
}
