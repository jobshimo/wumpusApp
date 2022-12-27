import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MainState } from './main.reducer';
import {
  selectLookingTo,
  selectPlayerPosition,
  selectRows,
  selectCols,
  selectInitGame,
} from './store/game/game.selectors';
import {
  updatePlayerPosition,
  updateLookingTo,
  resetState,
} from './store/game/game.actions';
import { PositionModel } from './models/position.model';
import { GameService } from './services/game.service';
import {
  selectBoard,
  selectEndGame,
  selectGold,
  selectArrows,
} from './store/game/game.selectors';
import copy from 'fast-copy';
import {
  updateBoard,
  endGame,
  updateGold,
  updateArrows,
} from './store/game/game.actions';

import { Router } from '@angular/router';
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  pickGold,
  shoot,
} from './literals.helper';
import { dead, drum, gameOver, gold, win } from './music.helper';
import { Board } from './models/board-square.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public gameService: GameService,
    private store: Store<MainState>,
    private router: Router
  ) {}

  playerFace$: Observable<string> = this.store.select(selectLookingTo);
  playerFaceSubs: Subscription = new Subscription();
  playerFace!: string;

  playerPosition$: Observable<PositionModel> =
    this.store.select(selectPlayerPosition);
  playerPositionSubs: Subscription = new Subscription();
  playerPosition!: PositionModel;

  maxRows$: Observable<number> = this.store.select(selectRows);
  maxRowsSubs: Subscription = new Subscription();
  maxRows!: number;

  selectCols$: Observable<number> = this.store.select(selectCols);
  selectColsSubs: Subscription = new Subscription();
  selectCols!: number;

  board$: Observable<Board> = this.store.select(selectBoard);
  boardSubs: Subscription = new Subscription();
  board: Board = [];

  endGame$: Observable<boolean> = this.store.select(selectEndGame);
  endGameSubs: Subscription = new Subscription();
  endGame: boolean = false;

  playerGold$: Observable<number> = this.store.select(selectGold);
  playerGoldSubs: Subscription = new Subscription();
  playerGold!: number;

  playerArrows$: Observable<number> = this.store.select(selectArrows);
  playerArrowsSubs: Subscription = new Subscription();
  playerArrows!: number;

  initGame$: Observable<boolean> = this.store.select(selectInitGame);
  initGameSubs: Subscription = new Subscription();
  initGame!: boolean;

  winner: boolean = false;

  ngOnInit(): void {
    this.playerFaceSubs = this.playerFace$.subscribe(
      (faceTo) => (this.playerFace = faceTo)
    );

    this.playerPositionSubs = this.playerPosition$.subscribe(
      (position) => (this.playerPosition = position)
    );

    this.maxRowsSubs = this.maxRows$.subscribe((rows) => (this.maxRows = rows));

    this.selectColsSubs = this.selectCols$.subscribe(
      (cols) => (this.selectCols = cols)
    );

    this.boardSubs = this.board$.subscribe((board) => (this.board = board));

    this.endGameSubs = this.endGame$.subscribe(
      (endGame) => (this.endGame = endGame)
    );

    this.playerGoldSubs = this.playerGold$.subscribe(
      (gold) => (this.playerGold = gold)
    );

    this.playerArrowsSubs = this.playerArrows$.subscribe(
      (arrows) => (this.playerArrows = arrows)
    );

    this.initGameSubs = this.initGame$.subscribe(
      (initGame) => (this.initGame = initGame)
    );
  }

  playerActions(event: KeyboardEvent) {
    if (this.endGame || !this.initGame) return;
    const { row, col } = this.playerPosition;
    switch (true) {
      case event.code === this.playerFace:
        this.store.dispatch(
          updatePlayerPosition({
            playerPosition: this.executeMotion(event.code),
          })
        );
        break;
      case event.code === pickGold:
        if (this.board[row][col].gold === true) {
          this.pickGold();
          this.store.dispatch(updateGold());
        }
        break;
      case event.code === shoot:
        if (
          this.playerArrows > 0 &&
          this.gameService.checkWumpusFacePlayerDirection(
            this.board,
            row,
            col,
            this.playerFace
          )
        )
          this.killWumpus(
            this.gameService.wumpusToKillPosition(this.playerFace, row, col)
          );
        else this.store.dispatch(updateArrows());
        break;
      case this.directionKey(event.code):
        this.store.dispatch(updateLookingTo({ lookingTo: event.code }));
        break;
      default:
        break;
    }
    this.updatePosition();
    this.playerDead();
    this.checkWin();
  }

  directionKey(key: string) {
    return (
      key === moveUp ||
      key === moveDown ||
      key === moveLeft ||
      key === moveRight
    );
  }

  executeMotion(action: string): PositionModel {
    const { row, col } = this.playerPosition;
    switch (action) {
      case moveUp:
        return { row: row > 0 ? row - 1 : row, col };
      case moveDown:
        return { row: row < this.maxRows ? row + 1 : row, col };
      case moveLeft:
        return { row, col: col > 0 ? col - 1 : col };
      case moveRight:
        return { row, col: col < this.selectCols ? col + 1 : col };
      default:
        return { row, col };
    }
  }

  updatePosition() {
    const { row, col } = this.playerPosition;
    this.board[row][col].wall === true ? drum.play() : null;
    let newBoard = copy(this.board);
    newBoard[row][col].wall = false;
    this.store.dispatch(updateBoard({ board: newBoard }));
  }

  checkWin() {
    const { row, col } = this.playerPosition;
    if (this.playerGold > 0 && row === 0 && col === 0) {
      win.play();
      this.winner = true;
      let newBoard = copy(this.board);
      newBoard[row][col].wall = false;
      this.store.dispatch(endGame());
    }
  }

  pickGold() {
    const { row, col } = this.playerPosition;
    this.board[row][col].gold === true ? gold.play() : null;
    let newBoard = copy(this.board);
    newBoard[row][col].gold = false;
    this.store.dispatch(updateBoard({ board: newBoard }));
  }

  killWumpus(position: PositionModel) {
    const { row, col } = position;
    this.board[row][col].wumpus === true ? dead.play() : null;
    let newBoard = copy(this.board);
    newBoard[row][col].wumpus = false;
    newBoard[row][col].stiff = true;
    this.store.dispatch(updateBoard({ board: newBoard }));
    this.store.dispatch(updateArrows());
  }

  playerDead() {
    const { row, col } = this.playerPosition;
    if (
      this.board[row][col].wumpus === true ||
      this.board[row][col].pit === true
    ) {
      gameOver.play();
      let newBoard = copy(this.board);
      newBoard[row][col].wall = false;
      this.store.dispatch(endGame());
    }
  }

  backToConfiguration() {
    this.store.dispatch(resetState());
    this.router.navigate(['/start']);
  }

  ngOnDestroy(): void {
    this.playerFaceSubs?.unsubscribe();
    this.playerPositionSubs?.unsubscribe();
    this.maxRowsSubs?.unsubscribe();
    this.selectColsSubs?.unsubscribe();
    this.boardSubs?.unsubscribe();
    this.endGameSubs?.unsubscribe();
    this.playerGoldSubs?.unsubscribe();
    this.playerArrowsSubs?.unsubscribe();
    this.initGameSubs?.unsubscribe();
  }
}
