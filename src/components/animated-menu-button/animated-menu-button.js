import React from 'react';
import Icon from './../icon';
import Devices from './../../utils/helpers/devices';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { validProps } from '../../utils/ether';

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

  /**
   * Determines if the blur event should be prevented.
   *
   * @property blockBlur
   * @type {Boolean}
   * @default false
   */
  blockBlur = false;

  static propTypes = {

    /**
     * The size of the menu.
     *
     * Options: small, smed, medium, mlarge, large
     *
     * @property size
     * @type {String}
     * @default medium
     */
    size: React.PropTypes.string,

    /**
     * The direction in which the menu expands.
     *
     * Options: right, left
     *
     * @property direction
     * @type {String}
     * @default left
     */
    direction: React.PropTypes.string,

    /**
     * A label to display at the top of the expanded menu.
     *
     * @property label
     * @type {String}e
     */
    label: React.PropTypes.string
  }

  static defaultProps = {
    size: 'medium',
    direction: 'left'
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
  }

  /**
   * Opens handler on event.
   *
   * @method openHandler
   * @return {void}
   */
  openHandler = () => {
    this.setState({ open: true });
    this.blockBlur = true;
  }

 /**
   * Closes menu on event.
   *
   * @method closeHandler
   * @return {void}
   */
  closeHandler = () => {
    this.setState({ open: false });
    this.blockBlur = false;
  }

  /**
   * Handles blur of expanded menu.
   *
   * @method handleBlur
   * @return {void}
   */
  handleBlur = () => {
    if (!this.blockBlur) { this.setState({ open: false }); }
  }

  /**
   * Getter for label HTML
   *
   * @method labelHTML
   * @return {HTML} HTML for label.
   */
  get labelHTML() {
    return this.props.label ?
           <span key="label" className='carbon-animated-menu-button__label'>{ this.props.label }</span> : '';
  }

  /**
   * Getter for inner HTML of menu
   *
   * @method innerHTML
   * @return {HTML} HTML for menu contents.
   */
  get innerHTML() {
    let contents = [];

    // If device supports touch, add close icon.
    if (this.state.touch) { contents.push(this.closeIcon); }

    contents.push(this.labelHTML);
    contents.push(this.props.children);

    return <div className='carbon-animated-menu-button__content'>{ contents }</div>;
  }

  /**
   * Getter for widget's main classes.
   *
   * @method mainClasses
   * @return {String} Classnames
   */
  get mainClasses() {
    return classNames(
      this.props.className,
      'carbon-animated-menu-button',
      `carbon-animated-menu-button--${this.props.size}`,
      `carbon-animated-menu-button--${this.props.direction}`
    );
  }

  /**
   * A getter that returns any supplied custom props along with default props.
   *
   * @method componentProps
   * @return {Object} props including class names & event handlers.
   */
  get componentProps() {
    let { ...props } = validProps(this);
    props.className = this.mainClasses;
    props.onMouseEnter = this.openHandler;
    props.onMouseLeave = this.closeHandler;
    props.onFocus = this.openHandler;
    props.onBlur = this.handleBlur;
    props.onTouchEnd = this.state.touch ? this.openHandler : null;
    props.ref = 'button';

    return props;
  }

  /**
   * Returns a close icon with touch handler.
   *
   * @method closeIcon
   * @return {HTML} html for close icon
   */
  get closeIcon() {
    return <div onClick={ this.closeHandler } ref='close' key='close'>
             <Icon type='close' />
           </div>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let content;

    // If menu closed, don't render contents
    if (this.state.open === true) {
      content = this.innerHTML;
    }

    return (
      <div { ...this.componentProps }>
        <Icon type='add'/>

        <ReactCSSTransitionGroup
          transitionName='carbon-animated-menu-button'
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { content }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default AnimatedMenuButton;
