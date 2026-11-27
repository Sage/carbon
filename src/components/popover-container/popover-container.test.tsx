import React, { useRef } from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testStyledSystemPadding } from "../../__spec_helper__/__internal__/test-utils";

import PopoverContainer, {
  PopoverContainerHandle,
  RenderOpenProps,
} from "./popover-container.component";
import { Select, Option } from "../select";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useGlobalHeader } from "../global-header/__internal__/global-header.context";

import LegacyButton from "../button";
import Button from "../button/__next__";

import RadioButton, { RadioButtonGroup } from "../radio-button";
import GlobalHeader from "../global-header";
import { Menu, MenuItem, MenuFullscreen } from "../menu";
import TokensWrapper from "../tokens-wrapper";
import I18nProvider from "../i18n-provider";
import { TableBodyContext } from "../table/__internal__/contexts";
import MenuContext from "../menu/__internal__/menu.context";

jest.mock("../../hooks/useMediaQuery");
jest.mock("../global-header/__internal__/global-header.context", () => {
  const actual = jest.requireActual(
    "../global-header/__internal__/global-header.context",
  );
  return {
    ...actual,
    useGlobalHeader: jest.fn(),
  };
});

let mockedUseGlobalHeader: jest.MockedFunction<typeof useGlobalHeader>;

beforeEach(() => {
  jest.useFakeTimers();

  mockedUseGlobalHeader = jest.mocked(useGlobalHeader);
  mockedUseGlobalHeader.mockReturnValue({ isWithinGlobalHeader: false });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const expectDirectChild = (child: HTMLElement, parent: HTMLElement) => {
  // eslint-disable-next-line testing-library/no-node-access
  expect(child.parentElement).toBe(parent);
};

const PopoverInNavigation = ({ withNav = true }) => {
  const [open, setOpen] = React.useState(false);

  const children = (
    <div data-role="menu-parent">
      <Menu>
        <MenuItem>
          <PopoverContainer
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            renderOpenComponent={({ ref, onClick }) => (
              <button aria-label="Notifications" ref={ref} onClick={onClick}>
                open
              </button>
            )}
          >
            Content
          </PopoverContainer>
        </MenuItem>
      </Menu>
    </div>
  );
  return withNav ? <GlobalHeader>{children}</GlobalHeader> : children;
};

describe("open button", () => {
  it("renders open button", () => {
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    expect(screen.getByRole("button")).toBeVisible();
  });

  it("open button is associated with a popup", () => {
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-haspopup",
      "dialog",
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
      </PopoverContainer>,
    );

    expect(screen.getByRole("button")).toHaveTextContent("Custom Open Button");
  });

  it("consumer can associate custom open button with popup", () => {
    render(
      <PopoverContainer
        renderOpenComponent={({ ref, "aria-haspopup": ariaHasPopup }) => (
          <LegacyButton type="button" ref={ref} aria-haspopup={ariaHasPopup}>
            Custom Open Button
          </LegacyButton>
        )}
      >
        Ta da!
      </PopoverContainer>,
    );

    const openButton = screen.getByRole("button");
    expect(openButton).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("consumer can set aria-expanded attribute on custom open button", () => {
    render(
      <PopoverContainer
        renderOpenComponent={({ ref, "aria-expanded": ariaExpanded }) => (
          <LegacyButton type="button" ref={ref} aria-expanded={ariaExpanded}>
            Custom Open Button
          </LegacyButton>
        )}
      >
        Ta da!
      </PopoverContainer>,
    );

    const openButton = screen.getByRole("button");
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});

test("popup has a title when title prop is passed", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveTextContent("Custom Title");
});

test("popup uses title prop as its correct accessible name when passed", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("Custom Title");
});

test("popup uses containerAriaLabel prop as its correct accessible name when passed", () => {
  render(
    <PopoverContainer containerAriaLabel="Custom Label" open>
      Ta da!
    </PopoverContainer>,
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
    </>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "Custom Subtitle",
  );
});

test("popup title has correct data tag", () => {
  render(
    <PopoverContainer title="Custom Title" open>
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByText("Custom Title")).toHaveAttribute(
    "data-element",
    "popover-container-title",
  );
});

test("popover renders with the correct default border radius", () => {
  render(<PopoverContainer open>Ta da!</PopoverContainer>);

  expect(screen.getByRole("dialog")).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-l)",
  );
});

test("popover renders with correct border radius when `roundness` is `curved`", () => {
  render(
    <PopoverContainer roundness="curved" open>
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-xl)",
  );
});

