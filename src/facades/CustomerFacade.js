// CustomerFacade.js

const modelFactory = require('../models/ModelFactory'); // Importa a fábrica de modelos

class CustomerFacade {
  constructor() {
    this.Customer = modelFactory.getModel('Customer'); // Obtém o modelo 'Customer' da fábrica de modelos
    this.Order = modelFactory.getModel('Order'); // Obtém o modelo 'Order' da fábrica de modelos
  }

  async createCustomer(customerData) {
    try {
      const customer = await this.Customer.create(customerData); // Cria um cliente com os dados fornecidos
      return customer;
    } catch (error) {
      console.error('Erro ao criar o cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.Customer.find(); // Obtém todos os clientes
      return customers;
    } catch (error) {
      console.error('Erro ao buscar os clientes:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getCustomerById(customerId) {
    try {
      const customer = await this.Customer.findById(customerId); // Obtém um cliente pelo ID
      return customer;
    } catch (error) {
      console.error('Erro ao buscar o cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId }); // Obtém os pedidos de um cliente pelo ID
      return orders;
    } catch (error) {
      console.error('Erro ao buscar os pedidos do cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async updateCustomer(customerId, updatedData) {
    try {
      const updatedCustomer = await this.Customer.findByIdAndUpdate(customerId, updatedData, { new: true }); // Atualiza um cliente pelo ID com os dados atualizados
      return updatedCustomer;
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  async deleteCustomer(customerId) {
    try {
      const deletedCustomer = await this.Customer.findByIdAndDelete(customerId); // Exclui um cliente pelo ID
      return deletedCustomer;
    } catch (error) {
      console.error('Erro ao excluir o cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }
}

module.exports = CustomerFacade; // Exporta a classe CustomerFacade
