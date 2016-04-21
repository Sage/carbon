import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';

/**
 * A Message widget.
 *
 * == How to use a Message in a component:
 *
 * In your file:
 *
 *   import Message from 'carbon/lib/components/message';
 *
 * To render the Message:
 *
 *   <Message title="This is a title" open={ true }>
 *     My message content
 *   </Message>
 *
 * Additionally you can pass optional props to the Message component
 *
 *   as: Customizes the appearence of the message changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 * @class Message
 * @constructor
 */
class Message extends React.Component {
  static propTypes = {

    /**
     * Sets the theme for the component.
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'error'
     */
    as: React.PropTypes.string,

    /**
     * Determines if the message is open.
     *
     * @property open
     * @type {Boolean}
     * @default true
     */
    open: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'error',
    open: true
  }

  /**
   * Classes to be applied to the component.
   *
   * @method componentClasses
   */
  get componentClasses() {
    return classNames(
      'ui-message',
      this.props.className,
      'ui-message--' + this.props.as
    );
  }

  /**
  * HTML for the title
  *
  * @method titleHTML
  */
  get titleHTML() {
    if (this.props.title) {
      return(
        <div className='ui-message__title'>
          { this.props.title }
        </div>
      );
    }
  }

  /**
  * Content rendered for the message.
  *
  * @method messageContent
  */
  get messageContent() {
    return this.props.open ? (
      <div className={ this.componentClasses }>
        <div className="ui-message__type">
          <Icon className="ui-message__type-icon" type={ this.props.as } />
        </div>
        <div className="ui-message__content">
          { this.titleHTML }
          <div className="ui-message__body">
            { this.props.children }
          </div>
        </div>
      </div>
    ) : null;
  }

  render() {
    return (this.messageContent);
  }
}

export default Message;
