import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";
import Icon from "../../icon";
import { VerticalMenuItem, VerticalMenuFullScreen, VerticalMenu } from "..";

jest.mock("../../icon", () => {
  return jest.fn(() => null);
});

const IconMock = Icon as jest.MockedFunction<typeof Icon>;

describe("VerticalMenuItem", () => {
  testStyledSystemPadding(
    (props) => (
      <VerticalMenu>
        <VerticalMenuItem title="Item1" {...props}>
          foo
        </VerticalMenuItem>
      </VerticalMenu>
    ),
    () => screen.getByRole("button"),
  );

  describe("when is rendered without children", () => {
    it("should render with a custom height", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem
            data-role="item-wrapper"
            title="Item1"
            height="100px"
          />
        </VerticalMenu>,
      );

      expect(screen.getByTestId("item-wrapper")).toHaveStyle({
        minHeight: "100px",
      });
    });

    it("should render passed title", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1" />
        </VerticalMenu>,
      );
      expect(screen.getByText("Item1")).toBeVisible();
    });

    it("should render adornment passed as a node", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1" adornment={<div>Adornment</div>} />
        </VerticalMenu>,
      );
      expect(screen.getByText("Adornment")).toBeVisible();
    });

    it("should render passed active state as boolean", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem data-role="item-wrapper" title="Item1" active />
        </VerticalMenu>,
      );
      expect(screen.getByTestId("item-wrapper")).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        },
      );
    });

    it("should override active state when mouseover detected", async () => {
      const user = userEvent.setup();
      render(
        <VerticalMenu>
          <VerticalMenuItem data-role="item-wrapper" title="Item1" active />
        </VerticalMenu>,
      );

      await user.hover(screen.getByRole("listitem"));

      expect(screen.getByTestId("item-wrapper")).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardHover)",
        {
          modifier: ":hover:before",
        },
      );
    });

    it("should render proper Icon when iconType prop is passed", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1" iconType="add" />
        </VerticalMenu>,
      );
      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "add" }),
        {},
      );

      IconMock.mockClear();
    });

    it('should render as an anchor when "href" prop is passed', () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1" href="http://www.sage.com" />
        </VerticalMenu>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "http://www.sage.com");
      expect(link).toBeVisible();
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
        <VerticalMenu>
          <VerticalMenuItem
            title="Item1"
            component={CustomComponent}
            customComponentTitle="Custom component"
          />
        </VerticalMenu>,
      );
      expect(screen.getByText("Custom component")).toBeVisible();
    });
  });

  describe("when is rendered with children", () => {
    it("should render as a button", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );
      expect(screen.getByRole("button")).toBeVisible();
    });

    it("should not render children by default", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );
      expect(screen.queryByText("ChildItem1")).not.toBeInTheDocument();
    });

    it("should render children after item has been clicked on", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );
      expect(screen.queryByText("ChildItem1")).not.toBeInTheDocument();
      await user.click(screen.getByText("Item1"));
      expect(screen.getByText("ChildItem1")).toBeVisible();
    });

    it.each([
      ["enter", "enter"],
      ["space", " "],
    ])(
      "should render children after focused item has been pressed on with %s",
      async (_, key) => {
        const user = userEvent.setup();

        render(
          <VerticalMenu>
            <VerticalMenuItem title="Item1">
              <VerticalMenuItem title="ChildItem1" />
            </VerticalMenuItem>
          </VerticalMenu>,
        );

        expect(screen.queryByText("ChildItem1")).not.toBeInTheDocument();
        await user.tab();
        await user.keyboard(`{${key}}`);
        expect(screen.getByText("ChildItem1")).toBeVisible();
      },
    );

    it("should render chevron icon", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1">
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );

      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "chevron_down_thick" }),
        {},
      );

      IconMock.mockClear();
      await user.click(screen.getByText("Item1"));
      expect(Icon).toHaveBeenCalledWith(
        expect.objectContaining({ type: "chevron_up_thick" }),
        {},
      );
    });

    it("should increase padding for each level of nested children", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenu>
          <VerticalMenuItem data-role="item" title="Item1">
            <VerticalMenuItem data-role="child-item" title="ChildItem1">
              <VerticalMenuItem
                data-role="grand-child-item"
                title="GrandChildItem1"
              />
            </VerticalMenuItem>
          </VerticalMenuItem>
        </VerticalMenu>,
      );

      expect(screen.getByTestId("item")).toHaveStyle({
        paddingLeft: "calc(40px + 0px)",
        paddingRight: "calc(40px + 0px)",
      });

      await user.click(screen.getByText("Item1"));
      expect(screen.getByTestId("child-item")).toHaveStyle({
        paddingLeft: "calc(40px + 32px)",
        paddingRight: "calc(40px + 32px)",
      });

      await user.click(screen.getByText("ChildItem1"));
      expect(screen.getByTestId("grand-child-item")).toHaveStyle({
        paddingLeft: "calc(40px + 64px)",
        paddingRight: "calc(40px + 64px)",
      });
    });

    it("should render adornment passed as a render function", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenu>
          <VerticalMenuItem
            title="Item1"
            adornment={(isOpen) => !isOpen && <div>Adornment</div>}
          >
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );

      expect(screen.getByText("Adornment")).toBeVisible();
      await user.click(screen.getByText("Item1"));
      expect(screen.queryByText("Adornment")).not.toBeInTheDocument();
    });

    it("should render passed active state as render function", async () => {
      const user = userEvent.setup();

      render(
        <VerticalMenu>
          <VerticalMenuItem
            data-role="item"
            title="Item1"
            active={(isOpen) => !isOpen}
          >
            <VerticalMenuItem data-role="child-item" title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );

      expect(screen.getByTestId("item")).toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        },
      );

      await user.click(screen.getByText("Item1"));
      expect(screen.getByTestId("child-item")).not.toHaveStyleRule(
        "background",
        "var(--colorsComponentsLeftnavWinterStandardSelected)",
        {
          modifier: ":before",
        },
      );
    });
  });

  describe("when rendered inside of VerticalMenuFullScreen", () => {
    it("always render VerticalMenuItems open on all levels", () => {
      render(
        <VerticalMenu>
          <VerticalMenuFullScreen isOpen onClose={() => {}}>
            <VerticalMenuItem title="Item1">
              <VerticalMenuItem title="ChildItem1">
                <VerticalMenuItem title="GrandChildItem1" />
              </VerticalMenuItem>
            </VerticalMenuItem>
          </VerticalMenuFullScreen>
        </VerticalMenu>,
      );

      expect(screen.getByText("Item1")).toBeVisible();
      expect(screen.getByText("ChildItem1")).toBeVisible();
      expect(screen.getByText("GrandChildItem1")).toBeVisible();
    });
  });

  describe("when the defaultOpen prop is set", () => {
    it("then the item content should be rendered", () => {
      render(
        <VerticalMenu>
          <VerticalMenuItem title="Item1" defaultOpen>
            <VerticalMenuItem title="ChildItem1" />
          </VerticalMenuItem>
        </VerticalMenu>,
      );

      expect(screen.getByText("ChildItem1")).toBeVisible();
    });
  });

  it("should have the expected data attributes", () => {
    render(
      <VerticalMenu>
        <VerticalMenuItem
          title="Item1"
          data-element="foo"
          data-role="bar"
          href="foo"
        />
      </VerticalMenu>,
    );

    const anchor = within(screen.getByRole("listitem")).getByRole("link");

    expect(anchor).toHaveAttribute("data-component", "vertical-menu-item");
    expect(anchor).toHaveAttribute("data-element", "foo");
    expect(anchor).toHaveAttribute("data-role", "bar");
  });

  it("renders with the expected border radius styling when the item is active", () => {
    render(
      <VerticalMenu>
        <VerticalMenuItem data-role="item-wrapper" title="Item1" active />
      </VerticalMenu>,
    );

    const itemWrapper = screen.getByTestId("item-wrapper");
    expect(itemWrapper).toHaveStyleRule(
      "border-radius",
      "var(--borderRadius100)",
      {
        modifier: ":before",
      },
    );
  });
});
