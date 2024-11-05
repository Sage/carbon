import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { StyledAccordionHeadingsContainer } from "./accordion.style";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Textbox from "../textbox";
import { Accordion } from ".";
import AccordionGroup from "./accordion-group/accordion-group.component";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../hooks/__internal__/useResizeObserver");

describe("Accordion", () => {
  it("should display deprecation warning for `scheme` prop once", () => {
    const loggerSpy = jest
      .spyOn(Logger, "deprecate")
      .mockImplementation(() => {});

    render(<Accordion scheme="transparent" title="Title" />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The `scheme` prop for `Accordion` component is deprecated and will soon be removed.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockReset();
  });

  it("should display deprecation warning for `buttonHeading` prop once", () => {
    const loggerSpy = jest
      .spyOn(Logger, "deprecate")
      .mockImplementation(() => {});

    render(<Accordion buttonHeading title="Title" />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The `buttonHeading` prop for `Accordion` component is deprecated and will soon be removed. Please use `subtle` variant instead.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockReset();
  });

  it("should render `title` as a React element", () => {
    render(<Accordion title={<div id="customTitle">Title content</div>} />);

    expect(screen.getByText("Title content")).toBeVisible();
    expect(screen.getByText("Title content")).toHaveAttribute(
      "id",
      "customTitle",
    );
  });

  it("mounts expanded when `expanded` prop is passed as `true`", () => {
    render(
      <Accordion expanded title="Title">
        child content
      </Accordion>,
    );

    expect(screen.getByText("child content")).toBeVisible();
  });

  it("mounts collapsed when `expanded` prop is passed as false", () => {
    render(
      <Accordion expanded={false} title="Title">
        child content
      </Accordion>,
    );

    expect(screen.getByText("child content")).not.toBeVisible();
  });

  it("fires the provided `onChange` prop when the header area is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Accordion onChange={onChange} expanded={false} title="Title" />);

    const header = screen.getByRole("button");
    await user.click(header);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: header }),
      true,
    );
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "fires the provided `onChange` prop when the %s key is pressed with the header area focused",
    async (keyName, key) => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Accordion onChange={onChange} expanded={false} title="Title" />);

      const header = screen.getByRole("button");
      header.focus();
      await user.keyboard(key);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ target: header }),
        true,
      );
    },
  );

  it("mounts expanded when `defaultExpanded` prop is passed as `true`", () => {
    render(
      <Accordion defaultExpanded title="Title">
        child content
      </Accordion>,
    );

    expect(screen.getByText("child content")).toBeVisible();
  });

  it("mounts collapsed when `defaultExpanded` prop is not passed at all", () => {
    render(<Accordion title="Title">child content</Accordion>);

    expect(screen.getByText("child content")).not.toBeVisible();
  });

  it("toggles the expansion state when the header area is clicked and the `expanded` prop is not passed", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);
    expect(screen.getByText("child content")).not.toBeVisible();

    const header = screen.getByRole("button");
    await user.click(header);
    expect(screen.getByText("child content")).toBeVisible();

    await user.click(header);
    expect(screen.getByText("child content")).not.toBeVisible();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "toggles the expansion state when the %s key is pressed with the header area focused and the `expanded` prop is not passed",
    async (keyName, key) => {
      const user = userEvent.setup();
      render(<Accordion title="Title">child content</Accordion>);
      expect(screen.getByText("child content")).not.toBeVisible();

      const header = screen.getByRole("button");
      header.focus();
      await user.keyboard(key);
      expect(screen.getByText("child content")).toBeVisible();

      header.focus();
      await user.keyboard(key);
      expect(screen.getByText("child content")).not.toBeVisible();
    },
  );

  it("does not toggle the expansion state when keys other than enter or space are pressed when the header area is focused", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);
    expect(screen.getByText("child content")).not.toBeVisible();

    const header = screen.getByRole("button");
    header.focus();
    await user.keyboard("a");
    expect(screen.getByText("child content")).not.toBeVisible();
  });

  it("recalculates the height of the content container when the content height changes", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);

    jest
      .spyOn(screen.getByTestId("accordion-content"), "scrollHeight", "get")
      .mockImplementation(() => 200);
    await user.click(screen.getByRole("button"));

    expect(screen.getByTestId("accordion-content-container")).toHaveStyle({
      "max-height": "200px",
    });

    jest
      .spyOn(screen.getByTestId("accordion-content"), "scrollHeight", "get")
      .mockImplementation(() => 400);

    act(() => {
      const useResizeObserverMock = useResizeObserver as jest.Mock;
      useResizeObserverMock.mock.calls[
        useResizeObserverMock.mock.calls.length - 1
      ][1]();
    });

    expect(screen.getByTestId("accordion-content-container")).toHaveStyle({
      "max-height": "400px",
    });
  });

  it("adds a subtitle when `subTitle` prop is set and `size` is large (default)", () => {
    render(<Accordion title="Title" subTitle="a subtitle" />);

    expect(screen.getByText("a subtitle")).toBeVisible();
  });

  it("does not add a subtitle when `subTitle` prop is set and `size` is small", () => {
    render(<Accordion title="Title" subTitle="a subtitle" size="small" />);

    expect(screen.queryByText("a subtitle")).not.toBeInTheDocument();
  });

  it("should display the `title` when closed and the `openTitle` and `buttonHeading` props are provided", () => {
    render(<Accordion title="Title" buttonHeading openTitle="Less info" />);

    expect(screen.getByRole("button")).toHaveTextContent("Title");
  });

  it("should display the `openTitle` when open and the `openTitle` and `buttonHeading` props are provided", () => {
    render(
      <Accordion title="Title" expanded buttonHeading openTitle="Less info" />,
    );

    expect(screen.getByRole("button")).toHaveTextContent("Less info");
  });

  it("should display the `title` when open if the `openTitle` prop is not provided and `buttonHeading` is provided", () => {
    render(<Accordion title="Title" expanded buttonHeading />);

    expect(screen.getByRole("button")).toHaveTextContent("Title");
  });

  // coverage only - border styles tested in Playwright
  it('has no border when `borders` prop is "none"', () => {
    render(<Accordion title="Title" borders="none" />);

    expect(screen.getByTestId("accordion-container")).toHaveStyleRule(
      "border",
      "none",
    );
  });

  // coverage - iconAlign is tested in Playwright
  it('renders icon rotated when accordion is expanded and `iconAlign` prop is set to "left"', () => {
    render(<Accordion title="Title" expanded iconAlign="left" />);

    expect(screen.getByTestId("icon")).toHaveStyle({
      transform: "rotate(-180deg)",
    });
  });

  // coverage
  it('sets the icon position of the button correctly when `iconAlign` prop is set to "left" and `buttonHeading` prop is true', () => {
    render(<Accordion title="Title" buttonHeading iconAlign="left" />);

    expect(screen.getByRole("button")).toHaveStyleRule(
      "margin-left",
      "var(--spacing100)",
      { modifier: `${StyledAccordionHeadingsContainer}` },
    );
    expect(screen.getByTestId("icon")).toHaveStyle({
      position: "relative",
      left: "16px",
    });
  });

  // coverage - validation icons are tested in Chromatic
  it("renders the validation icon when a message is provided", () => {
    render(<Accordion title="Title" error="error" />);

    expect(screen.getByTestId("icon-error")).toBeVisible();
  });

  // coverage
  it("applies expected styles when expanded when the variant is `subtle`", () => {
    render(<Accordion variant="subtle" expanded title="Title" />);

    expect(screen.getByRole("button")).toHaveStyleRule(
      "margin-bottom",
      "var(--spacing200)",
    );
    expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
      "margin-left",
      "var(--spacing150)",
    );
    expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
      "padding",
      "var(--spacing100) var(--spacing200) var(--spacing300)",
    );
    expect(screen.getByTestId("accordion-content")).toHaveStyleRule(
      "border-left",
      "2px solid var(--colorsUtilityMajor100)",
    );
  });

  // coverage (buttonWidth is deprecated)
  it("the `buttonWidth` prop sets the button width when passed as a number and te `buttonHeading` prop is true", () => {
    render(<Accordion title="Title" buttonHeading buttonWidth={140} />);

    expect(screen.getByRole("button")).toHaveStyle({ width: "140px" });
  });

  // coverage - disableContentPadding is tested in Chromatic
  it("renders content without paddings if `disableCustomPadding` is applied", () => {
    render(<Accordion title="Title" disableContentPadding />);

    expect(screen.getByTestId("accordion-content")).toHaveStyle({
      padding: "0px",
    });
  });
});

