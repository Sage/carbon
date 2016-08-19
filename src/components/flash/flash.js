import React from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';

/**
 * A Flash widget.
 *
 * The flash is rendered in two sections: a ventral message 'flash', and a
 * dorsal coloured, expanding 'slider'.
 *
 * == How to use an Flash in a component:
 *
 * In your file
 *
 *   import Flash from 'carbon/lib/components/flash';
 *
 * To render a Flash, setup open and cancel handlers in your view to trigger
 * the message on and off:
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' />
 *
 * By default, the flash renders with a clickable close icon that hooks up with the onDismiss function.
 *
 * To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' timeout={ 2000 }/>
 *
 * @class Flash
 * @constructor
 */
class Flash extends React.Component {

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property onDismiss
     * @type {Function}
     */
    onDismiss: React.PropTypes.func.isRequired,

    /**
     * Sets the open state of the flash.
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * Type of notification.
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'success'
     */
    as: React.PropTypes.string,

    /**
     * Contents of message.
     *
     * @property message
     * @type {String}
     */
    message: React.PropTypes.string.isRequired,

    /**
     * Time for flash to remain on screen
     *
     * @property timeout
     * @type {Number} in milliseconds
     */
    timeout: React.PropTypes.number
  }

  static defaultProps = {
    as: 'success'
  }

  /**
   *  Conditionally triggers close action after flash displayed.
   *
   * @method componentDidUpdate
   * @return(Void)
   */
  componentDidUpdate(prevProps) {
    if (this.props.timeout && this.props.open === true) {
      if (prevProps.open != this.props.open) {
        setTimeout(() => {
          this.props.onDismiss();
        }, this.props.timeout);
      }
    }
  }

  /**
   * Returns the icon to display depending on type
   *
   * @method iconType
   * @return {String}
   */
  get iconType() {
    let icon;

    switch(this.props.as) {
      case 'success':
        icon = 'tick';
        break;
      case 'error':
        icon = 'warning';
        break;
      default:
        icon = this.props.as;
        break;
    }
    return icon;
  }

  /**
   * Returns the computed HTML for the flash.
   *
   * @method flashHTML
   * @return {Object} JSX for flash
   */
  get flashHTML() {
    let contents = [];

    contents.push(<Icon className='carbon-flash__icon' type={ this.iconType } key="icon" />);

    contents.push(<div className='carbon-flash__message' key='message'>
                    { this.props.message }
                  </div>);

    if (!this.props.timeout) {
      contents.push(<div className='carbon-flash__close-icon' onClick={ this.props.onDismiss } key='close'>
                      <Icon type='close' />
                    </div>);
    }

    return <div className='carbon-flash__content'>
             { contents }
           </div>;
  }

  /**
   * Returns the computed HTML for the slider.
   *
   * @method flashHTML
   * @return {Object} JSX for flash
   */
  get sliderHTML() {
    return (
      <div className='carbon-flash__slider' key='slider'></div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let flashHTML, sliderHTML, mainClasses;

    mainClasses = classNames(
      'carbon-flash',
      this.props.className,
      `carbon-flash--${this.props.as}`
    );

    if (this.props.open) {
      flashHTML = this.flashHTML;
      sliderHTML = this.sliderHTML;
    }

    return (
      <div className={ mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="carbon-flash__slider"
          transitionEnterTimeout={ 600 }
          transitionLeaveTimeout={ 600 }>
          { sliderHTML }
          <ReactCSSTransitionGroup
            transitionName="carbon-flash__content"
            transitionEnterTimeout={ 800 }
            transitionLeaveTimeout={ 500 } >
            { flashHTML }
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Flash;
