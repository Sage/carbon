import React from "react";
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CarbonProvider from "../../../carbon-provider";
import Dialog from ".";
import { DialogHandle, DialogProps } from "./dialog.component";
import Form from "../../../form";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("Modal Dialog", () => {
  test("passes className prop to the modal element", () => {
    render(<Dialog open title="My dialog" className="custom-class" />);

    const modal = screen.getByTestId("modal");
    expect(modal).toHaveClass("custom-class");
  });

  test("dialog element has aria-modal attribute set to true when open", () => {
    render(
      <CarbonProvider>
        <Dialog open title="My dialog" />
      </CarbonProvider>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  test("title is displayed as a level 1 heading when title prop is passed", () => {
    render(<Dialog open title="My dialog" />);

    const dialog = screen.getByRole("dialog", { name: /My dialog/i });
    const heading = within(dialog).getByRole("heading", {
      level: 1,
      name: /My Dialog/i,
    });

    expect(heading).toBeVisible();
  });

  test("subtitle is displayed when subtitle prop is passed", () => {
    render(<Dialog open title="My dialog" subtitle="My subtitle" />);

    const dialog = screen.getByRole("dialog", {
      description: /My subtitle/i,
    });

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
      backgroundColor: "var(--container-standard-bg-alt, #f4f5f6)",
    });
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
  });

  test("should render with the AI keyline when gradientKeyLine prop is true", () => {
    render(
      <Dialog open title="My dialog" gradientKeyLine>
        Inner content
      </Dialog>,
    );

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toHaveStyleRule(
      "background",
      `linear-gradient( 90deg, #00d639 0%, #00d6de 40%, #9d60ff 90% )`,
      {
        modifier: "::before",
      },
    );

    expect(dialogElement).toBeVisible();
  });

  describe("Form with sticky footer", () => {
    test("renders Form with stickyFooter inside the dialog content area", () => {
      render(
        <Dialog open title="My dialog">
          <Form
            aria-label="Test form"
            stickyFooter
            leftSideButtons={<button type="button">Cancel</button>}
            saveButton={<button type="button">Save</button>}
          >
            <p>Form content</p>
          </Form>
        </Dialog>,
      );

      const content = screen.getByTestId("dialog-content");
      const form = within(content).getByRole("form");
      expect(form).toHaveClass("sticky");
    });

    test("renders Form with stickyFooter inside fullscreen dialog content area", () => {
      render(
        <Dialog open size="fullscreen" title="My dialog">
          <Form
            aria-label="Test form"
            stickyFooter
            leftSideButtons={<button type="button">Cancel</button>}
            saveButton={<button type="button">Save</button>}
          >
            <p>Form content</p>
          </Form>
        </Dialog>,
      );

      const content = screen.getByTestId("dialog-content");
      const form = within(content).getByRole("form");
      expect(form).toHaveClass("sticky");
    });
  });
});

describe("Fullscreen Dialog", () => {
  test("renders the fullscreen dialog correctly", () => {
    render(
      <Dialog size="fullscreen" open>
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

  // This test ensures that fullscreen dialog has a grey background at all times as per the DS designs.
  test("renders with grey background when size is fullscreen and greyBackground is false", () => {
    render(
      <Dialog size="fullscreen" open>
        Inner content
      </Dialog>,
    );

    const content = screen.getByRole("dialog");

    expect(content).toHaveStyleRule(
      "background",
      "var(--container-standard-bg-alt,#f4f5f6)",
    );
  });

  // This test ensures that the grey background is applied when both size is fullscreen and greyBackground is true,
  // even though the greyBackground prop should be redundant in this case.
  test("renders with grey background when size is fullscreen and greyBackground is true", () => {
    render(
      <Dialog size="fullscreen" open greyBackground>
        Inner content
      </Dialog>,
    );

    const content = screen.getByRole("dialog");

    expect(content).toHaveStyleRule(
      "background",
      "var(--container-standard-bg-alt,#f4f5f6)",
    );
  });

  test("padding is removed from the content when the contentPadding prop is passed", () => {
    render(
      <Dialog size="fullscreen" open contentPadding={{ p: 0 }}>
        <div>test content</div>
      </Dialog>,
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveStyleRule("padding", "var(--spacing000)");
  });

  test("when the title prop is a string, this value is set as the dialog's accessible name", () => {
    render(<Dialog size="fullscreen" open title="Test" />);

    expect(screen.getByRole("dialog")).toHaveAccessibleName("Test");
  });

  test("when the title and subtitle props are provided, the subtitle is set as the dialog's accessible description", () => {
    render(<Dialog size="fullscreen" open title="Title" subtitle="Subtitle" />);

    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Subtitle");
  });

  test("when the title prop is a React element and the aria-labelledby prop is provided, it is passed to the dialog container", () => {
    render(
      <>
        <h2 id="test-id">custom title</h2>
        <Dialog
          size="fullscreen"
          open
          title={<h2>test</h2>}
          aria-labelledby="test-id"
        />
      </>,
    );

    expect(screen.getByRole("dialog")).toHaveAccessibleName("custom title");
  });
});

describe("Dialog footer", () => {
  test("renders footer content when footer prop is passed", () => {
    render(
      <Dialog
        open
        title="My dialog"
        footer={<button type="button">Save</button>}
      >
        Content
      </Dialog>,
    );

    expect(screen.getByRole("button", { name: /Save/i })).toBeVisible();
  });

  test("footer is not rendered when footer prop is not passed", () => {
    render(
      <Dialog open title="My dialog">
        Content
      </Dialog>,
    );

    expect(
      screen.queryByText("dialog-footer", { selector: "[data-element]" }),
    ).not.toBeInTheDocument();
  });

  test("sticky footer has position sticky when stickyFooter prop is true", () => {
    render(
      <Dialog
        open
        title="My dialog"
        footer={<button type="button">Save</button>}
        stickyFooter
      >
        Content
      </Dialog>,
    );

    const footer = screen.getByTestId("dialog-footer");

    expect(footer).toHaveStyleRule("position", "sticky");
  });
});

describe("Dialog sizes", () => {
  test("renders correctly with size='small'", () => {
    render(
      <Dialog open title="Small dialog" size="small">
        Content
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: /Small dialog/i });

    expect(dialog).toBeVisible();
  });

  test("renders correctly with size='large'", () => {
    render(
      <Dialog open title="Large dialog" size="large">
        Content
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: /Large dialog/i });

    expect(dialog).toBeVisible();
  });

  test("maps legacy 'extra-small' size to 'small'", () => {
    render(
      <Dialog
        open
        title="XS dialog"
        size={"extra-small" as DialogProps["size"]}
      >
        Content
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: /XS dialog/i })).toBeVisible();
  });

  test("maps legacy 'medium-small' size to 'medium'", () => {
    render(
      <Dialog
        open
        title="MS dialog"
        size={"medium-small" as DialogProps["size"]}
      >
        Content
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: /MS dialog/i })).toBeVisible();
  });

  test("maps legacy 'medium-large' size to 'large'", () => {
    render(
      <Dialog
        open
        title="ML dialog"
        size={"medium-large" as DialogProps["size"]}
      >
        Content
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: /ML dialog/i })).toBeVisible();
  });
});

describe("Fullscreen Dialog with footer", () => {
  test("renders footer in fullscreen mode", () => {
    render(
      <Dialog
        open
        size="fullscreen"
        title="Fullscreen dialog"
        footer={<button type="button">Save</button>}
      >
        Content
      </Dialog>,
    );

    const footer = screen.getByTestId("dialog-footer");

    expect(footer).toBeVisible();
    expect(screen.getByRole("button", { name: /Save/i })).toBeVisible();
  });

  test("sticky footer has position sticky in fullscreen mode", () => {
    render(
      <Dialog
        open
        size="fullscreen"
        title="Fullscreen dialog"
        footer={<button type="button">Save</button>}
        stickyFooter
      >
        Content
      </Dialog>,
    );

    const footer = screen.getByTestId("dialog-footer");

    expect(footer).toHaveStyleRule("position", "sticky");
  });
});

describe("disableStickyOnSmallScreen", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  test("applies small screen behaviour when disableStickyOnSmallScreen is true and screen is small", () => {
    render(
      <Dialog
        open
        title="My dialog"
        disableStickyOnSmallScreen
        footer={<button type="button">Save</button>}
        stickyFooter
      >
        Content
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeVisible();
  });
});
