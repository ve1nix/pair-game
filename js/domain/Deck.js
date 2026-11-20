import { Card } from './Card.js';

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }
  return result;
}

export class Deck {
  #cards;

  constructor(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
  }

  get(key) {
    return this.#cards.find((card) => card.key === key);
  }

  static create(types, pairsCount) {
    const selected = shuffle(types).slice(0, pairsCount);
    const cards = selected.flatMap((type) => [
      new Card({ key: `${type}-1`, type }),
      new Card({ key: `${type}-2`, type })
    ]);
    return new Deck(shuffle(cards));
  }
}
