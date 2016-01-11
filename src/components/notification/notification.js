import React from 'react';
import Button from './../button';

class Notification extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through icon and colour
     * Can be set to 'info', 'warning', 'success'
     *
     * @property as
     * @type {String}
     * @default 'secondary'
     */
    as: React.PropTypes.string,

    /**
     * Title to be displayed.
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string.isRequired,

    /**
     * Message to be displayed.
     *
     * @property message
     * @type {String}
     */
    message: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    as: 'info'
  }

  get mainClasses() {
    let className = 'ui-notification';

    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    className += ' ui-notification--' + this.props.as;
    return className;
  }

  get buttonClasses() {
    let className = 'ui-notification__action__button';

    className += ' ui-notification__action__button--' + this.props.as;
    return className;
  }

  get buttonText() {
    let text = 'Got it!';

    if (this.props.as == 'warning') {
      text = 'Log out now';
    }

    return text;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        <div className='ui-notification__icon'>
          icon goes here
        </div>

        <div className='ui-notification__info'>
          <div className='ui-notification__title'>
            { this.props.title }
          </div>
          <div className='ui-notification__message'>
            { this.props.message }
          </div>
        </div>

        <div className='ui-notification__action'>
          <Button className={ this.buttonClasses }>{ this.buttonText }</Button> 
        </div>

      </div>
    );
  }
}

export default Notification;
