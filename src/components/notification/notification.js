import React from 'react';
import Button from './../button';

class Notification extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through icon and colour
     * Can be set to 'info', 'warning', 'new'
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
    message: React.PropTypes.string.isRequired,

    /**
     * Text to display on button.
     *
     * @property buttonText
     * @type {String}
     * @default 'Got it!'
     */
    buttonText: React.PropTypes.string,

    /**
     * The action to trigger on click.
     *
     * @property buttonAction
     * @type {func}
     */
    buttonAction: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    as: 'info',
    buttonText: 'Got it!'
  }

  get mainClasses() {
    let className = `ui-notification ui-notification--${this.props.as}`;

    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return className;
  }

  get buttonClasses() {
    return `ui-notification__action__button ui-notification__action__button--${this.props.as}`;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <div className="ui-notification__content">
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
            <Button onClick={ this.props.buttonAction } className={ this.buttonClasses }>
              { this.props.buttonText }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
