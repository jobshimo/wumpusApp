import { Injectable } from '@angular/core';
import { moveUp, moveDown, moveLeft, moveRight } from '../literals.helper';
import {
  BoardSquareModel,
  BoardSquare,
  Board,
} from '../models/board-square.model';
import { PositionModel } from '../models/position.model';

type percepts = 'stench' | 'breeze' | 'scream';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  generateBoard(rows: number, cols: number, pits: number): Board {
    const board: Board = [];
    const { maxWumpus, maxPit, maxGold } = this.setMaxElements(rows);
    let pit = 0,
      wumpus = 0,
      gold = 0;
    for (let indexRow = 0; indexRow < rows; indexRow++) {
      const row: BoardSquareModel[] = [];
      for (let cellIndex = 0; cellIndex < cols; cellIndex++) {
        const cell = new BoardSquare(
          indexRow,
          cellIndex,
          wumpus,
          pit,
          gold,
          maxWumpus,
          pits,
          maxGold,
          rows
        );
        switch (true) {
          case cell.pit:
            pit++;
            break;
          case cell.wumpus:
            wumpus++;
            break;
          case cell.gold:
            gold++;
            break;
        }
        row.push(cell);
      }
      board.push(row);
    }

    return this.setBoardValues(board);
  }

  setBoardValues(board: Board): Board {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const row = board[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];
        if (cell.pit)
          this.setAdjacentCellValue(board, rowIndex, colIndex, 'breeze');
        if (cell.wumpus)
          this.setAdjacentCellValue(board, rowIndex, colIndex, 'stench');
      }
    }
    if (!this.hasGold(board)) this.setGold(board);
    return board;
  }

  setAdjacentCellValue(
    board: Board,
    rowIndex: number,
    colIndex: number,
    value: percepts
  ): void {
    if (rowIndex > 0) board[rowIndex - 1][colIndex][value] = true;

    if (rowIndex < board.length - 1)
      board[rowIndex + 1][colIndex][value] = true;

    if (colIndex > 0) board[rowIndex][colIndex - 1][value] = true;

    if (colIndex < board[rowIndex].length - 1)
      board[rowIndex][colIndex + 1][value] = true;
  }

  checkWumpusFacePlayerDirection(
    board: Board,
    rowIndex: number,
    colIndex: number,
    direction: string
  ): boolean {
    switch (direction) {
      case moveUp:
        return rowIndex > 0 ? board[rowIndex - 1][colIndex].wumpus : false;
      case moveDown:
        return rowIndex < board.length - 1
          ? board[rowIndex + 1][colIndex].wumpus
          : false;
      case moveLeft:
        return colIndex > 0 ? board[rowIndex][colIndex - 1].wumpus : false;
      case moveRight:
        return colIndex < board[rowIndex].length - 1
          ? board[rowIndex][colIndex + 1].wumpus
          : false;
      default:
        return false;
    }
  }

  wumpusToKillPosition(
    direction: string,
    rowIndex: number,
    colIndex: number
  ): PositionModel {
    switch (direction) {
      case moveUp:
        return { row: rowIndex - 1, col: colIndex };
      case moveDown:
        return { row: rowIndex + 1, col: colIndex };
      case moveLeft:
        return { row: rowIndex, col: colIndex - 1 };
      case moveRight:
        return { row: rowIndex, col: colIndex + 1 };
      default:
        return { row: rowIndex, col: colIndex };
    }
  }

  checkWumpusOnCell(board: Board, rowIndex: number, colIndex: number): boolean {
    return board[rowIndex][colIndex].wumpus;
  }

  hasGold(board: Board): boolean {
    for (const row of board)
      for (const square of row) if (square.gold) return true;
    return false;
  }

  setGold(board: Board): void {
    let square: BoardSquareModel | undefined = board
      .flat()
      .find((s) => !s.pit && !s.wumpus && !(s.position == 0) && !(s.line == 0));
    if (square) square.gold = true;
  }

  setMaxElements(size: number): {
    maxWumpus: number;
    maxPit: number;
    maxGold: number;
  } {
    switch (size) {
      case 5:
        return { maxWumpus: 3, maxPit: 3, maxGold: 2 };
      case 6:
        return { maxWumpus: 3, maxPit: 4, maxGold: 2 };
      case 7:
        return { maxWumpus: 4, maxPit: 4, maxGold: 3 };
      case 8:
        return { maxWumpus: 5, maxPit: 5, maxGold: 3 };
      case 9:
        return { maxWumpus: 6, maxPit: 5, maxGold: 4 };
      default:
        return { maxWumpus: 2, maxPit: 3, maxGold: 2 };
    }
  }
}
