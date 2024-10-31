import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover, { PopoverProps } from "./popover.component";
import { baseTheme } from "../../style/themes";
import Dialog from "../../components/dialog";

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

test("popup content is visible when isOpen prop is true", () => {
  render(
    <Popover isOpen reference={{ current: null }}>
      <div>I float!</div>
    </Popover>,
  );

  expect(screen.getByText("I float!")).toBeVisible();
});

test("popup content is hidden when isOpen prop is false", () => {
  render(
    <Popover isOpen={false} reference={{ current: null }}>
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
    zIndex: baseTheme.zIndex.popover,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
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
