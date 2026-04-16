import React, { useState, useRef, useEffect, useCallback } from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import createGuid from "../../__internal__/utils/helpers/guid";
import Events from "../../__internal__/utils/helpers/events";
import {
  StyledAccordionContainer,
  StyledAccordionTitleContainer,
  StyledAccordionTitleWrapper,
  StyledAccordionTitle,
  StyledAccordionSubTitle,
  StyledAccordionIcon,
  StyledAccordionContentContainer,
  StyledAccordionContent,
  StyledAccordionLine,
} from "./accordion.style";

import Button from "../button/__next__";
import useMediaQuery from "../../hooks/useMediaQuery";

export interface AccordionProps extends SpaceProps, TagProps {
  /* Unique identifier for the Accordion */
  id?: string;
  /** Content of the Accordion component */
  children?: React.ReactNode;
  /** Set the default state of expansion of the Accordion if component is to be used as uncontrolled */
  defaultExpanded?: boolean;
  /**
   * Disable padding for the content.
   * @deprecated Padding is no longer applied to the Accordion content by default. Any desired spacing can be applied directly to the provided content.
   */
  disableContentPadding?: boolean;
  /** Sets the expansion state of the Accordion if component is to be used as controlled */
  expanded?: boolean;
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing?: SpaceProps;
  /** Title of the Accordion */
  title: React.ReactNode;
  /** Title of the Accordion when it is open */
  openTitle?: string;
  /** Sets accordion sub title */
  subTitle?: string;
  /** Callback fired when expansion state changes */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
  ) => void;
  /** Sets Accordion size */
  size?: "small" | "medium" | "large";
  /**
   * Sets Accordion borders.
   *
   * **Deprecation Warning:** The "full" borders are deprecated and will be removed in a future release.
   */
  borders?: "default" | "none" | "full";
  /** Sets Accordion width */
  width?: string;
  /**
   * Sets Accordion variant.
   *
   * **Deprecation Warning:** The "subtle" variant is deprecated, please use "simple" instead.
   */
  variant?: "standard" | "simple" | "subtle";
  /**
   * Sets icon type
   * @deprecated Custom icon types on accordions are deprecated and will be removed in a future release.
   */
  iconType?: "chevron_down" | "chevron_down_thick" | "dropdown";
  /**
   * Sets icon alignment.
   * @deprecated Icon alignment on accordions is deprecated and will be removed in a future release. Icons will now render on the left by default.
   */
  iconAlign?: "left" | "right";
  /**
   * An error message to be displayed in the tooltip.
   * @deprecated Validation messages on accordions are no longer supported.
   */
  error?: string;
  /**
   * A warning message to be displayed in the tooltip.
   * @deprecated Validation messages on accordions are no longer supported.
   */
  warning?: string;
  /**
   * An info message to be displayed in the tooltip.
   * @deprecated Validation messages on accordions are no longer supported.
   */
  info?: string;
}

