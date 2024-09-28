export type Direction = "up" | "down" | "left" | "right";

export type TileRotation = 0 | 90 | 180 | 270 | "flip-horizontal" | "flip-vertical";

export interface TileMetadata {
  id: string;
  constraints: Constraint[];
  default?: boolean;
}

export interface Constraint {
  direction: Direction;
  possibleIds: TileMetadata["id"][] | TileMetadata["id"];
}

export class Tile<TM extends TileMetadata[]> {
  rotation: TileRotation = 0;
  collapse: boolean = false;
  states: TM;

  constructor(states: TM) {
    this.states = states;
  }

  rotate = (tileRotation: TileRotation) => {
    this.rotation = tileRotation;
  }

  entropy = () => {
    return 1;
  }

  /**
   * 
   * @returns the tile that was observed
   */
  observe: () => TM[number] = () => {
    return this.states[Math.floor(Math.random() * this.states.length)];
  }
  
}

export interface WaveOptions<TM extends TileMetadata[]> {
  width: number;
  height: number;
  tileSize: number;
  tileMetadata: TM;
}

export class Wave<TM extends TileMetadata[]> {
  width: number;
  height: number;
  tileMetadata: TM;
  grid: Tile<TM>[];
  
  constructor(options: WaveOptions<TM>) {
    this.width = options.width;
    this.height = options.height;
    this.tileMetadata = options.tileMetadata;
    this.grid = new Array(this.width * this.height);
    this.init();
  }

  init() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.grid[i + j] = new Tile(this.tileMetadata);
      }
    }
  }

  update() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.grid[i + j].observe();
      }
    }
    return this.grid;
  }
}