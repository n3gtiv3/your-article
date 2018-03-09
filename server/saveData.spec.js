var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var saveData = require('./saveData');

describe('saveData', function() {
  it('should check return correct key', function() {
    const stock = "sbi";
    const date = 12345;
    expect(saveData.createKey(stock, date)).to.equal(stock+"_"+date);
  });
});
