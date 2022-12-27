import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BoardSquare } from '../../../../models/board-square.model';
import { PositionModel } from '../../../../models/position.model';
import { Observable, Subscription } from 'rxjs';
import { MainState } from '../../../../main.reducer';
import { Store } from '@ngrx/store';
import { selectMoving, selectEndGame } from '../../../../store/game/game.selectors';
import { moveUp } from 'src/app/literals.helper';
import { moveDown, moveLeft, moveRight } from '../../../../literals.helper';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss'],
})
export class BoardSquareComponent implements OnInit, OnDestroy {
  constructor(private store: Store<MainState>) {}

  @Input() position!: PositionModel | null;
  @Input('square-items') squareItems: BoardSquare | null = null;
  @Input() lookingTo!: string | null;
  @Input() lineIndex!: number;
  @Input() cellIndex!: number;
  payerImgUlrBase = '../../../../../assets/img/';
  cssAnimation: string = '';

  ngOnInit(): void {

    this.movingSubs = this.moving$.subscribe(
      (moving) => (this.moving = moving)
    );
    this.endGameSubs = this.endGame$.subscribe(
      (endGame) => (this.endGame = endGame)
    );
  }

  get player(): boolean {
    return (
      this.position?.row === this.lineIndex &&
      this.position?.col === this.cellIndex
    );
  }
  moving$: Observable<boolean> = this.store.select(selectMoving);
  movingSubs: Subscription = new Subscription();
  moving: boolean = false;

  endGame$: Observable<boolean> = this.store.select(selectEndGame);
  endGameSubs: Subscription = new Subscription();
  endGame: boolean = false;

  get selectPlayerImage(): string | null {
    switch (this.lookingTo) {
      case moveUp:
        return this.payerImgUlrBase + 'player_facing_to_up.png';
      case moveDown:
        return this.payerImgUlrBase + 'player_facing_to_down.png';
      case moveLeft:
        return this.payerImgUlrBase + 'player_facing_to_left.png';
      case moveRight:
        return this.payerImgUlrBase + 'player_facing_to_right.png';
      default:
        return null;
    }
  }

  get selecMotionEfect():string | null {
    if (!this.moving) return null;
    switch (this.lookingTo) {
      case moveUp:
        return 'animate__fadeInUp';
      case moveDown:
        return 'animate__fadeInDown';
      case moveLeft:
        return 'animate__fadeInRight';
      case moveRight:
        return 'animate__fadeInLeft';
      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    this.movingSubs?.unsubscribe();
  }
}
