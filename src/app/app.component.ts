import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MainState } from './main.reducer';
import {
  selectLookingTo,
  selectPlayerPosition,
  selectRows,
  selectCols,
} from './store/game/game.selectors';
import {
  updatePlayerPosition,
  updateLookingTo,
} from './store/game/game.actions';
import { PositionModel } from './models/position.model';
import { GameService, Board } from './services/game.service';
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

import { Howl } from 'howler';
import { Router } from '@angular/router';
import { RESET_STATE, resetState } from './store/app/app.actions';
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

  drum = new Howl({
    src: ['../assets/audio/bump.wav'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

  gold = new Howl({
    src: ['../assets/audio/coin.wav'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

  gameOver = new Howl({
    src: ['../assets/audio/game-over.wav'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

  win = new Howl({
    src: ['../assets/audio/win.wav'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

  dead = new Howl({
    src: ['../assets/audio/error.mp3'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

  arrow = new Howl({
    src: ['../assets/audio/arrow.wav'],
    html5: true,
    loop: false,
    volume: 0.2,
  });

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
  }

  playerActions(event: KeyboardEvent) {
    if (this.endGame) return;
    const { row, col } = this.playerPosition;
    switch (true) {
      case event.code === this.playerFace:
        this.store.dispatch(
          updatePlayerPosition({
            playerPosition: this.executeMotion(event.code),
          })
        );
        break;
      case event.code === 'Enter':
        if (this.board[row][col].gold === true) {
          this.pickGold();
          this.store.dispatch(updateGold());
        }
        break;
      case event.code === 'Space':
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
      key === 'ArrowUp' ||
      key === 'ArrowDown' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    );
  }

  executeMotion(action: string): PositionModel {
    const { row, col } = this.playerPosition;
    switch (action) {
      case 'ArrowUp':
        return { row: row > 0 ? row - 1 : row, col };
      case 'ArrowDown':
        return { row: row < this.maxRows ? row + 1 : row, col };
      case 'ArrowLeft':
        return { row, col: col > 0 ? col - 1 : col };
      case 'ArrowRight':
        return { row, col: col < this.selectCols ? col + 1 : col };
      default:
        return { row, col };
    }
  }

  updatePosition() {
    const { row, col } = this.playerPosition;
    this.board[row][col].wall === true ? this.drum.play() : null;
    let newBoard = copy(this.board);
    newBoard[row][col].wall = false;
    this.store.dispatch(updateBoard({ board: newBoard }));
  }

  checkWin() {
    const { row, col } = this.playerPosition;
    if (this.playerGold > 0 && row === 0 && col === 0) {
      this.win.play();
      let newBoard = copy(this.board);
      newBoard[row][col].wall = false;
      this.store.dispatch(endGame());
    }
  }

  pickGold() {
    const { row, col } = this.playerPosition;
    this.board[row][col].gold === true ? this.gold.play() : null;
    let newBoard = copy(this.board);
    newBoard[row][col].gold = false;
    this.store.dispatch(updateBoard({ board: newBoard }));
  }

  killWumpus(position: PositionModel) {
    const { row, col } = position;
    this.board[row][col].wumpus === true ? this.dead.play() : null;
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
      this.gameOver.play();
      let newBoard = copy(this.board);
      newBoard[row][col].wall = false;
      this.store.dispatch(endGame());
    }
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
  }
}
