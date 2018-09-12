import {AbstractView} from "./abstract-view";

export class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }

  bind() {
    const introButton = this.element.querySelector(`.intro__asterisk`);

    introButton.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onEnter();
    });
    this.introButton = introButton;
  }

  onEnter() {
  }
}
