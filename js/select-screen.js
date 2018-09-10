const mainElement = document.querySelector(`#main`);

const selectScreen = (...elements) => {
  mainElement.innerHTML = ``;
  elements.forEach((it) => mainElement.appendChild(it));
};

export default selectScreen;
