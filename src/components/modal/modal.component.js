/* eslint-disable react/sort-comp */ // Getting confusing order from sort-comp
import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Events from '../../utils/helpers/events';
import Browser from '../../utils/helpers/browser';
import Portal from '../portal';
import {
  StyledModal, StyledModalBackground
} from './modal.style';
/**
 * A Modal Component
 *
 * Abstract base class for all modals
 */
class Modal extends React.Component {
  static childContextTypes = {
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.listening = false;
    this.timeout = 500;

    this.state = {
      state: this.props.open ? 'open' : 'closed'
    };
  }

  updateDataState = () => {
    clearTimeout(this.openTimeout);
    this.openTimeout = setTimeout(() => {
      this.setState({ state: this.props.open ? 'open' : 'closed' });
    }, this.timeout);
  }

  getChildContext() {
    return {
      modal: {
        onCancel: this.props.onCancel
      }
    };
  }

  componentDidMount() {
    if (this.props.open) this.handleOpen();
  }

  componentWillUnmount() {
    if (this.listening) this.handleClose();
  }

  componentDidUpdate() {
    if (this.props.open && !this.listening) {
      this.handleOpen();
    } else if (!this.props.open && this.listening) {
      this.handleClose();
    }
  }

  handleOpen() {
    this.listening = true;
    this.updateDataState();
    Browser.getWindow().addEventListener('keyup', this.closeModal);
  }

  handleClose() {
    this.listening = false;
    this.updateDataState();
    Browser.getWindow().removeEventListener('keyup', this.closeModal);
  }

  closeModal = (ev) => {
    if (this.props.open && this.props.onCancel && !this.props.disableEscKey && Events.isEscKey(ev)) {
      this.props.onCancel();
    }
  }

  get backgroundHTML() {
    if (!this.props.enableBackgroundUI) {
      return (
        <StyledModalBackground
          data-element='modal-background'
          transitionName={ this.backgroundTransitionName }
        />
      );
    }
    return null;
  }

  get mainClasses() { return null; }

  get modalHTML() { return null; }

  get transitionName() { return 'modal'; }

  get backgroundTransitionName() { return 'modal-background'; }

  componentTags() { return null; }

  render() {
    let backgroundHTML,
        modalHTML;

    if (this.props.open) {
      backgroundHTML = this.backgroundHTML;
      modalHTML = this.modalHTML;
    }

    return (
      <Portal key='1'>
        <StyledModal
          className={ this.mainClasses }
          { ...this.componentTags(this.props) }
          data-state={ this.state.state }
          transitionName={ this.transitionName }
        >
          <TransitionGroup>
            {backgroundHTML && (
              <CSSTransition
                key='modal'
                appear
                classNames={ this.backgroundTransitionName }
                timeout={ this.timeout }
              >
                {backgroundHTML}
              </CSSTransition>
            )}
          </TransitionGroup>
          <TransitionGroup>
            {modalHTML && (
              <CSSTransition
                appear
                classNames={ this.transitionName }
                timeout={ this.timeout }
              >
                {modalHTML}
              </CSSTransition>
            )}
          </TransitionGroup>
        </StyledModal>
      </Portal>
    );
  }
}

Modal.propTypes = {
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Sets the open state of the modal */
  open: PropTypes.bool.isRequired,
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI: PropTypes.bool,
  /** Determines if the Esc Key closes the modal */
  disableEscKey: PropTypes.bool,
  /** The ARIA role to be applied to the modal */
  ariaRole: PropTypes.string // eslint-disable-line react/no-unused-prop-types
};

Modal.defaultProps = {
  onCancel: null,
  enableBackgroundUI: false,
  disableEscKey: false
};

export default Modal;
