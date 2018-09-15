import {assert} from 'chai';
import {adaptServerData} from './data-adapter.js';

const TEST_SERVER_DATA = [
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {"image": {"url": `http://i.imgur.com/zHRZW1C.jpg`, "width": 468, "height": 458},
        "type": `photo`
      },
      {
        "image": {"url": `https://i.imgur.com/NXlVX48.png`, "width": 468, "height": 458},
        "type": `photo`
      }
    ]
  },
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {"image": {"url": `https://k41.kn3.net/FF5009BF0.jpg`, "width": 705, "height": 455},
        "type": `painting`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите фото среди изображений`,
    "answers": [
      {"image": {"url": `https://k36.kn3.net/E9B401148.jpg`, "width": 304, "height": 455},
        "type": `painting`
      },
      {"image": {"url": `https://k32.kn3.net/42C83EF0A.jpg`, "width": 304, "height": 455},
        "type": `painting`
      },
      {"image": {"url": `https://i.redd.it/bj70zjl196kx.jpg`, "width": 304, "height": 455},
        "type": `photo`
      }
    ]
  }
];

const TEST_LOCAL_DATA = [
  {
    "type": 1,
    "task": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "answer": `http://i.imgur.com/zHRZW1C.jpg`,
        "correct": `photo`,
      },
      {
        "answer": `https://i.imgur.com/NXlVX48.png`,
        "correct": `photo`
      },
    ]
  },
  {
    "type": 2,
    "task": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "answer": `https://k41.kn3.net/FF5009BF0.jpg`,
        "correct": `paint`
      },
    ]
  },
  {
    "type": 3,
    "task": `Найдите фото среди изображений`,
    "answers": [
      {
        "answer": `https://k36.kn3.net/E9B401148.jpg`,
      },
      {
        "answer": `https://k32.kn3.net/42C83EF0A.jpg`,
      },
      {
        "answer": `https://i.redd.it/bj70zjl196kx.jpg`,
        "correct": true
      },
    ]
  }
];

suite(`Check server data adapter`, () => {

  test(`correct format converting`, () => {
    assert.deepEqual(TEST_LOCAL_DATA, adaptServerData(TEST_SERVER_DATA));
  });

});
