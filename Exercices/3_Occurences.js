const results = {};
const data = [
  1, 1, 2, 3, 4, 8, 8, 5, 6, 6, 9, 9, 10, 11, 12, 14, 48, 48, 51, 51, 1, 1, 1,
  51, 3, 3, 3, 51, 51, 51, 51, 51, 0,
];

const main = (data) => {
  data.map((item) => {
    if (results[item]) {
      results[item] += 1;
    } else {
      results[item] = 1;
    }
  });
};

main(data);

console.log(results);
