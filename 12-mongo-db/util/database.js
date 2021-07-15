const { MongoClient } = require('mongodb');

let _db;

const password = "FILL ME"

const mongoConnect = callback => {
  const uri = "mongodb+srv://admin:"+password+"@jorgemaincluster.ts7ww.mongodb.net/shop?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log('Connected!');
    _db = client.db();
    callback();
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
