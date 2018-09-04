import {INITIAL_GAME} from './data/quest.js';
import {TEST_QUESTIONS} from './data/quest.js';
import {newGameScreen} from './game-screen.js';
import selectScreen from './select-screen.js';
import {showStats} from './stats.js';
import {changeLevel} from './data/quest.js';
import {changeAnswers} from './data/quest.js';
import {changeLives} from './data/quest.js';
import {scoring} from './data/quest.js';
import {TEST_ANSWERS_2} from './data/quest.js';
import {TEST_ANSWERS_3} from './data/quest.js';
import {TEST_RESULT_3} from './data/quest.js';

let currentGame;

export const resetGame = () => {
  currentGame = Object.assign({}, INITIAL_GAME);
};

export const startPlaying = () => {
  currentGame = Object.assign({}, INITIAL_GAME);
  currentGame = changeLevel(currentGame, currentGame.level + 1);
  selectScreen(newGameScreen(TEST_QUESTIONS[0], currentGame.answers, currentGame.lives));
};

export const answeredQuestion = (newAnswer) => {
  currentGame = changeAnswers(currentGame, newAnswer.answer, newAnswer.time);
  if (!newAnswer.answer) {
    const newLives = currentGame.lives - 1;
    if (newLives >= 0) {
      currentGame = changeLives(currentGame, newLives);
    } else {
      selectScreen(showStats(currentGame.answers, `FAIL`, TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3));
      return;
    }
  }
  if (currentGame.level < 10) {
    currentGame = changeLevel(currentGame, currentGame.level + 1);
    selectScreen(newGameScreen(TEST_QUESTIONS[currentGame.level - 1], currentGame.answers, currentGame.lives));
  } else {
    selectScreen(showStats(currentGame.answers, scoring(currentGame.answers, currentGame.lives), TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3));
  }
};
