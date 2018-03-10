import HTTPRequest from "core/HTTPRequest";

class Transaction{
  constructor(){

  }
  saveTransaction(type, quantity, price, longDate, stockCode, remarks){
      return HTTPRequest.get('/saveTransaction', {
        type,
        price,
        quantity,
        stockCode,
        longDate,
        remarks
      })
  }
  updateTransaction(type, quantity, price, longDate, stockCode,remarks, txnId){
      return HTTPRequest.get('/saveTransaction', {
        type,
        price,
        quantity,
        stockCode,
        longDate,
        remarks,
        update : true,
        txnId
      })
  }
  deleteTransaction(txnId){
    return HTTPRequest.get('/deleteTransaction', {txnId});
  }
  getSummary(){
    return HTTPRequest.get('/summary');
  }
  getOpenings(){
    return HTTPRequest.get('/openings');
  }
  getpurchases(){
    return HTTPRequest.get('/purchases');
  }
  getSales(){
    return HTTPRequest.get('/sales');
  }
}
export default new Transaction();
