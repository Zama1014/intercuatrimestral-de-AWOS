const express = require('express');
const _ = require('underscore');
const app = express();
const Empleado = require('../models/empleado');

app.get('/empleado', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Empleado.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('Usuario', 'nombre primer_apellido segundo_apellido')
    .populate('Departamento', 'nombre numero_emplados extension_telefonica activo')
    .exec((err, empleados) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los empleados',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'empleados listados con exito',
            conteo: empleados.length,
            empleados
        });
    });
});

app.post('/empleado',(req, res)=>{
    let body = req.body;
    let emp = new Empleado({
        nombre_del_puesto: body.nombre_del_puesto,
        anios_servicio: body.anios_servicio,
        hora_entrada: body.hora_entrada,
        hora_salida: body.hora_salida,
        activo: body.activo,
        id_usuario: body.id_usuario,
        id_departamento: body.id_departamento
    });
    emp.save((err, empDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un empleado',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'empleado insertado con exito',
            empDB
        });
    });
});

app.put('/empleado/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre_del_puesto', 'anios_servicio', 'hora_entrada', 'hora_salida']);

    Empleado.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'},
    (err, empDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actulizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El empleado fue actulizado con exito',
            empDB
        });
    });
});

app.delete('/empleado/:id', function(req, res){
    let id = req.params.id;
    
    Empleado.findByIdAndUpdate(id, {activo: false}, {runValidators: true, context: 'query'},
    (err, empDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El empleado fue eliminado con exito',
            empDB
        });
    });
});

module.exports = app;

