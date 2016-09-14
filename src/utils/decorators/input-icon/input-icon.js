import React from 'react';
import Icon from './../../../components/icon';
import classNames from 'classnames';
import { assign } from 'lodash';

/**
 * InputIcon decorator.
 *
 * This decorator provides HTML and CSS to style an input with a button on the
 * right hand side, labelled with an icon.
 *
 * == How to use InputIcon decorator in a component:
 *
 * In your file:
 *
 *   import InputIcon from 'carbon/lib/utils/decorators/input-icon';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputIcon(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         <input />
 *         { this.inputIconHTML('settings') }
 *       </div>
 *     );
 *   }
 *
 * Note: the icon html needs to sit as a sibling to its input.
 *
 * @method InputIcon
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let InputIcon = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static propTypes = assign({}, ComposedComponent.propTypes, {});

  /**
   * Supplies the HTML for the input icon.
   *
   * @method inputIconHTML
   * @param {string} icon Which icon to render
   * @return {Object} JSX for icon
   */
  inputIconHTML = (icon) => {
    if (this.props && (this.props.readOnly || this.props.disabled)) {
      return null;
    }

    return (
      <label htmlFor={ this.inputProps.id } key="label-icon">
        <Icon type={ icon } className="carbon-input-icon" />
      </label>
    );
  }

  /**
   * Extends the main classes with any input icon classes.
   *
   * @method mainClasses
   * @return {String} Main class names
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      'common-input--with-icon'
    );
  }
};

export default InputIcon;
