import {selectScreen} from './select-screen.js';
import IntroScreen from './intro.js';
import GreetingScreen from './greeting.js';
import RulesScreen from './rules.js';
import GameScreen from './game-screen.js';
import GameModel from './game-model.js';
import StatsScreen from './stats.js';

export default class Application {

  static showIntro() {
    const intro = new IntroScreen();
    selectScreen(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    selectScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    selectScreen(...rules.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameScreen = new GameScreen(model);
    selectScreen(...gameScreen.element);
    gameScreen.startPlaying();
  }

  static resetGame() {
    if (this.model !== undefined) {
      model.resetGame();
    }
  }

  static showStats(stats) {
    const statistics = new StatsScreen(...stats);
    selectScreen(statistics.element);
  }
}
