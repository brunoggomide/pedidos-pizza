const express = require('express');
const PizzaController = require('../controllers/PizzaController'); // Importa o controlador de pizzas (PizzaController)

function PizzaRoutes() {
  const router = express.Router();

  // Rota para criar uma nova pizza
  router.post('/pizzas', async (req, res) => {
    const pizzaData = req.body;

    try {
      const pizza = await PizzaController.createPizza(pizzaData);
      res.status(201).json(pizza);
    } catch (error) {
      console.error('Erro ao criar a pizza:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter todas as pizzas
  router.get('/pizzas', async (req, res) => {
    try {
      const pizzas = await PizzaController.getAllPizzas();
      res.json(pizzas);
    } catch (error) {
      console.error('Erro ao buscar as pizzas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para obter uma pizza específica por ID
  router.get('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    try {
      const pizza = await PizzaController.getPizzaById(pizzaId);
      if (!pizza) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
      }
      res.json(pizza);
    } catch (error) {
      console.error('Erro ao buscar a pizza:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para atualizar uma pizza por ID
  router.put('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    const updatedData = req.body;

    try {
      const updatedPizza = await PizzaController.updatePizza(pizzaId, updatedData);
      if (!updatedPizza) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
      }
      res.json(updatedPizza);
    } catch (error) {
      console.error('Erro ao atualizar a pizza:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // Rota para excluir uma pizza por ID
  router.delete('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    try {
      const deletedPizza = await PizzaController.deletePizza(pizzaId);
      if (!deletedPizza) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
      }
      res.json({ message: 'Pizza excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir a pizza:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  return router;
}

module.exports = PizzaRoutes;
