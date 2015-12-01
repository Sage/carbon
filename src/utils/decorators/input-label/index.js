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
 * The label decorator adds additional props to your component for:
 *
 *  * `label` - either a string or false to turn the label off
 *  * `labelInline` - pass true to format the input/label inline
 *  * `labelWidth` - pass a percentage to define the width of the label when it
 *  is displayed inline.
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
   * Extends the main classes with any validation classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    let classes = super.mainClasses || "";

    if (this.props.labelInline) {
      classes += " common-input--label-inline";
    }

    return classes;
  }

  /**
   * Supplies the HTML for the label.
   *
   * @method labelHTML
   */
  get labelHTML() {
    if (this.props.label === false) { return; }

    // either use label supplied by dev, or automatically make one common on input name
    let labelText = this.props.label || _.startCase(this.props.name);

    // add classes for the label
    let labelClasses = "common-input__label";

    if (this.props.labelInline) {
      labelClasses += ` ${labelClasses}--inline`;
    }

    // set asterix if presence validation is applied (TODO: currently this applies to any validation)
    if (this.props.validations) {
      labelText += "*";
    }

    // add label width if defined
    let labelStyle = this.props.labelWidth ? { width: `${this.props.labelWidth}%` } : null;

    return (
      <label
        style={ labelStyle }
        className={ labelClasses }
        htmlFor={ generateInputName(this.props.name, this.context.form) }>
        { labelText }
      </label>
    );
  }

  /**
   * Extends the input props to include the ID.
   *
   * @method inputProps
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    // set id so label will focus on input when clicked
    inputProps.id = generateInputName(this.props.name, this.context.form);

    return inputProps;
  }

  /**
   * Extends the field props to include width.
   *
   * @method inputProps
   */
  get fieldProps() {
    let fieldProps = super.fieldProps || {};

    // add input width if label width is defined
    if (this.props.labelWidth) {
      let inputWidth = `${100 - this.props.labelWidth}%`;
      fieldProps.style = fieldProps.style || {};
      fieldProps.style.width = inputWidth;
    }

    return fieldProps;
  }

};

export default InputLabel;
