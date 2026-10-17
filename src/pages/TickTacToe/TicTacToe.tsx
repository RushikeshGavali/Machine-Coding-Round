import { useCallback, useRef, useState } from "react";
import { createInitialGrid, isWinner } from "./util";
import Grid from "./Grid";
import styles from "./TicTacToe.module.css";
import { useNavigate } from "react-router-dom";

type GameStatus = "playing" | "won" | "draw";

function TicTacToe({ size = 3 }: { size: number }) {
  const [grid, setGrid] = useState(createInitialGrid(size));
  const [isTurnX, setIsTurnX] = useState(true);
  const [status, setStatus] = useState<GameStatus>("playing");
  const count = useRef(0);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (grid[rowIndex][colIndex] !== null || status !== "playing") {
        return;
      }

      const deepCopy = [...grid];
      deepCopy[rowIndex] = [...grid[rowIndex]];
      deepCopy[rowIndex][colIndex] = isTurnX ? "X" : "O";
      setGrid(deepCopy);

      if (isWinner(deepCopy, isTurnX ? "X" : "O", rowIndex, colIndex)) {
        setStatus("won");
      } else if (count.current + 1 == size * size) {
        setStatus("draw");
      } else {
        setIsTurnX((current) => !current);
      }
      count.current = count.current + 1;
    },
    [grid, isTurnX, status, size],
  );

  const handleReset = () => {
    setGrid(createInitialGrid(size));
    setStatus("playing");
    count.current = 0;
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <main>
      <button onClick={handleHomeClick}>Home</button>
      <div className={styles.container}>
        <Grid grid={grid} handleClick={handleClick} />
        <div>
          {status === "draw"
            ? "Draw"
            : status === "won"
              ? `Winner is ${isTurnX ? "X" : "O"}`
              : `Turn -> ${isTurnX ? "X" : "O"}`}
        </div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </main>
  );
}

export default TicTacToe;
