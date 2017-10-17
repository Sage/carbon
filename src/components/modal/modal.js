/* eslint-disable react/sort-comp */ // Getting confusing order from sort-comp
import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Events from './../../utils/helpers/events';
import Browser from './../../utils/helpers/browser';
import Portal from './../portal';

/**
 * A Modal Component
 *
 * Abstract base class for all modals
 *
 * == How to use a Modal in a component
 *
 * In your file
 *
 *   import Modal from 'carbon/lib/components/modal'
 *
 * Extends from the modal
 *
 *   class MyModal extends Modal
 *
 * Override several methods
 *
 * get onOpening() // Called by componentDidUpdate when dialog opens
 * get onClosing() // Called by componentDidUpdate when dialog closes
 * get mainClasses() // Classes to apply to parent div
 * get modalHTML() // JSX displayed when open
 * get transitionName() // Transisition name for CSSTransitionGroup
 *
 * Optional Override
 * get backgroundTransitionName() // Transisition name for background fade
 *
 *
 * @class Modal
 * @constructor
 */
class Modal extends React.Component {

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: PropTypes.func,

    /**
     * Sets the open state of the modal
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: PropTypes.bool.isRequired,

    /**
     * Determines if the background is disabled
     * when the modal is open
     *
     * @property enableBackgroundUI
     * @type {Boolean}
     * @default true
     */
    enableBackgroundUI: PropTypes.bool,

    /**
     * Determines if the Esc Key closes the modal
     *
     * @property disableEscKey
     * @type {Boolean}
     * @default true
     */
    disableEscKey: PropTypes.bool,

    /**
     * The ARIA role to be applied to the modal
     *
     * @property ariaRole
     * @type {String}
     */
    ariaRole: PropTypes.string // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
    open: false,
    onCancel: null,
    enableBackgroundUI: false,
    disableEscKey: false
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the modal component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property modal
     * @type {Object}
     */
    modal: PropTypes.object
  }

  constructor() {
    super();

    /**
     * Tracks if event listeners are on for modal
     *
     * @property listening
     * @type {Boolean}
     */
    this.listening = false;
  }


  /**
   * Returns modal object to child components. Used to override form cancel button functionality.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      modal: {
        onCancel: this.props.onCancel,
        getDialog: this.getDialog
      }
    };
  }

  /**
   * Returns the reference to the dialog if it exists.
   *
   * @method getDialog
   * @return {HTMLElement}
   */
  getDialog = () => {
    return this._dialog;
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate() {
    const _window = Browser.getWindow();

    if (this.props.open && !this.listening) {
      this.listening = true;
      // TODO: try to remove this with React 16 upgrade with native Portals
      // it was added as the Portal library we use messes up the callstack
      // when assigning the ref and triggering componentDidUpdate
      setTimeout(() => {
        this.onOpening; // eslint-disable-line no-unused-expressions
      });
      _window.addEventListener('keyup', this.closeModal);
    } else if (!this.props.open && this.listening) {
      this.listening = false;
      this.onClosing; // eslint-disable-line no-unused-expressions
      _window.removeEventListener('keyup', this.closeModal);
    }
  }

  /**
   * Triggers the custom close event handler on Esc
   *
   * @method closeModal
   * @param {Object} ev event
   * @return {void}
   */
  closeModal = (ev) => {
    if (this.props.onCancel && !this.props.disableEscKey && Events.isEscKey(ev)) {
      this.props.onCancel();
    }
  }

  /**
   * Returns HTML for the background.
   *
   * @method backgroundHTML
   * @return {Object} JSX
   */
  get backgroundHTML() {
    if (!this.props.enableBackgroundUI) {
      return (
        <div
          className='carbon-modal__background'
        />
      );
    }
    return null;
  }

  // Called after the modal opens
  get onOpening() { return null; }
  // Called after the modal closes
  get onClosing() { return null; }
  // Classes for parent div
  get mainClasses() { return null; }
  // Modal HTML shown when open
  get modalHTML() { return null; }

  // Modal transistion name
  get transitionName() { return 'modal'; }
  // modal background transisiton name
  get backgroundTransitionName() { return 'modal-background'; }

  // stubbed method for component tags
  componentTags() { return null; }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let backgroundHTML,
        modalHTML;

    if (this.props.open) {
      backgroundHTML = this.backgroundHTML;
      modalHTML = this.modalHTML;
    }

    return (
      <Portal open>
        <div
          className={ this.mainClasses }
          { ...this.componentTags(this.props) }
        >
          <CSSTransitionGroup
            component='div'
            transitionName={ this.transitionName }
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500 }
          >
            { modalHTML }
          </CSSTransitionGroup>

          <CSSTransitionGroup
            component='div'
            transitionName={ this.backgroundTransitionName }
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500 }
          >
            { backgroundHTML }
          </CSSTransitionGroup>
        </div>
      </Portal>
    );
  }
}

export default Modal;
