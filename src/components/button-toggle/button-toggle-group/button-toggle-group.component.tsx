import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import {
  StyledButtonToggleGroup,
  StyledLabelWrapper,
  StyledButtonToggleWrapper,
  StyledActiveIndicator,
} from "./button-toggle-group.style";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import Events from "../../../__internal__/utils/helpers/events";
import ButtonToggleGroupContext from "./__internal__/button-toggle-group.context";
import Label from "../../../__internal__/label";
import HintText from "../../../__internal__/hint-text";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { getWindow } from "../../../__internal__/dom/globals";

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

export interface ButtonToggleGroupProps extends MarginProps, TagProps {
  /** Unique id for the root element of the component. */
  id: string;
  /** Toggle buttons to be rendered. Only accepts children of type ButtonToggle */
  children?: React.ReactNode;
  /** Sets an aria-label for the group, must be provided if there is no visible label. */
  "aria-label"?: string;
  /** Visible label for the group. */
  label?: string;
  /**
   * [Legacy] Text for the label's help tooltip.
   * @deprecated Help tooltips are no longer supported, please use the `inputHint` prop instead.
   */
  labelHelp?: React.ReactNode;
  /**
   * [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8),
   * @deprecated Custom label spacing is no longer supported for this component.
   */
  labelSpacing?: 1 | 2;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: React.ReactNode;
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth?: number | string;
  /**
   * [Legacy] The text for the field help.
   * @deprecated `fieldHelp` is no longer supported, please use `inputHint` instead.
   */
  fieldHelp?: string;
  /**
   * [Legacy] Sets the field help to inline.
   * @deprecated `fieldHelpInline` is no longer supported.
   */
  fieldHelpInline?: boolean;
  /**
   * [Legacy] Sets the label to be inline.
   * @deprecated Inline labels are no longer supported.
   */
  labelInline?: boolean;
  /**
   * [Legacy] The percentage width of the label.
   * @deprecated `labelWidth` is no longer supported.
   */
  labelWidth?: number;
  /** If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent */
  fullWidth?: boolean;
  /** Callback triggered by pressing one of the child buttons. */
  onChange: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  /** Determines which child button is selected */
  value: string;
  /**
   * [Legacy] Aria label for rendered help component.
   * @deprecated Help tooltips are no longer supported.
   */
  helpAriaLabel?: string;
  /** Allow selected buttons within the group to be deselected. */
  allowDeselect?: boolean;
  /** Disable the group. */
  disabled?: boolean;
  /** Size of the ButtonToggleGroup */
  size?: "small" | "medium" | "large";
  /** @private @internal @ignore */
  "data-component"?: string;
}

