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
  console.log('Conexión exitosa a la base catalogo');
});

function crearCatalogo(nombre, descripcion, callback) {
  const sql = 'INSERT INTO catalogos (nombre, descripcion) VALUES (?, ?)';
  connection.query(sql, [nombre, descripcion], (err, result) => {
    if (err) {
      console.log('Error al crear el catálogo en la base de datos', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

function agregarCancionCatalogo(cancion, catalogoId, callback) {
  const { titulo, artista, album, ano } = cancion;
  const sql = 'INSERT INTO canciones (titulo, artista, album, ano, catalogo_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [titulo, artista, album, ano, catalogoId], (err, result) => {
    if (err) {
      console.log('Error al agregar la canción en la base de datos', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

module.exports = { crearCatalogo, agregarCancionCatalogo, connection };
