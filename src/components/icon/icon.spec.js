import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { shade } from "polished";

import Tooltip from "../tooltip";
import { rootTagTest } from "../../utils/helpers/tags/tags-specs/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import Icon from "./icon.component";
import StyledIcon from "./icon.style";
import OptionsHelper from "../../utils/helpers/options-helper";
import iconConfig from "./icon-config";
import baseTheme from "../../style/themes/base";
import browserTypeCheck, {
  isSafari,
} from "../../utils/helpers/browser-type-check";
import { toColor } from "../../style/utils/color.js";

jest.mock("../../utils/helpers/browser-type-check");

function render(props) {
  return shallow(<Icon type="add" {...props} />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledIcon type="add" {...props} />);
}

describe("Icon component", () => {
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
        const wrapper = render({ type: mismatchedPair.prop });
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
    it("renders with a custom classname", () => {
      const wrapper = render({ className: "testClass" });
      expect(wrapper.find(".testClass").length).toEqual(1);
    });
  });

  describe("custom colors", () => {
    const correctColors = [
      "red",
      "slateShade50",
      "rgb(0,123,100)",
      "hsl(0,100%,50%)",
      "#123456",
    ];
    describe.each(correctColors)("when color prop is provided", (color) => {
      it("takes precedence over iconColor and renders properly colored Icon", () => {
        const wrapper = mount(<Icon color={color} />);
        assertStyleMatch(
          {
            color: toColor(baseTheme, color),
          },
          wrapper.find(StyledIcon)
        );
      });

      it("renders properly colored Icon when hovered", () => {
        const wrapper = mount(<Icon color={color} />);
        assertStyleMatch(
          {
            color: shade(0.2, toColor(baseTheme, color)),
          },
          wrapper.find(StyledIcon),
          { modifier: ":hover" }
        );
      });
    });
    describe.each(correctColors)("when bg prop is provided", (color) => {
      it("takes precedence over bgTheme and renders properly colored Icon", () => {
        const wrapper = mount(<Icon bg={color} />);
        assertStyleMatch(
          {
            backgroundColor: toColor(baseTheme, color),
          },
          wrapper.find(StyledIcon)
        );
      });

      it("renders properly colored Icon when hovered", () => {
        const wrapper = mount(<Icon bg={color} />);
        assertStyleMatch(
          {
            backgroundColor: shade(0.2, toColor(baseTheme, color)),
          },
          wrapper.find(StyledIcon),
          { modifier: ":hover" }
        );
      });
    });

    const wrongColors = ["rgb(0,0)", "#ff", "test"];
    describe.each(wrongColors)("when wrong color prop is provided", (color) => {
      it("throws an error", () => {
        jest.spyOn(global.console, "error");
        mount(<Icon color={color} />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
      });
    });
    describe.each(wrongColors)("when wrong bg prop is provided", (color) => {
      it("throws an error", () => {
        jest.spyOn(global.console, "error");
        mount(<Icon bg={color} />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
      });
    });
  });

  describe("icon color", () => {
    it("renders proper icon color for disabled state", () => {
      const wrapper = renderStyles({ disabled: true, bgTheme: "business" });
      assertStyleMatch(
        {
          color: baseTheme.icon.disabled,
        },
        wrapper.toJSON()
      );
    });

    describe.each(["error", "info", "business"])(
      "whent the background theme is %s",
      (whiteIconBackground) => {
        it("renders a white icon", () => {
          const wrapper = renderStyles({ bgTheme: whiteIconBackground });
          assertStyleMatch(
            {
              color: baseTheme.colors.white,
            },
            wrapper.toJSON()
          );
        });
      }
    );

    describe.each(["success", "warning"])(
      "when the background theme is %s",
      (darkIconBackground) => {
        it("renders a dark icon", () => {
          const wrapper = renderStyles({ bgTheme: darkIconBackground });
          assertStyleMatch(
            {
              color: baseTheme.icon.default,
            },
            wrapper.toJSON()
          );

          assertStyleMatch(
            {
              color: baseTheme.icon.defaultHover,
            },
            wrapper.toJSON(),
            { modifier: ":hover" }
          );
        });
      }
    );

    describe("when bgTheme is set to none", () => {
      it("renders white icon when iconColor is set to onDarkBackground", () => {
        const wrapper = renderStyles({
          iconColor: "on-dark-background",
          bgTheme: "none",
        });
        assertStyleMatch(
          {
            color: baseTheme.colors.white,
          },
          wrapper.toJSON()
        );
      });

      it("renders dark icon when iconColor is set to onLightBackground", () => {
        const wrapper = renderStyles({
          iconColor: "on-light-background",
          bgTheme: "none",
        });
        assertStyleMatch(
          {
            color: baseTheme.icon.onLightBackground,
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            color: baseTheme.icon.onLightBackgroundHover,
          },
          wrapper.toJSON(),
          { modifier: ":hover" }
        );
      });

      describe('fontSize is "large" and bgSize is "small"', () => {
        it('sets the height and width style properties of bgSize to same as "large"', () => {
          const wrapper = renderStyles({
            fontSize: "large",
            bgTheme: "foo",
            bgSize: "small",
          });
          assertStyleMatch(
            {
              height: "40px",
              width: "40px",
            },
            wrapper.toJSON()
          );
        });
      });

      it("renders dark icon when iconColor is set to business-color", () => {
        const wrapper = renderStyles({
          iconColor: "business-color",
          bgTheme: "none",
        });
        assertStyleMatch(
          {
            color: baseTheme.colors.primary,
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            color: "#006800",
          },
          wrapper.toJSON(),
          { modifier: ":hover" }
        );
      });
    });
  });

  describe("spacing props", () => {
    describe("when mr prop is passed", () => {
      it("renders with proper margin-right style", () => {
        const wrapper = renderStyles({ mr: 2 });
        assertStyleMatch(
          {
            marginRight: "16px",
          },
          wrapper.toJSON()
        );
      });
    });

    describe("when ml prop is passed", () => {
      it("renders with proper margin-left style", () => {
        const wrapper = renderStyles({ ml: 2 });
        assertStyleMatch(
          {
            marginLeft: "16px",
          },
          wrapper.toJSON()
        );
      });
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

    describe("when bgTheme is set to none", () => {
      it("renders transparent background", () => {
        const wrapper = renderStyles({ bgTheme: "none" });
        assertStyleMatch(
          {
            backgroundColor: "transparent",
          },
          wrapper.toJSON()
        );
      });
    });

    describe.each(["info", "error", "success", "warning"])(
      "when bgTheme is set to one of the statuses",
      (status) => {
        const wrapper = renderStyles({ bgTheme: status });
        const hoverColors = {
          info: "#005C9B",
          error: "#9F2D3F",
          success: "#008D00",
          warning: "#BA5000",
        };
        it(`renders proper background color for ${status}`, () => {
          assertStyleMatch(
            {
              backgroundColor: baseTheme.colors[status],
            },
            wrapper.toJSON()
          );

          assertStyleMatch(
            {
              backgroundColor: hoverColors[status],
            },
            wrapper.toJSON(),
            { modifier: ":hover" }
          );
        });
      }
    );

    describe("when bgTheme is set to business", () => {
      const wrapper = renderStyles({ bgTheme: "business" });

      it("renders proper background color", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.primary,
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            backgroundColor: "#006800",
          },
          wrapper.toJSON(),
          { modifier: ":hover" }
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

    describe.each(OptionsHelper.sizesRestricted)(
      "with bgSize prop provided",
      (size) => {
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
      }
    );
  });

  describe.each(OptionsHelper.shapes)("background shape", (shape) => {
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

  describe("when passed a tooltipMessage", () => {
    it("renders a tooltip", () => {
      const wrapper = mount(
        <Icon type="info" tooltipMessage="Helpful content" />
      );
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.length).toEqual(1);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(<Icon type="tick" data-role="baz" />);
      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper.find(StyledIcon), "icon", "tick", "baz");
      });
    });
    describe("on internal elements", () => {
      const wrapper = mount(
        <Icon
          tooltipMessage="Test"
          tooltipAlign="left"
          tooltipPosition="top"
          type="tick"
        />
      );
      wrapper.setState({ isVisible: true });
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().align).toEqual("left");
      expect(tooltip.props().position).toEqual("top");
      expect(tooltip.props().children).toEqual("Test");
    });
  });
});
