require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu,
        inquirerPausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist } = require('./helpers/inquier');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardararchivo');
// console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if( tareasDB ){
        //Establecer las tareas
        tareas.cargaTareasFromArray(tareasDB);
        //await inquirerPausa();
    }

    do {
        opt = await inquirerMenu(); //mostrarMenu();
        
        switch(opt){
            case '1':
                //crear opcion
                const desc = await leerInput('Descipción: ')
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.listadoCompleto();           
            break;
            case '3': //lista completadas
                tareas.listarPendientesCompletadas(true);           
            break;
            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);           
            break;
            case '5': //completado  | Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;
            case '6': //listar pendientes
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }   
                }
            break;

        }
        //console.log( tareas.listadoArr );   
        guardarDB( tareas.listadoArr );

        if (opt !== '0') await inquirerPausa();
    } while ( opt !== '0' );
}

main();