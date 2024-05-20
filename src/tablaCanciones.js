const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectoingeneria"
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la tabla vista canciones ');
});


function obtenerCanciones(callback) {
    connection.query('SELECT * FROM productos', (err, rows) => {
        if (err) {
            console.error('Error al obtener canciones de la base de datos:', err);
            callback(err);
            return;
        }
        callback(null, rows);
    });
  }
  
  module.exports = {obtenerCanciones };
  