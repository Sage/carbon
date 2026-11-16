import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover, { PopoverProps } from "./popover.component";
import * as floatingUi from "@floating-ui/dom";
import Dialog from "../../components/dialog";

const PopoverWithButton = (
  props: Omit<PopoverProps, "children" | "reference">,
) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <button ref={setReferenceElement} type="button">
        Reference
      </button>
      <Popover reference={referenceElement} {...props}>
        <div>I float!</div>
      </Popover>
    </>
  );
};

test("popup content is visible by default", () => {
  render(
    <Popover reference={null}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
});

test("popup content is visible when hide prop is false", () => {
  render(
    <Popover hide={false} reference={null}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
});

test("popup content is hidden when hide prop is true", () => {
  render(
    <Popover hide reference={null}>
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

test("when mounted, renders popup in the reference's nearest dialog ancestor if it has one", async () => {
  const DialogWithPopover = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [referenceElement, setReferenceElement] =
      React.useState<HTMLButtonElement | null>(null);

    return (
      <Dialog open>
        <button
          ref={setReferenceElement}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Toggle popover
        </button>
        {isOpen && (
          <Popover reference={referenceElement}>
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
    const [referenceElement, setReferenceElement] =
      React.useState<HTMLButtonElement | null>(null);
    const floatingRef = React.useRef<HTMLDivElement>(null);

    return (
      <main>
        <button ref={setReferenceElement} type="button">
          Toggle popup
        </button>
        <Popover reference={referenceElement} childRefOverride={floatingRef}>
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
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);
  return (
    <div data-carbon-theme="dark" data-role="themed-wrapper">
      <button ref={setReferenceElement} type="button">
        Reference
      </button>
      <Popover reference={referenceElement} {...props}>
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

test("positions the popup once the reference element becomes available after the initial render", async () => {
  render(<PopoverWithButton />);

  await waitFor(() =>
    expect(screen.getByText("I float!")).toHaveAttribute(
      "data-floating-placement",
    ),
  );
});

test("does not position the popup when reference is null", async () => {
  render(
    <Popover reference={null}>
      <div>I float!</div>
    </Popover>,
  );

  await act(async () => {
    await Promise.resolve();
  });

  expect(screen.getByText("I float!")).not.toHaveAttribute(
    "data-floating-placement",
  );
});

test("repositions the popup against the new reference element when the reference changes", async () => {
  const SwitchingReference = () => {
    const [elementA, setElementA] = React.useState<HTMLButtonElement | null>(
      null,
    );
    const [elementB, setElementB] = React.useState<HTMLButtonElement | null>(
      null,
    );
    const [useB, setUseB] = React.useState(false);

    return (
      <>
        <button ref={setElementA} type="button">
          Button A
        </button>
        <button ref={setElementB} type="button">
          Button B
        </button>
        <button type="button" onClick={() => setUseB(true)}>
          Switch
        </button>
        <Popover reference={useB ? elementB : elementA}>
          <div>I float!</div>
        </Popover>
      </>
    );
  };
  const spy = jest.spyOn(floatingUi, "computePosition");
  const user = userEvent.setup();

  try {
    render(<SwitchingReference />);
    await user.click(screen.getByRole("button", { name: "Switch" }));

    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        screen.getByRole("button", { name: "Button B" }),
        screen.getByText("I float!"),
        expect.anything(),
      ),
    );
  } finally {
    spy.mockRestore();
  }
});

test("renders popup in the reference's nearest dialog ancestor when the reference resolves after the popover mounts", () => {
  const DialogWithImmediatePopover = () => {
    const [referenceElement, setReferenceElement] =
      React.useState<HTMLButtonElement | null>(null);

    return (
      <Dialog open>
        <button ref={setReferenceElement} type="button">
          Reference
        </button>
        <Popover reference={referenceElement}>
          <div>I float!</div>
        </Popover>
      </Dialog>
    );
  };
  render(<DialogWithImmediatePopover />);

  expect(screen.getByRole("dialog")).toHaveTextContent(/I float!/);
});
