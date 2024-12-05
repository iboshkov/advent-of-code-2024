import fs from "fs";
import "./input.txt";

const input = fs.readFileSync("input.txt", "utf-8");

type Letter = {
  letter: string;
  horizontal: boolean,
  vertical: boolean,
  diagonal: boolean,
  oppositeDiagonal: boolean,
  xmas: boolean,
};

const letters = input.trim().split('\n').map((line) => line.trim().split('').map(letter => ({
  letter,
  horizontal: false,
  vertical: false,
  diagonal: false,
  oppositeDiagonal: false,
  xmas: false,
})));

const sortOrder = {
  X: 0,
  M: 1,
  A: 2,
  S: 3,
};

const sortString = (a: string, b: string) => sortOrder[a] - sortOrder[b];

const sortChunk = (chunk: Letter[]) => [...chunk]//.sort((a, b) => sortString(a.letter, b.letter));
const actuallySortChunk = (chunk: Letter[]) => [...chunk].sort((a, b) => sortString(a.letter, b.letter));

const chunks: Letter[][] = [];

for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < letters[i].length - 3; j++) {
    const horizontalChunk = letters[i].slice(j, j + 4);
    const sorted = sortChunk(horizontalChunk);
    if (sorted.map(x=>x.letter).join('') === 'XMAS' || sorted.map(x=>x.letter).join('') === 'SAMX') {
      chunks.push(horizontalChunk);
      sorted.forEach((letter) => letter.horizontal = true);
    }
  }
}

for (let i = 0; i < letters.length - 3; i++) {
  for (let j = 0; j < letters[i].length; j++) {
    const verticalChunk = [letters[i][j], letters[i + 1][j], letters[i + 2][j], letters[i + 3][j]];
    const sorted = sortChunk(verticalChunk);
    if (sorted.map(x=>x.letter).join('') === 'XMAS' || sorted.map(x=>x.letter).join('') === 'SAMX') {
      chunks.push(sorted);
      sorted.forEach((letter) => letter.vertical = true);
    }
  }
}

for (let i = 0; i < letters.length - 3; i++) {
  for (let j = 0; j < letters[i].length - 3; j++) {
    const diagonalChunk = [letters[i][j], letters[i + 1][j + 1], letters[i + 2][j + 2], letters[i + 3][j + 3]];
    const sorted = sortChunk(diagonalChunk);
    if (sorted.map(x=>x.letter).join('') === 'XMAS' || sorted.map(x=>x.letter).join('') === 'SAMX') {
      chunks.push(sorted);
      sorted.forEach((letter) => letter.diagonal = true);
    }
  }
}

for (let i = 0; i < letters.length - 3; i++) {
  for (let j = 0; j < letters[i].length - 3; j++) {
    const oppositeDiagonalChunk = [letters[i][j + 3], letters[i + 1][j + 2], letters[i + 2][j + 1], letters[i + 3][j]];
    const sorted = sortChunk(oppositeDiagonalChunk);
    if (sorted.map(x=>x.letter).join('') === 'XMAS' || sorted.map(x=>x.letter).join('') === 'SAMX') {
      chunks.push(sorted);
      sorted.forEach((letter) => letter.oppositeDiagonal = true);
    }
  }
}

console.log(chunks.length);

const chunkToStr = (chunk: Letter[]) => chunk.map(x => x.letter).join('');
let xMases = 0;

for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < letters[i].length; j++) {
    /**
     * looking for
     * X . S
     * . A .
     * M . S
     */
    const letter = letters[i][j];
    const topLeft = letters[i - 1]?.[j - 1];
    const topRight = letters[i - 1]?.[j + 1];
    const bottomLeft = letters[i + 1]?.[j - 1];
    const bottomRight = letters[i + 1]?.[j + 1];
    const diagonal = [topLeft, letter, bottomRight].filter(x => x);
    const oppositeDiagonal = [topRight, letter, bottomLeft].filter(x => x);
    if (diagonal.length === 3 && oppositeDiagonal.length === 3) {
      const sortedDiagonal = sortChunk(diagonal);
      const sortedOpposite = sortChunk(oppositeDiagonal);
      const strDiagonal = chunkToStr(sortedDiagonal);
      const strOpposite = chunkToStr(sortedOpposite);
      if ((strDiagonal === 'MAS' || strDiagonal === 'SAM') && (strOpposite === 'MAS' || strOpposite === 'SAM')) {
        for (const letter of diagonal) {
          letter.xmas = true;
        }
        for (const letter of oppositeDiagonal) {
          letter.xmas = true;
        }
        console.log(`found at ${i},${j}`);
        xMases += 1;
        console.log(chunkToStr(sortedDiagonal));
        console.log(chunkToStr(sortedOpposite));
      }
    }
  }
  process.stdout.write('\n');
}

for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < letters[i].length; j++) {
    process.stdout.write(letters[i][j].xmas ? letters[i][j].letter : '.');
  }
  process.stdout.write('\n');
}

console.log(xMases)