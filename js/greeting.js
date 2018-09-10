import {GreetingView} from './greeting-view';
import selectScreen from './select-screen.js';
import rules from './rules.js';

export default () => {
  const gameGreeting = new GreetingView();
  gameGreeting.onContinue = () => {
    rules();
  };
  selectScreen(gameGreeting.element);
};
