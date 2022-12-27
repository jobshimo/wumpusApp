
import {Howl} from 'howler';

export const drum = new Howl({
  src: ['../assets/audio/bump.wav'],
  html5: true,
  loop: false,
  volume: 0.2,
});

export const gold = new Howl({
  src: ['../assets/audio/coin.wav'],
  html5: true,
  loop: false,
  volume: 0.2,
});

export const gameOver = new Howl({
  src: ['../assets/audio/game-over.wav'],
  html5: true,
  loop: false,
  volume: 0.2,
});

export const win = new Howl({
  src: ['../assets/audio/win.wav'],
  html5: true,
  loop: false,
  volume: 0.2,
});

export const dead = new Howl({
  src: ['../assets/audio/error.mp3'],
  html5: true,
  loop: false,
  volume: 0.2,
});

export const arrow = new Howl({
  src: ['../assets/audio/arrow.wav'],
  html5: true,
  loop: false,
  volume: 0.2,
});
