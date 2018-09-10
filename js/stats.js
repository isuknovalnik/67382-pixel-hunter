import {HeaderView} from './header-view';
import {StatsView} from './stats-view';
import selectScreen from './select-screen.js';
import backToGreeting from './back.js';

export const showStats = (resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3) => {
  const statsHeader = new HeaderView(false);
  const gameStatsScreen = new StatsView(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3);
  statsHeader.onBack = backToGreeting;
  selectScreen(statsHeader.element, gameStatsScreen.element);
};
