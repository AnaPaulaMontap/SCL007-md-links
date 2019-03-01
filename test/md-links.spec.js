'use strict';

const mdLinks = require('../index.js').mdlinks;
const helpers = require('../index.js').helpers;
const chai = require('chai')



describe('mdLinks', () => {    
  it('Debería ser un función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería retornar un arreglo con vacio si el archivo no es .md', async  (done) => {
    const parameters = await mdLinks('./mdlinks.js')
    chai.assert.deepEqual(parameters,[])  
    done() 
  });
  it('Debería retornar un array de objeto con la información de cada link', async (done) => {
    const parameters = await mdLinks('./README.md')   
    chai.assert.deepEqual(parameters[0],{ file: './README.md',
    line: 5,
    url: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    validate: 'OK' })
    done()
  });

  it('Debería recorrer todas las carpetas y archivos .md de la ruta que ingrese el usuario', async (done) => {
    jest.useFakeTimers()
    const parameters = await mdLinks('./test/packTest');
   // console.log(parameters[0]) 
    chai.assert.deepEqual(parameters,[{ file:
      '/home/laboratoriad301/Documentos/Track-Frond/SCL007-md-links/test/packTest/README.md',
     line: 1,
     url: 'https://es.wikipedia.org/wiki/Markdown',
     text: 'Markdown',
     validate: 'OK' }])
    done();
  });
});

describe('helpers', () => { 
  it('Debería ser un objeto', () => {
  expect(typeof helpers).toBe('object');
});
});

/*

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log('Times up! 10 seconds before the next game starts...');
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
};
*/