import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BoardSquare } from '../../../../models/board-square.model';
import { PositionModel } from '../../../../models/position.model';
import { Observable, Subscription } from 'rxjs';
import { MainState } from '../../../../main.reducer';
import { Store } from '@ngrx/store';
import { selectMoving, selectEndGame } from '../../../../store/game/game.selectors';

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
      case 'ArrowUp':
        return this.payerImgUlrBase + 'player_facing_to_up.png';
      case 'ArrowDown':
        return this.payerImgUlrBase + 'player_facing_to_down.png';
      case 'ArrowLeft':
        return this.payerImgUlrBase + 'player_facing_to_left.png';
      case 'ArrowRight':
        return this.payerImgUlrBase + 'player_facing_to_right.png';
      default:
        return null;
    }
  }

  get selecMotionEfect():string | null {
    if (!this.moving) return null;
    switch (this.lookingTo) {
      case 'ArrowUp':
        return 'animate__fadeInUp';
      case 'ArrowDown':
        return 'animate__fadeInDown';
      case 'ArrowLeft':
        return 'animate__fadeInRight';
      case 'ArrowRight':
        return 'animate__fadeInLeft';
      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    this.movingSubs?.unsubscribe();
  }
}
