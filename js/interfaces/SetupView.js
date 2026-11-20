export class SetupView {
  #form;
  #input;
  #defaultValue;

  constructor({ root, defaultValue = 4 }) {
    this.#defaultValue = String(defaultValue);
    this.#form = document.createElement('form');
    const label = document.createElement('label');
    this.#input = document.createElement('input');
    const button = document.createElement('button');

    this.#form.classList.add('form');
    label.classList.add('form__label');
    this.#input.classList.add('form__input');
    button.classList.add('form__button');

    label.textContent = 'Количество пар';
    this.#input.type = 'number';
    this.#input.value = this.#defaultValue;
    button.type = 'submit';
    button.textContent = 'Начать игру';

    this.#form.append(label, this.#input, button);
    this.#root.append(this.#form);
  }

  onStart(handler) {
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.#input.value);
    });
  }

  show() {
    this.#input.value = this.#defaultValue;
    this.#form.style.display = 'flex';
  }

  hide() {
    this.#form.style.display = 'none';
  }
}
