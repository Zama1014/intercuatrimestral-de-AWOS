const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    primer_apellido:{
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    segundo_apellido:{
        type: String,
        required: [true, 'El segundo apellido es obligatorio']
    },
    edad:{
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    curp:{
        type: String,
        required: [true, 'La CURP es obligatoria'],
        unique: true
    },
    telefono:{
        type: Number,
        required: [true, 'El telefono es obligatorio']
    },
    mail:{
        type: String,
        required: [true, 'El mail es obligatorio'],
        unique: true
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);