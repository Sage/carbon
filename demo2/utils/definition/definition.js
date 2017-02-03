import { kebabCase, assign, cloneDeep } from 'lodash';
import { classify } from 'underscore.string';
import inputDefinition from './input-definition';
import ComponentActions from './../../actions/component';

class Definition {
  constructor(name, component, data) {
    // expose component to the window for live coding
    global[classify(name)] = component;

    this.key = kebabCase(name);

    this.name = classify(name);

    this.description = '';

    this.designerNotes = '';

    this.type = '';

    // define default props set by the component
    this.defaultProps = component.defaultProps || {};

    // define all props
    this.props = Object.keys(component.propTypes) || [];

    // define default values for props
    this.propValues = {};

    // define types for non-string props
    this.propTypes = {};

    // define option sets for props that need them (ie. dropdown)
    this.propOptions = {};

    // define descriptions for particular props
    this.propDescriptions = {};

    // list all required props
    this.requiredProps = [];

    // determine if a prop should only be enabled with another prop
    this.propRequires = {};

    // props to hide from the demo
    this.hiddenProps = [];

    assign(this, data);
  }

  addChildByDefinition = (definition, propValues) => {
    if (!this.propValues.children) {
      this.propValues.children = [];
    }

    let child = cloneDeep(definition);
    assign(child.propValues, propValues);

    this.propValues.children.push(child)
  }

  stubAction = (action, prop, value) => {
    let func = "";

    let update = ComponentActions.updateDefinition;

    func += `(function stubbedAction(ev) {`;
    func += `  var fakeEvent = ev;`;

    func += `  if (${value} !== undefined && typeof ${value} !== undefined) {`;
    func += `    fakeEvent = {`;
    func += `      target: { value: ${value} }`;
    func += `    };`;
    func += `  }`;

    func += `  var update = ${update};`;

    func += `  update("${this.key}", "${prop}", fakeEvent);`;
    func += `})`;

    this.propValues[action] = eval(func);
  }

  isAnInput = () => {
    inputDefinition(this);
  }
}

export default Definition;
