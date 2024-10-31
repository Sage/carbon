import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toolbar from "./toolbar.component";
import Button from "../../../button/button.component";
import I18nProvider from "../../../i18n-provider";

// mock Tooltip with a "bare-bones" implementation as using the real component causes tests to flake and timeout when
// doing user actions that trigger tooltips
jest.mock("../../../tooltip", () =>
  jest.fn(({ children, message, isVisible }) => (
    <>
      {children}
      {isVisible ? <div role="tooltip">{message}</div> : null}
    </>
  )),
);

test("when the `canFocus` prop is true, pressing the right arrow key cycles focus through all the buttons from left to right and then wraps back to the first", async () => {
  const user = userEvent.setup();
  render(
    <Toolbar
      canFocus
      activeControls={{
        BOLD: false,
        ITALIC: false,
        "unordered-list-item": false,
        "ordered-list-item": false,
      }}
      setInlineStyle={() => {}}
      setBlockStyle={() => {}}
    />,
  );
  screen.getByRole("button", { name: "bold" }).focus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "italic" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "bullet-list" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "number-list" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "bold" })).toHaveFocus();
});

test("when the `canFocus` prop is true, pressing the left arrow key wraps focus back to the last and cycles focus through all the buttons from right to left", async () => {
  const user = userEvent.setup();
  render(
    <Toolbar
      canFocus
      activeControls={{
        BOLD: false,
        ITALIC: false,
        "unordered-list-item": false,
        "ordered-list-item": false,
      }}
      setInlineStyle={() => {}}
      setBlockStyle={() => {}}
    />,
  );
  screen.getByRole("button", { name: "bold" }).focus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("button", { name: "number-list" })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("button", { name: "bullet-list" })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("button", { name: "italic" })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(screen.getByRole("button", { name: "bold" })).toHaveFocus();
});

test.each(["bold", "italic", "bullet-list", "number-list"])(
  "pressing the Tab key when the %s button is focused moves focus to the next focusable element after the toolbar",
  async (buttonName) => {
    const user = userEvent.setup();
    render(
      <>
        <Toolbar
          canFocus
          activeControls={{
            BOLD: false,
            ITALIC: false,
            "unordered-list-item": false,
            "ordered-list-item": false,
          }}
          setInlineStyle={() => {}}
          setBlockStyle={() => {}}
        />
        <button type="button">I will receive focus</button>
      </>,
    );
    screen.getByRole("button", { name: buttonName }).focus();

    await user.tab();
    expect(
      screen.getByRole("button", { name: "I will receive focus" }),
    ).toHaveFocus();
  },
);

test.each(["bold", "italic"])(
  "calls the `setInlineStyle` callback but not the `setBlockStyle` callback when the %s button is clicked",
  async (buttonName) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    await user.click(screen.getByRole("button", { name: buttonName }));

    expect(setInlineStyle).toHaveBeenCalledWith(
      expect.anything(),
      buttonName.toUpperCase(),
    );
    expect(setInlineStyle).toHaveBeenCalledTimes(1);
    expect(setBlockStyle).not.toHaveBeenCalled();
  },
);

test.each([
  ["bullet-list", "unordered-list-item"],
  ["number-list", "ordered-list-item"],
])(
  "calls the `setBlockStyle` callback but not the `setInlineStyle` callback when the %s button is clicked",
  async (buttonName, blockType) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    await user.click(screen.getByRole("button", { name: buttonName }));

    expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), blockType);
    expect(setBlockStyle).toHaveBeenCalledTimes(1);
    expect(setInlineStyle).not.toHaveBeenCalled();
  },
);

test.each(["bold", "italic"])(
  "calls the `setInlineStyle` callback but not the `setBlockStyle` callback when Enter is pressed with the %s button focused",
  async (buttonName) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();
    await user.keyboard("{Enter}");

    expect(setInlineStyle).toHaveBeenCalledWith(
      expect.anything(),
      buttonName.toUpperCase(),
    );
    expect(setInlineStyle).toHaveBeenCalledTimes(1);
    expect(setBlockStyle).not.toHaveBeenCalled();
  },
);

test.each([
  ["bullet-list", "unordered-list-item"],
  ["number-list", "ordered-list-item"],
])(
  "calls the `setBlockStyle` callback but not the `setInlineStyle` callback when Enter is pressed with the %s button focused",
  async (buttonName, blockType) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();
    await user.keyboard("{Enter}");

    expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), blockType);
    expect(setBlockStyle).toHaveBeenCalledTimes(1);
    expect(setInlineStyle).not.toHaveBeenCalled();
  },
);

test.each(["bold", "italic"])(
  "calls the `setInlineStyle` callback but not the `setBlockStyle` callback when Space is pressed with the %s button focused",
  async (buttonName) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();
    await user.keyboard(" ");

    expect(setInlineStyle).toHaveBeenCalledWith(
      expect.anything(),
      buttonName.toUpperCase(),
    );
    expect(setInlineStyle).toHaveBeenCalledTimes(1);
    expect(setBlockStyle).not.toHaveBeenCalled();
  },
);

