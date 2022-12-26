import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { BoardSquareComponent } from './components/board-square/board-square.component';
import { BoardLineComponent } from './components/board-line/board-line.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [BoardComponent, BoardSquareComponent, BoardLineComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    // StoreModule.forFeature( 'userState', UserStateReducer ),
    // EffectsModule.forFeature([ UserEffects ]),
  ],
})
export class GameModule {}
