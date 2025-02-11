import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toast, { ToastProps } from "./toast.component";
import ModalManager from "../modal/__internal__/modal-manager";
import Logger from "../../__internal__/utils/logger";

let loggerSpy: jest.SpyInstance;

beforeEach(() => {
  loggerSpy = jest.spyOn(Logger, "deprecate").mockImplementation(() => {});
});

afterEach(() => {
  loggerSpy.mockRestore();
});

const MockToast = ({
  open = false,
  onDismiss,
  addInternalOnDismiss = false,
  ...rest
}: Partial<ToastProps> & { addInternalOnDismiss?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const internalOnDismiss = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        id="button-default"
        key="button"
        onClick={handleToggle}
      >
        Show toast
      </button>
      <Toast
        data-role="toast"
        id="toast-default"
        variant="success"
        open={isOpen}
        onDismiss={addInternalOnDismiss ? internalOnDismiss : onDismiss}
        {...rest}
      >
        My message
      </Toast>
    </>
  );
};

test("should be added to modal manager when it mounts", () => {
  jest.spyOn(ModalManager, "addModal");
  render(<Toast onDismiss={() => {}}>foobar</Toast>);

  const toast = screen.getByTestId("toast-wrapper");

  expect(ModalManager.addModal).toHaveBeenCalledWith(toast, undefined, true);
});

test("should be removed from modal manager when it unmounts", () => {
  const removeModalSpy = jest.spyOn(ModalManager, "removeModal");
  removeModalSpy.mockClear();
  const { unmount } = render(<Toast onDismiss={() => {}}>foobar</Toast>);

  const toast = screen.getByTestId("toast-wrapper");
  unmount();

  expect(ModalManager.removeModal).toHaveBeenCalledWith(toast, true);
});

test("should not unmount the toast wrapper when the closed", () => {
  render(<MockToast open={false} />);

  expect(screen.getByTestId("toast-wrapper")).toBeInTheDocument();
});

describe("Event tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should not call `onDismiss` when 'Escape' key pressed and `open` prop is false", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    const button = screen.getByRole("button", { name: "Show toast" });
    await user.click(button);
    await user.keyboard("{Escape}");

    expect(onDismissMock).not.toHaveBeenCalled();
  });

  it("should call `onDismiss` when 'Escape' key pressed and `open` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.keyboard("{Escape}");

    expect(onDismissMock).toHaveBeenCalled();
  });

  it("should not call `onDismiss` when key other than 'Escape` is pressed and `open` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.keyboard("{a}");

    expect(onDismissMock).not.toHaveBeenCalled();
  });

  it("should call `onDismiss` when icon is clicked and `open` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onDismissMock).toHaveBeenCalled();
  });

  it("should call `onDismiss` when 'Enter' key is pressed with icon focused and `open` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.tab();
    await user.keyboard("{enter}");
    act(() => {
      jest.runAllTimers();
    });

    expect(onDismissMock).toHaveBeenCalled();
  });

  it("should call `onDismiss` when ' ' (Space) key is pressed with icon focused and `open` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.tab();
    await user.keyboard(" ");
    act(() => {
      jest.runAllTimers();
    });

    expect(onDismissMock).toHaveBeenCalled();
  });

  it("should not call `onDismiss` if close icon is focused and other key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onDismissMock = jest.fn();
    render(<MockToast open onDismiss={onDismissMock} />);

    await user.tab();
    await user.keyboard("{a}");

    expect(onDismissMock).not.toHaveBeenCalled();
  });

  it("should call the `onDismiss` callback if a value is passed to the `timeout` prop", () => {
    const onDismissMock = jest.fn();
    render(
      <Toast open timeout={2000} onDismiss={onDismissMock}>
        foobar
      </Toast>,
    );

    jest.advanceTimersByTime(2000);

    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it("should not call the `onDismiss` callback if a value is passed to the `timeout` prop but `open` is false", () => {
    const onDismissMock = jest.fn();
    render(
      <Toast open={false} timeout={2000} onDismiss={onDismissMock}>
        foobar
      </Toast>,
    );

    jest.advanceTimersByTime(2000);

    expect(onDismissMock).not.toHaveBeenCalled();
  });

  it("should auto focus the toast wrapper element when initially opened", () => {
    render(
      <Toast open data-role="toast">
        foobar
      </Toast>,
    );

    act(() => {
      jest.runAllTimers();
    });
    const toast = screen.getByTestId("toast");

    expect(toast).toHaveFocus();
  });

  it("should not auto focus the toast wrapper element when initially opened if `disableAutoFocus` prop is set", () => {
    render(
      <Toast open disableAutoFocus>
        foobar
      </Toast>,
    );

    act(() => {
      jest.runAllTimers();
    });
    const toast = screen.getByRole("region");

    expect(toast).not.toHaveAttribute("tabIndex");
    expect(toast).not.toHaveFocus();
  });

  it("should set a tabIndex on the toast component and remove it when `onBlur` triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <Toast open data-role="toast">
        foobar
      </Toast>,
    );

    const toast = screen.getByTestId("toast");

    expect(toast).toHaveAttribute("tabIndex", "0");

    await user.click(document.body);

    expect(toast).not.toHaveAttribute("tabIndex");
  });

  it("should refocus the element that triggered the open state change after closing", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MockToast open={false} addInternalOnDismiss />);

    const button = screen.getByRole("button", { name: "Show toast" });
    await user.click(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const toast = await screen.findByTestId("toast");
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(toast).toHaveFocus();

    await user.click(closeButton);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(button).toHaveFocus();
  });

  it("should focus the toast wrapper again when it closes and then re-opens", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MockToast open={false} addInternalOnDismiss />);

    const button = screen.getByRole("button", { name: "Show toast" });
    await user.click(button);
    act(() => {
      jest.runAllTimers();
    });

    const toast = await screen.findByTestId("toast");
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(toast).toHaveFocus();

    await user.click(closeButton);
    act(() => {
      jest.runAllTimers();
    });

    expect(button).toHaveFocus();

    await user.click(button);
    act(() => {
      jest.runAllTimers();
    });

    expect(await screen.findByTestId("toast")).toHaveFocus();
  });

  it("should not refocus the trigger element after closing when `disableAutoFocus` prop is true", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MockToast open={false} addInternalOnDismiss disableAutoFocus />);

    const button = screen.getByRole("button", { name: "Show toast" });
    await user.click(button);
    act(() => {
      jest.runAllTimers();
    });

    const closeButton = await screen.findByRole("button", { name: "Close" });
    await user.click(closeButton);
    act(() => {
      jest.runAllTimers();
    });

    expect(button).not.toHaveFocus();
  });
});

