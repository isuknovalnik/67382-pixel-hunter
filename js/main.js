'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const mainElement = document.querySelector(`#main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const screens = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`, `modal-error`, `modal-confirm`].map((item) => document.querySelector(`#${item }`).content);

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

const buttonsElement = document.createElement(`div`);
buttonsElement.classList.add(`arrows__wrap`);
buttonsElement.innerHTML = `
    <style>
      .arrows__wrap {
        position: absolute;
        z-index: 1000;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
`;
document.body.appendChild(buttonsElement);
const arrowButtons = buttonsElement.querySelectorAll(`.arrows__btn`);

arrowButtons[0].addEventListener(`click`, (event) => {
  event.preventDefault();
  select(current - 1);
});

arrowButtons[1].addEventListener(`click`, (event) => {
  event.preventDefault();
  select(current + 1);
});

select(0);
