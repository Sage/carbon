import React from 'react';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags/tags';
import Portal from '../portal/portal';
import {
  ToastStyle, ToastTypeStyle, ToastContentStyle, ToastWrapper
} from './toast.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import DismissButton from '../dismiss-button';

class Toast extends React.Component {
  /** Classes to be applied to the component. */
  get componentClasses() {
    return classNames(
      this.props.className,
    );
  }

  /** Content rendered for dismiss X */
  get dismissIcon() {
    if (this.props.onDismiss) {
      return (
        <DismissButton
          data-element='close'
          onDismiss={ this.props.onDismiss }
          type='close'
          variant={ this.props.variant || this.props.as }
        />
      );
    }
    return null;
  }

  /** Content rendered for the toast. */
  toastContent() {
    if (this.props.open) {
      return (
        <CSSTransition
          enter
          classNames='toast'
          timeout={ { appear: 1600, enter: 1500, exit: 500 } }
        >
          <ToastStyle
            isCenter={ this.props.isCenter }
            variant={ this.props.variant || this.props.as }
            className={ this.componentClasses }
            { ...tagComponent((this.props['data-component'] || 'toast'), this.props) }
          >
            <ToastTypeStyle variant={ this.props.variant || this.props.as }>
              <Icon type={ this.props.variant || this.props.as } />
            </ToastTypeStyle>
            <ToastContentStyle
              variant={ this.props.variant || this.props.as }
              isDismiss={ this.props.onDismiss }
            >
              { this.props.children }
            </ToastContentStyle>
            { this.dismissIcon }
          </ToastStyle>
        </CSSTransition>
      );
    }
    return null;
  }

  render() {
    return (
      <Portal>
        <ToastWrapper isCenter={ this.props.isCenter }>
          <TransitionGroup>
            { this.toastContent() }
          </TransitionGroup>
        </ToastWrapper>
      </Portal>
    );
  }
}

Toast.propTypes = {
  /** Customizes the appearance in the DLS theme */
  variant: PropTypes.oneOf(OptionsHelper.colors),
  /** Customizes the appearance in a legacy theme through colour see the 'iconColorSets' for possible values) */
  as: PropTypes.oneOf(OptionsHelper.colors),
  /** Custom className */
  className: PropTypes.string,
  /** Component name */
  'data-component': PropTypes.string,
  /** The rendered children of the component. */
  children: PropTypes.node,
  /** Determines if the toast is open. */
  open: PropTypes.bool,
  /** Callback for when dismissed. */
  onDismiss: PropTypes.func,
  /** props used with flash component. Allow to center a component */
  isCenter: PropTypes.bool
};

Toast.defaultProps = {
  as: 'warning',
  onDismiss: null,
  open: true,
  isCenter: false
};

export default Toast;
