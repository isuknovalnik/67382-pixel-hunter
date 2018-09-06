import {assert} from 'chai';
import {
  INITIAL_GAME,
  changeLevel,
  changeLives,
  changeAnswers,
  scoring
} from './quest.js';

const TEST_ANSWERS = [
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

const TEST_ANSWERS_PART = [
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
  }
];

const TEST_ANSWER_NOT_OBJECT = [
  `meow`,
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

const TEST_ANSWER_NOT_IN_ANSWER = [
  {
    "meow": true,
    "time": 15
  },
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

const TEST_TIME_NOT_IN_ANSWER = [
  {
    "answer": true,
    "meow": 15
  },
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

const TEST_ANSWER_NOT_BOOLEAN = [
  {
    "answer": `meow`,
    "time": 15
  },
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

const TEST_TIME_NOT_NUMBER = [
  {
    "answer": true,
    "time": `meow`
  },
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

const TEST_NEGATIVE_TIME = [
  {
    "answer": true,
    "time": -5
  },
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

const TEST_TOO_MUCH_TIME = [
  {
    "answer": true,
    "time": 40
  },
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

const TEST_TOO_MUCH_ERRORS = [
  {
    "answer": false,
    "time": 15
  },
  {
    "answer": true,
    "time": 5
  },
  {
    "answer": false,
    "time": 25
  },
  {
    "answer": true,
    "time": 17
  },
  {
    "answer": false,
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

const TEST_ANSWERS_2 = [
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
    "answer": true,
    "time": 3
  },
  {
    "answer": true,
    "time": 21
  }
];

const TEST_ANSWERS_3 = [
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
    "answer": true,
    "time": 27
  },
  {
    "answer": true,
    "time": 23
  },
  {
    "answer": true,
    "time": 21
  }
];

const TEST_ANSWERS_0 = [
  {
    "answer": true,
    "time": 15
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

const TEST_GAME = Object.freeze({
  level: 6,
  lives: 3,
  answers: TEST_ANSWERS_PART
});

suite(`Check level changer`, () => {

  test(`updating level`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });

  test(`no values larger than 10`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, 13).level, /Level should not be more than 10/);
  });

  test(`no negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  test(`number values only`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });

});

suite(`Check lives changer`, () => {

  test(`updating lives`, () => {
    assert.equal(changeLives(INITIAL_GAME, 2).lives, 2);
    assert.equal(changeLives(INITIAL_GAME, 0).lives, 0);
  });

  test(`no values larger than 3`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, 5).lives, /Lives should not be more than 3/);
  });

  test(`no negative values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, -1).lives, /Lives should not be negative value/);
  });

  test(`number values only`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, []).lives, /Lives should be of type number/);
  });

});

suite(`Check answers changer`, () => {
  test(`corner values`, () => {
    assert.throws(() => changeAnswers(TEST_GAME, `meow`, 15), /Answer should be of type boolean/);
    assert.throws(() => changeAnswers(TEST_GAME, true, `meow`), /Time should be of type number/);
    assert.throws(() => changeAnswers(TEST_GAME, true, -1), /Time should not be negative or zero value/);
    assert.throws(() => changeAnswers(TEST_GAME, true, 40), /Time should not be more than 30 seconds/);
  });

  test(`updating answers`, () => {
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[0].answer, true);
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[0].time, 15);
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[4].answer, true);
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[4].time, 2);
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[5].answer, false);
    assert.equal(changeAnswers(TEST_GAME, false, 13).answers[5].time, 13);
  });

});

suite(`Check scoring`, () => {

  test(`corner values`, () => {
    assert.throws(() => scoring(`meow`, 1), /Answers should be an Array/);
    assert.throws(() => scoring(TEST_ANSWERS, []), /Lives should be of type number/);
    assert.throws(() => scoring(TEST_ANSWERS, -1), /Lives should not be negative value/);
    assert.throws(() => scoring(TEST_ANSWERS, 4), /Lives should not be more than 3/);
    assert.throws(() => scoring(TEST_ANSWER_NOT_OBJECT, 1), /Answer should be an Object/);
    assert.throws(() => scoring(TEST_ANSWER_NOT_IN_ANSWER, 1), /All answers should contain "answer" value/);
    assert.throws(() => scoring(TEST_TIME_NOT_IN_ANSWER, 1), /All answers should contain "time" value/);
    assert.throws(() => scoring(TEST_ANSWER_NOT_BOOLEAN, 1), /Answer value should be of type boolean/);
    assert.throws(() => scoring(TEST_TIME_NOT_NUMBER, 1), /Time value should be of type number/);
    assert.throws(() => scoring(TEST_NEGATIVE_TIME, 1), /Time should not be negative or zero value/);
    assert.throws(() => scoring(TEST_TOO_MUCH_TIME, 1), /Time should not be more than 30 seconds/);
    assert.throws(() => scoring(TEST_TOO_MUCH_ERRORS, 1), /Errors number should not be more than initial lives number/);
    assert.throws(() => scoring(TEST_ANSWERS, 2), /Lives number should be equal to 3 minus errors number/);
  });

  test(`all questions answered`, () => {
    assert.equal(scoring(TEST_ANSWERS_PART, 2), -1);
  });

  test(`scoring works correctly`, () => {
    assert.equal(scoring(TEST_ANSWERS, 1).total, 800);
    assert.equal(scoring(TEST_ANSWERS_2, 2).total, 1000);
    assert.equal(scoring(TEST_ANSWERS_3, 3).total, 1000);
    assert.equal(scoring(TEST_ANSWERS_0, 0).total, 600);
  });

});
