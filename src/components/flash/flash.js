import React from 'react';
import ClassNames from 'classnames';
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
     *
     * @property type
     * @type {String}
     */
    type: React.PropTypes.string,

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
    type: 'alert'
  }

  /**
   * Triggers close action after notification displayed.
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
    switch(this.props.type) {
      case 'success':
        return 'tick';
        break;
      case 'error':
        return 'warning';
        break;
      case 'alert':
        return 'warning';
        break;
      default:
        return this.props.type;
        break;
    }
  }

  /**
   * Returns the computed HTML for the flash.
   *
   * @method flashHTML
   * @return {Object} JSX for flash
   */
  get flashHTML() {
    let contents = [];

    contents.push(<Icon className='ui-flash__icon' type={ this.iconType } />);

    contents.push(<div className='ui-flash__message' key='message'>
                    { this.props.message }
                  </div>);

    if (!this.props.timeout) {
      contents.push(<div className='ui-flash__close-icon' onClick={ this.props.onDismiss } key='close'>
                      <Icon type='close' />
                    </div>);
    }

    return <div className='ui-flash__content'>
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
      <div className='ui-flash__slider' key='slider'></div>
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

    mainClasses = ClassNames(
      'ui-flash',
      this.props.className,
      `ui-flash--${this.props.type}`
    );

    if (this.props.open) {
      flashHTML = this.flashHTML;
      sliderHTML = this.sliderHTML;
    }

    return (
      <div className={ mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="ui-flash__slider"
          transitionEnterTimeout={ 600 }
          transitionLeaveTimeout={ 600 }>
          { sliderHTML }
          <ReactCSSTransitionGroup
            transitionName="ui-flash__content"
            transitionEnterTimeout={ 800 }
            transitionLeaveTimeout={ 600 } >
            { flashHTML }
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Flash;
