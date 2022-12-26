// import { Action, ActionReducer } from '@ngrx/store';
import { MainState } from '../main.reducer';
import { RESET_STATE } from './app/app.actions';

// // export function clearStateMetaReducer<MainState extends {}>(reducer: ActionReducer<MainState>): ActionReducer<MainState> {
// //     return function clearStateFn(state: MainState, action: Action) {
// //         if (action.type === RESET_STATE) {
// //             state = {} as MainState;
// //     }
// //     return reducer(state, action);
// //    };
// // }

// export const clearStateMetaReducer = (reducer : ActionReducer<MainState>)  =>
//                                      (state   : MainState, action: Action) => reducer((action.type === RESET_STATE) ? {} as MainState : state, action)

import { ActionReducer, MetaReducer } from '@ngrx/store';
// import { reducers } from './reducers';

// console.log all actions
export function clearStateMetaReducer(
  reducer: ActionReducer<MainState>
): ActionReducer<MainState> {
  return function (state, action) {
    if (action.type === RESET_STATE) state = {} as MainState;

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];
