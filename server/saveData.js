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

exports.saveTxn = function(type, stockCode, quantity, price, longDate, remarks, update, txnId){
  var db = connection.openDbConnection();
  if(update){
    var statement = "UPDATE transactions SET txn_date = ?, price = ?,\
    quantity = ?, stock_code = ?, txn_type = ?, remarks = ? \
    WHERE txn_id = " + txnId;
  }else{
    var statement = "INSERT into transactions(txn_date, price, quantity, stock_code, txn_type, remarks) \
    VALUES (?,?,?,?,?,?)";
  }
  db.run(statement, [longDate, price, quantity, stockCode, type, remarks]);
  connection.closeDbConnection(db);
}
exports.checkIfCanSell = function(stockCode, quantity, longDate, isUpdate, txnId){
  var db = connection.openDbConnection();
  var statement = "SELECT sum(CASE WHEN txn_type == 'buy' THEN quantity ELSE 0 end) As bought,\
    sum(CASE WHEN txn_type == 'sell' THEN quantity ELSE 0 end) As sold from transactions where stock_code = ? AND txn_date <= ? ORDER BY txn_date";
  var canSellPromise = new Promise((resolve, reject) => {
    db.get(statement, [stockCode, longDate], function(err, res){
      if(err){
        reject(err);
      }else{
        console.log(res);
        console.log(res.bought >= (res.sold + quantity))

        if(isUpdate){
          //if update operation then get quantity of the existing transaction
          var statement = "SELECT quantity FROM transactions WHERE txn_id = ?";
          db.get(statement, [txnId], function(err, result){
            console.log(result);
            console.log(res.sold - result.quantity + quantity);
            console.log(res.sold);
            console.log(result.quantity);
            console.log(quantity);
            console.log(txnId);
            resolve(res.bought >= (res.sold - result.quantity + quantity));
          })
        }else{
          resolve(res.bought >= quantity + res.sold);
        }
      }
    });
  });
  connection.closeDbConnection(db);
  return canSellPromise;
}
function getLastFiscalYearTime(){
  let currentDate = new Date();
  if(currentDate.getMonth() < 3){
    //if month is < April then subtract 1 from the year
    currentDate.setYear(currentDate.getFullYear() - 1);
  }
  currentDate.setMonth(2);
  currentDate.setDate(31);
  return currentDate.getTime();
}
function getLastYear(longDate){
  let date = new Date(longDate);
  date.setFullYear(date.getFullYear() - 1);
  return date.getTime();
}
exports.getOpenings = async function(){
  var db = connection.openDbConnection();
  var statement = "SELECT txn_id as id, txn_type as transactionType, price, quantity, stock_code as stock, txn_date as date, remarks from transactions WHERE txn_type = 'buy' AND txn_date <= ?";
  var openings = await new Promise((resolve, reject) => {
    db.all(statement, [getLastFiscalYearTime()], function(err, res){
      if(err){
        reject(err);
      }else{
        resolve(res);
      }
    });
  });
  connection.closeDbConnection(db);
  return openings;
}
exports.getpurchases = async function(){
  var db = connection.openDbConnection();
  var statement = "SELECT txn_id as id, txn_type as transactionType, price, quantity, stock_code as stock, txn_date as date, remarks from transactions WHERE txn_type = 'buy' AND txn_date > ?";
  var purchases = await new Promise((resolve, reject) => {
    db.all(statement, [getLastFiscalYearTime()], function(err, res){
      if(err){
        reject(err);
      }else{
        resolve(res);
      }
    });
  });
  connection.closeDbConnection(db);
  return purchases;
}
exports.getSales = async function(){
  var db = connection.openDbConnection();
  var statement = "SELECT txn_id as id, txn_type as transactionType, price, quantity, stock_code as stock, txn_date as date, remarks from transactions WHERE txn_type = 'sell'";
  var sales = await new Promise((resolve, reject) => {
    db.all(statement, [], function(err, res){
      if(err){
        reject(err);
      }else{
        resolve(res);
      }
    });
  });
  connection.closeDbConnection(db);
  return sales;
}
function removeAndGetSpeculation(res){
  let topIndex = 0, it = 1, speculation = 0;
  //removing speculation from the transaction list;
  while(it < res.length){
    if(res[it].txn_type === 'buy'){
      //if its a purchase then move ahead;
      ++it;
    }else{
      //iterate until all the purchases are exhausted;
      while(it < res.length && topIndex < it && res[it].quantity > 0){
        //if both are same then its a speculation
        if(res[topIndex].txn_type === 'buy' && res[topIndex].txn_date === res[it].txn_date){
          //sell transaction is less than the purchased quantity
          if(res[topIndex].quantity > res[it].quantity){
            //calculating speculation
            let soldQuantity = res[it].quantity;
            speculation += soldQuantity*(res[it].price - res[topIndex].price);
            //removing speculated quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //increment the iterator since this sell txn is exhausted
            //no need to increment the topIndex since its not yet fully exhausted
            ++it;
          }else{
            let soldQuantity = res[topIndex].quantity;
            speculation += soldQuantity*(res[it].price - res[topIndex].price);
            //removing speculated quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //since topIndex is exhausted completely, need to increment the topIndex
            ++topIndex;
          }
        }else{
          ++topIndex;
        }
      }
      //done with this transaction
      ++it;
    }
  }
  return speculation;
}
function removeAndGetLTCG(res){
  console.log('lctg')
  console.log(res);
  let topIndex = 0, it = 1, ltcg = 0;
  //removing ltcg from the transaction list;
  while(it < res.length){
    if(res[it].txn_type === 'buy'){
      //if its a purchase then move ahead;
      it+=1;
    }else{
      //iterate until all the purchases are exhausted;
      console.log("iterator-->" + it);
      console.log(res[it].quantity);
      console.log('going into while')
      while(it < res.length && topIndex < it && res[it].quantity > 0){
        console.log(res[topIndex].txn_date);
        console.log('into while')
        //console.log(getLastFiscalYearTime());
        //if purchase
        if(res[topIndex].txn_type === 'buy' && res[topIndex].txn_date <= getLastYear(res[it].txn_date)){
          //sell transaction is less than the purchased quantity
          if(res[topIndex].quantity > res[it].quantity){
            //calculating ltcg
            let soldQuantity = res[it].quantity;
            ltcg += soldQuantity*(res[it].price - res[topIndex].price);
            //removing ltcg quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //increment the iterator since this sell txn is exhausted
            //no need to increment the topIndex since its not yet fully exhausted
            it+=1;
          }else{
            let soldQuantity = res[topIndex].quantity;
            ltcg += soldQuantity*(res[it].price - res[topIndex].price);
            //removing speculated quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //since topIndex is exhausted completely, need to increment the topIndex
            topIndex+=1;
          }
        }else{
          //not last year purchase, so moving on.
          ++topIndex;
        }
      }
      //done with this transaction
      it+=1;
    }
  }
  return ltcg;
}
function removeAndGetSTCG(res){
  console.log('sstcg')
  console.log(res);
  let topIndex = 0, it = 1, stcg = 0;
  //removing stcg from the transaction list;
  while(it < res.length){
    if(res[it].txn_type === 'buy'){
      //if its a purchase then move ahead;
      it+=1;
    }else{
      //iterate until all the purchases are exhausted;
      console.log("iterator-->" + it);
      console.log(res[it].quantity);
      console.log('going into while')
      while(it < res.length && topIndex < it && res[it].quantity > 0){
        console.log(res[topIndex].txn_date);
        console.log('into while')
        //console.log(getLastFiscalYearTime());
        //if purchase
        if(res[topIndex].txn_type === 'buy' && res[topIndex].txn_date > getLastYear(res[it].txn_date)){
          //sell transaction is less than the purchased quantity
          if(res[topIndex].quantity > res[it].quantity){
            //calculating stcg
            let soldQuantity = res[it].quantity;
            stcg += soldQuantity*(res[it].price - res[topIndex].price);
            //removing stcg quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //increment the iterator since this sell txn is exhausted
            //no need to increment the topIndex since its not yet fully exhausted
            it+=1;
          }else{
            let soldQuantity = res[topIndex].quantity;
            stcg += soldQuantity*(res[it].price - res[topIndex].price);
            //removing speculated quantity from both purchase and sell transactions
            res[it].quantity -= soldQuantity;
            res[topIndex].quantity -= soldQuantity;
            //since topIndex is exhausted completely, need to increment the topIndex
            topIndex+=1;
          }
        }else{
          //so moving on.
          ++topIndex;
        }
      }
      //done with this transaction
      it+=1;
    }
  }
  return stcg;
}
exports.getSummary = async function(){
  let db = connection.openDbConnection();
  let summary = await new Promise((resolve, reject) => {
      db.all("SELECT stock_code from transactions GROUP BY stock_code", function(err, res){
        console.log('here first');

          if(err){
            reject(err);
          }else{
            //Todo :: add condition for same year
            Promise.all(res.map(item => {
              console.log(item);
              return new Promise((resolve, reject) => {
                db.all("SELECT * from transactions WHERE stock_code = ? ORDER BY txn_date", [item.stock_code], (err, res) => {
                  if(err){
                    reject(err);
                  }else if(res.length > 0){
                    //res : list of transactions for a particular stock, sorted by transaction date;
                    console.log(res);
                    if(res[0].txn_type === 'sell'){
                      //if first transaction is sell, something is messed up!
                      reject(err);
                      return ;
                    }
                    var speculation = removeAndGetSpeculation(res);
                    var ltcg = removeAndGetLTCG(res)*0.9;
                    var stcg = removeAndGetSTCG(res)*0.85;
                    resolve({speculation, ltcg, stcg});
                  }
                });
              });
            })
          ).then((arr = {}) => {
            console.log(arr);
            var speculation = 0, ltcg = 0, stcg = 0;
            arr.forEach(item => {
              speculation += item.speculation;
              ltcg += item.ltcg;
              stcg += item.stcg;
            });
            resolve({speculation, ltcg, stcg});
          });
        }
    });
  });
  console.log("here");
  //resolve the promise object after everything is done;
  connection.closeDbConnection(db);
  return summary;
}
exports.deleteTransaction = function(txnId, callBack, errorCallBack){
  var db = connection.openDbConnection();
  var statement = "DELETE FROM transactions WHERE txn_id = ?";
  var deleted = true;
  db.run(statement, [txnId], function(err){
    if(err){
      errorCallBack.call();
    }
    callBack.call();
  });
  connection.closeDbConnection(db);
}
exports.removeAndGetSpeculation = removeAndGetSpeculation;
