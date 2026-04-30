import React, { useState, useRef } from "react";

import { MarginProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import {
  StyledButtonToggleGroup,
  StyledButtonToggleWrapper,
} from "./button-toggle-group.style";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import Events from "../../../__internal__/utils/helpers/events";
import { ButtonToggleGroupProvider } from "./__internal__/button-toggle-group.context";
import Label from "../../../__internal__/label";
import HintText from "../../../__internal__/hint-text";

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
   * @deprecated `fieldHelp` is deprecated, please use `inputHint` instead.
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

  const actualHint = inputHint || labelHelp || fieldHelp;
  const labelId = label ? `${id}-label` : undefined;
  const hintTextId = actualHint ? `${id}-hint` : undefined;

  const getInnerButtons = () =>
    wrapperRef.current?.querySelectorAll<HTMLButtonElement>(
      "[data-button-toggle-internal]",
    );

  // needs to be state not ref, so that a rerender is triggered
  const [firstButton, setFirstButton] = useState<HTMLButtonElement>();

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
      {...tagComponent(dataComponent || "button-toggle-group", { ...props })}
    >
      {(label || actualHint) && (
        <div>
          {label && (
            <Label
              labelId={labelId}
              isLarge={size === "large"}
              disabled={disabled}
            >
              {label}
            </Label>
          )}
          {actualHint && (
            <HintText
              id={hintTextId}
              isDisabled={disabled}
              isLarge={size === "large"}
              marginBottom="0"
            >
              {actualHint}
            </HintText>
          )}
        </div>
      )}
      <StyledButtonToggleWrapper
        data-role="button-toggle-group-wrapper"
        ref={wrapperRef}
        $size={size}
        $isDisabled={disabled}
        $fullWidth={fullWidth}
      >
        <ButtonToggleGroupProvider
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
          }}
        >
          {children}
        </ButtonToggleGroupProvider>
      </StyledButtonToggleWrapper>
    </StyledButtonToggleGroup>
  );
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";
export default ButtonToggleGroup;
