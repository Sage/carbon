import React from 'react';
import Icon from '../../components/icon';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { tagComponent } from '../../utils/helpers/tags';

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
    as: React.PropTypes.string,

    /**
     * Determines if the toast is open.
     *
     * @property open
     * @type {Boolean}
     * @default true
     */
    open: React.PropTypes.bool,

    /**
     * Callback for when dismissed.
     *
     * @property onDismiss
     * @type {Function}
     */
    onDismiss: React.PropTypes.func
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
    if (this.props.onDismiss) {
      return (
        <Icon
          className='carbon-toast__close'
          data-element='close'
          onClick={ this.props.onDismiss }
          type='close'
        />
      );
    } else {
      return null;
    }
  }

  /**
   * Content rendered for the toast.
   *
   * @method toastContent
   */
  get toastContent() {
    if (this.props.open) {
      return (
        <div className={ this.componentClasses } { ...tagComponent('toast', this.props) }>
          <div className='carbon-toast__type'>
            <Icon className='carbon-toast__type-icon' type={ this.props.as } />
          </div>
          <div className='carbon-toast__content'>
            { this.props.children }
          </div>
          { this.dismissIcon }
        </div>
      );
    } else {
      return null;
    }
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
        transitionName='toast'
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
