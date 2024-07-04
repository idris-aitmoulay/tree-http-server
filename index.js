const HttpApplication = require("./lib/http-application");
const registerRoutes = require("./registerRoutes");

const PORT = 9000
const application = new HttpApplication(PORT);
registerRoutes(application);
application.listen(() => {
  console.warn('server is running on ', PORT)
})
