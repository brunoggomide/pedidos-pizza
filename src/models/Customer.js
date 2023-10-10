const mongoose = require('mongoose'); // Importa o módulo Mongoose, que é uma biblioteca para modelagem de dados no MongoDB

// Define o esquema (schema) de dados para clientes
const customerSchema = new mongoose.Schema({
  name: String, // Campo para o nome do cliente
  table: Number, // Campo para o número da mesa
});

// Cria um modelo (model) chamado 'Customer' com base no esquema definido
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer; // Exporta o modelo 'Customer' para uso em outras partes do aplicativo
