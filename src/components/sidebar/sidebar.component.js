import React, { useRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

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

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

export const SidebarContext = React.createContext({});

const Sidebar = React.forwardRef(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      open,
      disableEscKey = false,
      enableBackgroundUI = false,
      header,
      position = "right",
      size = "medium",
      children,
      onCancel,
      role = "dialog",
      focusableContainers,
      ...rest
    },
    ref
  ) => {
    const locale = useLocale();
    const { current: titleId } = useRef(createGuid());

    let sidebarRef = useRef(null);
    if (ref) sidebarRef = ref;
    const closeIcon = () => {
      if (!onCancel) return null;
      return (
        <IconButton
          aria-label={locale.sidebar.ariaLabels.close()}
          onAction={onCancel}
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
        aria-modal={!enableBackgroundUI}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={
          !ariaLabelledBy && !ariaLabel ? titleId : ariaLabelledBy
        }
        ref={sidebarRef}
        position={position}
        size={size}
        data-element="sidebar"
        onCancel={onCancel}
        role={role}
      >
        {header && <SidebarHeader id={titleId}>{header}</SidebarHeader>}
        {closeIcon()}
        <Box
          data-element="sidebar-content"
          pt="var(--spacing300)"
          pb="var(--spacing400)"
          px="var(--spacing400)"
          {...filterStyledSystemPaddingProps(rest)}
          scrollVariant="light"
          overflow="auto"
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
        className="carbon-sidebar"
        {...componentTags}
      >
        {enableBackgroundUI ? (
          sidebar
        ) : (
          <FocusTrap
            wrapperRef={sidebarRef}
            isOpen={open}
            additionalWrapperRefs={focusableContainers}
          >
            {sidebar}
          </FocusTrap>
        )}
      </Modal>
    );
  }
);

Sidebar.propTypes = {
  /** Styled system padding props to apply to Sidebar content */
  ...paddingPropTypes,
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby": PropTypes.string,
  /** Prop to specify the aria-label of the component */
  "aria-label": PropTypes.string,
  /** Prop to specify the aria-labeledby property of the component */
  "aria-labelledby": PropTypes.string,
  /** Modal content */
  children: PropTypes.node,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the modal */
  disableEscKey: PropTypes.bool,
  /** A boolean to track the open state of the dialog */
  open: PropTypes.bool.isRequired,
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI: PropTypes.bool,
  /** Sets the position of sidebar, either left or right. */
  position: PropTypes.oneOf(["left", "right"]),
  /** Sets the size of the sidebar when open. */
  size: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Node that will be used as sidebar header. */
  header: PropTypes.node,
  /** The ARIA role to be applied to the container */
  role: PropTypes.string,
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar */
  focusableContainers: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any })
  ),
};

export default Sidebar;
