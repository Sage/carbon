import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { assign, union } from 'lodash';
import css from './../../css';
import shouldComponentUpdate from './../../helpers/should-component-update';
import guid from './../../helpers/guid';
import Icon from './../../../components/icon';
import Help from './../../../components/help';

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
 * Inputs also accept a prop of `prefix` which outputs a prefix to the input:
 *
 *   <Textbox prefix='foo' />
 *
 * Inputs also accept a prop of `icon` which outputs an icon inside the input:
 *
 *   <Textbox icon='foo' />
 *
 * @method Input
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
const Input = ComposedComponent => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);

    /**
     * A unique identifier for the input.
     *
     * @prop _guid
     * @return {String}
     */
    this._guid = guid();
  }

  static contextTypes = assign({}, ComposedComponent.contextTypes, {
    form: PropTypes.object
  });

  static propTypes = assign({}, ComposedComponent.propTypes, {});
  // common safeprops
  static safeProps = union([], ComposedComponent.safeProps, ['value']);


  /**
   * A lifecycle method for when the component has rendered.
   *
   * @method componentWillReceiveProps
   * @return {void}
   */
  componentDidMount() {
    // call the components super method if it exists
    /* istanbul ignore else */
    if (super.componentDidMount) { super.componentDidMount(); }

    if (this.props.prefix) {
      this.setTextIndentation();
    }
  }

  /**
   * A lifecycle method for when the component has re-rendered.
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate(prevProps, prevState) {
    // call the components super method if it exists
    if (super.componentDidUpdate) { super.componentDidUpdate(prevProps, prevState); }

    if (this.props.prefix !== prevProps.prefix || this.props.icon !== prevProps.icon) {
      this.setTextIndentation();
    }
  }

  /**
   * A lifecycle method to determine if the component should re-render for better performance.
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps the updated props
   * @param {Object} nextState the updated state
   * @return {Boolean} true if the component should update
   */
  shouldComponentUpdate(nextProps, nextState) {
    // call super method if one is defined
    let changeDetected = false;

    if (super.shouldComponentUpdate) {
      changeDetected = super.shouldComponentUpdate(nextProps, nextState);
    }

    // determine if anything has changed that should result in a re-render
    if (changeDetected || shouldComponentUpdate(this, nextProps, nextState)) {
      return true;
    }

    return false;
  }

  /**
   * Calls the onChange event defined by the dev with more useful information.
   *
   * @method _handleChange
   * @param {Event} ev the change event
   * @returns {void}
   */
  _handleOnChange = (ev) => {
    if (this.props.onChange) {
      // we also send the props so more information can be extracted by the action
      this.props.onChange(ev, this.props);
    }
  }

  /**
   * Sets indentation of input value based on prefix width.
   *
   * @method setTextIndentation
   * @return {void}
   */
  setTextIndentation = () => {
    if (this._input) {
      if (this._prefix) {
        this._input.style.paddingLeft = `${this._prefix.offsetWidth + 11}px`;
      } else {
        this._input.style.paddingLeft = '';
      }
    }
  }

  /**
   * Extends main classes to add ones for the input.
   *
   * @method mainClasses
   * @return {String} Main class names
   */
  get mainClasses() {
    const classes = super.mainClasses;

    return classNames(classes, this.props.className, css.input, {
      [`${css.input}--readonly`]: this.props.readOnly,
      [`${css.input}--align-${this.props.align}`]: this.props.align,
      [`${css.input}--with-prefix`]: this.props.prefix,
      [`${css.input}--with-input-help`]: this.props.inputHelp,
      [`${css.input}--disabled`]: this.props.disabled
    });
  }

  /**
   * Extends input classes to add ones for the input.
   *
   * @method inputClasses
   * @return {String} Input class names
   */
  get inputClasses() {
    const classes = super.inputClasses || '';
    return `${classes} common-input__input`;
  }

  /**
   * Extends input props add additional properties for the input.
   *
   * @method inputProps
   * @return {Object} Input props
   */
  get inputProps() {
    const inputProps = super.inputProps || {};

    // store ref to input
    inputProps.ref = (c) => { this._input = c; };

    // disable autoComplete (causes performance issues in IE)
    inputProps.autoComplete = this.props.autoComplete || 'off';

    // only thread the onChange event through the handler if the event is defined by the dev
    if (this.props.onChange === inputProps.onChange) {
      inputProps.onChange = this._handleOnChange;
    }

    // Pass onPaste action to input element
    inputProps.onPaste = this.props.onPaste;

    // Adds data tag for automation
    inputProps['data-element'] = 'input';

    // Remove data-role as this should be applied on the top level element
    delete inputProps['data-role'];

    return inputProps;
  }

  /**
   * Extends field props add additional properties for the containing field.
   *
   * @method fieldProps
   * @return {Object} Field props
   */
  get fieldProps() {
    const fieldProps = super.fieldProps || {};

    fieldProps.className = 'common-input__field';

    return fieldProps;
  }

  /**
   * Defaults to `input`, but a developer can override it in their own class
   * to something different.
   *
   * @method inputType
   * @return {String} HTML input type
   */
  get inputType() {
    return super.inputType || 'input';
  }

  /**
   * Extension point to add additional content to the input
   *
   * @method additionalInputContent
   * @return {Object | HTML | String | Number} additional content from composed class
   */
  get additionalInputContent() {
    return super.additionalInputContent || null;
  }

  /**
   * Adds a prefix if it is defined
   *
   * @method prefixHTML
   * @return {Object}
   */
  get prefixHTML() {
    if (!this.props.prefix) { return null; }

    return (
      <div ref={ (c) => { this._prefix = c; } } className='common-input__prefix'>
        { this.props.prefix }
      </div>
    );
  }

  /**
   * Adds an icon if it is defined
   *
   * @method iconHTML
   * @return {Object}
   */
  get iconHTML() {
    if (!this.props.icon) { return null; }

    return (
      <div className='common-input__input-icon'>
        <Icon type={ this.props.icon } />
      </div>
    );
  }

    /**
   * Supplies the HTML for inputHelp component
   *
   * @method inputHelpHTML
   * @return {Object} JSX for help
   */
  get inputHelpHTML() {
    if (!this.props.inputHelp) { return null; }
    return (
      <Help
        className='common-input__input-help'
        tooltipPosition={ this.props.inputHelpPosition }
        tooltipAlign={ this.props.inputHelpAlign }
        href={ this.props.inputHelpHref }
      >
        { this.props.inputHelp }
      </Help>
    );
  }

  /**
   * Returns HTML for the input.
   *
   * @method inputHTML
   * @return {HTML} HTML for input
   */
  get inputHTML() {
    let input;
    if (this.props.fakeInput) {
      // renders a fake input - useful for screens with lots of inputs
      const classes = classNames(this.inputProps.className, 'common-input__input--fake');
      input = (
        <div className={ classes } onMouseOver={ this.inputProps.onMouseOver }>
          { this.inputProps.value || this.inputProps.placeholder }
        </div>
      );
    } else {
      // builds the input with a variable input type - see `inputType`
      input = React.createElement(this.inputType, { ...this.inputProps });
    }

    return (
      <div { ...this.fieldProps }>
        { this.iconHTML }
        { this.prefixHTML }
        { input }
        { this.additionalInputContent }
        { this.inputHelpHTML }
      </div>
    );
  }

};

export default Input;
