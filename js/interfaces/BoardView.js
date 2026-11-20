import { GameStatus } from '../domain/GameStatus.js';

function createCardElement(card) {
  const element = document.createElement('li');
  element.className = 'card';
  element.dataset.cardKey = card.key;

  const inner = document.createElement('div');
  inner.className = 'card__inner';

  const shirt = document.createElement('div');
  shirt.className = 'card__face card__face--shirt';

  const value = document.createElement('div');
  value.className = 'card__face card__face--value';
  value.dataset.cardsId = card.type;

  inner.append(shirt, value);
  element.append(inner);
  return element;
}

export class BoardView {
  #list;
  #button;
  #cards = new Map();
  #renderedDeck = '';

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
    this.#renderCards(viewModel.cards);
    this.#list.style.display = 'flex';
    this.#button.classList.toggle('button-try-active', viewModel.status === GameStatus.WON);
  }

  hide() {
    this.#list.replaceChildren();
    this.#cards.clear();
    this.#renderedDeck = '';
    this.#list.style.display = 'none';
    this.#button.classList.remove('button-try-active');
  }

  #renderCards(cards) {
    const deckSignature = cards.map((card) => card.key).join('|');
    if (deckSignature !== this.#renderedDeck) {
      const elements = cards.map(createCardElement);
      this.#list.replaceChildren(...elements);
      this.#cards = new Map(cards.map((card, index) => [card.key, elements[index]]));
      this.#renderedDeck = deckSignature;
    }

    for (const card of cards) {
      const element = this.#cards.get(card.key);
      element.classList.toggle('is-flipped', card.isFaceUp || card.isMatched);
      element.classList.toggle('is-matched', card.isMatched);
    }
  }
}
