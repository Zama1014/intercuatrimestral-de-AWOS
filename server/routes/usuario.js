const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Usuario.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los usuarios',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'usuarios listados con exito',
            conteo: usuarios.length,
            usuarios
        });
    });
});

app.post('/usuario',(req, res)=>{
    let body = req.body;
    let usu = new Usuario({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        mail: body.mail,
        activo: body.activo
    });
    usu.save((err, usuDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un usuario',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'usuario insertado con exito',
            usuDB
        });
    });
});

app.put('/usuario/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, 
    ['nombre', 'primer_apellido', 'segundo_apellido', 'edad', 'curp', 'telefono', 'mail', 'activo']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'},
    (err, usuDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actulizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El Usuario fue actulizado con exito',
            usuDB
        });
    });
});

app.delete('/usuario/:id', function(req, res){
    let id = req.params.id;
    
    Usuario.findByIdAndUpdate(id, {activo: false}, {runValidators: true, context: 'query'},
    (err, usuDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El Usuario fue eliminado con exito',
            usuDB
        });
    });
});

module.exports = app;