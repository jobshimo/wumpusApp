import { createReducer, on } from '@ngrx/store';
import {
  createBoard,
  createBoardSuccess,
  updateLookingTo,
  updateLookingToSuccess,
  updateBoard,
  updateBoardSuccess,
} from './game.actions';
import { initialGameState, GameState } from './game.state';
import {
  updatePlayerPosition,
  updatePlayerPositionSuccess,
} from './game.actions';
import { updateArrows, endAnimation, startAnimation, endGame, updateGold } from './game.actions';

export const GameStateReducer = createReducer(
  initialGameState,

  // CREATE_BOARD
  on(createBoard, (state: GameState, { rows, cols, arrows, pits }) => ({
    ...state,
    rows: rows - 1,
    colums: cols - 1,
    arrows,
  })),
  on(createBoardSuccess, (state: GameState, { board }) => ({
    ...state,
    board,
    endGame:false
  })),

  on(endGame, (state: GameState) => ({
    ...state,
    endGame:true
  })),

  // MOVE_PLAYER
  on(updatePlayerPosition, (state: GameState, { playerPosition }) => ({
    ...state,
  })),
  on(updatePlayerPositionSuccess, (state: GameState, { playerPosition }) => ({
    ...state,
    playerPosition,
  })),

  on(startAnimation, (state: GameState) => ({
    ...state,
    moving:true
  })),

  on(endAnimation, (state: GameState) => ({
    ...state,
    moving:false
  })),


  // UPDATE_LOOKING_TO
  on(updateLookingTo, (state: GameState) => ({
    ...state,
  })),
  on(updateLookingToSuccess, (state: GameState, { lookingTo }) => ({
    ...state,
    lookingTo,
  })),

  // UPDATE_BOARD
  on(updateBoard, (state: GameState, { board }) => ({ ...state })),

  on(updateBoardSuccess, (state: GameState, { board }) => ({
    ...state,
    board,
  })),

  // UPDATE_ARROWS
  on(updateArrows, (state: GameState) => ({ ...state, arrows:state.arrows > 0 ? state.arrows-1: 0 })),


  // UPDATE_GOLD
  on(updateGold, (state: GameState) => ({ ...state, gold:state.gold+1})),
);
