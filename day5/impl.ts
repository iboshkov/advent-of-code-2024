import fs from "fs";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

const lines = input.split("\n");

const orderRules = lines.filter(x => x.indexOf("|") >= 0).map(x => x.split('|').map(x => parseInt(x))) as [number, number][];
const updates = lines.filter(x => x.indexOf(",") >= 0).map(x => x.split(',').map(x => parseInt(x)));

const isValid = (order: [number, number], update: number[]) => {
  // rule does not apply
  if (!order.every((x) => update.includes(x))) {
    // console.log(order, "Does not apply")
    return true;
  }

  const appearances = order.map((x) => update.indexOf(x)) as [number, number];

  const isValid = appearances[0] < appearances[1] && appearances.every((x) => x >= 0);
  
  // console.log(order, 'applies')
  return isValid;
};

const incorrect: number[][] = [];

let midSum = 0;
for (const update of updates) {
  let valid = orderRules.every((order) => isValid(order, update));
  if (valid) {
    const middle = update[Math.floor(update.length / 2)];
    midSum += middle;
  } else {
    incorrect.push(update);
  }
}

const correctOrderingForRule = (order: [number, number], update: number[]) => {
  const isRuleRelevant = order.every((x) => update.includes(x));
  if (!isRuleRelevant) {
    return update;
  }

  const appearances = order.map((x) => update.indexOf(x)) as [number, number];
  if (appearances[0] < appearances[1]) {
    return update;
  }

  // swap indices of items at appearances[0] and appearances[1]
  const newUpdate = [...update];
  console.log(newUpdate);
  console.log("Rule", order);
  console.log("Swapping", appearances[0], appearances[1]);
  console.log(`Before: ${newUpdate[appearances[0]]}, ${newUpdate[appearances[1]]}`);
  newUpdate[appearances[0]] = update[appearances[1]];
  newUpdate[appearances[1]] = update[appearances[0]];
  console.log(`After : ${newUpdate[appearances[0]]}, ${newUpdate[appearances[1]]}`);
  console.log(newUpdate)
  return newUpdate;
}

const correctOrdering = (update: number[]) => {
  let newOrder = update;
  for (const rule of orderRules) {
    newOrder = correctOrderingForRule(rule, newOrder);
  }
  return newOrder;
}

let correctedMidNum = 0;
for (const update of incorrect) {
  let correct = correctOrdering(update);
  while (!orderRules.every((order) => isValid(order, correct))) {
    correct = correctOrdering(correct);
  }
  console.log(correct[Math.floor(correct.length / 2)]);
  correctedMidNum += correct[Math.floor(correct.length / 2)];
  console.log(correct);correct[Math.floor(correct.length / 2)]
}

console.log(`Corrected Mid Sum: ${correctedMidNum}`);


console.log("Sum", midSum);