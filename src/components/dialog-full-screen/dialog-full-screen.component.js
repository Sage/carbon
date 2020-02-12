import React from 'react';
import Modal from '../modal';
import Heading from '../heading';
import AppWrapper from '../app-wrapper';
import FullScreenHeading from './full-screen-heading';
import StyledDialogFullScreen from './dialog-full-screen.style';
import StyledContent from './content.style';
import StyledIcon from './icon.style';
import Browser from '../../utils/helpers/browser';
import Events from '../../utils/helpers/events/events';
import focusTrap from '../../utils/helpers/focus-trap';

class DialogFullScreen extends Modal {
  constructor(props) {
    super(props);

    /**
     * Caches a reference to the document.
     */
    this.document = Browser.getDocument();
    this.originalOverflow = undefined;
  }

  static state = {
    headingHeight: undefined
  };

  static defaultProps = {
    open: false,
    enableBackgroundUI: true
  }

  headingRef = React.createRef();

  componentDidUpdate() {
    super.componentDidUpdate();
    this.updateHeadingHeight();
  }

  componentTags(props) {
    return {
      'data-component': 'dialog-full-screen',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  updateHeadingHeight() {
    if (this.headingRef.current && this.state.headingHeight !== this.headingRef.current.clientHeight) {
      this.setState({ headingHeight: this.headingRef.current.clientHeight });
    }
  }

  /**
   * Returns the computed HTML for the dialog.
   */
  get modalHTML() {
    return (
      <StyledDialogFullScreen
        ref={ (d) => { this._dialog = d; } }
        data-element='dialog-full-screen'
      >
        { this.dialogTitle() }
        <StyledContent
          hasHeader={ this.props.title !== undefined }
          headingHeight={ this.state.headingHeight }
          data-element='content'
        >
          <AppWrapper>
            { this.props.children }
          </AppWrapper>
        </StyledContent>
      </StyledDialogFullScreen>
    );
  }

  /**
   * Overrides the original function to disable the document's scroll.
   */
  handleOpen() {
    super.handleOpen();
    this.removeFocusTrap = focusTrap(this._dialog);
    this.originalOverflow = this.document.documentElement.style.overflow;
    this.document.documentElement.style.overflow = 'hidden';
  }

  /**
   * Overrides the original function to enable the document's scroll.
   */
  handleClose() {
    super.handleClose();
    this.removeFocusTrap();
    this.document.documentElement.style.overflow = this.originalOverflow;
    return this.document.documentElement;
  }

  onButtonKeyDown = (ev) => {
    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      ev.preventDefault();
      this.props.onCancel();
    }
  }

  /**
   * Returns HTML and text for the dialog title.
   */
  dialogTitle = () => {
    let { title } = this.props;

    if (typeof title === 'string') {
      title = (
        <Heading
          title={ title }
          titleId='carbon-dialog-title'
          subheader={ this.props.subtitle }
          subtitleId='carbon-dialog-subtitle'
        />
      );
    }

    return (
      <FullScreenHeading hasContent={ title } ref={ this.headingRef }>
        <StyledIcon
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
          tabIndex='0'
          role='button'
          onKeyDown={ this.onButtonKeyDown }
        />

        { title }
      </FullScreenHeading>
    );
  }
}

export default DialogFullScreen;
