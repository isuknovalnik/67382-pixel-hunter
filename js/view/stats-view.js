import {AbstractView} from "./abstract-view";
import {gameStats} from '../game-stats.js';

export class StatsView extends AbstractView {
  constructor(resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3) {
    super();
    this.resultAnswers = resultAnswers;
    this.result = result;
    this.resultAnswers2 = resultAnswers2;
    this.result2 = result2;
    this.resultAnswers3 = resultAnswers3;
    this.result3 = result3;
  }

  get template() {
    return `<section class="result">
      <h2 class="result__title">${(this.result === `FAIL`) ? `Вы проиграли` : `Победа!`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${gameStats(this.resultAnswers)}
          </td>
          ${(this.result === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${this.result.base}</td>
        </tr>
        ${(this.result.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.result.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result.speedBonus * 50}</td>
        </tr>`}
        ${(this.result.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.result.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result.livesBonus * 50}</td>
        </tr>`}
        ${(this.result.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.result.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${this.result.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(this.result === `FAIL`) ? `FAIL` : this.result.total}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td colspan="2">
            ${gameStats(this.resultAnswers2)}
          </td>
          ${(this.result2 === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${this.result2.base}</td>
        </tr>
        ${(this.result2.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.result2.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result2.speedBonus * 50}</td>
        </tr>`}
        ${(this.result2.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.result2.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result2.livesBonus * 50}</td>
        </tr>`}
        ${(this.result2.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.result2.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${this.result2.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(this.result2 === `FAIL`) ? `FAIL` : this.result2.total}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            ${gameStats(this.resultAnswers3)}
          </td>
          ${(this.result3 === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${this.result3.base}</td>
        </tr>
        ${(this.result3.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.result3.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result3.speedBonus * 50}</td>
        </tr>`}
        ${(this.result3.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.result3.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.result3.livesBonus * 50}</td>
        </tr>`}
        ${(this.result3.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.result3.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${this.result3.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(this.result3 === `FAIL`) ? `FAIL` : this.result3.total}</td>
        </tr>
      </table>
    </section>`;
  }
}
