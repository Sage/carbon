import React, { useState, useRef, useEffect, useMemo } from "react";
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
  namespace?: string;
  onChange?: (value: string) => void;
  options: DropdownOption[];
  isFirstButton?: boolean;
  value: string;
}

const ToolbarDropdown = ({
  ariaLabel = "Select an option",
  namespace = "",
  onChange,
  options,
  value,
  isFirstButton = false,
}: ToolbarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(
    () => options.findIndex((option) => option.id === value) || -1,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = `${namespace}-typography-menu`;

  const selectedOption = useMemo(() => {
    const selected = options.find((option) => option.id === value);
    return selected ? selected.label : "Select";
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
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          event.preventDefault();
          options[focusedIndex]?.onClick();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;

      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    option.onClick();
    setIsOpen(false);
    setFocusedIndex(-1);
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
        aria-controls={isOpen ? menuId : undefined}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onClick={handleButtonClick}
        className="toolbar-button"
        tabIndex={isFirstButton ? 0 : -1}
        data-role={`${namespace}-typography-dropdown`}
        id={`${namespace}-typography-dropdown`}
      >
        {selectedOption ?? "Select"} <span>{isOpen ? "▲" : "▼"}</span>
      </StyledButton>

      {isOpen && (
        <StyledMenu
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-labelledby={buttonRef.current?.id}
          onKeyDown={handleKeyDown}
        >
          {options.map((option) => {
            return (
              <StyledMenuItem
                key={option.id}
                role="menuitem"
                tabIndex={-1}
                aria-label={`${option.ariaLabel || option.label}`}
                onClick={() => handleOptionClick(option)}
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
