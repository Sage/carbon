import React, { useState } from "react";
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import DialogFullScreen from "./dialog-full-screen.component";
import StyledContent from "./content.style";
import StyledIconButton from "../icon-button/icon-button.style";
import { StyledHeader, StyledHeading } from "../heading/heading.style";
import Form from "../form";
import CarbonProvider from "../carbon-provider";

const ControlledDialog = ({
  onCancel,
  startOpen = true,
}: {
  onCancel: () => void;
  startOpen?: boolean;
}) => {
  const [open, setOpen] = useState(startOpen);
  return (
    <DialogFullScreen
      open={open}
      onCancel={() => {
        setOpen(false);
        onCancel();
      }}
    />
  );
};

test("dialog element has aria-modal attribute set to true when open", () => {
  render(
    <CarbonProvider>
      <DialogFullScreen open />
    </CarbonProvider>,
  );

  expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
});

test("open dialog element does not have aria-modal attribute set to true when role is not `dialog`", () => {
  render(
    <CarbonProvider>
      <DialogFullScreen open role="main" />
    </CarbonProvider>,
  );

  expect(screen.getByRole("main")).not.toHaveAttribute("aria-modal");
});

test("the contentRef prop is forwarded to the dialog content", () => {
  const mockRef = {
    current: null,
  };

  render(<DialogFullScreen open contentRef={mockRef} />);

  expect(mockRef?.current).toBe(
    screen.getByTestId("dialog-full-screen-content"),
  );
});

test("the dialog container should be focused when the dialog opens", async () => {
  render(
    <DialogFullScreen open>
      <input type="text" placeholder="input" />
    </DialogFullScreen>,
  );

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveFocus();
  });
});

test("the dialog container should not be focused when the dialog opens if the disableAutofocus prop is set", () => {
  jest.useFakeTimers();
  render(
    <DialogFullScreen open disableAutoFocus>
      <input type="text" placeholder="input" />
    </DialogFullScreen>,
  );

  act(() => {
    // need to use fake timers here rather than waitFor to ensure that the test fails if the disableAutoFocus functionality
    // gets broken - using waitFor would always pass as the dialog is always initially unfocused. To be sure focus doesn't
    // happen we need to let all timers run.
    jest.runAllTimers();
  });

  expect(screen.getByRole("dialog")).not.toHaveFocus();

  jest.useRealTimers();
});

test("when the focusFirstElement prop is passed, the corresponding element should be focused when the dialog opens", async () => {
  const inputRef = { current: null };
  render(
    <DialogFullScreen focusFirstElement={inputRef} open>
      <label htmlFor="should-not-be-focused">
        should not be focused
        <input type="text" id="should-not-be-focused" />
      </label>
      <label htmlFor="should-be-focused">
        should be focused
        <input type="text" ref={inputRef} id="should-be-focused" />
      </label>
    </DialogFullScreen>,
  );

  await waitFor(() => {
    expect(screen.getByLabelText("should be focused")).toHaveFocus();
  });
});

test("all dialog children are rendered", () => {
  render(
    <DialogFullScreen open>
      <button type="button" data-role="first-child">
        first child
      </button>
      <div data-role="second-child">second child</div>
      <p data-role="third-child">third child</p>
    </DialogFullScreen>,
  );

  expect(screen.getByTestId("first-child")).toBeVisible();
  expect(screen.getByTestId("second-child")).toBeVisible();
  expect(screen.getByTestId("third-child")).toBeVisible();
});

test("background scroll is disabled while the dialog is open", () => {
  render(<DialogFullScreen open />);

  expect(document.body).toHaveStyle({ overflow: "hidden" });
});

test("background scroll is restored when the dialog is closed", () => {
  const { rerender } = render(<DialogFullScreen open />);
  rerender(<DialogFullScreen open={false} />);

  expect(document.body).not.toHaveStyle({ overflow: "hidden" });
});

