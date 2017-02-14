import { kebabCase, assign, cloneDeep } from 'lodash';
import { classify } from 'underscore.string';
import inputDefinition from './input-definition';
import modalDefinition from './modal-definition';
import tableDefinition from './table-definition';
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

    // define how many times the demo should be repeated
    this.numberOfExamples = 1;

    // define props that will toggle a stubbed function
    this.toggleFunctions = [];

    // define any associated definitions
    this.associatedDefinitions = [];

    // define default props set by the component
    this.defaultProps = component.defaultProps || {};

    // define all props
    this.props = Object.keys(component.propTypes || []);

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

    func += `
(function stubbedAction(ev) {
  var fakeEvent = ev;

  if (${value} !== undefined && typeof ${value} !== undefined) {
    fakeEvent = {
      target: { value: ${value} }
    };
  }

  var update = ${update};

  update("${this.key}", "${prop}", fakeEvent);
})`;

    this.propValues[action] = eval(func);
  }

  isAnInput = () => {
    inputDefinition(this);
  }

  isAModal = () => {
    modalDefinition(this);
  }

  isATable = () => {
    tableDefinition(this);
  }
}

export default Definition;