test("popover renders with the correct border radius when `borderRadius` is passed", () => {
  render(
    <PopoverContainer borderRadius="borderRadius200" open>
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius200)",
  );
});

test.each([
  ["small", "var(--global-space-comp-xs)"],
  ["medium", "var(--global-space-comp-s)"],
  ["large", "var(--global-space-comp-m)"],
] as const)(
  "popover renders with correct padding when `size` is `%s`",
  (size, expectedPadding) => {
    render(
      <PopoverContainer size={size} open>
        Ta da!
      </PopoverContainer>,
    );

    expect(screen.getByRole("dialog")).toHaveStyleRule(
      "padding",
      expectedPadding,
    );
  },
);

test("popover renders with the correct border radius when `borderRadius` is passed with mutple border radius values", () => {
  render(
    <PopoverContainer
      borderRadius="borderRadius200 borderRadius200 borderRadius100 borderRadius100"
      open
    >
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveStyleRule(
    "border-radius",
    "var(--borderRadius200) var(--borderRadius200) var(--borderRadius100) var(--borderRadius100)",
  );
});

describe("close button", () => {
  it("renders close button in popup when onClose prop is passed", () => {
    render(
      <PopoverContainer onClose={() => {}} open>
        Ta da!
      </PopoverContainer>,
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
      </PopoverContainer>,
    );

    expect(
      screen.getByRole("button", { name: "Custom Close Button" }),
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
      </PopoverContainer>,
    );

    expect(screen.getByRole("button", { name: "close" })).toHaveAttribute(
      "data-element",
      "foo",
    );
    expect(screen.getByRole("button", { name: "close" })).toHaveAttribute(
      "data-role",
      "bar",
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
    </PopoverContainer>,
  );

  await user.tab();
  const closeButton = screen.getByRole("button", { name: "close" });
  expect(closeButton).toHaveFocus();

  await user.tab();

  expect(closeButton).toHaveFocus();
});

test("popup allows outside focus when shouldCoverButton prop is false", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer shouldCoverButton={false} open onClose={() => {}}>
      Content
    </PopoverContainer>,
  );

  const closeButton = screen.getByRole("button", { name: "close" });

  await user.tab();
  await user.tab();

  expect(closeButton).toHaveFocus();

  await user.tab();

  expect(closeButton).not.toHaveFocus();
});

test.each([
  ["left", "bottom-end"],
  ["right", "bottom-start"],
  ["center", "bottom"],
] as const)(
  "computes popup positioning correctly when position prop is '%s'",
  async (position, placement) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer position={position}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    act(() => {
      jest.runOnlyPendingTimers();
    });
    const dialog = await screen.findByRole("dialog");

    await waitFor(() => {
      expect(dialog).toHaveAttribute("data-floating-placement", placement);
    });
  },
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

  it("calls onOpen callback when open button is clicked", async () => {
    const onOpen = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onOpen={onOpen}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it.each(["Space", "Enter"])(
    "calls onOpen callback when open button is opened via the %s key",
    async (key) => {
      const onOpen = jest.fn();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<PopoverContainer onOpen={onOpen}>Content</PopoverContainer>);

      act(() => {
        screen.getByRole("button").focus();
      });
      await user.keyboard(`[${key}]`);

      await waitFor(() => {
        expect(onOpen).toHaveBeenCalledTimes(1);
      });
    },
  );

  it("moves focus to dialog when popup is opened", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer>Ta da!</PopoverContainer>);

    const button = screen.getByRole("button");
    await user.click(button);
    const dialog = await screen.findByRole("dialog");

    expect(dialog).toHaveFocus();
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
    act(() => {
      closeButton.focus();
    });
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
      </>,
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

  it("calls onClose callback when close button is clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));

    await user.click(await screen.findByRole("button", { name: "close" }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it.each(["Space", "Enter"])(
    `calls onClose callback when close button is pressed via the %s key`,
    async (key) => {
      const onClose = jest.fn();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

      await user.click(screen.getByRole("button"));

      const closeButton = await screen.findByRole("button", { name: "close" });

      act(() => {
        closeButton.focus();
      });
      await user.keyboard(`[${key}]`);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    },
  );

  it("calls onClose when escape key is pressed and popover is open", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("does not call onClose when escape key is pressed and popover is closed", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  it("calls onClose when content outside of the popup is clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <>
        <PopoverContainer onClose={onClose}>Content</PopoverContainer>
        <p>Outside popup</p>
      </>,
    );

    await user.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    await user.click(screen.getByText("Outside popup"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("closes popup when open button is clicked twice", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <PopoverContainer openButtonAriaLabel="open popup" onClose={() => {}}>
        Content
      </PopoverContainer>,
    );

    const openButton = screen.getByRole("button", { name: "Actions" });
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
        <Select
          name="colour"
          id="colour"
          label="Select colour"
          value="1"
          onChange={() => {}}
        >
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
        </Select>
      </PopoverContainer>,
    );

    await user.click(screen.getByRole("button"));

    // open select list
    await user.click(await screen.findByRole("combobox"));
    await screen.findByRole("listbox");

    // should close select list only
    await user.keyboard("{Escape}");

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("closes the popup when Escape is pressed and a nested Select input is focused but closed", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <PopoverContainer onClose={onClose}>
        <Select
          name="colour"
          id="colour"
          label="Select colour"
          value="1"
          onChange={() => {}}
        >
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
        </Select>
      </PopoverContainer>,
    );

    await user.click(screen.getByRole("button"));
    (await screen.findByRole("combobox")).focus();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
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

  it("calls onClose once when tabbing off the last focusable element and parent does not update open state", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();

    render(
      <>
        <PopoverContainer title="Title" open onClose={onClose}>
          <button type="button">Inside</button>
        </PopoverContainer>
        <button type="button">Outside</button>
      </>,
    );

    screen.getByRole("button", { name: "Inside" }).focus();
    await user.tab();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it("closes and forwards focus when tabbing out of a popover with no focusable content", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <>
        <PopoverContainer
          open
          onClose={onClose}
          renderCloseComponent={() => <></>}
        >
          Just text
        </PopoverContainer>
        <button type="button">Outside</button>
      </>,
    );
    screen.getByRole("dialog").focus();
    await user.tab();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
  });
});

test("when content is navigated via keyboard, the next focusable item should be focused and popup closed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <>
      <PopoverContainer
        position="left"
        renderOpenComponent={({ ref, onClick }) => (
          <LegacyButton aria-label="open button" ref={ref} onClick={onClick}>
            Open
          </LegacyButton>
        )}
      >
        <RadioButtonGroup name="bar" value="1" onChange={() => {}}>
          <RadioButton value="1" label="radio 1" />
          <RadioButton value="2" label="radio 2" />
        </RadioButtonGroup>
      </PopoverContainer>
      <Button>Example Button</Button>
    </>,
  );

  const openButton = screen.getByRole("button", { name: "open button" });
  await user.click(openButton);
  await user.tab(); // tab to close icon
  await user.tab(); // tab to RadioButtonGroup
  await user.tab(); // tab to Example Button (outside of popup)
  const popup = await screen.findByRole("dialog");
  await waitFor(() => expect(popup).not.toBeVisible());

  const exampleButton = screen.getByRole("button", { name: "Example Button" });
  expect(exampleButton).toHaveFocus();
});

test("when the popover is opened and shift tab key is pressed, the open button should be focused and popup closed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <>
      <PopoverContainer
        position="left"
        renderOpenComponent={({ ref, onClick }) => (
          <Button aria-label="open button" ref={ref} onClick={onClick}>
            Open
          </Button>
        )}
      >
        <RadioButtonGroup name="bar" value="1" onChange={() => {}}>
          <RadioButton value="1" label="radio 1" />
          <RadioButton value="2" label="radio 2" />
        </RadioButtonGroup>
      </PopoverContainer>
      <Button>Example Button</Button>
    </>,
  );

  const openButton = screen.getByRole("button", { name: "open button" });
  await user.click(openButton);
  await user.tab(); // tab to close icon
  await user.tab(); // tab to content
  await user.tab({ shift: true }); // shift tab back to close icon
  await user.tab({ shift: true }); // shift tab back to the opening trigger element

  const popup = await screen.findByRole("dialog");
  await waitFor(() => expect(popup).not.toBeVisible());
  expect(openButton).toHaveFocus();
});

test("if only the open trigger is the only focusable element on screen, when the popover is opened and tab key is used to navigate content, it should navigate back to the opening trigger", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <>
      <PopoverContainer title="My popup" open />
    </>,
  );

  const openButton = screen.getByRole("button", { name: "Actions" });
  await user.click(openButton);
  await user.tab(); // tab to close icon
  await user.tab(); // tab back out of content to the opening trigger element

  expect(openButton).toHaveFocus();
});

