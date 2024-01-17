const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/biblioteca', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true });

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: String,
    email: String
}, { collection: 'clientes' });

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;