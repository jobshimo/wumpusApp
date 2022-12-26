import { createAction, props } from '@ngrx/store';
import { Board } from '../../services/game.service';

export enum GameStatesTypes {
  CREATE_BOARD = '[Game State] Create Board',
  CREATE_BOARD_SUCCESS = '[Game State] Create Board Success',
  UPDATE_PLAYER_POSITION = '[Game State] Update Player Position',
  UPDATE_PLAYER_POSITION_SUCCESS = '[Game State] Update Player Position Success',
  START_ANIMATION = '[Game State] Start Animation',
  END_ANIMATION = '[Game State] End Animation',
  UPDATE_LOOKING_TO = '[Game State] Update Looking To',
  UPDATE_LOOKING_TO_SUCCESS = '[Game State] Update Looking To Success',
  UPDATE_BOARD = '[Game State] Update Board',
  UPDATE_BOARD_SUCCESS = '[Game State] Update Board Success',
  UPDATE_ARROWS = '[Game State] Update Arrows',
  END_GAME = '[Game State] End Game',
  UPDATE_GOLD = '[Game State] Update Gold',
  START_GAME = '[Game State] Start Game',
}


export const endGame = createAction(GameStatesTypes.END_GAME);

// START_GAME
export const startGame = createAction(GameStatesTypes.START_GAME);

// UPDATE_GOLD
export const updateGold = createAction(
  GameStatesTypes.UPDATE_GOLD
);

// CHANGE_THEME
export const createBoard = createAction(
  GameStatesTypes.CREATE_BOARD,
  props<{ rows: number; cols: number, arrows: number, pits: number }>()
);
export const createBoardSuccess = createAction(
  GameStatesTypes.CREATE_BOARD_SUCCESS,
  props<{ board: Board }>()
);

// MOVE_PLAYER
export const updatePlayerPosition = createAction(
  GameStatesTypes.UPDATE_PLAYER_POSITION,
  props<{ playerPosition: { row: number; col: number } }>()
);

export const updatePlayerPositionSuccess = createAction(
  GameStatesTypes.UPDATE_PLAYER_POSITION_SUCCESS,
  props<{ playerPosition: { row: number; col: number } }>()
);

export const endAnimation = createAction(GameStatesTypes.END_ANIMATION);

export const startAnimation = createAction(GameStatesTypes.START_ANIMATION);

// UPDATE_LOOKING_TO
export const updateLookingTo = createAction(
  GameStatesTypes.UPDATE_LOOKING_TO,
  props<{ lookingTo: string }>()
);

export const updateLookingToSuccess = createAction(
  GameStatesTypes.UPDATE_LOOKING_TO_SUCCESS,
  props<{ lookingTo: string }>()
);

// UPDATE_BOARD
export const updateBoard = createAction(
  GameStatesTypes.UPDATE_BOARD,
  props<{ board: Board }>()
);

export const updateBoardSuccess = createAction(
  GameStatesTypes.UPDATE_BOARD_SUCCESS,
  props<{ board: Board }>()
);

// UPDATE_ARROWS
export const updateArrows = createAction(
  GameStatesTypes.UPDATE_ARROWS
);
