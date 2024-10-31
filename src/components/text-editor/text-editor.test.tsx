import React, { useState } from "react";
import { EditorState } from "draft-js";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";
import TextEditor, {
  TextEditorContentState,
  TextEditorProps,
  TextEditorState,
} from "./text-editor.component";
import * as utils from "./__internal__/utils";
import EditorLinkPreview from "../link-preview";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";
import CarbonProvider from "../carbon-provider";

jest.mock("../../__internal__/utils/helpers/browser-type-check");
let windowScrollTo: typeof window.scrollTo;
// we need this mock import in order to be able to mock the getContentInfo util later without error
jest.mock("./__internal__/utils", () => ({
  __esModule: true,
  ...jest.requireActual("./__internal__/utils"),
}));
// mock Tooltip with a "bare-bones" implementation as using the real component causes tests to flake and timeout when
// doing user actions that trigger tooltips
jest.mock("../tooltip", () =>
  jest.fn(({ children, message, isVisible }) => (
    <>
      {children}
      {isVisible ? <div role="tooltip">{message}</div> : null}
    </>
  )),
);

beforeAll(() => {
  windowScrollTo = window.scrollTo;
  window.scrollTo = jest.fn();
  // need to mock isSafari to return false in order to meet coverage
  (isSafari as jest.MockedFunction<typeof isSafari>).mockImplementation(
    () => false,
  );
});

afterAll(() => {
  window.scrollTo = windowScrollTo;
  (isSafari as jest.MockedFunction<typeof isSafari>).mockRestore();
});

const ControlledTextEditor = (props: Partial<TextEditorProps>) => {
  // due to issues with the interaction of draftJS and jsdom, things don't work properly when starting with an empty editor.
  // We therefore start with some text (just a single space) in, and add to this in the tests.
  const [value, setValue] = useState(() =>
    EditorState.createWithContent(TextEditorContentState.createFromText(" ")),
  );
  return (
    <TextEditor
      value={value}
      onChange={(val) => {
        setValue(val);
      }}
      labelText="Text Editor Label"
      {...props}
    />
  );
};

/*
Unfortunately draftjs (on which TextEditor is based) does not interact well with jsdom, so testing many behavioural features in RTL tests is not possible.
(See https://github.com/testing-library/user-event/issues/858 for one of these - and note that the workaround suggested with textInput does not appear to work.
Nor is this the only issue.)
As a result, most tests for TextEditor are now written in Playwright. If we ever move away from draftjs we should revisit this and see if any of them can be
moved back to unit tests.
*/

testStyledSystemMarginRTL(
  (props) => (
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      {...props}
    />
  ),
  () => screen.getByTestId("text-editor-wrapper"),
);

test("pressing Tab with the text editor focused moves focus to the first Toolbar button", async () => {
  const user = userEvent.setup();
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
    />,
  );

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();
  await user.tab();

  expect(screen.getByRole("button", { name: "bold" })).toHaveFocus();
});

test("clicking the label sets focus on the text editor", async () => {
  const user = userEvent.setup();
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
    />,
  );

  await user.click(screen.getByText("Text Editor Label"));

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveFocus();
});

test("pressing shift+Tab with the text editor focused does not move focus to the toolbar", async () => {
  const user = userEvent.setup();
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
    />,
  );

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();
  await user.tab({ shift: true });

  expect(document.body).toHaveFocus();
});

test.each([
  "http://foo.com",
  "https://bar.co.uk/",
  "www.wiz.org",
  "https://user:pwd@foo.com",
  "https://foo.com:3000",
  "https://foo.com/path/file-name.suffix",
  "https://foo.com",
  "https://foo.com/file.suffix?query=value&query2=value2",
  "https://foo.com/file.suffix#hash",
  "https://user:pwd@foo.com:3000/path/file-name.suffix?query-string#hash",
])("renders `%s` with HTML link style when it is part of the text", (url) => {
  render(
    <TextEditor
      value={TextEditorState.createWithContent(
        TextEditorContentState.createFromText(
          `this is a link with text before - ${url} - and after`,
        ),
      )}
      labelText="Text Editor Label"
      onChange={() => {}}
    />,
  );

  const link = screen.getByTestId("link-anchor"); // can't use getByRole("link") as the `a` tag has no href
  expect(link).toBeVisible();
  expect(link).toHaveTextContent(url);
  expect(link).toHaveStyle({ "text-decoration": "underline" });
});

