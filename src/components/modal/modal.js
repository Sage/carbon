import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Events from './../../utils/helpers/events';

const propTypes = {
  onCancel: React.PropTypes.func,
  open: React.PropTypes.bool.isRequired,
  enableBackgroundUI: React.PropTypes.bool,
  disableEscKey: React.PropTypes.bool
};

const defaultProps = {
  open: false,
  enableBackgroundUI: false,
  disableEscKey: false
};

const childContextTypes = {
  modal: React.PropTypes.object
}

class Modal extends React.Component {
  listening = false;

  componentDidUpdate() {
    if (this.props.open && !this.listening) {
      this.listening = true;
      if (this.props.onOpening) {
        this.props.onOpening();
      }
      window.addEventListener('keyup', this.closeModal);
    } else if (!this.props.open) {
      this.listening = false;
      if (this.props.onClosing) {
        this.props.onClosing();
      }
      window.removeEventListener('keyup', this.closeModal);
    }
  }

  getChildContext() {
    return {
      modal: {
        onCancel: this.props.onCancel
      }
    };
  }

  closeModal = (ev) => {
    if (this.props.onCancel && !this.props.disableEscKey && Events.isEscKey(ev)) {
      this.props.onCancel();
    }
  }

  render() {
    let backgroundHTML,
        modalHTML;

    if (this.props.open) {
      backgroundHTML = renderBackgroundHTML(this.props.enableBackgroundUI);
      modalHTML = this.props.children;
    }

    return (
      <div ref={(c) => this._input = c} className={ this.props.className }>
        <ReactCSSTransitionGroup
          transitionName={ this.props.transitionName || 'modal' }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { modalHTML }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={ this.props.backgroundTransitionName || 'modal-background' }
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 } >
          { backgroundHTML }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

/**
 * Returns HTML for the background.
 *
 * @method backgroundHTML
 * @return {Object} JSX
 */
function renderBackgroundHTML(enableBackgroundUI) {
  if (enableBackgroundUI) { return null; }
  return <div className="carbon-modal__background" />;
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.childContextTypes = childContextTypes;

export default Modal;
