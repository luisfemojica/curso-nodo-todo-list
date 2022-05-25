const { Console } = require('console');
const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( listaTareas ) => {
    fs.writeFileSync(archivo, JSON.stringify(listaTareas));
}

const leerDB = ( listaTareas ) => {
   if( !fs.existsSync(archivo) ){
    null;
   }
   const info = fs.readFileSync( archivo, { encoding: 'utf-8'} );
   const data = JSON.parse(info);
   return data;
}

module.exports = {
    guardarDB,
    leerDB
}