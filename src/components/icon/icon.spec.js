import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { shade } from "polished";

import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Icon from "./icon.component";
import StyledIcon from "./icon.style";
import iconConfig, { ICON_SHAPES, ICON_SIZES } from "./icon-config";
import baseTheme from "../../style/themes/base";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import styledColor from "../../style/utils/color.js";
import Tooltip from "../tooltip";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

jest.mock("../../__internal__/utils/helpers/browser-type-check");
jest.mock("@tippyjs/react/headless", () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

function render(props, renderer = shallow) {
  return renderer(<Icon type="add" {...props} />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledIcon type="add" {...props} />);
}

describe("Icon component", () => {
  testStyledSystemMargin((props) => <Icon type="add" {...props} />);

  const mismatchedPairs = [
    { prop: "help", rendersAs: "question" },
    { prop: "maintenance", rendersAs: "settings" },
    { prop: "new", rendersAs: "gift" },
    { prop: "success", rendersAs: "tick" },
    { prop: "messages", rendersAs: "message" },
  ];

  describe.each(mismatchedPairs)(
    "mismatched pairs of props and icons retrieved",
    (mismatchedPair) => {
      it(`renders ${mismatchedPair.prop} as ${mismatchedPair.rendersAs}`, () => {
        const wrapper = render({ type: mismatchedPair.prop }, mount);
        const elemExists = wrapper
          .find(`[data-element="${mismatchedPair.rendersAs}"]`)
          .exists();
        expect(elemExists).toEqual(true);
      });
    }
  );

  describe("when the icon type is services", () => {
    beforeEach(() => {
      browserTypeCheck.mockImplementation(() => true);
      isSafari.mockImplementation(() => true);
    });

    it('it applies additional margin-top styling when the fontSize is "small"', () => {
      const wrapper = renderStyles({
        type: "services",
        fontSize: "small",
      });
      assertStyleMatch(
        {
          marginTop: "-7px",
        },
        wrapper.toJSON(),
        { modifier: "&::before" }
      );
    });

    it('it applies additional margin-top styling when the fontSize is "large"', () => {
      const wrapper = renderStyles({
        type: "services",
        fontSize: "large",
      });
      assertStyleMatch(
        {
          marginTop: "-8px",
        },
        wrapper.toJSON(),
        { modifier: "&::before" }
      );
    });

    it('it applies additional margin-top styling when the browser is safari and fontSize is "small"', () => {
      browserTypeCheck.mockImplementation(() => false);
      const wrapper = renderStyles({
        type: "services",
        fontSize: "small",
      });
      assertStyleMatch(
        {
          marginTop: "-6px",
        },
        wrapper.toJSON(),
        { modifier: "&::before" }
      );
    });

    it('it applies additional margin-top styling when the browser is safari and the fontSize is "large"', () => {
      browserTypeCheck.mockImplementation(() => false);
      const wrapper = renderStyles({
        type: "services",
        theme: baseTheme,
        fontSize: "large",
      });
      assertStyleMatch(
        {
          marginTop: "-6px",
        },
        wrapper.toJSON(),
        { modifier: "&::before" }
      );
    });
  });

  describe("with custom class name", () => {
    it("renders with a custom className", () => {
      const wrapper = render({ className: "testClass" });
      expect(wrapper.find(".testClass").length).toEqual(1);
    });
  });

  describe("custom colors", () => {
    const correctColors = [
      "primary",
      "red",
      "slateShade50",
      "rgb(0,123,100)",
      "hsl(0,100%,50%)",
      "#123456",
    ];
    describe.each(correctColors)("when color prop is provided", (color) => {
      it("renders properly colored Icon", () => {
        const wrapper = mount(<Icon type="home" color={color} />);
        const { color: renderedColor } = styledColor({
          theme: baseTheme,
          color,
        });

        assertStyleMatch(
          {
            color: renderedColor,
          },
          wrapper.find(StyledIcon)
        );
      });

      it("renders properly colored Icon when hovered", () => {
        const wrapper = mount(<Icon color={color} type="message" />);
        const { color: renderedColor } = styledColor({
          theme: baseTheme,
          color,
        });
        expect(wrapper.find(StyledIcon)).not.toHaveStyleRule(
          "color",
          shade(0.2, renderedColor),
          { modifier: ":hover" }
        );
      });

      it("renders properly colored Icon with tooltip", () => {
        const wrapper = mount(
          <Icon
            type="home"
            color={color}
            bg={color}
            tooltipMessage="tooltip message"
          />
        );
        const { color: renderedColor } = styledColor({
          theme: baseTheme,
          color,
        });
        assertStyleMatch(
          {
            color: renderedColor,
          },
          wrapper.find(StyledIcon)
        );
        assertStyleMatch(
          {
            backgroundColor: renderedColor,
          },
          wrapper.find(StyledIcon)
        );
      });

      it("renders properly colored Icon with tooltip when hovered", () => {
        const wrapper = mount(
          <Icon
            type="home"
            color={color}
            bg={color}
            tooltipMessage="tooltip message"
          />
        );
        const { color: renderedColor } = styledColor({
          theme: baseTheme,
          color,
        });

        assertStyleMatch(
          {
            color: shade(0.2, renderedColor),
          },
          wrapper.find(StyledIcon),
          { modifier: ":hover" }
        );
      });
    });
    describe.each(correctColors)("when bg prop is provided", (color) => {
      it("renders properly colored Icon", () => {
        const wrapper = mount(<Icon bg={color} type="message" />);
        const { backgroundColor } = styledColor({
          theme: baseTheme,
          bg: color,
        });

        assertStyleMatch(
          {
            backgroundColor,
          },
          wrapper.find(StyledIcon)
        );
      });

      it("renders properly colored Icon when hovered", () => {
        const wrapper = mount(
          <Icon bg={color} type="message" tooltipMessage="test" />
        );
        const { backgroundColor } = styledColor({
          theme: baseTheme,
          bg: color,
        });

        assertStyleMatch(
          {
            backgroundColor: shade(0.2, backgroundColor),
          },
          wrapper.find(StyledIcon),
          { modifier: ":hover" }
        );
      });
    });

    const wrongColors = ["rgb(0,0)", "#ff", "test"];
    describe.each(wrongColors)("when wrong color prop is provided", (color) => {
      beforeEach(() => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it("throws an error", () => {
        mount(<Icon color={color} type="message" />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
      });
    });

    describe.each(wrongColors)("when wrong bg prop is provided", (color) => {
      beforeEach(() => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it("throws an error", () => {
        mount(<Icon bg={color} type="message" />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
      });
    });
  });

  describe("icon color", () => {
    it("renders proper icon color for disabled state", () => {
      const wrapper = renderStyles({ disabled: true });
      assertStyleMatch(
        {
          color: baseTheme.icon.disabled,
        },
        wrapper.toJSON()
      );
    });
  });

  describe("background color", () => {
    describe("when disabled", () => {
      it("renders backgroundColor in a proper color", () => {
        const wrapper = renderStyles({ disabled: true });
        assertStyleMatch(
          {
            backgroundColor: baseTheme.icon.disabled,
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe("background size", () => {
    describe("without shape or color", () => {
      it("renders with default size", () => {
        const wrapper = render({ type: "basket" });
        const icon = wrapper.find(StyledIcon);
        expect(icon.props().bgSize).toEqual("small");
      });
    });

    describe.each(ICON_SIZES)("with bgSize prop provided", (size) => {
      it(`renders in the proper size for ${size}`, () => {
        const wrapper = renderStyles({ bgSize: size });
        assertStyleMatch(
          {
            width: iconConfig.backgroundSize[size],
            height: iconConfig.backgroundSize[size],
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe.each(ICON_SHAPES)("background shape", (shape) => {
    it(`renders in the proper size for ${shape}`, () => {
      const wrapper = renderStyles({ bgShape: shape });
      assertStyleMatch(
        {
          borderRadius: iconConfig.backgroundShape[shape],
        },
        wrapper.toJSON()
      );
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(<Icon type="tick" data-role="baz" />);
      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper.find(StyledIcon), "icon", "tick", "baz");
      });
    });
  });

  describe("tooltip", () => {
    it("renders when a tooltipMessage is passed", () => {
      const wrapper = mount(<Icon type="home" tooltipMessage="foo" />);
      expect(wrapper.find(Tooltip).props().message).toEqual("foo");
    });

    it("renders when a custom tooltipMessage is passed", () => {
      const customMessage = <span>foo</span>;
      const wrapper = mount(
        <Icon type="home" tooltipMessage={customMessage} />
      );
      expect(wrapper.find(Tooltip).props().message).toEqual(customMessage);
    });

    it.each(["top", "bottom", "left", "right"])(
      "renders in a given tooltipPosition",
      (position) => {
        const wrapper = mount(
          <Icon type="home" tooltipMessage="foo" tooltipPosition={position} />
        );

        expect(wrapper.find(Tooltip).props().position).toEqual(position);
      }
    );

    it('tooltips "position" can be overriden by context', () => {
      const wrapper = mount(
        <TooltipProvider tooltipPosition="top">
          <Icon tooltipMessage="foo" type="home" tooltipPosition="left" />
        </TooltipProvider>
      );

      expect(wrapper.find(Tooltip).props().position).toBe("top");
    });

    it("supports being controlled via tooltipVisible prop", () => {
      const wrapper = mount(
        <Icon type="home" tooltipMessage="foo" tooltipVisible />
      );

      expect(wrapper.find(Tooltip).props().isVisible).toEqual(true);
    });

    it("does not display when icon is disabled", () => {
      const wrapper = mount(
        <Icon type="home" tooltipMessage="foo" tooltipVisible disabled />
      );

      expect(wrapper.find(Tooltip).props().isVisible).toEqual(false);
    });

    it("sets the tabIndex, ariaLabel and role", () => {
      const wrapper = mount(
        <Icon
          type="home"
          ariaLabel="home"
          tooltipMessage="foo"
          tooltipVisible
        />
      );

      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({
          "aria-label": "home",
          role: "tooltip",
          tabIndex: 0,
        })
      );
    });

    it("does not set the tabIndex and role when the disabled prop is set", () => {
      const wrapper = mount(
        <Icon type="home" tooltipMessage="foo" tooltipVisible disabled />
      );

      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({
          role: undefined,
          tabIndex: undefined,
        })
      );
    });

    it("supports overriding the tabIndex and role", () => {
      const wrapper = mount(
        <Icon
          type="home"
          ariaLabel="home"
          tooltipMessage="foo"
          tooltipVisible
          role="region"
          tabIndex={-1}
        />
      );

      expect(wrapper.find(StyledIcon).prop("role")).toEqual("region");
      expect(wrapper.find(StyledIcon).prop("tabIndex")).toEqual(-1);
    });

    describe("tooltipFlipOverrides", () => {
      it("does not throw an error if a valid array is passed", () => {
        global.console.error.mockReset();

        jest.spyOn(global.console, "error").mockImplementation(() => {});

        mount(
          <Icon
            type="home"
            tooltipMessage="foo"
            tooltipFlipOverrides={["top", "bottom"]}
          />
        );

        // eslint-disable-next-line no-console
        expect(console.error).not.toHaveBeenCalled();
        global.console.error.mockReset();
      });

      it("throws an error if a invalid array is passed", () => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
        mount(
          <Icon
            type="home"
            tooltipMessage="foo"
            tooltipFlipOverrides={["foo", "bar"]}
          />
        );

        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
        global.console.error.mockReset();
      });
    });
  });
});
