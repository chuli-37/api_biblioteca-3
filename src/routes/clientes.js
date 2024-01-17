const express = require('express');
const router = express.Router();
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente} = require('../controllers/clienteController');
const {requiredScopes} = require("express-oauth2-jwt-bearer");

//Ruta para obtener todos los clientes
router.get('/', requiredScopes('read:clientes'), getAllClientes);

//Ruta para obtener un cliente por Id
router.get('/:id', requiredScopes('read:clientes'), getClienteById);

//Ruta para crear un nuevo cliente
router.post('/', requiredScopes('write:clientes'), createCliente);

//Ruta para actualizar un cliente existente
router.put('/:id', requiredScopes('write:clientes'), updateCliente);

//Ruta para eliminar un cliente
router.delete('/:id', requiredScopes('write:clientes'), deleteCliente);

module.exports = router;