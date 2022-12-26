import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from "@ngrx/store";
import { catchError, from, map, of, switchMap, take } from 'rxjs';

// import { UserState } from './user.state';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../../models/user/user.model';
import {
  getLastGame,
  setLastGame,
  setConfiguration,
  saveGame,
  saveGameSuccess,
} from './app.actions';
import { GameService } from '../../services/game.service';
import { saveGameFailure } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private gameService: GameService // private store: Store<UserState>,
  ) // private firebaseService: AuthService,
  {}

  // appInit$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(checkLastGame),
  //     map(() => setLastGame({ lastGame: this.gameService.game }))
  //   )
  // );

  getLastGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLastGame),
      map(() => setLastGame({ lastGame: this.gameService.game }))
    )
  );

  setConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLastGame),
      map(() => setConfiguration({ gameConfiguration: this.gameService.game }))
    )
  );

  saveGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveGame),
      map(({game}) => {
        try {
          this.gameService.setGameToLocalStorage(game);
          return saveGameSuccess()
        } catch (error) {
          console.warn('Save Game Error --->',error);
          return saveGameFailure()
        }
      })

    )
  );

  //     getUserData$ = createEffect( () =>
  //       this.actions$.pipe(
  //         ofType( getUserData ),
  //         switchMap( ({ id }) =>  from( this.firebaseService.getUserData( id )).pipe(
  //          take( 1 ),
  //          map( ({ id, email, startDate, name }) => getUserDataSucces({user: new User( id, email, startDate, name )}) ),
  //           catchError( error => of(getUserDataError({ error }))),
  //         ),
  //        ),
  //       ),
  //     );

  //     loginSuccess$ = createEffect( () =>
  //        this.actions$.pipe(
  //            ofType( getUserDataSucces ),
  //            map( ({user}) => {
  //                this.router.navigate([ '/home' ]);
  //                return loginSuccess({user})}),
  //            catchError( error => of(loginError({ error }))),
  //        ),
  //     );

  //     userLogout$ = createEffect(()=>
  //       this.actions$.pipe(
  //         ofType( logout ),
  //         switchMap(()=> from( this.firebaseService.logout() ).pipe(
  //           take( 1 ),
  //           map( () => {
  //             this.router.navigate([ '/login' ]);
  //             return logoutSuccess() }),
  //           catchError( error => of(logoutError({ error })))
  //         )),
  //       ),
  //     );

  //     setUserData$ = createEffect(()=>
  //     this.actions$.pipe(
  //       ofType( setUserData ),
  //      switchMap( ({ user }) =>  from(this.firebaseService.setUser( user )).pipe(
  //       take(1),
  //       map( () => setUserDataSuccess({ id: user.id }) ),
  //       catchError( error => of( setUserDataError({ error })))
  //       ),),
  //     ),
  //  );

  //  userRegister$ = createEffect(()=>
  //    this.actions$.pipe(
  //      ofType(register),
  //      switchMap( ({ credentials }) =>  from(this.firebaseService.register({ email: credentials.email, password: credentials.password })).pipe(
  //        take(1),
  //        map( ({ user }) => setUserData({user: new User( user.uid, user.email, '', '')}) ),
  //        catchError( error => of( registerError({ error })))
  //         ),
  //       ),
  //    ),
  //   );

  // userRegisterRemoveLocalNotes$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(setUserDataSuccess),
  //     map(({ id }) => {
  //       this.router.navigate(['/home']);
  //       let notes = localStorage.getItem('note');
  //       let objectNote: StorageNotes = JSON.parse(notes ? notes : '{}');

  //       if (notes) {
  //         this.firebaseService.setMultipleNotes(objectNote.notes, id);
  //         localStorage.removeItem('note');
  //       }
  //       return registerRemoveNotesLocal();
  //     })
  //   )
  // );
}
