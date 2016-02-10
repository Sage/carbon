import React from 'react';
import classNames from 'classnames';

/**
 * A Message widget.
 *
 * == How to use a Message in a component:
 *
 * In your file:
 *
 *   import Message from 'components/message;
 *
 * To render the Message:
 *
 *  <Message as='info'>text message</Message>
 *
 * For additional properties specific to this component, see propTypes.
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
     * @default info
     */
    as: React.PropTypes.string
  }

  static defaultProps = {
    as: 'info'
  }

  /**
   * Getter for component properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = this.props;
    props.className = this.componentClasses;
    return props;
  }

  /**
   * Getter for component classes.
   *
   * @method componentClasses
   * @return {String} class names
   */
  get componentClasses() {
    return classNames(
      'ui-message',
      this.props.className,
      'ui-message--' + this.props.as
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div { ...this.componentProps }>
        { this.props.children }
      </div>
    );
  }

}

export default Message;
