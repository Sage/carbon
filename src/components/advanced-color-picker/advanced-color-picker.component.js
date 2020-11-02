import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
} from "./advanced-color-picker.style";
import {
  SimpleColorPicker,
  SimpleColor,
} from "../../__experimental__/components/simple-color-picker";
import Events from "../../utils/helpers/events";

const AdvancedColorPicker = ({
  name,
  open,
  onOpen,
  onClose,
  onChange,
  onBlur,
  availableColors,
  defaultColor,
  selectedColor,
}) => {
  const isOpen = open || false;
  const [dialogOpen, setDialogOpen] = useState();
  const currentColor = selectedColor || defaultColor;
  const selectedColorRef = useRef();

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
      selectedColorRef.current = selected.ref.current;
      selected.ref.current.focus();
    }
  }, [colors, currentColor, dialogOpen, isOpen]);

  const handleFocus = useCallback(
    (e, firstFocusableElement, lastFocusableElement) => {
      if (e.key === "Tab") {
        /* istanbul ignore else */
        if (e.shiftKey) {
          /* istanbul ignore else */
          if (document.activeElement === selectedColorRef.current) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastFocusableElement) {
          selectedColorRef.current.focus();
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
      selectedColorRef.current = selected.ref.current;

      if (onChange) {
        onChange(e);
      }
    },
    [onChange, colors, selectedColorRef]
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
    <StyledAdvancedColorPickerWrapper>
      <StyledAdvancedColorPickerCell
        data-element="color-picker-cell"
        onClick={handleOnOpen}
        onKeyDown={handleOnKeyDown}
        color={currentColor}
        tabIndex="0"
      />
      <DialogStyle
        open={dialogOpen || isOpen}
        size="auto"
        onCancel={handleOnClose}
        bespokeFocusTrap={handleFocus}
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
              inputRef={(input) => {
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
};

export default AdvancedColorPicker;
