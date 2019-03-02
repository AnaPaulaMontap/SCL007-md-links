'use strict';

const mdLinks = require('../index.js').mdlinks;
const helpers = require('../index.js').helpers;
const chai = require('chai')
const chalk = require('chalk')



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

it('Debería imprimir la estadisticas de los links', () => {
  
  const data = [ { file: './README.md',line: 5, url: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', validate: 'OK' },{ file: './README.md',
  line: 16, url: 'https://nodejs.org/', text: 'Node.js', validate: 'OK' }, { file: './README.md', line: 20, url:'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
  text: 'md-links', validate: 'OK' },{ file: './README.md',line: 24, url: 'https://nodejs.org/es/', text: 'Node.js', validate: 'OK' }, { file: './README.md',
  line: 25, url: 'https://developers.google.com/v8/', text: 'motor de JavaScript V8 de Chrome', validate: 'OK' }]

  const parameters = helpers.printStats(data);
  const result = chalk.magenta('Total Links:',5,'\n','Links Ok:',5,'\n','Broken Links:',0)
  
  chai.assert.deepEqual(parameters, result)

});

it('Debería imprimir el texto de cada links', () => {
  
  const data = [ { file: './README.md',line: 5, url: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', validate: 'OK' },{ file: './README.md',
  line: 16, url: 'https://nodejs.org/', text: 'Node.js', validate: 'OK' }, { file: './README.md', line: 20, url:'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
  text: 'md-links', validate: 'OK' },{ file: './README.md',line: 24, url: 'https://nodejs.org/es/', text: 'Node.js', validate: 'OK' }, { file: './README.md',
  line: 25, url: 'https://developers.google.com/v8/', text: 'motor de JavaScript V8 de Chrome', validate: 'OK' }]

  const parameters = helpers.printText(data); 
  chai.assert.deepEqual(parameters,[ 'Markdown',
  'Node.js',
  'md-links',
  'Node.js',
  'motor de JavaScript V8 de Chrome' ])

});

});

