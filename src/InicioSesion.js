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
  console.log('Conexión exitosa a la base de inicio');
});

function iniciarSesion (nombreUsuario, contrasena, callback){
    const sql= 'SELECT * FROM usuarios WHERE nombreUsuario = ? AND contrasena = ?';
    connection.query(sql, [nombreUsuario, contrasena], (err, result) => {
        if (err){
            console.log('Error al buscar el usuario en la base de datos', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

module.exports = {iniciarSesion, connection};