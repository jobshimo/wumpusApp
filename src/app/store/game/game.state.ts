
import { PositionModel } from '../../models/position.model';
import { moveDown } from '../../literals.helper';
import { Board } from '../../models/board-square.model';

export interface GameState {
  board: Board;
  playerPosition: PositionModel;
  lookingTo: string;
  rows:number;
  colums:number;
  arrows: number;
  gold: number;
  moving:boolean
  endGame:boolean
  initGame:boolean
}

export const initialGameState: GameState = {
  board: [],
  playerPosition: { row: 0, col: 0 },
  lookingTo: moveDown,
  rows:0,
  colums:0,
  arrows: 0,
  gold: 0,
  moving:false,
  endGame:false,
  initGame:false
};
