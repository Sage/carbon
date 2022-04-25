import React, { useRef } from "react";
import PropTypes from "prop-types";

import createGuid from "../../__internal__/utils/helpers/guid";
import Modal from "../modal";
import Heading from "../heading";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import StyledContent from "./content.style";
import FocusTrap from "../../__internal__/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";
import useLocale from "../../hooks/__internal__/useLocale";
import useModalFocus from "../../hooks/__internal__/useModalFocus";

const DialogFullScreen = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  disableAutoFocus,
  focusFirstElement,
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
  contentRef,
  help,
  role = "dialog",
  ...rest
}) => {
  const locale = useLocale();

  const dialogRef = useRef();
  const headingRef = useRef();
  const { current: titleId } = useRef(createGuid());
  const { current: subtitleId } = useRef(createGuid());

  const focusProps = useModalFocus(open);

  const closeIcon = () => {
    if (!showCloseIcon || !onCancel) return null;

    return (
      <IconButton
        data-element="close"
        aria-label={locale.dialogFullScreen.ariaLabels.close()}
        onAction={onCancel}
      >
        <Icon type="close" />
      </IconButton>
    );
  };

  const dialogTitle = () => (
    <FullScreenHeading hasContent={title} ref={headingRef}>
      {typeof title === "string" ? (
        <Heading
          data-element="dialog-title"
          title={title}
          titleId={titleId}
          subheader={subtitle}
          subtitleId={subtitleId}
          divider={false}
          help={help}
        />
      ) : (
        title
      )}
      {headerChildren}
    </FullScreenHeading>
  );

  const ariaProps = {
    "aria-labelledby":
      title && typeof title === "string" ? titleId : ariaLabelledBy,
    "aria-describedby": subtitle ? subtitleId : ariaDescribedBy,
    "aria-label": ariaLabel,
  };

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
      <FocusTrap
        autoFocus={!disableAutoFocus}
        focusFirstElement={focusFirstElement}
        wrapperRef={dialogRef}
        isOpen={open}
      >
        <StyledDialogFullScreen
          aria-modal={role === "dialog" ? true : undefined}
          {...ariaProps}
          {...focusProps}
          ref={dialogRef}
          data-element="dialog-full-screen"
          pagesStyling={pagesStyling}
          role={role}
        >
          {dialogTitle()}
          {closeIcon()}
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
  disableAutoFocus: false,
};

DialogFullScreen.propTypes = {
  /** Prop to specify the aria-describedby property of the DialogFullscreen component */
  "aria-describedby": PropTypes.string,
  /**
   * Prop to specify the aria-label of the DialogFullscreen component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label": PropTypes.string,
  /**
   * Prop to specify the aria-labelledby property of the DialogFullscreen component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby": PropTypes.string,
  /** Controls the open state of the component */
  open: PropTypes.bool.isRequired,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement: PropTypes.shape({ current: PropTypes.any }),
  /** Disables auto focus functionality on child elements */
  disableAutoFocus: PropTypes.bool,
  /** Determines if the Esc Key closes the Dialog */
  disableEscKey: PropTypes.bool,
  /** Adds Help tooltip to Header */
  help: PropTypes.string,
  /** remove padding from content */
  disableContentPadding: PropTypes.bool,
  /** Child elements */
  children: PropTypes.node,
  /** Title displayed at top of dialog */
  title: PropTypes.node,
  /** Subtitle displayed at top of dialog */
  subtitle: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** Container for components to be displayed in the header */
  headerChildren: PropTypes.node,
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling: PropTypes.bool,
  /** Reference to the scrollable content element */
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** The ARIA role to be applied to the DialogFullscreen container */
  role: PropTypes.string,
};

export default DialogFullScreen;
