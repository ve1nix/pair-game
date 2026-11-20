export class Card {
  #key;
  #type;
  #isFaceUp = false;
  #isMatched = false;

  constructor({ key, type }) {
    this.#key = key;
    this.#type = type;
  }

  get key() {
    return this.#key;
  }

  get type() {
    return this.#type;
  }

  get isFaceUp() {
    return this.#isFaceUp;
  }

  get isMatched() {
    return this.#isMatched;
  }

  flip() {
    this.#isFaceUp = true;
  }

  hide() {
    this.#isFaceUp = false;
  }

  match() {
    this.#isMatched = true;
  }

  toViewModel() {
    return {
      key: this.#key,
      type: this.#type,
      isFaceUp: this.#isFaceUp,
      isMatched: this.#isMatched
    };
  }
}
