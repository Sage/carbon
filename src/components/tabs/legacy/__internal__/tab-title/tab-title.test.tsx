import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabTitle from "./tab-title.component";

test("renders the component as a tab with text passed as `title` prop", () => {
  render(
    <TabTitle title="example title" onClick={() => {}} onKeyDown={() => {}} />,
  );

  const tabTitle = screen.getByRole("tab");
  expect(tabTitle).toBeVisible();
  expect(tabTitle).toHaveTextContent("example title");
});

test("accepts `className` as a prop", () => {
  render(
    <TabTitle
      className="class1 class2"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  const tabTitle = screen.getByRole("tab");
  expect(tabTitle).toHaveClass("class1", "class2");
});

test("renders with the expected `data-element` attribute", () => {
  render(<TabTitle onClick={() => {}} onKeyDown={() => {}} />);

  expect(screen.getByRole("tab")).toHaveAttribute("data-element", "select-tab");
});

test("renders with `data-tabid` attribute set to `dataTabId` prop", () => {
  render(
    <TabTitle
      dataTabId="unique-tab-id"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByRole("tab")).toHaveAttribute(
    "data-tabid",
    "unique-tab-id",
  );
});

test("renders with `data-role` attribute set to the prop value", () => {
  render(
    <TabTitle
      data-role="custom-data-role"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByRole("tab")).toHaveAttribute(
    "data-role",
    "custom-data-role",
  );
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the `href` prop is provided, the specified URL should open in a new tab if the %s key is pressed with the tab title focused",
  async (_, key) => {
    const globalOpenMock = jest
      .spyOn(global, "open")
      .mockImplementation(() => null);
    const user = userEvent.setup();
    render(
      <TabTitle href="randomUrl" onClick={() => {}} onKeyDown={() => {}} />,
    );

    act(() => {
      screen.getByRole("tab").focus();
    });
    await user.keyboard(key);

    expect(globalOpenMock).toHaveBeenCalledWith("randomUrl", "_blank");
    globalOpenMock.mockRestore();
  },
);

test("when the `href` prop is provided, the specified URL should open in a new tab on click", async () => {
  const globalOpenMock = jest
    .spyOn(global, "open")
    .mockImplementation(() => null);
  const user = userEvent.setup();
  render(<TabTitle href="randomUrl" onClick={() => {}} onKeyDown={() => {}} />);

  await user.click(screen.getByRole("tab"));

  expect(globalOpenMock).toHaveBeenCalledWith("randomUrl", "_blank");
  globalOpenMock.mockRestore();
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the `href` prop is not provided, no new tab should be opened when %s is pressed",
  async (_, key) => {
    const globalOpenMock = jest
      .spyOn(global, "open")
      .mockImplementation(() => null);
    const user = userEvent.setup();
    render(<TabTitle onClick={() => {}} onKeyDown={() => {}} />);

    act(() => {
      screen.getByRole("tab").focus();
    });
    await user.keyboard(key);

    expect(globalOpenMock).not.toHaveBeenCalled();
    globalOpenMock.mockRestore();
  },
);

test("when the `isTabSelected` prop is set, the `aria-selected` attribute is set to `true`", () => {
  render(<TabTitle isTabSelected onClick={() => {}} onKeyDown={() => {}} />);

  expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true");
});

test("when the `isTabSelected` prop is not set, the `aria-selected` attribute is not set", () => {
  render(<TabTitle onClick={() => {}} onKeyDown={() => {}} />);

  expect(screen.getByRole("tab")).not.toHaveAttribute("aria-selected");
});

test("`siblings` are rendered after the title when `titlePosition` is `before`", () => {
  render(
    <TabTitle
      title="foo"
      siblings={<span data-role="sibling">bar</span>}
      titlePosition="before"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("sibling")).toBeVisible();
  expect(screen.getByTestId("sibling")).toHaveTextContent("bar");
  expect(screen.getByRole("tab")).toHaveTextContent("foobar");
});

test("`siblings` are rendered before the title when `titlePosition` is `after`", () => {
  render(
    <TabTitle
      title="foo"
      siblings={<span data-role="sibling">bar</span>}
      titlePosition="after"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("sibling")).toBeVisible();
  expect(screen.getByTestId("sibling")).toHaveTextContent("bar");
  expect(screen.getByRole("tab")).toHaveTextContent("barfoo");
});

test("`siblings` are rendered after the title when `titlePosition` is not passed", () => {
  render(
    <TabTitle
      title="foo"
      siblings={<span data-role="sibling">bar</span>}
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("sibling")).toBeVisible();
  expect(screen.getByTestId("sibling")).toHaveTextContent("bar");
  expect(screen.getByRole("tab")).toHaveTextContent("foobar");
});

test("calls the `onClick` prop when clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <TabTitle onClick={onClick} dataTabId="uniqueid1" onKeyDown={() => {}} />,
  );

  await user.click(screen.getByRole("tab"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test.each(["error", "warning", "info"])(
  "displays a tooltip on focus when %s validation is failed",
  async (validationType) => {
    render(
      <TabTitle
        position="left"
        onClick={() => {}}
        onKeyDown={() => {}}
        {...{
          [`${validationType}Message`]: "validation message",
          [validationType]: true,
        }}
      />,
    );

    act(() => {
      screen.getByRole("tab").focus();
    });

    expect(await screen.findByRole("tooltip")).toBeVisible();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "validation message",
    );
  },
);

test.each(["error", "warning", "info"])(
  "hides the tooltip on blur when %s validation is failed",
  async (validationType) => {
    const user = userEvent.setup();
    render(
      <TabTitle
        position="left"
        size="large"
        onClick={() => {}}
        onKeyDown={() => {}}
        {...{
          [`${validationType}Message`]: "validation message",
          [validationType]: true,
        }}
      />,
    );

    act(() => {
      screen.getByRole("tab").focus();
    });
    await user.tab();

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.queryByText("validation message")).not.toBeInTheDocument();
  },
);

test.each(["error", "warning", "info"])(
  "displays a tooltip on hover when %s validation is failed",
  async (validationType) => {
    const user = userEvent.setup();
    render(
      <TabTitle
        onClick={() => {}}
        onKeyDown={() => {}}
        {...{
          [`${validationType}Message`]: "validation message",
          [validationType]: true,
        }}
      />,
    );

    await user.hover(screen.getByRole("tab"));

    expect(await screen.findByRole("tooltip")).toBeVisible();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "validation message",
    );
  },
);

test.each(["error", "warning", "info"])(
  "hides the tooltip on mouse leave when %s validation is failed",
  async (validationType) => {
    const user = userEvent.setup();
    render(
      <TabTitle
        onClick={() => {}}
        onKeyDown={() => {}}
        {...{
          [`${validationType}Message`]: "validation message",
          [validationType]: true,
        }}
      />,
    );

    await user.hover(screen.getByRole("tab"));
    await user.unhover(screen.getByRole("tab"));

    expect(screen.queryByTestId("tooltip")).not.toBeInTheDocument();
    expect(screen.queryByText("validation message")).not.toBeInTheDocument();
  },
);

test.each(["error", "warning", "info"])(
  "does not hide the tooltip on blur when already hovered if %s validation is failed",
  async (validationType) => {
    const user = userEvent.setup();
    render(
      <TabTitle
        onClick={() => {}}
        onKeyDown={() => {}}
        {...{
          [`${validationType}Message`]: "validation message",
          [validationType]: true,
        }}
      />,
    );
    await user.hover(screen.getByRole("tab"));
    act(() => {
      screen.getByRole("tab").focus();
    });
    await user.tab();

    expect(await screen.findByRole("tooltip")).toBeVisible();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "validation message",
    );
  },
);

// coverage
test("renders the correct styles when a custom layout is used", () => {
  render(
    <TabTitle
      customLayout={<div data-role="my-custom-layout">foo</div>}
      position="left"
      info
      isTabSelected
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("my-custom-layout")).toBeVisible();
  expect(screen.getByTestId("my-custom-layout")).toHaveTextContent("foo");
});

// coverage
test("renders as expected when `position` prop is `left` and `align` prop is `right`", () => {
  render(
    <TabTitle
      position="left"
      align="right"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "justify-content": "flex-end",
  });
});

