import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './store/app/app.state';
import { AppStateReducer } from './store/app/app.reducer';
import { GameState } from './store/game/game.state';
import { GameStateReducer } from './store/game/game.reducer';

export interface MainState {
  appState: AppState;
  gameState: GameState;
}

export const MAIN_REDUCER: ActionReducerMap<MainState> = {
  appState: AppStateReducer,
  gameState: GameStateReducer,
};
