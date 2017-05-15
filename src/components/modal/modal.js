import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Events from './../../utils/helpers/events';

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

  /**
   * Tracks if event listeners are on for modal
   *
   * @property listening
   * @type {Boolean}
   */
  listening = false;

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
    disableEscKey: PropTypes.bool
  }

  static defaultProps = {
    open: false,
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

  /**
   * Returns modal object to child components. Used to override form cancel button functionality.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      modal: {
        onCancel: this.props.onCancel
      }
    };
  }

  /**
   * A lifecycle method to update the component after it is re-rendered
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate() {
    if (this.props.open && !this.listening) {
      this.listening = true;
      this.onOpening;
      window.addEventListener('keyup', this.closeModal);
    } else if (!this.props.open) {
      this.listening = false;
      this.onClosing;
      window.removeEventListener('keyup', this.closeModal);
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
          className="carbon-modal__background"
        />
      );
    }
  }

  // Called after the modal opens
  get onOpening()                 { return; }
  // Called after the modal closes
  get onClosing()                 { return; }
  // Classes for parent div
  get mainClasses()               { return; }
  // Modal HTML shown when open
  get modalHTML()                 { return; }

  // Modal transistion name
  get transitionName()            { return 'modal'; }
  // modal background transisiton name
  get backgroundTransitionName()  { return 'modal-background'; }

  // stubbed method for component tags
  componentTags() { return; }

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
      <div
        ref={(c) => this._input = c}
        className={ this.mainClasses }
        { ...this.componentTags(this.props) }
      >
        <CSSTransitionGroup
          transitionName={ this.transitionName }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { modalHTML }
        </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName={ this.backgroundTransitionName }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { backgroundHTML }
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Modal;
