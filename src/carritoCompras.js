const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyectoingeneria"
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la tabla carrito');
  });
  
  function addToCart(productId, callback) {
    connection.query('SELECT * FROM carrito WHERE producto_id = ?', productId, (err, rows) => {
      if (err) {
        console.error('Error al buscar producto en el carrito:', err);
        callback(err);
        return;
      }
  
      try {
        if (rows.length > 0) {
          const error = new Error('El producto ya está en el carrito');
          throw error;
        }
  
        const sql = 'INSERT INTO carrito (producto_id) VALUES (?)';
        connection.query(sql, [productId], (err, result) => {
          if (err) {
            console.error('Error al añadir producto al carrito:', err);
            callback(err);
            return;
          }
          console.log('Producto añadido al carrito correctamente');
          callback(null, result);
        });
      } catch (error) {
        console.error('Error al intentar añadir producto al carrito:', error.message);
        callback(error);
      }
    });
  }

  module.exports = {addToCart};