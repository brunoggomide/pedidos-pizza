class ModelFactory {
  constructor() {
    this.models = {}; // Um objeto para armazenar os modelos registrados
  }

  registerModel(name, model) {
    this.models[name] = model; // Registra um modelo com um nome específico
  }

  getModel(name) {
    return this.models[name]; // Retorna o modelo registrado pelo nome
  }
}

const modelFactory = new ModelFactory(); // Cria uma instância da fábrica de modelos

// Registrando os modelos
modelFactory.registerModel('Order', require('./Order')); // Registra o modelo 'Order' e o importa do arquivo './Order'
modelFactory.registerModel('Customer', require('./Customer')); // Registra o modelo 'Customer' e o importa do arquivo './Customer'
modelFactory.registerModel('Pizza', require('./Pizza')); // Registra o modelo 'Pizza' e o importa do arquivo './Pizza'

module.exports = modelFactory; // Exporta a instância da fábrica de modelos para uso em outras partes do aplicativo
