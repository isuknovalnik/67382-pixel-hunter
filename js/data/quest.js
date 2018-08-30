export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  answers: []
});

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
  answers.push({
    answer,
    time,
  });

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
      score += 100;
      if (it.time < 10) {
        score += 50;
      } else if (it.time > 20) {
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
  score += lives * 50;
  return score;
};