const ButtonToggleGroup = ({
  children,
  fieldHelp,
  fieldHelpInline,
  "aria-label": ariaLabel,
  label,
  labelHelp,
  labelSpacing,
  inputHint,
  inputWidth,
  fullWidth = false,
  labelInline,
  labelWidth,
  onChange,
  value,
  helpAriaLabel,
  id,
  allowDeselect = false,
  disabled = false,
  size = "medium",
  "data-component": dataComponent,
  ...props
}: ButtonToggleGroupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const actualHint = inputHint || labelHelp;
  const labelId = label ? `${id}-label` : undefined;
  const hintTextId = actualHint ? `${id}-hint` : undefined;

  const getInnerButtons = () =>
    wrapperRef.current?.querySelectorAll<HTMLButtonElement>(
      "[data-button-toggle-internal]",
    );

  // needs to be state not ref, so that a rerender is triggered
  const [firstButton, setFirstButton] = useState<HTMLButtonElement>();

  const [indicator, setIndicator] = useState<{
    rect: { left: number; top: number; width: number; height: number };
    isDisabled: boolean;
  } | null>(null);

  // the indicator is only visible while it slides, otherwise the pressed button paints its own background
  const [isIndicatorSliding, setIsIndicatorSliding] = useState(false);
  const previousValue = useRef(value);

  useIsomorphicLayoutEffect(() => {
    if (value && previousValue.current && value !== previousValue.current) {
      setIsIndicatorSliding(!prefersReducedMotion);
    }
    previousValue.current = value;
  }, [value, prefersReducedMotion]);

  const updateIndicator = () => {
    const activeButton = wrapperRef.current?.querySelector<HTMLButtonElement>(
      '[data-button-toggle-internal][aria-pressed="true"]',
    );

    if (!activeButton) {
      setIndicator(null);
      return;
    }

    const next = {
      rect: {
        left: activeButton.offsetLeft,
        top: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
      },
      isDisabled: activeButton.disabled,
    };

    setIndicator((prev) =>
      prev &&
      prev.rect.left === next.rect.left &&
      prev.rect.top === next.rect.top &&
      prev.rect.width === next.rect.width &&
      prev.rect.height === next.rect.height &&
      prev.isDisabled === next.isDisabled
        ? prev
        : next,
    );
  };

  // runs after every render so the indicator follows changes to the pressed button, children and layout
  useIsomorphicLayoutEffect(updateIndicator);

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const observer = new ResizeObserver(updateIndicator);
    /* istanbul ignore else */
    if (wrapper) observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    const innerButtons = getInnerButtons();
    // istanbul ignore if
    if (!innerButtons || !document.activeElement) {
      return;
    }

    const focusedIndex = Array.from(innerButtons).indexOf(
      document.activeElement as HTMLButtonElement,
    );

    let nextElement: HTMLButtonElement | undefined;

    if (Events.isLeftKey(ev)) {
      ev.preventDefault();
      const nextIndex =
        focusedIndex === 0 ? innerButtons.length - 1 : focusedIndex - 1;
      nextElement = innerButtons[nextIndex];
    } else if (Events.isRightKey(ev)) {
      ev.preventDefault();
      const nextIndex = (focusedIndex + 1) % innerButtons.length;
      nextElement = innerButtons[nextIndex];
    }

    nextElement?.focus();
  };

  const childButtonCallbackRef = (button: HTMLButtonElement | null) => {
    // setTimeout needed as otherwise innerButtons aren't picked up by the query even though the ref is attached
    setTimeout(() => {
      // guard needed to avoid warnings about setting state on an unmounted component - the callback ref will
      // get called with null when the component is about to be unmounted, and it has been unmounted by the time
      // the setTimeout completes
      /* istanbul ignore else */
      if (button) {
        const innerButtons = getInnerButtons();
        /* istanbul ignore if */
        if (!innerButtons) {
          setFirstButton(undefined);
        } else if (button === innerButtons[0]) {
          setFirstButton(button);
        }
      }
    }, 0);
  };

  return (
    <StyledButtonToggleGroup
      id={id}
      role="group"
      {...(label && { "aria-labelledby": labelId })}
      aria-label={ariaLabel}
      $size={size}
      $fullWidth={fullWidth}
      $width={inputWidth}
      {...filterStyledSystemMarginProps(props)}
      {...tagComponent(dataComponent || "button-toggle-group", props)}
    >
      {(label || actualHint) && (
        <StyledLabelWrapper>
          {label && (
            <Label id={labelId} size={size} disabled={disabled}>
              {label}
            </Label>
          )}
          {actualHint && (
            <HintText id={hintTextId} disabled={disabled} size={size}>
              {actualHint}
            </HintText>
          )}
        </StyledLabelWrapper>
      )}
      <StyledButtonToggleWrapper
        data-role="button-toggle-group-wrapper"
        ref={wrapperRef}
        $size={size}
        $isDisabled={disabled}
        $fullWidth={fullWidth}
      >
        {indicator && (
          <StyledActiveIndicator
            aria-hidden
            data-role="button-toggle-active-indicator"
            $size={size}
            $isDisabled={disabled || indicator.isDisabled}
            $isSliding={isIndicatorSliding}
            $disableTransitions={!!prefersReducedMotion}
            $rect={indicator.rect}
            onTransitionEnd={() => setIsIndicatorSliding(false)}
          />
        )}
        <ButtonToggleGroupContext.Provider
          value={{
            handleKeyDown,
            pressedButtonValue: value,
            onChange,
            allowDeselect,
            isDisabled: disabled,
            firstButton,
            childButtonCallbackRef,
            hintTextId: inputHint ? hintTextId : undefined,
            size,
            fullWidth,
            isIndicatorSliding,
          }}
        >
          {children}
        </ButtonToggleGroupContext.Provider>
      </StyledButtonToggleWrapper>
    </StyledButtonToggleGroup>
  );
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";
export default ButtonToggleGroup;
