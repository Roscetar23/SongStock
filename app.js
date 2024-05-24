const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const registroUsuario = require('./src/registroUsuario');
const inicioSesion = require('./src/InicioSesion');
const agregarCancion = require('./src/productosCanciones');
const obtenerCanciones = require('./src/tablaCanciones');
const { addToCart } = require("./src/carritoCompras");


const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

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

//---------------------------------------------------------------------------------------
// Agregar canción a la base de datos

app.post("/addSong", (req, res) => {
  const { songName, songPrice } = req.body;
  agregarCancion.agregarCancion(songName, songPrice, (err, result) => {
      if (err) {
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.redirect("/index");
  });
});
//---------------------------------------------------------------------------------------
// Agrega canciones al carrito 
app.post('/addToCart/:productId', (req, res) => {
  const productId = req.params.productId;

  // Aquí debes llamar a tu función addToCart pasando el productId
  addToCart(productId, (err, result) => {
      if (err) {
          res.status(500).send('Error interno del servidor');
          return;
      }
      res.redirect("/index");
  });
});
//-------------------------------------------------------------------------------------

app.get("/getCanciones", (req, res) => {
  obtenerCanciones.obtenerCanciones((err, canciones) => {
      if (err) {
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
      }
      res.json(canciones);
  });
});

//--------------------------------------------------------------------------------------
// Html 
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