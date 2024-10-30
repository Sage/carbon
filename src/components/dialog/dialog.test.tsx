import React from "react";
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CarbonProvider from "../carbon-provider";
import Dialog, { DialogHandle, DialogProps } from ".";

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("dialog element has aria-modal attribute set to true when open", () => {
  render(
    <CarbonProvider>
      <Dialog open title="My dialog" />
    </CarbonProvider>
  );
  expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
});

test("title is displayed as a level 1 heading when title prop is passed", async () => {
  render(<Dialog open title="My dialog" />);

  const dialog = screen.getByRole("dialog", { name: /My dialog/i });
  const heading = within(dialog).getByRole("heading", {
    level: 1,
    name: /My Dialog/i,
  });

  expect(heading).toBeVisible();
});

test("subtitle is displayed when subtitle prop is passed", async () => {
  render(<Dialog open title="My dialog" subtitle="My subtitle" />);

  const dialog = screen.getByRole("dialog", { description: /My subtitle/i });

  expect(dialog).toHaveTextContent("My subtitle");
});

test("custom title is displayed when title prop is a React element", () => {
  render(<Dialog open title={<h1>Custom title</h1>} />);

  const heading = screen.getByRole("heading", {
    name: /Custom title/i,
    level: 1,
  });

  expect(heading).toBeVisible();
});

test("custom subtitle is displayed when subtitle prop is a React element", () => {
  render(<Dialog open title="My dialog" subtitle={<h2>My subtitle</h2>} />);

  const heading = screen.getByRole("heading", {
    name: /My subtitle/i,
    level: 2,
  });

  expect(heading).toBeVisible();
});

test("aria-label prop is used as dialog's accessible name, when passed and title isn't", () => {
  render(<Dialog open aria-label="foobar" />);
  expect(screen.getByRole("dialog")).toHaveAccessibleName("foobar");
});

test("aria-labelledby prop is used as dialog's accessible name when passed", () => {
  render(
    <Dialog
      open
      title={<h1 id="title-id">Custom title</h1>}
      aria-labelledby="title-id"
    />
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleName("Custom title");
});

test("aria-describedby prop is used as dialog's accessible description when passed", () => {
  render(
    <Dialog
      open
      title="My dialog"
      subtitle={<h2 id="subtitle-id">Custom subtitle</h2>}
      aria-describedby="subtitle-id"
    />
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "Custom subtitle"
  );
});

test("help icon is displayed when help prop is passed", () => {
  render(<Dialog open title="My dialog" help="Help text" />);

  const help = screen.getByLabelText("help");

  expect(help).toBeVisible();
});

test("close button is displayed when onCancel prop is passed", () => {
  render(<Dialog open title="My dialog" onCancel={() => {}} />);

  const closeButton = screen.getByRole("button", { name: /Close/i });

  expect(closeButton).toBeVisible();
});

test("close button is not rendered when showCloseIcon prop is false", () => {
  render(<Dialog open onCancel={() => {}} showCloseIcon={false} />);
  expect(
    screen.queryByRole("button", { name: /Close/i })
  ).not.toBeInTheDocument();
});

describe("closing behaviour", () => {
  const MockApp = ({ onCancel }: Pick<DialogProps, "onCancel">) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Dialog
        open={open}
        title="My dialog"
        onCancel={(ev) => {
          onCancel?.(ev);
          setOpen(false);
        }}
      />
    );
  };

  test("when close button is clicked, dialog closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>
    );

    const closeButton = screen.getByRole("button", { name: /Close/i });
    await user.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when Escape key is pressed, dialog closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>
    );

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and the Enter key is pressed, dialog closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>
    );

    const closeButton = screen.getByRole("button", { name: /Close/i });
    closeButton.focus();
    await user.keyboard("{Enter}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and the Space key is pressed, dialog closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>
    );

    const closeButton = screen.getByRole("button", { name: /Close/i });
    closeButton.focus();
    await user.keyboard("{ }");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and a non-Space/Enter key is pressed, dialog stays open and onCancel is not executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>
    );

    const closeButton = screen.getByRole("button", { name: /Close/i });
    closeButton.focus();
    await user.keyboard("{a}");

    expect(onCancel).not.toHaveBeenCalled();
  });
});

