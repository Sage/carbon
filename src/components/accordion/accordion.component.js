import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import createGuid from "../../__internal__/utils/helpers/guid";
import Events from "../../__internal__/utils/helpers/events";
import {
  StyledAccordionContainer,
  StyledAccordionHeadingsContainer,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionSubTitle,
  StyledAccordionIcon,
  StyledAccordionContentContainer,
  StyledAccordionContent,
} from "./accordion.style";
import ValidationIcon from "../../__internal__/validations";

const Accordion = React.forwardRef(
  (
    {
      borders = "default",
      defaultExpanded,
      expanded,
      onChange,
      children,
      handleKeyboardAccessibility, // eslint-disable-line react/prop-types
      id,
      index, // eslint-disable-line react/prop-types
      iconType = "chevron_down",
      iconAlign = "right",
      scheme = "white",
      size = "large",
      subTitle,
      title,
      width,
      headerSpacing,
      disableContentPadding = false,
      error,
      warning,
      info,
      buttonHeading,
      buttonWidth = 150,
      openTitle,
      ...rest
    },
    ref
  ) => {
    const isControlled = expanded !== undefined;

    const [isExpandedInternal, setIsExpandedInternal] = useState(
      defaultExpanded || false
    );

    const [contentHeight, setContentHeight] = useState(
      isExpandedInternal ? "auto" : 0
    );

    const accordionContent = useRef(null);

    const isExpanded = isControlled ? expanded : isExpandedInternal;

    useResizeObserver(accordionContent, () => {
      setContentHeight(accordionContent.current.scrollHeight);
    });

    useEffect(() => {
      setContentHeight(accordionContent.current.scrollHeight);
    }, [isExpanded, children]);

    const toggleAccordion = useCallback(
      (ev) => {
        if (!isControlled) {
          setIsExpandedInternal(!isExpanded);
        }
        if (onChange) onChange(ev, !isExpanded);
      },
      [isControlled, isExpanded, onChange]
    );

    const handleKeyDown = useCallback(
      (ev) => {
        if (handleKeyboardAccessibility) {
          handleKeyboardAccessibility(ev, index);
        }

        if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
          toggleAccordion(ev);
        }
      },
      [handleKeyboardAccessibility, index, toggleAccordion]
    );

    const guid = useRef(createGuid());
    const accordionId = id || `Accordion_${guid.current}`;
    const headerId = `AccordionHeader_${guid.current}`;
    const contentId = `AccordionContent_${guid.current}`;
    const showValidationIcon = !!(error || warning || info);

    const getTitle = () => (isExpanded ? openTitle || title : title);

    return (
      <StyledAccordionContainer
        id={accordionId}
        data-component="accordion"
        width={width}
        borders={borders}
        scheme={scheme}
        buttonHeading={buttonHeading}
        {...rest}
      >
        <StyledAccordionTitleContainer
          data-element="accordion-title-container"
          id={headerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={toggleAccordion}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          iconAlign={iconAlign}
          ref={ref}
          size={size}
          isExpanded={isExpanded}
          buttonHeading={buttonHeading}
          buttonWidth={buttonWidth}
          hasButtonProps={buttonHeading && headerSpacing}
          {...(buttonHeading && { role: "button", p: 0 })}
          {...headerSpacing}
        >
          <StyledAccordionHeadingsContainer
            data-element="accordion-headings-container"
            hasValidationIcon={showValidationIcon}
            buttonHeading={buttonHeading}
          >
            {!buttonHeading && typeof title === "string" ? (
              <StyledAccordionTitle data-element="accordion-title" size={size}>
                {title}
              </StyledAccordionTitle>
            ) : (
              getTitle()
            )}
            {!buttonHeading && (
              <>
                {showValidationIcon && (
                  <ValidationIcon
                    error={error}
                    warning={warning}
                    info={info}
                    tooltipPosition="top"
                    tabIndex={0}
                    ml={1}
                  />
                )}

                {subTitle && size === "large" && (
                  <StyledAccordionSubTitle>{subTitle}</StyledAccordionSubTitle>
                )}
              </>
            )}
          </StyledAccordionHeadingsContainer>

          <StyledAccordionIcon
            data-element="accordion-icon"
            type={iconType}
            isExpanded={isExpanded}
            iconAlign={iconAlign}
          />
        </StyledAccordionTitleContainer>
        <StyledAccordionContentContainer
          isExpanded={isExpanded}
          maxHeight={contentHeight}
        >
          <StyledAccordionContent
            role="region"
            data-element="accordion-content"
            id={contentId}
            aria-labelledby={headerId}
            ref={accordionContent}
            disableContentPadding={disableContentPadding}
          >
            {children}
          </StyledAccordionContent>
        </StyledAccordionContentContainer>
      </StyledAccordionContainer>
    );
  }
);

Accordion.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing: PropTypes.object,
  /** Disable padding for the content */
  disableContentPadding: PropTypes.bool,
  children: PropTypes.node,
  id: PropTypes.string,
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded: PropTypes.bool,
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded: PropTypes.bool,
  /** Sets icon type - accepted values: 'chevron_down' (default), 'dropdown' */
  iconType: PropTypes.oneOf(["chevron_down", "dropdown"]),
  /** Sets icon alignment - accepted values: 'left', 'right' (default) */
  iconAlign: PropTypes.oneOf(["left", "right"]),
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange: PropTypes.func,
  /** Sets accordion title. Will render inside a h3 if set to a string */
  title: PropTypes.node.isRequired,
  /** Sets accordion sub title */
  subTitle: PropTypes.string,
  /** Sets accordion size */
  size: PropTypes.oneOf(["large", "small"]),
  /** Toggles left and right borders */
  borders: PropTypes.oneOf(["default", "full", "none"]),
  /** Sets background as white or transparent */
  scheme: PropTypes.oneOf(["white", "transparent"]),
  /** Sets accordion width */
  width: PropTypes.string,
  /** An error message to be displayed in the tooltip */
  error: PropTypes.string,
  /** A warning message to be displayed in the tooltip */
  warning: PropTypes.string,
  /** An info message to be displayed in the tooltip */
  info: PropTypes.string,
  /** Renders the accordion heading in the style of a tertiary button */
  buttonHeading: PropTypes.bool,
  /** Width of the buttonHeading when it's set, defaults to 150px */
  buttonWidth: PropTypes.number,
  /** When the Accordion is open the title can change to this */
  openTitle: PropTypes.string,
};

Accordion.displayName = "Accordion";
export default Accordion;
