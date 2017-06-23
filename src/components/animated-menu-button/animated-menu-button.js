import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';
import tagComponent from '../../utils/helpers/tags';
import Devices from './../../utils/helpers/devices';
import { validProps } from './../../utils/ether';

/**
 * An AnimatedMenuButton widget.
 *
 * == How to use an AnimatedMenuButton in a component:
 *
 * In your file
 *
 *   import AnimatedMenuButton from 'carbon/lib/components/animated-menu-button';
 *
 * To render a AnimatedMenuButton, pass children to be rendered in the expanded menu:
 *
 *  <AnimatedMenuButton>
 *    <Row>
 *      <div>
 *        <h2 className="title">Foo</h2>
 *          <p><Link href='#'>Bar</Link></p>
 *       </div>
 *     </Row>
 *  </AnimatedMenuButton>
 *
 * @class AnimatedMenuButton
 * @constructor
 */
class AnimatedMenuButton extends React.Component {
  static propTypes = {

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The direction in which the menu expands.
     *
     * Options: right, left
     *
     * @property direction
     * @type {String}
     * @default left
     */
    direction: PropTypes.string,

    /**
     * A label to display at the top of the expanded menu.
     *
     * @property label
     * @type {String}e
     */
    label: PropTypes.string,

    /**
     * The size of the menu.
     *
     * Options: small, smed, medium, mlarge, large
     *
     * @property size
     * @type {String}
     * @default medium
     */
    size: PropTypes.string
  }

  static defaultProps = {
    direction: 'left',
    size: 'medium'
  }

  constructor(...args) {
    super(...args);

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */
    this.blockBlur = false;

    this.closeHandler = this.closeHandler.bind(this);
    this.closeIcon = this.closeIcon.bind(this);
    this.componentProps = this.componentProps.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.innerHTML = this.innerHTML.bind(this);
    this.labelHTML = this.labelHTML.bind(this);
    this.mainClasses = this.mainClasses.bind(this);
    this.openHandler = this.openHandler.bind(this);
  }


  state = {
    /**
     * Menu open or closed.
     *
     * @property open
     * @type {Boolean}
     */
    open: false,

    /**
     * Indicates if user currently on touch device
     *
     * @property touch
     * @type {Boolean}
     */
    touch: Devices.isTouchDevice()
  };

  /**
   * Getter for label HTML
   *
   * @method labelHTML
   * @return {HTML} HTML for label.
   */
  labelHTML() {
    if (this.props.label) {
      return (
        <span
          className='carbon-animated-menu-button__label'
          data-element='label'
          key='label'
        >
          { this.props.label }
        </span>
      );
    }
    return '';
  }

  /**
   * Getter for inner HTML of menu
   *
   * @method innerHTML
   * @return {HTML} HTML for menu contents.
   */
  innerHTML() {
    const contents = [];

    // If device supports touch, add close icon.
    if (this.state.touch) { contents.push(this.closeIcon()); }

    contents.push(this.labelHTML());
    contents.push(this.props.children);

    return (
      <div className='carbon-animated-menu-button__content'>
        { contents }
      </div>
    );
  }

  /**
   * Getter for widget's main classes.
   *
   * @method mainClasses
   * @return {String} Classnames
   */
  mainClasses() {
    return classNames(
      this.props.className,
      'carbon-animated-menu-button',
      `carbon-animated-menu-button--${this.props.direction}`,
      `carbon-animated-menu-button--${this.props.size}`
    );
  }

  /**
   * A getter that returns any supplied custom props along with default props.
   *
   * @method componentProps
   * @return {Object} props including class names & event handlers.
   */
  componentProps() {
    const { ...props } = validProps(this);

    delete props['data-element'];
    delete props['data-role'];

    props.className = this.mainClasses();
    props.onBlur = this.handleBlur;
    props.onFocus = this.openHandler;
    props.onMouseEnter = this.openHandler;
    props.onMouseLeave = this.closeHandler;
    props.onTouchEnd = this.state.touch ? this.openHandler : null;
    props.ref = (comp) => { this._button = comp; };
    return props;
  }

  /**
   * Returns a close icon with touch handler.
   *
   * @method closeIcon
   * @return {HTML} html for close icon
   */
  closeIcon() {
    return (
      <div
        data-element='close'
        key='close'
        onClick={ this.closeHandler }
        ref={ (comp) => { this._closeIcon = comp; } }
      >
        <Icon type='close' />
      </div>
    );
  }


  /**
   * Opens handler on event.
   *
   * @method openHandler
   * @return {void}
   */
  openHandler() {
    this.setState({ open: true });
    this.blockBlur = true;
  }

  /**
   * Closes menu on event.
   *
   * @method closeHandler
   * @return {void}
   */
  closeHandler () {
    this.setState({ open: false });
    this.blockBlur = false;
  }

  /**
   * Handles blur of expanded menu.
   *
   * @method handleBlur
   * @return {void}
   */
  handleBlur() {
    if (!this.blockBlur) { this.setState({ open: false }); }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let content;

    if (this.state.open) {
      content = this.innerHTML();
    }

    return (
      <div { ...this.componentProps() } { ...tagComponent('animated-menu-button', this.props) }>
        <Icon type='add' data-element='open' />

        <ReactCSSTransitionGroup
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          transitionName='carbon-animated-menu-button'
        >
          { content }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default AnimatedMenuButton;
