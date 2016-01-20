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
    onDismiss: React.PropTypes.func,

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
    type: 'alert',
    timeout: 2000
  }

  state = {
  /**
   * Whether notification currently showing.
   * Allows component to monitor it's current state.
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

      if (this.props.type == 'success') {
        setTimeout(() => {
          this.props.onDismiss();
          this.setState({ active: false });
        }, this.props.timeout);
      }
    }
  }

  /**
   * Returns classes for message.
   *
   * @method messageClasses
   * @return {String}
   */
  get messageClasses() {
    return 'ui-flash__message';
  }

  /**
   * Returns classes for the flash.
   *
   * @method flashClasses
   * @return {String}
   */
  get flashClasses() {
    return 'ui-flash__flash';
  }

  /**
   * Returns classes for the slider.
   *
   * @method sliderClasses
   * @return {String}
   */
  get sliderClasses() {
    let classes = 'ui-flash__slider';

    classes += ` ui-flash__slider--${this.props.type}`;

    return classes;
  }

  /**
   * Returns the icon to display depending on type
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method icon
   * @return {Object} icon svg
   */
  get typeIcon() {
    let icon;

    switch(this.props.type) {
      case 'success':
        icon = successIcon();
        break;
      case 'error':
        icon = errorIcon();
        break;
      case 'warning':
        icon = warningIcon();
        break;
      default:
        icon = alertIcon();
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

    contents.push(<div className='ui-flash__icon'
                       key='typeIcon'
                       dangerouslySetInnerHTML={ this.typeIcon }>
                  </div>);

    contents.push(<h3 className={ this.messageClasses }
                      key='message'>{ this.props.message }
                  </h3>);

    if (this.props.type !== 'success') {
      contents.push(<div className='ui-flash__closeIcon' onClick={ this.props.onDismiss } key='close'>
                      <Icon type='close' />
                    </div>);
    }

    return <div className={ this.flashClasses }>
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
      <div className={ this.sliderClasses } key='slider'></div>
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

    mainClasses = ClassNames('ui-flash', this.props.className);

    if (this.props.open) {
      flashHTML = this.flashHTML;
      sliderHTML = this.sliderHTML;
    }

    return (
      <div className={ mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="ui-flash__slider"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }>
          { sliderHTML }
          <ReactCSSTransitionGroup
            transitionName="ui-flash__flash"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500} >
            { flashHTML }
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

/**
 * Returns the 'warning' icon
 * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
 *
 * @method warningIcon
 * @return {Object} warningIcon svg
 */
function warningIcon() {
  return {
    __html:
      '<svg class="ui-flash__warningIcon" width="50px" height="40px" viewBox="0 0 50 40" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
          '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<g class="ui-notification__warning-icon__g" fill="#FFFFFF">' +
                  '<path d="M23.4139163,5.53773397 C24.2898861,4.1361822 25.7118106,4.13889694 26.5860837,5.53773397 L43.4139163,32.462266 C44.2898861,33.8638178 43.6576906,35 41.9934988,35 L8.0065012,35 C6.34605644,35 5.71181059,33.8611031 6.58608373,32.462266 L23.4139163,5.53773397 Z M23,12 L27,12 L27,24 L23,24 L23,12 Z M25,32 C26.6568542,32 28,30.6568542 28,29 C28,27.3431458 26.6568542,26 25,26 C23.3431458,26 22,27.3431458 22,29 C22,30.6568542 23.3431458,32 25,32 Z" id="Icon-path"></path>' +
              '</g>' +
          '</g>' +
      '</svg>'
  };
}

/**
 * Returns the 'alert' icon
 * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
 *
 * @method alertIcon
 * @return {Object} alertIcon svg
 */
function alertIcon() {
  return {
    __html:
      '<svg class="ui-flash__alertIcon "width="50px" height="40px" viewBox="0 0 50 40">' +
        '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
          '<g class="ui-notification__info-icon__g" fill="#FFFFFF">' +
            '<path d="M35.2343942,10.801511 C34.4036528,9.97082285 34.4036528,8.61548951 35.2343942,7.78480133 L37.1582163,5.86110239 C37.3768325,5.64250024 37.2456628,5.29273679 36.9396002,5.20529593 C35.0595013,4.68065077 32.917063,5.1615755 31.4304732,6.64807014 C29.8127137,8.26572606 29.4192046,10.5829089 30.1187763,12.5503282 C30.1624995,12.6814895 30.1624995,12.8563713 30.0313298,12.9875325 L18.0074416,25.0106509 C17.876272,25.1418122 17.7451023,25.1418122 17.5702094,25.0980918 C15.5589408,24.3548445 13.2416096,24.7920488 11.6675733,26.4097047 C10.1372603,27.9399198 9.70002798,30.0385004 10.2247067,31.9621994 C10.3121532,32.2682424 10.7056623,32.3556832 10.9242784,32.1370811 L12.8481005,30.2133821 C13.6788419,29.382694 15.034262,29.382694 15.8650034,30.2133821 C16.6957448,31.0440703 16.6957448,32.3994037 15.8650034,33.2300918 L13.9411813,35.1537908 C13.7225651,35.3723929 13.8100116,35.7658768 14.1160742,35.8533177 C15.9961731,36.3779628 18.1386113,35.9407585 19.6252012,34.4105435 C21.2429607,32.7928875 21.6364697,30.4757047 20.936898,28.5082853 C20.8931748,28.3771241 20.8931748,28.2022423 21.0243445,28.071081 L33.0919559,16.0042422 C33.2231256,15.873081 33.3542953,15.873081 33.5291882,15.9168014 C35.5404568,16.6600487 37.857788,16.2228444 39.4318243,14.6051885 C40.9184141,13.1186938 41.3993696,10.9763927 40.8746908,9.09641424 C40.7872444,8.79037123 40.3937353,8.70293037 40.1751192,8.92153252 L38.2075738,10.801511 C37.3768325,11.6759196 36.0651356,11.6759196 35.2343942,10.801511 Z M20.936898,19.633038 L24.6533726,15.9168014 C24.8719887,15.6981992 24.8719887,15.3047154 24.6533726,15.0861132 L15.5589408,5.99226368 C14.3784136,4.81181206 12.2796985,4.68065077 11.0117249,5.86110239 C9.70002798,7.08527444 9.65630475,9.1838551 10.9242784,10.4517476 L20.1061567,19.633038 C20.3247728,19.8516401 20.7182819,19.8516401 20.936898,19.633038 Z M39.4755475,31.8310381 C39.388101,31.7435972 39.3006546,31.6561563 39.2132081,31.6124359 L37.5954486,30.7817477 C37.5517254,30.7380273 37.4642789,30.6943069 37.4205557,30.6505864 L29.5503743,22.780909 C29.3317582,22.5623068 28.9382491,22.5623068 28.719633,22.780909 L27.7577219,23.7427584 C27.5391058,23.9613606 27.5391058,24.3548445 27.7577219,24.5734466 L35.6279033,32.4431241 C35.6716265,32.4868445 35.7153497,32.5742854 35.759073,32.6180058 L36.5898143,34.2356617 C36.6335376,34.3231026 36.720984,34.4105435 36.8084305,34.4979843 L38.9508687,35.9407585 C39.2132081,36.1156402 39.6067172,36.0719198 39.8253333,35.8533177 L40.7872444,34.8914682 C41.0058605,34.672866 41.0495838,34.2793822 40.8746908,34.0170596 L39.4755475,31.8310381 Z" id="Icon-path">' +
            '</path>' +
         '</g>' +
        '</g>' +
      '</svg>'
  };
}

/**
 * Returns the 'success' icon
 *
 * @method successIcon
 * @return {Object} successIcon svg
 */
function successIcon() {
  return {
    __html:
    "<div><Icon type='tick' /></div>"
  };
}

/**
 * Returns the 'error' icon
 *
 * @method errorIcon
 * @return {Object} alertIcon svg
 */
function errorIcon() {
  return {
    __html:
    "<div><Icon type='error' /></div>"
  };
}
export default Flash;
