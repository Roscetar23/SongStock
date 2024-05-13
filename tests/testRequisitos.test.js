const assert = require('assert');
const sinon = require('sinon');
const { registrarUsuario } = require('../src/registroUsuario');
const proyecto = require('../src/main.js');

describe('proyecto', () => {
    it('debería imprimir "Hola Mundo"', () => {
        // Redirigir la salida de la consola para poder verificarla
        const logSpy = sinon.spy(console, 'log');

        // Llamar a la función
        proyecto();

        // Verificar que se haya impreso 'Hola Mundo'
        assert.strictEqual(logSpy.getCall(0).args[0], 'Hola Mundo');

        // Restaurar la función original de console.log
        logSpy.restore();
    });
});

describe('registrarUsuario', () => {
    let connectionStub;

    beforeEach(() => {
        // Crear un stub para simular la conexión a la base de datos
        connectionStub = sinon.stub();
    });
    

    it('debería insertar un usuario en la base de datos correctamente', () => {
        // Configurar el stub para simular una conexión exitosa a la base de datos
        connectionStub.query = sinon.stub().callsArgWith(2, null, 'Resultado de inserción');

        // Llamar a la función de registro de usuario
        registrarUsuario('UsuarioPrueba', 'ContraseñaPrueba', 'correo@example.com', (err, result) => {
            // Verificar que la función de inserción en la base de datos fue llamada con los datos proporcionados
            sinon.assert.calledOnceWithExactly(connectionStub.query, 'INSERT INTO usuarios (nombreUsuario, contrasena, correoUsuario) VALUES (?, ?, ?)', ['UsuarioPrueba', 'ContraseñaPrueba', 'correo@example.com']);

            // Verificar que no haya ocurrido ningún error
            assert.strictEqual(err, null);

            // Verificar el resultado de la inserción
            assert.strictEqual(result, 'Resultado de inserción');
        });
    });

});
