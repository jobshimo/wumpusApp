import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainState } from '../../../main.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  selectBoard,
  selectPlayerPosition,
  selectLookingTo,
} from '../../../store/game/game.selectors';
import { PositionModel } from '../../../models/position.model';
import { selectArrows, selectGold } from '../../../store/game/game.selectors';
import { Board } from '../../../models/board-square.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {


  constructor(private store: Store<MainState>) {}

  playerFace$: Observable<string> = this.store.select(selectLookingTo);

  board$: Observable<Board> = this.store.select(selectBoard);
  boardSubs: Subscription = new Subscription();
  board: Board = [];

  playerArrows$: Observable<number> = this.store.select(selectArrows);
  playerGold$: Observable<number> = this.store.select(selectGold);

  playerPosition$: Observable<PositionModel> =
    this.store.select(selectPlayerPosition);

  ngOnInit(): void {
    this.boardSubs = this.board$.subscribe((board) => (this.board = board));
    document.getElementById('game')?.focus()

  }

  ngOnDestroy(): void {
    this.boardSubs?.unsubscribe();
  }
}
