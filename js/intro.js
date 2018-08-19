import render from './render.js';
import selectScreen from './select-screen.js';
import greeting from './greeting.js';

const template = `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const intro = render(template);

const introButton = intro.querySelector(`.intro__asterisk`);

introButton.addEventListener(`click`, () => {
  selectScreen(greeting);
});

export default intro;
