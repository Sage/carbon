import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import { MarginProps } from "styled-system";
import {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
} from "./advanced-color-picker.style";
import { SimpleColorPicker, SimpleColor } from "../simple-color-picker";
import Events from "../../__internal__/utils/helpers/events";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface AdvancedColor {
  label: string;
  value: string;
}

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

export interface AdvancedColorPickerPropTypes extends MarginProps {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labeledby property of the component */
  "aria-labelledby"?: string;
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: AdvancedColor[];
  /** Prop for `defaultColor` containing the default color for `uncontrolled` use */
  defaultColor: string;
  /** Specifies the name prop to be applied to each color in the group */
  name: string;
  /** Prop for `onBlur` event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` event */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Prop for `onClose` event */
  onClose?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `onOpen` event */
  onOpen?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `open` status */
  open?: boolean;
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor?: string;
}

const AdvancedColorPicker = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  name,
  open,
  onOpen,
  onClose,
  onChange,
  onBlur,
  availableColors,
  defaultColor,
  selectedColor,
  role,
  ...props
}: AdvancedColorPickerPropTypes): JSX.Element => {
  const isOpen = open || false;
  const [dialogOpen, setDialogOpen] = useState<boolean>();
  const currentColor = selectedColor || defaultColor;
  const [selectedColorRef, setSelectedColorRef] = useState<HTMLInputElement>();

  const gridItemRefs = useRef(
    Array.from(
      {
        length: availableColors.length,
      },
      () => React.createRef()
    )
  );

  const colors = availableColors.map(({ value, label }, index) => {
    return {
      value,
      label,
      ref: gridItemRefs.current[index],
    };
  });

  useEffect(() => {
    if (dialogOpen || isOpen) {
      const selected = colors.find((c) => currentColor === c.value);
      if (selected)
        setSelectedColorRef(selected.ref.current as HTMLInputElement);
    }
  }, [colors, currentColor, dialogOpen, isOpen]);

  const handleFocus = useCallback(
    (e, firstFocusableElement, lastFocusableElement) => {
      if (e.key === "Tab") {
        /* istanbul ignore else */
        if (e.shiftKey) {
          /* istanbul ignore else */
          if (document.activeElement === selectedColorRef) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastFocusableElement) {
          selectedColorRef?.focus();
          e.preventDefault();
        }
      }
    },
    [selectedColorRef]
  );

  const handleOnOpen = useCallback(
    (e) => {
      setDialogOpen(true);

      if (onOpen) {
        onOpen(e);
      }
    },
    [onOpen]
  );

  const handleOnClose = useCallback(
    (e) => {
      setDialogOpen(false);

      if (onClose) {
        onClose(e);
      }
    },
    [onClose]
  );

  const handleOnChange = useCallback(
    (e) => {
      const selected = colors.find((c) => e.target.value === c.value);
      if (selected)
        setSelectedColorRef(selected.ref.current as HTMLInputElement);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange, colors]
  );

  const handleOnKeyDown = useCallback(
    (e) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnOpen(e);
      }
    },
    [handleOnOpen]
  );

  const handleColorOnKeyDown = useCallback(
    (e) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnClose(e);
      }
    },
    [handleOnClose]
  );

  const handleOnBlur = useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  return (
    <StyledAdvancedColorPickerWrapper
      m="15px auto auto 15px"
      {...filterStyledSystemMarginProps(props)}
    >
      <StyledAdvancedColorPickerCell
        data-element="color-picker-cell"
        onClick={handleOnOpen}
        onKeyDown={handleOnKeyDown}
        color={currentColor}
        // tabIndex="0"
      />
      <DialogStyle
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        open={dialogOpen || isOpen}
        size="auto"
        onCancel={handleOnClose}
        bespokeFocusTrap={handleFocus}
        focusFirstElement={selectedColorRef}
        role={role}
      >
        <StyledAdvancedColorPickerPreview
          data-element="color-picker-preview"
          color={currentColor}
        />
        <SimpleColorPicker
          name={name}
          legend=""
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleColorOnKeyDown}
        >
          {colors.map(({ value, label, ref }) => (
            <SimpleColor
              value={value}
              key={value}
              aria-label={label}
              id={value}
              defaultChecked={value === currentColor}
              inputRef={(input: HTMLInputElement) => {
                ref.current = input.current;
              }}
            />
          ))}
        </SimpleColorPicker>
      </DialogStyle>
    </StyledAdvancedColorPickerWrapper>
  );
};

AdvancedColorPicker.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby": PropTypes.string,
  /**
   * Prop to specify the aria-label of the component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label": PropTypes.string,
  /**
   * Prop to specify the aria-labeledby property of the component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby": PropTypes.string,
  /** Specifies the name prop to be applied to each color in the group */
  name: PropTypes.string.isRequired,
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: PropTypes.array.isRequired,
  /** Prop for `defaultColor` containing the default color for `uncontrolled` use */
  defaultColor: PropTypes.string.isRequired,
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor: PropTypes.string,
  /** Prop for `onChange` event */
  onChange: PropTypes.func,
  /** Prop for `onOpen` event */
  onOpen: PropTypes.func,
  /** Prop for `onClose` event */
  onClose: PropTypes.func,
  /** Prop for `open` status */
  open: PropTypes.bool,
  /** Prop for `onBlur` event */
  onBlur: PropTypes.func,
  /** The ARIA role to be applied to the container */
  role: PropTypes.string,
};

export default AdvancedColorPicker;
