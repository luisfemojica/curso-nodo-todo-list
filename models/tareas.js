const Tarea = require('./tarea');
require('colors');;

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargaTareasFromArray( tareas = []){
        Object.keys(tareas).forEach( key => {
            const tarea = tareas[key];
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea,i) => {
            const index = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;          
            const formato = `${index} ${desc} :: ${estado}`;
            console.log(formato);
        });     
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { desc, completadoEn } = tarea
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;          
            if(completadas){
                if(completadoEn){
                    contador+=1;
                    const formato = `${contador.toString().green} ${desc} :: ${ completadoEn.green }`
                    console.log(formato);
                }
            }else{
                if(!completadoEn){
                    contador+=1;
                    const formato = `${contador.toString().green} ${desc} :: ${estado}`
                    console.log(formato);
                }
            }
        });  
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes( tarea.id )){
                 this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;