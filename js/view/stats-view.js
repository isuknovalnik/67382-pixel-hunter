import {AbstractView} from "./abstract-view";
import {gameStats} from '../game-stats.js';
import {scoring} from '../data/quest.js';

const LOST_GAME = `FAIL`;
const SPEED_RATIO = 50;
const LIVES_RATIO = 50;
const SLOTH_RATIO = 50;

export class StatsView extends AbstractView {
  constructor(allResults) {
    super();
    this.allResults = allResults;
  }

  get template() {
    let currentResult = this.allResults.pop();
    let currentAnswers = currentResult.answers;
    let currentScore = scoring(currentAnswers, currentResult.lives);
    const templateStart = `<section class="result">
      <h2 class="result__title">${(currentScore === LOST_GAME) ? `Вы проиграли` : `Победа!`}</h2>`;
    const templateTail = `</section>`;
    const addTemplateTable = (answers, score, counter) => {
      return `<table class="result__table">
        <tr>
          <td class="result__number">${counter}.</td>
          <td colspan="2">
            ${gameStats(answers)}
          </td>
          ${(score === LOST_GAME) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${currentScore.base}</td>
        </tr>
        ${(score.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${score.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${score.speedBonus * SPEED_RATIO}</td>
        </tr>`}
        ${(score.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${score.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${score.livesBonus * LIVES_RATIO}</td>
        </tr>`}
        ${(score.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${score.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${score.slothFine * SLOTH_RATIO}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(score === LOST_GAME) ? LOST_GAME : score.total}</td>
        </tr>
      </table>`;
    };
    let tablesCounter = 1;
    let templateTables = addTemplateTable(currentAnswers, currentScore, tablesCounter);
    while (this.allResults.length > 0) {
      currentResult = this.allResults.pop();
      currentAnswers = currentResult.answers;
      currentScore = scoring(currentAnswers, currentResult.lives);
      tablesCounter++;
      templateTables = templateTables + addTemplateTable(currentAnswers, currentScore, tablesCounter);
    }
    return `${templateStart}
      ${templateTables}
    ${templateTail}`;
  }
}
