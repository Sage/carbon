import React, { useEffect, useRef, useState } from "react";
import invariant from "invariant";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../__internal__/fieldset/__next__/fieldset.component";
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
  /** Accessible label for the custom input. Falls back to the group aria-label. */
  inputAriaLabel?: string;
  /** Optional legacy placeholder text. This is intentionally ignored to avoid deprecated placeholder styling. */
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
  /** Visible label for the group, rendered as the legend of the labelset. */
  legend?: string;
  /** Additional hint text rendered below the legend. */
  legendHint?: React.ReactNode;
  /** Applies a disabled state to the whole group's labelset. */
  disabled?: boolean;
  /** Flag to configure the group as mandatory. */
  required?: boolean;
  /** Accessible label when no visible legend exists. */
  "aria-label": string;
}

const OptionTileGroupContext = React.createContext<
  | {
      selectionType: OptionTileGroupProps["selectionType"];
      ariaLabel: OptionTileGroupProps["aria-label"];
    }
  | undefined
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
      >
        <svg focusable="false" viewBox="0 0 16 12" fill="none">
          <path d="M15.3254 0.231177C15.0768 0.0725131 14.7858 -0.0078498 14.4904 0.000604729C14.1106 0.0116071 13.7498 0.168628 13.4841 0.43853L5.39406 8.47955L2.522 5.62489C2.38757 5.48677 2.22699 5.37639 2.04948 5.30014C1.87029 5.22317 1.67746 5.1825 1.48226 5.18053C1.28706 5.17856 1.09344 5.21532 0.912713 5.28865C0.731991 5.36199 0.567806 5.47043 0.429775 5.60762C0.291743 5.74482 0.182642 5.90801 0.108858 6.08764C0.035074 6.26727 -0.00190855 6.45972 7.58261e-05 6.65373C0.0020602 6.84775 0.0429724 7.03941 0.120415 7.21751C0.197135 7.39395 0.308179 7.55356 0.447147 7.68717L4.35671 11.573C4.63187 11.8464 5.005 12 5.39406 12C5.78312 12 6.15633 11.8464 6.43149 11.573L15.559 2.50077C15.7693 2.29623 15.9128 2.03357 15.971 1.74686C16.0294 1.45899 15.9991 1.16029 15.8839 0.889848C15.7687 0.619408 15.574 0.389838 15.3254 0.231177Z" />
        </svg>
      </StyledCheckboxDecoration>
      <StyledTileText>{label}</StyledTileText>
    </StyledOptionTileMultiple>
  );
};

const OptionTileCustom = ({
  title,
  disabled,
  inputAriaLabel,
  customValue,
  onCustomValueChange,
  onCustomActiveChange,
  ...rest
}: OptionTileCustomProps) => {
  const groupContext = React.useContext(OptionTileGroupContext);
  const selectionType = groupContext?.selectionType;
  const resolvedInputAriaLabel =
    inputAriaLabel || groupContext?.ariaLabel || title;

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
        aria-label={resolvedInputAriaLabel}
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
  legend,
  legendHint,
  disabled,
  required,
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

  const tiles = (
    <StyledOptionTileGroup
      data-selection-type={selectionType}
      onKeyDown={onGroupKeyDown}
      {...(!legend && { role: "group", "aria-label": ariaLabel })}
      {...tagComponent("option-tile-group", rest)}
    >
      {children}
    </StyledOptionTileGroup>
  );

  return (
    <OptionTileGroupContext.Provider
      value={{ selectionType, ariaLabel: ariaLabel }}
    >
      {legend ? (
        <Fieldset
          legend={legend}
          legendHint={legendHint}
          isDisabled={disabled}
          isRequired={required}
        >
          {tiles}
        </Fieldset>
      ) : (
        tiles
      )}
    </OptionTileGroupContext.Provider>
  );
};

export default OptionTile;
