import { GameOutput } from '../application/ports.js';

export class GamePresenter extends GameOutput {
  #setupView;
  #boardView;

  constructor({ setupView, boardView }) {
    super();
    this.#setupView = setupView;
    this.#boardView = boardView;
  }

  renderSetup() {
    this.#boardView.hide();
    this.#setupView.show();
  }

  renderBoard(viewModel) {
    this.#setupView.hide();
    this.#boardView.show(viewModel);
  }
}
