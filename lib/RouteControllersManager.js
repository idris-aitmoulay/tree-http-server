class RouteControllersManager {
  constructor() {
    this.routesControllers = {};
  }

  register(routeController) {
    if (typeof routeController?.basePath !== 'string') {
      throw Error('RouteController should have basePath with string value');
    }
    this.routesControllers[routeController.basePath] = routeController;
  }

  findRouteControllersByPath(path) {
    return Object.keys(this.routesControllers)
      .filter(registeredPath => path.startsWith(registeredPath))
      .reduce( (res, key) => (res[key] = this.routesControllers[key], res), {} );
  }
}

module.exports = RouteControllersManager;
