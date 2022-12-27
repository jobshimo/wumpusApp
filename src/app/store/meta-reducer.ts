import { MainState } from '../main.reducer';

import { ActionReducer, MetaReducer } from '@ngrx/store';
import { RESET_STATE } from './game/game.actions';

export function clearStateMetaReducer(
  reducer: ActionReducer<MainState>
): ActionReducer<MainState> {
  return function (state, action) {
    if (action.type === RESET_STATE) state = {} as MainState;

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];
