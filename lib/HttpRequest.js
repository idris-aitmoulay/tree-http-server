const parseurl = require('parseurl');
const queryString = require('node:querystring');
class HttpRequest {
  static build(incomingMessage) {
    return new Promise((resolve, reject) => {
      const request = new HttpRequest();
      const { protocol, query, pathname} = parseurl(incomingMessage);
      request
        .setIncomingMessage(incomingMessage)
        .setProtocol(protocol)
        .setBaseUrl(pathname)
        .setQuery(queryString.parse(query))
        .setMethod(incomingMessage.method)
        .setHttpVersion(incomingMessage.httpVersion)
        .setHost(incomingMessage.headers.host);
      let bodyAsString = '';

      incomingMessage.on('data', (chunk) => {
        bodyAsString += chunk;
      });
      incomingMessage.on('end', () => {
        resolve(request.setBody(bodyAsString))
      })
      incomingMessage.on('error', error => reject(error))
    })
  }
  setIncomingMessage(incomingMessage) {
    this.incomingMessage = incomingMessage;
    return this;
  }

  setHost(host) {
    this.host = host;
    return this;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setParams(params) {
    this.params = params
    return this;
  }

  setQuery(query) {
    this.query = query;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  setHttpVersion(httpVersion) {
    this.httpVersion = httpVersion;
    return this;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }
}

module.exports = HttpRequest;
