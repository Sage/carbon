import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Events from './../../utils/helpers/events';

class Modal extends React.Component {

  listening = false;

  static propTypes = {

    /**
     * A custom close event handler
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: React.PropTypes.func.isRequired,

    /**
     * Sets the open state of the modal
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * Determines if the background is disabled
     * when the modal is open
     *
     * @property enableBackgroundUI
     * @type {Boolean}
     * @default true
     */
    enableBackgroundUI: React.PropTypes.bool
  }

  static defaultProps = {
    open: false,
    enableBackgroundUI: false
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the modal component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property modal
     * @type {Object}
     */
    modal: React.PropTypes.object
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
   * Triggers the custom close event handler on ESC
   *
   * @method closeModal
   * @param {Object} ev event
   * @return {void}
   */
  closeModal = (ev) => {
    if (Events.isEscKey(ev)) {
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
          onClick={ this.props.onCancel }
          className="ui-modal__background"
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
  get modalHTML()                { return; }

  // Modal transistion name
  get transitionName()            { return 'modal'; }
  // modal background transisiton name
  get backgroundTransitionName()  { return 'modal-background'; }

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
      <div ref={(c) => this._input = c} className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName={ this.transitionName }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { modalHTML }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={ this.backgroundTransitionName }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { backgroundHTML }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Modal;
