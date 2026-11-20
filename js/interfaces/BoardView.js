import { GameStatus } from '../domain/GameStatus.js';

function cardClasses(card) {
  if (card.isMatched) {
    return ['card', 'is-open'];
  }
  if (card.isFaceUp) {
    return ['card', 'shirt-card', 'is-open'];
  }
  return ['card', 'shirt-card'];
}

function createCardElement(card) {
  const element = document.createElement('li');
  element.className = cardClasses(card).join(' ');
  element.dataset.cardKey = card.key;
  element.dataset.cardsId = card.type;
  return element;
}

export class BoardView {
  #list;
  #button;

  constructor({ root }) {
    this.#list = document.createElement('ul');
    this.#button = document.createElement('button');

    this.#list.classList.add('field');
    this.#button.classList.add('button-try');
    this.#button.textContent = 'Сыграть ещё раз';

    root.append(this.#list, this.#button);
  }

  onCardSelect(handler) {
    this.#list.addEventListener('click', (event) => {
      const element = event.target.closest('[data-card-key]');
      if (element && this.#list.contains(element)) {
        handler(element.dataset.cardKey);
      }
    });
  }

  onRestart(handler) {
    this.#button.addEventListener('click', handler);
  }

  show(viewModel) {
    this.#list.replaceChildren(...viewModel.cards.map(createCardElement));
    this.#list.style.display = 'flex';
    this.#button.classList.toggle('button-try-active', viewModel.status === GameStatus.WON);
  }

  hide() {
    this.#list.replaceChildren();
    this.#list.style.display = 'none';
    this.#button.classList.remove('button-try-active');
  }
}
