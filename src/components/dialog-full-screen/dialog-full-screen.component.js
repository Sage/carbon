import React from 'react';
import Modal from '../modal';
import Heading from '../heading';
import AppWrapper from '../app-wrapper';
import FullScreenHeading from './full-screen-heading';
import StyledDialogFullScreen from './dialog-full-screen.style';
import StyledContent from './content.style';
import StyledIcon from './icon.style';
import Browser from '../../utils/helpers/browser';

const DIALOG_OPEN_HTML_CLASS = 'carbon-dialog-full-screen--open';

class DialogFullScreen extends Modal {
  constructor(props) {
    super(props);

    /**
     * Caches a reference to the document.
     */
    this.document = Browser.getDocument();
  }

  static defaultProps = {
    open: false,
    enableBackgroundUI: true
  }

  componentTags(props) {
    return {
      'data-component': 'dialog-full-screen',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Returns the computed HTML for the dialog.
   */
  get modalHTML() {
    return (
      <StyledDialogFullScreen
        ref={ (d) => { this._dialog = d; } }
        { ...this.componentTags(this.props) }
      >
        { this.dialogTitle() }

        <StyledContent data-element='content'>
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
  get onOpening() {
    return this.document.documentElement.classList.add(DIALOG_OPEN_HTML_CLASS);
  }

  /**
   * Overrides the original function to enable the document's scroll.
   */
  get onClosing() {
    return this.document.documentElement.classList.remove(DIALOG_OPEN_HTML_CLASS);
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
      <FullScreenHeading>
        <StyledIcon
          data-element='close'
          onClick={ this.props.onCancel }
          type='close'
        />

        { title }
      </FullScreenHeading>
    );
  }
}

export default DialogFullScreen;
