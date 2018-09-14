import Application from './application.js';
import {IntroView} from './intro-view';

export default class IntroScreen {
  constructor() {
    this.gameIntro = new IntroView();
    this.gameIntro.onEnter = () => {
      Application.showGreeting();
    };
  }

  get element() {
    return this.gameIntro.element;
  }
}
