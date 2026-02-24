import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  RefObject,
} from "react";

import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  DialogPositioner,
  StyledDialogFooter,
  StyledSubtitle,
} from "./dialog.style";

import { StyledHeaderHelp } from "../../heading/heading.style";
import Icon from "../../icon";
import Typography from "../../typography";
import Modal, { ModalProps } from "../../../__internal__/modal";

import FocusTrap from "../../../__internal__/focus-trap";
import FullScreenHeading from "../../../__internal__/full-screen-heading";
import createGuid from "../../../__internal__/utils/helpers/guid";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import Logger from "../../../__internal__/utils/logger";

import useLocale from "../../../hooks/__internal__/useLocale";
import useModalAria from "../../../hooks/__internal__/useModalAria/useModalAria";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../button/__next__";

import { Size, DialogSizes, ContentPaddingInterface } from "./dialog.config";

export type { Size, DialogSizes, ContentPaddingInterface };

export interface DialogProps extends ModalProps, TagProps {
  /** Prop to specify the aria-describedby property of the Dialog component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the Dialog component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the Dialog component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
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
  /** Child elements */
  children?: React.ReactNode;
  /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Padding to be set on the Dialog content */
  contentPadding?: ContentPaddingInterface;
  /** Reference to the scrollable content element */
  contentRef?: React.ForwardedRef<HTMLDivElement>;
  /** @private @internal @ignore */
  "data-component"?: string;
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /**
   * [Legacy] Flag to remove padding from content.
   * @deprecated Use `contentPadding` instead.
   */
  disableContentPadding?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: RefObject<HTMLElement>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: RefObject<HTMLElement> | HTMLElement | null;
  /** Footer content to be rendered at the bottom of the dialog */
  footer?: React.ReactNode;
  /** Change the background color of the content to grey */
  greyBackground?: boolean;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** Adds Help tooltip to Header */
  help?: string;
  /** Adds an AI-styled keyline to the dialog header */
  aiKeyLine?: boolean;
  /** A custom close event handler */
  onCancel?: (
    ev:
      | React.KeyboardEvent<HTMLElement>
      | KeyboardEvent
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /** The ARIA role to be applied to the Dialog container */
  role?: string;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /**
   * Size of dialog following design system naming conventions.
   * - small: 288px min-width, 540px max-width
   * - medium: 540px min-width, 850px max-width (default)
   * - large: 850px min-width, 1080px max-width
   * - fullScreen: full viewport
   */
  size?: Size;
  /** Makes the footer stick to the bottom of the dialog when content scrolls */
  stickyFooter?: boolean;
  /** Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. */
  subtitle?: React.ReactNode;
  /** Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. */
  title?: React.ReactNode;
  /**
   * When true, header and sticky footer become unstickied for accessibility on small screen devices.
   * On small screen devices, the dialog becomes full width and has no dimmer.
   */
  disableStickyOnSmallScreen?: boolean;

  // ============ DEPRECATED PROPS ============

  /**
   * @deprecated Use `size="fullScreen"` instead.
   */
  fullscreen?: boolean;
  /**
   * @deprecated Use `aiKeyLine` instead.
   */
  highlightVariant?: string;
}

export type DialogHandle = {
  /** Programmatically focus on root container of Dialog. */
  focus: () => void;
} | null;

let deprecatedFullscreenTrigger = false;
let deprecatedHighlightVariantTrigger = false;

/**
 * Maps legacy size values to new size values
 */
const mapLegacySizeToSize = (
  legacySize?: DialogSizes | Size,
  fullscreen?: boolean,
): Size => {
  if (fullscreen) {
    return "fullScreen";
  }

  switch (legacySize) {
    case "extra-small":
    case "small":
      return "small";
    case "medium-small":
    case "medium":
      return "medium";
    case "medium-large":
    case "large":
    case "extra-large":
      return "large";
    case "fullScreen":
      return "fullScreen";
    /* istanbul ignore next -- safety fallback, all valid sizes are handled above */
    default:
      return "medium";
  }
};

/**
 * Maps highlightVariant to aiKeyLine
 */
const mapHighlightVariantToAiKeyLine = (
  highlightVariant?: string,
  aiKeyLine?: boolean,
): boolean => {
  if (aiKeyLine !== undefined) {
    return aiKeyLine;
  }

  return highlightVariant !== undefined && highlightVariant !== "default";
};

export const Dialog = forwardRef<DialogHandle, DialogProps>(
  (
    {
      className,
      "data-component": dataComponent = "dialog",
      "data-element": dataElement = "dialog",
      "data-role": dataRole,
      children,
      open,
      height,
      size: sizeProp = "medium",
      title,
      disableEscKey,
      subtitle,
      disableAutoFocus = false,
      focusFirstElement,
      focusableSelectors,
      onCancel,
      showCloseIcon = true,
      bespokeFocusTrap,
      help,
      aiKeyLine,
      role = "dialog",
      contentPadding,
      greyBackground = false,
      focusableContainers,
      topModalOverride,
      closeButtonDataProps,
      restoreFocusOnClose = true,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      headerChildren,
      contentRef,
      disableStickyOnSmallScreen = false,
      footer,
      stickyFooter = false,
      // Deprecated props
      disableContentPadding,
      fullscreen,
      highlightVariant,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();

    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef(null);
    const titleRef = useRef(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const { current: titleId } = useRef(createGuid());
    const { current: subtitleId } = useRef(createGuid());

    const isTopModal = useModalAria(containerRef);

    // Detect small screen for accessibility requirements
    const isSmallScreen = useMediaQuery("(max-width: 599px)");
    const shouldDisableSticky = disableStickyOnSmallScreen && isSmallScreen;

    // Deprecation warnings
    if (!deprecatedFullscreenTrigger && fullscreen !== undefined) {
      deprecatedFullscreenTrigger = true;
      Logger.deprecate(
        'The fullscreen prop in Dialog is deprecated. Please use size="fullScreen" instead.',
      );
    }

    if (!deprecatedHighlightVariantTrigger && highlightVariant !== undefined) {
      deprecatedHighlightVariantTrigger = true;
      Logger.deprecate(
        "The highlightVariant prop in Dialog is deprecated. Please use aiKeyLine instead.",
      );
    }

    // Map deprecated props to new props
    const computedSize = mapLegacySizeToSize(
      sizeProp as DialogSizes | Size,
      fullscreen,
    );
    const computedAiKeyLine = mapHighlightVariantToAiKeyLine(
      highlightVariant,
      aiKeyLine,
    );
    const isFullScreen = computedSize === "fullScreen";

    // On small screen with disableStickyOnSmallScreen, dialog becomes full width with no dimmer
    const effectiveFullWidth = shouldDisableSticky || isFullScreen;

    // Compute effective sticky state for footer
    const effectiveStickyFooter = stickyFooter && !shouldDisableSticky;

    useImperativeHandle<DialogHandle, DialogHandle>(
      ref,
      () => ({
        focus() {
          containerRef.current?.focus();
        },
      }),
      [],
    );

    const closeIcon = showCloseIcon && onCancel && (
      <Button
        aria-label={locale.dialog.ariaLabels.close()}
        onClick={(ev) => onCancel(ev as React.MouseEvent<HTMLButtonElement>)}
        {...tagComponent("close", {
          "data-element": "close",
          ...closeButtonDataProps,
        })}
        variantType="subtle"
      >
        <Icon type="close" />
      </Button>
    );

    const dialogTitle = () => {
      const renderTitle = (
        <div data-element="dialog-title-container">
          {typeof title === "string" ? (
            <>
              {help ? (
                <div data-element="dialog-title-help-wrapper">
                  <Typography
                    wordWrap="break-word"
                    wordBreak="normal"
                    variant="h1"
                    marginRight="16px"
                    data-element="dialog-title"
                    id={titleId}
                  >
                    {title}
                  </Typography>
                  <StyledHeaderHelp data-element="help" tooltipPosition="right">
                    {help}
                  </StyledHeaderHelp>
                </div>
              ) : (
                <Typography
                  wordWrap="break-word"
                  wordBreak="normal"
                  variant="h1"
                  data-element="dialog-title"
                  id={titleId}
                >
                  {title}
                </Typography>
              )}
            </>
          ) : (
            title
          )}
          {subtitle && (
            <StyledSubtitle
              as="div"
              data-element="subtitle"
              data-role="subtitle"
              id={subtitleId}
            >
              {subtitle}
            </StyledSubtitle>
          )}
        </div>
      );

      return isFullScreen ? (
        <FullScreenHeading
          hasContent={!!title}
          hasCloseButton={showCloseIcon}
          ref={headingRef}
        >
          {renderTitle}
          {headerChildren}
        </FullScreenHeading>
      ) : (
        <StyledDialogTitle
          hasSubtitle={!!subtitle}
          ref={titleRef}
          showCloseIcon={showCloseIcon}
          $disableSticky={shouldDisableSticky}
        >
          {renderTitle}
          {headerChildren}
        </StyledDialogTitle>
      );
    };

    const dialogFooter = () => {
      return (
        <StyledDialogFooter
          ref={footerRef}
          $size={computedSize}
          $sticky={effectiveStickyFooter}
          $disableSticky={shouldDisableSticky}
          data-role="dialog-footer"
          data-element="dialog-footer"
        >
          {footer}
        </StyledDialogFooter>
      );
    };

    let dialogHeight = height;

    if (height && height.match(/px$/)) {
      dialogHeight = height.replace("px", "");
    }

    const ariaProps = {
      "aria-describedby":
        subtitle && typeof subtitle === "string" ? subtitleId : ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby":
        title && typeof title === "string" ? titleId : ariaLabelledBy,
    };

    return (
      <Modal
        className={className ? `${className} carbon-dialog` : "carbon-dialog"}
        disableEscKey={disableEscKey}
        onCancel={onCancel}
        open={open}
        restoreFocusOnClose={restoreFocusOnClose}
        topModalOverride={topModalOverride}
        enableBackgroundUI={shouldDisableSticky}
        {...tagComponent("dialog", rest)}
        {...rest}
      >
        <FocusTrap
          additionalWrapperRefs={focusableContainers}
          autoFocus={!disableAutoFocus}
          bespokeTrap={bespokeFocusTrap}
          focusableSelectors={focusableSelectors}
          focusFirstElement={focusFirstElement}
          isOpen={open}
          wrapperRef={containerRef}
        >
          <DialogPositioner
            $size={computedSize}
            $fullscreen={isFullScreen}
            $fullWidth={effectiveFullWidth}
            $disableSticky={shouldDisableSticky}
          >
            <StyledDialog
              aria-modal={role === "dialog" && isTopModal ? true : undefined}
              {...ariaProps}
              backgroundColor={
                greyBackground
                  ? "var(--container-standard-bg-alt, #f4f5f6)"
                  : "var(--container-standard-bg-default, #fff)"
              }
              data-component={dataComponent}
              data-element={dataElement}
              data-role={dataRole}
              dialogHeight={dialogHeight}
              $aiKeyline={computedAiKeyLine}
              $size={computedSize}
              $disableSticky={shouldDisableSticky}
              ref={containerRef}
              role={role}
              tabIndex={-1}
              {...contentPadding}
            >
              {title || headerChildren ? dialogTitle() : null}
              {closeIcon}
              <StyledDialogContent
                {...contentPadding}
                $size={computedSize}
                data-role="dialog-content"
                data-element="dialog-content"
                disableContentPadding={disableContentPadding}
                hasHeader={title !== undefined}
                hasFooter={footer !== undefined}
                tabIndex={-1}
                ref={contentRef}
                $disableSticky={shouldDisableSticky}
              >
                {children}
              </StyledDialogContent>
              {footer ? dialogFooter() : null}
            </StyledDialog>
          </DialogPositioner>
        </FocusTrap>
      </Modal>
    );
  },
);

Dialog.displayName = "Dialog";

export default Dialog;

export { default as withDialogHeader } from "./__internal__/dialog-header.component";
export type {
  EnhancedDialogProps,
  DialogHeadingStatus,
} from "./__internal__/dialog-header.component";
