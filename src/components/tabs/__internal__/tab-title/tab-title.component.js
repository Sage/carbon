import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledTabTitle,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
} from "./tab-title.style";
import tagComponent from "../../../../utils/helpers/tags/tags";
import ValidationIcon from "../../../validations/validation-icon.component";
import createGuid from "../../../../utils/helpers/guid";
import Icon from "../../../icon";
import Events from "../../../../utils/helpers/events/events";

const TabTitle = React.forwardRef(
  (
    {
      isTabSelected,
      dataTabId,
      title,
      position = "top",
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
      borders = false,
      alternateStyling = false,
      noLeftBorder = false,
      noRightBorder = false,
      customLayout,
      isInSidebar,
      href,
      onKeyDown,
      ...tabTitleProps
    },
    ref
  ) => {
    const keys = useRef([]);
    const isHref = !!href;
    const hasAlternateStyling = alternateStyling || isInSidebar;
    const hasFailedValidation = error || warning || info;

    if (siblings && !keys.current.length) {
      siblings.forEach(() => keys.current.push(createGuid()));
    }

    const handleKeyDown = (ev) => {
      ev.stopPropagation();

      if (href && Events.isEnterOrSpaceKey(ev)) {
        return window.open(href, "_blank");
      }

      return onKeyDown(ev);
    };

    const handleClick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const customEvent = {
        ...ev,
        target: { ...ev.target, dataset: { tabid: dataTabId } },
      };

      if (href) {
        onClick(customEvent);
        return window.open(href, "_blank");
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
          {siblings.map((child, index) => {
            const key = child.props.key || keys.current[index];
            return React.cloneElement(child, {
              ...child.props,
              onClick: handleClick,
              key,
            });
          })}
        </StyledLayoutWrapper>
      );

      return titlePosition === "before"
        ? [titleText, titleSiblings]
        : [titleSiblings, titleText];
    };

    return (
      <StyledTabTitle
        ref={ref}
        aria-selected={isTabSelected}
        data-element="select-tab"
        data-tabid={dataTabId}
        role="tab"
        position={position}
        isTabSelected={isTabSelected}
        error={error}
        warning={warning}
        info={info}
        size={size}
        noRightBorder={noRightBorder}
        onClick={onClick}
        alternateStyling={alternateStyling || isInSidebar}
        borders={borders}
        isInSidebar={isInSidebar}
        {...tabTitleProps}
        {...tagComponent("tab-header", tabTitleProps)}
        onKeyDown={handleKeyDown}
      >
        <StyledTitleContent
          {...(isHref && { href, target: "_blank", as: "a" })}
          error={error}
          warning={warning}
          info={info}
          position={position}
          size={size}
          onClick={handleClick}
          noLeftBorder={noLeftBorder}
          noRightBorder={noRightBorder}
          borders={borders}
          hasSiblings={!!siblings}
          isTabSelected={isTabSelected}
          hasCustomLayout={!!customLayout}
          alternateStyling={hasAlternateStyling}
        >
          {renderContent()}
          {isHref && <Icon type="link" />}

          <StyledLayoutWrapper hasCustomSibling={!!customLayout}>
            {error && (
              <ValidationIcon
                onClick={handleClick}
                tooltipPosition="top"
                error={errorMessage}
              />
            )}

            {!error && warning && (
              <ValidationIcon
                onClick={handleClick}
                tooltipPosition="top"
                warning={warningMessage}
              />
            )}

            {!warning && !error && info && (
              <ValidationIcon
                onClick={handleClick}
                tooltipPosition="top"
                info={infoMessage}
              />
            )}
          </StyledLayoutWrapper>
        </StyledTitleContent>
        {!(hasFailedValidation || hasAlternateStyling) && isTabSelected && (
          <StyledSelectedIndicator
            data-element="tab-selected-indicator"
            position={position}
            size={size}
          />
        )}
      </StyledTabTitle>
    );
  }
);

TabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isTabSelected: PropTypes.bool,
  position: PropTypes.oneOf(["top", "left"]),
  className: PropTypes.string,
  dataTabId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.string,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool,
  size: PropTypes.oneOf(["default", "large"]),
  titlePosition: PropTypes.oneOf(["before", "after"]),
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  siblings: PropTypes.arrayOf(PropTypes.node),
  borders: PropTypes.bool,
  alternateStyling: PropTypes.bool,
  noLeftBorder: PropTypes.bool,
  noRightBorder: PropTypes.bool,
  customLayout: PropTypes.node,
  isInSidebar: PropTypes.bool,
  href: PropTypes.string,
};

export default TabTitle;
