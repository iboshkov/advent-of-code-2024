// const input = "125 17";
const start = new Date();
const input = "77 515 6779622 6 91370 959685 0 9861";

const numbers = input.split(" ").map(Number);

const memo: { [key: number]: number[] } = {
  0: [1]
}

let counts: { [key: number]: number } = numbers.reduce((acc, num) => {
  acc[num] = 1;
  return acc;
}, {} as { [key: number]: number });

const setStateInMemo = (state: { [key: number]: number }, num: number, count = 1) => {
  if (state[num] > 0) {
    state[num] += count;
  } else {
    state[num] = count;
  }
}

console.clear();
const log = console.log;

for (let i = 0; i < 75; i++) {
  const newCounts: { [key: number]: number } = Object.assign({}, counts);
  // log(`Iteration ${i + 1}`);
  for (const key in counts) {
    const number = key as any as number;
    const count = counts[key];
    if (count === 0) {
      continue;
    }

    if (memo[number]) {
      newCounts[number] -= count;
      memo[number].forEach((num) => {
        setStateInMemo(newCounts, num, count);
      });
      continue
    }

    for (let j = 0; j < counts[key]; j++) {
      const strNum = number.toString();
      if (strNum.length % 2 === 0) {
        const middle = Math.floor(strNum.length / 2);
        const halfDigits = Number(strNum.substring(0, middle));
        const otherHalfDigits = strNum.substring(middle);
        const trimmedLeadingZeros = Number(otherHalfDigits.replace(/^0+/, ''));
        newCounts[number] -= 1;
        setStateInMemo(newCounts, halfDigits);
        setStateInMemo(newCounts, trimmedLeadingZeros);
        memo[number] = [halfDigits, trimmedLeadingZeros];
        continue;
      }
      memo[number] = [number * 2024];
      setStateInMemo(newCounts, number * 2024);
      newCounts[number] -= 1; 
    }
  }

  const sum = Object.keys(newCounts).reduce((acc, key) => acc + newCounts[key], 0);
  log(`Sum: ${sum}`);

  console.log(`Time: ${new Date().getTime() - start.getTime()}ms`);
  counts = newCounts;
}