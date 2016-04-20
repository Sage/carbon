import React from 'react';
import { find, startCase, assign } from 'lodash';
import classNames from 'classnames';

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
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let InputLabel = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static contextTypes = assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  /**
   * Extends the main classes with any validation classes.
   *
   * @method mainClasses
   * @return {String} Main class names
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      { 'common-input--label-inline': this.props.labelInline }
    );
  }

  /**
   * Classes to apply to the label
   *
   * @method labelClasses
   * @return {String} classes
   */
  get labelClasses() {
    return classNames(
      'common-input__label', {
        'common-input__label--inline': this.props.labelInline,
        'common-input__label--help': this.props.labelHelp
      }
    );
  }

  get labelHelpClasses() {
    return classNames(
      super.labelHelpClasses,
      'common-input__help-text', {
        'common-input__help-text--inline': this.props.labelInline
      }
    );
  }

  /**
   * ID used for the label.
   *
   * @method labelID
   * @return {String}
   */
  get labelID() {
    return this._guid;
  }

  /**
   * Supplies the HTML for the label.
   *
   * @method labelHTML
   * @return {HTML} HTML for label.
   */
  get labelHTML() {
    if (this.props.label === false) { return; }

    // either use label supplied by dev, or automatically make one common on input name
    let labelText = this.props.label || startCase(this.props.name);

    if (!labelText) { return; }

    // set asterisk if validation is used which uses an asterisk
    if (find(this.props.validations, (v) => { return v.asterisk; })) {
      labelText += "*";
    }

    // add label width if defined
    let labelStyle = this.props.labelWidth ? { width: `${this.props.labelWidth}%` } : null;

    return (
      <label
        style={ labelStyle }
        className={ this.labelClasses }
        htmlFor={ this.inputProps.id }>
        { labelText }
      </label>
    );
  }

  get labelHelpHTML() {
    if (this.props.labelHelp) {
      return (
        <span className={ this.labelHelpClasses }>
          { this.props.labelHelp }
        </span>
      );
    }
  }

  /**
   * Extends the input props to include the ID.
   *
   * @method inputProps
   * @return {Object} Input props
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    // set id so label will focus on input when clicked
    if (!inputProps.id) {
      inputProps.id = this.labelID;
    }

    return inputProps;
  }

  /**
   * Extends the field props to include width.
   *
   * @method fieldProps
   * @return {Object} Field props
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
