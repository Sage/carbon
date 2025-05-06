import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { WidthProps } from "styled-system";
import { flip, offset } from "@floating-ui/dom";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../split-button";
import SplitButtonContext from "../split-button/__internal__/split-button.context";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button from "../button";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import useChildButtons from "../../hooks/__internal__/useChildButtons";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";

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
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { isInFlatTable } = useContext(FlatTableContext);

    useImperativeHandle<MultiActionButtonHandle, MultiActionButtonHandle>(
      ref,
      () => ({
        focusMainButton() {
          buttonRef.current?.focus();
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
    } = useChildButtons(buttonRef);

    const handleInsideClick = useClickAwayListener(hideButtons);

    const handleClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      showButtons();
      handleInsideClick();
      if (onClick) {
        onClick(ev as React.MouseEvent<HTMLButtonElement>);
      }
    };

    const mainButtonProps = {
      disabled,
      displayed: showAdditionalButtons,
      onTouchStart: showButtons,
      onKeyDown: handleToggleButtonKeyDown,
      onClick: handleClick,
      buttonType,
      size,
      subtext,
      ...filterOutStyledSystemSpacingProps(rest),
    };

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
        <StyledButtonChildrenContainer {...wrapperProps} align={align}>
          <SplitButtonContext.Provider value={contextValue}>
            {React.Children.map(children, (child) => (
              <li>{child}</li>
            ))}
          </SplitButtonContext.Provider>
        </StyledButtonChildrenContainer>
      </Popover>
    );

    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledMultiActionButton
        ref={buttonNode}
        data-component="multi-action-button"
        data-element={dataElement}
        data-role={dataRole}
        displayed={showAdditionalButtons}
        width={width}
        {...marginProps}
      >
        <Button
          aria-haspopup="true"
          aria-expanded={showAdditionalButtons}
          data-element="toggle-button"
          key="toggle-button"
          {...mainButtonProps}
          ref={buttonRef}
          iconPosition="after"
          iconType="dropdown"
        >
          {text}
        </Button>
        {showAdditionalButtons && renderAdditionalButtons()}
      </StyledMultiActionButton>
    );
  },
);

export default MultiActionButton;
