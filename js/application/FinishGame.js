export class FinishGame {
  #game;
  #output;
  #timer;

  constructor({ game, output, timer }) {
    this.#game = game;
    this.#output = output;
    this.#timer = timer;
  }

  execute() {
    this.#timer.stop();
    this.#game.expire();
    this.#output.renderSetup(this.#game.toViewModel());
  }
}
