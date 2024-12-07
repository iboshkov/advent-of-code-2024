import fs from "fs";
import chalk from "chalk";
import "./input.txt";
import { setTimeout } from "timers/promises";

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.split("\n").map((line) => line.split(""));

const isGuard = (cell: string) => [">", "<", "^", "v"].includes(cell);

const moveIndexes = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  v: [1, 0],
};

const turnRight = (guard: string) => {
  switch (guard) {
    case ">":
      return "v";
    case "v":
      return "<";
    case "<":
      return "^";
    case "^":
      return ">";
  }
};

const printBoard = (state: string[][]) => {
  console.clear();

  for (let i = 0; i < state.length; i++) {
    console.log(
      state[i]
        .map((x) => {
          if (isGuard(x)) {
            return chalk.bold(x);
          }
          if (x === "#") {
            return chalk.red(x);
          }
          if (x === ".") {
            return chalk.green(x);
          }
          return x;
        })
        .join("")
    );
  }
};

const findGuard = (state: string[][]) => {
  for (let i = 0; i < state.length; i++) {
    const line = state[i];
    for (let j = 0; j < line.length; j++) {
      if (isGuard(line[j])) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
};

const moveGuard = (state: string[][]) => {
  return true;
};

const runMoves = async () => {
  let moves = 0;
  let loops = 0;
  const allBoards: string[][][] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === ".") {
        lines[i][j] = "O";
        allBoards.push(JSON.parse(JSON.stringify(lines)) as string[][]);
        lines[i][j] = ".";
      }
    }
  }

  const loopBoards: string[][][] = [];

  console.log(`Searching for ${allBoards.length} guards`);
  let boardNUm = 0;
  for (const state of allBoards) {
    let [i, j] = findGuard(state);
    let loopCt = 0;
    // printBoard(state);

    console.log(`Running board ${boardNUm++} / ${allBoards.length}`);
    while (true) {
      if (i === -1) {
        console.log(chalk.red("Guard not found"));
        return;
      }

      const guard = state[i][j];
      const nextMove = moveIndexes[guard];
      const [nextI, nextJ] = [i + nextMove[0], j + nextMove[1]];
      if (state?.[nextI]?.[nextJ] === undefined) {
        console.log(chalk.red("Guard is out of bounds"));
        break;
      }

      if (state[nextI][nextJ] === "#" || state[nextI][nextJ] === "O") {
        state[i][j] = turnRight(guard);
        continue;
      }

      // console.log(
      //   chalk.green(`Guard moved from (${i}, ${j}) to (${nextI}, ${nextJ})`)
      // );
      state[nextI][nextJ] = guard;
      state[i][j] = "X";
      i = nextI;
      j = nextJ;

      loopCt++;
      if (loopCt > state.length * state[0].length) {
        loops++;
        console.log(chalk.red("Loop detected"));
        break;
      }
      // printBoard(state);
      // await setTimeout(100);
    }
  }

  // for (const state of loopBoards) {
  //   printBoard(state);
  //   await setTimeout(1000);
  // }

  console.log(chalk.green(`Total loops: ${loops}`));
  return countDistinct(lines);
};

const countDistinct = (state: string[][]) => {
  let count = 0;
  for (let i = 0; i < state.length; i++) {
    const line = state[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "X") {
        count++;
      }
    }
  }

  return count;
};

const result = runMoves().then(console.log);
