const mongoose = require('mongoose');
const OrderObserver = require('../observers/OrderObserver');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
  status: {
    type: String,
    enum: ['Confirmando', 'Preparando', 'Pronto'],
    default: 'Confirmando',
  },
});

orderSchema.post('findOneAndUpdate', async function () {
  const order = await this.model.findOne(this.getFilter());

  const orderObserver = new OrderObserver();
  orderObserver.update(order, 'atualizado');
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
