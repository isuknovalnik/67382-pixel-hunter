import {HeaderView} from './header-view';
import {StatsView} from './stats-view';
import backToGreeting from './back.js';

export default class StatsScreen {
  constructor(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3) {
    this.statsHeader = new HeaderView(false);
    this.gameStatsScreen = new StatsView(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3);
    this.statsHeader.onBack = backToGreeting;
  }

  get element() {
    return [this.statsHeader.element, this.gameStatsScreen.element];
  }
}
