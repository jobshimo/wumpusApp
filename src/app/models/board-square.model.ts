export type Board = BoardSquareModel[][];

export interface BoardSquareModel {
  line: number;
  position: number;
  wumpus: boolean;
  pit: boolean;
  gold: boolean;
  breeze: boolean;
  stench: boolean;
  glitter: boolean;
  scream: boolean;
  wall: boolean;
  stiff: boolean;
}

export class BoardSquare implements BoardSquareModel {
  breeze: boolean = false;
  stench: boolean = false;
  glitter: boolean = false;
  scream: boolean = false;
  stiff: boolean = false;
  wall: boolean;
  pit: boolean;
  wumpus: boolean;
  gold: boolean;

  constructor(
    public line: number,
    public position: number,
    wumpus: number,
    pit: number,
    gold: number,
    maxWumpu: number,
    maxPits: number,
    maxGold: number,
    size: number
  ) {
    let prob = { pit: 0.2, wumpus: 0.15, gold: 0.1 };
    switch (size) {
      case 4:
        prob = { pit: 0.2, wumpus: 0.15, gold: 0.05 };
        break;
      case 5:
        prob = { pit: 0.18, wumpus: 0.14, gold: 0.05 };
        break;
      case 6:
        prob = { pit: 0.16, wumpus: 0.13, gold: 0.05 };
        break;
      case 7:
        prob = { pit: 0.15, wumpus: 0.08, gold: 0.05 };
        break;
      case 8:
        prob = { pit: 0.15, wumpus: 0.06, gold: 0.05 };
        break;
      default:
        prob = { pit: 0.2, wumpus: 0.15, gold: 0.1 };
        break;
    }

    this.wall = line === 0 && position === 0 ? false : true;
    this.pit =
      line === 0 && position === 0
        ? false
        : Math.random() < prob.pit && pit < maxPits; // 20% de probabilidad de que haya un pozo
    this.wumpus =
      line === 0 && position === 0
        ? false
        : Math.random() < prob.wumpus && !this.pit && wumpus < maxWumpu; // 15% de probabilidad de que haya un wumpus
    this.gold =
      line === 0 && position === 0
        ? false
        : Math.random() < prob.gold &&
          !this.wumpus &&
          !this.pit &&
          gold < maxGold; // 10% de probabilidad de que haya oro
  }
}
