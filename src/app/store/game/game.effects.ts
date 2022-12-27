import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { GameService } from '../../services/game.service';
import { endAnimation, startAnimation, startGame } from './game.actions';
import { Store } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import {
  createBoard,
  createBoardSuccess,
  updatePlayerPosition,
  updatePlayerPositionSuccess,
  updateBoard,
  updateBoardSuccess,
  updateLookingTo,
  updateLookingToSuccess,
  updateArrows,
} from './game.actions';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private store: Store<MainState>
  ) {}

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoard),
      map(({ rows, cols, arrows, pits }) =>
        createBoardSuccess({
          board: this.gameService.generateBoard(rows, cols, pits),
        })
      )
    )
  );
  startGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardSuccess),
      map(() => startGame())
    )
  );

  updatePlayerPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlayerPosition),
      map(({ playerPosition }) =>
        updatePlayerPositionSuccess({ playerPosition })
      )
    )
  );

  motionAnimation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlayerPositionSuccess),
      map(() => {
        setTimeout(() => this.store.dispatch(endAnimation()), 200);
        return startAnimation();
      })
    )
  );

  updateLookingTo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLookingTo),
      map(({ lookingTo }) => updateLookingToSuccess({ lookingTo }))
    )
  );

  // updateArrows$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateArrows),
  //     map(({ arrows }) => updateArrowsSuccess({ arrows }))
  //   )
  // );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBoard),
      map(({ board }) => updateBoardSuccess({ board }))
    )
  );
}
