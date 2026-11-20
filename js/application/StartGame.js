import { Deck } from '../domain/Deck.js';

function isValidPairsCount(value, catalogSize) {
  return Number.isInteger(value) && value > 0 && value % 2 === 0 && value <= catalogSize;
}

export class StartGame {
  #game;
  #output;
  #timer;
  #catalog;
  #durationMs;
  #onTimeExpired;

  constructor({ game, output, timer, catalog, durationMs, onTimeExpired }) {
    this.#game = game;
    this.#output = output;
    this.#timer = timer;
    this.#catalog = catalog;
    this.#durationMs = durationMs;
    this.#onTimeExpired = onTimeExpired;
  }

  execute(rawPairsCount) {
    const pairsCount = Number(rawPairsCount);
    if (!isValidPairsCount(pairsCount, this.#catalog.length)) {
      return;
    }

    this.#timer.stop();
    this.#game.start(Deck.create(this.#catalog, pairsCount), pairsCount);
    this.#output.renderBoard(this.#game.toViewModel());
    this.#timer.start(this.#durationMs, this.#onTimeExpired);
  }
}
