import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  RefAttributes,
  useImperativeHandle,
} from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";

import Events from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../__internal__/fieldset";
import SimpleColor, { SimpleColorProps } from "./simple-color";
import RadioButtonMapper from "../../__internal__/radio-button-mapper/radio-button-mapper.component";
import { StyledContent, StyledColorOptions } from "./simple-color-picker.style";
import ValidationIcon from "../../__internal__/validations/validation-icon.component";
import { InputGroupContext } from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ValidationProps } from "../../__internal__/validations";
import Logger from "../../__internal__/utils/logger";

let deprecateUncontrolledWarnTriggered = false;

export interface SimpleColorPickerProps extends ValidationProps, MarginProps {
  /** The SimpleColor components to be rendered in the group */
  children?: React.ReactNode;
  /** prop that represents childWidth */
  childWidth?: string | number;
  /** The content for the Legend */
  legend: string;
  /** prop that sets max-width in css */
  maxWidth?: string | number;
  /** The name to apply to the input. */
  name: string;
  /** Prop for `onChange` events */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onKeyDown` events */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** When true, validation icon will be placed on legend instead of being placed by the input */
  validationOnLegend?: boolean;
  /** The currently selected color. */
  value?: string;
}

export interface SimpleColorPickerRef {
  /** List of color input HTML refs */
  gridItemRefs: (HTMLInputElement | null)[];
}

export const SimpleColorPicker = React.forwardRef<
  SimpleColorPickerRef,
  SimpleColorPickerProps
>((props: SimpleColorPickerProps, ref) => {
  const {
    children,
    error,
    warning,
    info,
    name,
    legend,
    onChange,
    onBlur,
    onKeyDown,
    value,
    maxWidth = 300,
    childWidth = 58,
    validationOnLegend,
    required,
    ...rest
  } = props;

  const hasProperChildren: boolean = useMemo(() => {
    const invalidChild = React.Children.toArray(children).find((child) => {
      return (
        typeof child === "string" ||
        (React.isValidElement(child) &&
          (child.type as React.FunctionComponent).displayName !== "SimpleColor")
      );
    });

    return !invalidChild;
  }, [children]);

  invariant(
    hasProperChildren,
    `SimpleColorPicker accepts only children of type \`${SimpleColor.displayName}\`.`,
  );

  const filteredChildren = useMemo(
    () =>
      React.Children.toArray(children).filter((child) =>
        React.isValidElement(child),
      ) as React.FunctionComponentElement<
        SimpleColorProps & RefAttributes<HTMLInputElement>
      >[],
    [children],
  );

  const internalRef = useRef<HTMLDivElement | null>(null);
  const [focusedElement, setFocusedElement] = useState<EventTarget | null>(
    null,
  );
  const itemsPerRow = Math.floor(+maxWidth / +childWidth);
  const rowCount = Math.ceil(filteredChildren?.length / itemsPerRow);
  let blankSlots = itemsPerRow * rowCount - filteredChildren?.length;
  let currentRow = 1;
  let loopCounter = 1;

  const gridItemRefs = useRef<Array<HTMLInputElement | null>>([]);

  const navigationGrid = filteredChildren.map((child, index) => {
    const allowUp = currentRow !== 1;
    let allowDown = false;

    if (currentRow + 1 === rowCount && blankSlots - itemsPerRow < 0) {
      allowDown = true;
      blankSlots += 1;
    } else if (
      currentRow + 1 !== rowCount &&
      currentRow !== rowCount &&
      rowCount > 1
    ) {
      allowDown = true;
    }

    if (loopCounter === itemsPerRow) {
      loopCounter = 0;
      currentRow += 1;
    }

    let upItem;

    if (allowUp) {
      upItem = index - itemsPerRow;
    }

    let downItem;

    if (allowDown) {
      downItem = itemsPerRow + index;
    }

    const childProps = {
      ref: (element: HTMLInputElement | null) => {
        gridItemRefs.current[index] = element;
      },
      "data-up": allowUp,
      "data-down": allowDown,
      "data-item-up": upItem,
      "data-item-down": downItem,
      required,
    };

    loopCounter += 1;

    return React.cloneElement(child, childProps);
  });

  useImperativeHandle(ref, () => ({ gridItemRefs: gridItemRefs.current }), [
    gridItemRefs,
  ]);

  const getElementPosition = useCallback(
    (target: HTMLInputElement) => {
      return navigationGrid.findIndex((element) => {
        return target.getAttribute("value") === element.props.value;
      });
    },
    [navigationGrid],
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(e);
      }

      const arrowKeys = [
        Events.isLeftKey(e),
        Events.isUpKey(e),
        Events.isRightKey(e),
        Events.isDownKey(e),
      ];

      if (!arrowKeys.includes(true)) return;

      e.preventDefault();

      let itemIndex: number | null = null;

      const target = e.target as HTMLInputElement;

      if (Events.isUpKey(e)) {
        if (target.getAttribute("data-up") !== "true") return;
        itemIndex = +(target.getAttribute("data-item-up") as string);
      } else if (Events.isDownKey(e)) {
        if (target.getAttribute("data-down") !== "true") return;
        itemIndex = +(target.getAttribute("data-item-down") as string);
      }

      if (Events.isLeftKey(e) || Events.isRightKey(e)) {
        if (Events.isLeftKey(e)) {
          itemIndex = getElementPosition(target) - 1;
        } else {
          itemIndex = getElementPosition(target) + 1;
        }

        if (itemIndex < 0) {
          itemIndex = navigationGrid.length - 1;
        } else if (itemIndex > navigationGrid.length - 1) {
          itemIndex = 0;
        }
      }

      /* istanbul ignore else */
      if (itemIndex !== null) {
        const item = gridItemRefs.current[itemIndex];

        item?.focus();
        item?.click();
      }
    },
    [onKeyDown, navigationGrid, getElementPosition],
  );

  const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    ev.preventDefault();

    setTimeout(() => {
      const hasBlurred = !gridItemRefs?.current?.find(
        (colorRef) => colorRef === document.activeElement,
      );
      /* istanbul ignore else */
      if (onBlur && hasBlurred) {
        onBlur(ev);
      }
    }, 5);
  };

  const handleOnMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
    // If the mousedown event occurred on the currently-focused <SimpleColor>
    if (focusedElement !== null && focusedElement === ev.target) {
      ev.preventDefault();

      // If a different <SimpleColor> is currently focused
    } else if (focusedElement !== null) {
      ev.preventDefault();
      setFocusedElement(ev.target);

      // If no <SimpleColor> is currently focused
    } else {
      setFocusedElement(ev.target);
    }
  };

  const validationProps = {
    error,
    warning,
    info,
  };

  if (!deprecateUncontrolledWarnTriggered && !onChange) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Simple Color Picker` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
  }

  return (
    <Fieldset
      role="radiogroup"
      legend={legend}
      isRequired={required}
      {...(validationOnLegend && validationProps)}
      {...tagComponent("simple-color-picker", props)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <StyledContent>
        <InputGroupContext.Consumer>
          {({ onMouseEnter, onMouseLeave }) => (
            <StyledColorOptions
              maxWidth={maxWidth}
              childWidth={childWidth}
              ref={internalRef}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              {...validationProps}
            >
              <RadioButtonMapper
                name={name}
                value={value}
                onChange={onChange}
                onMouseDown={handleOnMouseDown}
                onKeyDown={onKeyDownHandler}
                onBlur={handleOnBlur}
              >
                {navigationGrid}
              </RadioButtonMapper>
            </StyledColorOptions>
          )}
        </InputGroupContext.Consumer>
        {!validationOnLegend && (
          <ValidationIcon
            {...validationProps}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        )}
      </StyledContent>
    </Fieldset>
  );
});

SimpleColorPicker.displayName = "SimpleColorPicker";

export default SimpleColorPicker;