test.each([
  "foo://foo.com",
  "https://bar.",
  "wwww..s",
  "http://f..o",
  ".ca",
  "_",
  ":1rrr",
  "https://user@foo.com",
])("renders `%s` without HTML link style", (invalidUrl) => {
  const fullText = `this is not actually a link with text before - ${invalidUrl} - and after`;
  render(
    <TextEditor
      value={TextEditorState.createWithContent(
        TextEditorContentState.createFromText(fullText),
      )}
      labelText="Text Editor Label"
      onChange={() => {}}
    />,
  );

  expect(screen.queryByTestId("link-anchor")).not.toBeInTheDocument();
  expect(screen.queryByText(invalidUrl)).not.toBeInTheDocument();
  expect(screen.getByText(fullText)).not.toHaveStyle({
    "text-decoration": "underline",
  });
});

test.each([
  "http://foo.com",
  "https://bar.co.uk/",
  "www.wiz.org",
  "https://user:pwd@foo.com",
  "https://foo.com:3000",
  "https://foo.com/path/file-name.suffix",
  "https://foo.com",
  "https://foo.com/file.suffix?query=value&query2=value2",
  "https://foo.com/file.suffix#hash",
  "https://user:pwd@foo.com:3000/path/file-name.suffix?query-string#hash",
])(
  "renders `%s` with HTML link style when it is dynamically added to the editor",
  async (url) => {
    const user = userEvent.setup();
    render(<ControlledTextEditor />);

    await user.type(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
      `this is a link with text before - ${url} - and after`,
    );

    const link = screen.getByTestId("link-anchor"); // can't use getByRole("link") as the `a` tag has no href
    expect(link).toBeVisible();
    expect(link).toHaveTextContent(url);
    expect(link).toHaveStyle({ "text-decoration": "underline" });
  },
);

test.each([
  "foo://foo.com",
  "https://bar.",
  "wwww..s",
  "http://f..o",
  ".ca",
  "_",
  ":1rrr",
  "https://user@foo.com",
])(
  "renders `%s` without HTML link style when it is dynamically added to the editor",
  async (invalidUrl) => {
    const user = userEvent.setup();
    render(<ControlledTextEditor />);

    const fullText = `this is not actually a link with text before - ${invalidUrl} - and after`;
    await user.type(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
      fullText,
    );

    expect(screen.queryByTestId("link-anchor")).not.toBeInTheDocument();
    expect(screen.queryByText(invalidUrl)).not.toBeInTheDocument();
    expect(screen.getByText(fullText)).not.toHaveStyle({
      "text-decoration": "underline",
    });
  },
);

test("renders the elements passed in the `previews` prop", () => {
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      previews={[
        <div>I am a link preview</div>,
        <button type="button">I am a second link preview</button>,
      ]}
    />,
  );

  expect(screen.getByText("I am a link preview")).toBeVisible();
  expect(
    screen.getByRole("button", { name: "I am a second link preview" }),
  ).toBeVisible();
});

test("does not render previews that are a simple number or string", () => {
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      previews={[123, "foo", 456]}
    />,
  );

  expect(screen.queryByText("123")).not.toBeInTheDocument();
  expect(screen.queryByText("foo")).not.toBeInTheDocument();
  expect(screen.queryByText("456")).not.toBeInTheDocument();
});

