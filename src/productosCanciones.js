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
  console.log('Conexión exitosa a la tabla productos canciones');
});

function agregarCancion(nombreCancion, precio, callback) {
    // verificar si la cancion ya existe
    connection.query('SELECT * FROM productos WHERE nombre = ?', nombreCancion, (err, rows) => {
      if (err) {
        console.error('Error al buscar canción en la base de datos:', err);
        callback(err);
        return;
      }
  
      try {
        if (rows.length > 0) {
          const error = new Error('La canción ya existe');
          throw error;
        }
  
        // si no hay canciones con el mismo nombre, inserta la nueva cancion
        const sql = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';
        connection.query(sql, [nombreCancion, precio], (err, result) => {
          if (err) {
            console.error('Error al insertar canción en la base de datos:', err);
            callback(err);
            return;
          }
          console.log('Canción agregada correctamente');
          callback(null, result);
        });
      } catch (error) {
        console.error('Error al intentar agregar canción:', error.message);
        callback(error);
      }
    });
}

module.exports = { agregarCancion};