test("background scroll is restored when the dialog is unmounted", () => {
  const { unmount } = render(<DialogFullScreen open />);
  unmount();

  expect(document.body).not.toHaveStyle({ overflow: "hidden" });
});

test("renders the `title` prop in a level 1 heading when passed as a string", () => {
  render(<DialogFullScreen open title="my title" />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "my title",
  );
});

test("renders the specified element when the `title` prop is passed as a  React Element", () => {
  render(
    <DialogFullScreen
      open
      title={<div data-role="custom-title-element">my title</div>}
    />,
  );

  expect(screen.getByTestId("custom-title-element")).toHaveTextContent(
    "my title",
  );
});

test("renders a help icon next to the title when the `help` prop is provided", () => {
  render(<DialogFullScreen title="my title" open help="help text" />);

  expect(screen.getByRole("button", { name: "help" })).toBeVisible();
});

test("accepts `data-element` and `data-role` props to be passed to the underlying element", () => {
  render(<DialogFullScreen open data-role="baz" data-element="bar" />);

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("no close button is rendered if the `showCloseIcon` prop is set to `false`", () => {
  render(<DialogFullScreen open onCancel={() => {}} showCloseIcon={false} />);

  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

test("no close button is rendered if the `onCancel` callback prop is not provided", () => {
  render(<DialogFullScreen open showCloseIcon />);

  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

test("renders the close button when both `onCancel` and `showCloseIcon` are provided", () => {
  render(<DialogFullScreen open onCancel={() => {}} />);

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

test("allows custom data props to be passed to the close button", () => {
  render(
    <DialogFullScreen
      open
      onCancel={() => {}}
      closeButtonDataProps={{
        "data-element": "foo",
        "data-role": "bar",
      }}
    />,
  );

  const closeButton = screen.getByRole("button", { name: "Close" });
  expect(closeButton).toHaveAttribute("data-element", "foo");
  expect(closeButton).toHaveAttribute("data-role", "bar");
});

test("renders the element given in the `headerChildren` prop", () => {
  render(
    <DialogFullScreen
      open
      headerChildren={<a href="/foo">link as header child</a>}
    />,
  );
  expect(
    screen.getByRole("link", { name: "link as header child" }),
  ).toBeVisible();
});

// test here for coverage only - disableContentPadding prop already tested in both Playwright and Chromatic
test("padding is removed from the content when the `disableContentPadding` prop is passed", () => {
  render(
    <DialogFullScreen open disableContentPadding>
      <div>test content</div>
    </DialogFullScreen>,
  );

  const content = screen.getByTestId("dialog-full-screen-content");
  expect(content).toHaveStyle({
    padding: "0px 0px 0px 0px",
  });
});

/** Remove this when after Pages is re-written */
// TODO: in for coverage only. Prop appears not to be used - to be removed (FE-6774)
test("applies the appropriate styles when the `pagesStyling` prop is set", () => {
  render(<DialogFullScreen open pagesStyling />);

  const dialog = screen.getByRole("dialog");

  expect(dialog).toHaveStyleRule("padding", "0", {
    modifier: `${StyledContent}`,
  });

  expect(dialog).toHaveStyleRule("margin", "0", {
    modifier: `${StyledIconButton}`,
  });
  expect(dialog).toHaveStyleRule("position", "absolute", {
    modifier: `${StyledIconButton}`,
  });
  expect(dialog).toHaveStyleRule("right", "33px", {
    modifier: `${StyledIconButton}`,
  });
  expect(dialog).toHaveStyleRule("top", "32px", {
    modifier: `${StyledIconButton}`,
  });
  expect(dialog).toHaveStyleRule("z-index", "1", {
    modifier: `${StyledIconButton}`,
  });

  expect(dialog).toHaveStyleRule("padding", "32px 32px 0", {
    modifier: `${StyledFullScreenHeading}`,
  });

  expect(dialog).toHaveStyleRule("width", "auto", {
    modifier: `${StyledHeading}`,
  });
  expect(dialog).toHaveStyleRule("padding-top", "4px", {
    modifier: `${StyledHeading}`,
  });

  expect(dialog).toHaveStyleRule("width", "100%", {
    modifier: `${StyledHeading} ${StyledHeader}`,
  });
  expect(dialog).toHaveStyleRule("box-sizing", "content-box", {
    modifier: `${StyledHeading} ${StyledHeader}`,
  });
  expect(dialog).toHaveStyleRule("margin", "0 0 0 3px", {
    modifier: `${StyledHeading} ${StyledHeader}`,
  });
});

/* TODO: (FE-6781) Update these tests to use toHaveStyle to avoid false positives:
- toHaveStyle({ "overflow-y": "auto" })
- toHaveStyle({ "overflow-y": "inherit" })
This requires upgrading jsdom, as :has() is not supported in jsdom before v23.2.0.
toHaveStyleRule is currently used, but it is less strict and passes even if styles are overridden. */
test("when a Form child does not have a sticky footer, overflow styling is set on the dialog content", () => {
  render(
    <DialogFullScreen open>
      <Form />
    </DialogFullScreen>,
  );

  expect(screen.getByTestId("dialog-full-screen-content")).toHaveStyleRule(
    "overflow-y",
    "auto",
  );
});

test("when the `title` prop is a string, this value is set as the dialog's accessible name", () => {
  render(<DialogFullScreen open title="Test" />);

  expect(screen.getByRole("dialog")).toHaveAccessibleName("Test");
});

test("when the `title` and `subtitle` props are provided, the subtitle is set as the dialog's accessible description", () => {
  render(<DialogFullScreen open title="Title" subtitle="Subtitle" />);

  expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Subtitle");
});

test("when the `title` prop is a React element and the `aria-labelledby` prop is provided, it is passed to the dialog container", () => {
  render(
    <>
      <h2 id="test-id">custom title</h2>
      <DialogFullScreen open title={<h2>test</h2>} aria-labelledby="test-id" />
    </>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("custom title");
});

test("when the `subtitle` prop is a React element and the `aria-describedby` prop is provided, it is passed to the dialog container", () => {
  render(
    <>
      <h2 id="test-id">custom description</h2>
      <DialogFullScreen
        open
        title="test"
        subtitle={<p>custom subtitle</p>}
        aria-describedby="test-id"
      />
    </>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "custom description",
  );
});

test("the role prop is passed to the dialog element", () => {
  render(
    <DialogFullScreen open role="alert">
      dialog content
    </DialogFullScreen>,
  );

  expect(screen.getByRole("alert")).toHaveTextContent("dialog content");
});

test("when the `title` prop is not passed and the `aria-label` prop is provided, it is passed to the dialog container as its accessible name", () => {
  render(<DialogFullScreen open aria-label="custom label" />);

  expect(screen.getByRole("dialog")).toHaveAccessibleName("custom label");
});

test("the onCancel callback should be called when the close button is clicked", async () => {
  const user = userEvent.setup();
  const onCancel = jest.fn();
  render(<ControlledDialog onCancel={onCancel} />);

  await user.click(screen.getByRole("button", { name: "Close" }));

  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("the onCancel callback should be called when the enter key is pressed", async () => {
  const user = userEvent.setup();
  const onCancel = jest.fn();
  render(<ControlledDialog onCancel={onCancel} />);

  act(() => {
    screen.getByRole("button", { name: "Close" }).focus();
  });
  await user.keyboard("{Enter}");

  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("the onCancel callback should not be called when a non-Enter key is pressed", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onCancel = jest.fn();
  render(<ControlledDialog onCancel={onCancel} />);

  act(() => {
    screen.getByRole("button", { name: "Close" }).focus();
  });
  await user.keyboard("a");

  act(() => {
    // need to use fake timers here rather than waitFor to ensure that the test fails if this feature ever
    // gets broken - using waitFor would always pass as the dialog is already visible (and onCancel not called)
    // at this point
    jest.runAllTimers();
  });
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(onCancel).not.toHaveBeenCalled();

  jest.useRealTimers();
});
