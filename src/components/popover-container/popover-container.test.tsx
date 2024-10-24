import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testStyledSystemPaddingRTL } from "../../__spec_helper__/__internal__/test-utils";

import PopoverContainer from "./popover-container.component";
import { Select, Option } from "../select";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("open button", () => {
  it("renders open button", () => {
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    expect(screen.getByRole("button")).toBeVisible();
  });

  it("open button is associated with a popup", () => {
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-haspopup",
      "dialog"
    );
  });

  it("open button has aria-expanded attribute set when popup is open", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("renders custom open button provided by renderOpenComponent prop", () => {
    render(
      <PopoverContainer
        renderOpenComponent={({ ref }) => (
          <button type="button" ref={ref}>
            Custom Open Button
          </button>
        )}
      >
        Ta da!
      </PopoverContainer>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Custom Open Button");
  });

  it("consumer can associate custom open button with popup", () => {
    render(
      <PopoverContainer
        renderOpenComponent={({ ref, "aria-haspopup": ariaHasPopup }) => (
          <button type="button" ref={ref} aria-haspopup={ariaHasPopup}>
            Custom Open Button
          </button>
        )}
      >
        Ta da!
      </PopoverContainer>
    );

    const openButton = screen.getByRole("button");
    expect(openButton).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("consumer can set aria-expanded attribute on custom open button", () => {
    render(
      <PopoverContainer
        renderOpenComponent={({ ref, "aria-expanded": ariaExpanded }) => (
          <button type="button" ref={ref} aria-expanded={ariaExpanded}>
            Custom Open Button
          </button>
        )}
      >
        Ta da!
      </PopoverContainer>
    );

    const openButton = screen.getByRole("button");
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});

test("popup has a title when title prop is passed", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>
  );

  expect(screen.getByRole("dialog")).toHaveTextContent("Custom Title");
});

test("popup uses title prop as its correct accessible name when passed", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("Custom Title");
});

test("popup uses containerAriaLabel prop as its correct accessible name when passed", () => {
  render(
    <PopoverContainer containerAriaLabel="Custom Label" open>
      Ta da!
    </PopoverContainer>
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("Custom Label");
});

test("popup has correct accessible description when ariaDescribedBy prop is passed", () => {
  render(
    <>
      <h2 id="subtitle">Custom Subtitle</h2>
      <PopoverContainer ariaDescribedBy="subtitle" open>
        Ta da!
      </PopoverContainer>
    </>
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "Custom Subtitle"
  );
});

test("popup title has correct data tag", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>
  );

  expect(screen.getByText("Custom Title")).toHaveAttribute(
    "data-element",
    "popover-container-title"
  );
});

describe("close button", () => {
  it("renders close button in popup when onClose prop is passed", () => {
    render(
      <PopoverContainer onClose={() => {}} open>
        Ta da!
      </PopoverContainer>
    );

    expect(screen.getByRole("button", { name: "close" })).toBeVisible();
  });

  it("renders custom close button provided by renderCloseComponent prop", () => {
    render(
      <PopoverContainer
        open
        renderCloseComponent={({ onClick }) => (
          <button type="button" onClick={onClick}>
            Custom Close Button
          </button>
        )}
      >
        Ta da!
      </PopoverContainer>
    );

    expect(
      screen.getByRole("button", { name: "Custom Close Button" })
    ).toBeVisible();
  });

  it("has correct data tags, when the prop closeButtonDataProps is provided", () => {
    render(
      <PopoverContainer
        open
        closeButtonDataProps={{
          "data-element": "foo",
          "data-role": "bar",
        }}
      >
        Content
      </PopoverContainer>
    );

    expect(screen.getByRole("button", { name: "close" })).toHaveAttribute(
      "data-element",
      "foo"
    );
    expect(screen.getByRole("button", { name: "close" })).toHaveAttribute(
      "data-role",
      "bar"
    );
  });
});

test("does not animate in popup when disableAnimation is true", async () => {
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  render(<PopoverContainer disableAnimation>Content</PopoverContainer>);

  await user.click(screen.getByRole("button"));

  expect(await screen.findByRole("dialog")).toHaveStyle({
    position: "fixed",
    opacity: "1",
    transform: "none",
  });
});

test("does not animate in popup if user consent for animations cannot be determined", async () => {
  const mockedUseMediaQuery = jest.mocked(useMediaQuery);
  mockedUseMediaQuery.mockReturnValue(false);

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  render(<PopoverContainer>Content</PopoverContainer>);

  await user.click(screen.getByRole("button"));

  expect(await screen.findByRole("dialog")).toHaveStyle({
    position: "fixed",
    opacity: "1",
    transform: "none",
  });

  mockedUseMediaQuery.mockReset();
});

test("popup traps focus when shouldCoverButton prop is true", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer shouldCoverButton open onClose={() => {}}>
      Content
    </PopoverContainer>
  );

  const closeButton = screen.getByRole("button", { name: "close" });
  fireEvent.focus(closeButton);

  await user.tab();

  expect(closeButton).toHaveFocus();
});

