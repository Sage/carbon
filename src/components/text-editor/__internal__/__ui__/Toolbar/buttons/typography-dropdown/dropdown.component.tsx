import React, { useRef, useEffect, useMemo } from "react";
import Box from "../../../../../../box";
import { StyledButton, StyledMenu, StyledMenuItem } from "./dropdown.style";

interface DropdownOption {
  id: string;
  label: string;
  onClick: () => void;
  ariaLabel?: string;
}

interface ToolbarDropdownProps {
  ariaLabel?: string;
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
  ariaLabel = "Select an option",
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = `${namespace}-typography-menu`;

  const selectedOption = useMemo(() => {
    const selected = options.find((option) => option.id === value);
    return selected?.label;
  }, [options, value]);

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
        menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]');
      items[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
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
    if (!isOpen) {
      setFocusedIndex?.(0);
    } else {
      setFocusedIndex?.(-1);
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    option.onClick();
    setIsOpen?.(false);
    setFocusedIndex?.(-1);
    buttonRef.current?.focus();
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
        aria-haspopup="menu"
        aria-expanded={isOpen}
        menuOpen={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onClick={handleButtonClick}
        className="toolbar-button"
        tabIndex={isFirstButton ? 0 : -1}
        data-role={`${namespace}-typography-dropdown`}
        id={`${namespace}-typography-dropdown`}
        onMouseDown={
          /* istanbul ignore next */ (e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
        }
        size={size}
      >
        {selectedOption} <span>{isOpen ? "▲" : "▼"}</span>
      </StyledButton>

      {isOpen && (
        <StyledMenu
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-labelledby={buttonRef.current?.id}
          onKeyDown={handleKeyDown}
          size={size}
        >
          {options.map((option) => {
            return (
              <StyledMenuItem
                key={option.id}
                role="menuitem"
                data-role={`${namespace}-typography-option-${option.id}`}
                tabIndex={-1}
                aria-label={`${option.ariaLabel || option.label}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleOptionClick(option);
                }}
                isFocused={options[focusedIndex]?.id === option.id}
              >
                {option.label}
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
      )}
    </Box>
  );
};

export default ToolbarDropdown;
