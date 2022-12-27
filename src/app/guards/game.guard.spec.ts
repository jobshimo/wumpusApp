import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { GameGuard } from './game.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { MAIN_REDUCER, MainState } from '../main.reducer';

describe('GameGuard', () => {
  let guard: GameGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(MAIN_REDUCER),
      ],
    });
    guard = TestBed.inject(GameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});