test("renders with provided data- attributes", () => {
  render(
    <PopoverContainer data-element="bar" data-role="baz">
      Content
    </PopoverContainer>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// coverage
test("renders with correct width when hasFullWidth prop is true", () => {
  render(
    <PopoverContainer
      data-role="popover-container"
      title="My popup"
      hasFullWidth
    >
      Ta da!
    </PopoverContainer>,
  );

  expect(screen.getByTestId("popover-container")).toHaveStyle({
    width: "100%",
  });
});

testStyledSystemPadding(
  (props) => (
    <PopoverContainer open title="My popup" {...props}>
      Ta da!
    </PopoverContainer>
  ),
  () => screen.getByRole("dialog"),
);

test("should render with default padding when no padding props are passed", () => {
  render(
    <PopoverContainer open title="foo">
      Foo
    </PopoverContainer>,
  );

  expect(screen.getByRole("dialog")).toHaveStyleRule(
    "padding",
    "var(--global-space-comp-s)",
  );
});

test("should render with a z-index of 2000 if not within global header", () => {
  render(
    <PopoverContainer open title="My popup">
      Ta da!
    </PopoverContainer>,
  );

  const zIndex = getComputedStyle(screen.getByRole("dialog")).getPropertyValue(
    "z-index",
  );

  expect(zIndex).toContain("--adaptiveSidebarModalBackdrop");
  expect(zIndex).toContain("2000");
});

test("should render with a z-index of 10000 if within global header", () => {
  mockedUseGlobalHeader.mockReturnValue({ isWithinGlobalHeader: true });

  render(
    <PopoverContainer open title="My popup">
      Ta da!
    </PopoverContainer>,
  );

  const zIndex = getComputedStyle(screen.getByRole("dialog")).getPropertyValue(
    "z-index",
  );

  expect(zIndex).toContain("--adaptiveSidebarModalBackdrop");
  expect(zIndex).toContain("10000");

  mockedUseGlobalHeader.mockReset();
});

test("renders popover content under the trigger tree instead of mounting to body root", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <div data-role="root">
      <PopoverContainer>Content</PopoverContainer>
    </div>,
  );

  const openButton = screen.getByRole("button");
  await user.click(openButton);
  const dialog = await screen.findByRole("dialog");
  const expectedPortalTarget = screen.getByTestId("root");

  expect(expectedPortalTarget).toContainElement(dialog);
});

test("uses the TokensWrapper as the popover portal target when present", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <TokensWrapper>
      <PopoverContainer>Content</PopoverContainer>
    </TokensWrapper>,
  );

  await user.click(screen.getByRole("button"));
  await screen.findByRole("dialog");

  const tokensWrapper = screen.getByTestId("tokens-wrapper");
  const portalProvider = screen.getByTestId(
    "carbon-portal-scoped-tokens-provider",
  );

  expectDirectChild(portalProvider, tokensWrapper);
});

