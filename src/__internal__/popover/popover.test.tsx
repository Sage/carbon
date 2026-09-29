import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/react-dom";

jest.mock("@floating-ui/react-dom", () => {
  const actual = jest.requireActual("@floating-ui/react-dom");

  return {
    ...actual,
    autoUpdate: jest.fn((_, __, update) => {
      update();
      return () => {};
    }),
    useFloating: jest.fn(actual.useFloating),
  };
});
import Popover, { PopoverProps } from "./popover.component";
import Dialog from "../../components/dialog";

const waitForPosition = () => waitFor(() => {});
const originalUseFloating = jest.requireActual(
  "@floating-ui/react-dom",
).useFloating;

afterEach(() => {
  jest.mocked(floatingUi.useFloating).mockImplementation(originalUseFloating);
});

const PopoverWithButton = ({
  children = <div>I float!</div>,
  ...props
}: Omit<PopoverProps, "children" | "reference"> & {
  children?: React.ReactElement;
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={buttonRef} type="button">
        Reference
      </button>
      <Popover reference={buttonRef} {...props}>
        {children}
      </Popover>
    </>
  );
};

test("popup content is visible by default", () => {
  render(
    <Popover reference={{ current: null }}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
});

test("popup content is visible when hide prop is false", () => {
  render(
    <Popover hide={false} reference={{ current: null }}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
});

test("popup content is hidden when hide prop is true", () => {
  render(
    <Popover hide reference={{ current: null }}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).not.toBeVisible();
});

test("renders popup in the document body to avoid any ancestors affecting its layout and styling", async () => {
  render(
    <main>
      <PopoverWithButton />
    </main>,
  );
  await waitForPosition();

  expect(document.body).toHaveTextContent(/I float!/);
  expect(screen.getByRole("main")).not.toHaveTextContent(/I float!/);
});

test("renders popup within the component's ancestor as normal when disablePortal prop is true", async () => {
  render(
    <main>
      <PopoverWithButton disablePortal />
    </main>,
  );
  await waitForPosition();

  expect(screen.getByRole("main")).toHaveTextContent(/I float!/);
});

test("when mounted, renders popup in the reference's nearest dialog ancestor if it has one", async () => {
  const DialogWithPopover = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    return (
      <Dialog open>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Toggle popover
        </button>
        {isOpen && (
          <Popover reference={buttonRef}>
            <div>I float!</div>
          </Popover>
        )}
      </Dialog>
    );
  };
  const user = userEvent.setup();
  render(<DialogWithPopover />);

  // mount the popover
  await user.click(screen.getByRole("button", { name: /Toggle popover/ }));

  expect(screen.getByRole("dialog")).toHaveTextContent(/I float!/);
});

test("applies popup styling to the element specified via the childRefOverride prop", async () => {
  const UsingChildRefOverride = () => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const floatingRef = React.useRef<HTMLDivElement>(null);

    return (
      <main>
        <button ref={buttonRef} type="button">
          Toggle popup
        </button>
        <Popover reference={buttonRef} childRefOverride={floatingRef}>
          <article>
            <div ref={floatingRef}>I float!</div>
          </article>
        </Popover>
      </main>
    );
  };
  const user = userEvent.setup();
  render(<UsingChildRefOverride />);

  await user.click(screen.getByRole("button", { name: /Toggle popup/ }));

  expect(screen.getByRole("article")).not.toHaveAttribute(
    "data-floating-placement",
  );
  expect(screen.getByText("I float!")).toHaveAttribute(
    "data-floating-placement",
  );
});

test("preserves child styles and clears the placement attribute when closed", async () => {
  const { rerender } = render(
    <PopoverWithButton isOpen placement="top">
      <div style={{ left: "50px", position: "static", top: "100px" }}>
        I float!
      </div>
    </PopoverWithButton>,
  );
  await waitForPosition();

  const floatingElement = screen.getByText("I float!");
  expect(floatingElement).toHaveStyle({ position: "absolute" });
  expect(floatingElement).toHaveAttribute("data-floating-placement", "top");

  rerender(
    <PopoverWithButton isOpen={false} placement="top">
      <div style={{ left: "50px", position: "static", top: "100px" }}>
        I float!
      </div>
    </PopoverWithButton>,
  );

  expect(floatingElement).toHaveStyle({
    left: "50px",
    position: "static",
    top: "100px",
  });
  expect(floatingElement).not.toHaveAttribute("data-floating-placement");
});

