import React from 'react';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import tagComponent from '../../utils/helpers/tags/tags';
import Portal from '../portal/portal';
import { ToastStyle, ToastTypeStyle, ToastContentStyle } from './toast.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import './toast.scss';

class Toast extends React.Component {
  /** Classes to be applied to the component. */
  get componentClasses() {
    return classNames(
      // 'carbon-toast',
      this.props.className,
      // `carbon-toast--${this.props.as}`
    );
  }

  /** Content rendered for dismiss X */
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
    }
    return null;
  }

  /** Content rendered for the toast. */
  get toastContent() {
    if (this.props.open) {
      return (
        <ToastStyle
          toastType={ this.props.toastType || this.props.as } className={ this.componentClasses }
          { ...tagComponent('toast', this.props) }
        >
          {/* <div className='carbon-toast__type'> */}
          <ToastTypeStyle toastType={ this.props.toastType || this.props.as }>
            <Icon className='carbon-toast__type-icon' type={ this.props.toastType || this.props.as } />
          </ToastTypeStyle>
          <ToastContentStyle>
            { this.props.children }
          </ToastContentStyle>
          { this.dismissIcon }
        </ToastStyle>
      );
    }
    return null;
  }

  /** Renders the component. */
  render() {
    return (
      <Portal>
        <CSSTransitionGroup
          component='div'
          transitionAppear
          transitionName='toast'
          transitionAppearTimeout={ 1600 }
          transitionEnterTimeout={ 1500 }
          transitionLeaveTimeout={ 500 }
        >
          { this.toastContent }
        </CSSTransitionGroup>
      </Portal>
    );
  }
}

Toast.propTypes = {
  toastType: PropTypes.oneOf(OptionsHelper.colors),
  /** Customizes the appearance in a legacy theme through colour see the 'iconColorSets' for possible values) */
  as: PropTypes.string,
  /** Custom className */
  className: PropTypes.string,
  /** The rendered children of the component. */
  children: PropTypes.node,
  /** Determines if the toast is open. */
  open: PropTypes.bool,
  /** Callback for when dismissed. */
  onDismiss: PropTypes.func
};

Toast.defaultProps = {
  as: 'warning',
  className: '',
  onDismiss: null,
  open: true
};

export default Toast;
