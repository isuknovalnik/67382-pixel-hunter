const mainElement = document.querySelector(`#main`);

const selectScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export default selectScreen;
