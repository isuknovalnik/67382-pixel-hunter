import {selectScreen} from './select-screen.js';
import IntroScreen from './game/intro.js';
import GreetingScreen from './game/greeting.js';
import RulesScreen from './game/rules.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './game/stats.js';
import {ErrorView} from './view/error-view.js';
import {adaptServerData} from './data/data-adapter.js';
import Loader from './loader.js';

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const QUESTIONS_URL = `https://es.dump.academy/pixel-hunter/questions`;
let gameData;
export default class Application {

  static start() {
    window.fetch(QUESTIONS_URL).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        gameData = adaptServerData(data);
      }).
      then(() => Application.showIntro()).
      catch(Application.showError);
  }

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

  static showGame(playerName) {
    const model = new GameModel(playerName, gameData);
    const gameScreen = new GameScreen(model);
    selectScreen(...gameScreen.element);
    gameScreen.startPlaying();
  }

  static showStats(model) {
    const playerName = model.playerName;
    Loader.saveResults(model.state, playerName).
      then(() => Loader.loadResults(playerName)).
      then((data) => {
        const statistics = new StatsScreen(data);
        selectScreen(...statistics.element);
      }).
      catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    selectScreen(errorScreen.element);
  }
}
