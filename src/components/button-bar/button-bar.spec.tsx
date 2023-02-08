import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Icon, { IconType } from "../icon";
import Button from "../button";
import ButtonBar from "./button-bar.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import StyledButton from "../button/button.style";
import StyledIconButton from "../icon-button/icon-button.style";

const renderButtonBar = (
  text?: string,
  numberOfBtns = 1,
  props = {},
  btnProps = {}
) => {
  const buttons = [];
  for (let i = 0; i < numberOfBtns; i++) {
    buttons.push(<Button {...btnProps}>{text}</Button>);
  }
  return mount(<ButtonBar {...props}>{buttons}</ButtonBar>);
};

const renderButtonWithIconBar = (icons: IconType[], props = {}) => {
  const buttons = [];
  for (const icon of icons) {
    buttons.push(
      <IconButton onAction={() => undefined}>
        <Icon type={icon} />
      </IconButton>
    );
  }
  return mount(<ButtonBar {...props}>{buttons}</ButtonBar>);
};

describe("Button Bar", () => {
  describe("when no props other than children are passed into the component", () => {
    it("renders the default props and children", () => {
      const wrapper = renderButtonBar("Button", 3);
      expect(wrapper.contains(<Icon type="filter" />)).toBeFalsy();
    });
  });

  describe("when props are passed to the compontent", () => {
    it("renders proper props and children", () => {
      const wrapper = renderButtonBar("Large", 3, {
        size: "large",
        iconPosition: "after",
      });
      expect(wrapper.props().size).toEqual("large");
      expect(wrapper.props().iconPosition).toEqual("after");
    });
  });

  describe("with a single-button", () => {
    const wrapper = renderButtonBar("Single");
    it("renders correctly", () => {
      expect(wrapper.containsMatchingElement(<span>Single</span>)).toBeTruthy();
    });
  });

  describe("with fullWidth", () => {
    it("renders correctly with single button", () => {
      const wrapper = renderButtonBar("fullWidth", 1, { fullWidth: true });
      expect(wrapper.props().fullWidth).toBeTruthy();
    });

    it("renders correctly with multiple buttons", () => {
      const wrapper = renderButtonBar("fullWidth", 3, { fullWidth: true });

      assertStyleMatch({ width: "100%" }, wrapper.find(ButtonBar));
    });

    it("renders correctly with small size", () => {
      const wrapper = TestRenderer.create(
        <ButtonBar fullWidth size="small">
          <Button>fullWidth</Button>
          <Button>fullWidth</Button>
        </ButtonBar>
      );
      assertStyleMatch({ width: "100%" }, wrapper.toJSON());
    });
    it("renders correctly with large size", () => {
      const wrapper = TestRenderer.create(
        <ButtonBar fullWidth size="large">
          <Button>fullWidth</Button>
          <Button>fullWidth</Button>
        </ButtonBar>
      );
      assertStyleMatch({ width: "100%" }, wrapper.toJSON());
    });
  });

  describe("with different sizes passed to the component", () => {
    it("renders a small button bar", () => {
      const wrapper = renderButtonBar("Small", 1, { size: "small" });
      expect(wrapper.props().size).toEqual("small");
      expect(wrapper.containsMatchingElement(<span>Small</span>)).toBeTruthy();
    });

    it("renders a medium button bar", () => {
      const wrapper = renderButtonBar("Medium", 1, { size: "medium" });
      expect(wrapper.props().size).toEqual("medium");
      expect(wrapper.containsMatchingElement(<span>Medium</span>)).toBeTruthy();
    });

    it("renders a large button bar", () => {
      const wrapper = renderButtonBar("Large", 1, { size: "large" });
      expect(wrapper.props().size).toEqual("large");
      expect(wrapper.containsMatchingElement(<span>Large</span>)).toBeTruthy();
    });
  });

  describe("with icons", () => {
    it("renders an icon correctly", () => {
      const wrapper = renderButtonBar("Image", 1, {}, { iconType: "filter" });
      const assertion =
        wrapper.find(Icon).exists() &&
        wrapper.find(Icon).props().type === "filter";
      expect(assertion).toEqual(true);
    });

    it("renders an icon correctly after the text", () => {
      const wrapper = renderButtonBar(
        "After",
        1,
        { iconPosition: "after" },
        { iconType: "filter" }
      );
      const assertion =
        wrapper.find(Icon).exists() &&
        wrapper.find(Icon).props().type === "filter";
      expect(assertion).toEqual(true);
      const button = wrapper.find(StyledButton);
      expect(button.props().iconPosition).toEqual("after");
    });
  });

  describe("with IconButtons", () => {
    it("renders an icon correctly", () => {
      const wrapper = mount(
        <ButtonBar>
          <IconButton onAction={() => undefined}>
            <Icon type="csv" />
          </IconButton>
        </ButtonBar>
      );
      const assertion =
        wrapper.find(Icon).exists() &&
        wrapper.find(Icon).props().type === "csv";
      expect(assertion).toEqual(true);
    });

    it("renders multiple icons correctly", () => {
      const wrapper = renderButtonWithIconBar(["csv", "pdf"]);
      expect(wrapper.find(Icon)).toHaveLength(2);
    });

    it("when in a ButtonBar, and no aria-label is passed the aria-label is the Icon type", () => {
      const wrapper = mount(
        <ButtonBar>
          <Button>bar</Button>
          <IconButton onAction={() => undefined}>
            <Icon type="csv" />
          </IconButton>
        </ButtonBar>
      );

      const iconButton = wrapper.find(StyledIconButton);
      expect(iconButton.prop("aria-label")).toEqual("csv");
    });

    it("when in a ButtonBar and a custom aria-label is passed the aria-label matches", () => {
      const wrapper = mount(
        <ButtonBar>
          <Button>bar</Button>
          <IconButton aria-label="foobar" onAction={() => undefined}>
            <Icon type="csv" />
          </IconButton>
        </ButtonBar>
      );

      const iconButton = wrapper.find(StyledIconButton);
      expect(iconButton.prop("aria-label")).toEqual("foobar");
    });
  });

  describe("when custom Button wrapper components are used as children", () => {
    it.each([
      {
        fullWidth: true,
        size: "small",
        iconPosition: "before",
      },
    ] as const)(
      "all props are passed to Button children correctly using context",
      (buttonBarProps) => {
        const WrappedComponent = () => {
          return (
            <>
              <Button>bar</Button>
              <Button>bar</Button>
            </>
          );
        };

        const wrapper = mount(
          <ButtonBar {...buttonBarProps}>
            <WrappedComponent />
            <IconButton onAction={() => undefined}>
              <Icon type="csv" />
            </IconButton>
          </ButtonBar>
        );

        const button = wrapper.find(StyledButton).at(0);
        expect(button.props().fullWidth).toEqual(true);
        expect(button.props().size).toEqual("small");
        expect(button.props().iconPosition).toEqual("before");
      }
    );
  });
});

