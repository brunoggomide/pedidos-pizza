// PizzaController.js

const modelFactory = require('../models/ModelFactory'); // Importa a fábrica de modelos

class PizzaController {
  constructor() {
    this.Pizza = modelFactory.getModel('Pizza'); // Obtém o modelo 'Pizza' da fábrica de modelos
  }

  async createPizza(pizzaData) {
    try {
      const pizza = await this.Pizza.create(pizzaData); // Cria uma pizza com os dados fornecidos
      return pizza;
    } catch (error) {
      console.error('Erro ao criar a pizza:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getAllPizzas() {
    try {
      const pizzas = await this.Pizza.find(); // Obtém todas as pizzas
      return pizzas;
    } catch (error) {
      console.error('Erro ao buscar as pizzas:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getPizzaById(pizzaId) {
    try {
      const pizza = await this.Pizza.findById(pizzaId); // Obtém uma pizza pelo ID
      return pizza;
    } catch (error) {
      console.error('Erro ao buscar a pizza:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async updatePizza(pizzaId, updatedData) {
    try {
      const updatedPizza = await this.Pizza.findByIdAndUpdate(pizzaId, updatedData, { new: true }); // Atualiza uma pizza pelo ID com os dados atualizados
      return updatedPizza;
    } catch (error) {
      console.error('Erro ao atualizar a pizza:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async deletePizza(pizzaId) {
    try {
      const deletedPizza = await this.Pizza.findByIdAndDelete(pizzaId); // Exclui uma pizza pelo ID
      return deletedPizza;
    } catch (error) {
      console.error('Erro ao excluir a pizza:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }
}

module.exports = new PizzaController(); // Exporta uma instância do PizzaController
