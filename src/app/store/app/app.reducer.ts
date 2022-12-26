import { createReducer, on } from '@ngrx/store';
import { initialAppState, AppState } from './app.state';
import {
  deleteConfiguration,
  setLastGame,
  discardLastGame,
  saveGame,
} from './app.actions';
import {
  darkModeOn,
  darkModeOff,
  getLastGame,
  setConfiguration,
  deleteLastGame,
} from './app.actions';

export const AppStateReducer = createReducer(
  initialAppState,

  // CHANGE_THEME
  on(darkModeOn, (state: AppState) => ({
    ...state,
    darkMode: true,
  })),

  on(darkModeOff, (state: AppState) => ({
    ...state,
    darkMode: false,
  })),

  // SAVE_GAME
  on(saveGame, (state: AppState, { game }) => ({ ...state })),

  // LAST_GAME
  on(getLastGame, (state: AppState) => ({ ...state })),

  on(setLastGame, (state: AppState, { lastGame }) => ({
    ...state,
    lastGame,
  })),

  on(discardLastGame, (state: AppState) => ({
    ...state,
    lastGame: null,
    gameConfiguration: null,
  })),

  on(deleteLastGame, (state: AppState) => ({ ...state, lastGame: null })),

  // CONFIGURATION
  on(setConfiguration, (state: AppState, { gameConfiguration }) => ({
    ...state,
    gameConfiguration,
  })),

  on(deleteConfiguration, (state: AppState) => ({
    ...state,
    gameConfiguration: null,
  }))
);
