/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Example cash-in-drawer array:
[["PENNY", 1.01],
["NICKEL", 2.05],
["DIME", 3.10],
["QUARTER", 4.25],
["ONE", 90.00],
["FIVE", 55.00],
["TEN", 20.00],
["TWENTY", 60.00],
["ONE HUNDRED", 100.00]]

Here are some helpful links:
    Global Object
 */

var currencyMap = {
  "ONE HUNDRED": 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.5,
  PENNY: 0.01
};

function checkCashRegister(price, cash, cid) {
  var changeDue = cash - price;
  var isCashLeft = false;
  var currencyIndex = 0;
  var valueIndex = 1;
  var changeBack = [];
  var output;

  for (var i = cid.length - 1; i >= 0; i--) {
    var currency = cid[i][currencyIndex];
    var currencyValue = currencyMap[currency];
    var amountOfCurrency = cid[i][valueIndex];
    var changeInCurrency = 0;
    var isChangeDueDivisible = currencyValue <= changeDue;
    var isCurrencyAvailable = amountOfCurrency > 0;

    while (changeDue && isCurrencyAvailable && isChangeDueDivisible) {
      changeInCurrency += currencyValue;
      amountOfCurrency -= currencyValue;
      changeDue = roundToTenth(changeDue - currencyValue);

      isChangeDueDivisible = currencyValue <= changeDue;
      isCurrencyAvailable = amountOfCurrency > 0;
    }

    isCashLeft = isCashLeft || amountOfCurrency > 0;

    if (changeInCurrency) {
      changeBack.push([currency, changeInCurrency]);
    }
  }

  if (changeDue) {
    output = "Insufficient Funds";
  } else if (!isCashLeft) {
    output = "Closed";
  } else {
    output = changeBack;
  }

  return output;
}

function roundToTenth(value) {
  return Math.round(value * 100) / 100;
}

// Test

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.10],
//   ["QUARTER", 4.25],
//   ["ONE", 90.00],
//   ["FIVE", 55.00],
//   ["TEN", 20.00],
//   ["TWENTY", 60.00],
//   ["ONE HUNDRED", 100.00]
// ]); // should return an array.

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ]); // should return a string.

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 0.50],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ]); // should return a string.

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.10],
//   ["QUARTER", 4.25],
//   ["ONE", 90.00],
//   ["FIVE", 55.00],
//   ["TEN", 20.00],
//   ["TWENTY", 60.00],
//   ["ONE HUNDRED", 100.00]
// ]); // should return [["QUARTER", 0.50]].;

checkCashRegister(3.26, 100.0, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90.0],
  ["FIVE", 55.0],
  ["TEN", 20.0],
  ["TWENTY", 60.0],
  ["ONE HUNDRED", 100.0]
]); // should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ]); // should return "Insufficient Funds".

// checkCashRegister(19.50, 20.00, [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 1.00],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ]); // should return "Insufficient Funds".

checkCashRegister(19.5, 20.0, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]); // should return "Closed"
