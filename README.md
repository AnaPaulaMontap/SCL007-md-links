# mdLinks

mdLinks es un módulo construido con JavaScript para ahorrar tiempo a la hora de comprobar enlaces rotos dentro de tus archivos Markdown. Esta librería utilizada tanto en archivos externos como en la terminal analiza los archivos `.md ` y verificando el estado de sus links.

## Instalación 

Lo primero que debemos hacer es instalar nuestra librería ...
 
 - De forma local con el siguiente comando:

```

$ npm install --save https://github.com/AnaPaulaMontap/SCL007-md-links

```
- De forma global con el siguiente comando:

```

$ npm install --save -g https://github.com/AnaPaulaMontap/SCL007-md-links

```

## Uso 


### Módulo

mdLinks como módulo entrega una promesa que corresponde a un array que contiene la información disponible del link:

    [{ file:  Archivo del cual esta extraído (carpeta original),
        line: Linea del archivo donde se encuentra el link analizado,
        url:  Dirección original del link, 
        text: Texto represetativo del link encontrado.
        validate: Estado de validación del link ('OK' , 'URL INVALIDA' , 'EL LINK NO CORRESPONDE A URL')
    }]  



Primero debe ingresar línea de comando md-links y el nombre del archivo que desea analizar

```

$ mdlinks 'nombre-de-tu-archivo.md' 

```


Finalmente la terminal retornará lo siguiente :

```
 [{ file: './README-lab.md',
    line: 330,
    url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio',
    validate: 'OK' },
  { file: './README-lab.md',
    line: 331,
    url: 'https://nodejs.org/api/path.html',
    text: 'Path',
    validate: 'OK' },
  { file: './README-lab.md',
    line: 332,
    url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    validate: 'OK' } ]

```


### CLI

`-- validate`

Realiza una petición HTTP para averiguar si el link funciona o no.

Ejemplo

```
$ mdlinks 'nombre-de-tu-archivo.md'  --validate

```
Retorna

```
 'nombre-de-tu-archivo.md', 'linea donde se encuentra url', 'https://dirección.url', 'estado de la validación'

```

`-- stats`

Entrega resumen por archivo de links encontrados con cantidad de links validos y no.

Ejemplo

```
$ mdlinks 'nombre-de-tu-archivo.md'  --stats

```

Retorna

```
Total Links: Total de links encontrados
Links Ok: Cantidad de links validos
Broken Links: Cantidad de links invalidos.

```

`-- text`

Entrega el texto representativo que acompaña al link.

Ejemplo

```
$ mdlinks 'nombre-de-tu-archivo.md'  --text

```

Retorna

```
 'linea donde se encuentra url', 'https://dirección.url', 'texto'

```

## Version 

Actualmente este proyecto se encuentra en la versión 0.1.0.

## Licencia

ISC
