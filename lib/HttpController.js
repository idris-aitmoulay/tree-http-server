const removePrefix = require("./removePrefix");
const { DYNAMIC_NODE_SYMBOL } = require('./Symbols');
const RouteNode = require('./RouteNode')

const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
];

class HttpController {
  constructor({ basePath }) {
    this.basePath = basePath;
    this.routeNode = new RouteNode('/');
    this.registerRouterHandler();
  }

  registerRouterHandler() {
    throw new Error('Route handler not implemented')
  }

  registerRoute(options, handler) {
    let path;
    let method = 'GET';
    if (typeof options === 'string') {
      path = options;
    } else {
      path = options.path;
      method =  options.method;
    }

    if (typeof path !== 'string') {
      throw new Error(path + 'should be string');
    }

    if (path.includes(DYNAMIC_NODE_SYMBOL)) {
      throw new Error(path + 'should not have ' + DYNAMIC_NODE_SYMBOL);
    }

    if (!HTTP_METHODS.includes(method)) {
      throw new Error(method + ' should be one of ' + HTTP_METHODS.toString());
    }

    return this.routeNode.insert(path, method, handler);
  }

  getHandler(url, method) {
    if (!url.startsWith(this.basePath)) {
      return;
    }
    const controllerUrl = removePrefix(url, this.basePath);
    return this.routeNode.findHandler(controllerUrl, method)
  }
}

module.exports = HttpController;
