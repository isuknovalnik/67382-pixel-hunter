import {AbstractView} from "./abstract-view";

export class HeaderView extends AbstractView {
  constructor(full, state) {
    super();
    this.full = full;
    if (full) {
      this.state = state;
    }
  }

  get template() {
    const gameHeaderTemplate = (state) => `<div class="game__timer">${state.timer}</div>
      <div class="game__lives">
        ${new Array(3 - state.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
          .join(``)}${new Array(state.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
      </div>`;

    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      ${this.full ? gameHeaderTemplate(this.state) : ``}
    </header>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onBack();
    });

    this.backButton = backButton;
  }

  onBack() {
  }
}
