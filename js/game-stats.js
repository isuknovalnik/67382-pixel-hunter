const makeStatsElement = (result) => {
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

const makeUnknownElements = (n) => {
  let elements = ``;
  for (let i = 0; i < n; i++) {
    elements = elements + `<li class="stats__result stats__result--unknown"></li>`;
  }
  return elements;
};

export const gameStats = (results) => {
  return `<ul class="stats">
    ${[...results].map((it) => makeStatsElement(it)).join(``)}${(results.length === 10) ? `` : makeUnknownElements(10 - results.length)}
  </ul>`;
};
