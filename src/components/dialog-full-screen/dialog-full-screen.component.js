import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal";
import Heading from "../heading";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import StyledContent from "./content.style";
import Browser from "../../utils/helpers/browser";
import focusTrap from "../../utils/helpers/focus-trap";

class DialogFullScreen extends Modal {
  constructor(props) {
    super(props);

    /**
     * Caches a reference to the document.
     */
    this.document = Browser.getDocument();
    this.originalOverflow = undefined;
    this.contentRef = React.createRef();
  }

  static state = {
    headingHeight: undefined,
  };

  headingRef = React.createRef();

  componentDidUpdate() {
    super.componentDidUpdate();
    this.updateHeadingHeight();
  }

  componentTags(props) {
    return {
      "data-component": "dialog-full-screen",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }

  updateHeadingHeight() {
    if (
      this.headingRef.current &&
      this.state.headingHeight !== this.headingRef.current.clientHeight
    ) {
      this.setState({ headingHeight: this.headingRef.current.clientHeight });
    }
  }

  /**
   * Overrides the original function to disable the document's scroll.
   */
  handleOpen() {
    super.handleOpen();
    this.removeFocusTrap = focusTrap(this._dialog);
    this.originalOverflow = this.document.documentElement.style.overflow;
    this.document.documentElement.style.overflow = "hidden";
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

  /**
   * Returns HTML and text for the dialog title.
   */
  dialogTitle = () => {
    let { title } = this.props;

    if (typeof title === "string") {
      title = (
        <Heading
          title={title}
          titleId="carbon-dialog-title"
          subheader={this.props.subtitle}
          subtitleId="carbon-dialog-subtitle"
        />
      );
    }

    return (
      <FullScreenHeading
        hasContent={title}
        ref={this.headingRef}
        showCloseIcon={this.props.showCloseIcon}
        onCancel={this.props.onCancel}
      >
        {title}
        {this.props.headerChildren}
      </FullScreenHeading>
    );
  };

  /**
   * Returns the computed HTML for the dialog.
   */
  get modalHTML() {
    return (
      <StyledDialogFullScreen
        ref={(d) => {
          this._dialog = d;
        }}
        data-element="dialog-full-screen"
        pagesStyling={this.props.pagesStyling}
      >
        {this.dialogTitle()}
        <StyledContent
          hasHeader={this.props.title !== undefined}
          headingHeight={this.state.headingHeight}
          data-element="content"
          ref={this.contentRef}
          disableContentPadding={this.props.disableContentPadding}
        >
          {this.props.children}
        </StyledContent>
      </StyledDialogFullScreen>
    );
  }
}

DialogFullScreen.defaultProps = {
  open: false,
  enableBackgroundUI: true,
  showCloseIcon: true,
};

DialogFullScreen.propTypes = {
  ...Modal.propTypes,
  /** remove padding from content */
  disableContentPadding: PropTypes.bool,
  /** Child elements */
  children: PropTypes.node,
  /** Title displayed at top of dialog */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Subtitle displayed at top of dialog */
  subtitle: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** Container for components to be displayed in the header */
  headerChildren: PropTypes.node,
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling: PropTypes.bool,
};

export default DialogFullScreen;