test.each([
  ["bullet-list", "unordered-list-item"],
  ["number-list", "ordered-list-item"],
])(
  "calls the `setBlockStyle` callback but not the `setInlineStyle` callback when Space is pressed with the %s button focused",
  async (buttonName, blockType) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();
    await user.keyboard(" ");

    expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), blockType);
    expect(setBlockStyle).toHaveBeenCalledTimes(1);
    expect(setInlineStyle).not.toHaveBeenCalled();
  },
);

test.each(["bold", "italic", "bullet-list", "number-list"])(
  "calls neither `setInlineStyle` nor `setBlockStyle` callback when a key other than Space or Enter is pressed with the %s button focused",
  async (buttonName) => {
    const user = userEvent.setup();
    const setInlineStyle = jest.fn();
    const setBlockStyle = jest.fn();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={setInlineStyle}
        setBlockStyle={setBlockStyle}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();
    await user.keyboard("d");

    expect(setInlineStyle).not.toHaveBeenCalled();
    expect(setBlockStyle).not.toHaveBeenCalled();
  },
);

test.each([
  ["bold", "Bold"],
  ["italic", "Italic"],
  ["bullet-list", "Bulleted List"],
  ["number-list", "Numbered List"],
])(
  "when the %s button is hovered over, a tooltip is displayed which is removed on mouse leave",
  async (buttonName, tooltipText) => {
    const user = userEvent.setup();
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={() => {}}
        setBlockStyle={() => {}}
      />,
    );

    await user.hover(screen.getByRole("button", { name: buttonName }));
    expect(
      await screen.findByRole("tooltip", { name: tooltipText }),
    ).toBeVisible();

    await user.unhover(screen.getByRole("button", { name: buttonName }));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  },
);

test.each([
  ["bold", "Bold"],
  ["italic", "Italic"],
  ["bullet-list", "Bulleted List"],
  ["number-list", "Numbered List"],
])(
  "when the %s button is focused a tooltip is displayed which is removed on blur",
  async (buttonName, tooltipText) => {
    render(
      <Toolbar
        canFocus
        activeControls={{
          BOLD: false,
          ITALIC: false,
          "unordered-list-item": false,
          "ordered-list-item": false,
        }}
        setInlineStyle={() => {}}
        setBlockStyle={() => {}}
      />,
    );

    screen.getByRole("button", { name: buttonName }).focus();

    expect(
      await screen.findByRole("tooltip", { name: tooltipText }),
    ).toBeVisible();

    screen.getByRole("button", { name: buttonName }).blur();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  },
);

test("additional elements passed via the `toolbarElements` prop are rendered", () => {
  render(
    <Toolbar
      canFocus
      activeControls={{
        BOLD: false,
        ITALIC: false,
        "unordered-list-item": false,
        "ordered-list-item": false,
      }}
      setInlineStyle={() => {}}
      setBlockStyle={() => {}}
      toolbarElements={[
        <Button key="additional">Additional button</Button>,
        <Button key="another">Yet another button</Button>,
      ]}
    />,
  );

  expect(
    screen.getByRole("button", { name: "Additional button" }),
  ).toBeVisible();
  expect(
    screen.getByRole("button", { name: "Yet another button" }),
  ).toBeVisible();
});

test.each(["bold", "italic", "bulletList", "numberList"] as const)(
  "overrides the tooltip message text and aria label for the %s button based on the `locale` object passed in",
  async (localeProperty) => {
    const user = userEvent.setup();
    const locale = {
      locale: () => "mock-Locale",
      textEditor: {
        tooltipMessages: {
          bold: () => "Foo Bold",
          italic: () => "Foo Italic",
          bulletList: () => "Foo Bulleted List",
          numberList: () => "Foo Numbered List",
        },
        ariaLabels: {
          bold: () => "foo-bold",
          italic: () => "foo-italic",
          bulletList: () => "foo-bullet-list",
          numberList: () => "foo-number-list",
        },
      },
    };
    render(
      <I18nProvider locale={locale}>
        <Toolbar
          canFocus
          activeControls={{
            BOLD: false,
            ITALIC: false,
            "unordered-list-item": false,
            "ordered-list-item": false,
          }}
          setInlineStyle={() => {}}
          setBlockStyle={() => {}}
        />
      </I18nProvider>,
    );

    const buttonName = locale.textEditor.ariaLabels[localeProperty]();
    const tooltipText = locale.textEditor.tooltipMessages[localeProperty]();
    await user.hover(screen.getByRole("button", { name: buttonName }));

    expect(
      await screen.findByRole("tooltip", { name: tooltipText }),
    ).toBeVisible();
  },
);