test("should not render close button when no `onDismiss` prop is set", () => {
  render(<Toast open>foobar</Toast>);

  const closeButton = screen.queryByRole("button", { name: "Close" });

  expect(closeButton).not.toBeInTheDocument();
});

test("should render close button when `onDismiss` prop is set", () => {
  render(
    <Toast open onDismiss={() => {}}>
      foobar
    </Toast>,
  );

  const closeButton = screen.getByRole("button", { name: "Close" });

  expect(closeButton).toBeVisible();
});

test("should render with provided custom id passed via `id` prop", () => {
  render(
    <Toast open data-role="toast" id="exampleId">
      foobar
    </Toast>,
  );

  expect(screen.getByTestId("toast")).toHaveAttribute("id", "exampleId");
});

test("should render any child content passed via the `children` prop", () => {
  render(
    <Toast open>
      <span>foobar</span>
    </Toast>,
  );

  expect(screen.getByText("foobar")).toBeVisible();
});

test("should render with provided `data-` attributes", () => {
  render(
    <Toast open data-element="toast-element" data-role="toast-role">
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast-role");
  expect(toast).toHaveAttribute("data-element", "toast-element");
});

test("should render with accessible name when Toast is open", () => {
  render(<Toast open>foobar</Toast>);

  const toast = screen.getByRole("region");

  expect(toast).toHaveAccessibleName("Success foobar");
});

test("should not render an accessible region when Toast is closed", () => {
  render(<Toast open={false}>foobar</Toast>);

  const toast = screen.queryByRole("region");

  expect(toast).not.toBeInTheDocument();
});

test("should allow custom data props to be passed to close button to be passed via `closeButtonDataProps`", () => {
  render(
    <Toast
      open
      onDismiss={() => {}}
      closeButtonDataProps={{
        "data-element": "close-element",
        "data-role": "close-role",
      }}
    >
      foobar
    </Toast>,
  );

  const closeButton = screen.getByRole("button", { name: "Close" });

  expect(closeButton).toHaveAttribute("data-element", "close-element");
  expect(closeButton).toHaveAttribute("data-role", "close-role");
});

test("should render content container with correct expected styling when `maxWidth` is set", () => {
  render(
    <Toast maxWidth="200px" data-role="toast">
      Child
    </Toast>,
  );

  expect(screen.getByTestId("toast")).toHaveStyle({ maxWidth: "200px" });
});

test("should render with correct styling when `variant` prop is set to 'notice' and `onDismiss` is not set", () => {
  render(
    <Toast open variant="notice" data-role="toast">
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast");

  expect(screen.getByTestId("toast-wrapper")).toHaveStyle({
    display: "block",
  });

  expect(toast).toHaveStyle({
    border: "none",
    marginRight: "0",
    maxWidth: "100%",
  });
  expect(toast).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor400)",
  );
  expect(toast).toHaveStyleRule("color", "var(--colorsSemanticNeutralYang100)");

  expect(screen.getByTestId("toast-content")).toHaveStyle({
    display: "flex",
    "align-items": "center",
    padding: "11px 40px",
  });

  expect(screen.queryByTestId("toast-type-icon")).not.toBeInTheDocument();
});

