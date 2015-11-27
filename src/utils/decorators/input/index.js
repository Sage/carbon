import React from 'react';
import _ from 'lodash';
import { generateInputName } from './../../helpers/forms';

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
 * @method Input
 */
var Input = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static propTypes = _.assign({}, ComposedComponent.propTypes, {
    /**
     * The name of your input
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string.isRequired
  })

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
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
        !_.isEqual(this.props, nextProps) ||
        !_.isEqual(this.state, nextState)) {
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
    return `${classes} base-input`;
  }

  /**
   * Extends input classes to add ones for the input.
   *
   * @method inputClasses
   */
  get inputClasses() {
    let classes = super.inputClasses || "";
    return `${classes} base-input__input`;
  }

  /**
   * Extends input props add additional properties for the input.
   *
   * @method inputClasses
   */
  get inputProps() {
    var inputProps = (super.inputProps) ? super.inputProps : {};

    // redefine the input name relative to the form
    inputProps.name = generateInputName(this.props.name, this.context.form);

    // only thread the onChange event through the handler if the event is defined by the dev
    if (this.props.onChange === inputProps.onChange) {
      inputProps.onChange = this._handleOnChange;
    }

    return inputProps;
  }

};

export default Input;
