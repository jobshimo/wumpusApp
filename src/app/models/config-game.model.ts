export interface ConfigGameModel {
  maxRows: number;
  maxCols: number;
  maxWumpu: number;
  maxPits: number;
  maxGold: number;
  level: number;
  chanceWumpu: number;
  chancePit: number;
  chanceGold: number;
}

export class ConfigGame implements ConfigGameModel {
  chanceWumpu: number;
  chancePit: number;
  chanceGold: number;

  constructor(
    public maxRows: number,
    public maxCols: number,
    public maxWumpu: number,
    public maxPits: number,
    public maxGold: number,
    public level: number
  ) {
    switch (level) {
      case 1:
        this.chanceWumpu = 0.18;
        this.chancePit = 0.21;
        this.chanceGold = 0.1;
        break;
      case 2:
        this.chanceWumpu = 0.2;
        this.chancePit = 0.25;
        this.chanceGold = 0.1;
        break;
      case 3:
        this.chanceWumpu = 0.25;
        this.chancePit = 0.3;
        this.chanceGold = 0.1;
        break;
      default:
        this.chanceWumpu = 0.15;
        this.chancePit = 0.2;
        this.chanceGold = 0.1;
        break;
    }
  }
}
