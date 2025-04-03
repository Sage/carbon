import React, { useMemo, useState, useRef, useContext } from "react";
import invariant from "invariant";

import { MarginProps } from "styled-system";
import FormField from "../../../__internal__/form-field";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import StyledButtonToggleGroup from "./button-toggle-group.style";
import { ButtonToggle } from "..";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TooltipProvider } from "../../../__internal__/tooltip-provider";
import { InputGroupBehaviour } from "../../../__internal__/input-behaviour";
import Events from "../../../__internal__/utils/helpers/events";
import NewValidationContext from "../../carbon-provider/__internal__/new-validation.context";
import ButtonToggleGroupContext from "./__internal__/button-toggle-group.context";
import HintText from "../../../__internal__/hint-text";
import Logger from "../../../__internal__/utils/logger";

let deprecateUncontrolledWarnTriggered = false;

export interface ButtonToggleGroupProps extends MarginProps, TagProps {
  /** Unique id for the root element of the component */
  id: string;
  /** Toggle buttons to be rendered. Only accepts children of type ButtonToggle */
  children?: React.ReactNode;
  /** aria-label for the group wrapper. Required for accessibility when no text label is provided */
  "aria-label"?: string;
  /** Text for the visible label of the button group. */
  label?: string;
  /** [Legacy] Text for the label's help tooltip. */
  labelHelp?: React.ReactNode;
  /** [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: React.ReactNode;
  /** The percentage width of the ButtonToggleGroup. */
  inputWidth?: number | string;
  /** [Legacy] The text for the field help. */
  fieldHelp?: string;
  /** [Legacy] Sets the field help to inline. */
  fieldHelpInline?: boolean;
  /** [Legacy] Sets the label to be inline. */
  labelInline?: boolean;
  /** [Legacy] The percentage width of the label. */
  labelWidth?: number;
  /** If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent */
  fullWidth?: boolean;
  /** Callback triggered by pressing one of the child buttons. Use with controlled components to set the value prop to the value argument */
  onChange?: (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void;
  /** Determines which child button is selected when the component is used as a controlled component */
  value?: string;
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
  /** Allow buttons within the group to be deselected when already selected, leaving no selected button */
  allowDeselect?: boolean;
  /** Disable all user interaction. */
  disabled?: boolean;
  /** @private @internal @ignore */
  "data-component"?: string;
}

const BUTTON_TOGGLE_SELECTOR = '[data-element="button-toggle-button"]';

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
  fullWidth,
  labelInline,
  labelWidth,
  onChange,
  value,
  helpAriaLabel,
  id,
  allowDeselect,
  disabled,
  ...props
}: ButtonToggleGroupProps) => {
  const hasCorrectItemStructure = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) =>
        !React.isValidElement(child) ||
        (child.type as React.FunctionComponent).displayName !== "ButtonToggle",
    );
    return !incorrectChild;
  }, [children]);

  invariant(
    hasCorrectItemStructure,
    `\`ButtonToggleGroup\` only accepts children of type \`${ButtonToggle.displayName}\``,
  );

  if (!deprecateUncontrolledWarnTriggered && !onChange) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Button Toggle Group` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
  }

  const labelId = useRef(guid());
  const hintTextId = useRef(guid());

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [pressedButtonValue, setPressedButtonValue] = useState<string>();

  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const computeLabelPropValues = <T,>(prop: T): undefined | T =>
    validationRedesignOptIn ? undefined : prop;

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
      document.activeElement,
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
    <TooltipProvider helpAriaLabel={helpAriaLabel}>
      <InputGroupBehaviour>
        <FormField
          label={label}
          labelHelp={computeLabelPropValues(labelHelp)}
          labelSpacing={computeLabelPropValues(labelSpacing)}
          fieldHelp={computeLabelPropValues(fieldHelp)}
          fieldHelpInline={computeLabelPropValues(fieldHelpInline)}
          labelInline={computeLabelPropValues(labelInline)}
          labelWidth={computeLabelPropValues(labelWidth)}
          labelId={labelId.current}
          id={id}
          labelAs="span"
          disabled={disabled}
          {...filterStyledSystemMarginProps(props)}
          {...tagComponent(
            props["data-component"] ?? "button-toggle-group",
            props,
          )}
        >
          <ButtonToggleGroupContext.Provider
            value={{
              onButtonClick,
              handleKeyDown,
              pressedButtonValue: value || pressedButtonValue,
              onChange,
              allowDeselect,
              isInGroup: true,
              isDisabled: disabled,
              firstButton,
              childButtonCallbackRef,
              hintTextId: inputHint ? hintTextId.current : undefined,
            }}
          >
            {inputHint && (
              <HintText
                id={hintTextId.current}
                isDisabled={disabled}
                marginBottom="var(--spacing150)"
              >
                {inputHint}
              </HintText>
            )}
            <StyledButtonToggleGroup
              ref={wrapperRef}
              {...(label
                ? { "aria-labelledby": labelId.current }
                : { "aria-label": ariaLabel })}
              labelInline={labelInline}
              inputWidth={inputWidth}
              fullWidth={fullWidth}
              role="group"
              id={id}
              disabled={disabled}
            >
              {children}
            </StyledButtonToggleGroup>
          </ButtonToggleGroupContext.Provider>
        </FormField>
      </InputGroupBehaviour>
    </TooltipProvider>
  );
};

ButtonToggleGroup.displayName = "ButtonToggleGroup";
export default ButtonToggleGroup;
