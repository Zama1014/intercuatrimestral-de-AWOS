const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    nombre_del_puesto:{
        type: String,
        required: [true, 'El nombre del puesto es requerido']
    },
    anios_servicio: {
        type: Number,
        required: [true, 'Los años de servicio son requeridos']
    },
    hora_entrada: {
        type: Number,
        required: [true, 'La hora de entrada es obligatoria']
    },
    hora_salida: {
        type: Number,
        required: [true, 'La hora de salida es obligatoria']
    },
    activo: {
        type: Boolean,
        default: true
    },
    id_usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento'
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);