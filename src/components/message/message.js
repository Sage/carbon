import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../icon';
import { tagComponent } from '../../utils/helpers/tags';

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
     * @default 'info'
     */
    as: PropTypes.string,

    /**
     * Determines if a border is applied to the message
     *
     * @property border
     * @type {Boolean}
     * @default true
     */
    border: PropTypes.bool,

    /**
     * The body of the message content
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node.isRequired,

    /**
     * Add classes to the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Determines if the message is open.
     *
     * @property open
     * @type {Boolean}
     * @default true
     */
    open: PropTypes.bool,

    /**
     * Callback for when dismissed.
     *
     * @property onDismiss
     * @type {Function}
     */
    onDismiss: PropTypes.func,

    /**
     * Determines if the corners of the message are rounded
     *
     * @property roundedCorners
     * @type {Boolean}
     * @default true
     */
    roundedCorners: PropTypes.bool,

    /**
     * Add a title to this component
     *
     * @property title
     * @type {String}
     */
    title: PropTypes.string,

    /**
     * Determines if the message background is transparent or filled defined by the as property.
     *
     * @property transparent
     * @type {Boolean}
     * @default false
     */
    transparent: PropTypes.bool
  }

  static defaultProps = {
    as: 'info',
    transparent: false,
    open: true,
    roundedCorners: true,
    border: true
  }

  /**
   * Classes to be applied to the component.
   *
   * @method componentClasses
   */
  get componentClasses() {
    return classNames(
      'carbon-message',
      this.props.className,
      `carbon-message--${this.props.as}`,
      {
        'carbon-message--rounded': this.props.roundedCorners,
        'carbon-message--border': this.props.border,
        'carbon-message--transparent': this.props.transparent,
        'carbon-message--dismissable': this.props.onDismiss
      }
    );
  }

  /**
   * Content rendered for dismiss X
   *
   * @method dismissIcon
   */
  get dismissIcon() {
    const onDismiss = this.props.onDismiss;
    if (onDismiss) {
      return (
        <Icon
          className='carbon-message__close'
          data-element='dismiss'
          onClick={ onDismiss }
          type='close'
        />
      );
    }
    return null;
  }

  /**
  * HTML for the title
  *
  * @method titleHTML
  */
  get titleHTML() {
    const title = this.props.title;
    if (title) {
      return (
        <div className='carbon-message__title' data-element='title'>
          { title }
        </div>
      );
    }
    return null;
  }

  /**
   * Classes to be applied to type background.
   *
   * @method componentClasses
   */
  get typeClasses() {
    return classNames(
      'carbon-message__type', {
        'carbon-message__type--rounded': this.props.roundedCorners
      }
    );
  }

  /**
  * Content rendered for the message.
  *
  * @method messageContent
  */
  get messageContent() {
    const open = this.props.open;
    if (open) {
      return (
        <div className={ this.componentClasses } { ...tagComponent('message', this.props) }>
          <div className={ this.typeClasses }>
            <Icon className='carbon-message__type-icon' type={ this.props.as } />
          </div>
          <div className='carbon-message__content'>
            { this.titleHTML }
            <div className='carbon-message__body'>
              { this.props.children }
            </div>
          </div>

          { this.dismissIcon }
        </div>
      );
    }
    return null;
  }

  render() {
    return (this.messageContent);
  }
}

export default Message;
