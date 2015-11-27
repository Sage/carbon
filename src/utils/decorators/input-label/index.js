import React from 'react';
import { generateInputName } from './../../helpers/forms';
import _ from 'lodash';

/**
 * InputLabel decorator.
 *
 * This decorator provides HTML for input labels.
 *
 * == How to use InputLabel decorator in a component:
 *
 * In your file:
 *
 *   import InputLabel from 'carbon/lib/utils/decorators/input-label';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputLabel(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         { this.labelHTML() }
 *         <input />
 *       </div>
 *     );
 *   }
 *
 * @method InputIcon
 */
let InputLabel = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  /**
   * Supplies the HTML for the label.
   *
   * @method labelHTML
   */
  get labelHTML() {
    if (this.props.label === false) { return; }

    // either use label supplied by dev, or automatically make one based on input name (TODO: use lodash to gen a better name)
    let labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    // set asterix if presence validation is applied (TODO: currently this applies to any validation)
    if (this.props.validations) {
      labelText += "*";
    }

    return (
      <label className="base-input__label" htmlFor={ generateInputName(this.props.name, this.context.form) }>{ labelText }</label>
    );
  }

  /**
   * Extends the input props to include the ID.
   *
   * @method inputProps
   */
  get inputProps() {

    let inputProps = (super.inputProps) ? super.inputProps : {};

    // set id so label will focus on input when clicked
    inputProps.id = generateInputName(this.props.name, this.context.form);

    return inputProps;
  }

};

export default InputLabel;
