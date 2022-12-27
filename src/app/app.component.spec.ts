import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { MAIN_REDUCER, MainState } from './main.reducer';
import { moveDown, moveUp } from './literals.helper';
import { updatePlayerPosition } from './store/game/game.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(MAIN_REDUCER),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



  it('should subscribe to the observables in ngOnInit', () => {
    spyOn(component.playerFace$, 'subscribe').and.callThrough();
    spyOn(component.playerPosition$, 'subscribe').and.callThrough();
    spyOn(component.maxRows$, 'subscribe').and.callThrough();
    spyOn(component.selectCols$, 'subscribe').and.callThrough();
    spyOn(component.board$, 'subscribe').and.callThrough();
    spyOn(component.endGame$, 'subscribe').and.callThrough();
    spyOn(component.playerGold$, 'subscribe').and.callThrough();
    spyOn(component.playerArrows$, 'subscribe').and.callThrough();
    spyOn(component.initGame$, 'subscribe').and.callThrough();

    component.ngOnInit();

    expect(component.playerFace$.subscribe).toHaveBeenCalled();
    expect(component.playerPosition$.subscribe).toHaveBeenCalled();
    expect(component.maxRows$.subscribe).toHaveBeenCalled();
    expect(component.selectCols$.subscribe).toHaveBeenCalled();
    expect(component.board$.subscribe).toHaveBeenCalled();
    expect(component.endGame$.subscribe).toHaveBeenCalled();
    expect(component.playerGold$.subscribe).toHaveBeenCalled();
    expect(component.playerArrows$.subscribe).toHaveBeenCalled();
    expect(component.initGame$.subscribe).toHaveBeenCalled();
  });

  it('should unsubscribe from all observables in ngOnDestroy', () => {
    spyOn(component.playerFaceSubs, 'unsubscribe').and.callThrough();
    spyOn(component.playerPositionSubs, 'unsubscribe').and.callThrough();
    spyOn(component.maxRowsSubs, 'unsubscribe').and.callThrough();
    spyOn(component.selectColsSubs, 'unsubscribe').and.callThrough();
    spyOn(component.boardSubs, 'unsubscribe').and.callThrough();
    spyOn(component.endGameSubs, 'unsubscribe').and.callThrough();
    spyOn(component.playerGoldSubs, 'unsubscribe').and.callThrough();
    spyOn(component.playerArrowsSubs, 'unsubscribe').and.callThrough();
    spyOn(component.initGameSubs, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(component.playerFaceSubs.unsubscribe).toHaveBeenCalled();
    expect(component.playerPositionSubs.unsubscribe).toHaveBeenCalled();
    expect(component.maxRowsSubs.unsubscribe).toHaveBeenCalled();
    expect(component.selectColsSubs.unsubscribe).toHaveBeenCalled();
    expect(component.boardSubs.unsubscribe).toHaveBeenCalled();
    expect(component.endGameSubs.unsubscribe).toHaveBeenCalled();
    expect(component.playerGoldSubs.unsubscribe).toHaveBeenCalled();
    expect(component.playerArrowsSubs.unsubscribe).toHaveBeenCalled();
    expect(component.initGameSubs.unsubscribe).toHaveBeenCalled();
  });
});

describe('playerActions', () => {
  let playerActions: any;

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<MainState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(MAIN_REDUCER),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });
  it('should update player position', () => {
    const initialPosition = { row: 0, col: 0 };
    const updatedPosition = { row: 0, col: 0 };
    component.playerPosition = initialPosition;
    component.playerActions({code:moveUp}as KeyboardEvent);
    expect(component.playerPosition).toEqual(updatedPosition);
  });

  });


