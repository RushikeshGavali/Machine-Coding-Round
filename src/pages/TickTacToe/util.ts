export function createInitialGrid(size: number) {
  return Array.from({ length: size }, () => {
    return new Array(size).fill(null);
  });
}

export function isWinner(
  grid: (string | null)[][],
  current: string,
  rowIndex: number,
  colIndex: number,
) {
  // Check Row
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[rowIndex][i] != current) {
      break;
    }
    if (i === grid[0].length - 1) {
      return true;
    }
  }
  //column
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][colIndex] != current) {
      break;
    }
    if (i === grid[0].length - 1) {
      return true;
    }
  }

  // Diagonal
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[i][i] != current) {
      break;
    }
    if (i === grid[0].length - 1) {
      return true;
    }
  }

  for (let i = 0; i < grid[0].length; i++) {
    if (grid[i][grid.length - i - 1] != current) {
      break;
    }
    if (i === grid[0].length - 1) {
      return true;
    }
  }
}
