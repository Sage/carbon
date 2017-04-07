import React from 'react';
import shouldComponentUpdate from './../../utils/helpers/should-component-update';
import I18n from 'i18n-js';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './../icon';
import Alert from './../alert';
import Link from './../link';
import { isObject, isArray, forEach } from 'lodash';

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
 * The flash message can be formatted in the following ways:
 *
 *  * A string: "Alert"
 *  * An array: ["Message One", "Message Two"]
 *  * An object with description: { description: "My description" }
 *  * An object of key/value pairs: { first_name: "is required", last_name: "is required" }
 *  * An object with description with nested key/value pairs:
 *    { description: { first_name: "is required", last_name: "is required" } }
 *
 * If a message is too long, it can be proxied to a dialog by adding `::more::` in your description.
 *
 *  let message = "This is too long ::more:: This sentence is proxied to a dialog."
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
     * @type {String|Object|Array}
     */
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
      React.PropTypes.array
    ]).isRequired,

    /**
     * Time for flash to remain on screen
     *
     * @property timeout
     * @type {Number} in milliseconds
     */
    timeout: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
  }

  static defaultProps = {
    as: 'success'
  }

  /**
   * A timeout for when a flash should auto-dismiss
   *
   * @property timeout
   * @type {Timer}
   */
  timeout = null

  /**
   * Keeps track of additional dialogs to render for "more info" links
   *
   * @property dialogs
   * @type {Array}
   */
  dialogs = []

  state = {
    /**
     * Keeps track on the open state of each dialog
     *
     * @property dialogs
     * @type {Object}
     */
    dialogs: {}
  }

  /**
   * Determines if the component should be updated or not. Required for this component
   * as it determines if the timeout should be reset or not.
   *
   * @method shouldComponentUpdate
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  /**
   * Resets the dialog open states if flash is opened/closed.
   *
   * @method componentWillReceiveProps
   * @return(Void)
   */
  componentWillReceiveProps(prevProps) {
    if (prevProps.open != this.props.open) {
      this.setState({ dialogs: {} });
    }
  }

  /**
   * Conditionally triggers close action after flash displayed.
   *
   * @method componentDidUpdate
   * @return(Void)
   */
  componentDidUpdate() {
    // reset dialogs to render
    this.dialogs = [];
    this.startTimeout();
  }

  /**
   * Starts the timer to auto dismiss flash messages.
   *
   * @method startTimeout
   * @return(Void)
   */
  startTimeout = () => {
    this.stopTimeout();

    if (this.shouldStartTimeout()) {
      this.timeout = setTimeout(() => {
        this.props.onDismiss();
      }, this.props.timeout);
    }
  }

  /**
   * Determines if the timeout should be started.
   *
   * @method shouldStartTimeout
   * @return {Boolean}
   */
  shouldStartTimeout = () => {
    if (!this.props.timeout || !this.props.open) { return false; }

    let shouldStartTimeout = true;

    for (let key in this.state.dialogs) {
      if (this.state.dialogs[key]) {
        shouldStartTimeout = false;
      }
    }

    return shouldStartTimeout;
  }

  /**
   * Stops the timer to auto dismiss flash messages.
   *
   * @method stopTimeout
   * @return(Void)
   */
  stopTimeout = () => {
    clearTimeout(this.timeout);
  }

  /**
   * Opens/closes the dialog for the given key.
   *
   * @method toggleDialog
   * @param {String} key
   * @param {Object} ev
   * @return(Void)
   */
  toggleDialog = (key, ev) => {
    if (ev) { ev.preventDefault(); }

    let state = this.state.dialogs[key];
    // open/close the dialog
    this.setState({ dialogs: { [key]: !state }});

    // start/stop the timer if the dialog opens or closes
    if (state) {
      this.startTimeout();
    } else {
      this.stopTimeout();
    }
  }

  /**
   * Given a description, format it accordingly.
   *
   * @method toggleDialog
   * @param {String} description
   * @return {HTML}
   */
  formatDescription = (description) => {
    let object = isObject(description),
        array = isArray(description);

    this.dialogs = [];

    if (array || object) {
      let items = [];

      // iterate through the object or array
      forEach(description, (value, key) => {
        let itemValue;

        // pass the value through the find more parser
        value = this.findMore(value);

        if (!array && !/(^base|\.base)$/.test(key)) {
          // if object, apply key to each item
          itemValue = <span>{ key }: { value }</span>;
        } else {
          // otherwise just set value
          itemValue = value;
        }

        // add item to list
        items.push(<li key={ key }>{ itemValue }</li>);
      });

      return <ul>{ items }</ul>;
    } else {
      // if just a string, pass it through the find more parser
      return this.findMore(description);
    }
  }

  /**
   * Splits the string and sets additional content inside a dialog.
   *
   * @method findMore
   * @param {String} text
   * @return {HTML}
   */
  findMore = (text) => {
    if (typeof text != 'string') { return text; }

    // detect any instances of "::more::" in the text
    let parts = text.split('::more::');

    if (parts.length > 1) {
      let title = parts[0].trim(),
          desc = parts[1].trim(),
          info = I18n.t('notifications.more_info', { defaultValue: "More Information" });

      // create dialog for additional content
      this.dialogs.push(
        <Alert
          key={ title }
          title={ title }
          open={ this.state.dialogs[title] || false }
          onCancel={ this.toggleDialog.bind(this, title) }
        >
          { desc }
        </Alert>
      );

      // create text for item
      text = (
        <span>
          { title }&nbsp;
          <Link onClick={ this.toggleDialog.bind(this, title) } className="carbon-flash__link">
            { info }
          </Link>
        </span>
      );
    }

    return text;
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
      default:
        icon = this.props.as;
        break;
    }
    return icon;
  }

  /**
   * Parses the message object to get the appropriate description
   *
   * @method description
   * @return {String}
   */
  get description() {
    let message = this.props.message;

    if (isObject(message) && message.description) {
      // if defined, return description
      return message.description;
    }

    // otherwise, just return itself
    return message;
  }

  /**
   * Returns the computed HTML for the flash.
   *
   * @method flashHTML
   * @return {Object} JSX for flash
   */
  get flashHTML() {
    let contents = [];

    // add icon
    contents.push(<Icon className='carbon-flash__icon' type={ this.iconType } key="icon" />);

    // add message content
    contents.push(
      <div className='carbon-flash__message' key='message'>
        { this.formatDescription(this.description) }
      </div>
    );

    // if auto-dismiss is not enabled, add a close icon
    if (!this.props.timeout) {
      contents.push(
        <Icon className="carbon-flash__close" type="close" onClick={ this.props.onDismiss }  key='close'/>
      );
    }

    return (
      <div className='carbon-flash__content'>
        { contents }
      </div>
    );
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
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-flash',
      this.props.className,
      `carbon-flash--${this.props.as}`
    );
  }

  /**
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
      <div>
        <div className={ this.classes }>
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

        { this.dialogs }
      </div>
    );
  }
}

export default Flash;
