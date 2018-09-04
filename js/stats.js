import render from './render.js';
import backToGreeting from './back.js';
import {headerTemplate} from './header.js';
import {gameStats} from './game-stats.js';

export const showStats = (resultAnswers, result, resultAnswers2, result2, resultAnswers3, result3) => {
  const template = `<section class="result">
      <h2 class="result__title">${(result === `FAIL`) ? `Вы проиграли` : `Победа!`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${gameStats(resultAnswers)}
          </td>
          ${(result === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${result.base}</td>
        </tr>
        ${(result.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.speedBonus * 50}</td>
        </tr>`}
        ${(result.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${result.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.livesBonus * 50}</td>
        </tr>`}
        ${(result.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${result.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(result === `FAIL`) ? `FAIL` : result.total}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td colspan="2">
            ${gameStats(resultAnswers2)}
          </td>
          ${(result2 === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${result2.base}</td>
        </tr>
        ${(result2.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result2.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result2.speedBonus * 50}</td>
        </tr>`}
        ${(result2.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${result2.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result2.livesBonus * 50}</td>
        </tr>`}
        ${(result2.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result2.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${result2.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(result2 === `FAIL`) ? `FAIL` : result2.total}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            ${gameStats(resultAnswers3)}
          </td>
          ${(result3 === `FAIL`) ? `<td class="result__total"></td>` : `<td class="result__points">× 100</td>
          <td class="result__total">${result3.base}</td>
        </tr>
        ${(result3.speedBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result3.speedBonus} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result3.speedBonus * 50}</td>
        </tr>`}
        ${(result3.livesBonus === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${result3.livesBonus} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result3.livesBonus * 50}</td>
        </tr>`}
        ${(result3.slothFine === 0) ? `` : `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result3.slothFine} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${result3.slothFine * 50}</td>
        </tr>`}
        <tr>`}
          <td colspan="5" class="result__total  result__total--final">${(result3 === `FAIL`) ? `FAIL` : result3.total}</td>
        </tr>
      </table>
    </section>`;

  const stats = render(headerTemplate(false) + template);
  const backButton = stats.querySelector(`.back`);

  backToGreeting(backButton);

  return stats;
};
