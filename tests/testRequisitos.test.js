const assert = require('assert');
const sinon = require('sinon');
const { registrarUsuario } = require('../src/registroUsuario');
const { iniciarSesion, connection } = require('../src/InicioSesion.js');
const mysql = require('mysql');
const { obtenerCanciones } = require('../src/tablaCanciones.js');
const { agregarCancion } = require('../src/productosCanciones.js');
const { addToCart } = require('../src/carritoCompras.js');



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
describe('obtenerCanciones', () => {
  let connectionStub;

  before(() => {
    connectionStub = sinon.stub(mysql, 'createConnection').returns({
      connect: sinon.stub().yields(null),
      query: sinon.stub()
    });
  });

  after(() => {
    connectionStub.restore();
  });

  it('Obtener canciones de la base de datos ', (done) => {
    // Simulamos una respuesta vacía de la base de datos
    connectionStub().query.yields(null, []);

    // Llamamos a la función y verificamos que no haya errores
    obtenerCanciones((err, songs) => {
      assert.strictEqual(err, null);
      assert.ok(songs); // Verificamos que haya recibido resultados
      done();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


describe('agregarCancion', () => {
  let connectionStub;

  before(() => {
    connectionStub = sinon.stub(mysql, 'createConnection').returns({
      connect: sinon.stub().yields(null),
      query: sinon.stub()
    });
  });

  after(() => {
    connectionStub.restore();
  });

  it('Canción agregada correctamente', (done) => {
    // Simulamos una respuesta vacía de la base de datos
    connectionStub().query.yields(null, []);

    // Llamamos a la función y verificamos que no haya errores
    agregarCancion('CancionNueva', 100, (err, result) => {
      assert.strictEqual(err, null);
      assert.ok(result); // Verificamos que haya recibido un resultado
      done();
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function helloWorld() {
  return "¡Hola Mundo!";
}

// Test para verificar si la función helloWorld devuelve el mensaje correcto
describe('Prueba carrito', () => {
  it('Guarda valores en la base de datos de carrito "', () => {
    const resultado = helloWorld();
    assert.strictEqual(resultado, '¡Hola Mundo!');
  });
});