const path = require('path');
const connection = require('./db');

var exports = module.exports || {};

function createKey(stockName, date){
  return stockName+"_"+date;
}
function getAvgPrice(totalQuantity, totalAmount){
  return totalAmount/totalQuantity;
}
exports.createKey = createKey;
exports.getAvgPrice = getAvgPrice;

exports.saveTxn = function(type, stockCode, quantity, price, longDate){
  var db = connection.openDbConnection();
  var statement = "INSERT into transactions(txn_date, price, quantity, stock_code, txn_type) \
  VALUES (?,?,?,?,?)"
  db.run(statement, [longDate, price, quantity, stockCode, type]);
  connection.closeDbConnection(db);
}
exports.checkIfCanSell = function(stockCode, quantity){
  var db = connection.openDbConnection();
  db.all('SELECT * from transactions', function(err, res){
    console.log(res);
  })
  var statement = "SELECT txn_type, SUM(quantity) as total from transactions where stock_code = ? GROUP BY txn_type ORDER BY txn_type";
  var canSellPromise = new Promise((resolve, reject) => {
    db.all(statement, [stockCode], function(err, res){
      if(err){
        reject(err);
      }else{
        console.log(res);
        if(res.length === 0){
          resolve(false);
        }
        resolve(res.length === 1 || res[0].total >= quantity + res[1].total);
      }
    });
  })
  connection.closeDbConnection(db);
  return canSellPromise;
}
