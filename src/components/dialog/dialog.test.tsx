import React, { useState } from "react";
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CarbonProvider from "../carbon-provider";
import Dialog, { DialogHandle, DialogProps } from ".";
import Logger from "../../__internal__/utils/logger";
import Form from "../form";
import { StyledHeader, StyledHeading } from "../heading/heading.style";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import StyledIconButton from "../icon-button/icon-button.style";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const ControlledFullScreenDialog = ({
  onCancel,
  startOpen = true,
}: {
  onCancel: () => void;
  startOpen?: boolean;
}) => {
  const [open, setOpen] = useState(startOpen);
  return (
    <Dialog
      fullscreen
      open={open}
      onCancel={() => {
        onCancel();
        setOpen(false);
      }}
      showCloseIcon
    />
  );
};

describe("Deprecation warnings", () => {
  test("logs a deprecation warning when disableClose is used", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(<Dialog fullscreen open disableClose />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The disableClose prop in Dialog is deprecated and will soon be removed.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockRestore();
  });

  test("logs a deprecation warning when pagesStyling is used", async () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(<Dialog fullscreen pagesStyling open />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The pagesStyling prop in Dialog is deprecated and will soon be removed.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockRestore();
  });

  test("logs a deprecation warning when timeout is used", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(<Dialog open timeout={1000} />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The timeout prop in Dialog is deprecated and will soon be removed.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockRestore();
  });
});

describe("Modal Dialog", () => {
  test("passes className prop to the dialog element", () => {
    render(<Dialog open title="My dialog" className="custom-class" />);

    const dialog = screen.getByTestId("modal");
    expect(dialog).toHaveClass("custom-class");
  });

  test("dialog element has aria-modal attribute set to true when open", () => {
    render(
      <CarbonProvider>
        <Dialog open title="My dialog" />
      </CarbonProvider>,
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
      />,
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
      />,
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Custom subtitle",
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
      screen.queryByRole("button", { name: /Close/i }),
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
        </CarbonProvider>,
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
        </CarbonProvider>,
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
        </CarbonProvider>,
      );

      const closeButton = screen.getByRole("button", { name: /Close/i });
      act(() => closeButton.focus());
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
        </CarbonProvider>,
      );

      const closeButton = screen.getByRole("button", { name: /Close/i });
      act(() => closeButton.focus());
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
        </CarbonProvider>,
      );

      const closeButton = screen.getByRole("button", { name: /Close/i });
      act(() => closeButton.focus());
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
      </CarbonProvider>,
    );

    const button = screen.getByRole("button", { name: /Refocus dialog/i });
    await user.click(button);

    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  test("first focusable element is not focused when disableAutoFocus prop is passed", () => {
    render(
      <CarbonProvider>
        <Dialog open title="My dialog" disableAutoFocus>
          <button type="button">Focus me</button>
        </Dialog>
      </CarbonProvider>,
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
    render(
      <Dialog open title="My dialog" data-element="foo" data-role="bar" />,
    );

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
      />,
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
      </Dialog>,
    );
    expect(screen.getByTestId("dialog-content")).toHaveStyle(
      "overflow-y: auto",
    );
  });

  test("no padding is rendered around dialog content, when zero padding is specified via contentPadding prop", () => {
    render(
      <Dialog open title="My dialog" contentPadding={{ p: 0 }}>
        Inner content
      </Dialog>,
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
      </CarbonProvider>,
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleName("Inner dialog");

    await user.click(screen.getByRole("button", { name: /Close/i }));

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Outer dialog");
    expect(document.body).toHaveStyle("overflow: hidden");
  });

  test("should render with the highlight when 'ai' is passed in as the `highlightVariant`", () => {
    render(
      <Dialog open title="My dialog" highlightVariant="ai">
        Inner content
      </Dialog>,
    );

    const highlightElement = screen.getByRole("dialog");
    expect(highlightElement).toHaveStyleRule(
      "background",
      `linear-gradient( 90deg, #00d639 0%, #00d6de 40%, #9d60ff 90% )`,
      {
        modifier: "::before",
      },
    );

    expect(highlightElement).toBeVisible();
  });
});