test("renders popover content under the global header tree instead of mounting to body root", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<PopoverInNavigation />);

  const openButton = screen.getByRole("button", { name: "Notifications" });
  await user.click(openButton);
  const dialog = await screen.findByRole("dialog");
  const expectedPortalTarget = screen.getByRole("navigation", {
    name: "Global Header",
  });

  expect(expectedPortalTarget).toContainElement(dialog);
});

test("renders popover content under the menu tree instead of mounting to body root", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<PopoverInNavigation withNav={false} />);

  const openButton = screen.getByRole("button", { name: "Notifications" });
  await user.click(openButton);
  const dialog = await screen.findByRole("dialog");
  const expectedPortalTarget = screen.getByTestId("menu-parent");

  expect(expectedPortalTarget).toContainElement(dialog);
});

test("focuses the trigger when there's no other focusable elements and RadioButtonGroup is present", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <PopoverContainer>
      <RadioButtonGroup name="bar" value="1" onChange={() => {}}>
        <RadioButton value="1" label="radio 1" />
        <RadioButton value="2" label="radio 2" />
      </RadioButtonGroup>
    </PopoverContainer>,
  );

  const openButton = screen.getByRole("button");
  await user.click(openButton);
  await user.tab(); // tab to close icon
  await user.tab(); // tab to RadioButtonGroup
  await user.tab();

  expect(openButton).toHaveFocus();
});