test.each([
  ["http://foo.com", "http://foo.com"],
  ["https://bar.co.uk/", "https://bar.co.uk/"],
  ["www.wiz.org", "https://www.wiz.org"],
  ["https://user:pwd@foo.com", "https://user:pwd@foo.com"],
  ["https://foo.com:3000", "https://foo.com:3000"],
  [
    "https://foo.com/path/file-name.suffix",
    "https://foo.com/path/file-name.suffix",
  ],
  ["https://foo.com", "https://foo.com"],
  [
    "https://foo.com/file.suffix?query=value&query2=value2",
    "https://foo.com/file.suffix?query=value&query2=value2",
  ],
  ["https://foo.com/file.suffix#hash", "https://foo.com/file.suffix#hash"],
  [
    "https://user:pwd@foo.com:3000/path/file-name.suffix?query-string#hash",
    "https://user:pwd@foo.com:3000/path/file-name.suffix?query-string#hash",
  ],
])(
  "calls the `onLinkAdded` callback when `%s` is dynamically added to the editor",
  async (enteredUrl, builtUrl) => {
    const user = userEvent.setup();
    const onLinkAdded = jest.fn();
    render(<ControlledTextEditor onLinkAdded={onLinkAdded} />);

    await user.type(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
      `this is a link with text before - ${enteredUrl} - and after`,
    );

    expect(onLinkAdded).toHaveBeenCalledWith(builtUrl);
  },
);

test.each([
  "foo://foo.com",
  "https://bar.",
  "wwww..s",
  "http://f..o",
  ".ca",
  "_",
  ":1rrr",
  "https://user@foo.com",
])(
  "does not call the `onLinkAdded` callback when `%s` is dynamically added to the editor",
  async (invalidUrl) => {
    const user = userEvent.setup();
    const onLinkAdded = jest.fn();
    render(<ControlledTextEditor onLinkAdded={onLinkAdded} />);

    const fullText = `this is not actually a link with text before - ${invalidUrl} - and after`;
    await user.type(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
      fullText,
    );

    expect(onLinkAdded).not.toHaveBeenCalled();
  },
);

test("calls the `onClose` callback of a `LinkPreview` component if clicked", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      previews={[
        <EditorLinkPreview onClose={onClose} url="foo" key="1" />,
        <EditorLinkPreview key="2" />,
        <EditorLinkPreview key="3" />,
      ]}
    />,
  );

  await user.click(
    screen.getByRole("button", { name: "link preview close button" }),
  );
  expect(onClose).toHaveBeenCalledWith("foo");
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("renders as required when the `required` prop is set", () => {
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      required
    />,
  );

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toBeRequired();
});

test.each(["error", "warning"])(
  "has the validation message together with character limit as accessible description when there is %s validation and component is rendered with new-style validation",
  (validationType) => {
    render(
      <CarbonProvider validationRedesignOptIn>
        <TextEditor
          value={TextEditorState.createEmpty()}
          labelText="Text Editor Label"
          onChange={() => {}}
          characterLimit={10}
          {...{ [validationType]: "Validation message" }}
        />
      </CarbonProvider>,
    );

    expect(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
    ).toHaveAccessibleDescription(
      "Validation message You can enter up to 10 characters",
    );
  },
);

test("has the `inputHint` prop together with character limit as accessible description", () => {
  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      characterLimit={10}
      inputHint="here is a hint"
    />,
  );

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveAccessibleDescription(
    "here is a hint You can enter up to 10 characters",
  );
});

test("fires a console warning when the `rows` prop is passed as a number less than 2", () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  // mock displayName for this test
  const oldDisplayName = TextEditor.displayName;
  TextEditor.displayName = "EditorWithRowsError";

  render(
    <TextEditor
      value={TextEditorState.createEmpty()}
      labelText="Text Editor Label"
      onChange={() => {}}
      rows={1}
    />,
  );
  expect(consoleSpy).toHaveBeenCalledWith(
    "Prop rows must be a number value that is 2 or greater to override the min-height of the `EditorWithRowsError`",
  );
  expect(consoleSpy).toHaveBeenCalledTimes(1);
  // clean up mocks
  consoleSpy.mockRestore();
  TextEditor.displayName = oldDisplayName;
});

