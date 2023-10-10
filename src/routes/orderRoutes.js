const express = require('express');
const OrderFacade = require('../facades/OrderFacade'); // Importa a fachada de pedidos (OrderFacade)
const mongoose = require('mongoose');
const OrderObserver = require('../observers/OrderObserver'); // Importa o observador de pedidos (OrderObserver)

function OrderRoutes() {
  const router = express.Router();
  const orderObserver = new OrderObserver(); // Cria uma instância do observador de pedidos (OrderObserver)
  const orderFacade = new OrderFacade(orderObserver); // Cria uma instância da fachada de pedidos (OrderFacade)

  // Rota para criar um novo pedido
  router.post('/orders', async (req, res) => {
    const orderData = req.body;
  
    // Validação dos dados do pedido antes de criar o pedido
    const { customer: customerId, pizzaIds } = orderData;
  
    // Verificar se customerId é fornecido e é um MongoDB ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: 'ID de cliente inválido' });
    }
  
    // Verificar se pizzaIds é uma matriz de IDs válidos
    if (!Array.isArray(pizzaIds) || !pizzaIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ error: 'IDs de pizza inválidos' });
    }
  
    try {
      const order = await orderFacade.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter todos os pedidos
  router.get('/orders', async (req, res) => {
    try {
      const orders = await orderFacade.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter um pedido específico por ID
  router.get('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const order = await orderFacade.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json(order);
    } catch (error) {
      console.error('Erro ao buscar o pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para atualizar o status de um pedido por ID
  router.put('/orders/:orderId/status', async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;
  
    // Define valores de status válidos
    const validStatusValues = ["Confirmando", "Preparando", "Pronto"];
  
    // Verifica se o valor de status fornecido é válido
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ error: 'Valor de status inválido' });
    }
  
    try {
      const updatedOrder = await orderFacade.updateOrder(orderId, { status });
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para excluir um pedido por ID
  router.delete('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const deletedOrder = await orderFacade.deleteOrder(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json({ message: 'Pedido excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir o pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  return router;
}

module.exports = OrderRoutes;
