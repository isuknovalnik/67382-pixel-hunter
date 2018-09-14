import Application from './application.js';
import {HeaderView} from './header-view';
import {RulesView} from './rules-view';
import backToGreeting from './back.js';

export default class RulesScreen {
  constructor() {
    this.rulesHeader = new HeaderView(false);
    this.gameRules = new RulesView();
    this.rulesHeader.onBack = backToGreeting;
    this.gameRules.onNameInput = () => {
      this.gameRules.rulesButton.disabled = !this.gameRules.playerNameInput.value;
    };
    this.gameRules.onContinue = () => {
      Application.showGame();
    };
  }

  get element() {
    return [this.rulesHeader.element, this.gameRules.element];
  }
}
