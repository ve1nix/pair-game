export class GameController {
  #setupView;
  #boardView;
  #startGame;
  #flipCard;
  #restartGame;

  constructor({ setupView, boardView, startGame, flipCard, restartGame }) {
    this.#setupView = setupView;
    this.#boardView = boardView;
    this.#startGame = startGame;
    this.#flipCard = flipCard;
    this.#restartGame = restartGame;
  }

  bind() {
    this.#setupView.onStart((value) => this.#startGame.execute(value));
    this.#boardView.onCardSelect((id) => this.#flipCard.execute(id));
    this.#boardView.onRestart(() => this.#restartGame.execute());
  }
}