describe("AccordionGroup", () => {
  testStyledSystemMargin(
    (props) => (
      <AccordionGroup data-role="accordion-group" {...props}>
        <Accordion title="Title_1" defaultExpanded>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Accordion>
        <Accordion title="Title_2" defaultExpanded>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Accordion>
        <Accordion title="Title_3" defaultExpanded>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Accordion>
      </AccordionGroup>
    ),
    () => screen.getByTestId("accordion-group"),
  );

  it("renders with expected `data-` attributes on the root element", () => {
    render(
      <AccordionGroup
        data-element="accordion-group-element"
        data-role="accordion-group-role"
      />,
    );
    const rootElement = screen.getByTestId("accordion-group-role");

    expect(rootElement).toHaveAttribute("data-component", "accordion-group");
    expect(rootElement).toHaveAttribute(
      "data-element",
      "accordion-group-element",
    );
  });

  it("focuses on the next Accordion in the group when the down arrow key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup>
        <Accordion title="Title 1" />
        <Accordion title="Title 2" />
        <Accordion title="Title 3" />
      </AccordionGroup>,
    );

    screen.getByRole("button", { name: "Title 2" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Title 3" })).toHaveFocus();
  });

  it("focuses on the first Accordion in the group when the down arrow key is pressed and focus is on the last Accordion", async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup>
        <Accordion title="Title 1" />
        <Accordion title="Title 2" />
        <Accordion title="Title 3" />
      </AccordionGroup>,
    );

    screen.getByRole("button", { name: "Title 3" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Title 1" })).toHaveFocus();
  });

  it("focuses on the previous Accordion in the group when the up arrow key is pressed", async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup>
        <Accordion title="Title 1" />
        <Accordion title="Title 2" />
        <Accordion title="Title 3" />
      </AccordionGroup>,
    );

    screen.getByRole("button", { name: "Title 2" }).focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("button", { name: "Title 1" })).toHaveFocus();
  });

  it("focuses on the last Accordion in the group when the up arrow key is pressed and focus is on the first Accordion", async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup>
        <Accordion title="Title 1" />
        <Accordion title="Title 2" />
        <Accordion title="Title 3" />
      </AccordionGroup>,
    );

    screen.getByRole("button", { name: "Title 1" }).focus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("button", { name: "Title 3" })).toHaveFocus();
  });

  it.each([
    ["first", 1],
    ["second", 2],
    ["third", 3],
  ])(
    "focuses on the first Accordion when the `Home` key is pressed and the %s Accordion is focused",
    async (_, accordionNumber) => {
      const user = userEvent.setup();
      render(
        <AccordionGroup>
          <Accordion title="Title 1" />
          <Accordion title="Title 2" />
          <Accordion title="Title 3" />
        </AccordionGroup>,
      );

      screen.getByRole("button", { name: `Title ${accordionNumber}` }).focus();
      await user.keyboard("{Home}");
      expect(screen.getByRole("button", { name: "Title 1" })).toHaveFocus();
    },
  );

  it.each([
    ["first", 1],
    ["second", 2],
    ["third", 3],
  ])(
    "focuses on the last Accordion when the `End` key is pressed and the %s Accordion is focused",
    async (_, accordionNumber) => {
      const user = userEvent.setup();
      render(
        <AccordionGroup>
          <Accordion title="Title 1" />
          <Accordion title="Title 2" />
          <Accordion title="Title 3" />
        </AccordionGroup>,
      );

      screen.getByRole("button", { name: `Title ${accordionNumber}` }).focus();
      await user.keyboard("{End}");
      expect(screen.getByRole("button", { name: "Title 3" })).toHaveFocus();
    },
  );

  it("throws an error if incorrect children are passed", () => {
    // mock console.error so that no console errors occur while running the tests
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <AccordionGroup>
          <div />
          <div />
        </AccordionGroup>,
      );
    }).toThrow("AccordionGroup accepts only children of type `Accordion`.");

    consoleSpy.mockReset();
  });

  it("accepts empty children", () => {
    expect(() => {
      render(
        <AccordionGroup>
          {null}
          {false}
          {undefined}
        </AccordionGroup>,
      );
    }).not.toThrow();
  });
});
