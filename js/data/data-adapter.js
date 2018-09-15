const TYPES_CONVERTING = {
  "two-of-two": 1,
  "tinder-like": 2,
  "one-of-three": 3
};

export const adaptServerData = (data) => {
  const newData = [];
  data.forEach((it) => {
    const currentQuestion = {};
    const currentAnswers = [];
    currentQuestion.type = TYPES_CONVERTING[it.type];
    currentQuestion.task = it.question;
    it.answers.forEach((item) => {
      const answersItem = {};
      answersItem.answer = item.image.url;
      if (it.type === `one-of-three`) {
        if (currentQuestion.type === 3) {
          if (item.type === `photo`) {
            answersItem.correct = true;
          }
        } else {
          if (item.type === `painting`) {
            answersItem.correct = true;
          }
        }
      } else {
        answersItem.correct = (item.type === `painting`) ? `paint` : `photo`;
      }
      currentAnswers.push(answersItem);
    });
    currentQuestion.answers = currentAnswers;
    newData.push(currentQuestion);
  });
  return newData;
};
