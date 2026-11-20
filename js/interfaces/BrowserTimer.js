import { Timer } from '../application/ports.js';

export class BrowserTimer extends Timer {
  #timeoutId = null;

  start(durationMs, onElapsed) {
    this.stop();
    this.#timeoutId = window.setTimeout(onElapsed, durationMs);
  }

  stop() {
    if (this.#timeoutId !== null) {
      window.clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }
  }
}
