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
