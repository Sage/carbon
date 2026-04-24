import React, { useMemo } from "react";
import { MarginProps } from "styled-system";
import Logger from "../../__internal__/utils/logger";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import StyledIcon, {
  BackgroundShape,
  BgSize,
  FontSize,
  StyledIconProps,
} from "./icon.style";
import { IconType } from "./icon-type";
import { TooltipPositions } from "../tooltip/tooltip.config";

export type LegacyIconTypes =
  | "help"
  | "maintenance"
  | "new"
  | "success"
  | "messages";

/**
 * The size of the Icon.
 *
 * - `small` — 16px (default)
 * - `medium` — 24px
 * - `large` — 32px
 */
export type IconSize = "small" | "medium" | "large";

export interface IconProps
  extends Pick<StyledIconProps, "className" | "inverse">,
    MarginProps,
    TagProps {
  /** Set whether icon should be recognised by assistive technologies */
  "aria-hidden"?: boolean;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** Id passed to the icon. */
  id?: string;
  /** The ARIA role to be applied to the Icon */
  role?: string;
  /**
   * @deprecated Tooltip support has been removed from `Icon` and the use of tooltips
   * is discouraged. This prop no longer has any effect.
   */
  tooltipMessage?: React.ReactNode;
  /** @deprecated */
  tooltipPosition?: TooltipPositions;
  /** @deprecated */
  tooltipVisible?: boolean;
  /** @deprecated */
  tooltipBgColor?: string;
  /** @deprecated */
  tooltipFontColor?: string;
  /** @deprecated */
  tooltipFlipOverrides?: TooltipPositions[];
  /** @deprecated */
  tooltipId?: string;
  /**
   * Icon type.
   *
   * Icons use a `snake_case` naming convention and are organised into the following categories:
   *
   * - **Navigation** — `arrow_*`, `chevron_*`, `caret_*`, `caret_large_*`
   * - **Actions** — `add`, `bin`, `close`, `copy`, `create`, `delete`, `drag`, `download`,
   *   `edit`, `export`, `filter`, `link`, `search`, `settings`, `upload`, and more.
   * - **Status** — `alert`, `blocked`, `double_tick`, `error`, `error_square`, `info`,
   *   `tick`, `warning`, and more.
   * - **Communication** — `call`, `chat`, `email`, `fax`, `message`, and more.
   * - **Finance** — `bank`, `cash`, `coins`, `credit_card`, `euro`, `receipt`, and more.
   * - **Social / App** — `app_facebook`, `app_instagram`, `app_tiktok`, `app_twitter`, `app_youtube`.
   * - **Documents & Files** — `attach`, `document_*`, `file_*`, and more.
   * - **Charts** — `chart_bar`, `chart_bar_arrow_up`, `chart_line`, `chart_pie`.
   *
   * The full list of types can be seen [here](https://carbon.sage.com/?path=/docs/icon--list-of-icons#list-of-icons).
   */
  type: IconType | LegacyIconTypes;
  /** @ignore @private */
  focusable?: boolean;
  /** @ignore @private */
  isPartOfInput?: boolean;
  /** @ignore @private */
  inputSize?: "small" | "medium" | "large";
  /** @ignore @private */
  tabIndex?: number;
  /**
   * Size of the Icon.
   *
   * - `small` — 16px (default)
   * - `medium` — 24px
   * - `large` — 32px
   */
  size?: IconSize;
  /** Renders the Icon in a light colour, suitable for use on dark backgrounds. */
  inverse?: boolean;
  /**
   * @deprecated Use the `size` prop instead. The `extra-large` value is no longer
   * supported and will be mapped to `large`.
   */
  fontSize?: FontSize;
  /** @deprecated Use CSS or a wrapper element to apply a background colour. */
  bg?: string;
  /** @deprecated Use CSS or a wrapper element to apply a background shape. */
  bgShape?: BackgroundShape;
  /** @deprecated Use CSS or a wrapper element to control background size. */
  bgSize?: BgSize;
  /** @deprecated Use CSS or a wrapper element to control icon colour. */
  color?: string;
  /** @deprecated */
  disabled?: boolean;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      "aria-hidden": ariaHidden,
      ariaLabel,
      bg,
      bgShape,
      bgSize,
      className,
      color,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      focusable: _focusable,
      fontSize,
      id,
      inputSize: _inputSize,
      isPartOfInput: _isPartOfInput,
      inverse,
      size,
      tabIndex,
      tooltipMessage: _tooltipMessage,
      tooltipPosition: _tooltipPosition,
      tooltipVisible: _tooltipVisible,
      tooltipBgColor: _tooltipBgColor,
      tooltipFontColor: _tooltipFontColor,
      tooltipFlipOverrides: _tooltipFlipOverrides,
      tooltipId: _tooltipId,
      type,
      role,
      ...rest
    }: IconProps,
    ref,
  ): JSX.Element => {
    /** Return Icon type with overrides */
    const iconType = useMemo(() => {
      // switch tweaks icon names for actual icons in the set
      switch (type) {
        case "help":
          return "question";
        case "maintenance":
          return "settings";
        case "new":
          return "gift";
        case "success":
          return "tick";
        case "messages":
        case "email":
          return "message";
        default:
          return type;
      }
    }, [type]);

    const resolvedSize = useMemo((): "small" | "medium" | "large" => {
      if (fontSize) {
        if (fontSize === "extra-large") {
          Logger.warn(
            `[Icon] The \`fontSize\` value "extra-large" is no longer supported and has been mapped to "large".`,
          );
          return "large";
        }
        return fontSize;
      }
      return size ?? "small";
    }, [fontSize, size]);

    const styledIconProps = {
      "aria-hidden": ariaHidden,
      "aria-label": ariaLabel,
      bg,
      bgSize: bgSize || resolvedSize,
      bgShape,
      className: className || undefined,
      color,
      "data-component": "icon",
      "data-element": dataElement ?? iconType,
      "data-role": dataRole ?? "icon",
      disabled,
      fontSize: resolvedSize,
      id,
      inverse,
      ref,
      role,
      tabIndex,
      type: iconType,
      ...filterStyledSystemMarginProps(rest),
    };

    return <StyledIcon {...styledIconProps} />;
  },
);

Icon.displayName = "Icon";

export default Icon;
