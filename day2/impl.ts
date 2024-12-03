import fs from "fs";
import './input.txt';

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.trim().split("\n");

const safeReports: { report: number[], safe: boolean }[] = [];

const isSafe = (diff: number, increasing: boolean): boolean => {
  if (diff === 0) {
    return false;
  }
  const validIncreasing = increasing && (diff >= 1 && diff <= 3);
  const validDecreasing = !increasing && (diff <= -1 && diff >= -3);

  return validIncreasing || validDecreasing;
}

for (const line of lines) {
    const numbers = line.split(/\s+/).map((n) => parseInt(n, 10));
    let safe = true;
    let increasing: boolean | undefined = undefined;

    for (let i = 0; i < numbers.length - 1; i++) {
      const next = numbers[i + 1];
      
      const diff = next - numbers[i];

      if (diff > 0 && increasing === undefined) {
        increasing = true;
      }
      if (diff < 0 && increasing === undefined) {
        increasing = false;
      }

      if (!isSafe(diff, increasing!)) {
        safe = false;
        if (i === 1) {
          increasing = undefined;
          i = 1;
          continue;
        }
      }

      if (!safe && i < numbers.length - 2) {
        const diffNext = numbers[i + 2] - numbers[i];
        if (isSafe(diffNext, increasing!)) {
          safe = true;
          i += 2;
        } else {
          break;
        }
      }
    }
    safeReports.push({ report: numbers, safe });
}

console.log(safeReports.filter(x=> x.safe).length);