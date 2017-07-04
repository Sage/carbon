import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import Link from './../link';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

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
     * Allows a font size to be set that alters the default font size.
     * Currently only setting a smalleer font in a large button is allowed, which we do with CSS
     *
     * @property fontSize
     * @type {String}
     */
    smallFont: (props) => {
      if (props.smallFont && props.size !== 'large') {
        throw new Error('smallFont prop has no effect unless the button is large');
      } else {
        return null;
      }
    },

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
    size: PropTypes.string,

    /**
     * Allows a font size to be set that alters the default font size.
     * Currently only setting a smalleer font in a large button is allowed, which we do with CSS
     *
     * @property fontSize
     * @type {String}
     */
    subtext: (props) => {
      if (props.subtext && props.size !== 'large') {
        throw new Error('subtext prop has no effect unless the button is large');
      } else {
        return null;
      }
    }
  }

  static safeProps = ['disabled']

  static defaultProps = {
    as: 'secondary',
    size: 'medium',
    theme: 'blue',
    disabled: false,
    subtext: ''
  }

  constructor(...args) {
    super(...args);
    this.element = this.element.bind(this);
  }

  /**
   * Build the element to render.
   *
   * @method element
   * @return {Object} JSX
   */
  element() {
    let { ...props } = validProps(this);
    // if props.href then render an anchor instead
    const el = props.href || props.to ? Link : 'button';

    props.className = classNames(
      'carbon-button',
      `carbon-button--${this.props.as}`,
      `carbon-button--${this.props.theme}`,
      `carbon-button--${this.props.size}`,
      props.className, {
        'carbon-button--disabled': this.props.disabled,
        'carbon-button--small-font': this.props.smallFont,
        'carbon-button--subtext': (this.props.subtext.length > 0)
      }
    );

    props = assign({}, props, tagComponent('button', this.props));

    return React.createElement(el, props, this.buildChildren());
  }

  /**
   * Creates the child object for the button
   *
   * @return {Object} JSX
   */
  buildChildren() {
    let children = this.props.children;

    if (this.props.subtext.length > 0 && this.props.size === 'large') {
      children = ([
        <span
          className='carbon-button__main-text'
          data-element='main-text'
          key='children'
        >
          { this.props.children }
        </span>,
        <span
          className='carbon-button__subtext'
          data-element='subtext'
          key='subtext'
        >
          { this.props.subtext }
        </span>
      ]);
    }

    return children;
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
}

export default Button;
