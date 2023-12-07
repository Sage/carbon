import React from "react";
import { mount } from "enzyme";
import { render as rtlRender } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Card, CardProps, CardRow, CardFooter } from ".";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Icon from "../icon";
import {
  StyledCard,
  StyledCardContent,
  marginSizes,
  paddingSizes,
} from "./card.style";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledCardRow from "./card-row/card-row.style";
import StyledCardFooter from "./card-footer/card-footer.style";

function render(props: Partial<CardProps> = {}) {
  return mount(<Card {...props}>Content</Card>);
}

describe("Card", () => {
  testStyledSystemMargin((props) => <Card {...props}>Content</Card>);

  it("renders with correct data attributes", () => {
    rootTagTest(
      render({ "data-element": "foo", "data-role": "bar" }).find(StyledCard),
      "card",
      "foo",
      "bar"
    );
  });

  it("child content is rendered inside the card", () => {
    const text = "foobar";
    const wrapper = mount(<Card>{text}</Card>);
    expect(wrapper.find(Card).text()).toBe(text);
  });

  it("does not have `type` and `tabIndex` attributes when interactive prop is not passed", () => {
    const wrapper = render();
    expect(wrapper.find(StyledCard).prop("type")).toBeUndefined();
    expect(wrapper.find(StyledCard).prop("tabIndex")).toBeUndefined();
  });

  it.each<Exclude<CardProps["spacing"], undefined>>([
    "small",
    "medium",
    "large",
  ])(
    "when spacing prop is set to %s, CardRow and CardFooter children should receive spacing prop via context with same value",
    (spacing) => {
      const wrapper = mount(
        <Card spacing={spacing} footer={<CardFooter>Footer</CardFooter>}>
          <CardRow>Row</CardRow>
        </Card>
      );
      expect(wrapper.find(StyledCardRow).prop("spacing")).toBe(spacing);
      expect(wrapper.find(StyledCardFooter).prop("spacing")).toBe(spacing);
    }
  );

  it.each<Exclude<CardProps["spacing"], undefined>>([
    "small",
    "medium",
    "large",
  ])(
    "when spacing prop is set to %s, the content element should have the expected padding and margin styles",
    (spacing) => {
      const wrapper = mount(
        <Card spacing={spacing}>
          <CardRow>Row</CardRow>
        </Card>
      );

      assertStyleMatch(
        {
          padding: paddingSizes[spacing],
          margin: marginSizes[spacing],
        },
        wrapper.find(StyledCardContent)
      );
    }
  );

  it("renders with box shadow style when boxShadow is set", () => {
    const wrapper = render({ boxShadow: "boxShadow400" });
    assertStyleMatch(
      {
        boxShadow: "var(--boxShadow400)",
      },
      wrapper.find(StyledCard)
    );
  });

  it.each<CardProps["roundness"]>(["default", "large"])(
    "renders with the expected border radius styling when roundness is %s and no footer passed",
    (roundness) => {
      const wrapper = render({ roundness });
      const radius = `var(--borderRadius${
        roundness === "default" ? "1" : "2"
      }00)`;

      assertStyleMatch(
        {
          borderRadius: radius,
        },
        wrapper
      );

      assertStyleMatch(
        {
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
        },
        wrapper.find(StyledCardContent)
      );
    }
  );

  it.each<CardProps["roundness"]>(["default", "large"])(
    "renders with the expected border radius styling when roundness is %s and footer passed",
    (roundness) => {
      const wrapper = render({
        roundness,
        footer: <CardFooter>Footer</CardFooter>,
      });
      const radius = `var(--borderRadius${
        roundness === "default" ? "1" : "2"
      }00)`;

      assertStyleMatch(
        {
          borderRadius: radius,
        },
        wrapper
      );

      assertStyleMatch(
        {
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          borderBottomLeftRadius: undefined,
          borderBottomRightRadius: undefined,
        },
        wrapper.find(StyledCardContent)
      );
    }
  );

  describe("when spacing prop is not set, styled-system props are used", () => {
    it("there is only one child row", () => {
      const wrapper = mount(
        <Card>
          <CardRow>foobar</CardRow>
        </Card>
      );

      assertStyleMatch(
        {
          paddingTop: "var(--spacing000)",
        },
        wrapper.find(StyledCardRow),
        { modifier: ":only-of-type" }
      );
    });

    it("there is multiple child rows", () => {
      const wrapper = mount(
        <Card>
          <CardRow>row 1</CardRow>
          <CardRow>row 2</CardRow>
        </Card>
      );

      assertStyleMatch(
        {
          paddingTop: "var(--spacing000)",
          paddingBottom: "var(--spacing000)",
        },
        wrapper.find(StyledCardRow),
        { modifier: ":first-of-type:not(:only-of-type)" }
      );
    });

    it("there is one footer row child", () => {
      const wrapper = mount(
        <Card>
          <CardFooter>foobar</CardFooter>
        </Card>
      );

      expect(wrapper.find(CardFooter).prop("py")).toBeUndefined();
      expect(wrapper.find(CardFooter).prop("pt")).toBeUndefined();
    });
  });

  describe("when onClick prop is provided", () => {
    it("should render the content element as a `button` and call the callback when clicked", () => {
      const onClick = jest.fn();
      const wrapper = render({
        onClick,
      });

      const interactiveElement = wrapper.find(StyledCardContent);
      interactiveElement.simulate("click");

      expect(interactiveElement.getDOMNode().tagName).toBe("BUTTON");
      expect(onClick).toHaveBeenCalled();
    });

    it.each([
      ["enter", "Enter"],
      ["space", " "],
    ])(
      "should call the callback when the %s key is pressed and element is focused",
      (_, key) => {
        const onClick = jest.fn();
        const wrapper = render({
          onClick,
        });

        const interactiveElement = wrapper.find(StyledCardContent);
        interactiveElement.simulate("focus");
        wrapper.update();
        interactiveElement.simulate("keydown", { key });

        expect(onClick).not.toHaveBeenCalled();
      }
    );

    it("should not call the callback when a draggable card is clicked", () => {
      const onClick = jest.fn();
      const wrapper = render({
        draggable: true,
        onClick,
      });

      wrapper.simulate("click");

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe.each([
    ["onClick", () => {}],
    ["href", "foo"],
  ])("when %s prop is set", (propName, propValue) => {
    it("hovering over Card should change cursor to pointer", () => {
      const wrapper = render({ [propName]: propValue });
      assertStyleMatch(
        {
          cursor: "pointer",
        },
        wrapper.find(StyledCardContent)
      );
    });

    it.each([
      ["hovered over", ":hover"],
      ["focused", ":focus"],
    ])("render with specific box shadow when Card is %s", (_, selector) => {
      const wrapper = render({ [propName]: propValue });
      assertStyleMatch(
        {
          boxShadow: "var(--boxShadow100)",
        },
        wrapper.find(StyledCard),
        { modifier: `&${selector}` }
      );
    });

    it.each([
      ["hovered over", ":hover"],
      ["focused", ":focus"],
    ])(
      "render with custom hover box shadow values when Card is %s",
      (_, selector) => {
        const wrapper = render({
          [propName]: propValue,
          hoverBoxShadow: "boxShadow200",
        });
        assertStyleMatch(
          {
            boxShadow: "var(--boxShadow200)",
          },
          wrapper.find(StyledCard),
          { modifier: `&${selector}` }
        );
      }
    );
  });

  describe("when draggable prop is true", () => {
    it("cursor changes to move icon when Card is hovered over", () => {
      const tree = TestRenderer.create(<Card draggable>Content</Card>).toJSON();
      assertStyleMatch({ cursor: "move" }, tree);
    });

    it("render drag icon", () => {
      const wrapper = render({
        draggable: true,
      });

      expect(wrapper.find(Icon).exists()).toBeTruthy();
      expect(wrapper.find(Icon).prop("type")).toBe("drag");
    });
  });

  it("when width prop is not passed, component width fills containing element", () => {
    const wrapper = render();
    expect(wrapper.find('[data-element="card"]')).not.toHaveStyleRule("width");
  });

  it.each([
    ["percentage", "50%"],
    ["pixel", "500px"],
  ])(
    "render with correct width when width prop is passed as a %s value",
    (_, width) => {
      const wrapper = render({ width });
      assertStyleMatch(
        {
          width,
        },
        wrapper.find(StyledCard)
      );
    }
  );

  it("underlying element for Card should have data-element and data-role attributes when provided", () => {
    const dataElement = "foo";
    const dataRole = "baz";
    const wrapper = render({
      "data-element": dataElement,
      "data-role": dataRole,
    });
    expect(
      wrapper.find("div[data-component='card']").prop("data-element")
    ).toBe(dataElement);
    expect(wrapper.find("div[data-component='card']").prop("data-role")).toBe(
      dataRole
    );
  });

  it.each([
    ["onClick", { onClick: () => {} }],
    ["href", { href: "foo" }],
  ])(
    "should warn when CardFooter is passed as children and Card has %s passed",
    (_, props) => {
      const consoleSpy = jest
        .spyOn(global.console, "warn")
        .mockImplementation(() => {});

      rtlRender(
        <Card {...props}>
          <CardRow>foo</CardRow>
          <CardFooter>foo</CardFooter>
        </Card>
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockReset();
    }
  );
});
