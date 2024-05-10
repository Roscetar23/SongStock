const assert = require('assert');
const sinon = require('sinon');
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
        // Aquí realizas tu prueba
        // const resultado = miFuncion(argumento);
        // expect(resultado).to.equal(resultadoEsperado);
 