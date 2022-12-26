
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
    maxWumpu = 3,
    maxPits = 3,
    maxGold = 2
  ) {
    this.wall = line === 0 && position === 0 ? false : true;
    this.pit =
      line === 0 && position === 0
        ? false
        : Math.random() < 0.2 && pit < maxPits; // 20% de probabilidad de que haya un pozo
    this.wumpus =
      line === 0 && position === 0
        ? false
        : Math.random() < 0.15 && !this.pit && wumpus < maxWumpu; // 15% de probabilidad de que haya un wumpus
    this.gold =
      line === 0 && position === 0
        ? false
        : Math.random() < 0.1 && !this.wumpus && !this.pit && gold < maxGold; // 10% de probabilidad de que haya oro
  }
}
