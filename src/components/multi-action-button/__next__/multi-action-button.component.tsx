import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";
import { WidthProps } from "styled-system";
import { flip, offset } from "@floating-ui/dom";

import useClickAwayListener from "../../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../../split-button";
import SplitButtonContext from "../../split-button/__internal__/split-button.context";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button from "../../button/__next__";
import Popover from "../../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../../style/utils";
import useChildButtons from "../../../hooks/__internal__/useChildButtons";
import useAdaptiveSidebarModalFocus from "../../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import FlatTableContext from "../../flat-table/__internal__/flat-table.context";
import guid from "../../../__internal__/utils/helpers/guid";
import { ButtonHandle } from "../../button/__next__/button.component";

export interface MultiActionButtonProps
  extends Omit<WidthProps, "width">,
    Omit<SplitButtonProps, "buttonType" | "iconPosition" | "iconType" | "isWhite"> {
  /** Allows override of the default menu width */
  menuWidth?: WidthProps["width"]
  /** Apply fullWidth style to the button */
  fullWidth?: boolean
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
      position = "right",
      disabled,
      size,
      children,
      text,
      onClick,
      "data-element": dataElement,
      "data-role": dataRole,
      menuWidth,
      fullWidth,
      ...rest
    },
    ref,
  ) => {

    const buttonRef = useRef<ButtonHandle>(null);
    const buttonElementRef = useRef<HTMLButtonElement | null>(null);
    const { isInFlatTable } = useContext(FlatTableContext);
    const submenuId = useRef(guid());

    useEffect(() => {
      buttonElementRef.current = buttonRef.current?.element ?? null;
    });

    useImperativeHandle<MultiActionButtonHandle, MultiActionButtonHandle>(
      ref,
      () => ({
        focusMainButton() {
          buttonRef.current?.element?.focus({ preventScroll: true });
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
    } = useChildButtons(buttonElementRef);

    const handleInsideClick = useClickAwayListener(hideButtons);

    const handleClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      onClick?.(ev as React.MouseEvent<HTMLButtonElement>);

      if (showAdditionalButtons) {
        hideButtons();
      } else {
        showButtons();
      }

      handleInsideClick();
    };

    useAdaptiveSidebarModalFocus(() => hideButtons());

    const renderAdditionalButtons = () => (
      <Popover
        disableBackgroundUI={isInFlatTable}
        disablePortal
        placement={
          position === "left"
            ? "bottom-start"
            : /* istanbul ignore next */ "bottom-end"
        }
        reference={buttonNode}
        popoverStrategy="fixed"
        middleware={[
          offset(6),
          flip({
            fallbackStrategy: "initialPlacement",
          }),
        ]}
      >
        <StyledButtonChildrenContainer
          id={submenuId.current}
          {...wrapperProps}
          hidden={!showAdditionalButtons}
        >
          <SplitButtonContext.Provider value={contextValue}>
            {React.Children.map(children, (child) => (
              <li>{child}</li>
            ))}
          </SplitButtonContext.Provider>
        </StyledButtonChildrenContainer>
      </Popover>
    );

    return (
      <StyledMultiActionButton
        ref={buttonNode}
        data-component="multi-action-button"
        data-element={dataElement}
        data-role={dataRole}
        displayed={showAdditionalButtons}
        menuWidth={menuWidth}
        fullWidth={fullWidth}
        {...filterStyledSystemMarginProps(rest)}
      >
        <Button
          aria-expanded={showAdditionalButtons}
          aria-controls={submenuId.current}
          data-element="toggle-button"
          key="toggle-button"
          ref={buttonRef}
          iconPosition="after"
          iconType="dropdown"
          disabled={disabled}
          size={size}
          onKeyDown={handleToggleButtonKeyDown}
          onClick={handleClick}
          fullWidth={fullWidth}
          {...filterOutStyledSystemSpacingProps(rest)}
        >
          {text}
        </Button>
        {renderAdditionalButtons()}
      </StyledMultiActionButton>
    );
  },
);

export default MultiActionButton;
