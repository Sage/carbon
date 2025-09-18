import React, {
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ThemeContext } from "styled-components";
import { MarginProps } from "styled-system";
import { flip, offset } from "@floating-ui/dom";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Icon, { IconType } from "../icon";
import Button from "../button";
import StyledSplitButton from "./split-button.style";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import guid from "../../__internal__/utils/helpers/guid";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { baseTheme } from "../../style/themes";
import useChildButtons from "../../hooks/__internal__/useChildButtons";
import useAdaptiveSidebarModalFocus from "../../hooks/__internal__/useAdaptiveSidebarModalFocus";
import SplitButtonContext from "./__internal__/split-button.context";
import useLocale from "../../hooks/__internal__/useLocale";
import FlatTableContext from "../flat-table/__internal__/flat-table.context";
import { TagProps } from "../../__internal__/utils/helpers/tags";

const CONTENT_WIDTH_RATIO = 0.75;

export interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    MarginProps,
    TagProps {
  /** Set align of the rendered content */
  align?: "left" | "right";
  /** Button type: "primary" | "secondary" */
  buttonType?: "primary" | "secondary";
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
  /** The size of the buttons. */
  size?: "small" | "medium" | "large";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
  /** The text to be displayed in the main button. */
  text: string;
  /** Sets rendering position of menu */
  position?: "left" | "right";
  /** Renders the white variant of the secondary split button */
  isWhite?: boolean;
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
      align = "left",
      position = "right",
      buttonType = "secondary",
      children,
      disabled = false,
      iconPosition = "before",
      iconType,
      onClick,
      size = "medium",
      subtext,
      text,
      "data-element": dataElement,
      "data-role": dataRole,
      "aria-label": ariaLabel,
      isWhite = false,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const theme = useContext(ThemeContext) || baseTheme;
    const buttonLabelId = useRef(guid());
    const submenuId = useRef(guid());

    const mainButtonRef = useRef<HTMLButtonElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const { isInFlatTable } = useContext(FlatTableContext);

    const shouldRenderIsWhiteVariant = buttonType === "secondary" && isWhite;

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

    const {
      showAdditionalButtons,
      showButtons,
      hideButtons,
      buttonNode,
      handleToggleButtonKeyDown,
      wrapperProps,
      contextValue,
    } = useChildButtons(toggleButtonRef, CONTENT_WIDTH_RATIO);

    const handleMainClick = (
      ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      // ensure button is focused when clicked (Safari)
      mainButtonRef.current?.focus();
      if (onClick) {
        onClick(ev as React.MouseEvent<HTMLButtonElement>);
      }
    };

    const mainButtonProps = {
      onFocus: hideButtons,
      onTouchStart: hideButtons,
      iconPosition,
      buttonType,
      disabled,
      iconType,
      onClick: handleMainClick,
      size,
      subtext,
      isWhite: shouldRenderIsWhiteVariant,
      ...filterOutStyledSystemSpacingProps(rest),
    };

    const handleToggleClick = () => {
      // ensure button is focused when clicked (Safari)
      toggleButtonRef.current?.focus({ preventScroll: true });

      if (showAdditionalButtons) {
        hideButtons();
      } else {
        showButtons();
      }
    };

    useAdaptiveSidebarModalFocus(() => hideButtons());

    const toggleButtonProps = {
      isWhite: shouldRenderIsWhiteVariant,
      disabled,
      displayed: showAdditionalButtons,
      onTouchStart: showButtons,
      onKeyDown: handleToggleButtonKeyDown,
      onClick: handleToggleClick,
      buttonType,
      size,
    };

    function componentTags() {
      return {
        "data-component": "split-button",
        "data-element": dataElement,
        "data-role": dataRole,
      };
    }

    function getIconColor() {
      const colorsMap = {
        primary: theme.colors.white,
        secondary: theme.colors.primary,
      };
      return colorsMap[buttonType];
    }

    function renderMainButton() {
      return [
        <Button
          data-element="main-button"
          key="main-button"
          id={buttonLabelId.current}
          ref={mainButtonRef}
          {...mainButtonProps}
        >
          {text}
        </Button>,
        <StyledSplitButtonToggle
          aria-expanded={showAdditionalButtons}
          aria-controls={submenuId.current}
          aria-label={ariaLabel || locale.splitButton.ariaLabel()}
          data-element="toggle-button"
          key="toggle-button"
          type="button"
          ref={toggleButtonRef}
          {...toggleButtonProps}
        >
          <Icon
            type="dropdown"
            color={getIconColor()}
            bg="transparent"
            disabled={disabled}
          />
        </StyledSplitButtonToggle>,
      ];
    }

    function renderAdditionalButtons() {
      if (!showAdditionalButtons) return null;

      return (
        <Popover
          disableBackgroundUI={isInFlatTable}
          disablePortal
          placement={
            position === "left"
              ? /* istanbul ignore next */ "bottom-start"
              : "bottom-end"
          }
          popoverStrategy="fixed"
          reference={buttonNode}
          middleware={[
            offset(6),
            flip({
              fallbackStrategy: "initialPlacement",
            }),
          ]}
        >
          <StyledSplitButtonChildrenContainer
            id={submenuId.current}
            {...wrapperProps}
            align={align}
          >
            <SplitButtonContext.Provider value={contextValue}>
              {React.Children.map(children, (child) => (
                <li>{child}</li>
              ))}
            </SplitButtonContext.Provider>
          </StyledSplitButtonChildrenContainer>
        </Popover>
      );
    }

    const handleClick = useClickAwayListener(hideButtons);
    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledSplitButton
        onClick={handleClick}
        ref={buttonNode}
        {...componentTags()}
        {...marginProps}
      >
        {renderMainButton()}
        {renderAdditionalButtons()}
      </StyledSplitButton>
    );
  },
);

export default SplitButton;