test("falls back to a zero top position when Floating UI returns NaN", async () => {
  jest.mocked(floatingUi.useFloating).mockImplementation((options) => {
    const result = originalUseFloating(options);

    return {
      ...result,
      floatingStyles: { ...result.floatingStyles, left: 10, top: NaN },
    };
  });

  render(<PopoverWithButton />);
  await waitForPosition();

  expect(screen.getByText("I float!")).toHaveStyle({
    left: "10px",
    top: "0px",
  });
});

test("only auto-updates while open and cleans up when closed", async () => {
  const cleanup = jest.fn();
  const autoUpdateMock = jest.mocked(floatingUi.autoUpdate);
  autoUpdateMock.mockClear();
  autoUpdateMock.mockImplementationOnce(() => cleanup);

  const { rerender } = render(<PopoverWithButton isOpen={false} />);

  expect(autoUpdateMock).not.toHaveBeenCalled();

  rerender(<PopoverWithButton isOpen />);
  await waitForPosition();

  expect(autoUpdateMock).toHaveBeenCalledTimes(1);

  rerender(<PopoverWithButton isOpen={false} />);

  expect(cleanup).toHaveBeenCalledTimes(1);
});

test("renders popup within a transparent backdrop to prevent scrolling outside the popup when disableBackgroundUI is true", async () => {
  render(
    <main>
      <PopoverWithButton disableBackgroundUI />
      <p>Lorem ipsum dolor sit amet...</p>
    </main>,
  );
  await waitForPosition();

  const backdrop = screen.getByTestId("popup-backdrop");

  expect(backdrop).toHaveStyle({
    background: "transparent",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const backdropIndex = getComputedStyle(backdrop).getPropertyValue("z-index");

  // non-default value
  expect(backdropIndex).toContain("--adaptiveSidebarModalBackdrop");
  // default value
  expect(backdropIndex).toContain("6000");
});

test("does not render a backdrop when disableBackgroundUI is false", async () => {
  render(
    <main>
      <PopoverWithButton />
      <p>Lorem ipsum dolor sit amet...</p>
    </main>,
  );
  await waitForPosition();

  expect(screen.queryByTestId("popup-backdrop")).not.toBeInTheDocument();
});

const PopoverInThemedWrapper = (
  props: Omit<PopoverProps, "children" | "reference">,
) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <div data-carbon-theme="dark" data-role="themed-wrapper">
      <button ref={buttonRef} type="button">
        Reference
      </button>
      <Popover reference={buttonRef} {...props}>
        <div>I float!</div>
      </Popover>
    </div>
  );
};

test("applies the nearest ancestor's carbon theme to the portalled content", async () => {
  render(<PopoverInThemedWrapper />);

  await waitFor(() =>
    expect(
      screen.getByTestId("carbon-portal-scoped-tokens-provider"),
    ).toHaveAttribute("data-carbon-theme", "dark"),
  );
});

test("updates the theme when the ancestor's data-carbon-theme changes, and clears it when removed", async () => {
  render(<PopoverInThemedWrapper />);
  const wrapper = screen.getByTestId("themed-wrapper");
  const provider = screen.getByTestId("carbon-portal-scoped-tokens-provider");

  await waitFor(() =>
    expect(provider).toHaveAttribute("data-carbon-theme", "dark"),
  );

  // fires the MutationObserver callback
  act(() => wrapper.setAttribute("data-carbon-theme", "light"));
  await waitFor(() =>
    expect(provider).toHaveAttribute("data-carbon-theme", "light"),
  );

  act(() => wrapper.removeAttribute("data-carbon-theme"));
  await waitFor(() =>
    expect(provider).not.toHaveAttribute("data-carbon-theme"),
  );
});
