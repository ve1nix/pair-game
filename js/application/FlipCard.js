export class FlipCard {
  #game;
  #output;

  constructor({ game, output }) {
    this.#game = game;
    this.#output = output;
  }

  execute(cardId) {
    this.#game.flipCard(cardId);
    this.#output.renderBoard(this.#game.toViewModel());
  }
}
