import render from './render.js';
import selectScreen from './select-screen.js';
import game2 from './game-2.js';
import backToGreeting from './back.js';

// - Игровой экран с двумя изображениями
const template = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
</template>`;

const game1 = render(template);
const questionsInputs = game1.querySelectorAll(`input`);
const question1 = [];
const question2 = [];
const backButton = game1.querySelector(`.back`);

backToGreeting(backButton);

questionsInputs.forEach((it) => {
  if (it.name === `question1`) {
    question1.push(it);
  } else if (it.name === `question2`) {
    question2.push(it);
  }
});

const allQuestions = [question1, question2];

const isAnswered = (question) => {
  for (let i = 0; i < question.length; i++) {
    if (question[i].checked) {
      return true;
    }
  }
  return false;
};

const allAnswered = (questions) => {
  for (let i = 0; i < questions.length; i++) {
    if (!isAnswered(questions[i])) {
      return false;
    }
  }
  return true;
};

const checkQuestion = (questionInput) => {
  questionInput.addEventListener(`click`, () => {
    if (allAnswered(allQuestions)) {
      selectScreen(game2);
    }
  });
};

questionsInputs.forEach((it) => {
  checkQuestion(it);
});

export default game1;