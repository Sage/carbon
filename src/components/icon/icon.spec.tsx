import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { shade } from "polished";

import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import Icon, { IconProps, LegacyIconTypes } from "./icon.component";
import StyledIcon, {
  StyledIconProps,
  StyledIconInternalProps,
} from "./icon.style";
import iconConfig, { ICON_SHAPES, ICON_SIZES } from "./icon-config";
import baseTheme from "../../style/themes/base";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import styledColor from "../../style/utils/color";
import Tooltip from "../tooltip";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import getColorValue from "../../style/utils/get-color-value";
import { IconType } from "./icon-type";
import { TooltipPositions } from "../tooltip/tooltip.config";
import TabTitleContext from "../tabs/__internal__/tab-title/tab-title.context";
import Logger from "../../__internal__/utils/logger";

interface MismatchedPairs {
  prop: LegacyIconTypes;
  rendersAs: IconType;
}

jest.mock("../../__internal__/utils/helpers/browser-type-check");

const mockBrowserTypeCheck = (browserTypeCheck as unknown) as jest.MockedFunction<
  () => boolean
>;
const mockIsSafari = (isSafari as unknown) as jest.MockedFunction<
  () => boolean
>;

function renderIcon(props: Partial<IconProps>) {
  return <Icon type="add" {...props} />;
}

function renderStyles(
  props: Partial<StyledIconProps> & StyledIconInternalProps
) {
  return TestRenderer.create(<StyledIcon type="add" {...props} />);
}

describe("Icon component", () => {
  testStyledSystemMargin((props) => <Icon type="add" {...props} />);

  const mismatchedPairs: MismatchedPairs[] = [
    { prop: "help", rendersAs: "question" },
    { prop: "maintenance", rendersAs: "settings" },
    { prop: "new", rendersAs: "gift" },
    { prop: "success", rendersAs: "tick" },
    { prop: "messages", rendersAs: "message" },
  ];

  describe("console warnings", () => {
    it("should display 'extra-small' deprecation warning once", () => {
      const loggerSpy = jest.spyOn(Logger, "deprecate");

      mount(<Icon type="home" bgSize="extra-small" />);

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `extra-small` variant of the `bgSize` prop for `Icon` component has been deprecated and will soon be removed."
      );
      expect(loggerSpy).toHaveBeenCalledTimes(1);

      loggerSpy.mockRestore();
    });

    it("should display larger bgSize warning once", () => {
      const consoleSpy = jest.spyOn(console, "warn");

      mount(<Icon type="home" bgSize="small" fontSize="medium" />);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[WARNING - Icon] The "small" `bgSize` is smaller than "medium" `fontSize`, the `bgSize` has been auto adjusted to a larger size.'
      );
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });
  });

  describe.each(mismatchedPairs)(
    "mismatched pairs of props and icons retrieved",
    (mismatchedPair) => {
      it(`renders ${mismatchedPair.prop} as ${mismatchedPair.rendersAs}`, () => {
        const wrapper = mount(renderIcon({ type: mismatchedPair.prop }));
        const elemExists = wrapper
          .find(`[data-element="${mismatchedPair.rendersAs}"]`)
          .exists();
        expect(elemExists).toEqual(true);
      });
    }
  );

  describe("when the icon type is services", () => {
    beforeEach(() => {
      mockBrowserTypeCheck.mockImplementation(() => true);
      mockIsSafari.mockImplementation(() => true);
    });

    it('applies additional margin-top styling when the fontSize is "small"', () => {
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

    it('applies additional margin-top styling when the fontSize is "large"', () => {
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

    it('applies additional margin-top styling when the browser is safari and fontSize is "small"', () => {
      mockBrowserTypeCheck.mockImplementation(() => false);
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

    it('applies additional margin-top styling when the browser is safari and the fontSize is "large"', () => {
      mockBrowserTypeCheck.mockImplementation(() => false);
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
      const wrapper = shallow(renderIcon({ className: "testClass" }));
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
      "--colorsYang100",
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
          shade(0.2, getColorValue(renderedColor)),
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
            color: shade(0.2, getColorValue(renderedColor)),
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
            backgroundColor: shade(0.2, getColorValue(backgroundColor)),
          },
          wrapper.find(StyledIcon),
          { modifier: ":hover" }
        );
      });
    });

    const wrongColors = ["rgb(0,0)", "#ff", "test"];
    describe.each(wrongColors)("when wrong color prop is provided", (color) => {
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockReset();
      });

      it("throws an error", () => {
        mount(<Icon color={color} type="message" />);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
      });
    });

    describe.each(wrongColors)("when wrong bg prop is provided", (color) => {
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockReset();
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
          color: "var(--colorsYin030)",
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
            backgroundColor: "transparent",
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe("background size", () => {
    describe("without shape or color", () => {
      it("renders with default size", () => {
        const wrapper = shallow(renderIcon({ type: "basket" }));
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

    describe("with fontSize", () => {
      it("adjusts background size to match font size when icon is larger", () => {
        const wrapper = renderStyles({ bgSize: "small", fontSize: "large" });
        assertStyleMatch(
          {
            width: iconConfig.backgroundSize.large,
            height: iconConfig.backgroundSize.large,
          },
          wrapper.toJSON()
        );
      });

      it("maintains background size value when icon is smaller", () => {
        const wrapper = renderStyles({ bgSize: "large", fontSize: "medium" });
        assertStyleMatch(
          {
            width: iconConfig.backgroundSize.large,
            height: iconConfig.backgroundSize.large,
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

    it("passes id to Tooltip when tooltipId prop is provided", () => {
      const tooltipId = "tooltip-id";
      const wrapper = mount(
        <Icon type="home" tooltipId={tooltipId} tooltipMessage="foo" />
      );
      expect(wrapper.find(Tooltip).props().id).toEqual(tooltipId);
    });

    it("renders when a custom tooltipMessage is passed", () => {
      const customMessage = <span>foo</span>;
      const wrapper = mount(
        <Icon type="home" tooltipMessage={customMessage} />
      );
      expect(wrapper.find(Tooltip).props().message).toEqual(customMessage);
    });

    it.each(["top", "bottom", "left", "right"] as TooltipPositions[])(
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

    it("tooltips visibility can be overriden by context", () => {
      const wrapper = mount(
        <TooltipProvider tooltipVisible>
          <Icon tooltipMessage="foo" type="home" tooltipVisible={false} />
        </TooltipProvider>
      );

      expect(wrapper.find(Tooltip).props().isVisible).toBe(true);
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

      expect(wrapper.find(Tooltip).props().isVisible).toEqual(undefined);
    });

    it("sets the tabIndex and ariaLabel", () => {
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
          tabIndex: 0,
        })
      );
    });

    it("does not set the tabIndex when the disabled prop is set", () => {
      const wrapper = mount(
        <Icon type="home" tooltipMessage="foo" tooltipVisible disabled />
      );

      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({
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
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => {});
      });

      it("does not throw an error if a valid array is passed", () => {
        consoleSpy.mockReset();

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
        consoleSpy.mockReset();
      });
    });

    describe("TabTitleContext", () => {
      it("overrides tabIndex and sets to undefined", () => {
        const wrapper = mount(
          <TabTitleContext.Provider value={{ isInTab: true }}>
            <Icon type="home" tooltipMessage="foo" tabIndex={0} />
          </TabTitleContext.Provider>
        );

        expect(wrapper.find(StyledIcon).prop("tabIndex")).toBe(undefined);
      });
    });
  });
});
