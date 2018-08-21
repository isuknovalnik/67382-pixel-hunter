import selectScreen from './select-screen.js';
import greeting from './greeting.js';

const backToGreeting = (backButton) => {
  backButton.addEventListener(`click`, () => {
    selectScreen(greeting);
  });
};

export default backToGreeting;
