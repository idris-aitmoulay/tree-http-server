const { DYNAMIC_NODE_SYMBOL } = require('./Symbols')
const EMPTY_STRING = '';
const ROOT_SEGMENT = '/';
const SPLITTER = ROOT_SEGMENT;
function RouteNode(segment) {
  console.warn(segment)
  this.isVariablePath = segment.startsWith(':');
  this.segment = this.isVariablePath ? DYNAMIC_NODE_SYMBOL : segment;
  this.paramName = this.isVariablePath ? segment.slice(1) : null
  this.handlers = {};
  this.children = {};
}

RouteNode.prototype.findHandler = function (path, method) {
  if (this.segment !== ROOT_SEGMENT) {
    throw new Error('you need to use findHandler from root node');
  }

  if (path === ROOT_SEGMENT) {
    return this.handlers[method];
  }

  const [_, ...restSplittingPath] = this.getSplittingPath(path);
  return this.findHandlerByArrayPath(restSplittingPath, method);
}

RouteNode.prototype.findHandlerByArrayPath = function (arrayPath, method) {
  const [start, ...rest] = arrayPath;

  if (rest.length === 0) { // at the end of path
    let directHandler = this.children[start]

    if (!directHandler) {
      directHandler = this.children[DYNAMIC_NODE_SYMBOL]
    }

    return !!directHandler ? directHandler.handlers[method] : null;
  }

  let handler = this.children[start]?.findHandlerByArrayPath(rest, method);

  if (!handler) {
    handler = this.children[DYNAMIC_NODE_SYMBOL]?.findHandlerByArrayPath(rest, method);
  }

  return handler;
}

RouteNode.prototype.getSplittingPath = function (path) {
  const splitting = path.split(SPLITTER).filter(x => x !== EMPTY_STRING);
  return [ROOT_SEGMENT, ...splitting];
}


RouteNode.prototype.addHandler = function (method, handler) {
  this.handlers[method] = handler;
  return this;
}

RouteNode.prototype.insert = function (path, method, handler) {
  if (!path.startsWith(ROOT_SEGMENT)) {
    throw new Error('path should start with / not like yours : ' + path)
  }

  if (path === ROOT_SEGMENT) {
    return this.addHandler(method, handler);
  }

  const [_, ...restSplittingPath] = this.getSplittingPath(path);
  let node = this;
  for (const key of restSplittingPath) {
    const keyNode = key.startsWith(':') ? DYNAMIC_NODE_SYMBOL : key;
    node.children[keyNode] = node.children[keyNode] || new RouteNode(key);
    node = node.children[keyNode];
  }
  return node.addHandler(method, handler);
}

module.exports = RouteNode;
