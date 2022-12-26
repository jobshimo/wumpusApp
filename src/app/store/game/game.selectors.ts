import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.state';


export const selectGameState = createFeatureSelector<GameState>('gameState');

export const selectBoard = createSelector(
  selectGameState,
    (state: GameState) => state.board
);

export const selectPlayerPosition = createSelector(
  selectGameState,
    (state: GameState) => state.playerPosition
);

export const selectLookingTo = createSelector(
  selectGameState,
    (state: GameState) => state.lookingTo
);

export const selectRows = createSelector(
  selectGameState,
    (state: GameState) => state.rows
);

export const selectCols = createSelector(
  selectGameState,
    (state: GameState) => state.colums
);

export const selectArrows = createSelector(
  selectGameState,
    (state: GameState) => state.arrows
);

export const selectGold = createSelector(
  selectGameState,
    (state: GameState) => state.gold
);
export const selectMoving = createSelector(
  selectGameState,
    (state: GameState) => state.moving
);
export const selectEndGame = createSelector(
  selectGameState,
    (state: GameState) => state.endGame
);
