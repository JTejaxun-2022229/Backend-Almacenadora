import Tarea from '../tasks/tareas.model.js';

export const existeTareaById = async (id = '') => {
    const existeTarea = await Tarea.findById(id);
    if (!existeTarea){
        throw new Error(`El ID: ${id} no existe`);
    }
    
}