// for coverage only - this behaviour doesn't work properly in jsdom (note incorrect order of text being entered - the style
// is also absent so we don't assert it). This behaviour is tested properly in Playwright
test("can enter text after clicking the `bold` toolbar button", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "bold" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "bold text",
  );
  expect(screen.getByText("old textb")).toBeVisible();
});

// for coverage only - this behaviour doesn't work properly in jsdom (note incorrect order of text being entered - the style
// is also absent so we don't assert it). This behaviour is tested properly in Playwright
test("can enter text after clicking the `italic` toolbar button", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "italic" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "italic text",
  );
  expect(screen.getByText("talic texti")).toBeVisible();
});

// for coverage only - this behaviour doesn't work properly in jsdom (note incorrect order of text being entered).
// This behaviour is tested properly in Playwright
test("can enter text after clicking the `bullet-list` toolbar button", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "list item",
  );
  expect(screen.getByRole("listitem")).toHaveTextContent("ist iteml");
});

// for coverage only - this behaviour doesn't work properly in jsdom (note incorrect order of text being entered).
// This behaviour is tested properly in Playwright
test("can enter text after clicking the `number-list` toolbar button", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "number-list" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "list item",
  );
  expect(screen.getByRole("listitem")).toHaveTextContent("ist iteml");
});

// coverage only - both old and new validation styles are captured by Chromatic
test.each(["error", "warning", "info"])(
  "renders the %s icon when the validationRedesignOptIn flag is not set",
  (validationType) => {
    render(
      <TextEditor
        value={TextEditorState.createEmpty()}
        labelText="Text Editor Label"
        onChange={() => {}}
        {...{ [validationType]: "Validation message" }}
      />,
    );

    expect(screen.getByTestId(`icon-${validationType}`)).toBeVisible();
  },
);

// coverage only - focus styles, both with and without the optout flag, are tested in Playwright
test("has correct styles when focused and `focusRedesignOptOut` is true", () => {
  render(
    <CarbonProvider focusRedesignOptOut>
      <TextEditor
        value={TextEditorState.createEmpty()}
        labelText="Text Editor Label"
        onChange={() => {}}
      />
    </CarbonProvider>,
  );

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();

  expect(screen.getByTestId("editor-outline")).toHaveStyleRule(
    "outline",
    "3px solid var(--colorsSemanticFocus500)",
  );
  expect(screen.getByTestId("editor-outline")).toHaveStyle({
    "outline-offset": "1px",
  });
});

// coverage only - focus styles with error are tested in Playwright
test("has correct styles when focused and `focusRedesignOptOut` is true when there is an error", () => {
  render(
    <CarbonProvider focusRedesignOptOut>
      <TextEditor
        value={TextEditorState.createEmpty()}
        labelText="Text Editor Label"
        onChange={() => {}}
        error="error"
      />
    </CarbonProvider>,
  );

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();

  expect(screen.getByTestId("editor-outline")).toHaveStyleRule(
    "outline",
    "3px solid var(--colorsSemanticFocus500)",
  );
  expect(screen.getByTestId("editor-outline")).toHaveStyle({
    "outline-offset": "2px",
  });
});

// for coverage only - this behaviour doesn't work properly in jsdom (note incorrect order of text being entered - the style
// is also absent so we don't assert it). This behaviour is tested properly in Playwright
test("can enter text after using the keyboard shortcut for bold styling", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();
  await user.keyboard("{Control>}b{/Control}");
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "bold text",
  );

  expect(screen.getByText("old textb")).toBeVisible();
});

