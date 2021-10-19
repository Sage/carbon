import * as React from "react";
import { MarginProps } from "styled-system";

export type BgSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";
export type TooltipPositions = "top" | "bottom" | "left" | "right";
export type FontSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";
export type BackgroundShape = "circle" | "rounded-rect" | "square";

export type IconType =
  | "add"
  | "alert"
  | "analysis"
  | "arrow_down"
  | "arrow_left"
  | "arrow_left_boxed"
  | "arrow_left_right_small"
  | "arrow_left_small"
  | "arrow_right"
  | "arrow_right_small"
  | "arrow_up"
  | "attach"
  | "bank"
  | "basket"
  | "basket_with_squares"
  | "bin"
  | "blocked"
  | "blocked_square"
  | "block_arrow_right"
  | "bold"
  | "boxed_shapes"
  | "bulk_destroy"
  | "bullet_list"
  | "bullet_list_dotted"
  | "bullet_list_numbers"
  | "business"
  | "calendar"
  | "calendar_today"
  | "call"
  | "camera"
  | "card_view"
  | "caret_down"
  | "caret_left"
  | "caret_right"
  | "caret_up"
  | "caret_large_down"
  | "caret_large_left"
  | "caret_large_right"
  | "caret_large_up"
  | "cart"
  | "chat"
  | "chart_bar"
  | "chart_line"
  | "chart_pie"
  | "chat_notes"
  | "chevron_down"
  | "chevron_left"
  | "chevron_right"
  | "chevron_up"
  | "chevron_down_thick"
  | "chevron_left_thick"
  | "chevron_right_thick"
  | "chevron_up_thick"
  | "circle_with_dots"
  | "circles_connection"
  | "clock"
  | "close"
  | "coins"
  | "collaborate"
  | "computer_clock"
  | "connect"
  | "copy"
  | "credit_card"
  | "credit_card_slash"
  | "cross"
  | "cross_circle"
  | "csv"
  | "delete"
  | "delivery"
  | "disputed"
  | "disconnect"
  | "document_right_align"
  | "document_tick"
  | "document_vertical_lines"
  | "download"
  | "drag"
  | "drag_vertical"
  | "draft"
  | "dropdown"
  | "duplicate"
  | "edit"
  | "edited"
  | "email"
  | "email_switch"
  | "ellipsis_horizontal"
  | "ellipsis_vertical"
  | "error"
  | "error_square"
  | "euro"
  | "expand"
  | "factory"
  | "favourite"
  | "favourite_lined"
  | "fax"
  | "feedback"
  | "file_excel"
  | "file_generic"
  | "file_image"
  | "file_pdf"
  | "file_word"
  | "files_leaning"
  | "filter"
  | "filter_new"
  | "fit_height"
  | "fit_width"
  | "flag"
  | "folder"
  | "gift"
  | "graph"
  | "grid"
  | "help"
  | "hide"
  | "home"
  | "image"
  | "in_progress"
  | "in_transit"
  | "individual"
  | "info"
  | "italic"
  | "key"
  | "ledger"
  | "ledger_arrow_left"
  | "ledger_arrow_right"
  | "link"
  | "list_view"
  | "locked"
  | "location"
  | "logout"
  | "lookup"
  | "marker"
  | "message"
  | "messages"
  | "minus"
  | "minus_large"
  | "mobile"
  | "money_bag"
  | "pause"
  | "pause_circle"
  | "pdf"
  | "people"
  | "people_switch"
  | "person"
  | "person_info"
  | "person_tick"
  | "phone"
  | "play"
  | "play_circle"
  | "plus"
  | "plus_large"
  | "pound"
  | "print"
  | "progress"
  | "progressed"
  | "question"
  | "refresh"
  | "refresh_clock"
  | "remove"
  | "sage_coin"
  | "save"
  | "scan"
  | "search"
  | "services"
  | "settings"
  | "share"
  | "shop"
  | "sort_down"
  | "sort_up"
  | "spanner"
  | "split"
  | "split_container"
  | "square_dot"
  | "squares_nine"
  | "stacked_boxes"
  | "stacked_squares"
  | "submitted"
  | "sync"
  | "tag"
  | "three_boxes"
  | "tick"
  | "tick_circle"
  | "unlocked"
  | "upload"
  | "uploaded"
  | "video"
  | "view"
  | "warning";

export interface IconProps extends MarginProps {
  /** Icon type */
  type: IconType;
  /** Background size */
  bgSize?: BgSize;
  /** Background shape */
  bgShape?: BackgroundShape;
  /** Icon font size */
  fontSize?: FontSize;
  /** Icon colour, provide any color from palette or any valid css color value. */
  color?: string;
  /** Background colour, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** The message to be displayed within the tooltip */
  tooltipMessage?: React.ReactNode;
  /** The position to display the tooltip */
  tooltipPosition?: TooltipPositions;
  /** Control whether the tooltip is visible */
  tooltipVisible?: boolean;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip */
  tooltipFlipOverrides?: TooltipPositions[];
}

declare function Icon(
  props: IconProps & React.RefAttributes<HTMLSpanElement>
): JSX.Element;

export default Icon;
