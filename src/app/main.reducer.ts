import { ActionReducerMap } from '@ngrx/store';
import { GameState } from './store/game/game.state';
import { GameStateReducer } from './store/game/game.reducer';

export interface MainState {

  gameState: GameState;
}

export const MAIN_REDUCER: ActionReducerMap<MainState> = {

  gameState: GameStateReducer,
};
