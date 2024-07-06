class HttpResponse {
  static build(outgoingMessage) {
    const response = new HttpResponse();
    response.setOutgoingMessage(outgoingMessage)
    return response;
  }

  setOutgoingMessage(outgoingMessage) {
    this.outgoingMessage = outgoingMessage;
    return this;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  setBodyResponse(bodyResponse) {
    const bodyResponseType = (typeof bodyResponse);
    if (bodyResponseType === 'function') {
      throw new Error("you should not provide function as value");
    }
    if (['object', 'array'].includes(bodyResponseType)) {
      this.bodyResponse = JSON.stringify(bodyResponse);
    } else {
      this.bodyResponse = bodyResponse;
    }
  }

  status(status) {
    if (typeof status === 'number' && status >= 200 && status < 600) {
      this.setStatusCode(status)
    }
    return this;
  }

  send(data) {
    this.setBodyResponse(data);
    this.end()
  }

  end() {
    const status = this.statusCode || 200;
    const data = this.bodyResponse;
    this.outgoingMessage?.writeHead(status);
    this.outgoingMessage?.end(data);
  }
}

module.exports = HttpResponse;
