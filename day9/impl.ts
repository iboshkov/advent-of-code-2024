import fs from "fs";
import chalk from "chalk";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const line = input.trim().split("").map(x => parseInt(x));
console.log(line);

let id = 0;
const now = Date.now();
const newArray: number[] = [];

let i = 0;
while (i < line.length) {
  const blockSize = line[i++];
  const freeSpace = line[i++];

  for (let j = 0; j < blockSize; j++) {
    newArray.push(id);
  }
  for (let j = 0; j < freeSpace; j++) {
    newArray.push(-1);
  }
  id++;
}

let sorted = false;

while (!sorted) {
  const gap = newArray.indexOf(-1);
  const isSorted = newArray.slice(gap, newArray.length).every((x) => x === -1);
  if (isSorted) {
    break;
  }

  // console.log(newArray.map(x => (x === -1 ? chalk.red(".") : x)).join(""));
  for (let i = newArray.length-1; i > 0; i--) {
    if (newArray[i] !== -1) {
      // console.log(`${i} (${newArray[i]}) -> ${gap}`);
      newArray[gap] = newArray[i];
      newArray[i] = -1;
      break;
    }
  }

  // sorted = true;
}

let result = 0;
for (let i = 0; i < newArray.length; i++) {
  const item = newArray[i];
  if (item === -1) {
    break;
  }
  result += item * i;
}

console.log(result);
console.log(`Took ${Date.now() - now}ms`);
// console.log(newArray.map(x => (x === -1 ? chalk.red(".") : x)).join(""));
