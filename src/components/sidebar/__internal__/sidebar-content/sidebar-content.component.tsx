import React from "react";
import { PaddingProps } from "styled-system";

import SidebarContext from "../sidebar.context";
import SidebarFooter from "../sidebar-footer";
import {
  StyledSidebarBody,
  StyledSidebarContent,
} from "./sidebar-content.style";

interface SidebarContentProps extends PaddingProps {
  children?: React.ReactNode;
  disableStickyOnSmallScreen: boolean;
  footer?: React.ReactNode;
  isSmallScreen: boolean;
  stickyFooter: boolean;
}

const SidebarContent = ({
  children,
  disableStickyOnSmallScreen,
  footer,
  isSmallScreen,
  stickyFooter,
  ...padding
}: SidebarContentProps) => {
  const hasCustomFooter =
    footer != null &&
    footer !== "" &&
    React.Children.toArray(footer).length > 0;
  const isStickyContentFocusable = isSmallScreen && !disableStickyOnSmallScreen;
  const content = (
    <SidebarContext.Provider
      value={{
        isInSidebar: true,
        isStickyContentFocusable,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );

  return (
    <StyledSidebarContent
      data-element="sidebar-content"
      data-role="sidebar-content"
      tabIndex={-1}
      $disableStickyOnSmallScreen={disableStickyOnSmallScreen}
      $hasCustomFooter={hasCustomFooter}
      $stickyFooter={stickyFooter}
      {...padding}
    >
      {hasCustomFooter ? (
        <StyledSidebarBody
          data-element="sidebar-body"
          data-role="sidebar-body"
          tabIndex={stickyFooter && isStickyContentFocusable ? 0 : -1}
          $disableStickyOnSmallScreen={disableStickyOnSmallScreen}
          $stickyFooter={stickyFooter}
          {...padding}
        >
          {content}
        </StyledSidebarBody>
      ) : (
        content
      )}
      {hasCustomFooter ? (
        <SidebarFooter
          disableStickyOnSmallScreen={disableStickyOnSmallScreen}
          sticky={stickyFooter}
        >
          {footer}
        </SidebarFooter>
      ) : null}
    </StyledSidebarContent>
  );
};

export default SidebarContent;
