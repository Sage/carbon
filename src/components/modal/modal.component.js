/* eslint-disable react/sort-comp */ // Getting confusing order from sort-comp
import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Events from '../../utils/helpers/events';
import Browser from '../../utils/helpers/browser';
import Portal from '../portal';
import { StyledModal, StyledModalBackground } from './modal.style';

const TIMEOUT = 500;
/**
 * A Modal Component
 *
 * Abstract base class for all modals
 */
class Modal extends React.Component {
  static propTypes = {
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
  }

  static defaultProps = {
    onCancel: null,
    enableBackgroundUI: false,
    disableEscKey: false
  }

  static childContextTypes = {
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.listening = false;

    this.state = {
      state: this.props.open ? 'open' : 'closed'
    };
  }

  updateDataState = () => {
    clearTimeout(this.openTimeout);
    this.openTimeout = setTimeout(() => {
      this.setState({ state: this.props.open ? 'open' : 'closed' });
    }, TIMEOUT);
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
    this.onOpening; // eslint-disable-line no-unused-expressions
    Browser.getWindow().addEventListener('keyup', this.closeModal);
  }

  handleClose() {
    this.listening = false;
    this.updateDataState();
    this.onClosing; // eslint-disable-line no-unused-expressions
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

  get onOpening() { return null; }

  get onClosing() { return null; }

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
          <CSSTransitionGroup
            component='div'
            transitionName={ this.backgroundTransitionName }
            transitionAppear
            transitionAppearTimeout={ TIMEOUT }
            transitionEnterTimeout={ TIMEOUT }
            transitionLeaveTimeout={ TIMEOUT }
          >
            { backgroundHTML }
          </CSSTransitionGroup>
          <CSSTransitionGroup
            component='div'
            transitionName={ this.transitionName }
            transitionAppear
            transitionAppearTimeout={ TIMEOUT }
            transitionEnterTimeout={ TIMEOUT }
            transitionLeaveTimeout={ TIMEOUT }
          >
            { modalHTML }
          </CSSTransitionGroup>
        </StyledModal>
      </Portal>
    );
  }
}

export default Modal;
