import fs from "fs";
import chalk from "chalk";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.split("\n").map((line) => line.split(""));

const antenaKeys: Record<string, Array<[number, number]>> = {};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char !== ".") {
      if (!antenaKeys[char]) {
        antenaKeys[char] = [];
      }
      antenaKeys[char].push([i, j]);
    }
  }
}

const processPair = (pair1: [number, number], pair2: [number, number]) => {
  const [i1, j1] = pair1;
  const [i2, j2] = pair2;

  const diffI = i2 - i1;
  const diffJ = j2 - j1;

  const antenna1I = i1 - diffI;
  const antenna1J = j1 - diffJ;

  const antenna2I = i2 + diffI;
  const antenna2J = j2 + diffJ;

  let additionalI = i2;
  let additionalJ = j2;

  while (additionalI >= 0 && additionalJ >= 0 && additionalI < lines.length && additionalJ < lines[0].length) {
    lines[additionalI][additionalJ] = chalk.red("#");

    additionalI += diffI;
    additionalJ += diffJ;
  }

  additionalI = i1;
  additionalJ = j1;

  while (additionalI >= 0 && additionalJ >= 0 && additionalI < lines.length && additionalJ < lines[0].length) {
    lines[additionalI][additionalJ] = chalk.red("#");

    additionalI -= diffI;
    additionalJ -= diffJ;
  }


  if (antenna1I >= 0 && antenna1J >= 0 && antenna1I < lines.length && antenna1J < lines[0].length) {
    lines[antenna1I][antenna1J] = chalk.red("#");
    antinodes++;
  }
  
  if (antenna2I >= 0 && antenna2J >= 0 && antenna2I < lines.length && antenna2J < lines[0].length) {
    lines[antenna2I][antenna2J] = chalk.red("#");
    antinodes++;
  }
}
let antinodes = 0;
for (const key in antenaKeys) {
  for (let i = 0; i < antenaKeys[key].length-1; i++) {
    const pair1 = antenaKeys[key][i];
    for (let j = i+1; j < antenaKeys[key].length; j++) {
      const pair2 = antenaKeys[key][j];
      processPair(pair1, pair2);
    }
  }
}

const sumHashes = lines.reduce((acc, line) => {
  return acc + line.filter((char) => char === chalk.red("#")).length;
}, 0);

console.log(sumHashes)


console.log(lines.map((line) => line.join("")).join("\n"));
console.log(lines.length)