test("root container is refocused when the focus method of the component's ref handle is called", async () => {
  const MockApp = () => {
    const dialogHandle = React.useRef<DialogHandle>(null);
    return (
      <Dialog open title="My dialog" ref={dialogHandle}>
        <button type="button" onClick={() => dialogHandle.current?.focus()}>
          Refocus dialog
        </button>
      </Dialog>
    );
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <CarbonProvider>
      <MockApp />
    </CarbonProvider>
  );

  const button = screen.getByRole("button", { name: /Refocus dialog/i });
  button.focus();

  await user.click(button);

  expect(screen.getByRole("dialog")).toHaveFocus();
});

test("first focusable element is not focused when disableAutoFocus prop is passed", () => {
  render(
    <CarbonProvider>
      <Dialog open title="My dialog" disableAutoFocus>
        <button type="button">Focus me</button>
      </Dialog>
    </CarbonProvider>
  );

  const button = screen.getByRole("button", { name: /Focus me/i });
  expect(button).not.toHaveFocus();
});

test("height prop controls the dialog's height", () => {
  render(<Dialog open title="My dialog" height="500px" />);
  expect(screen.getByRole("dialog")).toHaveStyle({ height: "500px" });
});

test("maximum height of the dialog is 90% of the viewport height", () => {
  render(<Dialog open title="My dialog" />);
  expect(screen.getByRole("dialog")).toHaveStyle({
    maxHeight: "90vh",
  });
});

test("dialog element has correct data-* props", () => {
  render(<Dialog open title="My dialog" data-element="foo" data-role="bar" />);

  const dialog = screen.getByRole("dialog", { name: /My dialog/i });

  expect(dialog).toHaveAttribute("data-component", "dialog");
  expect(dialog).toHaveAttribute("data-element", "foo");
  expect(dialog).toHaveAttribute("data-role", "bar");
});

test("close button has correct data-* props, when the closeButtonDataProps prop is passed", () => {
  render(
    <Dialog
      open
      onCancel={() => {}}
      closeButtonDataProps={{
        "data-element": "foo",
        "data-role": "bar",
      }}
    />
  );

  const closeButton = screen.getByRole("button", { name: /Close/i });

  expect(closeButton).toHaveAttribute("data-element", "foo");
  expect(closeButton).toHaveAttribute("data-role", "bar");
});

test("renders with grey background when greyBackground prop is passed", () => {
  render(<Dialog open title="My dialog" greyBackground />);
  expect(screen.getByRole("dialog")).toHaveStyle({
    backgroundColor: "var(--colorsUtilityMajor025)",
  });
});

test("dialog is wrapped in a container, which has the correct class names set, when className prop is passed", () => {
  render(<Dialog open title="My dialog" className="special-dialog" />);

  const modalWrapper = screen.getByTestId("modal");
  const dialog = within(modalWrapper).getByRole("dialog", {
    name: /My dialog/i,
  });

  expect(dialog).toBeInTheDocument();
  expect(modalWrapper).toHaveClass("carbon-dialog special-dialog");
});

test("dialog is positioned correctly, when size prop is maximise", () => {
  render(<Dialog open title="My dialog" size="maximise" />);

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveStyle(`
    height: calc(100% - var(--spacing400));
    width: calc(100% - var(--spacing400));
  `);
});

test("prevents content from overflowing", () => {
  render(
    <Dialog open title="My dialog">
      Content
    </Dialog>
  );
  expect(screen.getByTestId("dialog-content")).toHaveStyle("overflow-y: auto");
});

test("no padding is rendered around dialog content, when zero padding is specified via contentPadding prop", () => {
  render(
    <Dialog open title="My dialog" contentPadding={{ p: 0 }}>
      Inner content
    </Dialog>
  );

  const content = screen.getByTestId("dialog-content");

  expect(content).toHaveStyle({ padding: "var(--spacing000)" });
});

test("background scroll remains disabled when returning to outer dialog after closing inner dialog", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const MockApp = () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Dialog open title="Outer dialog">
        <Dialog
          open={open}
          topModalOverride
          title="Inner dialog"
          onCancel={() => setOpen(false)}
        />
      </Dialog>
    );
  };

  render(
    <CarbonProvider>
      <MockApp />
    </CarbonProvider>
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleName("Inner dialog");

  await user.click(screen.getByRole("button", { name: /Close/i }));

  expect(screen.getByRole("dialog")).toHaveAccessibleName("Outer dialog");
  expect(document.body).toHaveStyle("overflow: hidden");
});
