import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Board, BoardSquareModel } from '../models/board-square.model';
import { boardMock, expectedBoardMock } from './services.mock';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a board with the correct number of rows and columns', () => {
    const rows = 3;
    const cols = 4;
    const board = service.generateBoard(rows, cols, 3);
    expect(board.length).toEqual(rows);
    expect(board[0].length).toEqual(cols);
  });

  it('should generate a cell for each position in the board', () => {
    const rows = 3;
    const cols = 4;
    const board = service.generateBoard(rows, cols, 3);
    let cellCount = 0;
    board.forEach((row) => {
      cellCount += row.length;
    });
    expect(cellCount).toEqual(rows * cols);
  });

});

describe('GameService Cell Elements ', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should set the correct values for cells with pits and wumpus', () => {
    const board: Board = boardMock;
    const expectedBoard: Board = expectedBoardMock
    const result = service.setBoardValues(board);
    expect(result).toEqual(expectedBoard);
  });

  it('should return false for an empty board', () => {
    const board: Board = [];
    expect(service.hasGold(board)).toBe(false);
  });

  it('should return true for a board with a gold square', () => {
    const board: Board = boardMock;
    expect(service.hasGold(board)).toBe(true);
  });


});
describe('GameService Max Board Elements ', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should return the correct object for a board size of 4', () => {
    const size = 4;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 2, maxPit: 3, maxGold: 2 });
  });

  it('should return the correct object for a board size of 5', () => {
    const size = 5;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 3, maxPit: 3, maxGold: 2 });
  });

  it('should return the correct object for a board size of 6', () => {
    const size = 6;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 3, maxPit: 4, maxGold: 2 });
  });

  it('should return the correct object for a board size of 7', () => {
    const size = 7;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 4, maxPit: 4, maxGold: 3 });
  });

  it('should return the correct object for a board size of 8', () => {
    const size = 8;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 5, maxPit: 5, maxGold: 3 });
  });

  it('should return the correct object for a board size of 9', () => {
    const size = 9;
    expect(service.setMaxElements(size)).toEqual({ maxWumpus: 6, maxPit: 5, maxGold: 4 });
  });
});
