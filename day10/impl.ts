import fs from "fs";
import chalk from "chalk";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const heads: [number, number][] = [];

const lines = input
  .trim()
  .split("\n")
  .map((x, i) =>
    x.split("").map((y, j) => {
      if (y === ".") {
        return -1;
      } 
      const parsed = parseInt(y);
    

      if (parsed === 0) {
        heads.push([i, j]);
      }

      return parsed;
    })
  );

const findAllPaths = (
    lines: number[][],
    startI: number,
    startJ: number,
    targetNumber: number,
    ignoreVisited = false
  ): number[][][] => {
    const rows = lines.length;
    const cols = lines[0].length;
  
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
  
    const isValid = (i: number, j: number): boolean =>
      i >= 0 && i < rows && j >= 0 && j < cols;
  
    const paths: number[][][] = [];
    const queue: { position: [number, number]; path: number[][] }[] = [];
  
    queue.push({ position: [startI, startJ], path: [[startI, startJ]] });
  
    const visited: Set<string> = new Set();
  
    while (queue.length > 0) {
      const { position, path } = queue.shift()!;
      const [i, j] = position;
  
      const key = `${i},${j}`;
  
      if (ignoreVisited && visited.has(key)) {
        continue;
      }

      visited.add(key);
  
      if (lines[i][j] === targetNumber) {
        paths.push([...path]);
      }
  
      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        if (
          isValid(ni, nj) &&
          !path.some(([pi, pj]) => pi === ni && pj === nj)
        ) {
          const neighbourValue = lines[ni][nj];
          const heightDiff = neighbourValue - lines[i][j];
          if (neighbourValue !== -1 && heightDiff === 1) {
            queue.push({ position: [ni, nj], path: [...path, [ni, nj]] });
          }
        }
      }
    }
  
    return paths;
};
  

const highlightPath = (path: number[][]) => {
  const newLines: string[][] = lines.map((x) => x.map((y) => y >= 0 ? y.toString() : "."));
  for (const [i, j] of path) {
    newLines[i][j] = chalk.red(newLines[i][j]);
  }

  for (const line of newLines) {
    console.log(line.join(""));
  }

  return newLines;
};

let sum = 0;


const part1 = false;

for (const head of heads) {
    const paths = findAllPaths(lines, head[0], head[1], 9, part1);
    sum += paths.length;
    // for (const path of paths) {
    //     highlightPath(path);
    // }
}

console.log(sum);
console.log("Done");