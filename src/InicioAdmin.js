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

function iniciarSesionAdmin(nombreUsuario, contrasena, callback) {
  if (!nombreUsuario.includes('admin')) {
    callback(null, { success: false, message: "El nombre de usuario no contiene la palabra 'admin'" });
    return;
  }

  const sql = 'SELECT * FROM usuarios WHERE nombreUsuario = ? AND contrasena = ?';
  connection.query(sql, [nombreUsuario, contrasena], (err, result) => {
    if (err) {
      console.log('Error al buscar el usuario en la base de datos', err);
      callback(err, null);
      return;
    }
    if (result.length > 0) {
      callback(null, { success: true, message: "Inicio de sesión de administrador exitoso" });
    } else {
      callback(null, { success: false, message: "Usuario o contraseña incorrectos" });
    }
  });
}

module.exports = { iniciarSesionAdmin, connection };
