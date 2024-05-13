
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
  console.log('Conexión exitosa a la base de datos');
});

function registrarUsuario(nombreUsuario, contrasena, correoUsuario, callback) {
  const sql = 'INSERT INTO usuarios (nombreUsuario, contrasena, correoUsuario) VALUES (?, ?, ?)';
  connection.query(sql, [nombreUsuario, contrasena, correoUsuario], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario en la base de datos:', err);
      callback(err);
      return;
    }
    console.log('Usuario registrado correctamente');
    callback(null, result);
  });
}

module.exports = { registrarUsuario };

