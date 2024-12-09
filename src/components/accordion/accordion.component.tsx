import React, { useState, useRef, useEffect, useCallback } from "react";
import { SpaceProps } from "styled-system";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import createGuid from "../../__internal__/utils/helpers/guid";
import Events from "../../__internal__/utils/helpers/events";
import Logger from "../../__internal__/utils/logger";
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
    SpaceProps {
  /** Width of the buttonHeading when it's set, defaults to 150px */
  buttonWidth?: number | string;
  /** Content of the Accordion component */
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
  headerSpacing?: SpaceProps;
  id?: string;
  /** Sets icon type */
  iconType?: "chevron_down" | "chevron_down_thick" | "dropdown";
  /** Sets icon alignment */
  iconAlign?: "left" | "right";
  /** Sets accordion title */
  title: React.ReactNode;
  /** An info message to be displayed in the tooltip */
  info?: string;
  /** Callback fired when expansion state changes */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
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
    index?: number,
  ) => void;
  /** @ignore @private */
  index?: number;
}

let deprecatedSchemeWarnTriggered = false;
let deprecatedButtonHeadingWarnTriggered = false;

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
      iconType,
      iconAlign,
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
      buttonWidth = "150px",
      openTitle,
      variant = "standard",
      ...rest
    }: AccordionProps & AccordionInternalProps,
    ref,
  ) => {
    if (!deprecatedSchemeWarnTriggered && scheme === "transparent") {
      deprecatedSchemeWarnTriggered = true;
      Logger.deprecate(
        "The `scheme` prop for `Accordion` component is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedButtonHeadingWarnTriggered && buttonHeading) {
      deprecatedButtonHeadingWarnTriggered = true;
      Logger.deprecate(
        "The `buttonHeading` prop for `Accordion` component is deprecated and will soon be removed. Please use `subtle` variant instead.",
      );
    }

    const isControlled = expanded !== undefined;

    const [isExpandedInternal, setIsExpandedInternal] = useState(
      defaultExpanded || false,
    );

    const [contentHeight, setContentHeight] = useState<string | number>(
      isExpandedInternal ? "auto" : 0,
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
      (
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => {
        if (!isControlled) {
          setIsExpandedInternal(!isExpanded);
        }
        onChange?.(ev, !isExpanded);
      },
      [isControlled, isExpanded, onChange],
    );

    const handleKeyDown = useCallback(
      (ev: React.KeyboardEvent<HTMLElement>) => {
        if (handleKeyboardAccessibility) {
          handleKeyboardAccessibility(ev, index);
        }

        if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
          toggleAccordion(ev);
        }
      },
      [handleKeyboardAccessibility, index, toggleAccordion],
    );

    const guid = useRef(createGuid());
    const accordionId = id || `Accordion_${guid.current}`;
    const headerId = `AccordionHeader_${guid.current}`;
    const contentId = `AccordionContent_${guid.current}`;
    const showValidationIcon = !!(error || warning || info);

    const getTitle = () => (isExpanded ? openTitle || title : title);

    const getIconType = () =>
      size === "small" || variant === "subtle"
        ? "chevron_down_thick"
        : "chevron_down";

    return (
      <StyledAccordionContainer
        id={accordionId}
        data-component="accordion"
        data-role="accordion-container"
        width={width}
        borders={variant === "subtle" ? "none" : borders}
        scheme={scheme}
        buttonHeading={buttonHeading}
        variant={variant}
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
          iconAlign={iconAlign || (variant === "standard" ? "right" : "left")}
          ref={ref}
          size={size}
          buttonHeading={buttonHeading}
          isExpanded={isExpanded}
          variant={variant}
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
              <StyledAccordionTitle
                data-element="accordion-title"
                size={size}
                variant={variant}
              >
                {title}
              </StyledAccordionTitle>
            ) : (
              getTitle()
            )}
            {!buttonHeading && variant !== "subtle" && (
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

                {subTitle && size === "large" && variant === "standard" && (
                  <StyledAccordionSubTitle>{subTitle}</StyledAccordionSubTitle>
                )}
              </>
            )}
          </StyledAccordionHeadingsContainer>

          <StyledAccordionIcon
            data-element="accordion-icon"
            type={iconType || getIconType()}
            isExpanded={isExpanded}
            iconAlign={iconAlign || (variant === "standard" ? "right" : "left")}
          />
        </StyledAccordionTitleContainer>
        <StyledAccordionContentContainer
          isExpanded={isExpanded}
          maxHeight={contentHeight}
          data-role="accordion-content-container"
        >
          <StyledAccordionContent
            role="region"
            data-element="accordion-content"
            data-role="accordion-content"
            id={contentId}
            aria-labelledby={headerId}
            ref={accordionContent}
            disableContentPadding={disableContentPadding}
            variant={variant}
          >
            {children}
          </StyledAccordionContent>
        </StyledAccordionContentContainer>
      </StyledAccordionContainer>
    );
  },
);

Accordion.displayName = "Accordion";
export default Accordion;
