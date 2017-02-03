import { kebabCase, merge } from 'lodash';
import { titleize, classify } from 'underscore.string';

class Definition {
  constructor(name, component, data) {
    // expose component to the window for live coding
    global[classify(name)] = component;

    this.data = {
      // TODO: get rid of component from data
      component: component,
      key: kebabCase(name),
      text: {
        bemClass: this.generateBemClass(name),
        name: titleize(name)
      },
      defaultProps: component.defaultProps,
      props: component.propTypes,
      demoProps: {}
    };

    this.data = merge(this.data, data);
  }

  generateBemClass = (name) => {
    name = 'carbon-' + name;
    return kebabCase(name);
  }
}

export default Definition;
