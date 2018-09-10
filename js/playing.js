import {
  INITIAL_GAME,
  TEST_QUESTIONS,
  changeLevel,
  changeAnswers,
  changeLives,
  scoring,
  TEST_ANSWERS_2,
  TEST_ANSWERS_3,
  TEST_RESULT_3
} from './data/quest.js';
import {newGameScreen} from './game-screen.js';
import {showStats} from './stats.js';

let currentGame;

export const resetGame = () => {
  currentGame = Object.assign({}, INITIAL_GAME);
};

export const startPlaying = () => {
  currentGame = Object.assign({}, INITIAL_GAME);
  currentGame = changeLevel(currentGame, currentGame.level + 1);
  newGameScreen(TEST_QUESTIONS[0], currentGame.answers, currentGame.lives);
};

export const answeredQuestion = (newAnswer) => {
  currentGame = changeAnswers(currentGame, newAnswer.answer, newAnswer.time);
  if (!newAnswer.answer) {
    const newLives = currentGame.lives - 1;
    if (newLives >= 0) {
      currentGame = changeLives(currentGame, newLives);
    } else {
      showStats(currentGame.answers, `FAIL`, TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3);
      return;
    }
  }
  if (currentGame.level < 10) {
    currentGame = changeLevel(currentGame, currentGame.level + 1);
    newGameScreen(TEST_QUESTIONS[currentGame.level - 1], currentGame.answers, currentGame.lives);
  } else {
    showStats(currentGame.answers, scoring(currentGame.answers, currentGame.lives), TEST_ANSWERS_2, `FAIL`, TEST_ANSWERS_3, TEST_RESULT_3);
  }
};
