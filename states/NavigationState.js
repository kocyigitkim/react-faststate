const FastState = require('../index');


function createComponent(ComponentDefinition, props) {
  return <ComponentDefinition {...props}></ComponentDefinition>;
}

class NavigationState extends FastState {
  constructor() {
    super();
    this.history = [];
    this.paths = {};
  }
  push(path, props) {
    this.history = [
      {
        path,
        component: createComponent(this.paths[path], props),
        props,
      },
      ...this.history,
    ];
  }
  pop() {
    if (this.history.length > 0) this.history.splice(0, 1);
  }
  replace(path, props) {
    this.history = [
      { path, component: createComponent(this.paths[path], props), props },
    ];
  }
  reset() {
    this.history = [];
  }
  registerPath(path, component) {
    this.paths[path] = component;
  }
}

const Navigation = new NavigationState();

module.exports = { NavigationState, Navigation };