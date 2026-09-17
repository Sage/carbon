import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";
import { WidthProps } from "styled-system";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../split-button";
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
import { VariantType } from "../button/__next__/button.config";
import { globalSizeS, globalSizeM, globalSizeL } from "./__internal__/tokens";
import { MAX_VISIBLE_ITEMS } from "./multi-action-button.config";

export interface MultiActionButtonProps
  extends Omit<SplitButtonProps, "buttonType" | "iconPosition" | "iconType" | "isWhite" | "align" | "menuWidth"> {
  /** @deprecated Button type: "primary" | "secondary" | "tertiary" */
  buttonType?: "primary" | "secondary" | "tertiary";
  variantType?: VariantType;
  /** @deprecated Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** @deprecated The component width */
  width?: WidthProps["width"];
  /** @deprecated Renders the white variant of the secondary split button */
  isWhite?: boolean;
  /** @deprecated Set align of the rendered content */
  align?: "left" | "right";
  /** Allows override of the default menu width */
  menuWidth?: string;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /** If true, only the icon will be displayed on the button */
  iconOnly?: boolean;
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
}

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
      variantType,
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
      iconOnly = false,
      ...rest
    },
    ref,
  ) => {
    const buttonVariant = variantType ? variantType : buttonType ? buttonType : "primary";

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
          <StyledBackdrop
            data-role="popup-backdrop"
            data-testid="popup-backdrop"
          />
        )}
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
                  variantType={buttonVariant}
                  size={size}
                  subtext={subtext}
                  onKeyDown={handleToggleButtonKeyDown}
                  onClick={handleClick}
                  isWhite={isWhite}
                  fullWidth
                  aria-label={iconOnly ? text : undefined}

                  {...filterOutStyledSystemSpacingProps(rest)}
                >
                  {!iconOnly && text}
                  <Icon type="dropdown" color="inherit" bg="transparent" />
                </Button>
              );
            }}
          >
            {children}
          </PopoverMenu>
        </MultiActionButtonContext.Provider>
      </StyledMultiActionButton>
    );
  },
);

export default MultiActionButton;
