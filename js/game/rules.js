import Application from '../application.js';
import {HeaderView} from '../view/header-view';
import {RulesView} from '../view/rules-view';

let playerName;
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
      playerName = this.gameRules.playerNameInput.value;
      Application.showGame(playerName);
    };
  }

  get element() {
    return [this.rulesHeader.element, this.gameRules.element];
  }
}
