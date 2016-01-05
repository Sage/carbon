import React from 'react';
import { isEqual, assign } from 'lodash';

/**
 * Input decorator.
 *
 * This decorator provides useful base operators for a typical input.
 *
 * == How to use Input decorator in a component:
 *
 * In your file:
 *
 *   import Input from 'carbon/lib/utils/decorators/input;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = Input(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * This decorator provides methods you can use in your component class:
 *
 *  * `mainClasses` - classes to apply to the main component element
 *  * `inputClasses` - classes to apply to the input element
 *  * `inputProps` - props to apply to the input element
 *  * `inputHTML` - the html for the actual input
 *  * `additionalInputContent` - extension point to add additional content
 *  alongside the input
 *
 * You can also change the default input type from `input` to something else,
 * for example `textarea`, by defining a `inputType` getter method in your
 * components class.
 *
 * @method Input
 */
var Input = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static contextTypes = assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  /**
   * A lifecycle method to determine if the component should re-render for better performance.
   *
   * @method shouldComponentUpdate
   */
  shouldComponentUpdate(nextProps, nextState) {
    // call super method if one is defined
    let changeDetected = super.shouldComponentUpdate ?
      super.shouldComponentUpdate(nextProps, nextState) :
      false;

    // determine if anything has changed that should result in a re-render
    if (changeDetected ||
        !isEqual(this.props, nextProps) ||
        !isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  /**
   * Calls the onChange event defined by the dev with more useful information.
   *
   * @method _handleChange
   * @prop {Event} ev
   */
  _handleOnChange = (ev) => {
    if (this.props.onChange) {
      // we also send the props so more information can be extracted by the action
      this.props.onChange(ev, this.props);
    }
  }

  /**
   * Extends main classes to add ones for the input.
   *
   * @method mainClasses
   */
  get mainClasses() {
    let classes = super.mainClasses || "";

    if (this.props.readOnly) {
      classes += ' common-input--readonly';
    }

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return `${classes} common-input`;
  }

  /**
   * Extends input classes to add ones for the input.
   *
   * @method inputClasses
   */
  get inputClasses() {
    let classes = super.inputClasses || "";
    return `${classes} common-input__input`;
  }

  /**
   * Extends input props add additional properties for the input.
   *
   * @method inputProps
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    // only thread the onChange event through the handler if the event is defined by the dev
    if (this.props.onChange === inputProps.onChange) {
      inputProps.onChange = this._handleOnChange;
    }

    return inputProps;
  }

  /**
   * Extends field props add additional properties for the containing field.
   *
   * @method fieldProps
   */
  get fieldProps() {
    let fieldProps = super.fieldProps || {};

    fieldProps.className = 'common-input__field';

    return fieldProps;
  }

  /**
   * Defaults to `input`, but a developer can override it in their own class
   * to something different.
   *
   * @method inputType
   */
  get inputType() {
    return super.inputType || 'input';
  }

  /**
   * Extension point to add additional content to the input
   *
   * @method additionalInputContent
   */
  get additionalInputContent() {
    return super.additionalInputContent || null;
  }

  /**
   * Returns HTML for the input.
   *
   * @method inputHTML
   */
  get inputHTML() {
    // builds the input with a variable input type - see `inputType`
    let input = React.createElement(this.inputType, { ...this.inputProps });

    return (
      <div { ...this.fieldProps }>
        { input }
        { this.additionalInputContent }
      </div>
    );
  }

};

export default Input;
