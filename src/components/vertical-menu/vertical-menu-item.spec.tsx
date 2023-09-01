import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import { testStyledSystemPadding } from "../../__spec_helper__/test-utils";
import Icon from "../icon";
import { StyledVerticalMenuItem } from "./vertical-menu.style";
import { VerticalMenuItem, VerticalMenuFullScreen } from ".";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

jest.mock("../icon", () => {
  return jest.fn(() => null);
});

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

describe("VerticalMenuItem", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  testStyledSystemPadding(
    (props) => (
      <ThemeProvider theme={mintTheme}>
        <VerticalMenuItem title="Item1" {...props} />
      </ThemeProvider>
    ),
    undefined,
    (component) => component.find(StyledVerticalMenuItem)
  );

  describe("when is rendered without children", () => {
    it("should render with a custom height", () => {
      render(<VerticalMenuItem title="Item1" height="100px" />);

      expect(screen.getByRole("listitem").firstChild).toHaveStyle({
        minHeight: "100px",
      });
    });

    it("should render passed title", () => {
      render(<VerticalMenuItem title="Item1" />);
      expect(screen.getByText("Item1")).toBeTruthy();
    });

    it("should render adornment passed as a node", () => {
      render(
        <VerticalMenuItem title="Item1" adornment={<div>Adornment</div>} />
      );
      expect(screen.getByText("Adornment")).toBeTruthy();
    });

    it("should render passed active state as boolean", () => {
      render(<VerticalMenuItem title="Item1" active />);
      expect(screen.getByRole("listitem").firstChild).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        }
      );
    });

    it("should override active state when mouseover detected", () => {
      render(<VerticalMenuItem title="Item1" active />);

      userEvent.hover(screen.getByRole("listitem"));

      expect(screen.getByRole("listitem").firstChild).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardHover)",
        {
          modifier: ":hover:before",
        }
      );
    });

    it("should render proper Icon when iconType prop is passed", () => {
      render(<VerticalMenuItem title="Item1" iconType="add" />);
      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "add" }),
        {}
      );

      IconMock.mockClear();
    });

    it('should render as an anchor when "href" prop is passed', () => {
      render(<VerticalMenuItem title="Item1" href="http://www.sage.com" />);
      expect(screen.getByRole("link")).toBeTruthy();
    });

    it("should render custom component when passed as a prop", () => {
      interface CustomComponentProps {
        customComponentTitle: string;
        children?: React.ReactNode;
      }

      const CustomComponent = ({
        customComponentTitle,
        children,
      }: CustomComponentProps) => (
        <>
          <div>{customComponentTitle}</div>
          <div>{children}</div>;
        </>
      );

      render(
        <VerticalMenuItem
          title="Item1"
          component={CustomComponent}
          customComponentTitle="Custom component"
        />
      );
      expect(screen.getByText("Custom component")).toBeTruthy();
    });
  });

  describe("when is rendered with children", () => {
    it("should render as a button", () => {
      render(
        <VerticalMenuItem title="Item1">
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );
      expect(screen.getByRole("button")).toBeTruthy();
    });

    it("should not render children by default", () => {
      render(
        <VerticalMenuItem title="Item1">
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );
      expect(screen.queryByText("ChildItem1")).toBeNull();
    });

    it("should render children after item has been clicked on", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenuItem title="Item1">
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );
      expect(screen.queryByText("ChildItem1")).toBeNull();
      await user.click(screen.getByText("Item1"));
      expect(screen.getByText("ChildItem1")).toBeTruthy();
    });

    it.each([
      ["enter", "enter"],
      ["space", " "],
    ])(
      "should render children after focused item has been pressed on with %s",
      async (keyName, key) => {
        const user = userEvent.setup();

        render(
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        );

        expect(screen.queryByText("ChildItem1")).toBeNull();
        await user.tab();
        await user.keyboard(`{${key}}`);
        expect(screen.getByText("ChildItem1")).toBeTruthy();
      }
    );

    it("should render chevron icon", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenuItem title="Item1">
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );

      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "chevron_down_thick" }),
        {}
      );

      IconMock.mockClear();
      await user.click(screen.getByText("Item1"));
      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "chevron_up_thick" }),
        {}
      );
    });

    it("should increase padding for each level of nested children", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenuItem title="Item1">
          <VerticalMenuItem title="ChildItem1">
            <VerticalMenuItem title="GrandChildItem1" />
          </VerticalMenuItem>
        </VerticalMenuItem>
      );

      expect(screen.getByRole("listitem").firstChild).toHaveStyle({
        paddingLeft: "calc(40px + 0px)",
        paddingRight: "calc(40px + 0px)",
      });

      await user.click(screen.getByText("Item1"));
      expect(screen.getAllByRole("listitem")[1].firstChild).toHaveStyle({
        paddingLeft: "calc(40px + 32px)",
        paddingRight: "calc(40px + 32px)",
      });

      await user.click(screen.getByText("ChildItem1"));
      expect(screen.getAllByRole("listitem")[2].firstChild).toHaveStyle({
        paddingLeft: "calc(40px + 64px)",
        paddingRight: "calc(40px + 64px)",
      });
    });

    it("should render adornment passed as a render function", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenuItem
          title="Item1"
          adornment={(isOpen) => !isOpen && <div>Adornment</div>}
        >
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );

      expect(screen.getByText("Adornment")).toBeTruthy();
      await user.click(screen.getByText("Item1"));
      expect(screen.queryByText("Adornment")).toBeNull();
    });

    it("should render passed active state as render function", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenuItem title="Item1" active={(isOpen) => !isOpen}>
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );

      expect(screen.getByRole("listitem").firstChild).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        }
      );

      await user.click(screen.getByText("Item1"));
      expect(screen.getAllByRole("listitem")[0].firstChild).not.toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        }
      );
    });
  });

  describe("when rendered inside of VerticalMenuFullScreen", () => {
    it("always render VerticalMenuItems open on all levels", () => {
      render(
        <VerticalMenuFullScreen isOpen onClose={() => {}}>
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1">
              <VerticalMenuItem title="GrandChildItem1" />
            </VerticalMenuItem>
          </VerticalMenuItem>
        </VerticalMenuFullScreen>
      );

      expect(screen.getByText("Item1")).toBeTruthy();
      expect(screen.getByText("ChildItem1")).toBeTruthy();
      expect(screen.getByText("GrandChildItem1")).toBeTruthy();
    });
  });

  describe("when the defaultOpen prop is set", () => {
    it("then the item content should be rendered", () => {
      render(
        <VerticalMenuItem title="Item1" defaultOpen>
          <VerticalMenuItem title="ChildItem1" />
        </VerticalMenuItem>
      );

      expect(screen.getByText("ChildItem1")).toBeTruthy();
    });
  });

  it("should have the expected data attributes", () => {
    render(
      <VerticalMenuItem
        title="Item1"
        data-element="foo"
        data-role="bar"
        href="foo"
      />
    );

    const listItem = screen.getByRole("listitem").querySelector("a");

    expect(listItem?.getAttribute("data-component")).toEqual(
      "vertical-menu-item"
    );
    expect(listItem?.getAttribute("data-element")).toEqual("foo");
    expect(listItem?.getAttribute("data-role")).toEqual("bar");
  });

  it("renders with the expected border radius styling when the item is active", () => {
    render(<VerticalMenuItem title="Item1" active />);

    expect(screen.getByRole("listitem").firstChild).toHaveStyleRule(
      "border-radius",
      "var(--borderRadius100)",
      {
        modifier: ":before",
      }
    );
  });
});
