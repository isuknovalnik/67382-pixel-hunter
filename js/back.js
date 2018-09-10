import greeting from './greeting.js';
import {resetGame} from './playing.js';

const backToGreeting = () => {
  resetGame();
  greeting();
};

export default backToGreeting;
