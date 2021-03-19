export type ColorTypes =
  | "default"
  | "error"
  | "help"
  | "info"
  | "maintenance"
  | "new"
  | "success"
  | "warning";

export type IconTypes =
  | "add"
  | "alert"
  | "analysis"
  | "arrow_down"
  | "arrow_left"
  | "arrow_left_boxed"
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

export type TintValueType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100;

export type AlignBinaryType = "left" | "right";

export type FormFieldSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 7;

export type SizesType = "small" | "large";

export type ThemesBinary = "primary" | "secondary";

export type Positions = "top" | "bottom" | "left" | "right";

export interface MarginSpacingProps {
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
}

export interface PaddingSpacingProps {
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
}

export interface SpacingProps extends MarginSpacingProps, PaddingSpacingProps {}

export interface ColorProps {
  color?: string;
  bg?: string;
  backgroundColor?: string;
  opacity?: number;
}

export interface LayoutProps {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  size?: number | string;
  display?: string;
  verticalAlign?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
}

export interface FlexBoxProps {
  alignItems?: string;
  alignContent?: string;
  justifyItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  flexDirection?: string;
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  justifySelf?: string;
  alignSelf?: string;
  order?: number;
}

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "dashed"
  | "destructive"
  | "darkBackground";
