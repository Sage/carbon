import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { WidthProps } from "styled-system";

import { SplitButtonProps } from "../split-button";
import SplitButtonContext from "../split-button/__internal__/split-button.context";
import { StyledMultiActionButton } from "./multi-action-button.style";
import Button from "../button/__next__";
import PopoverMenu from "../../__internal__/popover-menu/popover-menu.component";
import MenuItem from "../../__internal__/popover-menu/menu-item.component";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import useChildButtons from "../../hooks/__internal__/useChildButtons";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import guid from "../../__internal__/utils/helpers/guid";
import { ButtonHandle } from "../button/__next__/button.component";

export interface MultiActionButtonProps
  extends WidthProps,
    Omit<SplitButtonProps, "buttonType" | "iconPosition" | "iconType"> {
  /** Button type: "primary" | "secondary" | "tertiary" */
  buttonType?: "primary" | "secondary" | "tertiary";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
}

export type MultiActionButtonHandle = {
  /** Programmatically focus the main button */
  focusMainButton: () => void;
} | null;

export const MultiActionButton = forwardRef<
  MultiActionButtonHandle,
  MultiActionButtonProps
>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      align = "left",
      position = "left",
      disabled,
      buttonType,
      size,
      children,
      text,
      subtext,
      width,
      onClick,
      "data-element": dataElement,
      "data-role": dataRole,
      ...rest
    },
    ref,
  ) => {
    const buttonRef = useRef<ButtonHandle>(null);
    const submenuId = useRef(guid());

    useImperativeHandle<MultiActionButtonHandle, MultiActionButtonHandle>(
      ref,
      () => ({
        focusMainButton() {
          buttonRef.current?.focusButton();
        },
      }),
      [],
    );

    const {
      showAdditionalButtons,
      showButtons,
      hideButtons,
      buttonNode,
      handleToggleButtonKeyDown,
      wrapperProps,
      contextValue,
    } = useChildButtons(buttonRef.current?.ref || { current: null });

    const handleClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      onClick?.(ev as React.MouseEvent<HTMLButtonElement>);

      if (showAdditionalButtons) {
        hideButtons();
      } else {
        showButtons();
      }
    };

    useAdaptiveSidebarModalFocus(() => hideButtons());

    return (
      <StyledMultiActionButton
        ref={buttonNode}
        data-component="multi-action-button"
        data-element={dataElement}
        data-role={dataRole}
        displayed={showAdditionalButtons}
        width={width}
        {...filterStyledSystemMarginProps(rest)}
      >
        <PopoverMenu
          id={submenuId.current}
          open={showAdditionalButtons}
          placement={position === "left" ? "bottom-start" : "bottom-end"}
          onClose={hideButtons}
          onKeyDown={wrapperProps.onKeyDown}
          onBlur={wrapperProps.onBlur}
          listRef={wrapperProps.ref}
          popoverControl={
            <Button
              aria-expanded={showAdditionalButtons}
              aria-controls={submenuId.current}
              data-element="toggle-button"
              key="toggle-button"
              ref={buttonRef}
              iconPosition="after"
              iconType="dropdown"
              disabled={disabled}
              variantType={buttonType}
              size={size}
              // subtext={subtext}
              onKeyDown={handleToggleButtonKeyDown}
              onClick={handleClick}
              {...filterOutStyledSystemSpacingProps(rest)}
            >
              {text}
            </Button>
          }
        >
          {React.Children.map(children, (child) => (
            <MenuItem>
              <SplitButtonContext.Provider value={contextValue}>
                {child}
              </SplitButtonContext.Provider>
            </MenuItem>
          ))}
        </PopoverMenu>
      </StyledMultiActionButton>
    );
  },
);

export default MultiActionButton;
