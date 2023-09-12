var maxProfit = function (prices) {
  let res = [];
  for (let i = 0; i < prices.length; i++) {
    let pricesofthatday = prices[i];
    for (let j = 0; j < prices.length; j++) {
      res.push(pricesofthatday - prices[j]);
    }
  }
  return Math.min(...res);
};

let arr = [7, 1, 5, 3, 6, 4];
let ans = maxProfit(arr);
console.log(ans);
