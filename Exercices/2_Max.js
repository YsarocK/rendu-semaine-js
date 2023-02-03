const a = 10;
const b = 20;
const c = 8;

const getMaxNumber = (a, b, c) => {
  if (a > b && a > c) {
    console.log('a is the max number', a);
  }
  if (b > a && b > c) {
    console.log('b is the max number', b);
  }
  if (c > a && c > b) {
    console.log('c is the max number', c);
  }
};

getMaxNumber(a, b, c);
