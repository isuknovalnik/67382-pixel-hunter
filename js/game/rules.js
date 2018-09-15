import Application from '../application.js';
import {HeaderView} from '../view/header-view';
import {RulesView} from '../view/rules-view';

export default class RulesScreen {
  constructor() {
    this.rulesHeader = new HeaderView(false);
    this.gameRules = new RulesView();
    this.rulesHeader.onBack = () => {
      Application.showGreeting();
    };
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
