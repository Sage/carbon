import React, { useRef, useContext } from "react";
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
import useIsStickyFooterForm from "../../hooks/__internal__/useIsStickyFooterForm";
import TopModalContext from "../carbon-provider/top-modal-context";

const DialogFullScreen = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  disableAutoFocus,
  focusFirstElement,
  bespokeFocusTrap,
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
  focusableContainers,
  focusableSelectors,
  ...rest
}) => {
  const locale = useLocale();

  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const { current: titleId } = useRef(createGuid());
  const { current: subtitleId } = useRef(createGuid());
  const hasStickyFooter = useIsStickyFooterForm(children);

  const { topModal } = useContext(TopModalContext);

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
    <FullScreenHeading hasContent={!!title} ref={headingRef}>
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
        bespokeTrap={bespokeFocusTrap}
        wrapperRef={dialogRef}
        isOpen={open}
        additionalWrapperRefs={focusableContainers}
        focusableSelectors={focusableSelectors}
      >
        <StyledDialogFullScreen
          aria-modal={
            role === "dialog" && topModal?.contains(dialogRef.current)
              ? true
              : undefined
          }
          {...ariaProps}
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
            hasStickyFooter={hasStickyFooter}
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
  /**
   * Function to replace focus trap
   * @ignore
   * @private
   */
  bespokeFocusTrap: PropTypes.func,
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
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any })
  ),
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors: PropTypes.string,
};

export default DialogFullScreen;
