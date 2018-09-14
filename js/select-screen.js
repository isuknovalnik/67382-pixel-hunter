const mainElement = document.querySelector(`#main`);

export const selectScreen = (...elements) => {
  mainElement.innerHTML = ``;
  elements.forEach((it) => mainElement.appendChild(it));
};

export const replaceHeader = (newHeader, oldHeader) => {
  mainElement.replaceChild(newHeader, oldHeader);
};
