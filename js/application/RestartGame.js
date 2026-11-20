export class RestartGame {
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
    this.#game.reset();
    this.#output.renderSetup(this.#game.toViewModel());
  }
}