test("should render with correct styling when `variant` prop is set to 'notice' and `onDismiss` is set", () => {
  render(
    <Toast open variant="notice" onDismiss={() => {}}>
      foobar
    </Toast>,
  );

  expect(screen.getByTestId("toast-content")).toHaveStyle({
    display: "flex",
    alignItems: "center",
    padding: "11px 88px 11px 40px",
  });

  expect(screen.getByRole("button", { name: "Close" })).toHaveStyle({
    right: "55px",
  });
});

test("should render with correct styling when `variant` prop is set to 'notice' and `alignY` prop is set to 'top'", () => {
  render(
    <Toast
      open
      variant="notice"
      alignY="top"
      data-role="toast"
      onDismiss={() => {}}
    >
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast");

  expect(toast).toHaveStyle({
    margin: "0px 0px 0px auto",
  });
});

test("should render with correct styling when `variant` prop is set to 'notice' and `alignY` prop is set to 'bottom'", () => {
  render(
    <Toast
      open
      variant="notice"
      alignY="bottom"
      data-role="toast"
      onDismiss={() => {}}
    >
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast");

  expect(toast).toHaveStyle({
    margin: "0px 0px 0px auto",
  });
});

test.each<[ToastProps["variant"], string]>([
  ["neutral", "info"],
  ["success", "tick_circle"],
  ["warning", "warning"],
  ["error", "error"],
  ["info", "info"],
  ["notification", "alert"],
])(
  "should render the expected icon when `variant` prop is set to '%s'",
  (variant, iconType) => {
    render(
      <Toast open variant={variant}>
        foobar
      </Toast>,
    );

    expect(screen.getByTestId("icon")).toHaveAttribute("type", iconType);
  },
);

test("should not throw when ref is a function", () => {
  expect(() => {
    render(
      <Toast onDismiss={() => {}} ref={(ref) => ref}>
        foobar
      </Toast>,
    );
  }).not.toThrow();
});

test("should pass ref to the wrapper element", () => {
  const ref = { current: null };
  render(
    <Toast onDismiss={() => {}} ref={ref}>
      foobar
    </Toast>,
  );

  expect(ref.current).toBe(screen.getByTestId("toast-wrapper"));
});

test("should render with expected styling when `align` prop is 'right'", () => {
  render(
    <Toast open align="right" data-role="toast">
      foobar
    </Toast>,
  );

  expect(screen.getByRole("region")).toHaveStyle({
    "justify-content": "right",
  });

  expect(screen.getByTestId("toast")).toHaveStyle({
    "margin-right": "auto",
    "margin-left": "30px",
  });
});

test("should render with expected styling when `align` prop is 'center'", () => {
  render(
    <Toast open align="center" data-role="toast">
      foobar
    </Toast>,
  );

  expect(screen.getByRole("region")).toHaveStyle({
    "justify-content": "center",
  });
  expect(screen.getByTestId("toast")).toHaveStyle({
    "margin-right": "auto",
    "margin-left": "auto",
  });
});

test("should render with expected styling when `align` prop is 'left'", () => {
  render(
    <Toast open align="left" data-role="toast">
      foobar
    </Toast>,
  );

  expect(screen.getByRole("region")).toHaveStyle({
    "justify-content": "left",
  });
  expect(screen.getByTestId("toast")).toHaveStyle({
    "margin-right": "30px",
    "margin-left": "auto",
  });
});

test("should render with expected styling when `alignY` prop is set to 'top'", () => {
  render(
    <Toast alignY="top" data-role="toast">
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast");

  expect(toast).toHaveStyle({
    "margin-top": "30px",
    "margin-bottom": "0",
  });
});

test("should render with expected styling when `alignY` prop is set to 'bottom'", () => {
  render(
    <Toast alignY="bottom" data-role="toast">
      foobar
    </Toast>,
  );

  const toast = screen.getByTestId("toast");

  expect(toast).toHaveStyle({
    "margin-top": "0",
    "margin-bottom": "30px",
  });
});

test("should render with expected styling when `alignY` prop is 'center' and `align` prop is 'left'", () => {
  render(
    <Toast alignY="center" align="left" data-role="toast">
      foobar
    </Toast>,
  );

  expect(screen.getByTestId("carbon-portal-exit")).toHaveStyle({
    top: "50%",
    transform: "translate(50%,-50%)",
  });
});

test("should render with expected styling when `alignY` prop is 'center' and `align` prop is not 'left'", () => {
  render(
    <Toast alignY="center" data-role="toast">
      foobar
    </Toast>,
  );

  expect(screen.getByTestId("carbon-portal-exit")).toHaveStyle({
    top: "50%",
    transform: "translate(-50%,-50%)",
  });
});
