const express = require('express');
const router = express.Router();

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
  console.log('Conexión exitosa a la base vista catalogo');
});

// Obtener la lista de catálogos con sus canciones
router.get('/catalogos', (req, res) => {
    const sql = 'SELECT * FROM catalogos';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener catálogos:', err);
            res.status(500).send('Error al obtener catálogos');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
