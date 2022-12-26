import { Board } from '../../services/game.service';
import { PositionModel } from '../../models/position.model';

export interface GameState {
  board: Board;
  playerPosition: PositionModel;
  lookingTo: string;
  rows:number;
  colums:number;
  arrows: number;
  gold: number;
  heads: number;
  exploredCells: number;
  points: number;
  moving:boolean
  endGame:boolean
}

export const initialGameState: GameState = {
  board: [],
  playerPosition: { row: 0, col: 0 },
  lookingTo: 'ArrowDown',
  rows:0,
  colums:0,
  arrows: 0,
  gold: 0,
  heads: 0,
  exploredCells: 0,
  points: 0,
  moving:false,
  endGame:false
};
