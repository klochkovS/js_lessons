const head = {
  glasses: 1,
};

const table = {
  pen: 3,
  __proto__: head,
};

const bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

const pockets = {
  money: 2000,
  __proto__: bed,
};


console.log(pockets.glasses);
console.log(head.glasses);

let startTime = (Date.now());
console.log(pockets.glasses);
const firstResult = Date.now() - startTime;

startTime = (Date.now());
console.log(head.glasses);
const secondResult = Date.now() - startTime;

console.log(firstResult, secondResult);

