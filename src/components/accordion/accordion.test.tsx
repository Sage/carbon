import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  testStyledSystemSpacing,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import { Accordion } from ".";
import AccordionGroup from "./accordion-group/accordion-group.component";
import Logger from "../../__internal__/utils/logger";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery");
jest.mock("../../hooks/__internal__/useResizeObserver");
jest.mock("../../__internal__/utils/logger");

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  mockUseMediaQuery.mockReturnValue(false);
});

describe("Accordion", () => {
  testStyledSystemSpacing(
    (props) => <Accordion title="Title" data-role="accordion" {...props} />,
    () => screen.getByTestId("accordion"),
    { modifier: "&&" },
  );

  it("renders with expected `data-` attributes on the root element", () => {
    render(
      <Accordion
        title="Title"
        data-element="accordion-element"
        data-role="accordion-role"
      >
        child content
      </Accordion>,
    );
    const rootElement = screen.getByTestId("accordion-role");

    expect(rootElement).toHaveAttribute("data-component", "accordion");
    expect(rootElement).toHaveAttribute("data-element", "accordion-element");
  });

  it("should render provided `title` as a string", () => {
    render(<Accordion title="Title" />);

    expect(screen.getByRole("button", { name: "Title" })).toBeVisible();
  });

  it("should render `title` as a React element", () => {
    render(<Accordion title={<div>Title content</div>} />);

    const accordionButton = screen.getByRole("button", {
      name: "Title content",
    });

    expect(accordionButton).toBeVisible();
  });

  it("should render provided `subTitle`", () => {
    render(<Accordion title="Title" subTitle="subtitle" />);

    expect(screen.getByText("subtitle")).toBeVisible();
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
    render(<Accordion onChange={onChange} title="Title" />);

    const header = screen.getByRole("button");
    await user.click(header);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: header }),
      true,
    );
  });

  it("fires the provided `onChange` prop when the header area is clicked and component is controlled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Accordion onChange={onChange} title="Title" expanded={false} />);

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
    "fires the provided `onChange` prop when the %s key is pressed on the header area",
    async (keyName, key) => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Accordion onChange={onChange} title="Title" />);

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

  it("does not toggle the expansion state when keys other than Enter or Space are pressed on the header area", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);

    const header = screen.getByRole("button");
    expect(screen.getByText("child content")).not.toBeVisible();

    header.focus();
    await user.keyboard("a");
    expect(screen.getByText("child content")).not.toBeVisible();
  });

  it("fires the provided `onChange` prop when `variant` is 'simple` and button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Accordion onChange={onChange} title="Title" variant="simple" />);

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
    "fires the provided `onChange` prop when `variant` is 'simple` and the %s key is pressed",
    async (keyName, key) => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Accordion onChange={onChange} title="Title" variant="simple" />);

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

  it("sets hidden='until-found' on the content container when collapsed", () => {
    jest.useFakeTimers();
    render(<Accordion title="Title">child content</Accordion>);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("accordion-content-container")).toHaveAttribute(
      "hidden",
      "until-found",
    );
    jest.useRealTimers();
  });

  it("removes hidden='until-found' from the content container when expanded", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);

    const header = screen.getByRole("button");
    await user.click(header);

    expect(
      screen.getByTestId("accordion-content-container"),
    ).not.toHaveAttribute("hidden");
  });

  it("expands the content when `beforematch` event is fired", async () => {
    render(<Accordion title="Title">child content</Accordion>);

    expect(screen.getByText("child content")).not.toBeVisible();

    act(() => {
      const event = new Event("beforematch");
      screen.getByTestId("accordion-content-container").dispatchEvent(event);
    });

    expect(screen.getByText("child content")).toBeVisible();
  });

  it("recalculates the height of the content container when the content height changes", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Title">child content</Accordion>);

    jest
      .spyOn(screen.getByTestId("accordion-content"), "scrollHeight", "get")
      .mockImplementation(() => 200);
    await user.click(screen.getByRole("button"));

    expect(screen.getByTestId("accordion-content-container")).toHaveStyle({
      height: "200px",
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
      height: "400px",
    });
  });

  it("should display the `title` when closed and the `openTitle` prop is provided", () => {
    render(<Accordion title="Title" openTitle="Less info" />);

    expect(screen.getByRole("button")).toHaveTextContent("Title");
  });

  it("should display the `openTitle` when open and the `openTitle` prop is provided", () => {
    render(<Accordion title="Title" expanded openTitle="Less info" />);

    expect(screen.getByRole("button")).toHaveTextContent("Less info");
  });

  it("should not render `subtitle` when `variant` is 'simple'", () => {
    render(<Accordion variant="simple" title="Title" subTitle="Subtitle" />);

    expect(screen.queryByText("Subtitle")).not.toBeInTheDocument();
  });

  it("should render 'standard' variant as 'medium' when `size` is set to 'large'", () => {
    render(<Accordion title="Title" size="large" />);

    expect(screen.getByText("Title")).toHaveStyleRule(
      "font",
      "var(--global-font-static-section-heading-m)",
    );
  });

  it("should render 'subtle' variant as 'simple'", () => {
    render(<Accordion title="Title" variant="subtle" />);

    expect(screen.getByTestId("accordion-simple-button")).toBeVisible();
  });

  it("should render with animation styles when prefer reduce motion is not set", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(
      <Accordion
        title="Title"
        data-role="accordion-container"
        variant="simple"
      />,
    );

    const container = screen.getByTestId("accordion-container");
    const contentContainer = screen.getByTestId("accordion-content-container");
    const icon = screen.getByTestId("accordion-icon");

    expect(container).toHaveStyle({ transition: "gap 0.4s" });
    expect(contentContainer).toHaveStyle({
      transition: "height 0.4s, opacity 0.2s",
    });
    expect(icon).toHaveStyle({ transition: "transform 0.4s" });
  });

  // coverage
  it("has no border when `borders` prop is 'none'", () => {
    render(
      <Accordion
        title="Title"
        borders="none"
        data-role="accordion-container"
      />,
    );

    expect(screen.getByTestId("accordion-container")).toHaveStyle({
      border: "none",
    });
  });

  // coverage
  it("renders with validation icon and tooltip when `error` is set", () => {
    render(<Accordion title="Title" error="Error message" />);

    expect(screen.getByTestId("icon-error")).toBeVisible();
  });

  // coverage
  it("renders with expected styles with `iconAlign` is set to 'right'", () => {
    render(<Accordion title="Title" iconAlign="right" />);

    expect(screen.getByRole("button", { name: "Title" })).toHaveStyle({
      flexDirection: "row-reverse",
    });
  });
});

describe("AccordionGroup", () => {
  testStyledSystemMargin(
    (props) => <AccordionGroup data-role="accordion-group" {...props} />,
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

  test("a deprecation warning should be displayed if one or more AccordionGroups are rendered", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    const { rerender } = render(<AccordionGroup />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "`AccordionGroup` is deprecated and will be removed in a future release. Wrapping a group of Accordions in AccordionGroup is no longer required.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    rerender(
      <>
        <AccordionGroup />
        <AccordionGroup />
      </>,
    );

    expect(loggerSpy).toHaveBeenCalledWith(
      "`AccordionGroup` is deprecated and will be removed in a future release. Wrapping a group of Accordions in AccordionGroup is no longer required.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockRestore();
    loggerSpy.mockClear();
  });
});
