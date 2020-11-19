var mysql = require('mysql')
const util = require('util')
var pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'b7reamumtd4q6aqz3uvg-mysql.services.clever-cloud.com',
  user     : 'ubfnxtxz29ig7xld',
  password : 'wMPF8oTnDhEWEtzVbDcc',
  database : 'b7reamumtd4q6aqz3uvg'
});

pool.on('release', function (connection) {
  console.log('Connection %d released',
  connection.threadId);
});

pool.query = util.promisify(pool.query)

module.exports = {connection: pool}
