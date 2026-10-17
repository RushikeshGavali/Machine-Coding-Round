import { GRID_CELL } from "./SnakeGame";

export function getSnakeGrid(n: number) {
  return Array.from({ length: n }, () => {
    return new Array(n).fill(null);
  });
}

export function isSnakeBodyPresent(body: number[][], x: number, y: number) {
  return body.some(([xIndex, yIndex]) => xIndex == x && yIndex === y);
}

export const getFoodLocation = () => {
  let x = ~~(Math.random() * GRID_CELL);
  let y = ~~(Math.random() * GRID_CELL);
  return [x, y];
};
