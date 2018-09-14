import Application from '../application.js';
import {HeaderView} from '../view/header-view';
import {StatsView} from '../view/stats-view';

export default class StatsScreen {
  constructor(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3) {
    this.statsHeader = new HeaderView(false);
    this.gameStatsScreen = new StatsView(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3);
    this.statsHeader.onBack = () => {
      Application.showGreeting();
    };
  }

  get element() {
    return [this.statsHeader.element, this.gameStatsScreen.element];
  }
}
