import render from './render.js';
// - import selectScreen from './select-screen.js';
import {startPlaying} from './playing.js';
import backToGreeting from './back.js';
import {headerTemplate} from './header.js';

const template = `<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;

const rules = render(headerTemplate(false) + template);

const rulesButton = rules.querySelector(`.rules__button`);
const playerName = rules.querySelector(`.rules__input`);
const backButton = rules.querySelector(`.back`);

backToGreeting(backButton);

playerName.addEventListener(`input`, () => {
  rulesButton.disabled = !playerName.value;
});

rulesButton.addEventListener(`click`, () => {
  startPlaying();
});

export default rules;
