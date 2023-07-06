import React, { createContext, useMemo, useState, useRef } from "react";
import invariant from "invariant";

import { MarginProps } from "styled-system";
import FormField from "../../../__internal__/form-field";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import StyledButtonToggleGroup, {
  StyledButtonToggleGroupWrapper,
} from "./button-toggle-group.style";
import { ButtonToggle } from "..";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { InputGroupBehaviour } from "../../../__internal__/input-behaviour";
import Logger from "../../../__internal__/utils/logger";
import Events from "../../../__internal__/utils/helpers/events";

export interface CustomEvent {
  target: {
    name?: string;
    value?: string;
  };
}

export interface ButtonToggleGroupProps extends MarginProps, TagProps {
  /** Unique id for the root element of the component */
  id: string;
  /** Specifies the name prop to be applied to each button in the group */
  name?: string;
  /** Togglable buttons to be rendered. Only accepts children of type ButtonToggle */
  children?: React.ReactNode;
  /** aria-label for the group wrapper. Required for accessibility when no text label is provided */
  "aria-label"?: string;
  /** Text for the visible label of the button group. */
  label?: string;
  /** Text for the label's help tooltip. */
  labelHelp?: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth?: number | string;
  /** The text for the field help. */
  fieldHelp?: string;
  /** Sets the field help to inline. */
  fieldHelpInline?: boolean;
  /** Sets the label to be inline. */
  labelInline?: boolean;
  /** The percentage width of the label. */
  labelWidth?: number;
  /** If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent */
  fullWidth?: boolean;
  /** The alignment for the text in the label. */
  labelAlign?: "left" | "right";
  /** Callback triggered by pressing one of the child buttons. Use with controlled components to set the value prop to the value argument */
  onChange?: (
    ev: React.MouseEvent<HTMLButtonElement>,
    value?: string,
    name?: string
  ) => void;
  /** Determines which child button is selected when the component is used as a controlled component */
  value?: string;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /** set this to true to allow the buttons within the group to be deselected when already selected, leaving no selected button */
  allowDeselect?: boolean;
  variant?: "default" | "minor";
}

type ButtonToggleGroupContextType = {
  onButtonClick: (value: string) => void;
  handleKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  pressedButtonValue?: string;
  onChange?: (
    ev: React.MouseEvent<HTMLButtonElement>,
    value?: string,
    name?: string
  ) => void;
  name?: string;
  allowDeselect?: boolean;
  isInGroup: boolean;
  firstButton?: HTMLButtonElement;
  childButtonCallbackRef?: (button: HTMLButtonElement | null) => void;
  variant?: "default" | "minor";
};

let deprecateNameWarnTriggered = false;

const BUTTON_TOGGLE_SELECTOR = '[data-element="button-toggle-button"]';

export const ButtonToggleGroupContext = createContext<ButtonToggleGroupContextType>(
  {
    onButtonClick: /* istanbul ignore next */ () => {},
    handleKeyDown: /* istanbul ignore next */ () => {},
    pressedButtonValue: undefined,
    allowDeselect: false,
    isInGroup: false,
    variant: "minor",
  }
);