// the next several tests are for coverage only - due to an issue with React itself, dispatching the (deprecated) `keypress` event
// with non-standard properties is the only way to trigger the `handleBeforeInput` handler in a test. See
// https://github.com/testing-library/user-event/issues/858#issuecomment-1124820366
// (The functionality of this function is fully tested in Playwright tests).

// coverage (handleBeforeInput - double-space feature)
test("double-space is entered when triggering handleBeforeInput", async () => {
  render(<ControlledTextEditor />);

  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 65, // a
    },
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 32, // space
    },
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 32, // space
    },
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 66, // b
    },
  );
  // note: waitFor is to avoid "state update on unmounted component" warning, as fireEvent is not async
  await waitFor(() => {
    // not sure why the text content is not as expected, but this is only for coverage anyway, Playwright tests prove everything works
    // as expected
    expect(
      screen.getByRole("textbox", { name: "Text Editor Label" }),
    ).toHaveTextContent("A");
  });
});

// coverage (handleBeforeInput - case when over characterLimit)
test("text over the characterLimit is lost when triggering handleBeforeInput", async () => {
  render(<ControlledTextEditor characterLimit={2} />);

  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 65, // a
    },
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 65, // a
    },
  );

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveTextContent("A");
});

// coverage (handleBeforeInput when triggering block styles - tested in Playwright)
test("`1.` keyboard shortcut triggers a list block", () => {
  render(<ControlledTextEditor />);

  // can't seem to trigger the right conditions at all in a jsdom environment, so we resort to mocking the
  // output of the getContentInfo util
  const spy = jest.spyOn(utils, "getContentInfo").mockImplementation(
    () =>
      ({
        blockType: "unstyled",
        blockLength: 1,
        blockText: "1",
      }) as ReturnType<typeof utils.getContentInfo>,
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 46, // .
    },
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  spy.mockRestore();
});

// coverage (handleBeforeInput when typing a "block" shortcut when already in one))
test("typing `1.` when already in a list block does nothing", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);
  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByRole("listitem")).toHaveTextContent("");

  // can't seem to trigger the right conditions at all in a jsdom environment, so we resort to mocking the
  // output of the getContentInfo util
  const spy = jest.spyOn(utils, "getContentInfo").mockImplementation(
    () =>
      ({
        blockType: "unstyled",
        blockLength: 1,
        blockText: "1",
      }) as ReturnType<typeof utils.getContentInfo>,
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 46, // .
    },
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByRole("listitem")).toHaveTextContent(".");
  spy.mockRestore();
});

// coverage (extreme edge cases for handleBeforeInput with `.` character at start of a line)
test("typing a `.` at the start of a line does nothing", async () => {
  render(<ControlledTextEditor />);

  const spy = jest.spyOn(utils, "getContentInfo").mockImplementation(
    () =>
      ({
        blockType: "unstyled",
        blockLength: 0,
        blockText: "",
      }) as ReturnType<typeof utils.getContentInfo>,
  );
  fireEvent.keyPress(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      cancelable: true,
      bubbles: true,
      composed: false,
      which: 46, // .
    },
  );

  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  spy.mockRestore();
});

// for coverage only - pasting text is covered in Playwright tests
test("can paste text if it does not exceed the character limit", () => {
  render(<ControlledTextEditor characterLimit={10} />);
  // we have to manually fire the "paste" event here, with data made to fit the mock that draftjs uses internally
  // for DataTransfer
  fireEvent.paste(screen.getByRole("textbox", { name: "Text Editor Label" }), {
    clipboardData: {
      getData: () => "text",
      types: ["text/plain"],
    },
  });
  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveTextContent("text");
});

// for coverage only - pasting text is covered in Playwright tests
test("pasted text is truncated if it exceeds the character limit", () => {
  render(<ControlledTextEditor characterLimit={10} />);
  // we have to manually fire the "paste" event here, with data made to fit the mock that draftjs uses internally
  // for DataTransfer
  fireEvent.paste(screen.getByRole("textbox", { name: "Text Editor Label" }), {
    clipboardData: {
      getData: () => "text is too long",
      types: ["text/plain"],
    },
  });
  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveTextContent("text is t");
});

