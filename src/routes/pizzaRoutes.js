const express = require('express');
const PizzaFacade = require('../facades/PizzaFacade');
const Factory = require('../factory');

function PizzaRoutes() {
  const router = express.Router();

  router.post('/pizzas', async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const pizzaData = { name, description, price };
      const newPizza = Factory.create('pizza', pizzaData);
      await PizzaFacade.createPizza(newPizza);
      res.json({ message: 'Pizza criada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  

  router.get('/pizzas', async (req, res) => {
    try {
      const pizzas = await PizzaFacade.getAllPizzas();
      res.json(pizzas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/pizzas/:id', async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const pizza = await PizzaFacade.getPizzaById(pizzaId);
      if (!pizza) {
        res.status(404).json({ message: 'Pizza não encontrada' });
      } else {
        res.json(pizza);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/pizzas/:id', async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const { name, description, price } = req.body;
      const updatedPizza = await PizzaFacade.updatePizzaById(pizzaId, { name, description, price });
      if (!updatedPizza) {
        res.status(404).json({ message: 'Pizza não encontrada' });
      } else {
        res.json({ message: 'Pizza atualizada com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/pizzas/:id', async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const deletedPizza = await PizzaFacade.deletePizzaById(pizzaId);
      if (!deletedPizza) {
        res.status(404).json({ message: 'Pizza não encontrada' });
      } else {
        res.json({ message: 'Pizza excluída com sucesso' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = PizzaRoutes;
