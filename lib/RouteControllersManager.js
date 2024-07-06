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

  getRoutesControllersIterable() {
    const basePaths = Object.keys(this.routesControllers);
    const count = basePaths.length
    let current = 0;
    const self = this;

    const iterable = {
      [Symbol.iterator]: function () {
        return {
          count,
          next: function() {
            const value = current;
            const basePath = basePaths[value];
            const controller = self.routesControllers[basePath];
            const done = current >= count;
            current++;
            return { value: { controller, basePath }, done };
          }
        }
      }
    }

    return iterable;
  }
}

module.exports = RouteControllersManager;
