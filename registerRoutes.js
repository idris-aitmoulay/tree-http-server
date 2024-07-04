const ProductsController = require("./controllers/ProductsController");
const OrdersController = require("./controllers/OrdersController");

function registerRoutes(application) {
  application.registerController(new ProductsController());
  application.registerController(new OrdersController());
}

module.exports = registerRoutes;
