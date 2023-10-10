const mongoose = require('mongoose'); // Importa o módulo Mongoose, que é uma biblioteca para modelagem de dados no MongoDB

// Define o esquema (schema) de dados para pedidos
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Referência ao cliente relacionado por meio do ID
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }], // Lista de IDs de pizzas relacionadas
  status: {
    type: String,
    enum: ['Confirmando', 'Preparando', 'Pronto'], // Define um campo de status com opções enumeradas
    default: 'Confirmando', // Valor padrão é 'Confirmando'
  },
});

// Cria um modelo (model) chamado 'Order' com base no esquema definido
const Order = mongoose.model('Order', orderSchema);

module.exports = Order; // Exporta o modelo 'Order' para uso em outras partes do aplicativo
