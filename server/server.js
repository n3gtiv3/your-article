const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const errorMessages = require('./errorCode');
const {saveTxn, checkIfCanSell, getSummary, getOpenings, getpurchases, getSales, deleteTransaction} = require('./saveData');
const db = require('./db');

app.use(express.static(path.join(__dirname, '../build/')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});


function handleError(res, errorCode){
  res.status(500).send({
      code : errorCode,
      message : errorMessages[errorCode]
  })
}
app.get('/saveTransaction', function(req, res){
  const {query} = req;
  let {type, stockCode, quantity, price, longDate, update, txnId, remarks} = query;
  quantity = quantity - "";
  price = price - "";
  longDate = longDate - "";
  if(!type){
    handleError(res, 501);
    return ;
  }
  if(!stockCode){
    handleError(res, 502);
    return ;
  }
  if(!price || isNaN(price)){
    handleError(res, 504);
    return ;
  }
  if(!quantity || isNaN(quantity)){
    handleError(res, 506);
    return ;
  }
  if(!longDate || isNaN(longDate)){
    handleError(res, 503);
    return ;
  }
  if(update && !txnId){
    handleError(res, 702);
    return ;
  }
  let message = "";
  if(update){
    message = "Transaction updated successfully for " + stockCode;
  }else{
    message = "Transaction added successfully for " + stockCode;
  }
  if(type === "buy"){
    saveTxn(type, stockCode, quantity, price, longDate,remarks, update, txnId);

    res.send({
      code : 200,
      message
    });
  }else if(type == "sell"){
    checkIfCanSell(stockCode, quantity, longDate, update, txnId).then(canSell => {
      console.log(canSell);
      if(canSell){
        saveTxn(type, stockCode, quantity, price, longDate,remarks, update, txnId);
        res.send({
          code : 200,
          message
        });
      }else{
        handleError(res, 601);
      }
    }, err => {
      console.error(err);
    });
  }else{
    handleError(res, 505);
  }

});
app.get('/summary', async function(req, res){
  try{
    const response = await getSummary();
    res.send(response);
  }catch(e){
    res.status(500).send("something went wrong!!");
  }
});
app.get('/openings', async function(req, res){
  try{
    const response = await getOpenings();
    res.send({
      openings : response
    });
  }catch(e){
    res.status(500).send("something went wrong!!");
  }
});
app.get('/purchases', async function(req, res){
  try{
    const response = await getpurchases();
    res.send({
      purchases : response
    });
  }catch(e){
    res.status(500).send("something went wrong!!");
  }
});
app.get('/sales', async function(req, res){
  try{
    const response = await getSales();
    res.send({
      sales : response
    });
  }catch(e){
    res.status(500).send("something went wrong!!");
  }
});
app.get('/deleteTransaction', async function(req, res){
  try{
    const {query} = req;
    let {txnId} = query;
    txnId = txnId - "";
    if(!txnId){
      handleError(res, 701);
      return ;
    }
    deleteTransaction(txnId, ()=>{
      res.send({
        code : 200,
        message : "Transaction successfully deleted"
      });
    }, ()=>{handleError(res, 701)});

  }catch(e){
    handleError(res, 701);
  }
});
app.get(['/','/opening','/sale','/purchase'], function (req, res) {
  res.sendFile(path.join(__dirname, '../build/', 'index.html'));
});
//do some init db Operations
db.init();

app.listen(8080);
