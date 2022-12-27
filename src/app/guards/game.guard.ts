import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { MainState } from '../main.reducer';
import { selectInitGame } from '../store/game/game.selectors';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanLoad {

  private deniedPass: UrlTree = this.router.createUrlTree(["/home"]);

  constructor(
    private router : Router,
    private store  : Store<MainState>,
  ) {}
  canLoad(): Observable<boolean | UrlTree>{
      return this.store.select(selectInitGame).pipe( map( (game: boolean ) =>  (!game) ? this.deniedPass : true ), take(1));
  }
}
