type Grid = {
  grid: (string | null)[][];
  handleClick: (rowIndex: number, colIncdex: number) => void;
};

export default function Grid({ grid, handleClick }: Grid) {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => {
              return (
                <div
                  key={cellIndex}
                  className="cell"
                  onClick={() => handleClick(rowIndex, cellIndex)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
