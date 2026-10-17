import { useEffect, useRef, useState } from "react";
import styles from "./SnakeGame.module.css";
import { getFoodLocation, getSnakeGrid, isSnakeBodyPresent } from "./util";

export let GRID_CELL = 20;
const snakeGrid = getSnakeGrid(GRID_CELL);

export default function SnakeGame() {
  const [snake, setSnake] = useState([
    [4, 5],
    [4, 6],
    [4, 7],
  ]);
  const food = useRef(getFoodLocation());
  const direction = useRef([0, 1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const copySnake = snake.map(([x, y]) => [x, y]);

      let headX = snake[snake.length - 1][0];
      let headY = snake[snake.length - 1][1];

      const newBodyCell = [
        headX + direction.current[0],
        headY + direction.current[1],
      ];

      if (
        newBodyCell[0] < 0 ||
        newBodyCell[0] >= GRID_CELL ||
        newBodyCell[1] < 0 ||
        newBodyCell[1] >= GRID_CELL ||
        isSnakeBodyPresent(snake, newBodyCell[0], newBodyCell[1])
      ) {
        setSnake([
          [4, 5],
          [4, 6],
          [4, 7],
        ]);
        direction.current = [0, 1];
      } else {
        copySnake.push(newBodyCell);

        if (isSnakeBodyPresent(copySnake, food.current[0], food.current[1])) {
          food.current = getFoodLocation();
        } else {
          copySnake.shift();
        }

        setSnake(copySnake);
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (
        e.key === "ArrowUp" &&
        direction.current[0] != 1 &&
        direction.current[1] != 0
      ) {
        direction.current = [-1, 0];
      } else if (
        e.key === "ArrowDown" &&
        direction.current[0] != -1 &&
        direction.current[1] != 0
      ) {
        direction.current = [1, 0];
      } else if (
        e.key === "ArrowLeft" &&
        direction.current[0] != 0 &&
        direction.current[1] != 1
      ) {
        direction.current = [0, -1];
      } else if (
        e.key === "ArrowRight" &&
        direction.current[0] != 0 &&
        direction.current[1] != -1
      ) {
        direction.current = [0, 1];
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake]);

  return (
    <div className={styles.container}>
      {snakeGrid.map((row, xIndex) => {
        return (
          <div className={styles.row} key={xIndex}>
            {row.map((_, yIndex) => {
              return (
                <div
                  className={`${styles.cell} 
                      ${isSnakeBodyPresent(snake, xIndex, yIndex) ? styles.snakeBody : ""} 
                      ${food.current[0] === xIndex && food.current[1] === yIndex ? styles.food : ""}`}
                  key={yIndex}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
