const HttpApplication = require("./lib/http-application");
const registerRoutes = require("./registerRoutes");
const HttpController = require("./lib/HttpController");

const PORT = 9000
const application = new HttpApplication(PORT);
registerRoutes(application);

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
