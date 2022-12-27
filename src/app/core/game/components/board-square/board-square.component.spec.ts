import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSquareComponent } from './board-square.component';
import { StoreModule } from '@ngrx/store';
import { MAIN_REDUCER } from '../../../../main.reducer';

describe('BoardSquareComponent', () => {
  let component: BoardSquareComponent;
  let fixture: ComponentFixture<BoardSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(MAIN_REDUCER),
      ],
      declarations: [ BoardSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