// coverage
test("renders as expected when `size` prop is `large` and `position` prop is `top`", () => {
  render(
    <TabTitle
      size="large"
      position="top"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    padding: "14px 24px",
    "font-size": "16px",
  });
});

// coverage
test("renders as expected when `size` prop is `large` and `position` prop is `left`", () => {
  render(
    <TabTitle
      size="large"
      position="left"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    padding: "14px 24px",
    "font-size": "16px",
  });
});

// coverage
test("does not apply selected styling when it has error or warning", () => {
  render(
    <TabTitle
      error
      isTabSelected
      size="large"
      borders
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(
    screen.queryByTestId("tab-selected-indicator"),
  ).not.toBeInTheDocument();
});

// coverage
test("applies proper styling when `position` prop is `left` and there is a warning message", () => {
  render(
    <TabTitle
      position="left"
      warning
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "border-right-color": "transparent",
    outline: "1px solid",
    "outline-offset": "-1px",
    "padding-right": "18px",
    zIndex: "2",
  });
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "outline-color",
    "var(--colorsSemanticCaution500)",
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-right-color",
    "transparent",
    {
      modifier: ":hover",
    },
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "outline",
    "1px solid",
    { modifier: ":hover" },
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "outline-offset",
    "-1px",
    { modifier: ":hover" },
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "outline-color",
    "var(--colorsSemanticCaution500)",
    {
      modifier: ":hover",
    },
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "padding-right",
    "18px",
    { modifier: ":hover" },
  );
});

