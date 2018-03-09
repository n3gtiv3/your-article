import HTTPRequest from "core/HTTPRequest";

class Transaction{
  constructor(){

  }
  saveTransaction(type, quantity, price, longDate, stockCode){
    return HTTPRequest.get('/saveTransaction', {
      type,
      price,
      quantity,
      stockCode,
      longDate
    })
  }
}
export default new Transaction();
