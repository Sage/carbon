import React from "react";
// Native API stubs must remain installed until component cleanup effects run.
// eslint-disable-next-line testing-library/no-manual-cleanup
import { render, screen, act, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover, { PopoverProps } from "./popover.component";

import Dialog from "../../components/dialog";
import ModalContext from "../modal/modal.context";

const PopoverWithButton = (
  props: Omit<PopoverProps, "children" | "reference">,
) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={buttonRef} type="button">
        Reference
      </button>
      <Popover reference={buttonRef} {...props}>
        <div>I float!</div>
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

test("renders popup in the document body to avoid any ancestors affecting its layout and styling", () => {
  render(
    <main>
      <PopoverWithButton />
    </main>,
  );

  expect(document.body).toHaveTextContent(/I float!/);
  expect(screen.getByRole("main")).not.toHaveTextContent(/I float!/);
});

test("renders popup within the component's ancestor as normal when disablePortal prop is true", () => {
  render(
    <main>
      <PopoverWithButton disablePortal />
    </main>,
  );

  expect(screen.getByRole("main")).toHaveTextContent(/I float!/);
});

test("falls back to a body portal when the native popover API is unavailable", () => {
  render(
    <main>
      <PopoverWithButton useTopLayer />
    </main>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
  expect(screen.getByRole("main")).not.toHaveTextContent("I float!");
});

describe("native top layer", () => {
  const originalShowPopover = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "showPopover",
  );
  const originalHidePopover = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "hidePopover",
  );
  const nativeMatches = HTMLElement.prototype.matches;
  let openPopovers: Set<HTMLElement>;
  let matchesSpy: jest.SpyInstance;
  const showPopover = jest.fn(function (this: HTMLElement) {
    openPopovers.add(this);
  });
  const hidePopover = jest.fn(function (this: HTMLElement) {
    openPopovers.delete(this);
  });

  beforeEach(() => {
    openPopovers = new Set();
    showPopover.mockClear();
    hidePopover.mockClear();
    Object.defineProperties(HTMLElement.prototype, {
      showPopover: { configurable: true, value: showPopover },
      hidePopover: { configurable: true, value: hidePopover },
    });
    matchesSpy = jest
      .spyOn(HTMLElement.prototype, "matches")
      .mockImplementation(function (this: HTMLElement, selector: string) {
        return selector === ":popover-open"
          ? openPopovers.has(this)
          : nativeMatches.call(this, selector);
      });
  });

  afterEach(() => {
    // Unmount while the native API stubs are still available to cleanup effects.
    cleanup();
    matchesSpy.mockRestore();
    for (const [name, descriptor] of [
      ["showPopover", originalShowPopover],
      ["hidePopover", originalHidePopover],
    ] as const) {
      if (descriptor) {
        Object.defineProperty(HTMLElement.prototype, name, descriptor);
      } else {
        Reflect.deleteProperty(HTMLElement.prototype, name);
      }
    }
  });

  test("keeps content beside its trigger, uses fixed positioning, and hides it on unmount", async () => {
    const { unmount } = render(
      <main>
        <PopoverWithButton useTopLayer />
      </main>,
    );
    const popover = showPopover.mock.instances[0];
    expect(screen.getByRole("main")).toHaveTextContent("I float!");
    expect(popover).toHaveAttribute("popover", "manual");
    expect(popover).toHaveStyle({
      position: "fixed",
      margin: "0",
      padding: "0",
      overflow: "visible",
    });
    expect(popover).toHaveStyleRule("border", "0");
    await waitFor(() =>
      expect(screen.getByText("I float!")).toHaveStyle({ position: "fixed" }),
    );

    unmount();

    expect(hidePopover).toHaveBeenCalledTimes(1);
    expect(hidePopover.mock.instances[0]).toBe(popover);
    expect(popover).not.toHaveAttribute("popover");
  });

  test("opens and closes with isOpen without hiding an already closed popover", () => {
    const { rerender, unmount } = render(
      <PopoverWithButton useTopLayer isOpen={false} />,
    );
    expect(showPopover).not.toHaveBeenCalled();

    rerender(<PopoverWithButton useTopLayer isOpen />);

    expect(showPopover).toHaveBeenCalledTimes(1);
    expect(hidePopover).not.toHaveBeenCalled();

    rerender(<PopoverWithButton useTopLayer isOpen={false} />);

    expect(hidePopover).toHaveBeenCalledTimes(1);
    expect(showPopover.mock.instances[0]).toHaveAttribute("popover", "manual");

    unmount();

    expect(hidePopover).toHaveBeenCalledTimes(1);
  });

  test("keeps a custom portal target instead of moving content into the closest dialog", async () => {
    const user = userEvent.setup();
    render(<aside aria-label="Submenu parent" />);
    const target = screen.getByRole("complementary", {
      name: "Submenu parent",
    });
    const PopoverInDialog = () => {
      const reference = React.useRef<HTMLButtonElement>(null);
      const [open, setOpen] = React.useState(false);
      return (
        <ModalContext.Provider value={{ isInModal: true }}>
          <div role="dialog" aria-label="Parent dialog">
            <button ref={reference} type="button" onClick={() => setOpen(true)}>
              Open popover
            </button>
            {open && (
              <Popover reference={reference} useTopLayer portalTarget={target}>
                <div>I float!</div>
              </Popover>
            )}
          </div>
        </ModalContext.Provider>
      );
    };
    render(<PopoverInDialog />);

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(target).toHaveTextContent("I float!");
    expect(screen.getByRole("dialog")).not.toHaveTextContent("I float!");
    expect(showPopover).toHaveBeenCalledTimes(1);
  });
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

test("renders popup within a transparent backdrop to prevent scrolling outside the popup when disableBackgroundUI is true", () => {
  render(
    <main>
      <PopoverWithButton disableBackgroundUI />
      <p>Lorem ipsum dolor sit amet...</p>
    </main>,
  );

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

test("does not render a backdrop when disableBackgroundUI is false", () => {
  render(
    <main>
      <PopoverWithButton />
      <p>Lorem ipsum dolor sit amet...</p>
    </main>,
  );

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

test("preserves a child callback cleanup while maintaining its positioning ref", async () => {
  const cleanupRef = jest.fn();
  const childRef = jest.fn<() => void, [HTMLDivElement | null]>(
    () => cleanupRef,
  );
  const reference = React.createRef<HTMLButtonElement>();
  const { unmount } = render(
    <>
      <button ref={reference}>Anchor</button>
      <Popover reference={reference}>
        <div ref={childRef}>Floating content</div>
      </Popover>
    </>,
  );

  const floating = screen.getByText("Floating content");
  await waitFor(() => expect(floating).toHaveStyle({ position: "absolute" }));
  expect(childRef).toHaveBeenCalledWith(floating);
  unmount();

  expect(cleanupRef).toHaveBeenCalledTimes(1);
  expect(childRef).not.toHaveBeenCalledWith(null);
});