test("should support overriding the open button text via the I18nProvider", async () => {
  render(
    <I18nProvider
      locale={{
        popoverContainer: {
          openButton: {
            text: () => "Foo",
          },
        },
      }}
    >
      <PopoverContainer>Content</PopoverContainer>
    </I18nProvider>,
  );
  const openButton = screen.getByRole("button", { name: "Foo" });

  expect(openButton).toBeVisible();
});

// coverage likely can be deleted
test("should call the exposed `focusButton` method and focus the legacy open button", async () => {
  const MockComponent = () => {
    const handle = useRef<PopoverContainerHandle>(null);

    return (
      <>
        <Button
          onClick={() => {
            handle.current?.focusButton();
          }}
        >
          Focus
        </Button>
        <PopoverContainer
          ref={handle}
          renderOpenComponent={({
            ref,
            "aria-haspopup": ariaHasPopup,
            ...rest
          }) => (
            <LegacyButton
              type="button"
              ref={ref}
              aria-haspopup={ariaHasPopup}
              {...rest}
            >
              Legacy Button
            </LegacyButton>
          )}
        >
          Content
        </PopoverContainer>
      </>
    );
  };

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<MockComponent />);

  await user.click(screen.getByRole("button", { name: "Focus" }));

  const openButton = screen.getByRole("button", { name: "Legacy Button" });
  expect(openButton).toHaveFocus();
});

test("should focus the legacy open button when the close button is clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer
      renderOpenComponent={({
        ref,
        "aria-haspopup": ariaHasPopup,
        ...rest
      }) => (
        <LegacyButton
          type="button"
          ref={ref}
          aria-haspopup={ariaHasPopup}
          {...rest}
        >
          Legacy Button
        </LegacyButton>
      )}
    >
      Content
    </PopoverContainer>,
  );
  const openButton = screen.getByRole("button", { name: "Legacy Button" });
  await user.click(openButton);
  const closeButton = await screen.findByRole("button", { name: "close" });
  await user.click(closeButton);

  expect(openButton).toHaveFocus();
});

test("should focus the legacy open button when the user tabs until the popover closes", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer
      renderOpenComponent={({
        ref,
        "aria-haspopup": ariaHasPopup,
        ...rest
      }) => (
        <LegacyButton
          type="button"
          ref={ref}
          aria-haspopup={ariaHasPopup}
          {...rest}
        >
          Legacy Button
        </LegacyButton>
      )}
    >
      Content
    </PopoverContainer>,
  );
  const openButton = screen.getByRole("button", { name: "Legacy Button" });
  await user.click(openButton);
  await user.tab(); // close focused
  await user.tab(); // closes popover and should focus back on open button

  expect(openButton).toHaveFocus();
});

const menuItemOpenComponent = ({ onClick }: RenderOpenProps) => (
  <MenuItem data-role="notifications-item" onClick={onClick}>
    Notifications
  </MenuItem>
);

const buttonOpenComponent = ({ ref, onClick }: RenderOpenProps) => (
  <button type="button" ref={ref} onClick={onClick}>
    Open
  </button>
);

// asserts the wrapper elements rendered outside of a menu list item placement
const expectWrapperElements = () => {
  const button = screen.getByRole("button", { name: "Open" });

  expect(screen.getByTestId("pc")).toContainElement(button);
  // the class is the only identifier of the open component's wrapper element
  // eslint-disable-next-line testing-library/no-node-access
  expect(button.parentElement).toHaveClass("popover-open-component");
};

