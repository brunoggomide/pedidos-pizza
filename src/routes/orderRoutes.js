const express = require("express");
const OrderFacade = require("../facades/orderFacade");
const Factory = require("../factory");
const OrderObserver = require("../observers/orderObserver");

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operações relacionadas a pedidos.
 */

function OrderRoutes() {
  const router = express.Router();
  const orderObserver = new OrderObserver();

  /**
   * @swagger
   * /orders:
   *   post:
   *     summary: Cria um novo pedido.
   *     tags: [Orders]
   *     parameters:
   *       - in: body
   *         name: order
   *         description: Dados do pedido a ser criado.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             customer:
   *               type: string
   *             pizzas:
   *               type: array
   *               items:
   *                 type: string
   *             status:
   *               type: string
   *     responses:
   *       200:
   *         description: Pedido criado com sucesso.
   *       500:
   *         description: Erro no servidor.
   */
  router.post("/orders", async (req, res) => {
    try {
      const { customer, pizzas, status } = req.body;
      const orderData = { customer, pizzas, status };
      const newOrder = Factory.create("order", orderData);
      await OrderFacade.createOrder(newOrder);
      res.json({ message: "Pedido criado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /orders:
   *   get:
   *     summary: Obtém a lista de todos os pedidos.
   *     tags: [Orders]
   *     responses:
   *       200:
   *         description: Lista de pedidos.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/orders", async (req, res) => {
    try {
      const orders = await OrderFacade.getAllOrders();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /orders/{id}:
   *   get:
   *     summary: Obtém um pedido pelo ID.
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do pedido.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Pedido encontrado.
   *       404:
   *         description: Pedido não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/orders/:id", async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await OrderFacade.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: "Pedido não encontrado" });
      } else {
        res.json(order);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /orders/{id}:
   *   put:
   *     summary: Atualiza um pedido pelo ID.
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do pedido.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: order
   *         description: Dados do pedido a ser atualizado.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             customer:
   *               type: string
   *             pizzas:
   *               type: array
   *               items:
   *                 type: string
   *             status:
   *               type: string
   *     responses:
   *       200:
   *         description: Pedido atualizado com sucesso.
   *       404:
   *         description: Pedido não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.put("/orders/:id", async (req, res) => {
    try {
      const orderId = req.params.id;
      const { customer, pizzas, status } = req.body;
      orderObserver.notify(updatedOrder);
      const updatedOrder = await OrderFacade.updateOrderById(orderId, {
        customer,
        pizzas: pizzas,
        status,
      });
      if (!updatedOrder) {
        res.status(404).json({ message: "Pedido não encontrado" });
      } else {
        res.json({ message: "Pedido atualizado com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /orders/{id}:
   *   delete:
   *     summary: Exclui um pedido pelo ID.
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do pedido.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Pedido excluído com sucesso.
   *       404:
   *         description: Pedido não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.delete("/orders/:id", async (req, res) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await OrderFacade.deleteOrderById(orderId);
      if (!deletedOrder) {
        res.status(404).json({ message: "Pedido não encontrado" });
      } else {
        res.json({ message: "Pedido excluído com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = OrderRoutes;
