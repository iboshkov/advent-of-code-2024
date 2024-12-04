import fs from "fs";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const countMuls = (incoming: string) => {
  const regex = /mul\((\d+)\,(\d+)\)/gm;
  const matches = incoming.matchAll(regex);

  let sum = 0;
  for (const match of matches) {
    const [_, a, b] = match;
    const [parsedA, parsedB] = [parseInt(a, 10), parseInt(b, 10)];
    const res = parsedA * parsedB;
    // console.log(`mul(${parsedA},${parsedB}) = ${res}`);
    sum += res;
  }
  return sum;
};

const findEnabledMults = (incoming: string) => {
  const regex = /(don\'t)|(do)/gm;
  const matches = Array.from(incoming.matchAll(regex));

  let [start, end] = [0, 0];
  let started = true;
  const enabledRanges: any[] = [];
  for (const match of matches) {
    if (!started && match[0] === "do") {
      start = match.index;
      started = true;
    }
    if (started && match[0] === "don't") {
      end = match.index;
      started = false;
      enabledRanges.push([start, end]);
    }
  }
  if (started) {
    enabledRanges.push([start, incoming.length]);
  }

  // console.log(enabledRanges);
  // const mapped = enabledRanges.map(([start, end]) => `[${start},${end}]: ${incoming.substring(start, end)}`);
  // console.log(mapped.join('\n'));
  return enabledRanges.map(([start, end]) => incoming.substring(start, end));
};

const sum = countMuls(input);
console.log(`sum: ${sum}`);

const enabled = findEnabledMults(input);
const str = enabled.join("");
const sumEnabled = countMuls(str);
console.log(`sumEnabled: ${sumEnabled}`);