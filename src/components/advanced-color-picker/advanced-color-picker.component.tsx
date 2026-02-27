import React, { useState, useEffect, useCallback, useRef } from "react";
import { MarginProps } from "styled-system";
import {
  StyledAdvancedColorPickerWrapper,
  HiddenCurrentColorList,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle,
} from "./advanced-color-picker.style";
import { SimpleColorPicker, SimpleColor } from "../simple-color-picker";
import Events from "../../__internal__/utils/helpers/events";
import { filterStyledSystemMarginProps } from "../../style/utils";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import { Dt, Dd } from "../definition-list";
import { ModalProps } from "../../__internal__/modal";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
export interface AdvancedColor {
  label: string;
  value: string;
}

export interface AdvancedColorPickerProps
  extends MarginProps,
    Pick<ModalProps, "restoreFocusOnClose">,
    TagProps {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: AdvancedColor[];
  /** Specifies the name prop to be applied to each color in the group */
  name: string;
  /** Prop for `onBlur` event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` event */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onClose` event */
  onClose?: (
    ev:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | KeyboardEvent,
  ) => void;
  /** Prop for `onOpen` event */
  onOpen?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Prop for `open` status */
  open?: boolean;
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor: string;
}

export const AdvancedColorPicker = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  availableColors,
  name,
  onOpen,
  onClose,
  onChange,
  onBlur,
  open = false,
  role,
  selectedColor,
  restoreFocusOnClose = true,
  ...props
}: AdvancedColorPickerProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>();
  const [selectedColorRef, setSelectedColorRef] =
    useState<HTMLInputElement | null>(null);

  const descriptionId = useRef(guid());
  const l = useLocale();

  const simpleColorPickerData = useRef<{
    gridItemRefs: Array<HTMLInputElement | null>;
  }>(null);

  const colors = availableColors.map(({ value, label }, index) => {
    return {
      value,
      label,
      getRef: () =>
        /* Fallback to null to satisfy the TypeScript compiler */
        /* istanbul ignore next */
        simpleColorPickerData.current
          ? simpleColorPickerData.current.gridItemRefs[index]
          : null,
    };
  });

  const currentSelectedColor = () => {
    const returnedColor = availableColors.find(
      (color) => color.value === selectedColor,
    )?.label as string;

    return returnedColor || selectedColor;
  };

  useEffect(() => {
    if (dialogOpen || open) {
      const newColor = colors?.find((c) => selectedColor === c.value);

      /* istanbul ignore else */
      if (newColor) {
        setSelectedColorRef(newColor.getRef());
      }
    }
  }, [colors, selectedColor, dialogOpen, open]);

  const handleFocus = useCallback(
    (e: KeyboardEvent, firstFocusableElement?: HTMLElement) => {
      /* istanbul ignore else */
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableElement &&
            selectedColorRef
          ) {
            selectedColorRef.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === selectedColorRef) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    },
    [selectedColorRef],
  );

  const handleOnOpen = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      setDialogOpen(true);

      if (onOpen) {
        onOpen(e);
      }
    },
    [onOpen],
  );

  const handleOnClose = useCallback(
    (
      e:
        | React.MouseEvent<HTMLElement>
        | React.KeyboardEvent<HTMLElement>
        | KeyboardEvent,
    ) => {
      setDialogOpen(false);

      if (onClose) {
        onClose(e);
      }
    },
    [onClose],
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = colors?.find((c) => e.target.value === c.value);

      /* istanbul ignore else */
      if (newColor) {
        setSelectedColorRef(newColor.getRef());
      }

      /* istanbul ignore else */
      if (onChange) {
        onChange(e);
      }
    },
    [onChange, colors],
  );

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnOpen(e);
      }
    },
    [handleOnOpen],
  );

  const handleColorOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        handleOnClose(e);
      }
    },
    [handleOnClose],
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  return (
    <StyledAdvancedColorPickerWrapper
      m="15px auto auto 15px"
      {...filterStyledSystemMarginProps(props)}
      {...tagComponent("advanced-color-picker", props)}
    >
      <StyledAdvancedColorPickerCell
        data-element="color-picker-cell"
        aria-label={l.advancedColorPicker.ariaLabel()}
        aria-describedby={descriptionId.current}
        onClick={handleOnOpen}
        onKeyDown={handleOnKeyDown}
        color={selectedColor}
        tabIndex={0}
      />
      <HiddenCurrentColorList
        id={descriptionId.current}
        data-element="current-color-description"
      >
        <Dt>
          {l.advancedColorPicker.currentColorDescriptionTerm(
            currentSelectedColor(),
          )}
        </Dt>
        <Dd>
          {l.advancedColorPicker.currentColorAssigned(currentSelectedColor())}
        </Dd>
      </HiddenCurrentColorList>
      <DialogStyle
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        open={dialogOpen || open}
        size="small"
        onCancel={handleOnClose}
        bespokeFocusTrap={handleFocus}
        focusFirstElement={selectedColorRef}
        role={role}
        restoreFocusOnClose={restoreFocusOnClose}
      >
        <StyledAdvancedColorPickerPreview
          data-element="color-picker-preview"
          color={selectedColor}
        />
        <SimpleColorPicker
          name={name}
          legend=""
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleColorOnKeyDown}
          ref={simpleColorPickerData}
          value={selectedColor}
        >
          {colors?.map(({ value, label }) => (
            <SimpleColor
              value={value}
              key={value}
              aria-label={label}
              id={value}
              checked={value === selectedColor}
            />
          ))}
        </SimpleColorPicker>
      </DialogStyle>
    </StyledAdvancedColorPickerWrapper>
  );
};

export default AdvancedColorPicker;
