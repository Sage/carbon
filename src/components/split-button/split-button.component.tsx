import React, {
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
} from "react";
import { MarginProps } from "styled-system";
import Icon, { IconType } from "../icon";
import Button from "../button/__next__";
import StyledSplitButton, {
  StyledPopoverMenuWrapper,
  StyledBackdrop,
} from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import { PopoverMenu } from "../../__internal__/popover-menu";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import SplitButtonContext from "./__internal__/split-button.context";
import useLocale from "../../hooks/__internal__/useLocale";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    MarginProps,
    TagProps {
  /**
   * @deprecated This prop is deprecated and will be removed in a future release.
   * Set align of the rendered content */
  align?: "left" | "right";
  /** Button type. SplitButton only supports the primary variant. */
  buttonType?: "primary";
  /** The additional button to display. */
  children: React.ReactNode;
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** Gives the button a disabled state. */
  disabled?: boolean;
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** Set the width of the menu. Defaults to the width of the SplitButton. */
  menuWidth?: string;
  /** The size of the buttons. */
  size?: "small" | "medium" | "large";
  /**
   * @deprecated This prop is no longer supported on this component.
   * Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** The text to be displayed in the main button. */
  text: string;
  /**
   * @deprecated This prop is deprecated and will be removed in a future release.
   * Sets the alignment of the rendered content */
  position?: "left" | "right";
}

export type SplitButtonHandle = {
  /** Programmatically focus the main button */
  focusMainButton: () => void;
  /** Programmatically focus the toggle button. */
  focusToggleButton: () => void;
} | null;

export const SplitButton = forwardRef<SplitButtonHandle, SplitButtonProps>(
  (
    {
      align: _align = "left", // eslint-disable-line @typescript-eslint/no-unused-vars -- deprecated, kept for backwards compatibility
      position = "right",
      buttonType = "primary",
      children,
      disabled = false,
      iconPosition = "before",
      iconType,
      menuWidth,
      onClick,
      size = "medium",
      subtext: _subtext,
      text,
      "data-element": dataElement,
      "data-role": dataRole,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

    const mainButtonRef = useRef<HTMLButtonElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const buttonNode = useRef<HTMLDivElement>(null);
    const toggleWrapperRef = useRef<HTMLDivElement>(null);

    const { isInFlatTable } = useContext(FlatTableContext);

    useImperativeHandle<SplitButtonHandle, SplitButtonHandle>(
      ref,
      () => ({
        focusMainButton() {
          mainButtonRef.current?.focus();
        },
        focusToggleButton() {
          toggleButtonRef.current?.focus();
        },
      }),
      [],
    );

    const hideButtons = useCallback(() => {
      setShowAdditionalButtons(false);
    }, []);

    const showButtons = useCallback(() => {
      setShowAdditionalButtons(true);
    }, []);

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

    const handleMainClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      onClick?.(ev as React.MouseEvent<HTMLButtonElement>);
      if (showAdditionalButtons) {
        hideButtons();
      }
    };

    const handleToggleClick = () => {
      if (showAdditionalButtons) {
        hideButtons();
      } else {
        showButtons();
      }
    };

    const handleChildButtonClick = useCallback(
      (childOnClick?: React.MouseEventHandler<HTMLButtonElement>) =>
        (ev: React.MouseEvent<HTMLButtonElement>) => {
          childOnClick?.(ev);
          hideButtons();
          toggleButtonRef.current?.focus();
        },
      [hideButtons],
    );

    useAdaptiveSidebarModalFocus(() => hideButtons());

    const contextValue = {
      inSplitButton: true,
      onChildButtonClick: handleChildButtonClick,
    };

    return (
      <StyledSplitButton
        data-component="split-button"
        data-element={dataElement}
        data-role={dataRole}
        ref={buttonNode}
        {...filterStyledSystemMarginProps(rest)}
      >
        {isInFlatTable && showAdditionalButtons && (
          <StyledBackdrop
            data-role="popup-backdrop"
            data-testid="popup-backdrop"
          />
        )}
        <Button
          data-element="main-button"
          ref={mainButtonRef}
          size={size}
          iconType={iconType}
          disabled={disabled}
          variantType={buttonType}
          iconPosition={iconPosition}
          onClick={handleMainClick}
          {...filterOutStyledSystemSpacingProps(rest)}
        >
          {text}
        </Button>
        <SplitButtonContext.Provider value={contextValue}>
          <StyledPopoverMenuWrapper ref={toggleWrapperRef}>
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
              matchReferenceWidth
              popoverStrategy="fixed"
              width={menuWidth}
              popoverControl={(ref, props) => {
                const combinedRef = combineRefs(ref, toggleButtonRef);
                return (
                  <StyledSplitButtonToggle
                    {...props}
                    aria-label={ariaLabel || locale.splitButton.ariaLabel()}
                    data-element="toggle-button"
                    type="button"
                    ref={combinedRef}
                    disabled={disabled}
                    $displayed={showAdditionalButtons}
                    $size={size}
                    $variant="default"
                    $variantType={buttonType}
                    onClick={handleToggleClick}
                  >
                    <Icon type="dropdown" />
                  </StyledSplitButtonToggle>
                );
              }}
            >
              {children}
            </PopoverMenu>
          </StyledPopoverMenuWrapper>
        </SplitButtonContext.Provider>
      </StyledSplitButton>
    );
  },
);

export default SplitButton;
