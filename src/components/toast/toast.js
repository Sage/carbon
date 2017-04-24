import React from 'react';
import PropTypes from 'prop-types';
import Icon from './../icon';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
* A Toast widget.
*
* == How to use a Toast in a component:
*
* In your file:
*
*   import Toast from 'carbon/lib/components/toast'
*
* To render the Toast:
*
*   <Toast open={ true } onDismiss={ this.dismissHandler } as='info'>
*     My toast content
*   </Toast>
*
* Additionally you can pass optional props to the Toast component
*
*   as: Customizes the appearence of the toast changing the colour
*       (see the 'iconColorSets' for possible values).
*
* @class Toast
* @constructor
*/
class Toast extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through colour
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'warning'
     */
    as: PropTypes.string,

    /**
     * Determines if the toast is open.
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
    onDismiss: PropTypes.func
  }

  static defaultProps = {
    as: 'warning',
    open: true
  }

  /**
   * Classes to be applied to the component.
   *
   * @method componentClasses
   */
  get componentClasses() {
    return classNames(
      'carbon-toast',
      this.props.className,
      'carbon-toast--' + this.props.as
    );
  }

  /**
   * Content rendered for dismiss X
   *
   * @method dismissIcon
   */
  get dismissIcon() {
    return this.props.onDismiss ? (
      <Icon className="carbon-toast__close" type="close" onClick={ this.props.onDismiss } />
    ) : null;
  }

  /**
   * Content rendered for the toast.
   *
   * @method toastContent
   */
  get toastContent() {
    return this.props.open ? (
      <div className={ this.componentClasses }>
        <div className="carbon-toast__type"><Icon className="carbon-toast__type-icon" type={ this.props.as } /></div>

        <div className="carbon-toast__content">
          { this.props.children }
        </div>

        { this.dismissIcon }
      </div>
    ) : null;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionAppear={ true }
        transitionName="toast"
        transitionAppearTimeout={ 1600 }
        transitionEnterTimeout={ 1500 }
        transitionLeaveTimeout={ 500 }
      >
        { this.toastContent }
      </ReactCSSTransitionGroup>
    );
  }

}

export default Toast;
