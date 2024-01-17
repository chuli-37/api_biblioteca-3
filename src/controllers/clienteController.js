const Cliente = require("../models/clienteModel");

exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
};

exports.createCliente = async (req, res) => {
    try {
        const nuevoCliente = await Cliente.create(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente" });
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente" });
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const clienteEliminado = await Cliente.findByIdAndRemove(clienteId);
        res.status(200).json(clienteEliminado);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el cliente" });
    }
};
