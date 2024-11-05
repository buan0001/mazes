import Stack from "./Stack.js";

window.addEventListener("load", start);

async function start() {
  const mazeInfo = await readJSON();
  console.log("Maze:", mazeInfo);
  createMaze(mazeInfo);
  // recursiveSolver(maze, { row: 2, col: 0 });
  const solveStack = iterativeSolver(mazeInfo, mazeInfo.maze[mazeInfo.start.row][mazeInfo.start.col]);
  console.log("solveStack:", solveStack);
  if (solveStack) {
    solveStack.dumpList();
  }
}

async function readJSON(filePath = "./maze.json") {
  return await fetch(filePath).then(response => response.json());
}

function createMaze(mazeObj) {
  const container = document.querySelector("#maze");
  const totalCols = mazeObj.cols;
  for (const row of mazeObj.maze) {
    for (const tile of row) {
      const node = document.createElement("div");

      if (tile.row == mazeObj.start.row && tile.col == mazeObj.start.col) {
        node.classList.add("start");
      } else if (tile.row == mazeObj.goal.row && tile.col == mazeObj.goal.col) {
        node.classList.add("goal");
      }
      node.classList.add("cell");
      for (const key in tile) {
        if (tile[key] && key != "row" && key != "col") {
          node.classList.add(key);
        }
      }

      node.dataset.index = tile.row * totalCols + tile.col;

      node.style.setProperty("--CELL-SIZE", 40 / mazeObj.rows + "em");
      container.appendChild(node);
    }
  }
}

function iterativeSolver(mazeObj, currentTile) {
  const tileStack = new Stack();
  const branchStack = new Stack();
  console.log("The stack:", tileStack);
  console.log("THe tile:", currentTile);
  tileStack.push(currentTile);

  let iterations = 0;
  while (tileStack.peek()) {
    let tile = tileStack.peek().data;
    console.log("Tile:", tile);
    // if (!tile.discovered) {
    markAsDiscovered(mazeObj, tile);
    const validNeighbors = getNeighbourCoords(mazeObj, tile);
    // console.log("tile stack:", tileStack.peek());
    console.log("Neighbors:", validNeighbors);
    if (validNeighbors.length > 1) {
      console.log("At branch");
      branchStack.push(tile);
    }
    for (const neighbor of validNeighbors) {
      console.log(neighbor);

      tileStack.push(neighbor);
      if (neighbor.row == mazeObj.goal.row && neighbor.col == mazeObj.goal.col) {
        console.log("Found the goal!");
        markAsCorrectPath(mazeObj, tileStack);
        return tileStack;
      }
    }
    if (validNeighbors.length == 0 && branchStack.peek()) {
      console.log("At dead end:", tile);
      // Mark tiles as discovered until we find the last branch
      const lastBranch = branchStack.pop().data;
      console.log("last branch:", lastBranch);

      while (lastBranch.row != tileStack.peek().data.row || lastBranch.col != tileStack.peek().data.col) {
        // while (lastBranch.row != tile.row || lastBranch.col != tile.col) {
        markAsDeadEnd(mazeObj, tile);
        tile = tileStack.pop().data;
      }
      console.log("Left while loop at:", tile);
      // tile = tileStack.peek().data;

      // }
    }
    iterations++;
    if (iterations > 50) {
      break;
    }
  }

  console.log("final tile stack:");
  tileStack.dumpList();
}

function markAsCorrectPath(mazeObj, stack) {
  // Leave the goal tile out of the stack
  stack.pop()
  // And stop before we reach the start tile
  while (stack.peek().next) {
    const tile = stack.pop().data;
    const coordId = tile.row * mazeObj.cols + tile.col;
    const correctTile = document.querySelector(`[data-index="${coordId}"]`);
    correctTile.classList.add("correctPath");
  }
}

function recursiveSolver(mazeObj, currentTile) {
  markAsDiscovered(mazeObj, currentTile);
  const validNeighbours = getNeighbourCoords(mazeObj, currentTile);
  console.log("Valid neighbors:", validNeighbours);
  for (const neighbor of validNeighbours) {
    if (neighbor.row == mazeObj.goal.row && neighbor.col == mazeObj.goal.col) {
      console.log("Found the goal!");
      return neighbor;
    }
    if (!neighbor.discovered) {
      recursiveSolver(mazeObj, neighbor);
    }
  }
}

function markAsDiscovered(mazeObj, coordinates) {
  coordinates.discovered = true;
  const coordId = coordinates.row * mazeObj.cols + coordinates.col;
  const correctTile = document.querySelector(`[data-index="${coordId}"]`);
  correctTile.classList.add("discovered");
}

function markAsDeadEnd(mazeObj, coordinates) {
  coordinates.discovered = true;
  const coordId = coordinates.row * mazeObj.cols + coordinates.col;
  const correctTile = document.querySelector(`[data-index="${coordId}"]`);
  correctTile.classList.remove("discovered");
  correctTile.classList.add("deadEnd");
}

function getNeighbourCoords(mazeObj, coordinates) {
  const validCoords = [];
  const correctTile = mazeObj.maze[coordinates.row][coordinates.col];
  const m = mazeObj.maze;
  if (!correctTile["south"] && !m[correctTile.row + 1][correctTile.col].discovered) {
    validCoords.push(m[correctTile.row + 1][correctTile.col]);
  }
  if (!correctTile["east"] && !m[correctTile.row][correctTile.col + 1].discovered) {
    validCoords.push(m[correctTile.row][correctTile.col + 1]);
  }
  if (!correctTile["west"] && !m[correctTile.row][correctTile.col - 1].discovered) {
    validCoords.push(m[correctTile.row][correctTile.col - 1]);
  }
  if (!correctTile["north"] && !m[correctTile.row - 1][correctTile.col].discovered) {
    validCoords.push(m[correctTile.row - 1][correctTile.col]);
  }

  return validCoords;
}
