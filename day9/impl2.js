import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8");
const line = input.trim().split("").map(x => parseInt(x));
let id = 0;
const now = Date.now();
const newArray = [];
let i = 0;
const ids = [];
const freeSpaces = [];
while (i < line.length) {
    const blockSize = line[i++];
    const freeSpace = line[i++];
    ids.push({ id, size: blockSize, index: newArray.length });
    for (let j = 0; j < blockSize; j++) {
        newArray.push(id);
    }
    if (freeSpace > 0) {
        freeSpaces.push({ index: newArray.length, size: freeSpace });
    }
    for (let j = 0; j < freeSpace; j++) {
        newArray.push(-1);
    }
    id++;
}
// console.log(idsconsole.log(line);
// console.log(newArray.map(x => (x === -1 ? chalk.red(".") : x)).join(""));
for (let i = ids.length - 1; i >= 0; i--) {
    const { id, size, index } = ids[i];
    const slice = newArray.slice(index, index + size);
    const freeSpace = freeSpaces.find(x => x.size >= slice.length && x.index < index);
    if (freeSpace && index > 0) {
        // console.log(freeSpaces)
        // console.log(`Trying to move ${id} to ${freeSpace?.index}`);
        newArray.splice(freeSpace.index, slice.length, ...slice);
        freeSpace.size -= slice.length;
        freeSpace.index += slice.length;
        newArray.splice(index, size, ...Array(size).fill(-1));
        // console.log(`Moving ${id} to ${freeSpace.index}`);
        // console.log(newArray.map(x => (x === -1 ? chalk.red(".") : x)).join(""));
    }
}
let result = 0;
for (let i = 0; i < newArray.length; i++) {
    const item = newArray[i];
    if (item === -1) {
        continue;
    }
    result += item * i;
}
console.log(`Took ${Date.now() - now}ms`);
// console.log(freeSpaces);
// console.log(newArray.map(x => (x === -1 ? chalk.red(".") : x)).join(""));
console.log(result);
