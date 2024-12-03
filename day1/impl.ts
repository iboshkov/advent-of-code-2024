import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.trim().split("\n");
const leftArr: number[] = [];
const rightArr: number[] = [];

lines.forEach((line) => {
  const [l, r] = line.split(/\s+/).map((n) => parseInt(n, 10));
  leftArr.push(l);
  rightArr.push(r);
});

leftArr.sort();
rightArr.sort();
const distances = leftArr.reduce(
  (prev, _, i) => prev + Math.abs(leftArr[i] - rightArr[i]),
  0
);

const similarities = leftArr.map((x) => x * rightArr.filter((y) => x === y).length);
const similaritySum = similarities.reduce((prev, curr) => prev + curr, 0);

console.log(distances);
console.log(similarities);
console.log(similaritySum);