const ButtonToggleGroup = ({
  children,
  fieldHelp,
  fieldHelpInline,
  "aria-label": ariaLabel,
  label,
  labelHelp,
  labelSpacing,
  inputWidth,
  fullWidth,
  labelInline,
  labelWidth,
  labelAlign,
  name,
  onChange,
  value,
  variant,
  "data-component": dataComponent = "button-toggle-group",
  "data-element": dataElement,
  "data-role": dataRole,
  helpAriaLabel,
  id,
  allowDeselect,
  ...props
}: ButtonToggleGroupProps) => {
  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) => {
        return (
          !React.isValidElement(child) ||
          (child.type as React.FunctionComponent).displayName !==
            ButtonToggle.displayName
        );
      }
    );
    return !incorrectChild;
  }, [children]);

  invariant(
    hasCorrectItemStructure,
    `\`ButtonToggleGroup\` only accepts children of type \`${ButtonToggle.displayName}\``
  );

  const labelId = useRef(guid());

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [pressedButtonValue, setPressedButtonValue] = useState<string>();

  if (name && !deprecateNameWarnTriggered) {
    deprecateNameWarnTriggered = true;
    Logger.deprecate(
      `The \`name\` prop in \`ButtonToggleGroup\` component is deprecated and will soon be removed. It does not provide any functionality
      since the component can no longer be used in an uncontrolled fashion.`
    );
  }

  const onButtonClick = (buttonValue: string) => {
    let newValue: string | undefined = buttonValue;
    const currentValue = value || pressedButtonValue;
    if (allowDeselect && currentValue === buttonValue) {
      newValue = undefined;
    }
    setPressedButtonValue(newValue);
  };

  const getInnerButtons = () =>
    wrapperRef.current?.querySelectorAll(BUTTON_TOGGLE_SELECTOR);
  // needs to be state not ref, so that a rerender is triggered
  const [firstButton, setFirstButton] = useState<HTMLButtonElement>();

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    const innerButtons = getInnerButtons();
    // istanbul ignore if
    if (!innerButtons || !document.activeElement) {
      return;
    }
    const focusedIndex = Array.from(innerButtons).indexOf(
      document.activeElement
    );
    let nextElement;
    if (Events.isLeftKey(ev)) {
      const nextIndex =
        focusedIndex === 0 ? innerButtons.length - 1 : focusedIndex - 1;
      nextElement = innerButtons[nextIndex];
    } else if (Events.isRightKey(ev)) {
      const nextIndex = (focusedIndex + 1) % innerButtons.length;
      nextElement = innerButtons[nextIndex];
    }
    // istanbul ignore else
    if (nextElement instanceof HTMLButtonElement) {
      nextElement.focus();
    }
  };

  const childButtonCallbackRef = (button: HTMLButtonElement | null) => {
    // setTimeout needed as otherwise innerButtons aren't picked up by the query even though the ref is attached
    setTimeout(() => {
      // guard needed to avoid warnings about setting state on an unmounted component - the callback ref will
      // get called with null when the component is about to be unmounted, and it has been unmounted by the time
      // the setTimeout completes
      if (button) {
        const innerButtons = getInnerButtons();
        if (!innerButtons) {
          setFirstButton(undefined);
        } else if (button === innerButtons[0]) {
          setFirstButton(button);
        }
      }
    }, 0);
  };

  return (
    <TooltipProvider helpAriaLabel={helpAriaLabel}>
      <InputGroupBehaviour>
        <FormField
          label={label}
          labelHelp={labelHelp}
          labelSpacing={labelSpacing}
          fieldHelp={fieldHelp}
          fieldHelpInline={fieldHelpInline}
          labelInline={labelInline}
          labelWidth={labelWidth}
          labelAlign={labelAlign}
          labelId={labelId.current}
          data-component={dataComponent}
          data-role={dataRole}
          data-element={dataElement}
          id={id}
          labelAs="span"
          {...filterStyledSystemMarginProps(props)}
        >
          <ButtonToggleGroupContext.Provider
            value={{
              onButtonClick,
              handleKeyDown,
              pressedButtonValue: value || pressedButtonValue,
              onChange,
              name,
              allowDeselect,
              isInGroup: true,
              firstButton,
              childButtonCallbackRef,
              variant,
            }}
          >
            <StyledButtonToggleGroupWrapper
              labelInline={labelInline}
              ref={wrapperRef}
            >
              <StyledButtonToggleGroup
                {...(label
                  ? { "aria-labelledby": labelId.current }
                  : { "aria-label": ariaLabel })}
                inputWidth={inputWidth}
                fullWidth={fullWidth}
                role="group"
                data-component={dataComponent}
                data-role={dataRole}
                data-element={dataElement}
                id={id}
                {...filterStyledSystemMarginProps(props)}
              >
                {children}
              </StyledButtonToggleGroup>
            </StyledButtonToggleGroupWrapper>
          </ButtonToggleGroupContext.Provider>
        </FormField>
      </InputGroupBehaviour>
    </TooltipProvider>
  );
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";
export default ButtonToggleGroup;
