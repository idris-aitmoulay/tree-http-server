const HttpController = require("../lib/HttpController");

const basePath = '/orders';
class OrdersController extends HttpController {
  constructor() {
    super({ basePath });
  }

  registerRouterHandler() {
    console.error('no route saved for ', this.basePath);
  }
}

module.exports = OrdersController;
