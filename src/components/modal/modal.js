/* eslint-disable react/sort-comp */ // Getting confusing order from sort-comp
import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Events from '../../utils/helpers/events';
import Browser from '../../utils/helpers/browser';
import Portal from '../portal';
import './modal.scss';

const TIMEOUT = 500;
/**
 * A Modal Component
 *
 * Abstract base class for all modals
 *
 * == How to use a Modal in a component
 *
 * In your file
 *
 *   import Modal from 'carbon-react/lib/components/modal'
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
     * A custom close event handler.
     */
    onCancel: PropTypes.func,

    /**
     * Sets the open state of the modal.
     */
    open: PropTypes.bool.isRequired,

    /**
     * Determines if the background is disabled
     * when the modal is open.
     */
    enableBackgroundUI: PropTypes.bool,

    /**
     * Determines if the Esc Key closes the modal.
     */
    disableEscKey: PropTypes.bool,

    /**
     * The ARIA role to be applied to the modal.
     */
    ariaRole: PropTypes.string // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
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

  constructor(props) {
    super(props);

    /**
     * Tracks if event listeners are on for modal
     *
     * @property listening
     * @type {Boolean}
     */
    this.listening = false;

    this.state = {
      /**
       * Sets the initial data-state of the modal
       * @property state
       * @type {String}
       */
      state: this.props.open ? 'open' : 'closed'
    };
  }

  /**
   * Updates the value used for the css data-state. This uses a timeout to match the length of any transition to ensure
   * UI automation is able to target elements once they are visually ready.
   * @method updateDataState
   * @return {void}
   *
   */
  updateDataState = () => {
    clearTimeout(this.openTimeout);
    this.openTimeout = setTimeout(() => {
      this.setState({ state: this.props.open ? 'open' : 'closed' });
    }, TIMEOUT);
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
   * A lifecycle method to update the component after it is mounted
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    Browser.getWindow().addEventListener('keyup', this.closeModal);
  }

  /**
   * A lifecycle method to update the component when it is unmounted
   *
   * @method componentWillUnmount
   * @return {void}
   */
  componentWillUnmount() {
    Browser.getWindow().removeEventListener('keyup', this.closeModal);
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
      this.updateDataState();
      this.onOpening; // eslint-disable-line no-unused-expressions
      _window.addEventListener('keyup', this.closeModal);
    } else if (!this.props.open && this.listening) {
      this.listening = false;
      this.updateDataState();
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
    if (this.props.open && this.props.onCancel && !this.props.disableEscKey && Events.isEscKey(ev)) {
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
      <Portal key='1'>
        <div
          className={ this.mainClasses } 
          { ...this.componentTags(this.props) }
          data-state={ this.state.state }
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
        </div>
      </Portal>
    );
  }
}

export default Modal;
