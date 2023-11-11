export function generateMaze(x: number, y: number): number[][][] {
  const totalCells = x * y;
  const cells: number[][][] = [];
  const unvisitedCells = [];

  for (let i = 0; i < y; i++) {
    cells[i] = [];
    unvisitedCells[i] = [];

    for (let j = 0; j < x; j++) {
      cells[i][j] = [0, 0, 0, 0];
      unvisitedCells[i][j] = true;
    }
  }

  let currentCell: number[] = [
    Math.floor(Math.random() * y),
    Math.floor(Math.random() * x),
  ];

  const path = [currentCell];
  unvisitedCells[currentCell[0]][currentCell[1]] = false;
  let visitedCells = 1;

  while (visitedCells < totalCells) {

    const potentialNeighbors = [
      [currentCell[0] - 1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1],
    ];

    const neighborCells = [];

    for (let l = 0; l < 4; l++) {

      if (
        potentialNeighbors[l][0] > -1 &&
        potentialNeighbors[l][0] < y &&
        potentialNeighbors[l][1] > -1 &&
        potentialNeighbors[l][1] < x &&
        unvisitedCells[potentialNeighbors[l][0]][potentialNeighbors[l][1]]
      ) {
        neighborCells.push(potentialNeighbors[l]);
      }
    }

    if (neighborCells.length) {

      const nextNeighbor = neighborCells[Math.floor(Math.random() * neighborCells.length)];

      cells[currentCell[0]][currentCell[1]][nextNeighbor[2]] = 1;
      cells[nextNeighbor[0]][nextNeighbor[1]][nextNeighbor[3]] = 1;

      unvisitedCells[nextNeighbor[0]][nextNeighbor[1]] = false;
      visitedCells++;
      currentCell = [nextNeighbor[0], nextNeighbor[1]];
      path.push(currentCell);
    }

    else {
      currentCell = path.pop();
    }
  }

  return cells;
}

