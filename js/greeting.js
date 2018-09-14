import Application from './application.js';
import {GreetingView} from './greeting-view';

export default class GreetingScreen {
  constructor() {
    this.gameGreeting = new GreetingView();
    this.gameGreeting.onContinue = () => {
      Application.showRules();
    };
  }

  get element() {
    return this.gameGreeting.element;
  }
}
