import React, { useRef, useEffect, useMemo } from "react";

import { StyledButton, StyledMenu, StyledMenuItem } from "./dropdown.style";
import Box from "../../../../../../box";
import Icon from "../../../../../../icon";
import useLocale from "../../../../../../../hooks/__internal__/useLocale";

interface DropdownOption {
  id: string;
  label?: string;
  onClick: () => void;
  ariaLabel?: string;
}

interface ToolbarDropdownProps {
  namespace: string;
  onChange?: (value: string) => void;
  options: DropdownOption[];
  isFirstButton?: boolean;
  value: string;
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  focusedIndex: number;
  setFocusedIndex?: (index: number) => void;
  size?: "small" | "medium" | "large";
}

const ToolbarDropdown = ({
  namespace,
  onChange,
  options,
  value,
  isFirstButton = false,
  isOpen,
  setIsOpen,
  focusedIndex,
  setFocusedIndex,
  size = "medium",
}: ToolbarDropdownProps) => {
  const locale = useLocale();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = `${namespace}-typography-menu`;

  const selectedOption = useMemo(() => {
    const selected = options.find((option) => option.id === value);
    if (!selected) return locale.textEditor.typography["paragraph"]();
    const localeKey = selected.id as keyof typeof locale.textEditor.typography;
    const label = locale.textEditor.typography[localeKey]();
    return label;
  }, [locale, options, value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen?.(false);
        setFocusedIndex?.(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setFocusedIndex, setIsOpen]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuRef.current) {
      const items =
        menuRef.current.querySelectorAll<HTMLElement>('[role="option"]');
      items[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        /* istanbul ignore if */
        if (!isOpen) {
          event.preventDefault();
          setIsOpen?.(true);
          setFocusedIndex?.(0);
          break;
        }

        /* istanbul ignore else */
        if (focusedIndex >= 0) {
          event.preventDefault();
          options[focusedIndex]?.onClick();
          setIsOpen?.(false);
          setFocusedIndex?.(-1);
          buttonRef.current?.focus();
        }
        break;

      case "ArrowDown":
        event.preventDefault();
        /* istanbul ignore if */
        if (!isOpen) {
          setIsOpen?.(true);
          setFocusedIndex?.(0);
        } else {
          setFocusedIndex?.(
            focusedIndex < options.length - 1 ? focusedIndex + 1 : 0,
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        /* istanbul ignore if */
        if (!isOpen) {
          setIsOpen?.(true);
          setFocusedIndex?.(options.length - 1);
        } else {
          setFocusedIndex?.(
            focusedIndex > 0 ? focusedIndex - 1 : options.length - 1,
          );
        }
        break;

      case "Home":
        event.preventDefault();
        /* istanbul ignore if */
        if (isOpen) {
          setFocusedIndex?.(0);
        }
        break;

      case "End":
        event.preventDefault();
        /* istanbul ignore if */
        if (isOpen) {
          setFocusedIndex?.(options.length - 1);
        }
        break;

      case "Escape":
        /* istanbul ignore else */
        if (isOpen) {
          event.preventDefault();
          setIsOpen?.(false);
          setFocusedIndex?.(-1);
          buttonRef.current?.focus();
        }
        break;

      case "Tab":
        /* istanbul ignore else */
        if (isOpen) {
          setIsOpen?.(false);
          setFocusedIndex?.(-1);
        }
        break;
    }
  };

  const handleButtonClick = () => {
    setIsOpen?.(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    option.onClick();
    setIsOpen?.(false);
    setFocusedIndex?.(-1);
    onChange?.(option.id);
  };

  return (
    <Box
      position="relative"
      display="inline-block"
      minWidth={"150px"}
      marginRight="spacing05"
    >
      <StyledButton
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        menuOpen={isOpen}
        aria-activedescendant={options[focusedIndex]?.id}
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-label={locale.textEditor.typography.selectAria()}
        onKeyDown={handleKeyDown}
        onClick={handleButtonClick}
        className="toolbar-button"
        tabIndex={isFirstButton ? 0 : -1}
        data-role={`${namespace}-typography-dropdown`}
        id={`${namespace}-typography-dropdown`}
        size={size}
      >
        {selectedOption}{" "}
        <span aria-hidden="true">
          <Icon type={isOpen ? "caret_up" : "caret_down"} />
        </span>
      </StyledButton>

      {isOpen && (
        <StyledMenu
          ref={menuRef}
          role="listbox"
          id={menuId}
          aria-labelledby={buttonRef.current?.id}
          onKeyDown={handleKeyDown}
          size={size}
          aria-expanded={isOpen}
        >
          {options.map((option) => {
            const localeKey =
              option.id as keyof typeof locale.textEditor.typography;
            const ariaLabel = locale.textEditor.typography[localeKey]();

            return (
              <StyledMenuItem
                key={option.id}
                id={option.id}
                role="option"
                data-role={`${namespace}-typography-option-${option.id}`}
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleOptionClick(option);
                }}
                isFocused={options[focusedIndex]?.id === option.id}
              >
                {ariaLabel}
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
      )}
    </Box>
  );
};

export default ToolbarDropdown;