describe("when rendered as a list item of a Menu", () => {
  it("renders the open component's list item as a direct child of the list", () => {
    render(
      <Menu>
        <MenuItem href="/home">Home</MenuItem>
        <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
          Content
        </PopoverContainer>
      </Menu>,
    );

    expectDirectChild(
      screen.getByTestId("notifications-item"),
      screen.getByRole("list"),
    );
  });

  it("opens the popup outside of the list, under the menu's parent", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <div data-role="menu-parent">
        <Menu>
          <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
            Content
          </PopoverContainer>
        </Menu>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeVisible();
    expect(screen.getByRole("list")).not.toContainElement(dialog);
    expect(screen.getByTestId("menu-parent")).toContainElement(dialog);
  });

  it("closes the popup when the open component is clicked twice", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <Menu>
        <PopoverContainer
          onClose={onClose}
          renderOpenComponent={menuItemOpenComponent}
        >
          Content
        </PopoverContainer>
      </Menu>,
    );

    const openButton = screen.getByRole("button", { name: "Notifications" });
    await user.click(openButton);
    await screen.findByRole("dialog");
    await user.click(openButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes the popup when outside content is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <>
        <Menu>
          <PopoverContainer
            onClose={onClose}
            renderOpenComponent={menuItemOpenComponent}
          >
            Content
          </PopoverContainer>
        </Menu>
        <p>Outside</p>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByText("Outside"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close the popup when its content is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <Menu>
        <PopoverContainer
          onClose={onClose}
          renderOpenComponent={menuItemOpenComponent}
        >
          Content
        </PopoverContainer>
      </Menu>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByText("Content"));

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not close the popup when an option of a nested Select is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <Menu>
        <PopoverContainer
          title="Settings"
          onClose={onClose}
          renderOpenComponent={menuItemOpenComponent}
        >
          <Select
            name="colour"
            id="colour"
            label="Select colour"
            value="1"
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
          </Select>
        </PopoverContainer>
      </Menu>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await user.click(await screen.findByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Black" }));

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not close the popup when its backdrop is clicked within a table body", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(
      <TableBodyContext.Provider value={{ isInTable: true }}>
        <Menu>
          <PopoverContainer
            onClose={onClose}
            renderOpenComponent={menuItemOpenComponent}
          >
            Content
          </PopoverContainer>
        </Menu>
      </TableBodyContext.Provider>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByTestId("popup-backdrop"));

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("ignores the hasFullWidth prop", () => {
    render(
      <Menu>
        <PopoverContainer
          hasFullWidth
          renderOpenComponent={menuItemOpenComponent}
        >
          Content
        </PopoverContainer>
      </Menu>,
    );

    const listItem = screen.getByTestId("notifications-item");

    expectDirectChild(listItem, screen.getByRole("list"));
    expect(listItem).not.toHaveStyle({ width: "100%" });
  });

  it("closes the popup and refocuses the open component when Escape is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <Menu>
        <PopoverContainer renderOpenComponent={buttonOpenComponent}>
          Content
        </PopoverContainer>
      </Menu>,
    );

    const openButton = screen.getByRole("button", { name: "Open" });
    await user.click(openButton);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(openButton).toHaveFocus();
  });

  it("renders the popup under the global header tree", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <GlobalHeader>
        <Menu>
          <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
            Content
          </PopoverContainer>
        </Menu>
      </GlobalHeader>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      screen.getByRole("navigation", { name: "Global Header" }),
    ).toContainElement(dialog);
  });

  it("renders the popup when the open component renders nothing", async () => {
    render(
      <Menu>
        <PopoverContainer open renderOpenComponent={() => <></>}>
          Content
        </PopoverContainer>
      </Menu>,
    );

    expect(await screen.findByRole("dialog")).toBeVisible();
  });
});

describe("when rendered as a list item of a submenu", () => {
  const SubmenuWithPopover = () => (
    <Menu>
      <MenuItem clickToOpen submenu="More">
        <MenuItem href="#">Sub one</MenuItem>
        <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
          Content
        </PopoverContainer>
      </MenuItem>
    </Menu>
  );

  it("renders the open component's list item as a direct child of the submenu list", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SubmenuWithPopover />);

    await user.click(screen.getByRole("button", { name: "More" }));

    const [, submenuList] = screen.getAllByRole("list");

    expect(submenuList).toHaveAttribute("data-component", "submenu");
    expectDirectChild(screen.getByTestId("notifications-item"), submenuList);
  });

  it("does not affect submenu keyboard navigation", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SubmenuWithPopover />);

    act(() => {
      screen.getByRole("button", { name: "More" }).focus();
    });
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("link", { name: "Sub one" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("button", { name: "Notifications" })).toHaveFocus();
  });
});

