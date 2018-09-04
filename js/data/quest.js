export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  answers: [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]
});

export const TEST_QUESTIONS = [
  {
    "type": 1,
    "task": `Угадайте для каждого изображения фото или рисунок?`,
    "answer": `http://placehold.it/468x458`,
    "correct": `photo`,
    "answer2": `http://placehold.it/468x458`,
    "correct2": `paint`
  },
  {
    "type": 2,
    "task": `Угадай, фото или рисунок?`,
    "answer": `http://placehold.it/705x455`,
    "correct": `paint`
  },
  {
    "type": 3,
    "task": `Найдите рисунок среди изображений`,
    "answer": `http://placehold.it/304x455`,
    "answer2": `http://placehold.it/304x455`,
    "answer3": `http://placehold.it/304x455`,
    "correct": 3
  },
  {
    "type": 2,
    "task": `Угадай, фото или рисунок?`,
    "answer": `http://placehold.it/705x455`,
    "correct": `paint`
  },
  {
    "type": 3,
    "task": `Найдите рисунок среди изображений`,
    "answer": `http://placehold.it/304x455`,
    "answer2": `http://placehold.it/304x455`,
    "answer3": `http://placehold.it/304x455`,
    "correct": 3
  },
  {
    "type": 1,
    "task": `Угадайте для каждого изображения фото или рисунок?`,
    "answer": `http://placehold.it/468x458`,
    "correct": `photo`,
    "answer2": `http://placehold.it/468x458`,
    "correct2": `paint`
  },
  {
    "type": 3,
    "task": `Найдите рисунок среди изображений`,
    "answer": `http://placehold.it/304x455`,
    "answer2": `http://placehold.it/304x455`,
    "answer3": `http://placehold.it/304x455`,
    "correct": 3
  },
  {
    "type": 2,
    "task": `Угадай, фото или рисунок?`,
    "answer": `http://placehold.it/705x455`,
    "correct": `paint`
  },
  {
    "type": 3,
    "task": `Найдите рисунок среди изображений`,
    "answer": `http://placehold.it/304x455`,
    "answer2": `http://placehold.it/304x455`,
    "answer3": `http://placehold.it/304x455`,
    "correct": 3
  },
  {
    "type": 1,
    "task": `Угадайте для каждого изображения фото или рисунок?`,
    "answer": `http://placehold.it/468x458`,
    "correct": `photo`,
    "answer2": `http://placehold.it/468x458`,
    "correct2": `paint`
  },
];

export const TEST_ANSWERS_2 = [
  {
    "answer": true,
    "time": 5
  },
  {
    "answer": false,
    "time": 5
  },
  {
    "answer": true,
    "time": 25
  },
  {
    "answer": false,
    "time": 17
  },
  {
    "answer": false,
    "time": 2
  },
  {
    "answer": false,
    "time": 28
  },
  {},
  {},
  {},
  {}
];

export const TEST_ANSWERS_3 = [
  {
    "answer": true,
    "time": 15
  },
  {
    "answer": true,
    "time": 5
  },
  {
    "answer": true,
    "time": 25
  },
  {
    "answer": true,
    "time": 17
  },
  {
    "answer": true,
    "time": 2
  },
  {
    "answer": true,
    "time": 28
  },
  {
    "answer": true,
    "time": 14
  },
  {
    "answer": false,
    "time": 17
  },
  {
    "answer": false,
    "time": 3
  },
  {
    "answer": true,
    "time": 21
  }
];

export const TEST_RESULT_3 = {
  "base": 800,
  "speedBonus": 2,
  "livesBonus": 1,
  "slothFine": 3,
  "total": 800,
};

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  if (level > 10) {
    throw new Error(`Level should not be more than 10`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

export const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }

  if (lives < 0) {
    throw new Error(`Lives should not be negative value`);
  }

  if (lives > 3) {
    throw new Error(`Lives should not be more than 3`);
  }

  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};

export const changeAnswers = (game, answer, time) => {
  if (typeof answer !== `boolean`) {
    throw new Error(`Answer should be of type boolean`);
  }
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  if (time <= 0) {
    throw new Error(`Time should not be negative or zero value`);
  }
  if (time > 30) {
    throw new Error(`Time should not be more than 30 seconds`);
  }

  const answers = Array.from(game.answers);
  answers[game.level - 1] = {
    answer,
    time,
  };

  const newGame = Object.assign({}, game, {
    answers
  });
  return newGame;
};

export const scoring = (allAnswers, lives) => {
  if (!(Array.isArray(allAnswers))) {
    throw new Error(`Answers should be an Array`);
  }
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < 0) {
    throw new Error(`Lives should not be negative value`);
  }
  if (lives > 3) {
    throw new Error(`Lives should not be more than 3`);
  }
  if (allAnswers.length < 10) {
    return -1;
  }
  let base = 0;
  let speedBonus = 0;
  let livesBonus = 0;
  let slothFine = 0;
  let score = 0;
  let checkLives = 3;
  allAnswers.forEach((it) => {
    if (!(it instanceof Object)) {
      throw new Error(`Answer should be an Object`);
    }
    if (!(`answer` in it)) {
      throw new Error(`All answers should contain "answer" value`);
    }
    if (!(`time` in it)) {
      throw new Error(`All answers should contain "time" value`);
    }
    if (typeof it.answer !== `boolean`) {
      throw new Error(`Answer value should be of type boolean`);
    }
    if (typeof it.time !== `number`) {
      throw new Error(`Time value should be of type number`);
    }
    if (it.time <= 0) {
      throw new Error(`Time should not be negative or zero value`);
    }
    if (it.time > 30) {
      throw new Error(`Time should not be more than 30 seconds`);
    }
    if (it.answer) {
      base += 100;
      score += 100;
      if (it.time < 10) {
        speedBonus += 1;
        score += 50;
      } else if (it.time > 20) {
        slothFine += 1;
        score -= 50;
      }
    } else {
      checkLives -= 1;
      if (checkLives < 0) {
        throw new Error(`Errors number should not be more than initial lives number`);
      }
    }
  });
  if (lives !== checkLives) {
    throw new Error(`Lives number should be equal to 3 minus errors number`);
  }
  livesBonus = lives;
  score += lives * 50;
  return {
    "base": base,
    "speedBonus": speedBonus,
    "livesBonus": livesBonus,
    "slothFine": slothFine,
    "total": score,
  };
};
