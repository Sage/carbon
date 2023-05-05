import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { Card, CardProps, CardRow, CardFooter } from ".";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Icon from "../icon";
import StyledCard from "./card.style";
import Logger from "../../__internal__/utils/logger";

function render(props: Partial<CardProps> = {}) {
  return mount(<Card {...props}>Content</Card>);
}

describe("Card", () => {
  testStyledSystemMargin((props) => <Card {...props}>Content</Card>);

  it("renders with correct data-component tag", () => {
    const wrapper = render();
    expect(wrapper.find("div[data-component='card']").exists()).toBeTruthy();
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
    "when spacing prop is set to %s, CardRow and CardFooter children should have a spacing prop injected with same value",
    (spacing) => {
      const wrapper = mount(
        <Card spacing={spacing}>
          <CardRow>Row</CardRow>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      expect(wrapper.find(CardRow).prop("spacing")).toBe(spacing);
      expect(wrapper.find(CardFooter).prop("spacing")).toBe(spacing);
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
    "renders with the expected border radius styling when roundness is %s",
    (roundness) => {
      assertStyleMatch(
        {
          borderRadius: `var(--borderRadius${
            roundness === "default" ? "1" : "2"
          }00)`,
        },
        render({ roundness })
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
      expect(wrapper.find(CardRow).prop("pt")).not.toBeUndefined();
    });

    it("there is multiple child rows", () => {
      const wrapper = mount(
        <Card>
          <CardRow>row 1</CardRow>
          <CardRow>row 2</CardRow>
        </Card>
      );

      expect(wrapper.find(CardRow).at(0).prop("py")).not.toBeUndefined();
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

  describe("when action prop is provided", () => {
    it("with interactive prop set to true and card is clicked, call action event handler", () => {
      const action = jest.fn();
      const wrapper = render({
        interactive: true,
        action,
      });

      wrapper.simulate("click");

      expect(action).toHaveBeenCalled();
    });

    it("with interactive prop set to true and draggable card is clicked, do not call action event handler", () => {
      const action = jest.fn();
      const wrapper = render({
        interactive: true,
        draggable: true,
        action,
      });

      wrapper.simulate("click");

      expect(action).not.toHaveBeenCalled();
    });

    it("with interactive prop set to false, do not call action event handler", () => {
      const action = jest.fn();
      const wrapper = render({
        action,
      });

      wrapper.simulate("click");

      expect(action).not.toHaveBeenCalled();
    });
  });

  describe("when interactive prop is true", () => {
    it("has `type` and `tabIndex` attributes", () => {
      const wrapper = render({ interactive: true });
      expect(wrapper.find(StyledCard).prop("type")).toBe("button");
      expect(wrapper.find(StyledCard).prop("tabIndex")).toBe(0);
    });

    it("hovering over Card should change cursor to pointer", () => {
      const wrapper = render({ interactive: true });
      assertStyleMatch(
        {
          cursor: "pointer",
        },
        wrapper.find(StyledCard)
      );
    });

    it.each([
      ["hovered over", ":hover"],
      ["focused", ":focus"],
    ])("render with specific box shadow when Card is %s", (_, selector) => {
      const wrapper = render({ interactive: true });
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
          interactive: true,
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
    (_, cardWidth) => {
      const wrapper = render({ cardWidth });
      assertStyleMatch(
        {
          width: cardWidth,
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

  it("when dataRole prop is provided, raise deprecation warning once in the console", () => {
    // Mock console.warn to prevent warning from appearing in console while test is running
    const mockConsole = jest
      .spyOn(global.console, "warn")
      .mockImplementation(() => undefined);

    const loggerSpy = jest.spyOn(Logger, "deprecate");
    mount(
      <>
        <Card dataRole="foo">Card 1</Card>
        <Card dataRole="bar">Card 2</Card>
      </>
    );
    expect(loggerSpy).toHaveBeenCalledWith(
      "The `dataRole` prop of `Card` is now deprecated. Please use the kebab-case version `data-role` instead."
    );
    expect(loggerSpy).toHaveBeenCalledTimes(1);
    loggerSpy.mockRestore();

    mockConsole.mockRestore();
  });
});
