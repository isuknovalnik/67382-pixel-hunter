import {AbstractView} from "./abstract-view";

export class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<template id="modal-error">
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">Статус: ${this.error.message}. Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    </template>`;
  }
}
