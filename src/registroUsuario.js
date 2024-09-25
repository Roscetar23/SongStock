
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
  console.log('Conexión exitosa a la base de registro');
});

function registrarUsuario(nombreUsuario, contrasena, correoUsuario, callback) {
    // verificar si el correo ya esta en uso
    connection.query('SELECT * FROM usuarios WHERE correoUsuario = ?', correoUsuario, (err, rows) => {
      if (err) {
        console.error('Error al buscar usuario en la base de datos:', err);
        callback(err);
        return;
      }
  
      try {
        // si ya hay un usuario con el mismo correo, devuelve un error
        if (rows.length > 0) {
          const error = new Error('El correo electrónico ya está registrado');
          throw error;
        }
  
        // si no hay usuarios con el mismo correo, inserta el nuevo usuario
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
      } catch (error) {
        console.error('Error al intentar registrar usuario:', error.message);
        callback(error);
      }
    });
  }
  
  

module.exports = { registrarUsuario };

