const express = require('express');
const _ = require('underscore');
const app = express();
const Departamento = require('../models/departamento');

app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Departamento.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('Usuario', 'nombre primer_apellido segundo_apellido')
    .exec((err, departamentos) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los departamentos',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Departamentos listados con exito',
            conteo: departamentos.length,
            departamentos
        });
    });
});

app.post('/departamento',(req, res)=>{
    let body = req.body;
    let dep = new Departamento({
        nombre: body.nombre,
        numero_empleados: body.numero_empleados,
        extension_telefonica: body.extension_telefonica,
        activo: body.activo,
        id_jefe_de_area: body.id_jefe_de_area
    });
    dep.save((err, depDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un departamento',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Departamentos insertado con exito',
            depDB
        });
    });
});

app.put('/departamento/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'numero_emplados', 'extension_telefonica']);

    Departamento.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'},
    (err, depDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actulizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El departamento fue actulizado con exito',
            depDB
        });
    });
});

app.delete('/departamento/:id', function(req, res){
    let id = req.params.id;
    
    Departamento.findByIdAndUpdate(id, {activo: false}, {runValidators: true, context: 'query'},
    (err, depDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El departamento fue eliminado con exito',
            depDB
        });
    });
});

module.exports = app;
