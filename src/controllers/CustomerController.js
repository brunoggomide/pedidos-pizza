// CustomerController.js

const modelFactory = require('../models/ModelFactory'); // Importa a fábrica de modelos
const OrderObserver = require('../observers/OrderObserver'); // Importa o OrderObserver

class CustomerController {
  constructor() {
    this.Customer = modelFactory.getModel('Customer'); // Obtém o modelo 'Customer' da fábrica de modelos
    this.Order = modelFactory.getModel('Order'); // Obtém o modelo 'Order' da fábrica de modelos
    this.orderObserver = new OrderObserver(); // Cria uma instância do OrderObserver
    this.orderObserver.subscribe(this); // Se inscreve no OrderObserver
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

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId }); // Obtém os pedidos de um cliente pelo ID
      return orders;
    } catch (error) {
      console.error('Erro ao buscar os pedidos do cliente:', error); // Registra um erro se ocorrer uma exceção
      throw error;
    }
  }

  // Método do observador para ser notificado das alterações nos pedidos
  update(order, action) {
    const { customer } = order;
    console.log(`O cliente ${customer} ${action} um pedido.`); // Registra uma mensagem quando um pedido é atualizado
  }

}

module.exports = new CustomerController(); // Exporta uma instância do CustomerController
