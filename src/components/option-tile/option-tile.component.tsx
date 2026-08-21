import React, { useEffect, useRef, useState } from "react";
import invariant from "invariant";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledCheckboxDecoration,
  StyledCustomIcon,
  StyledCustomInput,
  StyledNumberBadge,
  StyledOptionTileButton,
  StyledOptionTileCustomActive,
  StyledOptionTileGroup,
  StyledOptionTileMultiple,
  StyledTileText,
} from "./option-tile.style";

export type OptionTileVariant = "single" | "multiple" | "custom";

interface BaseOptionTileProps extends TagProps {
  /** Applies a disabled state to the tile. */
  disabled?: boolean;
}

interface OptionTileSingleProps extends BaseOptionTileProps {
  /** The single-select visual variant. */
  variant: "single";
  /** Optional number shown before the title. */
  number?: number | string;
  /** Visible tile text. */
  title: string;
  /** Called when the single tile is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

interface OptionTileMultipleProps extends BaseOptionTileProps {
  /** The multiple-select visual variant. */
  variant: "multiple";
  /** Visible tile label. */
  label: string;
  /** Checked state for the option. */
  checked: boolean;
  /** Called whenever the checked state changes. */
  onChange: (checked: boolean) => void;
}

interface OptionTileCustomProps extends BaseOptionTileProps {
  /** The custom-entry visual variant. */
  variant: "custom";
  /** Visible tile text in inactive state. */
  title: string;
  /** Accessible label for the custom input. */
  inputAriaLabel: string;
  /** Optional input placeholder text. */
  inputPlaceholder?: string;
  /** The value of the custom input. */
  customValue: string;
  /** Called whenever the custom input value changes. */
  onCustomValueChange: (value: string) => void;
  /** Called when the custom tile active state changes. */
  onCustomActiveChange?: (isActive: boolean) => void;
}

export type OptionTileProps =
  | OptionTileSingleProps
  | OptionTileMultipleProps
  | OptionTileCustomProps;

export interface OptionTileGroupProps extends TagProps {
  /** Tile elements rendered in a vertical stack. */
  children: React.ReactNode;
  /** Selection behavior context for grouped tiles. */
  selectionType: "single" | "multiple";
  /** Accessible label when no visible label exists. */
  "aria-label": string;
}

const OptionTileGroupContext = React.createContext<
  OptionTileGroupProps["selectionType"] | undefined
>(undefined);

const OptionTileSingle = ({
  number,
  title,
  disabled,
  onClick,
  ...rest
}: OptionTileSingleProps) => {
  return (
    <StyledOptionTileButton
      type="button"
      $isDisabled={disabled}
      disabled={disabled}
      onClick={onClick}
      data-option-tile-hotkey={
        /^[1-9]$/.test(String(number)) ? String(number) : undefined
      }
      {...tagComponent("option-tile", rest)}
    >
      {number !== undefined && <StyledNumberBadge>{number}</StyledNumberBadge>}
      <StyledTileText>{title}</StyledTileText>
    </StyledOptionTileButton>
  );
};

const OptionTileMultiple = ({
  label,
  checked,
  disabled,
  onChange,
  ...rest
}: OptionTileMultipleProps) => {
  const onToggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      onToggle();
    }
  };

  return (
    <StyledOptionTileMultiple
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? undefined : 0}
      $isSelected={checked}
      $isDisabled={disabled}
      aria-disabled={disabled}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      {...tagComponent("option-tile", rest)}
    >
      <StyledCheckboxDecoration
        data-role="option-tile-checkbox"
        $isSelected={checked}
        aria-hidden="true"
      />
      <StyledTileText>{label}</StyledTileText>
    </StyledOptionTileMultiple>
  );
};

const OptionTileCustom = ({
  title,
  disabled,
  inputAriaLabel,
  inputPlaceholder,
  customValue,
  onCustomValueChange,
  onCustomActiveChange,
  ...rest
}: OptionTileCustomProps) => {
  const selectionType = React.useContext(OptionTileGroupContext);

  invariant(
    selectionType !== "multiple",
    "OptionTile with variant='custom' can only be used within a single selection OptionTileGroup.",
  );

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const setActive = (next: boolean) => {
    setIsActive(next);
    onCustomActiveChange?.(next);
  };

  const onInactiveKeyDown = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      setActive(true);
    }
  };

  const onActiveKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      setActive(false);
    }
  };

  const onActiveBlur = () => {
    setActive(false);
  };

  if (!isActive) {
    return (
      <StyledOptionTileButton
        type="button"
        $isDisabled={disabled}
        disabled={disabled}
        onClick={() => setActive(true)}
        onKeyDown={onInactiveKeyDown}
        {...tagComponent("option-tile", rest)}
      >
        <StyledCustomIcon
          data-role="option-tile-icon"
          type="edit"
          size="small"
          aria-hidden
        />
        <StyledTileText>{title}</StyledTileText>
      </StyledOptionTileButton>
    );
  }

  return (
    <StyledOptionTileCustomActive
      onBlur={onActiveBlur}
      $isDisabled={disabled}
      {...tagComponent("option-tile", rest)}
    >
      <StyledCustomIcon
        data-role="option-tile-icon"
        type="edit"
        size="small"
        aria-hidden
      />
      <StyledCustomInput
        ref={inputRef}
        aria-label={inputAriaLabel}
        placeholder={inputPlaceholder}
        value={customValue}
        onChange={(ev) => onCustomValueChange(ev.target.value)}
        onKeyDown={onActiveKeyDown}
      />
    </StyledOptionTileCustomActive>
  );
};

export const OptionTile = (props: OptionTileProps) => {
  if (props.variant === "single") {
    return <OptionTileSingle {...props} />;
  }

  if (props.variant === "multiple") {
    return <OptionTileMultiple {...props} />;
  }

  return <OptionTileCustom {...props} />;
};

export const OptionTileGroup = ({
  children,
  selectionType,
  "aria-label": ariaLabel,
  ...rest
}: OptionTileGroupProps) => {
  const onGroupKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectionType !== "single") return;

    const target = ev.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }

    if (!/^[1-9]$/.test(ev.key)) return;

    const root = ev.currentTarget;
    const hotkeyTarget = root.querySelector<HTMLButtonElement>(
      `[data-option-tile-hotkey=\"${ev.key}\"]`,
    );

    if (!hotkeyTarget || hotkeyTarget.disabled) return;

    ev.preventDefault();
    hotkeyTarget.click();
  };

  return (
    <OptionTileGroupContext.Provider value={selectionType}>
      <StyledOptionTileGroup
        role="group"
        data-selection-type={selectionType}
        aria-label={ariaLabel}
        onKeyDown={onGroupKeyDown}
        {...tagComponent("option-tile-group", rest)}
      >
        {children}
      </StyledOptionTileGroup>
    </OptionTileGroupContext.Provider>
  );
};

export default OptionTile;
