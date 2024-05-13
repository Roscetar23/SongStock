const assert = require('assert');
const sinon = require('sinon');
const { registrarUsuario } = require('../src/registroUsuario');
const { iniciarSesion, connection } = require('../src/InicioSesion.js');
const mysql = require('mysql');


    //Test registro de usuario
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
// describe('registrarUsuario', () => {
//     let connectionStub;

//     beforeEach(() => {
//         // Crear un stub para simular la conexión a la base de datos
//         connectionStub = sinon.stub();
//     });
    

//     it('debería insertar un usuario en la base de datos correctamente', () => {
//         // Configurar el stub para simular una conexión exitosa a la base de datos
//         connectionStub.query = sinon.stub().callsArgWith(2, null, 'Resultado de inserción');

//         // Llamar a la función de registro de usuario
//         registrarUsuario('oscar2', '123', 'oscar@gmail.com', (err, result) => {
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

describe('Pruebas de inicio de sesión', () => {
    it('ingreso correctamente', (done) => {
      // Simula la conexión a la base de datos
      const fakeResult = [{ id: 28, nombreUsuario: 'oscar', contrasena: '123' }];
      const fakeQuery = sinon.fake.yields(null, fakeResult);
  
      // Espía la función connection.query y la reemplaza por la versión simulada
      sinon.replace(connection, 'query', fakeQuery);
  
      // Llama a la función de inicio de sesión
      iniciarSesion('usuario', 'contraseña', (err, result) => {
        // Verifica si hay un error
        assert.strictEqual(err, null);
        // Verifica si se recibió un resultado
        assert.notStrictEqual(result, null);
        // Verifica si el resultado contiene la información correcta del usuario
        assert.strictEqual(result[0].nombreUsuario, 'oscar');
        assert.strictEqual(result[0].contrasena, '123');
        done(); // Indica que la prueba ha terminado
      });
    });
  });
