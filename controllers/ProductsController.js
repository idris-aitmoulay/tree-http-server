const HttpController = require("../lib/HttpController");

const basePath = '/products';
class ProductsController extends HttpController {
  constructor() {
    super({ basePath });
  }

  registerRouterHandler() {
    super.registerRoute('/all', this.getProducts)
    super.registerRoute('/:id', this.getProductsById)
    super.registerRoute({ path: '/', method: 'POST' }, this.postProduct)
  }

  getProducts(req, res) {
    res.status(200).send('Get products!')
  }

  getProductsById(req, res) {
    res.status(200).send('Get getProductsById!')
  }

  postProduct(req, res) {
    res.status(201).send('POST products')
  }
}

module.exports = ProductsController;
