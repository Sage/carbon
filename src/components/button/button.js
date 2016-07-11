import React from 'react';
import classNames from 'classnames';
import Link from './../link';

/**
 * A button widget.
 *
 * == How to use a Button in a component:
 *
 * In your file:
 *
 *   import Button from 'carbon/lib/components/button';
 *
 * To render the Button:
 *
 *   <Button>Save</Button>
 *
 * For additional properties specific to this component, see propTypes and defaultProps.
 *
 * @class Button
 * @constructor
 */
class Button extends React.Component {

  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary' or 'secondary'.
     *
     * @property as
     * @type {String|Array}
     * @default 'secondary'
     */
    as: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),

    /**
     * A required prop. This is what the button will display.
     *
     * @property children
     * @type {Multiple}
     */
    children: React.PropTypes.node.isRequired,

    /**
     * Gives the button a disabled state.
     *
     * @property boolean
     * @type {Boolean}
     * @default false
     */
    disabled: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'secondary',
    disabled: false
  }

  /**
   * Build the element to render.
   *
   * @method element
   * @return {Object} JSX
   */
  get element() {
    let {...props} = this.props,
        // if props.href then render an anchor instead
        el = props.href || props.to ? Link : 'button',
        as = this.props.as;

    if (as.constructor === Array) {
      as = as.map((klass) => {
        return `ui-button--${klass}`;
      });
    } else {
      as = [`ui-button--${as}`];
    }

    props.className = classNames(
      'ui-button',
      ...as,
      props.className, {
        'ui-button--disabled': this.props.disabled
      }
    );

    return React.createElement(el, props, this.props.children);
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return this.element;
  }
}

export default Button;
