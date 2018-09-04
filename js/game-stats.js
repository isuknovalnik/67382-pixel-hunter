const makeStatsElement = (result) => {
  if (result.answer === undefined) {
    return `<li class="stats__result stats__result--unknown"></li>`;
  }
  if (result.answer) {
    if (result.time < 10) {
      return `<li class="stats__result stats__result--fast"></li>`;
    } else if (result.time > 20) {
      return `<li class="stats__result stats__result--slow"></li>`;
    } else {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
  } else {
    return `<li class="stats__result stats__result--wrong"></li>`;
  }
};

export const gameStats = (results) => `<ul class="stats">
      ${[...results].map((it) => makeStatsElement(it)).join(``)}
    </ul>`;
