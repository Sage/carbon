import React from 'react';

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
 *  <Message style='info'>text message</Message>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Message
 * @constructor
 */
class Message extends React.Component {
  static propTypes = {

    /**
     * The backgroud color.
     *
     * @property style
     * @type {String}
     * @default info
     */
    style: React.PropTypes.string.isRequired
  };

  /**
   * Getter for componet properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = this.props;
    props.className = this.componentClasses;
    delete props['style'];
    return props;
  }

  /**
   * Getter for componet classes.
   *
   * @method componentClasses
   * @return {String} class names
   */
  get componentClasses() {
    let className = this.props.className;

    let classes = (this.props.style ==='warning' ? 'ui-message--warning' : 'ui-message--info') +
        (className ? ' ' + className : '');

    return classes;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
        <div { ...this.componentProps }>
        <span className = 'ui-message__content'>
        { this.props.children }
        </span>
        </div>
    );
  }

}

export default Message;