describe("when nested inside a MenuItem's content", () => {
  it("renders the wrapper elements within a Menu", () => {
    render(
      <Menu>
        <MenuItem>
          <PopoverContainer
            data-role="pc"
            renderOpenComponent={buttonOpenComponent}
          />
        </MenuItem>
      </Menu>,
    );

    expectWrapperElements();
    expect(screen.getByRole("listitem")).toContainElement(
      screen.getByTestId("pc"),
    );
  });

  it("renders the wrapper elements within a submenu", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <Menu>
        <MenuItem clickToOpen submenu="More">
          <MenuItem>
            <PopoverContainer
              data-role="pc"
              renderOpenComponent={buttonOpenComponent}
            />
          </MenuItem>
        </MenuItem>
      </Menu>,
    );

    await user.click(screen.getByRole("button", { name: "More" }));

    expectWrapperElements();
    const [, submenuList] = screen.getAllByRole("list");
    expect(submenuList).toContainElement(screen.getByTestId("pc"));
  });
});

describe("when not rendered inside a Menu", () => {
  it("renders the wrapper elements", () => {
    render(
      <PopoverContainer
        data-role="pc"
        renderOpenComponent={buttonOpenComponent}
      />,
    );

    expectWrapperElements();
  });

  it("does not close the popup when its content is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(<PopoverContainer onClose={onClose}>Content</PopoverContainer>);

    await user.click(screen.getByRole("button"));
    await screen.findByRole("dialog");

    await user.click(screen.getByText("Content"));

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(onClose).not.toHaveBeenCalled();
  });
});

const listItemOpenComponent = ({ onClick }: RenderOpenProps) => (
  <li>
    <button type="button" onClick={onClick}>
      Notifications
    </button>
  </li>
);

