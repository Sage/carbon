import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledTabTitle,
  StyledTitleContent,
  StyledLayoutWrapper,
} from "./tab-title.style";
import tagComponent from "../../../../utils/helpers/tags/tags";
import ValidationIcon from "../../../validations/validation-icon.component";
import createGuid from "../../../../utils/helpers/guid";

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
      ...tabTitleProps
    },
    ref
  ) => {
    const keys = useRef([]);

    if (siblings && !keys.current.length) {
      siblings.forEach(() => keys.current.push(createGuid()));
    }

    const handleClick = (ev) => {
      ev.stopPropagation();
      const customEvent = {
        ...ev,
        target: { ...ev.target, dataset: { tabid: dataTabId } },
      };
      onClick(customEvent);
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
      >
        <StyledTitleContent
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
          alternateStyling={alternateStyling || isInSidebar}
        >
          {renderContent()}

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
};

export default TabTitle;