test("popup allows outside focus when shouldCoverButton prop is false", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer shouldCoverButton={false} open onClose={() => {}}>
      Content
    </PopoverContainer>
  );

  const closeButton = screen.getByRole("button", { name: "close" });
  fireEvent.focus(closeButton);

  await user.tab();

  expect(closeButton).not.toHaveFocus();
});

test.each([
  ["left", "bottom-end"],
  ["right", "bottom-start"],
] as const)(
  "computes popup positioning correctly when position prop is '%s'",
  async (position, placement) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer position={position}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-floating-placement",
      placement
    );
  }
);

test("popup visibility is controllable via open prop", async () => {
  const ControlledPopoverContainer = () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button type="button" onClick={() => setOpen((prev) => !prev)}>
          Toggle popup
        </button>
        <PopoverContainer open={open} onClose={() => {}}>
          Content
        </PopoverContainer>
        å
      </>
    );
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ControlledPopoverContainer />);

  const toggleButton = screen.getByRole("button", { name: "Toggle popup" });
  await user.click(toggleButton);

  expect(await screen.findByRole("dialog")).toBeVisible();

  await user.click(toggleButton);

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("opening the popup", () => {
  it("opens popup when open button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    const popup = await screen.findByRole("dialog");
    expect(popup).toBeVisible();
    expect(popup).toHaveTextContent("Ta da!");
  });

  it("opens popup when open button is selected via the keyboard", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    await user.tab();
    await user.keyboard("{Enter}");

    const popup = await screen.findByRole("dialog");
    expect(popup).toBeVisible();
    expect(popup).toHaveTextContent("Ta da!");
  });

  it("calls onOpen callback when popup is opened", async () => {
    const onOpen = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onOpen={onOpen}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it("open button still has focus after popup is opened", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    const button = screen.getByRole("button");
    await user.click(button);
    await screen.findByRole("dialog");

    expect(button).toHaveFocus();
  });
});

describe("closing the popup", () => {
  it("closes popup when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    await user.click(await screen.findByRole("button", { name: "close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes popup when close button is selected via the keyboard", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    const closeButton = await screen.findByRole("button", { name: "close" });
    closeButton.focus();

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes popup when Escape key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes popup when outside content is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <>
        <PopoverContainer onClose={() => {}}>Content</PopoverContainer>
        <p>Outside popup</p>
      </>
    );

    await user.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    await user.click(screen.getByText("Outside popup"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("focuses open button after popup is closed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    const button = screen.getByRole("button");
    await user.click(button);

    await user.click(await screen.findByRole("button", { name: "close" }));

    expect(button).toHaveFocus();
  });

  it("calls onClose callback when popup is closed", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    await user.click(await screen.findByRole("button", { name: "close" }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup when open button is clicked twice", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <PopoverContainer openButtonAriaLabel="open popup" onClose={() => {}}>
        Content
      </PopoverContainer>
    );

    const openButton = screen.getByRole("button", { name: "open popup" });
    await user.click(openButton);
    await user.click(openButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("pressing Escape key does not close the popup, when nested popup content is open inside it", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <PopoverContainer onClose={() => {}}>
        <Select name="colour" id="colour" label="Select colour">
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
        </Select>
      </PopoverContainer>
    );

    await user.click(screen.getByRole("button"));

    // open select list
    await user.click(await screen.findByRole("combobox"));
    await screen.findByRole("listbox");

    // should close select list only
    await user.keyboard("{Escape}");

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("triggers closing animation sequence with correct timing when closing popup", async () => {
    const mockedUseMediaQuery = jest.mocked(useMediaQuery);
    mockedUseMediaQuery.mockReturnValue(true);

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    const popup = await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "close" }));

    expect(popup).toHaveClass("exit");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(popup).toHaveClass("exit-done");
    mockedUseMediaQuery.mockReset();
  });
});

testStyledSystemPaddingRTL(
  (props) => (
    <PopoverContainer open title="My popup" {...props}>
      Ta da!
    </PopoverContainer>
  ),
  () => screen.getByRole("dialog"),
  { p: "16px 24px" }
);