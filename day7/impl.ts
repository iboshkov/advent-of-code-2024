import fs from "fs";
import chalk from "chalk";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.split("\n");

const evaluate = (items: (string | number)[]) => {
  let result: number = items[0] as number;
  for (let i = 1; i < items.length; i++) {
    const nextItem = items[i + 1] as number;
    if (items[i] === "||") {
      result = Number(`${result}${nextItem}`);
    } else if (items[i] === "+") {
      result += nextItem;
    } else if (items[i] === "*") {
      result *= nextItem;
    }
  }

  return result;

}

const isValid = (args: number[], expectedResult: number): boolean => {
  const operators = ["+", "*", '||'];
  
  for (let i = 0; i < operators.length ** (args.length-1); i++) {
    const binary = i.toString(operators.length).padStart(args.length - 1, "0");
    const variation = args[0] + binary
      .split("")
      .map((bit, index) => " " + operators[Number(bit)] + " " + args[index + 1])
      .join("");

    const items = variation.split(" ").map((item) => isNaN(Number(item)) ? item : Number(item));

    const result = evaluate(items);

    if (result === expectedResult) {
      // console.log(chalk.green(variation) + " =",chalk.green(result));
      return true;
    }
  }

  return false;
}

let sum = 0;
for (const line of lines) {
  const [result, args] = line.split(": ");
  const numbers = args.split(" ").map(Number);

  if (isValid(numbers, Number(result))) {
    sum += Number(result);
  }
}

console.log(sum);