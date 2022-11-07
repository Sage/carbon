import React, { useState, useRef, useEffect, useCallback } from "react";
import { SpaceProps } from "styled-system";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import { Expand } from "../../__internal__/utils/helpers/types";
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
  StyledAccordionContainerProps,
} from "./accordion.style";
import ValidationIcon from "../../__internal__/validations";

export interface AccordionProps
  extends StyledAccordionContainerProps,
    Expand<SpaceProps> {
  /** Width of the buttonHeading when it's set, defaults to 150px */
  buttonWidth?: number;
  children?: React.ReactNode;
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Disable padding for the content */
  disableContentPadding?: boolean;
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded?: boolean;
  /** An error message to be displayed in the tooltip */
  error?: string;
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing?: Expand<SpaceProps>;
  id?: string;
  /** Sets icon type - accepted values: 'chevron_down' (default), 'dropdown' */
  iconType?: "chevron_down" | "dropdown";
  /** Sets icon alignment - accepted values: 'left', 'right' (default) */
  iconAlign?: "left" | "right";
  /** Sets accordion title */
  title: React.ReactNode;
  /** An info message to be displayed in the tooltip */
  info?: string;
  /** Callback fired when expansion state changes */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean
  ) => void;
  /** When the Accordion is open the title can change to this */
  openTitle?: string;
  /** Sets accordion size */
  size?: "large" | "small";
  /** Sets accordion sub title */
  subTitle?: string;
  /** A warning message to be displayed in the tooltip */
  warning?: string;
}

export interface AccordionInternalProps {
  /** @ignore @private */
  handleKeyboardAccessibility?: (
    ev: React.KeyboardEvent<HTMLElement>,
    index?: number
  ) => void;
  /** @ignore @private */
  index?: number;
}

export const Accordion = React.forwardRef<
  HTMLDivElement,
  AccordionProps & AccordionInternalProps
>(
  (
    {
      borders = "default",
      defaultExpanded,
      expanded,
      onChange,
      children,
      handleKeyboardAccessibility,
      id,
      index,
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
    }: AccordionProps & AccordionInternalProps,
    ref
  ) => {
    const isControlled = expanded !== undefined;

    const [isExpandedInternal, setIsExpandedInternal] = useState(
      defaultExpanded || false
    );

    const [contentHeight, setContentHeight] = useState<string | number>(
      isExpandedInternal ? "auto" : 0
    );

    const accordionContent = useRef<HTMLDivElement>(null);

    const isExpanded = isControlled ? expanded : isExpandedInternal;

    useResizeObserver(accordionContent, () => {
      setContentHeight(accordionContent.current?.scrollHeight as number);
    });

    useEffect(() => {
      setContentHeight(accordionContent.current?.scrollHeight as number);
    }, [isExpanded]);

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
          buttonHeading={buttonHeading}
          buttonWidth={buttonWidth}
          hasButtonProps={
            buttonHeading && !(typeof headerSpacing === "undefined")
          }
          role="button"
          {...(buttonHeading && { p: 0 })}
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

Accordion.displayName = "Accordion";
export default Accordion;
