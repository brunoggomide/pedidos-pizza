class OrderObserver {
  constructor() {
    this.observers = []; 
    this.logNotifications = true; 
  }

  subscribe(observer) {
    this.observers.push(observer); 
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer); 
  }

  update(order, action) {
    console.log(`Status: ${order.status}.`); 
  }

  notify(order) {
    if (this.logNotifications) {
      console.log(`Pedido ${order._id} foi atualizado.`); 
    }
    this.observers.forEach(observer => observer.update(order)); 
  }
}

module.exports = OrderObserver; 