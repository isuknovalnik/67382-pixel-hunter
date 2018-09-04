import selectScreen from './select-screen.js';
import greeting from './greeting.js';
import {resetGame} from './playing.js';

const backToGreeting = (backButton) => {
  backButton.addEventListener(`click`, () => {
    resetGame();
    selectScreen(greeting);
  });
};

export default backToGreeting;
