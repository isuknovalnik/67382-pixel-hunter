import {IntroView} from './intro-view';
import selectScreen from './select-screen.js';
import greeting from './greeting.js';

export default () => {
  const gameIntro = new IntroView();
  gameIntro.onEnter = () => {
    greeting();
  };
  selectScreen(gameIntro.element);
};
