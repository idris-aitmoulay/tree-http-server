# Features

- create http server based as tree
- add Controllers through the lib

# Quickstart

```js
const HttpApplication = require("./lib/http-application");
const HttpController = require("../lib/HttpController");
class ProductsController extends HttpController {
  constructor() {
    super({ basePath: '/products' });
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

class OrdersController extends HttpController {
  constructor() {
    super({ basePath: '/orders' });
  }

  registerRouterHandler() {
    console.error('no route saved for ', this.basePath);
  }
}

const PORT = 9000
const application = new HttpApplication(PORT);

application.registerController(new ProductsController());
application.registerController(new OrdersController());

application.listen(() => {
  console.warn('server is running on ', PORT)
})
```

then just run `node index.js` and try to call every http query using `curl` or any http client.

# Features

## Get all server routes mapping

```js
const HttpApplication = require("./lib/http-application");
const HttpController = require("./lib/HttpController");

const PORT = 9000
const application = new HttpApplication(PORT);

class SettingController extends HttpController {
  constructor() {
    super({basePath: '/setting'});
  }

  registerRouterHandler() {
    super.registerRoute('/', this.getAllRoutes)
  }

  getAllRoutes(req, res) {
    const routesMap = application.getRoutesMap();
    res.status(200).send(routesMap)
  }
}

application.registerController(new SettingController())

application.listen(() => {
  console.warn('server is running on ', PORT)
})
```