// coverage
test("renders the correct styles when an error is present and a custom layout is used", () => {
  render(
    <TabTitle
      customLayout={<div>foo</div>}
      error
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "padding-bottom": "2px",
    "padding-right": "14px",
  });
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "padding-bottom",
    "2px",
    { modifier: ":hover" },
  );
});

// coverage
test("renders the correct styles when size is `large`, a warning is present and a custom layout is used", () => {
  render(
    <TabTitle
      customLayout={<div>foo</div>}
      size="large"
      warning
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "padding-bottom": "4px",
    "padding-right": "18px",
  });

  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "padding-bottom",
    "4px",
    { modifier: ":hover" },
  );
});

// coverage
test("renders the correct styles when size is `large`, position is `left`, a warning is present and a custom layout is used", () => {
  render(
    <TabTitle
      customLayout={<div>foo</div>}
      size="large"
      position="left"
      warning
      isTabSelected
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "padding-right": "26px",
  });
});

// coverage
test("the `noLeftBorder` prop removes the left border", () => {
  render(<TabTitle noLeftBorder onClick={() => {}} onKeyDown={() => {}} />);

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "border-left": "none",
  });
});

// coverage
test("applies proper styling when `borders` prop is true and `position` is `left`", () => {
  render(
    <TabTitle
      borders
      position="left"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-top",
    "1px solid var(--colorsActionMinor100)",
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-left",
    "1px solid var(--colorsActionMinor100)",
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-bottom",
    "1px solid var(--colorsActionMinor100)",
  );
});

// coverage
test("applies proper styling when `borders` prop is true and `size` is `large`", () => {
  render(
    <TabTitle
      borders
      position="left"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-top",
    "1px solid var(--colorsActionMinor100)",
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-left",
    "1px solid var(--colorsActionMinor100)",
  );
  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "border-bottom",
    "1px solid var(--colorsActionMinor100)",
  );
});

// coverage
test("overrides the border-right-color when `alternateStyling` prop is `true` and `position` prop is `left`", () => {
  render(
    <TabTitle
      alternateStyling
      position="left"
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByRole("tab")).toHaveStyleRule(
    "border-right-color",
    "var(--colorsActionMinor100)",
    { modifier: ":hover" },
  );
});

// coverage
test("sets border-left to `none` when the `noLeftBorder` prop is set", () => {
  render(
    <TabTitle borders noLeftBorder onClick={() => {}} onKeyDown={() => {}} />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "border-left": "none",
  });
});

// coverage
test("sets border-right to `none` when the `noRightBorder` prop is set", () => {
  render(
    <TabTitle borders noRightBorder onClick={() => {}} onKeyDown={() => {}} />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyle({
    "border-right": "none",
  });
});

// coverage
test("renders the correct styles when a custom layout is used, `size` is `default` `isTabSelected` is `true`", () => {
  render(
    <TabTitle
      customLayout={<div>foo</div>}
      isTabSelected
      onClick={() => {}}
      onKeyDown={() => {}}
    />,
  );

  expect(screen.getByTestId("tab-title-content")).toHaveStyleRule(
    "padding-bottom",
    "0px",
  );
});
