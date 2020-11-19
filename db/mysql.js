const mysql      = require('mysql');
//este de abajo es la bd de pruebas
const connection = mysql.createConnection({
  host     : 'b7reamumtd4q6aqz3uvg-mysql.services.clever-cloud.com',
  user     : 'ubfnxtxz29ig7xld',
  password : 'wMPF8oTnDhEWEtzVbDcc',
  database : 'b7reamumtd4q6aqz3uvg'
});


//este de abajo es la base de datos de ejrson
/*const connection = mysql.createConnection({
  host     : 'bgwnlflev2g5vo80asja-mysql.services.clever-cloud.com',
  user     : 'uqqm9uvyvmbyc2vs',
  password : 'AKLMiuj7auE5aGQ1OsXh',
  database : 'bgwnlflev2g5vo80asja'
});*/

connection.connect((error) => {
    if(error){
      console.log(`Error en conexión a base de datos: ${error}`)
      return;
    }else{
      console.log("Conexión extablecida con el servidor de MySQL")
    }
});

module.exports =  {connection: connection}