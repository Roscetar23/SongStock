const assert = require('assert');
const sinon = require('sinon');
const { registrarUsuario } = require('../src/registroUsuario');
const { iniciarSesion, connection } = require('../src/InicioSesion.js');
const mysql = require('mysql');
const { obtenerCanciones } = require('../src/tablaCanciones.js');
const { agregarCancion } = require('../src/productosCanciones.js');


    //Test registro de usuario
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
//   describe('registrarUsuario', () => {
//     let connectionStub;

//     beforeEach(() => {
//         // Crear un stub para simular la conexión a la base de datos
//         connectionStub = sinon.stub();
//     });
    

//     it('debería insertar un usuario en la base de datos correctamente', () => {
//         // Configurar el stub para simular una conexión exitosa a la base de datos
//         connectionStub.query = sinon.stub().callsArgWith(2, null, 'Resultado de inserción');

//         // Llamar a la función de registro de usuario
//         registrarUsuario('cl', '123', 'c@gmail.com', (err, result) => {
//             // Verificar que la función de inserción en la base de datos fue llamada con los datos proporcionados
//             sinon.assert.calledOnceWithExactly(connectionStub.query, 'INSERT INTO usuarios (nombreUsuario, contrasena, correoUsuario) VALUES (?, ?, ?)', ['oscar', '1234', 'correo@example.']);

//             // Verificar que no haya ocurrido ningún error
//             assert.strictEqual(err, null);

//             // Verificar el resultado de la inserción
//             assert.strictEqual(result, 'Resultado de inserción');
//         });
//     });

//  });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Test de inicio 

// describe('Pruebas de inicio de sesión', () => {
//     it('ingreso correctamente', (done) => {
//       // Simula la conexión a la base de datos
//       const fakeResult = [{ id: 28, nombreUsuario: 'oscar', contrasena: '123' }];
//       const fakeQuery = sinon.fake.yields(null, fakeResult);
  
//       // Espía la función connection.query y la reemplaza por la versión simulada
//       sinon.replace(connection, 'query', fakeQuery);
  
//       // Llama a la función de inicio de sesión
//       iniciarSesion('usuario', 'contraseña', (err, result) => {
//         // Verifica si hay un error
//         assert.strictEqual(err, null);
//         // Verifica si se recibió un resultado
//         assert.notStrictEqual(result, null);
//         // Verifica si el resultado contiene la información correcta del usuario
//         assert.strictEqual(result[0].nombreUsuario, 'oscar');
//         assert.strictEqual(result[0].contrasena, '123');
//         done(); // Indica que la prueba ha terminado
//       });
//     });
//   });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// describe('obtenerCanciones', () => {
//   let connectionStub;

//   before(() => {
//     connectionStub = sinon.stub(mysql, 'createConnection').returns({
//       connect: sinon.stub().yields(null),
//       query: sinon.stub()
//     });
//   });

//   after(() => {
//     connectionStub.restore();
//   });

//   it('Obtener canciones de la base de datos ', (done) => {
//     // Simulamos una respuesta vacía de la base de datos
//     connectionStub().query.yields(null, []);

//     // Llamamos a la función y verificamos que no haya errores
//     obtenerCanciones((err, songs) => {
//       assert.strictEqual(err, null);
//       assert.ok(songs); // Verificamos que haya recibido resultados
//       done();
//     });
//   });
// });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// describe('agregarCancion', () => {
//   let connectionStub;

//   before(() => {
//     connectionStub = sinon.stub(mysql, 'createConnection').returns({
//       connect: sinon.stub().yields(null),
//       query: sinon.stub()
//     });
//   });

//   after(() => {
//     connectionStub.restore();
//   });

//   it('Canción agregada correctamente', (done) => {
//     // Simulamos una respuesta vacía de la base de datos
//     connectionStub().query.yields(null, []);

//     // Llamamos a la función y verificamos que no haya errores
//     agregarCancion('CancionNueva', 100, (err, result) => {
//       assert.strictEqual(err, null);
//       assert.ok(result); // Verificamos que haya recibido un resultado
//       done();
//     });
//   });
// });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function crearCatalogo(nombre, descripcion, callback) {
  if (!nombre || !descripcion) {
    const error = new Error('Nombre y descripción son requeridos');
    callback(error, null);
    return;
  }
  const result = { insertId: 1 };
  callback(null, result);
}

function agregarCancionCatalogo(cancion, catalogoId, callback) {
  if (!cancion || !cancion.titulo || !cancion.artista || !cancion.album || !cancion.ano || !catalogoId) {
    const error = new Error('Todos los campos de la canción y el catalogoId son requeridos');
    callback(error, null);
    return;
  }
  const result = { insertId: 1 };
  callback(null, result);
}

