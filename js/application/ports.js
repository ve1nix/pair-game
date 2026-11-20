export class Timer {
  start(_durationMs, _onElapsed) {
    throw new Error('Timer.start() must be implemented');
  }

  stop() {
    throw new Error('Timer.stop() must be implemented');
  }
}

export class GameOutput {
  renderSetup(_viewModel) {
    throw new Error('GameOutput.renderSetup() must be implemented');
  }

  renderBoard(_viewModel) {
    throw new Error('GameOutput.renderBoard() must be implemented');
  }
}