describe("behaviour as a menu list item", () => {
  const setup = () =>
    userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  it("does not call onClose on an outside click while a controlled popup is closed", async () => {
    const user = setup();
    const onClose = jest.fn();
    render(
      <>
        <Menu>
          <PopoverContainer
            open={false}
            onClose={onClose}
            renderOpenComponent={menuItemOpenComponent}
          >
            Content
          </PopoverContainer>
        </Menu>
        <p>Outside</p>
      </>,
    );

    await user.click(screen.getByText("Outside"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("requests closing, but stays open, when a controlled popup is clicked away from", async () => {
    const user = setup();
    const onClose = jest.fn();
    render(
      <>
        <Menu>
          <PopoverContainer
            open
            onClose={onClose}
            renderOpenComponent={menuItemOpenComponent}
          >
            Content
          </PopoverContainer>
        </Menu>
        <p>Outside</p>
      </>,
    );

    await user.click(screen.getByText("Outside"));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("closes the popup when another item of the menu is clicked", async () => {
    const user = setup();
    render(
      <Menu>
        <MenuItem onClick={() => {}}>Other</MenuItem>
        <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
          Content
        </PopoverContainer>
      </Menu>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Other" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes the first popup when the open component of a second one is clicked", async () => {
    const user = setup();
    render(
      <Menu>
        <PopoverContainer
          containerAriaLabel="first"
          renderOpenComponent={menuItemOpenComponent}
        >
          First content
        </PopoverContainer>
        <PopoverContainer
          containerAriaLabel="second"
          renderOpenComponent={buttonOpenComponent}
        >
          Second content
        </PopoverContainer>
      </Menu>,
    );

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    await screen.findByRole("dialog", { name: "first" });
    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("dialog", { name: "second" })).toBeVisible();
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "first" }),
      ).not.toBeInTheDocument();
    });
  });

  it("closes the popup and refocuses the open component when the close button is clicked", async () => {
    const user = setup();
    render(
      <Menu>
        <PopoverContainer renderOpenComponent={buttonOpenComponent}>
          Content
        </PopoverContainer>
      </Menu>,
    );

    const openButton = screen.getByRole("button", { name: "Open" });
    await user.click(openButton);
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(openButton).toHaveFocus();
  });

  it("closes the popup and refocuses the open component when shift+tab is pressed on the close button", async () => {
    const user = setup();
    render(
      <Menu>
        <PopoverContainer
          title="Title"
          renderOpenComponent={buttonOpenComponent}
        >
          Content
        </PopoverContainer>
      </Menu>,
    );

    const openButton = screen.getByRole("button", { name: "Open" });
    await user.click(openButton);
    await screen.findByRole("dialog");
    act(() => {
      screen.getByRole("button", { name: "close" }).focus();
    });
    await user.tab({ shift: true });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(openButton).toHaveFocus();
  });

  it("focuses the open component through the focusButton method", async () => {
    const user = setup();
    const Component = () => {
      const ref = useRef<PopoverContainerHandle>(null);

      return (
        <>
          <button type="button" onClick={() => ref.current?.focusButton()}>
            Focus it
          </button>
          <Menu>
            <PopoverContainer
              ref={ref}
              renderOpenComponent={buttonOpenComponent}
            />
          </Menu>
        </>
      );
    };
    render(<Component />);

    await user.click(screen.getByRole("button", { name: "Focus it" }));

    expect(screen.getByRole("button", { name: "Open" })).toHaveFocus();
  });

  it("places an initially open popup under the menu's parent", async () => {
    render(
      <div data-role="menu-parent">
        <Menu>
          <PopoverContainer open renderOpenComponent={menuItemOpenComponent}>
            Content
          </PopoverContainer>
        </Menu>
      </div>,
    );

    const dialog = await screen.findByRole("dialog");
    expect(screen.getByTestId("menu-parent")).toContainElement(dialog);
    expect(screen.getByRole("list")).not.toContainElement(dialog);
  });

  it("still treats the open component as inside after its root element changes", async () => {
    const user = setup();
    const onClose = jest.fn();
    const Component = ({ variant }: { variant: "a" | "b" }) => (
      <Menu>
        <PopoverContainer
          onClose={onClose}
          renderOpenComponent={({ onClick }) =>
            variant === "a" ? (
              <li key="a">
                <button type="button" onClick={onClick}>
                  First
                </button>
              </li>
            ) : (
              <li key="b">
                <button type="button" onClick={onClick}>
                  Second
                </button>
              </li>
            )
          }
        >
          Content
        </PopoverContainer>
      </Menu>
    );
    const { rerender } = render(<Component variant="a" />);
    rerender(<Component variant="b" />);

    const openButton = screen.getByRole("button", { name: "Second" });
    await user.click(openButton);
    await screen.findByRole("dialog");
    await user.click(openButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("uses a TokensWrapper as the portal target when there is no menu element", async () => {
    render(
      <TokensWrapper>
        <MenuContext.Provider value={{ inMenu: true }}>
          <ul>
            <PopoverContainer open renderOpenComponent={listItemOpenComponent}>
              Content
            </PopoverContainer>
          </ul>
        </MenuContext.Provider>
      </TokensWrapper>,
    );

    const dialog = await screen.findByRole("dialog");
    expect(screen.getByTestId("tokens-wrapper")).toContainElement(dialog);
    expect(screen.getByRole("list")).not.toContainElement(dialog);
  });

  it("falls back to the parent list as the portal target when there is no better one", async () => {
    render(
      <MenuContext.Provider value={{ inMenu: true }}>
        <ul>
          <PopoverContainer open renderOpenComponent={listItemOpenComponent}>
            Content
          </PopoverContainer>
        </ul>
      </MenuContext.Provider>,
    );

    const dialog = await screen.findByRole("dialog");
    expect(screen.getByRole("list")).toContainElement(dialog);
    expect(screen.getByRole("listitem")).not.toContainElement(dialog);
  });

  it("applies the provided data- attributes", () => {
    render(
      <Menu>
        <PopoverContainer
          data-element="bar"
          data-role="baz"
          renderOpenComponent={menuItemOpenComponent}
        >
          Content
        </PopoverContainer>
      </Menu>,
    );

    expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
  });
  it("renders no wrapper elements within a fullscreen menu", async () => {
    render(
      <Menu>
        <MenuFullscreen isOpen onClose={() => {}}>
          <PopoverContainer renderOpenComponent={menuItemOpenComponent}>
            Content
          </PopoverContainer>
        </MenuFullscreen>
      </Menu>,
    );

    const listItem = await screen.findByTestId("notifications-item");
    const [, fullscreenList] = screen.getAllByRole("list");

    expectDirectChild(listItem, fullscreenList);
  });

  it("renders the wrapper elements for content nested in the popup of a list item", async () => {
    render(
      <Menu>
        <PopoverContainer open renderOpenComponent={menuItemOpenComponent}>
          <PopoverContainer
            data-role="pc"
            renderOpenComponent={buttonOpenComponent}
          />
        </PopoverContainer>
      </Menu>,
    );

    await screen.findByRole("dialog");

    expectWrapperElements();
  });
});
