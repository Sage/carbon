import React, { useRef, useState } from "react";
import {
  StyledTabTitleButton,
  StyledTabTitleLink,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
} from "./tab-title.style";
import tagComponent from "../../../../__internal__/utils/helpers/tags/tags";
import ValidationIcon from "../../../../__internal__/validations/validation-icon.component";
import Icon from "../../../icon";
import Events from "../../../../__internal__/utils/helpers/events";
import { TooltipProvider } from "../../../../__internal__/tooltip-provider";
import TabTitleContext from "./tab-title.context";

export interface TabTitleProps {
  /** Identifier used for testing purposes */
  "data-role"?: string;
  title?: string;
  id?: string;
  dataTabId?: string;
  className?: string;
  children?: React.ReactNode;
  isTabSelected?: boolean;
  position?: "top" | "left";
  errorMessage?: string;
  warningMessage?: string;
  infoMessage?: string;
  error?: boolean;
  warning?: boolean;
  info?: boolean;
  borders?: boolean;
  noLeftBorder?: boolean;
  noRightBorder?: boolean;
  alternateStyling?: boolean;
  isInSidebar?: boolean;
  siblings?: React.ReactNode;
  titlePosition?: "before" | "after";
  href?: string;
  tabIndex?: number;
  size?: "default" | "large";
  align?: "left" | "right";
  customLayout?: React.ReactNode;
  onClick: (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  onKeyDown: (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}

const TabTitle = React.forwardRef(
  (
    {
      isTabSelected,
      dataTabId,
      "data-role": dataRole,
      title,
      position,
      error,
      warning,
      info,
      size = "default",
      onClick,
      titlePosition = "before",
      siblings,
      errorMessage = "",
      warningMessage = "",
      infoMessage = "",
      borders,
      alternateStyling = false,
      noLeftBorder = false,
      noRightBorder = false,
      customLayout,
      isInSidebar,
      href,
      onKeyDown,
      align,
      tabIndex,
      ...tabTitleProps
    }: TabTitleProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const isHref = !!href;
    const hasAlternateStyling = alternateStyling || isInSidebar;
    const hasFailedValidation = error || warning || info;
    const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
    const hasHover = useRef(false);

    const showTooltip = () => {
      setShouldShowTooltip(true);
    };

    const hideTooltip = () => {
      if (
        typeof ref === "object" &&
        ref?.current !== document.activeElement &&
        !hasHover.current
      ) {
        setShouldShowTooltip(false);
      }
    };

    const handleKeyDown = (
      ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      ev.stopPropagation();

      if (href && Events.isEnterOrSpaceKey(ev)) {
        return window.open(href, "_blank");
      }

      return onKeyDown(ev);
    };

    const handleClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      ev.preventDefault();

      const customEvent = {
        ...ev,
        target: { ...ev.target, dataset: { tabid: dataTabId } },
      };

      if (href) {
        onClick(customEvent);
        return window.open(href, "_blank");
      }

      // safari does not focus buttons by default
      // istanbul ignore else (ref is always passed as an object from Tabs component, if was only added to satisfy Typescript compiler)
      if (typeof ref === "object") {
        ref?.current?.focus();
      }

      return onClick(customEvent);
    };

    const renderContent = () => {
      if (customLayout) {
        return (
          <StyledLayoutWrapper hasCustomLayout>
            {customLayout}
          </StyledLayoutWrapper>
        );
      }

      if (!siblings) {
        return title;
      }

      const titleText = <React.Fragment key="title">{title}</React.Fragment>;

      const titleSiblings = (
        <StyledLayoutWrapper titlePosition={titlePosition} key="title-siblings">
          {React.Children.toArray(siblings).map((child) => {
            // istanbul ignore next
            if (!React.isValidElement(child)) {
              return child;
            }
            return React.cloneElement(child, {
              ...child.props,
              onClick: handleClick,
            });
          })}
        </StyledLayoutWrapper>
      );

      return titlePosition === "before"
        ? [titleText, titleSiblings]
        : [titleSiblings, titleText];
    };

    const titleChildren = (
      <>
        <StyledTitleContent
          data-role="tab-title-content"
          error={error}
          warning={warning}
          info={info}
          position={position}
          size={size}
          noLeftBorder={noLeftBorder}
          noRightBorder={noRightBorder}
          borders={borders}
          hasSiblings={!!siblings}
          isTabSelected={isTabSelected}
          hasCustomLayout={!!customLayout}
          alternateStyling={hasAlternateStyling}
          align={align}
          hasHref={!!href}
        >
          {renderContent()}
          {isHref && <Icon type="link" />}

          {hasFailedValidation && (
            <StyledLayoutWrapper
              position={position}
              hasCustomSibling={!!customLayout}
            >
              {error && (
                <ValidationIcon tooltipPosition="top" error={errorMessage} />
              )}

              {!error && warning && (
                <ValidationIcon
                  tooltipPosition="top"
                  warning={warningMessage}
                />
              )}

              {!warning && !error && info && (
                <ValidationIcon tooltipPosition="top" info={infoMessage} />
              )}
            </StyledLayoutWrapper>
          )}
        </StyledTitleContent>
        {!(hasFailedValidation || hasAlternateStyling) && isTabSelected && (
          <StyledSelectedIndicator
            data-element="tab-selected-indicator"
            data-role="tab-selected-indicator"
            position={position}
          />
        )}
      </>
    );

    const titleWrapperProps = {
      "aria-selected": isTabSelected,
      "data-element": "select-tab",
      "data-tabid": dataTabId,
      "data-role": dataRole,
      role: "tab",
      position,
      isTabSelected,
      error,
      warning,
      info,
      noRightBorder,
      noLeftBorder,
      alternateStyling: alternateStyling || isInSidebar,
      borders,
      isInSidebar,
      tabIndex,
      ...tabTitleProps,
      ...tagComponent("tab-header", tabTitleProps),
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      size,
      onMouseOver: () => {
        hasHover.current = true;
        showTooltip();
      },
      onMouseLeave: () => {
        hasHover.current = false;
        hideTooltip();
      },
      onFocus: showTooltip,
      onBlur: hideTooltip,
    };

    const tabTitle = isHref ? (
      <StyledTabTitleLink
        {...titleWrapperProps}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        target="_blank"
      >
        {titleChildren}
      </StyledTabTitleLink>
    ) : (
      <StyledTabTitleButton
        {...titleWrapperProps}
        type="button"
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
      >
        {titleChildren}
      </StyledTabTitleButton>
    );

    return (
      <TooltipProvider tooltipVisible={shouldShowTooltip}>
        <TabTitleContext.Provider value={{ isInTab: true }}>
          {tabTitle}
        </TabTitleContext.Provider>
      </TooltipProvider>
    );
  },
);

TabTitle.displayName = "TabTitle";

export default TabTitle;