describe("with different button props", () => {
  it("Button types on button bar are always of type 'secondary'", () => {
    const wrapper = mount(
      <ButtonBar>
        <Button buttonType="primary">primary</Button>
        <Button buttonType="tertiary" fullWidth>
          tertiary
        </Button>
      </ButtonBar>
    );
    wrapper
      .find(StyledButton)
      .forEach((button) =>
        expect(button.props().buttonType).toEqual("secondary")
      );
  });

  it("fullWidth prop is passed to children'", () => {
    const wrapper = renderButtonBar("Button", 1, {}, { fullWidth: true });
    const buttons = wrapper.find(StyledButton);
    buttons.forEach((button) => expect(button.props().fullWidth).toBe(true));
  });

  it("Size is always defined by ButtonBar, not the Buttons", () => {
    const wrapper = mount(
      <ButtonBar size="small">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </ButtonBar>
    );
    wrapper
      .find(StyledButton)
      .forEach((button) => expect(button.props().size).toEqual("small"));
  });

  it("Disabled button works correctly", () => {
    const wrapper = renderButtonBar("Small", 1, {}, { disabled: true });
    expect(wrapper.find("Button").props().disabled).toBeTruthy();
  });

  it("Destructive button works correctly", () => {
    const wrapper = renderButtonBar("Small", 1, {}, { destructive: true });
    expect(wrapper.find(Button).props().destructive).toBeTruthy();
  });

  it("Subtext works correctly", () => {
    const wrapper = renderButtonBar(
      "Sub",
      1,
      { size: "large" },
      { subtext: "subtext" }
    );
    expect(wrapper.containsMatchingElement(<span>subtext</span>)).toBeTruthy();
  });
});
