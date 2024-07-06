const http = require('node:http');
const RouteControllersManager = require('./RouteControllersManager')
const HttpRequest = require("./HttpRequest");
const HttpResponse = require("./HttpResponse");

function HttpApplication(port) {
  this.port = port;
  this.server = null;
  this.routeManager = new RouteControllersManager();
}

HttpApplication.prototype.listen = function (callback) {
  if (!this.port) {
    throw new Error('You should specify port')
  }
  if (this.server) return this.server;
  const self =  this;
  this.server = http.createServer(async function (incommingMessage, serverResponse) {
    const {url, method} = incommingMessage;
    const controllers = self.routeManager.findRouteControllersByPath(url);
    let handler;
    controllersLoop:
    for(const key in controllers) {
      const controller = controllers[key];
      const firstHandler = controller.getHandler(url, method);
      if (firstHandler) {
        handler = firstHandler;
        break controllersLoop;
      }
    }
    if (!handler) {
      serverResponse.writeHead(404)
      serverResponse.end('Unkown url')
    } else {
      const request = await HttpRequest.build(incommingMessage);
      const response = HttpResponse.build(serverResponse);
      handler(request, response);
    }
    return;
  });
  return this.server.listen(this.port, callback)
}

HttpApplication.prototype.registerController = function(controller) {
  this.routeManager.register(controller)
}

HttpApplication.prototype.getRoutesMap = function () {
  const iterable  = this.routeManager.getRoutesControllersIterable();
  let routesMap = {};
  for (const value of iterable) {
    const { basePath, controller } = value;
    const controllerRoutesMap = controller.routeNode.getRoutes()
    for(const subRoutesPath in controllerRoutesMap) {
      const key = basePath + subRoutesPath
      routesMap[key] = controllerRoutesMap[subRoutesPath];
    }
  }
  return routesMap;
}

module.exports = HttpApplication