// Internal props needed for AccordionGroup behaviour
// TODO: can be removed when deprecated AccordionGroup is removed
export interface AccordionInternalProps {
  /** @ignore @private */
  handleKeyboardAccessibility?: (
    ev: React.KeyboardEvent<HTMLElement>,
    index?: number,
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
      iconType,
      iconAlign,
      size = "medium",
      subTitle,
      title,
      width,
      headerSpacing,
      disableContentPadding,
      error,
      warning,
      info,
      openTitle,
      variant = "standard",
      ...rest
    }: AccordionProps & AccordionInternalProps,
    ref,
  ) => {
    const isControlled = expanded !== undefined;

    const [isExpandedInternal, setIsExpandedInternal] = useState(
      defaultExpanded || false,
    );

    const [contentHeight, setContentHeight] = useState<string | number>(
      isExpandedInternal ? "auto" : 0,
    );

    const accordionContent = useRef<HTMLDivElement>(null);
    const accordionContentContainer = useRef<HTMLDivElement>(null);

    const isExpanded = isControlled ? expanded : isExpandedInternal;

    useResizeObserver(accordionContent, () => {
      setContentHeight(accordionContent.current?.scrollHeight as number);
    });

    useEffect(() => {
      setContentHeight(accordionContent.current?.scrollHeight as number);
    }, [isExpanded]);

    const allowMotion = useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

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

    // delay adding hidden attribute to match transition duration
    const delay = allowMotion ? 400 : 0;

    // React yet to add built-in support for hidden="until-found" and onBeforeMatch event
    // See https://github.com/facebook/react/issues/24740
    useEffect(() => {
      if (!isExpanded) {
        const timer = setTimeout(() => {
          accordionContentContainer.current?.setAttribute(
            "hidden",
            "until-found",
          );
        }, delay);
        return () => clearTimeout(timer);
      } else {
        accordionContentContainer.current?.removeAttribute("hidden");
        return undefined;
      }
    }, [isExpanded, delay]);

    useEffect(() => {
      const container = accordionContentContainer.current;
      // istanbul ignore next
      if (!container) return;

      const handleBeforeMatch = (e: Event) => {
        toggleAccordion(
          e as unknown as
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        );
      };

      container.addEventListener("beforematch", handleBeforeMatch);
      return () =>
        container.removeEventListener("beforematch", handleBeforeMatch);
    }, [toggleAccordion, isControlled, onChange]);

    const handleKeyDown = useCallback(
      (ev: React.KeyboardEvent<HTMLElement>) => {
        if (handleKeyboardAccessibility) {
          handleKeyboardAccessibility(ev, index);
        }

        if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
          ev.preventDefault();
          toggleAccordion(ev);
        }
      },
      [handleKeyboardAccessibility, index, toggleAccordion],
    );

    const guid = useRef(createGuid());
    const accordionId = id || `Accordion_${guid.current}`;
    const headerId = `AccordionHeader_${guid.current}`;
    const contentId = `AccordionContent_${guid.current}`;

    // standard accordion only supports small and medium size
    const standardSize: "small" | "medium" = size === "large" ? "medium" : size;

    // map deprecated subtle to simple
    const actualVariant = variant === "subtle" ? "simple" : variant;

    const getTitle = () => (isExpanded ? openTitle || title : title);

    const renderStandardTitle = () => {
      if (typeof title === "string") {
        return (
          <StyledAccordionTitle
            data-element="accordion-title"
            $size={standardSize}
          >
            {getTitle()}
          </StyledAccordionTitle>
        );
      }
      return getTitle();
    };

    const getIconType = () =>
      variant === "standard" && standardSize === "medium"
        ? "chevron_down"
        : "chevron_down_thick";

    const renderIcon = () => (
      <StyledAccordionIcon
        data-element="accordion-icon"
        data-role="accordion-icon"
        type={iconType || getIconType()}
        $isExpanded={isExpanded}
        $allowMotion={allowMotion}
      />
    );

    return (
      <StyledAccordionContainer
        id={accordionId}
        $width={width}
        $borders={borders}
        $variant={actualVariant}
        $isExpanded={isExpanded}
        $allowMotion={allowMotion}
        {...rest}
        {...tagComponent("accordion", rest)}
      >
        {actualVariant === "simple" ? (
          <Button
            data-role="accordion-simple-button"
            id={headerId}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={toggleAccordion}
            variantType="tertiary"
            size={size}
            className={isExpanded ? "active" : ""}
          >
            {renderIcon()}
            {getTitle()}
          </Button>
        ) : (
          <StyledAccordionTitleContainer
            data-element="accordion-title-container"
            id={headerId}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={toggleAccordion}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={ref}
            role="button"
            $size={standardSize}
            $iconAlign={iconAlign}
            {...headerSpacing}
          >
            {renderIcon()}
            <StyledAccordionTitleWrapper>
              {renderStandardTitle()}
              {subTitle && (
                <StyledAccordionSubTitle
                  data-element="accordion-subtitle"
                  $size={standardSize}
                >
                  {subTitle}
                </StyledAccordionSubTitle>
              )}
            </StyledAccordionTitleWrapper>
          </StyledAccordionTitleContainer>
        )}
        <StyledAccordionContentContainer
          ref={accordionContentContainer}
          $isExpanded={isExpanded}
          $height={contentHeight}
          $allowMotion={allowMotion}
          data-role="accordion-content-container"
        >
          {actualVariant === "simple" && <StyledAccordionLine />}
          <StyledAccordionContent
            role="region"
            data-element="accordion-content"
            data-role="accordion-content"
            id={contentId}
            aria-labelledby={headerId}
            ref={accordionContent}
            $variant={actualVariant}
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
