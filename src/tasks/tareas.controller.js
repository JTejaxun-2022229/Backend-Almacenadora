import { response, request } from "express";
import Tarea from './tareas.model.js';

export const createTask = async (req, res) => {

    try {

        const nuevaTarea = new Tarea(req.body);

        await nuevaTarea.save();

        res.status(201).json(nuevaTarea);
    } catch (error) {
        
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

export const getTasks = async (req, res) => {

    try {

        const { nombre, descripcion, fechaInicio, fechaCierre, nombreResponsable, estado } = req.query;

        const filter = {};
        if (nombre) filter.nombre = { $regex: nombre, $options: 'i' };
        if (descripcion) filter.descripcion = { $regex: descripcion, $options: 'i' };
        if (fechaInicio) filter.fechaInicio = { $regex: fechaInicio, $options: 'i' };
        if (fechaCierre) filter.fechaCierre = { $regex: fechaCierre, $options: 'i' };
        if (nombreResponsable) filter.nombreResponsable = { $regex: nombreResponsable, $options: 'i' };
        if (estado) filter.estado = { $regex: estado, $options: 'i' };

        const tareas = await Tarea.find(filter);

        const total = tareas.length;

        res.status(200).json({ total, tareas });
    } catch (error) {

        res.status(500).json({ error: 'Error getting tareas' });
    }
};

export const updateTask = async (req, res) => {

    try {

        const { id } = req.params;
        const { _id, ...remain } = req.body;

        await Tarea.findByIdAndUpdate(id, remain);

        const tarea = await Tarea.findOne({ _id: id });

        res.status(200).json({ msg: 'Tarea has been update', tarea })

    } catch (error) {

        res.status(500).json({ error: 'Error when updating tarea' });
    }
}

export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const tarea = await Tarea.findByIdAndUpdate(id, { estado: 'cancelada' });

        res.status(200).json({ msg: 'Tarea has been disable', tarea })
    } catch (error) {

        res.status(500).json({ error: 'Error when deleting tarea' });
    }

}

