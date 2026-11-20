import { CARD_IDS } from './domain/CardCatalog.js';
import { Game } from './domain/Game.js';
import { StartGame } from './application/StartGame.js';
import { FlipCard } from './application/FlipCard.js';
import { FinishGame } from './application/FinishGame.js';
import { RestartGame } from './application/RestartGame.js';
import { BrowserTimer } from './interfaces/BrowserTimer.js';
import { GamePresenter } from './interfaces/GamePresenter.js';
import { SetupView } from './interfaces/SetupView.js';
import { BoardView } from './interfaces/BoardView.js';
import { GameController } from './interfaces/GameController.js';

const GAME_DURATION_MS = 30000;
const DEFAULT_PAIRS = 4;

const root = document.querySelector('.container');
const game = new Game();
const timer = new BrowserTimer();
const setupView = new SetupView({ root, defaultValue: DEFAULT_PAIRS });
const boardView = new BoardView({ root });
const output = new GamePresenter({ setupView, boardView });

const finishGame = new FinishGame({ game, output, timer });
const startGame = new StartGame({
  game,
  output,
  timer,
  catalog: CARD_IDS,
  durationMs: GAME_DURATION_MS,
  onTimeExpired: () => finishGame.execute()
});
const flipCard = new FlipCard({ game, output });
const restartGame = new RestartGame({ game, output, timer });

new GameController({ setupView, boardView, startGame, flipCard, restartGame }).bind();
output.renderSetup(game.toViewModel());
