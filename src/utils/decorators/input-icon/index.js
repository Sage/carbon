import React from 'react';
import Icon from './../../../components/icon';

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
 * Note: if you are using the Input decorator as well, it will take care of rendering
 * the InputIcon for you.
 *
 * @method InputIcon
 */
let InputIcon = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  /**
   * Supplies the HTML for the input icon.
   *
   * @method inputIconHTML
   * @param {string} icon Which icon to render
   */
  inputIconHTML = (icon) => {
    if (this.props && (this.props.readOnly || this.props.disabled)) {
      return null;
    }

    return (
      <label htmlFor={ this.inputProps.id }>
        <Icon type={ icon } className="ui-input-icon" />
      </label>
    );
  }

};

export default InputIcon;
