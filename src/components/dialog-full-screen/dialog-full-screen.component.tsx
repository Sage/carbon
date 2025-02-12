import React, { useRef } from "react";

import createGuid from "../../__internal__/utils/helpers/guid";
import Modal, { ModalProps } from "../modal";
import Heading from "../heading";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import StyledContent from "./content.style";
import FocusTrap, { CustomRefObject } from "../../__internal__/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";
import useLocale from "../../hooks/__internal__/useLocale";
import useModalAria from "../../hooks/__internal__/useModalAria/useModalAria";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface DialogFullScreenProps extends ModalProps {
  /** Prop to specify the aria-describedby property of the DialogFullscreen component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the DialogFullscreen component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the DialogFullscreen component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /** Child elements */
  children?: React.ReactNode;
  /** Reference to the scrollable content element */
  contentRef?: React.ForwardedRef<HTMLDivElement>;
  /** Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /** remove padding from content */
  disableContentPadding?: boolean;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: CustomRefObject<HTMLElement> | HTMLElement | null;
  /**
   * Function to replace focus trap
   * @ignore
   * @private
   */
  bespokeFocusTrap?: (
    ev: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement,
  ) => void;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** Adds Help tooltip to Header */
  help?: string;
  /** For legacy styling when used with Pages component. Do not use this unless using Pages within a DialogFullScreen */
  pagesStyling?: boolean;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. */
  subtitle?: React.ReactNode;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the DialogFullscreen container */
  role?: string;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: CustomRefObject<HTMLElement>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** A custom close event handler */
  onCancel?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export const DialogFullScreen = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  disableAutoFocus = false,
  focusFirstElement,
  bespokeFocusTrap,
  open,
  children,
  title,
  subtitle,
  pagesStyling,
  headerChildren,
  showCloseIcon = true,
  disableContentPadding,
  disableEscKey,
  onCancel,
  contentRef,
  help,
  role = "dialog",
  focusableContainers,
  focusableSelectors,
  topModalOverride,
  closeButtonDataProps,
  restoreFocusOnClose = true,
  ...rest
}: DialogFullScreenProps) => {
  const locale = useLocale();

  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const { current: titleId } = useRef(createGuid());
  const { current: subtitleId } = useRef(createGuid());

  const isTopModal = useModalAria(dialogRef);

  const closeIcon = () => {
    if (!showCloseIcon || !onCancel) return null;

    return (
      <IconButton
        aria-label={locale.dialogFullScreen.ariaLabels.close()}
        onClick={onCancel}
        {...tagComponent("close", {
          "data-element": "close",
          ...closeButtonDataProps,
        })}
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
    "aria-describedby":
      subtitle && typeof subtitle === "string" ? subtitleId : ariaDescribedBy,
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
      topModalOverride={topModalOverride}
      restoreFocusOnClose={restoreFocusOnClose}
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
          aria-modal={role === "dialog" && isTopModal ? true : undefined}
          {...ariaProps}
          ref={dialogRef}
          data-element="dialog-full-screen"
          pagesStyling={pagesStyling}
          role={role}
        >
          {title || headerChildren ? dialogTitle() : null}
          {closeIcon()}
          <StyledContent
            hasHeader={title !== undefined}
            data-element="content"
            data-role="dialog-full-screen-content"
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

export default DialogFullScreen;
