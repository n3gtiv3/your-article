const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const errorMessages = require('./errorCode');
const {saveTxn, checkIfCanSell} = require('./saveData');
const db = require('./db');

app.use(express.static(path.join(__dirname, 'build')));

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
  let {type, stockCode, quantity, price, longDate} = query;
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
  if(type === "buy"){
    saveTxn(type, stockCode, quantity, price, longDate);
    res.send({
      code : 200,
      message : 'success'
    });
  }else if(type == "sell"){
    checkIfCanSell(stockCode, quantity).then(canSell => {
      console.log(canSell);
      if(canSell){
        saveTxn(type, stockCode, quantity, price, longDate);
        res.send({
          code : 200,
          message : 'success'
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/', 'index.html'));
});
//do some init db Operations
db.init();

app.listen(process.env.PORT || 8080);
