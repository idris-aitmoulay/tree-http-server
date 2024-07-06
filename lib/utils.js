// listed form HttpRequest class
const HTTP_REQUEST_FIELDS_NAME = [
  'host',
  'baseUrl',
  'method',
  'params',
  'query',
  'body',
  'httpVersion',
  'protocol',
];
function proxifyHttpRequest(request) {
  const proxyHandler = {
    get(object, property) {
      if (!HTTP_REQUEST_FIELDS_NAME.includes(property)) {
        return undefined;
      }
      return object[property]
    }
  }
  return new Proxy(request, proxyHandler);
}

module.exports = {
  proxifyHttpRequest
}
