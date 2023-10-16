const express = require('express');
const OrderFacade = require('../facades/OrderFacade');
const OrderFactory = require('../factories/orderFactory');
const OrderObserver = require('../observers/OrderObserver');

function OrderRoutes() {
  const router = express.Router();
  const orderObserver = new OrderObserver();

  router.post('/orders', async (req, res) => {
    try {
      const { customer, pizzaIds, status } = req.body;
      const order = OrderFactory.createOrder(customer, pizzaIds, status);
      await OrderFacade.createOrder(order);
      res.json({ message: 'Pedido criado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/orders', async (req, res) => {
    try {
      const orders = await OrderFacade.getAllOrders();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/orders/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await OrderFacade.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: 'Pedido não encontrado' });
      } else {
        res.json(order);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/orders/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const { customer, pizzaIds, status } = req.body;
      const updatedOrder = await OrderFacade.updateOrderById(orderId, { customer, pizzas: pizzaIds, status });
      orderObserver.notify(updatedOrder);
      if (!updatedOrder) {
        res.status(404).json({ message: 'Pedido não encontrado' });
      } else {
        res.json({ message: 'Pedido atualizado com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/orders/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await OrderFacade.deleteOrderById(orderId);
      if (!deletedOrder) {
        res.status(404).json({ message: 'Pedido não encontrado' });
      } else {
        res.json({ message: 'Pedido excluído com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = OrderRoutes;
