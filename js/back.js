import Application from './application.js';

const backToGreeting = () => {
  Application.resetGame();
  Application.showGreeting();
};

export default backToGreeting;
