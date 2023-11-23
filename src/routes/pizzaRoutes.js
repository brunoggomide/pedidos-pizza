const express = require("express");
const PizzaFacade = require("../facades/pizzaFacade");
const Factory = require("../factory");

/**
 * @swagger
 * tags:
 *   - name: Pizzas
 *     description: Operações relacionadas a pizzas.
 */

function PizzaRoutes() {
  const router = express.Router();

  /**
   * @swagger
   * /pizzas:
   *   post:
   *     summary: Cria uma nova pizza.
   *     tags: [Pizzas]
   *     parameters:
   *       - in: body
   *         name: pizza
   *         description: Dados da pizza a ser criada.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             description:
   *               type: string
   *             price:
   *               type: number
   *     responses:
   *       200:
   *         description: Pizza criada com sucesso.
   *       500:
   *         description: Erro no servidor.
   */
  router.post("/pizzas", async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const pizzaData = { name, description, price };
      const newPizza = Factory.create("pizza", pizzaData);
      const createdPizza = await PizzaFacade.createPizza(newPizza);
      res.status(201).json({
        message: "Pizza criada com sucesso",
        pizza: createdPizza,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /pizzas:
   *   get:
   *     summary: Obtém a lista de todas as pizzas.
   *     tags: [Pizzas]
   *     responses:
   *       200:
   *         description: Lista de pizzas.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/pizzas", async (req, res) => {
    try {
      const pizzas = await PizzaFacade.getAllPizzas();
      res.json(pizzas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /pizzas/{id}:
   *   get:
   *     summary: Obtém uma pizza pelo ID.
   *     tags: [Pizzas]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID da pizza.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Pizza encontrada.
   *       404:
   *         description: Pizza não encontrada.
   *       500:
   *         description: Erro no servidor.
   */
  router.get("/pizzas/:id", async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const pizza = await PizzaFacade.getPizzaById(pizzaId);
      if (!pizza) {
        res.status(404).json({ message: "Pizza não encontrada" });
      } else {
        res.json(pizza);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /pizzas/{id}:
   *   put:
   *     summary: Atualiza uma pizza pelo ID.
   *     tags: [Pizzas]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID da pizza.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: pizza
   *         description: Dados da pizza a ser atualizada.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             description:
   *               type: string
   *             price:
   *               type: number
   *     responses:
   *       200:
   *         description: Pizza atualizada com sucesso.
   *       404:
   *         description: Pizza não encontrada.
   *       500:
   *         description: Erro no servidor.
   */
  router.put("/pizzas/:id", async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const { name, description, price } = req.body;
      const updatedPizza = await PizzaFacade.updatePizzaById(pizzaId, {
        name,
        description,
        price,
      });
      if (!updatedPizza) {
        res.status(404).json({ message: "Pizza não encontrada" });
      } else {
        res.json({ message: "Pizza atualizada com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * @swagger
   * /pizzas/{id}:
   *   delete:
   *     summary: Exclui uma pizza pelo ID.
   *     tags: [Pizzas]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID da pizza.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Pizza excluída com sucesso.
   *       404:
   *         description: Pizza não encontrada.
   *       500:
   *         description: Erro no servidor.
   */
  router.delete("/pizzas/:id", async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const deletedPizza = await PizzaFacade.deletePizzaById(pizzaId);
      if (!deletedPizza) {
        res.status(404).json({ message: "Pizza não encontrada" });
      } else {
        res.json({ message: "Pizza excluída com sucesso" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = PizzaRoutes;
