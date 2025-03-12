import React, { useCallback, useEffect, useRef, useState } from "react";

import { SpaceProps } from "styled-system";

import {
  StyledAccordionContainerProps,
  StyledContent,
  StyledDetails,
  StyledIcon,
  StyledSubtitle,
  StyledSummary,
  StyledSummaryContentWrapper,
  StyledSummaryTitleWrapper,
  StyledTitle,
  StyledWrapper,
} from "./accordion.style";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Events from "../../__internal__/utils/helpers/events";
import createGuid from "../../__internal__/utils/helpers/guid";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import ValidationIcon from "../../__internal__/validations";

export interface AccordionProps
  extends StyledAccordionContainerProps,
    SpaceProps,
    TagProps {
  /** Content of the Accordion component */
  children?: React.ReactNode;
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Disable padding for the content */
  disableContentPadding?: boolean;
  /** An error message to be displayed in the tooltip */
  error?: string;
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded?: boolean;
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing?: SpaceProps;
  /** Sets icon alignment */
  iconAlign?: "left" | "right";
  /** Sets icon type */
  iconType?: "chevron_down" | "chevron_down_thick" | "dropdown";

  id?: string;
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
  /** Sets accordion title */
  title: React.ReactNode;
  /** A warning message to be displayed in the tooltip */
  warning?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      borders = "default",
      children,
      defaultExpanded,
      disableContentPadding,
      error,
      expanded,
      headerSpacing,
      iconAlign,
      iconType,
      id,
      info,
      onChange,
      openTitle,
      size = "large",
      subTitle,
      title,
      variant = "standard",
      warning,
      ...rest
    }: AccordionProps,
    ref,
  ) => {
    const isControlled = expanded !== undefined;
    const [isOpen, setIsOpen] = useState(defaultExpanded || false);
    const [contentHeight, setContentHeight] = useState<string | number>(
      isOpen ? "auto" : 0,
    );

    const contentRef = useRef<HTMLDivElement>(null);

    const isExpanded = isControlled ? expanded : isOpen;

    const toggleAccordion = useCallback(
      (
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => {
        if (!isControlled) {
          setIsOpen(!isExpanded);
        }
        onChange?.(ev, !isExpanded);
      },
      [isControlled, isExpanded, onChange],
    );

    useResizeObserver(contentRef, () => {
      setContentHeight(contentRef.current?.scrollHeight as number);
    });

    useEffect(() => {
      setContentHeight(contentRef.current?.scrollHeight as number);
    }, [isExpanded]);

    const handleKeyDown = useCallback(
      (ev: React.KeyboardEvent<HTMLElement>) => {
        if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
          ev.preventDefault();
          ev.currentTarget.click();

          toggleAccordion(ev);
        }
      },
      [toggleAccordion],
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
      <StyledWrapper
        borders={variant === "subtle" ? "none" : borders}
        id={accordionId}
        ref={ref}
        {...rest}
        {...tagComponent("accordion", rest)}
      >
        <StyledDetails id={headerId} isOpen={isExpanded}>
          <StyledSummary
            iconAlign={iconAlign || (variant === "standard" ? "right" : "left")}
            isOpen={isExpanded}
            aria-expanded={isExpanded}
            onClick={toggleAccordion}
            onKeyDown={handleKeyDown}
            size={size}
            variant={variant}
            {...headerSpacing}
            tabIndex={0}
          >
            <StyledSummaryContentWrapper>
              <StyledSummaryTitleWrapper>
                {typeof title === "string" ? (
                  <StyledTitle
                    data-element="accordion-title"
                    size={size}
                    variant={variant}
                  >
                    {isExpanded ? openTitle || title : title}
                  </StyledTitle>
                ) : (
                  getTitle()
                )}

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
              </StyledSummaryTitleWrapper>
              {subTitle && <StyledSubtitle>{subTitle}</StyledSubtitle>}
            </StyledSummaryContentWrapper>
            <StyledIcon
              data-element="accordion-icon"
              type={iconType || getIconType()}
              isOpen={isExpanded}
              iconAlign={
                iconAlign || (variant === "standard" ? "right" : "left")
              }
            />
          </StyledSummary>
          <StyledContent
            disableContentPadding={disableContentPadding}
            id={contentId}
            isOpen={isExpanded}
            maxHeight={contentHeight}
            ref={contentRef}
            variant={variant}
          >
            {children}
          </StyledContent>
        </StyledDetails>
      </StyledWrapper>
    );
  },
);

Accordion.displayName = "Accordion";
export default Accordion;
