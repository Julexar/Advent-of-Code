import fs from 'fs';

function readInput() {
  return fs.readFileSync('./2024/Day 1/input.txt', 'utf-8').replace(/\r\n/g, '\n').split('\n');
}

function solve() {
  const { list1, list2 } = readInput()
    .map(line => line.match(/\d+/g)?.map(Number))
    .reduce((acc, matchItem) => {
      if (!matchItem) throw new Error('Error while matching input numbers');

      const [num1, num2] = matchItem;
      acc.list1.push(num1);
      acc.list2.push(num2);

      return acc;
    }, { list1: [], list2: [] });
  
  const list1Sorted = list1.sort((a, b) => a - b);
  const list2Sorted = list2.sort((a, b) => a - b);

  const distances = list1Sorted.map((num1, index) => Math.abs(num1 - list2Sorted[index]));
  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0);

  const calcRepeat = list2Sorted.reduce((acc, num) => {
    if (list1Sorted.includes(num)) {
      acc[num] = (acc[num] ?? 0) + 1;
    }
    return acc;
  }, {});

  const similarScore = Object.entries(calcRepeat).reduce((acc, item) => {
    return acc + Number(item[0]) * item[1];
  }, 0);

  return { part1: totalDistance, part2: similarScore };
}

console.log(solve());