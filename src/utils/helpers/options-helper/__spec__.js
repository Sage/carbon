import OptionsHelper from "./options-helper";

describe("OptionsHelper", () => {
  it("alignBinary", () => {
    expect(OptionsHelper.alignBinary).toEqual(["left", "right"]);
  });
  it("alignFull", () => {
    expect(OptionsHelper.alignFull).toEqual(["center", "left", "right"]);
  });
  it("buttonColors", () => {
    expect(OptionsHelper.buttonColors).toEqual([
      "blue",
      "grey",
      "magenta",
      "magenta-dull",
      "red",
      "white",
    ]);
  });
  it("buttonIconPositions", () => {
    expect(OptionsHelper.buttonIconPositions).toEqual(["before", "after"]);
  });
  it("colors", () => {
    expect(OptionsHelper.colors).toEqual([
      "default",
      "error",
      "help",
      "info",
      "maintenance",
      "new",
      "success",
      "warning",
    ]);
  });
  it("icons", () => {
    expect(OptionsHelper.icons).toEqual([
      "add",
      "alert",
      "analysis",
      "arrow_down",
      "arrow_left",
      "arrow_left_boxed",
      "arrow_left_small",
      "arrow_right",
      "arrow_right_small",
      "arrow_up",
      "attach",
      "bank",
      "basket",
      "basket_with_squares",
      "bin",
      "blocked",
      "blocked_square",
      "block_arrow_right",
      "bold",
      "boxed_shapes",
      "bulk_destroy",
      "bullet_list",
      "bullet_list_dotted",
      "bullet_list_numbers",
      "business",
      "calendar",
      "calendar_today",
      "call",
      "camera",
      "card_view",
      "caret_down",
      "cart",
      "chat",
      "chart_bar",
      "chart_line",
      "chart_pie",
      "chat_notes",
      "chevron_down",
      "chevron_left",
      "chevron_right",
      "chevron_up",
      "circles_connection",
      "clock",
      "close",
      "coins",
      "collaborate",
      "computer_clock",
      "connect",
      "copy",
      "credit_card",
      "credit_card_slash",
      "cross",
      "cross_circle",
      "csv",
      "delete",
      "delivery",
      "disputed",
      "document_right_align",
      "document_tick",
      "document_vertical_lines",
      "download",
      "drag",
      "drag_vertical",
      "draft",
      "dropdown",
      "duplicate",
      "edit",
      "edited",
      "email",
      "email_switch",
      "ellipsis_horizontal",
      "ellipsis_vertical",
      "error",
      "error_square",
      "factory",
      "favourite",
      "favourite_lined",
      "fax",
      "feedback",
      "file_excel",
      "file_generic",
      "file_image",
      "file_pdf",
      "file_word",
      "files_leaning",
      "filter",
      "filter_new",
      "fit_height",
      "fit_width",
      "flag",
      "folder",
      "gift",
      "graph",
      "grid",
      "help",
      "hide",
      "home",
      "image",
      "in_progress",
      "in_transit",
      "individual",
      "info",
      "italic",
      "key",
      "ledger",
      "ledger_arrow_left",
      "ledger_arrow_right",
      "link",
      "list_view",
      "locked",
      "location",
      "logout",
      "lookup",
      "marker",
      "message",
      "messages",
      "minus",
      "minus_large",
      "mobile",
      "money_bag",
      "pause_circle",
      "pdf",
      "people",
      "people_switch",
      "person",
      "person_info",
      "person_tick",
      "phone",
      "play",
      "play_circle",
      "plus",
      "plus_large",
      "print",
      "progress",
      "progressed",
      "question",
      "refresh",
      "refresh_clock",
      "remove",
      "save",
      "scan",
      "search",
      "services",
      "settings",
      "share",
      "shop",
      "sort_down",
      "sort_up",
      "spanner",
      "split",
      "split_container",
      "stacked_boxes",
      "stacked_squares",
      "submitted",
      "sync",
      "tag",
      "three_boxes",
      "tick",
      "tick_circle",
      "unlocked",
      "upload",
      "uploaded",
      "video",
      "view",
      "warning",
    ]);
  });
  it("pageSizes", () => {
    expect(OptionsHelper.pageSizes).toEqual([10, 25, 50]);
  });
  it("positions", () => {
    expect(OptionsHelper.positions).toEqual(["bottom", "left", "right", "top"]);
  });
  it("sizesFull", () => {
    expect(OptionsHelper.sizesFull).toEqual([
      "extra-small",
      "small",
      "medium-small",
      "medium",
      "medium-large",
      "large",
      "extra-large",
    ]);
  });
  it("sizesPod", () => {
    expect(OptionsHelper.sizesPod).toEqual([
      "extra-small",
      "small",
      "medium",
      "large",
      "extra-large",
    ]);
  });
  it("sizesRestricted", () => {
    expect(OptionsHelper.sizesRestricted).toEqual(["small", "medium", "large"]);
  });
  it("sizesBinary", () => {
    expect(OptionsHelper.sizesBinary).toEqual(["small", "large"]);
  });
  it("buttonTypes", () => {
    expect(OptionsHelper.buttonTypes).toEqual([
      "primary",
      "secondary",
      "tertiary",
      "dashed",
      "darkBackground",
    ]);
  });
  it("themesBinary", () => {
    expect(OptionsHelper.themesBinary).toEqual(["primary", "secondary"]);
  });
  it("themesFull", () => {
    expect(OptionsHelper.themesFull).toEqual([
      "primary",
      "secondary",
      "tertiary",
      "tile",
      "transparent",
    ]);
  });
  it("formButtonOptions", () => {
    expect(OptionsHelper.formButtonOptions).toEqual(["save", "cancel"]);
  });
  it("additionalActionAlignments", () => {
    expect(OptionsHelper.actionOptions).toEqual(["Button", "Link"]);
  });
  it("additionalActionAlignments", () => {
    expect(OptionsHelper.additionalActionAlignments).toEqual([
      "additionalActions",
      "leftAlignedActions",
      "rightAlignedActions",
    ]);
  });
});
