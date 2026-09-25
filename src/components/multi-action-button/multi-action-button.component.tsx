import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { WidthProps } from "styled-system";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../split-button";
import SplitButtonContext from "../split-button/__internal__/split-button.context";
import StyledMultiActionButton from "./multi-action-button.style";
import { StyledBackdrop } from "../split-button/split-button.style";
import Button from "../button/__next__";
import Icon from "../icon";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import useChildButtons from "../../hooks/__internal__/useChildButtons";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";
import guid from "../../__internal__/utils/helpers/guid";
import { PopoverMenu } from "../../__internal__/popover-menu";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";
import MultiActionButtonContext from "./__internal__/multi-action-button.context";
import { globalSizeS, globalSizeM, globalSizeL } from "./__internal__/tokens";
import { MAX_VISIBLE_ITEMS } from "./multi-action-button.config";

export interface MultiActionButtonProps
  extends Omit<
    SplitButtonProps,
    | "buttonType"
    | "iconPosition"
    | "iconType"
    | "isWhite"
    | "align"
    | "menuWidth"
  > {
  /**
   * @deprecated This prop is deprecated. It will be removed in a future release.
   * MultiActionButton only supports the primary variant. */
  buttonType?: "primary" | "secondary" | "tertiary";
  /**
   * @deprecated This prop is deprecated and has no effect. It will be removed in a future release.
   * Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /**
   * @deprecated This prop is deprecated. It will be removed in a future release.
   * The component width */
  width?: WidthProps["width"];
  /**
   * @deprecated This prop is deprecated. It will be removed in a future release.
   * Renders the white variant of the secondary split button */
  isWhite?: boolean;
  /**
   * @deprecated This prop is deprecated. It will be removed in a future release.
   * Set align of the rendered content */
  align?: "left" | "right";
  /** Allows override of the default menu width */
  menuWidth?: string;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
}

export type MultiActionButtonHandle = {
  /** Programmatically focus the main button */
  focusMainButton: () => void;
} | null;

const computeMaxHeight = (size: "small" | "medium" | "large" | undefined) => {
  switch (size) {
    case "small":
      return parseFloat(globalSizeS) * MAX_VISIBLE_ITEMS;
    case "large":
      return parseFloat(globalSizeL) * MAX_VISIBLE_ITEMS;
    default: // "medium"
      return parseFloat(globalSizeM) * MAX_VISIBLE_ITEMS;
  }
};

export const MultiActionButton = forwardRef<
  MultiActionButtonHandle,
  MultiActionButtonProps
>(
  (
    {
      align = "left",
      position = "right",
      disabled,
      buttonType = "primary",
      size = "medium",
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
      hideButtons,
      showButtons,
      buttonNode,
      handleToggleButtonKeyDown,
    } = useChildButtons(buttonRef);

    const handleInsideClick = useClickAwayListener(hideButtons);

    const handleChildButtonClick = useCallback(
      (
        childOnClick?: React.MouseEventHandler<
          HTMLButtonElement | HTMLAnchorElement
        >,
      ) =>
        (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          childOnClick?.(ev);
          hideButtons();
          buttonRef.current?.focus();
        },
      [hideButtons],
    );

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

    useEffect(() => {
      if (!isInFlatTable) return;

      const handleClickOnPopupBackdrop = (ev: MouseEvent) => {
        if (
          ev.target instanceof HTMLElement &&
          ev.target.dataset.role === "popup-backdrop" &&
          showAdditionalButtons
        ) {
          hideButtons();
        }
      };

      document.addEventListener("click", handleClickOnPopupBackdrop);

      return () => {
        document.removeEventListener("click", handleClickOnPopupBackdrop);
      };
    }, [hideButtons, isInFlatTable, showAdditionalButtons]);

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
        {isInFlatTable && showAdditionalButtons && (
          <StyledBackdrop data-role="popup-backdrop" />
        )}
        <SplitButtonContext.Provider
          value={{
            inSplitButton: showAdditionalButtons,
            onChildButtonClick: handleChildButtonClick,
          }}
        >
          <MultiActionButtonContext.Provider value={{ align: align }}>
            <PopoverMenu<HTMLButtonElement>
              open={showAdditionalButtons}
              onOpen={showButtons}
              onClose={hideButtons}
              size={size}
              placement={
                position === "left"
                  ? /* istanbul ignore next */ "bottom-start"
                  : "bottom-end"
              }
              isButtonMenu
              id={submenuId.current}
              controlReference={buttonNode}
              matchReferenceWidth={fullWidth}
              popoverStrategy="fixed"
              maxHeight={`${computeMaxHeight(size)}px`}
              width={menuWidth}
              popoverControl={(ref, props) => {
                const combinedRef = combineRefs(ref, buttonRef);
                return (
                  <Button
                    {...props}
                    className={showAdditionalButtons ? "active" : ""}
                    aria-expanded={showAdditionalButtons}
                    aria-controls={submenuId.current}
                    data-element="toggle-button"
                    key="toggle-button"
                    ref={combinedRef}
                    iconPosition="after"
                    disabled={disabled}
                    variantType={buttonType}
                    size={size}
                    subtext={subtext}
                    onKeyDown={handleToggleButtonKeyDown}
                    onClick={handleClick}
                    isWhite={isWhite}
                    fullWidth
                    {...filterOutStyledSystemSpacingProps(rest)}
                  >
                    {text}
                    <Icon type="dropdown" color="inherit" bg="transparent" />
                  </Button>
                );
              }}
            >
              {children}
            </PopoverMenu>
          </MultiActionButtonContext.Provider>
        </SplitButtonContext.Provider>
      </StyledMultiActionButton>
    );
  },
);

export default MultiActionButton;
