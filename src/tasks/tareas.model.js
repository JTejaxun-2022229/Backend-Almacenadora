import mongoose from "mongoose";

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Name is required"],
    },
    descripcion: {
        type: String,
        required: [true, "Description is required"],
    },
    fechaInicio: {
        type: Date,
        required: [true, "Start date is required"],
    },
    fechaCierre: {
        type: Date,
        required: [true, "End date is required"],
    },
    nombreResponsable: {
        type: String,
        required: [true, "Name of the responsible is required"],
    },
    estado: {
        type: String,
        enum: ['pendiente', 'terminada', 'cancelada'],
        default: 'pendiente'
    }
})

export default mongoose.model('Tarea', TareaSchema);