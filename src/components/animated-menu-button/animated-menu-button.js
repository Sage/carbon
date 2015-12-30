import React from 'react';
import Icon from './../icon';

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
    open: false,
    touch: isTouchDevice()
  }

  /**
   * Handles mouse over contracted widget. Sets state to open.
   *
   * @method handleMouseOver
   * @return {void}
   */
  handleMouseEnter = () => {
    this.setState({ open: true });
  }

  /**
   * Handles mouse leaving expanded widget. Sets state to closed.
   *
   * @method handleMouseLeave
   * @return {void}
   */
  handleMouseLeave = () => {
    this.setState({ open: false });
  }

  //TODO: element not tabbable, need to manually handle focus/blur, e.g. add class 'hover'
  // handleFocus = () => {
  //   this.setState({ open: true });
  // }
  //
  // handleBlur = () => {
  //   this.setState({ open: false });
  // }
  /**
   * Handles touch event on widget. Toggles open state.
   *
   * @method handleTouch
   * @return {void}
   */
  handleTouch = () => {
    if (this.state.open === 'true') {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  /**
   * Getter for label Html
   *
   * @method labelHTML
   * @return {HTML} Html for label.
   */
  get labelHTML() {
    let label = this.props.label ? <span className='label'>{ this.props.label }</span> : '';
    return label;
  }

  /**
   * Getter for inner Html of menu
   *
   * @method innerHTML
   * @return {HTML} Html for menu contents.
   */
  get innerHTML() {
    let contents = [];

    contents.push(this.labelHTML);

    // If device supports touch, add close icon.
    if (this.state.touch) { contents.push(this.closeIcon); }

    contents.push(this.props.children);

    return <div className="content">{ contents }</div>;
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
    return <div onClick={ this.handleTouch }>
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
    } else {
      content = '';
    }

    return (
      <div { ...this.inputProps }>
        <Icon type='add'/>
        { content }
      </div>
    );
  }

}

export default AnimatedMenuButton;

// Private Methods

/**
 * Determines if device supports touch events.
 *
 * @method isTouchDevice
 * @private
 * @return {Boolean}
 */
function isTouchDevice() {
  return (('ontouchstart' in window)
       || (navigator.MaxTouchPoints > 0)
       || (navigator.msMaxTouchPoints > 0));
}
