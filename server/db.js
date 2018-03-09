const sqlite3 = require('sqlite3').verbose();
const path = require('path');

var exports = module.exports || {};

function openDbConnection(){
    const dbPath = path.resolve(__dirname, "./article.db");
    let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the database');
    }
  });
  return db;
}
function closeDbConnection(db){
    db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
exports.init = function(){
  var db = openDbConnection();
  db.run("CREATE TABLE IF NOT EXISTS 'transactions' "
  +  "('txn_id' INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL  UNIQUE,"
  + "'txn_date' DATETIME DEFAULT CURRENT_TIMESTAMP,"
  + "'price' INTEGER,"
  + "'quantity' INTEGER,"
  + "'stock_code' TEXT,"
  + "'txn_type' TEXT)");
  closeDbConnection(db);
}
exports.openDbConnection = openDbConnection;
exports.closeDbConnection = closeDbConnection;
