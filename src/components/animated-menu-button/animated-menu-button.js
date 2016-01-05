import React from 'react';
import Icon from './../icon';
import Devices from './../../utils/helpers/devices';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * An AnimatedMenuButton widget.
 *
 * == How to use an AnimatedMenuButton in a component:
 *
 * In your file
 *
 *   import AnimatedMenuButton from 'carbon/lib/components/animated-menu-button';
 *
 * To render a AnimatedMenuButton:
 *
 *   <AnimatedMenuButton />
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
   * Handles mouse over contracted widget. Sets state to open.
   *
   * @method handleMouseOver
   * @return {void}
   */
  handleMouseEnter = () => {
    this.setState({ open: true });
    this.blockBlur = true;
  }

  /**
   * Handles mouse leaving expanded widget. Sets state to closed.
   *
   * @method handleMouseLeave
   * @return {void}
   */
  handleMouseLeave = () => {
    this.setState({ open: false });
    this.blockBlur = false;
  }

  //TODO: element not tabbable, need to manually handle focus/blur, e.g. add class 'hover'
  /**
   * Handles focus on button.
   *
   * @method handleFocus
   * @return {void}
   */
  handleFocus = () => {
    this.setState({ open: true });
    this.blockBlur = true;
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
   * Handles touch event on widget. Toggles open state.
   *
   * @method handleTouch
   * @return {void}
   */
    handleTouch = () => {
      this.setState({ open: true });
      this.blockBlur = true;
    }

    /**
     * Closes menu on touch event.
     *
     * @method closeHandler
     * @return {void}
     */
    closeHandler = () => {
      this.setState({ open: false });
      this.blockBlur = false;
    }

  /**
   * Getter for label HTML
   *
   * @method labelHTML
   * @return {HTML} HTML for label.
   */
  get labelHTML() {
    return this.props.label ?
           <span key={ this.props.label } className='ui-animated-menu-button__label'>{ this.props.label }</span> : '';
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

    return <div className='ui-animated-menu-button__content'>{ contents }</div>;
  }

  /**
   * Getter for widget's main classes.
   *
   * @method mainClasses
   * @return {String} Classnames
   */
  get mainClasses() {
    let className = this.props.className ? ' ' + this.props.className : '';

    let classes = 'ui-animated-menu-button ui-animated-menu-button--' + this.props.size +
                ' ui-animated-menu-button--' + this.props.direction + className;

    return classes;
  }

  /**
   * A getter that returns any supplied custom props along with default props.
   *
   * @method inputProps
   * @return {Object} props including class names & event handlers.
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.mainClasses;
    props.onMouseEnter = this.handleMouseEnter;
    props.onMouseLeave = this.handleMouseLeave;
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.onTouchEnd = this.state.touch ? this.handleTouch : null;
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
    return <div onClick={ this.closeHandler }>
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
      <div { ...this.inputProps }>
        <Icon type='add'/>

        <ReactCSSTransitionGroup
          transitionName='ui-animated-menu-button'
          transitionEnterTimeout={ 1000 }
          transitionLeaveTimeout={ 1000 } >
          { content }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default AnimatedMenuButton;