describe("Fullscreen Dialog", () => {
  test("dialog element has aria-modal attribute set to true when open", () => {
    render(
      <CarbonProvider>
        <Dialog fullscreen open />
      </CarbonProvider>,
    );

    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  test("open dialog element does not have aria-modal attribute set to true when role is not `dialog`", () => {
    render(
      <CarbonProvider>
        <Dialog fullscreen open role="main" />
      </CarbonProvider>,
    );

    expect(screen.getByRole("main")).not.toHaveAttribute("aria-modal");
  });

  test("the contentRef prop is forwarded to the dialog content", () => {
    const mockRef = {
      current: null,
    };

    render(<Dialog fullscreen open contentRef={mockRef} />);

    expect(mockRef?.current).toBe(screen.getByTestId("dialog-content"));
  });

  test("the dialog container should be focused when the dialog opens", async () => {
    render(
      <Dialog fullscreen open>
        <input type="text" placeholder="input" />
      </Dialog>,
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveFocus();
    });
  });

  test("the dialog container should not be focused when the dialog opens if the disableAutofocus prop is set", () => {
    jest.useFakeTimers();
    render(
      <Dialog fullscreen open disableAutoFocus>
        <input type="text" placeholder="input" />
      </Dialog>,
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
      <Dialog fullscreen focusFirstElement={inputRef} open>
        <label htmlFor="should-not-be-focused">
          should not be focused
          <input type="text" id="should-not-be-focused" />
        </label>
        <label htmlFor="should-be-focused">
          should be focused
          <input type="text" ref={inputRef} id="should-be-focused" />
        </label>
      </Dialog>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("should be focused")).toHaveFocus();
    });
  });

  test("all dialog children are rendered", () => {
    render(
      <Dialog fullscreen open>
        <button type="button" data-role="first-child">
          first child
        </button>
        <div data-role="second-child">second child</div>
        <p data-role="third-child">third child</p>
      </Dialog>,
    );

    expect(screen.getByTestId("first-child")).toBeVisible();
    expect(screen.getByTestId("second-child")).toBeVisible();
    expect(screen.getByTestId("third-child")).toBeVisible();
  });

  test("background scroll is disabled while the dialog is open", () => {
    render(<Dialog fullscreen open />);

    expect(document.body).toHaveStyle({ overflow: "hidden" });
  });

  test("background scroll is restored when the dialog is closed", () => {
    const { rerender } = render(<Dialog fullscreen open />);
    rerender(<Dialog fullscreen open={false} />);

    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  test("background scroll is restored when the dialog is unmounted", () => {
    const { unmount } = render(<Dialog fullscreen open />);
    unmount();

    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  test("renders the `title` prop in a level 1 heading when passed as a string", () => {
    render(<Dialog fullscreen open title="my title" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "my title",
    );
  });

  test("renders the specified element when the `title` prop is passed as a  React Element", () => {
    render(
      <Dialog
        fullscreen
        open
        title={<div data-role="custom-title-element">my title</div>}
      />,
    );

    expect(screen.getByTestId("custom-title-element")).toHaveTextContent(
      "my title",
    );
  });

  test("renders a help icon next to the title when the `help` prop is provided", () => {
    render(<Dialog fullscreen title="my title" open help="help text" />);

    expect(screen.getByRole("button", { name: "help" })).toBeVisible();
  });

  test("accepts `data-element` and `data-role` props to be passed to the underlying element", () => {
    render(<Dialog fullscreen open data-role="baz" data-element="bar" />);

    expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
  });

  test("no close button is rendered if the `showCloseIcon` prop is set to `false`", () => {
    render(
      <Dialog fullscreen open onCancel={() => {}} showCloseIcon={false} />,
    );

    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  test("no close button is rendered if the `onCancel` callback prop is not provided", () => {
    render(<Dialog fullscreen open showCloseIcon />);

    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  test("renders the close button when both `onCancel` and `showCloseIcon` are provided", () => {
    render(<Dialog fullscreen open onCancel={() => {}} />);

    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  });

  test("allows custom data props to be passed to the close button", () => {
    render(
      <Dialog
        fullscreen
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
      <Dialog
        fullscreen
        open
        headerChildren={<a href="/foo">link as header child</a>}
      />,
    );
    expect(
      screen.getByRole("link", { name: "link as header child" }),
    ).toBeVisible();
  });

  test("does not render anything if no `headerChildren` prop is provided", () => {
    render(<Dialog fullscreen open />);

    const link = screen.queryByRole("link");

    expect(link).not.toBeInTheDocument();
  });

  // test here for coverage only - disableContentPadding prop already tested in both Playwright and Chromatic
  test("padding is removed from the content when the `disableContentPadding` prop is passed", () => {
    render(
      <Dialog fullscreen open disableContentPadding>
        <div>test content</div>
      </Dialog>,
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveStyle({
      padding: "0px 0px 0px 0px",
    });
  });

  /** Remove this when after Pages is re-written */
  // TODO: in for coverage only. Prop appears not to be used - to be removed (FE-6774)
  test.skip("applies the appropriate styles when the `pagesStyling` prop is set", () => {
    render(<Dialog fullscreen open pagesStyling />);

    const dialog = screen.getByRole("dialog");

    // expect(screen.getByTestId("dialog-content")).toHaveStyleRule(
    //   "padding",
    //   "0",
    //   // {
    //   //   modifier: `${StyledDialogContent}`,
    //   // },
    // );

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
    expect(dialog).toHaveStyleRule("padding", "32px 32px 0", {
      modifier: `${StyledFullScreenHeading}`,
    });
  });

  /* TODO: (FE-6781) Update these tests to use toHaveStyle to avoid false positives:
  - toHaveStyle({ "overflow-y": "auto" })
  - toHaveStyle({ "overflow-y": "inherit" })
  This requires upgrading jsdom, as :has() is not supported in jsdom before v23.2.0.
  toHaveStyleRule is currently used, but it is less strict and passes even if styles are overridden. */
  test("when a Form child does not have a sticky footer, overflow styling is set on the dialog content", () => {
    render(
      <Dialog fullscreen open>
        <Form />
      </Dialog>,
    );

    expect(screen.getByTestId("dialog-content")).toHaveStyleRule(
      "overflow-y",
      "auto",
    );
  });

  test("when the `title` prop is a string, this value is set as the dialog's accessible name", () => {
    render(<Dialog fullscreen open title="Test" />);

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Test");
  });

  test("when the `title` and `subtitle` props are provided, the subtitle is set as the dialog's accessible description", () => {
    render(<Dialog fullscreen open title="Title" subtitle="Subtitle" />);

    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Subtitle");
  });

  test("when the `title` prop is a React element and the `aria-labelledby` prop is provided, it is passed to the dialog container", () => {
    render(
      <>
        <h2 id="test-id">custom title</h2>
        <Dialog
          fullscreen
          open
          title={<h2>test</h2>}
          aria-labelledby="test-id"
        />
      </>,
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName("custom title");
  });

  test("when the `subtitle` prop is a React element and the `aria-describedby` prop is provided, it is passed to the dialog container", () => {
    render(
      <>
        <h2 id="test-id">custom description</h2>
        <Dialog
          fullscreen
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
      <Dialog fullscreen open role="alert">
        dialog content
      </Dialog>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("dialog content");
  });

  test("when the `title` prop is not passed and the `aria-label` prop is provided, it is passed to the dialog container as its accessible name", () => {
    render(<Dialog fullscreen open aria-label="custom label" />);

    expect(screen.getByRole("dialog")).toHaveAccessibleName("custom label");
  });

  test("the onCancel callback should be called when the close button is clicked", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onCancel = jest.fn();
    render(<ControlledFullScreenDialog onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    act(() => {
      // need to use fake timers here rather than waitFor to ensure that the test fails if this feature ever
      // gets broken - using waitFor would always pass as the dialog is already visible (and onCancel not called)
      // at this point
      jest.runAllTimers();
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test("the onCancel callback should be called when the enter key is pressed", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onCancel = jest.fn();
    render(<ControlledFullScreenDialog onCancel={onCancel} />);

    act(() => {
      screen.getByRole("button", { name: "Close" }).focus();
    });
    await user.keyboard("{Enter}");

    act(() => {
      // need to use fake timers here rather than waitFor to ensure that the test fails if this feature ever
      // gets broken - using waitFor would always pass as the dialog is already visible (and onCancel not called)
      // at this point
      jest.runAllTimers();
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test("the onCancel callback should not be called when a non-Enter key is pressed", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onCancel = jest.fn();
    render(<ControlledFullScreenDialog onCancel={onCancel} />);

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
});
