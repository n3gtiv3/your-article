var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var saveData = require('./saveData');

describe('check apeculation logic', function() {
  it('should return correct speculation and transaction array', function() {
    var res = [{txn_date:1, price:1, quantity:100, txn_type:'buy'}, {txn_date:1, price:2, quantity:100, txn_type:'buy'}, {txn_date:1, price:3, quantity:100, txn_type:'buy'}, {txn_date:1, price:2, quantity:100, txn_type:'sell'}];
    var speculation = saveData.removeAndGetSpeculation(res);
    var targetRes = [{txn_date:1, price:1, quantity:0, txn_type:'buy'}, {txn_date:1, price:2, quantity:100, txn_type:'buy'}, {txn_date:1, price:3, quantity:100, txn_type:'buy'}, {txn_date:1, price:2, quantity:0, txn_type:'sell'}];
    expect(speculation).to.equal(100);
    expect(res).to.deep.equal(targetRes);
  });
  // it('should return another correct speculation and transaction array', function() {
  //   var res = [{txn_date:1, price:1, quantity:100, txn_type:'buy'},
  //              {txn_date:1, price:1, quantity:100, txn_type:'buy'},
  //              {txn_date:1, price:1, quantity:100, txn_type:'buy'},
  //              {txn_date:1, price:1, quantity:100, txn_type:'buy'}
  //             ];
  //   var speculation = saveData.removeAndGetSpeculation(res);
  //   var targetRes = [{txn_date:1, price:1, quantity:0, txn_type:'buy'}, {txn_date:1, price:2, quantity:100, txn_type:'buy'}, {txn_date:1, price:3, quantity:100, txn_type:'buy'}, {txn_date:1, price:2, quantity:0, txn_type:'sell'}];
  //   expect(speculation).to.equal(100);
  //   expect(res).to.deep.equal(targetRes);
  // });
});
