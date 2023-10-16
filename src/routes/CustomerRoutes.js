const express = require("express");
const CustomerFacade = require("../facades/customerFacade");
const Factory = require("../factory");

/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Operações relacionadas a clientes.
 */

function CustomerRoutes() {
  const router = express.Router();

  /**
   * @swagger
   * /customers:
   *   post:
   *     summary: Cria um novo cliente.
   *     tags: [Customers]
   *     parameters:
   *       - in: body
   *         name: customer
   *         description: Dados do cliente a ser criado.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             table:
   *               type: number
   *     responses:
   *       200:
   *         description: Cliente criado com sucesso.
   *       500:
   *         description: Erro no servidor.
   */
  router.post("/customers", async (req, res) => {
    try {
      const { name, table } = req.body;
      const customerData = { name, table };
      const newCustomer = Factory.create("customer", customerData);
      await CustomerFacade.createCustomer(newCustomer);
      res.json({ message: "Cliente criado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /customers:
   *   get:
   *     summary: Obtém a lista de todos os clientes.
   *     tags: [Customers]
   *     responses:
   *       200:
   *         description: Lista de clientes.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/customers", async (req, res) => {
    try {
      const customers = await CustomerFacade.getAllCustomers();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /customers/{id}:
   *   get:
   *     summary: Obtém um cliente pelo ID.
   *     tags: [Customers]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do cliente.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Cliente encontrado.
   *       404:
   *         description: Cliente não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/customers/:id", async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await CustomerFacade.getCustomerById(customerId);
      if (!customer) {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.json(customer);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /customers/{id}:
   *   put:
   *     summary: Atualiza um cliente pelo ID.
   *     tags: [Customers]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do cliente.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: customer
   *         description: Dados do cliente a ser atualizado.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             table:
   *               type: number
   *     responses:
   *       200:
   *         description: Cliente atualizado com sucesso.
   *       404:
   *         description: Cliente não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.put("/customers/:id", async (req, res) => {
    try {
      const customerId = req.params.id;
      const { name, table } = req.body;
      const updatedCustomer = await CustomerFacade.updateCustomerById(
        customerId,
        { name, table }
      );
      if (!updatedCustomer) {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.json({ message: "Cliente atualizado com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /customers/{id}:
   *   delete:
   *     summary: Exclui um cliente pelo ID.
   *     tags: [Customers]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID do cliente.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Cliente excluído com sucesso.
   *       404:
   *         description: Cliente não encontrado.
   *       500:
   *         description: Erro no servidor.
   */
  router.delete("/customers/:id", async (req, res) => {
    try {
      const customerId = req.params.id;
      const deletedCustomer = await CustomerFacade.deleteCustomerById(
        customerId
      );
      if (!deletedCustomer) {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.json({ message: "Cliente excluído com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = CustomerRoutes;
