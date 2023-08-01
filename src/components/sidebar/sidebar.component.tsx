import React, { useCallback, useRef } from "react";
import { PaddingProps, WidthProps } from "styled-system";

import Modal from "../modal";
import StyledSidebar from "./sidebar.style";
import IconButton from "../icon-button";
import Icon from "../icon";
import FocusTrap from "../../__internal__/focus-trap";
import SidebarHeader from "./__internal__/sidebar-header";
import Box from "../box";
import createGuid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import { filterStyledSystemPaddingProps } from "../../style/utils";
import useIsStickyFooterForm from "../../hooks/__internal__/useIsStickyFooterForm";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import useModalAria from "../../hooks/__internal__/useModalAria/useModalAria";

// TODO FE-5408 will investigate why React.RefObject<T> produces a failed prop type when current = null
type CustomRefObject<T> = {
  current?: T | null;
};

export interface SidebarContextProps {
  isInSidebar?: boolean;
}

export const SidebarContext = React.createContext<SidebarContextProps>({});

export interface SidebarProps extends PaddingProps, TagProps, WidthProps {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the component.
   * To be used only when the header prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labeledby property of the component
   * To be used when the header prop is a custom React Node,
   * or the component is labelled by an internal element other than the header.
   */
  "aria-labelledby"?: string;
  /** Modal content */
  children?: React.ReactNode;
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
    lastElement?: HTMLElement
  ) => void;
  /** Node that will be used as sidebar header. */
  header?: React.ReactNode;
  /** A custom close event handler */
  onCancel?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void;
  /** Sets the open state of the modal */
  open: boolean;
  /** Sets the position of sidebar, either left or right. */
  position?: "left" | "right";
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** Sets the size of the sidebar when open. */
  size?:
    | "extra-small"
    | "small"
    | "medium-small"
    | "medium"
    | "medium-large"
    | "large"
    | "extra-large";
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar */
  focusableContainers?: CustomRefObject<HTMLElement>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** Padding to be set on the Sidebar header */
  headerPadding?: PaddingProps;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      open,
      bespokeFocusTrap,
      disableAutoFocus = false,
      disableEscKey = false,
      enableBackgroundUI = false,
      header,
      position = "right",
      size = "medium",
      children,
      onCancel,
      role = "dialog",
      focusFirstElement,
      focusableContainers,
      focusableSelectors,
      width,
      headerPadding = {},
      ...rest
    }: SidebarProps,
    ref
  ) => {
    const locale = useLocale();
    const { current: headerId } = useRef<string>(createGuid());
    const hasStickyFooter = useIsStickyFooterForm(children);

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (reference) => {
        sidebarRef.current = reference;
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref]
    );

    const isTopModal = useModalAria(sidebarRef);

    const closeIcon = () => {
      if (!onCancel) return null;
      return (
        <IconButton
          aria-label={locale.sidebar.ariaLabels.close()}
          onClick={onCancel}
          data-element="close"
        >
          <Icon type="close" />
        </IconButton>
      );
    };

    const componentTags = {
      "data-component": "sidebar",
      "data-element": rest["data-element"],
      "data-role": rest["data-role"],
    };

    const sidebar = (
      <StyledSidebar
        aria-modal={!enableBackgroundUI && isTopModal}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={
          !ariaLabelledBy && !ariaLabel ? headerId : ariaLabelledBy
        }
        ref={setRefs}
        position={position}
        size={size}
        data-element="sidebar"
        onCancel={onCancel}
        role={role}
        {...filterStyledSystemPaddingProps(rest)}
        width={width}
      >
        {header && (
          <SidebarHeader
            closeIcon={closeIcon()}
            {...headerPadding}
            id={headerId}
          >
            {header}
          </SidebarHeader>
        )}
        {!header && closeIcon()}
        <Box
          data-element="sidebar-content"
          pt="var(--spacing300)"
          pb="var(--spacing400)"
          px="var(--spacing400)"
          {...filterStyledSystemPaddingProps(rest)}
          scrollVariant="light"
          overflow={hasStickyFooter ? undefined : "auto"}
          flex="1"
        >
          <SidebarContext.Provider value={{ isInSidebar: true }}>
            {children}
          </SidebarContext.Provider>
        </Box>
      </StyledSidebar>
    );

    return (
      <Modal
        open={open}
        onCancel={onCancel}
        disableEscKey={disableEscKey}
        enableBackgroundUI={enableBackgroundUI}
        {...componentTags}
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
      </Modal>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
