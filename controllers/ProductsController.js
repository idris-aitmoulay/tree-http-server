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
    res.writeHead(200)
    res.end('Get products!')
  }

  getProductsById(req, res) {
    res.writeHead(200)
    res.end('Get getProductsById!')
  }

  postProduct(req, res) {
    console.warn('POST products')
  }
}

module.exports = ProductsController;
