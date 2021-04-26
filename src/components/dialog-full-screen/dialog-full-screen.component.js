import React, { useRef } from "react";
import PropTypes from "prop-types";
import Modal from "../modal";
import Heading from "../heading";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import StyledContent from "./content.style";
import FocusTrap from "../../__internal__/focus-trap";

const DialogFullScreen = ({
  open,
  children,
  title,
  subtitle,
  pagesStyling,
  headerChildren,
  showCloseIcon,
  disableContentPadding,
  disableEscKey,
  onCancel,
  ...rest
}) => {
  const dialogRef = useRef();
  const headingRef = useRef();
  const contentRef = useRef();

  const dialogTitle = () => (
    <FullScreenHeading
      hasContent={title}
      ref={headingRef}
      showCloseIcon={showCloseIcon}
      onCancel={onCancel}
    >
      {typeof title === "string" ? (
        <Heading
          title={title}
          titleId="carbon-dialog-title"
          subheader={subtitle}
          subtitleId="carbon-dialog-subtitle"
          divider={false}
        />
      ) : (
        title
      )}
      {headerChildren}
    </FullScreenHeading>
  );

  const componentTags = {
    "data-component": "dialog-full-screen",
    "data-element": rest["data-element"],
    "data-role": rest["data-role"],
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      disableEscKey={disableEscKey}
      {...componentTags}
    >
      <FocusTrap wrapperRef={dialogRef}>
        <StyledDialogFullScreen
          ref={dialogRef}
          data-element="dialog-full-screen"
          pagesStyling={pagesStyling}
        >
          {dialogTitle()}
          <StyledContent
            hasHeader={title !== undefined}
            data-element="content"
            ref={contentRef}
            disableContentPadding={disableContentPadding}
          >
            {children}
          </StyledContent>
        </StyledDialogFullScreen>
      </FocusTrap>
    </Modal>
  );
};

DialogFullScreen.defaultProps = {
  showCloseIcon: true,
};

DialogFullScreen.propTypes = {
  /** Controls the open state of the component */
  open: PropTypes.bool.isRequired,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the Dialog */
  disableEscKey: PropTypes.bool,
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
