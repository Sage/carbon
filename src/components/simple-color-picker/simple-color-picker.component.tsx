import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import { MarginProps } from "styled-system";
import Events from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../__internal__/fieldset";
import SimpleColor, { SimpleColorProps } from "./simple-color";
import RadioButtonMapper from "../radio-button/radio-button-mapper.component";
import { StyledContent, StyledColorOptions } from "./simple-color-picker.style";
import ValidationIcon from "../../__internal__/validations/validation-icon.component";
import {
  InputGroupContext,
  InputContextProps,
} from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ValidationProps } from "../../__internal__/validations";

// type SimpleColorPickerChild =
//   | React.FunctionComponentElement<SimpleColorProps>
//   | boolean
//   | null
//   | undefined;

export interface SimpleColorPickerProps extends ValidationProps, MarginProps {
  /** The SimpleColor components to be rendered in the group */
  children?: React.ReactNode;
  /** prop that represents childWidth */
  childWidth?: number;
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked?: boolean;
  /** The content for the Legend */
  legend: string;
  /** prop that sets max-width in css */
  maxWidth?: number;
  /** The name to apply to the input. */
  name?: string;
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

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const SimpleColorPicker = ({
  children,
  error,
  warning,
  info,
  name = "",
  legend,
  onChange,
  onBlur,
  onKeyDown,
  value,
  isBlurBlocked = false,
  maxWidth = 300,
  childWidth = 58,
  validationOnLegend,
  required,
  ...rest
}: SimpleColorPickerProps): JSX.Element => {
  const { onMouseEnter, onMouseLeave } = useContext<InputContextProps>(
    InputGroupContext
  );

  const childrenArray = useMemo<React.ReactNode[]>(
    () => React.Children.toArray(children),
    [children]
  );

  const filteredChildren = childrenArray.filter(
    (child) => child && typeof child !== "boolean"
  );

  const myRef = useRef<HTMLDivElement | null>(null);
  const [blurBlocked, setIsBlurBlocked] = useState(isBlurBlocked);
  const [focusedElement, setFocusedElement] = useState<EventTarget | null>(
    null
  );
  const itemsPerRow = Math.floor(maxWidth / childWidth);
  const rowCount = Math.ceil(filteredChildren?.length / itemsPerRow);
  let blankSlots = itemsPerRow * rowCount - filteredChildren?.length;
  let currentRow = 1;
  let loopCounter = 1;

  const gridItemRefs = useMemo(
    () =>
      filteredChildren.map(
        (child) =>
          (child as React.FunctionComponentElement<SimpleColorProps>)?.ref ||
          React.createRef()
      ),
    [filteredChildren]
  );

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
      ref: gridItemRefs[index],
      "data-up": allowUp,
      "data-down": allowDown,
      "data-item-up": upItem,
      "data-item-down": downItem,
      required,
    };

    loopCounter += 1;

    return React.cloneElement(
      child as React.FunctionComponentElement<SimpleColorProps>,
      childProps
    );
  });

  const onKeyDownHandler = useCallback(
    (e) => {
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

      let itemIndex;

      if (Events.isUpKey(e)) {
        if (e.target.getAttribute("data-up") !== "true") return;
        itemIndex = e.target.getAttribute("data-item-up");
      } else if (Events.isDownKey(e)) {
        if (e.target.getAttribute("data-down") !== "true") return;
        itemIndex = e.target.getAttribute("data-item-down");
      }

      if (Events.isLeftKey(e) || Events.isRightKey(e)) {
        const position = (element: React.ReactElement) => {
          return (
            typeof element !== "boolean" &&
            e.target.getAttribute("value") === element?.props?.value
          );
        };

        if (Events.isLeftKey(e)) {
          itemIndex = navigationGrid.findIndex(position) - 1;
        } else {
          itemIndex = navigationGrid.findIndex(position) + 1;
        }

        if (itemIndex < 0) {
          itemIndex = navigationGrid.length - 1;
        } else if (itemIndex > navigationGrid.length - 1) {
          itemIndex = 0;
        }
      }

      const item = navigationGrid[itemIndex]?.ref?.current;

      if (item) {
        item.focus();
        item.click();
      }
    },
    [onKeyDown, navigationGrid]
  );

  const handleClickOutside = (ev: Event) => {
    if (
      myRef.current &&
      ev.target &&
      !myRef.current.contains(ev.target as HTMLElement)
    ) {
      setIsBlurBlocked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  });

  const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    ev.preventDefault();

    if (!blurBlocked && onBlur) {
      onBlur(ev);
    }
  };

  const handleOnMouseDown = (ev: React.MouseEvent<HTMLInputElement>) => {
    setIsBlurBlocked(true);

    // If the mousedown event occurred and a <SimpleColor> is focused
    if (focusedElement !== null) {
      ev.preventDefault();

      // If a different <SimpleColor> is currently focused
      if (focusedElement !== ev.target) {
        setIsBlurBlocked(false);
        setFocusedElement(ev.target);
      }
      // If no <SimpleColor> is currently focused
    } else {
      setIsBlurBlocked(true);
      setFocusedElement(ev.target);
    }
  };

  const validationProps = {
    error,
    warning,
    info,
  };

  return (
    <Fieldset
      role="radiogroup"
      legend={legend}
      isRequired={required}
      {...(validationOnLegend && validationProps)}
      {...tagComponent("simple-color-picker", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <StyledContent>
        <StyledColorOptions
          maxWidth={maxWidth}
          childWidth={childWidth}
          ref={myRef}
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
        {!validationOnLegend && (
          <ValidationIcon
            {...validationProps}
            tooltipFlipOverrides={["top", "bottom"]}
          />
        )}
      </StyledContent>
    </Fieldset>
  );
};

SimpleColorPicker.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** The SimpleColor components to be rendered in the group */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (child === null) {
        return;
      }

      if (SimpleColor.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${SimpleColor.displayName}\`.`
        );
      }
    });

    return error;
  },
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked: PropTypes.bool,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on legend instead of being placed by the input */
  validationOnLegend: PropTypes.bool,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** The currently selected color. */
  value: PropTypes.string,
  /** The name to apply to the input. */
  name: PropTypes.string,
  /** A callback triggered when a color is selected. */
  onChange: PropTypes.func,
  /** A callback triggered when a color is selected. */
  onBlur: PropTypes.func,
  /** A callback triggered on key down. */
  onKeyDown: PropTypes.func,
  /** prop that sets max-width in css */
  maxWidth: PropTypes.string,
  /** prop that represents childWidth */
  childWidth: PropTypes.string,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

export default SimpleColorPicker;
