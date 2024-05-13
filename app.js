const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const registroUsuario = require('./src/registroUsuario');
const inicioSesion = require('./src/InicioSesion');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Metodo POST Registro
app.post("/registro", (req, res) => {
  const { nombreUsuario, contrasena, correoUsuario } = req.body;

  registroUsuario.registrarUsuario(nombreUsuario, contrasena, correoUsuario, (err, result) => {
    if (err) {
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.redirect("/");
  });
});


//Metodo POST inicio

app.post("/Inicio", (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
  
    
    inicioSesion.iniciarSesion(nombreUsuario, contrasena, (err, result) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
      
      
      if (result && result.length > 0) {
        // Redirigir al usuario a index.html si las credenciales son válidas
        res.redirect("/index");
      } else {
        // Redirigir al usuario de nuevo a la página de inicio de sesión si las credenciales no son válidas
        res.redirect("/inicioSesion");
      }
    });
  });

  // cierre de sesión 

  app.post("/cerrarSesion", (req, res) => {
    
    res.clearCookie("sessionId"); 
    
    
    res.redirect("/Home");
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "html", "Home.html"));
});

app.get("/:nombreArchivo", (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaArchivo = path.join(__dirname, "src", "html", `${nombreArchivo}.html`);
    res.sendFile(rutaArchivo);
});

const port = 3000;
app.listen(port, () => {
    console.log("Servidor iniciado en el puerto 3000");
});


// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");
// const { registrarUsuario } = require("./src/registroUsuario");

// const app = express();


// app.use(bodyParser.urlencoded({ extended: true }));


// app.post("/registroUsuario", (req, res) => {

//     const { nombreUsuario, contrasena, correoUsuario } = req.body;

//   registrarUsuario(nombreUsuario, contrasena, correoUsuario, (err, result) => {
//     if (err) {
//       res.status(500).send('Error interno del servidor');
//       return;
//     }
//     res.redirect("/");

// });

// // Servir el archivo HTML de inicio al abrir el servidor
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "src", "html", "inicio.html"));
// });

// // Servir cualquier archivo HTML de la carpeta src
// app.get("/:nombreArchivo", (req, res) => {
//     const nombreArchivo = req.params.nombreArchivo;
//     const rutaArchivo = path.join(__dirname, "src", "html", `${nombreArchivo}.html`);
//     res.sendFile(rutaArchivo);
// });

// app.listen(3000, () => {
//     console.log("Servidor iniciado en el puerto 3000");
// });