// for coverage only (of onBlur)
test("content is not affected when the input is blurred", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "some text",
  );
  await user.tab();

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveTextContent("some text");
});

// coverage only
test("can enter text with both block and inline styles", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "bold" }));
  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "foo",
  );
  expect(screen.getByRole("listitem")).toHaveTextContent("oof");
});

// coverage only
test("allows inline style button to be clicked with text highlighted", async () => {
  const user = userEvent.setup();
  // the only way to get the component to recognise non-collapsed selection in jsdom apparently is to
  // force the selection in the mock component
  const ControlledTextEditorWithForcedSelection = (
    props: Partial<TextEditorProps>,
  ) => {
    const [value, setValue] = useState(() =>
      EditorState.createWithContent(TextEditorContentState.createFromText(" ")),
    );
    const onChange = (val: EditorState) => {
      setValue(val);
    };
    const selectAll = () => {
      const valueWithSelection = TextEditorState.forceSelection(
        value,
        value.getSelection().merge({ anchorOffset: 0, focusOffset: 4 }),
      );
      setValue(valueWithSelection);
    };
    return (
      <>
        <TextEditor
          value={value}
          onChange={onChange}
          labelText="Text Editor Label"
          {...props}
        />
        <button type="button" onClick={selectAll}>
          Select All
        </button>
      </>
    );
  };

  render(<ControlledTextEditorWithForcedSelection />);
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "some text",
  );
  await user.click(screen.getByRole("button", { name: "Select All" }));
  await user.click(screen.getByRole("button", { name: "bold" }));

  expect(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
  ).toHaveTextContent("some text");
});

// for coverage only - userEvent doesn't support the keycode property in keyboard events which lead to them
// being dispatched with keyCode of 0 (see https://github.com/testing-library/user-event/issues/842). This
// means that draftjs's handleKeyCommand is not called, as that relies on the keyCode property being as expected
// (see https://github.com/facebookarchive/draft-js/blob/main/src/component/handlers/edit/editOnKeyDown.js#L162
// and https://github.com/facebookarchive/draft-js/blob/main/src/component/utils/getDefaultKeyBinding.js#L64).
// To get around this, we use userEvent to manually fire keydown with the expected keyCode (66 for B)
test("can enter text after using the keyboard shortcut for bold styling when handleKeyCommand is called", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  screen.getByRole("textbox", { name: "Text Editor Label" }).focus();
  fireEvent.keyDown(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      key: "B",
      keyCode: 66,
      ctrlKey: true,
    },
  );
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "bold text",
  );

  expect(screen.getByText("old textb")).toBeVisible();
});

// for coverage only - see comment above for how to trigger handleKeyCommand
test("pressing Enter in a list block when at the character limit does not start a new list item", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor characterLimit={4} />);

  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "foo",
  );
  fireEvent.keyDown(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      key: "Enter",
      keyCode: 13,
    },
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});

// for coverage only (tested in Playwright) - see comment above for how to trigger handleKeyCommand
test("pressing backspace when at the start of a list item removes the item", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "{Backspace}",
  ); // to remove the starting space character
  fireEvent.keyDown(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      key: "Backspace",
      keyCode: 8,
    },
  );

  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

// for coverage only (tested in Playwright) - see comment above for how to trigger handleKeyCommand
test("pressing backspace when not at the start of a list item leaves the item in place", async () => {
  const user = userEvent.setup();
  render(<ControlledTextEditor />);

  await user.click(screen.getByRole("button", { name: "bullet-list" }));
  await user.type(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    "foo",
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  fireEvent.keyDown(
    screen.getByRole("textbox", { name: "Text Editor Label" }),
    {
      key: "Backspace",
      keyCode: 8,
    },
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});
