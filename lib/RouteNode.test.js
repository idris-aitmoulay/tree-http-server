const RouteNode = require('./RouteNode')

function noop() {}

function buildRouteTree() {
  const root = new RouteNode('/')
  root.insert('/products', 'POST', noop)
  root.insert('/', 'GET', noop)
  root.insert('/products/:id', 'DELETE', noop)
  root.insert('/products/:id', 'POST', () => 'POST_FUNCTION')
  return root;
}

function countHandlers(root) {
  const {handlers, children} = root;
  let count = Object.keys(handlers).length;
  for (const nodeKey in children) {
    const child = children[nodeKey]
    count += countHandlers(child);
  }
  return count;
}

describe('RouteNode', () => {
  test('should have one level when creating multiple handlers', () => {
    const root = new RouteNode('/')
    root.insert('/', 'POST', noop)
    root.insert('/', 'GET', noop)
    root.insert('/', 'DELETE', noop)
    const rootHandlersKey = Object.keys(root.handlers);
    expect(Object.keys(root.children).length).toBe(0)
    expect(countHandlers(root)).toBe(3)
    expect(root.isVariablePath).toBe(false)
    expect(root.segment).toBe('/')
    for (const method of ['POST', 'GET', 'DELETE']) {
      expect(rootHandlersKey).toContain(method)
    }
  })

  test('should have one level when creating multiple handlers', () => {
    const root = buildRouteTree();
    expect(countHandlers(root)).toBe(4)
  })

  test('find handler by path', () => {
    const root = buildRouteTree();
    expect(countHandlers(root)).toBe(4);
    const handler = root.findHandler('/products/1245', 'POST')
    expect(handler).toBeDefined()
    expect(handler()).toBe('POST_FUNCTION')
  })
})