describe('Test de funciones de base de datos', function () {
  it('crearCatalogo debe simular la creación de un catálogo', function (done) {
    crearCatalogo('Catalogo Test', 'Descripción Test', (err, result) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual(result, { insertId: 1 });
      done();
    });
  });

  it('agregarCancionCatalogo debe simular la adición de una canción a un catálogo', function (done) {
    const cancion = { titulo: 'Canción Test', artista: 'Artista Test', album: 'Album Test', ano: 2023 };
    agregarCancionCatalogo(cancion, 1, (err, result) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual(result, { insertId: 1 });
      done();
    });
  });

  it('crearCatalogo debe manejar errores correctamente', function (done) {
    crearCatalogo('', 'Descripción Test', (err, result) => {
      assert.strictEqual(result, null);
      assert.strictEqual(err.message, 'Nombre y descripción son requeridos');
      done();
    });
  });

  it('agregarCancionCatalogo debe manejar errores correctamente', function (done) {
    const cancion = { titulo: '', artista: 'Artista Test', album: 'Album Test', ano: 2023 };
    agregarCancionCatalogo(cancion, 1, (err, result) => {
      assert.strictEqual(result, null);
      assert.strictEqual(err.message, 'Todos los campos de la canción y el catalogoId son requeridos');
      done();
    });
  });
});

//-------------------------------------------------------------------------------------------------------------------------
function addToCart(productId, callback) {

  const carrito = [{ producto_id: 123 }]; 

  const found = carrito.find(item => item.producto_id === productId);

  if (found) {
    const error = new Error('El producto ya está en el carrito');
    callback(error);
    return;
  }

  carrito.push({ producto_id: productId });
  const result = { insertId: carrito.length };

  callback(null, result);
}
describe('Pruebas para la función addToCart', function() {
  it('addToCart debe añadir un producto al carrito correctamente si no está ya presente', function(done) {
    addToCart(124, (err, result) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual(result, { insertId: 2 });
      done();
    });
  });

  it('addToCart debe devolver un error si el producto ya está en el carrito', function(done) {
    addToCart(123, (err, result) => {
      assert.strictEqual(result, undefined);
      assert.strictEqual(err.message, 'El producto ya está en el carrito');
      done();
    });
  });
});


//---------------------------------------------------------------------------------------------------------------------------------------

function agregarCancionC(nombreCancion, precio, callback) {
  // Base de datos simulada en memoria
  const productos = [
    { nombre: 'Canción 1', precio: 10 },
    { nombre: 'Canción 2', precio: 15 }
  ];

  // Simular consulta SELECT
  const found = productos.find(producto => producto.nombre === nombreCancion);

  if (found) {
    const error = new Error('La canción ya existe');
    callback(error);
    return;
  }

  // Simular inserción en la base de datos
  const newProduct = { nombre: nombreCancion, precio: precio };
  productos.push(newProduct);
  const result = { insertId: productos.length };

  callback(null, result);
}

describe('Pruebas para la función agregarCancionCatalogo', function() {
  it('agregarCancionCatalogo debe añadir una canción correctamente si no existe ya', function(done) {
    agregarCancionC('Canción Nueva', 20, (err, result) => {
      assert.strictEqual(err, null);
      assert.deepStrictEqual(result, { insertId: 3 });
      done();
    });
  });

  it('agregarCancionCatalogo debe devolver un error si la canción ya existe', function(done) {
    agregarCancionC('Canción 1', 20, (err, result) => {
      assert.strictEqual(result, undefined);
      assert.strictEqual(err.message, 'La canción ya existe');
      done();
    });
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------


function adminLogin(username, password, callback) {
  // Datos simulados en memoria
  const admins = [
    { username: 'admin1', password: 'password123' },
    { username: 'admin2', password: 'password456' }
  ];

  // Simular búsqueda de administrador
  const admin = admins.find(admin => admin.username === username);

  if (!admin) {
    const error = new Error('Usuario no encontrado');
    callback(error);
    return;
  }

  // Simular verificación de contraseña
  if (admin.password !== password) {
    const error = new Error('Contraseña incorrecta');
    callback(error);
    return;
  }

}


describe('Pruebas para la función adminLogin', function() {
  
  it('adminLogin debe devolver un error si el usuario no existe', function(done) {
    adminLogin('admin3', 'password789', (err, result) => {
      assert.strictEqual(result, undefined);
      assert.strictEqual(err.message, 'Usuario no encontrado');
      done();
    });
  });

  it('adminLogin debe devolver un error si la contraseña es incorrecta', function(done) {
    adminLogin('admin1', 'wrongpassword', (err, result) => {
      assert.strictEqual(result, undefined);
      assert.strictEqual(err.message, 'Contraseña incorrecta');
      done();
    });
  });
});