import { Component, OnInit, Input } from '@angular/core';
import { BoardSquareModel } from '../../../../models/board-square.model';
import { PositionModel } from '../../../../models/position.model';







@Component({
  selector: 'app-board-line',
  templateUrl: './board-line.component.html',
  styleUrls: ['./board-line.component.scss']
})
export class BoardLineComponent implements OnInit {

  @Input('line-square') squares: BoardSquareModel[] = [];
  @Input() position!: PositionModel | null ;
  @Input() lookingTo!: string | null;
  @Input() lineIndex!: number ;

  constructor() { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }



}
