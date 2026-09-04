import React, { useCallback, useRef, RefObject } from "react";
import { PaddingProps, WidthProps } from "styled-system";

import type { ModalProps } from "../../__internal__/modal";
import {
  StyledSidebar,
  StyledSidebarContent,
  StyledSidebarModal,
} from "./sidebar.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import FocusTrap from "../../__internal__/focus-trap";
import SidebarHeader, { SidebarSubHeader } from "./__internal__/sidebar-header";
import createGuid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import { filterStyledSystemPaddingProps } from "../../style/utils";
import tagComponent, {
  type TagProps,
} from "../../__internal__/utils/helpers/tags";
import useModalAria from "../../hooks/__internal__/useModalAria/useModalAria";
import SidebarContext from "./__internal__/sidebar.context";
import useMediaQuery from "../../hooks/useMediaQuery";

export interface SidebarProps
  extends PaddingProps,
    TagProps,
    WidthProps,
    Pick<ModalProps, "topModalOverride" | "restoreFocusOnClose"> {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /**
   * Provides an explicit accessible name for the component, overriding the
   * automatic association with the header.
   */
  "aria-label"?: string;
  /**
   * Identifies the element that provides an explicit accessible name for the
   * component, overriding the automatic association with the header.
   */
  "aria-labelledby"?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Determines if the Esc Key closes the modal */
  disableEscKey?: boolean;
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI?: boolean;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: React.MutableRefObject<HTMLElement | null>;
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
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
  /** Node that will be used as sidebar header. */
  header?: React.ReactNode;
  /** Node that will be used as sidebar subheader. */
  subHeader?: React.ReactNode;
  /**
   * Header background variant for the sidebar.
   * `light` and `dark` are deprecated aliases - use `typical` and `inverse` instead.
   */
  headerVariant?: "typical" | "inverse" | "light" | "dark";
  /** Adds the Carbon AI gradient keyline to the header. */
  gradientKeyLine?: boolean;
  /** A custom close event handler */
  onCancel?: (
    ev:
      | React.KeyboardEvent<HTMLElement>
      | KeyboardEvent
      | React.MouseEvent<HTMLElement>,
  ) => void;
  /** Sets the open state of the modal */
  open: boolean;
  /** @deprecated This prop will be removed in a future release.
   * Sidebar will always be positioned on the right.
   * Update the layout to support a right-positioned Sidebar if it is set to
   * left, otherwise remove the prop.
   * */
  position?: "left" | "right";
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** @deprecated Use `width` to customise the Sidebar width. */
  size?:
    | "extra-small"
    | "small"
    | "medium-small"
    | "medium"
    | "medium-large"
    | "large"
    | "extra-large";
  /** Enables width animation when the sidebar width changes. */
  widthAnimation?: boolean;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar */
  focusableContainers?: RefObject<HTMLElement>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** Padding to be set on the Sidebar header */
  headerPadding?: PaddingProps;
  /** Padding to be set on the Sidebar subheader */
  subHeaderPadding?: PaddingProps;
  /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** @private @ignore Whether the `Sidebar` is hidden from view when rendered in an `AdaptiveSidebar`. */
  hidden?: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "data-element": dataElement = "sidebar",
      "data-role": dataRole,
      open,
      bespokeFocusTrap,
      closeButtonDataProps,
      disableAutoFocus = false,
      disableEscKey = false,
      enableBackgroundUI = false,
      header,
      headerVariant = "typical",
      gradientKeyLine = false,
      subHeader,
      position = "right",
      size,
      children,
      onCancel,
      role = "dialog",
      focusFirstElement,
      focusableContainers,
      focusableSelectors,
      width,
      widthAnimation = false,
      headerPadding = {},
      subHeaderPadding = {},
      topModalOverride,
      restoreFocusOnClose = true,
      className,
      hidden,
      ...rest
    }: SidebarProps,
    ref,
  ) => {
    const locale = useLocale();

    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const { current: headerId } = useRef<string>(createGuid());
    const { current: subHeaderId } = useRef<string>(createGuid());

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (reference: HTMLDivElement) => {
        sidebarRef.current = reference;
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref],
    );

    const isTopModal = useModalAria(sidebarRef, hidden);

    const renderCloseButton = () => {
      if (!onCancel) return null;
      return (
        <IconButton
          aria-label={locale.sidebar.ariaLabels.close()}
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

    const closeButton = renderCloseButton();
    const hasHeader = Boolean(header);
    const hasSubHeader = Boolean(subHeader);

    const sidebar = (
      <StyledSidebar
        aria-modal={!enableBackgroundUI && isTopModal}
        aria-describedby={
          !ariaDescribedBy && hasSubHeader ? subHeaderId : ariaDescribedBy
        }
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy || (!ariaLabel && hasHeader ? headerId : undefined)
        }
        data-component="sidebar"
        data-element={dataElement}
        data-role={dataRole}
        ref={setRefs}
        position={position}
        size={size}
        role={role}
        width={width}
        widthAnimation={widthAnimation && allowMotion}
        className={className}
      >
        {hasHeader && (
          <SidebarHeader
            headerVariant={headerVariant}
            gradientKeyLine={gradientKeyLine}
            closeButton={closeButton}
            {...headerPadding}
            id={headerId}
          >
            {header}
          </SidebarHeader>
        )}
        {hasSubHeader && (
          <SidebarSubHeader {...subHeaderPadding} id={subHeaderId}>
            {subHeader}
          </SidebarSubHeader>
        )}
        {!hasHeader && closeButton}
        <StyledSidebarContent
          data-element="sidebar-content"
          data-role="sidebar-content"
          tabIndex={-1}
          {...filterStyledSystemPaddingProps(rest)}
        >
          <SidebarContext.Provider value={{ isInSidebar: true }}>
            {children}
          </SidebarContext.Provider>
        </StyledSidebarContent>
      </StyledSidebar>
    );

    return (
      <StyledSidebarModal
        open={open}
        onCancel={onCancel}
        disableEscKey={disableEscKey}
        enableBackgroundUI={enableBackgroundUI}
        topModalOverride={topModalOverride}
        restoreFocusOnClose={restoreFocusOnClose}
      >
        {enableBackgroundUI ? (
          sidebar
        ) : (
          <FocusTrap
            wrapperRef={sidebarRef}
            isOpen={open}
            additionalWrapperRefs={focusableContainers}
            focusableSelectors={focusableSelectors}
            focusFirstElement={focusFirstElement}
            autoFocus={!disableAutoFocus}
            bespokeTrap={bespokeFocusTrap}
          >
            {sidebar}
          </FocusTrap>
        )}
      </StyledSidebarModal>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
