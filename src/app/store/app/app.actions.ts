import { createAction, props } from '@ngrx/store';

export enum AppStatesTypes {
  DARK_MODE_ON = '[App State] Dark Mode On',
  DARK_MODE_OFF = '[App State] Dark Mode Off',
  SAVE_GAME = '[App State] Save Game',
  SAVE_GAME_SUCCESS = '[App State] Save Game Success',
  SAVE_GAME_FAILURE = '[App State] Save Game Failure',
  GET_LAST_GAME = '[App State] Get Last Game',
  SET_LAST_GAME = '[App State] Set Last Game',
  SET_CONFIGURATION = '[App State] Set Configuration',
  DISCARD_LAST_GAME = '[App State] Discard Last Game',
  DELETE_LAST_GAME = '[App State] Delete Last Game',
  DELETE_CONFIGURATION = '[App State] Delete Configuration',
}

export const RESET_STATE = '[App State] Reset State';
export const resetState = createAction(RESET_STATE);

// CHANGE_THEME
export const darkModeOn = createAction(AppStatesTypes.DARK_MODE_ON);
export const darkModeOff = createAction(AppStatesTypes.DARK_MODE_OFF);

// SAVE_GAME
export const saveGame = createAction(
  AppStatesTypes.SAVE_GAME,
  props<{ game: string }>()
);
export const saveGameSuccess = createAction(AppStatesTypes.SAVE_GAME_SUCCESS);
export const saveGameFailure = createAction(AppStatesTypes.SAVE_GAME_FAILURE);

// LAST_GAME
export const getLastGame = createAction(AppStatesTypes.GET_LAST_GAME);
export const setLastGame = createAction(
  AppStatesTypes.GET_LAST_GAME,
  props<{ lastGame: string | null }>()
);

// SET_CONFIGURATION
export const setConfiguration = createAction(
  AppStatesTypes.SET_CONFIGURATION,
  props<{ gameConfiguration: string | null }>()
);

// DISCARD_LAST_GAME
export const discardLastGame = createAction(AppStatesTypes.DISCARD_LAST_GAME);

// DELETE_LAST_GAME
export const deleteLastGame = createAction(AppStatesTypes.DELETE_LAST_GAME);

// DELETE_CONFIGURATION
export const deleteConfiguration = createAction(
  AppStatesTypes.DELETE_CONFIGURATION
);
