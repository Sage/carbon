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
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";
import guid from "../../__internal__/utils/helpers/guid";
import Logger from "../../__internal__/utils/logger";

export interface MultiActionButtonProps
  extends Omit<WidthProps, "width">,
    Omit<
      SplitButtonProps,
      "buttonType" | "iconPosition" | "iconType" | "isWhite"
    > {
  /** @deprecated Button type: "primary" | "secondary" | "tertiary" */
  buttonType?: "primary" | "secondary" | "tertiary";
  /** @deprecated Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** @deprecated The component width */
  width?: WidthProps["width"];
  /** @deprecated Renders the white variant of the secondary split button */
  isWhite?: boolean;
  /** Allows override of the default menu width */
  menuWidth?: WidthProps["width"];
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
}

export type MultiActionButtonHandle = {
  /** Programmatically focus the main button */
  focusMainButton: () => void;
} | null;

let deprecatedAlignTriggered = false;
let deprecatedSubtextTriggered = false;
let deprecatedButtonTypeTriggered = false;
let deprecatedIsWhiteTriggered = false;
let deprecatedWidthTriggered = false;

export const MultiActionButton = forwardRef<
  MultiActionButtonHandle,
  MultiActionButtonProps
>(
  (
    {
      align = "left",
      position = "right",
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
      isWhite,
      menuWidth,
      fullWidth,
      ...rest
    },
    ref,
  ) => {
    if (!deprecatedAlignTriggered && align) {
      deprecatedAlignTriggered = true;
      Logger.deprecate(
        "The align prop in Multi Action Button is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedSubtextTriggered && subtext) {
      deprecatedSubtextTriggered = true;
      Logger.deprecate(
        "The subtext prop in Multi Action Button is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedButtonTypeTriggered && subtext) {
      deprecatedButtonTypeTriggered = true;
      Logger.deprecate(
        "The buttonType prop in Multi Action Button is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedIsWhiteTriggered && subtext) {
      deprecatedIsWhiteTriggered = true;
      Logger.deprecate(
        "The isWhite prop in Multi Action Button is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedWidthTriggered && subtext) {
      deprecatedWidthTriggered = true;
      Logger.deprecate(
        "The width prop in Multi Action Button is deprecated and will soon be removed.",
      );
    }

    const buttonRef = useRef<HTMLButtonElement>(null);
    const { isInFlatTable } = useContext(FlatTableContext);
    const submenuId = useRef(guid());

    useImperativeHandle<MultiActionButtonHandle, MultiActionButtonHandle>(
      ref,
      () => ({
        focusMainButton() {
          buttonRef.current?.focus({ preventScroll: true });
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
          align={align}
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
        width={width}
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
          buttonType={buttonType}
          size={size}
          subtext={subtext}
          onKeyDown={handleToggleButtonKeyDown}
          onClick={handleClick}
          isWhite={isWhite}
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
