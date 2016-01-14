import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';

class Flash extends React.Component {

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property cancelHandler
     * @type {Function}
     */
    cancelHandler: React.PropTypes.func,

    /**
     * Sets the open state of the flash
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * Type of notification.
     *
     * @property mode
     * @type {String}
     */
    mode: React.PropTypes.string,
  }

  state = {
  /**
   * Whether notification currently showing.
   *
   * @property active
   * @type {Boolean}
   * @default false
   */
    active: false
  }

  /**
   * Triggers close action after notification displayed.
   *
   * @method componentDidUpdate
   * @return(Void)
   */
  componentDidUpdate() {
    if (!this.state.active && this.props.open === true) {
      this.setState({ active: true });
      setTimeout(() => {
        this.props.cancelHandler()
        this.setState({active: false});
      }, 3000);
    }
  }

  /**
   * Returns classes title for the confirm, combines with dialog class names.
   *
   * @method dialogTitleClasses
   */
  get componentTitleClasses() {
    return ' ui-flash__title';
  }

  /**
   * Returns classes for the alert, combines with dialog class names..
   *
   * @method dialogClasses
   */
  get componentClasses() {
    let classes = 'ui-flash__flash';

    switch(this.props.mode) {
      case 'success':
        classes += ' ui-flash__mode--success';
        break;
      case 'error':
        classes += ' ui-flash__mode--error';
      case 'warning':
        classes += ' ui-flash__mode--warning';
        break;
      default:
        classes += ' ui-flash__mode--alert';
        break;
    }
    return classes;
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    let classes = 'ui-flash';

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
  }

  /**
   * Returns a close icon with touch handler.
   *
   * @method closeIcon
   * @return {HTML} html for close icon
   */
  get closeIcon() {
    if(!this.props.mode == 'success') {
      return <div onClick={ this.props.cancelHandler }>
               <Icon type='close' />
             </div>;
      }
  }
  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get flashHTML() {
  return <div className={ this.componentClasses }>
      <h3 className={ this.componentTitleClasses } key='message'>{ this.props.title }</h3>
    </div>;
  }

  get sliderHTML() {
    let classes = 'ui-flash-slider';

    return (
      <div className={ classes }>

      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let flashHTML, sliderHTML;

    if (this.props.open) {
      flashHTML = this.flashHTML;
      sliderHTML = this.sliderHTML;
    }

    return (
      <div className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="ui-flash__flash"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }>
          { sliderHTML }
          <ReactCSSTransitionGroup
            transitionName="ui-flash-slider"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500} >
            { flashHTML }
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Flash;
