import {HeaderView} from './header-view';
import {RulesView} from './rules-view';
import selectScreen from './select-screen.js';
import {startPlaying} from './playing.js';
import backToGreeting from './back.js';

export default () => {
  const rulesHeader = new HeaderView(false);
  const gameRules = new RulesView();
  rulesHeader.onBack = backToGreeting;
  gameRules.onNameInput = () => {
    gameRules.rulesButton.disabled = !gameRules.playerNameInput.value;
  };
  gameRules.onContinue = () => {
    startPlaying();
  };
  selectScreen(rulesHeader.element, gameRules.element);
};
