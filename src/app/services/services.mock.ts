import { Board } from './game.service';
export const boardMock: Board = [
  [
      {
          "line": 0,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": false,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 0,
          "position": 1,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": true,
          "gold": false
      },
      {
          "line": 0,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 0,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": true,
          "gold": false
      }
  ],
  [
      {
          "line": 1,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 1,
          "stiff": false,
          "breeze": true,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": true
      }
  ],
  [
      {
          "line": 2,
          "position": 0,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 1,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": true,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 2,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      }
  ],
  [
      {
          "line": 3,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 1,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      }
  ]
];

export const expectedBoardMock: Board = [
  [
      {
          "line": 0,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": false,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 0,
          "position": 1,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": true,
          "gold": false
      },
      {
          "line": 0,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 0,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": true,
          "gold": false
      }
  ],
  [
      {
          "line": 1,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 1,
          "stiff": false,
          "breeze": true,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 1,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": true,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": true
      }
  ],
  [
      {
          "line": 2,
          "position": 0,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 1,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": true,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 2,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 2,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      }
  ],
  [
      {
          "line": 3,
          "position": 0,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 1,
          "stiff": false,
          "breeze": true,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 2,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      },
      {
          "line": 3,
          "position": 3,
          "stiff": false,
          "breeze": false,
          "stench": false,
          "glitter": false,
          "scream": false,
          "wall": true,
          "pit": false,
          "wumpus": false,
          "gold": false
      }
  ]
];
