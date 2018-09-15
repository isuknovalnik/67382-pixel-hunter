import {selectScreen} from './select-screen.js';
import IntroScreen from './game/intro.js';
import GreetingScreen from './game/greeting.js';
import RulesScreen from './game/rules.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './game/stats.js';

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

  static showStats(stats) {
    const statistics = new StatsScreen(...stats);
    selectScreen(...statistics.element);
  }
}
