import { GameStatus } from './GameStatus.js';

export class Game {
  #deck = null;
  #firstCard = null;
  #secondCard = null;
  #matchedPairs = 0;
  #pairsCount = 0;
  #status = GameStatus.SETUP;

  get status() {
    return this.#status;
  }

  start(deck, pairsCount) {
    this.#deck = deck;
    this.#pairsCount = pairsCount;
    this.#firstCard = null;
    this.#secondCard = null;
    this.#matchedPairs = 0;
    this.#status = GameStatus.PLAYING;
  }

  flipCard(cardKey) {
    if (this.#status !== GameStatus.PLAYING) {
      return;
    }
    this.#closePreviousAttempt();

    const card = this.#deck.get(cardKey);
    if (!card || card.isFaceUp || card.isMatched) {
      return;
    }

    card.flip();
    if (!this.#firstCard) {
      this.#firstCard = card;
      return;
    }

    this.#secondCard = card;
    this.#resolveAttempt();
  }

  expire() {
    if (this.#status === GameStatus.PLAYING) {
      this.#status = GameStatus.LOST;
    }
  }

  reset() {
    this.#status = GameStatus.SETUP;
    this.#deck = null;
    this.#firstCard = null;
    this.#secondCard = null;
    this.#matchedPairs = 0;
    this.#pairsCount = 0;
  }

  toViewModel() {
    return {
      status: this.#status,
      pairsCount: this.#pairsCount,
      matchedPairs: this.#matchedPairs,
      cards: this.#deck ? this.#deck.cards.map((card) => card.toViewModel()) : []
    };
  }

  #closePreviousAttempt() {
    if (!this.#firstCard || !this.#secondCard) {
      return;
    }
    if (!this.#firstCard.isMatched) {
      this.#firstCard.hide();
      this.#secondCard.hide();
    }
    this.#firstCard = null;
    this.#secondCard = null;
  }

  #resolveAttempt() {
    if (this.#firstCard.type !== this.#secondCard.type) {
      return;
    }
    this.#firstCard.match();
    this.#secondCard.match();
    this.#matchedPairs += 1;
    if (this.#matchedPairs === this.#pairsCount) {
      this.#status = GameStatus.WON;
    }
  }
}
