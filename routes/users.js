const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const User = require('../models/user');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Algo salio mal. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  let newUser = new User({
    nombre:         req.body.nombre,
    apellido:       req.body.apellido,
    fecha:          req.body.fecha,
    cedula:         req.body.cedula,
    responsable:    req.body.responsable,
    telefono:       req.body.telefono,
    estado:         req.body.estado
  });

  newUser.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Registro Agregado!`,
        result: {
          _id:      result._id,
          nombre:   result.nombre,
          apellido: result.apellido,
          fecha:    result.fecha,
          cedula:   result.cedula,
          responsable:   result.responsable,
          telefono:   result.telefono,     
          estado:   result.estado
        }
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.errors) {
        if (err.errors.nombre) {
          res.status(400).json({ success: false, msg: err.errors.nombre.message });
          return;
        }
        if (err.errors.apellido) {
          res.status(400).json({ success: false, msg: err.errors.apellido.message });
          return;
        }
        if (err.errors.fecha) {
          res.status(400).json({ success: false, msg: err.errors.fecha.message });
          return;
        }
        if (err.errors.cedula) {
          res.status(400).json({ success: false, msg: err.errors.cedula.message });
          return;
        }
        if (err.errors.responsable) {
          res.status(400).json({ success: false, msg: err.errors.responsable.message });
          return;
        }
        if (err.errors.telefono) {
          res.status(400).json({ success: false, msg: err.errors.telefono.message });
          return;
        }
        if (err.errors.estado) {
          res.status(400).json({ success: false, msg: err.errors.estado.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Algo esta mal ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', (req, res) => {


  let updatedUser = {
    nombre:         req.body.nombre,
    apellido:       req.body.apellido,
    fecha:          req.body.fecha,
    cedula:         req.body.cedula,
    responsable:    req.body.responsable,
    telefono:       req.body.telefono,
    estado:         req.body.estado
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Registro Actualizado!`,
            result: {
              _id: newResult._id,
              nombre:   newResult.nombre,
              apellido: newResult.apellido,
              fecha:    newResult.fecha,
              cedula:   newResult.cedula,
              responsable:   newResult.responsable,
              telefono:   newResult.telefono,        
              estado:   newResult.estado
                }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Algo saliooooo mal!. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.nombre) {
          res.status(400).json({ success: false, msg: err.errors.nombre.message });
          return;
        }
        if (err.errors.apellido) {
          res.status(400).json({ success: false, msg: err.errors.apellido.message });
          return;
        }
        if (err.errors.fecha) {
          res.status(400).json({ success: false, msg: err.errors.fecha.message });
          return;
        }
        if (err.errors.cedula) {
          res.status(400).json({ success: false, msg: err.errors.cedula.message });
          return;
        }
        if (err.errors.responsable) {
          res.status(400).json({ success: false, msg: err.errors.edad.message });
          return;
        }
        if (err.errors.telefono) {
          res.status(400).json({ success: false, msg: err.errors.telefono.message });
          return;
        }
        if (err.errors.estado) {
          res.status(400).json({ success: false, msg: err.errors.telefono.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Algo salios mal. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `Registro eliminado.`,
        result: {
          _id: result._id,
          nombre: result.nombre,
          apellido: result.apellido,
          fecha: result.fecha,
          cedula: result.cedula,
          responsable: result.responsable,
          telefono: result.telefono,
          estado: result.estado
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nada para eliminar.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
 /*sanitizeNombre = (nombre) => {
  return stringCapitalizeName(nombre);
}

sanitizeApellido = (apellido) => {
  return stringCapitalizeName(apellido);
}

sanitizeCorreo = (correo) => {
  return correo.toLowerCase();
}
sanitizeEdad = (edad) => {
  // Return empty if age is non-numeric
  if (isNaN(edad) && edad != '') return '';
  return (edad === '') ? edad : parseInt(edad);
}
sanitizeGenero = (genero) => {
  // Return empty if it's neither of the two
  return (genero === 'M' || genero === 'F') ? genero : '';
}*/
