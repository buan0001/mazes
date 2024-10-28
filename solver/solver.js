
window.addEventListener("load",start)

const mazeObj = {
    "rows": 4,
    "cols": 4,
    "start": {"row": 0, "col": 0},
    "goal": {"row": 2, "col": 3},
    "maze":
    [
      [{"row":0,"col":0,"north":true,"east":true,"west":true,"south":false},
       {"row":0,"col":1,"north":true,"east":false,"west":true,"south":false},
       {"row":0,"col":2,"north":true,"east":false,"west":false,"south":true},
       {"row":0,"col":3,"north":true,"east":true,"west":false,"south":false}],
      [{"row":1,"col":0,"north":false,"east":false,"west":true,"south":true},
       {"row":1,"col":1,"north":false,"east":true,"west":false,"south":true},
       {"row":1,"col":2,"north":true,"east":false,"west":true,"south":false},
       {"row":1,"col":3,"north":false,"east":true,"west":false,"south":true}],
      [{"row":2,"col":0,"north":true,"east":false,"west":true,"south":false},
       {"row":2,"col":1,"north":true,"east":true,"west":false,"south":true},
       {"row":2,"col":2,"north":false,"east":true,"west":true,"south":false},
       {"row":2,"col":3,"north":true,"east":true,"west":true,"south":false}],
      [{"row":3,"col":0,"north":false,"east":false,"west":true,"south":true},
       {"row":3,"col":1,"north":true,"east":false,"west":false,"south":true},
       {"row":3,"col":2,"north":false,"east":false,"west":false,"south":true},
       {"row":3,"col":3,"north":false,"east":true,"west":false,"south":true}]
    ]
  }

function start(){
    console.log("Script running");
    // console.log("Maze:",mazeObj);
    createMaze()
}

function createMaze(){
    const container = document.querySelector("#maze")
    for (const row of mazeObj.maze) {
        for (const tile of row) {
            const node = document.createElement("div")
            node.classList.add("cell")
            for (const key in tile) {
                if (tile[key] && key != "row" && key != "col") {
                    node.classList.add(key)
                }
            }
            container.appendChild(node)
        }
    }
}