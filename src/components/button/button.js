import React, { PropTypes} from 'react';
import classNames from 'classnames';
import Link from './../link';
import { assign } from 'lodash';
import { validProps } from '../../utils/ether';
import { tagComponent } from '../../utils/helpers/tags';

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
 *  ### Themes
 *
 *  Currently available button themese are blue(default), green, red, magenta, grey & white.
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
    as: PropTypes.string,

    /**
     * A required prop. This is what the button will display.
     *
     * @property children
     * @type {Multiple}
     */
    children: PropTypes.node.isRequired,

    /**
     * Gives the button a disabled state.
     *
     * @property disabled
     * @type {Boolean}
     * @default false
     */
    disabled: PropTypes.bool,

    /**
     * Gives the button a color.
     *
     * @property theme
     * @type {String}
     * @default blue
     */
    theme: PropTypes.string,

    /**
     * Determines size of button.
     *
     * @property size
     * @type {String}
     * @default medium
     */
    size: PropTypes.string
  }

  static safeProps = ['disabled']

  static defaultProps = {
    as:       'secondary',
    size:     'medium',
    theme:    'blue',
    disabled: false
  }

  constructor(...args) {
    super(...args);
    this.element = this.element.bind(this);
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return this.element();
  }

  /**
   * Build the element to render.
   *
   * @method element
   * @return {Object} JSX
   */
  element() {
    let { ...props } = validProps(this);

    delete props.columnAlign;
    // if props.href then render an anchor instead
    const el = props.href || props.to ? Link : 'button';

    props.className = classNames(
      'carbon-button',
      `carbon-button--${this.props.as}`,
      `carbon-button--${this.props.theme}`,
      `carbon-button--${this.props.size}`,
      props.className, {
        'carbon-button--disabled': this.props.disabled
      }
    );

    props = assign({}, props, tagComponent('button', this.props));

    return React.createElement(el, props, this.props.children);
  }
}

export default Button;
