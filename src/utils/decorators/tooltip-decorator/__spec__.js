import React from "react";
import "jest-styled-components";
import TestUtils from "react-dom/test-utils";
import TooltipDecorator from "./tooltip-decorator";
import { mount } from "enzyme";
import Tooltip from "../../../components/tooltip";

const notOffscreenPositionValues = {
  horizontal: {
    bottom: 80,
    center: 90,
    top: 100,
  },
  tooltipDistances: {
    bottom: 105,
    left: 20,
    right: 105,
    top: 45,
  },
  vertical: {
    center: 65,
    left: 95,
    right: 30,
  },
};

let mockPositionValues = notOffscreenPositionValues;

const expecterModernThemesPositionValues = {
  small: {
    top: "34px",
    bottom: "116px",
    left: "9px",
    right: "116px",
  },
  medium: {
    top: "31px",
    bottom: "119px",
    left: "6px",
    right: "119px",
  },
  large: {
    top: "27px",
    bottom: "123px",
    left: "4px",
    right: "121px",
  },
};

jest.mock("./calculate-position", () => ({
  __esModule: true,
  default: () => mockPositionValues,
}));

/* global jest */

class BasicClass extends React.Component {
  UNSAFE_componentWillUpdate() {}
  componentDidUpdate() {}
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps() {}
  onBlur = () => {};
  onFocus = () => {};
  onMouseEnter = () => {};
  onMouseLeave = () => {};

  get componentProps() {
    return {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
  }

  render() {
    return (
      <div
        ref={(comp) => {
          this._target = comp;
        }}
      >
        {this.tooltipHTML}
      </div>
    );
  }
}

class StrippedClass extends React.Component {
  UNSAFE_componentWillUpdate() {}
  componentDidUpdate() {}
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps() {}
  onBlur = () => {};
  onFocus = () => {};
  onMouseEnter = () => {};
  onMouseLeave = () => {};

  render() {
    return <div>{this.tooltipHTML}</div>;
  }
}

describe("tooltip-decorator", () => {
  let topTooltip,
    noTooltip,
    strippedTooltip,
    DecoratedClassOne,
    DecoratedClassTwo;

  beforeEach(() => {
    DecoratedClassOne = TooltipDecorator(BasicClass);
    DecoratedClassTwo = TooltipDecorator(StrippedClass);

    topTooltip = TestUtils.renderIntoDocument(
      <DecoratedClassOne tooltipMessage="Hello" tooltipPosition="top" />
    );
    noTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne />);

    strippedTooltip = TestUtils.renderIntoDocument(<DecoratedClassTwo />);

    jest.useFakeTimers();
  });

  describe("componentWillReceiveProps", () => {
    describe("if currently visible", () => {
      describe("with the same tooltipPosition", () => {
        it("calls setState to reset the hover", () => {
          topTooltip.state.isVisible = true;
          spyOn(topTooltip, "setState");
          topTooltip.UNSAFE_componentWillReceiveProps({
            tooltipPosition: "top",
          });
          expect(topTooltip.setState).not.toHaveBeenCalled();
        });
      });

      describe("with different tooltipPosition", () => {
        it('calls setState to reset the the "hover", "tooltipPosition" and "tooltipAlign" states', () => {
          topTooltip.state.isVisible = true;
          spyOn(topTooltip, "setState");
          topTooltip.UNSAFE_componentWillReceiveProps({
            tooltipPosition: "bottom",
          });
          expect(topTooltip.setState).toHaveBeenCalledWith({
            tooltipPosition: "",
            tooltipAlign: "",
          });
        });
      });
    });

    describe("if not visible", () => {
      it("does not call setState", () => {
        spyOn(topTooltip, "setState");
        topTooltip.UNSAFE_componentWillReceiveProps({ tooltipPosition: "top" });
        expect(topTooltip.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe("componentDidMount", () => {
    it("positions the tooltip if visible", () => {
      const visibleTooltip = TestUtils.renderIntoDocument(
        <DecoratedClassOne tooltipMessage="Hello" tooltipVisible />
      );
      spyOn(visibleTooltip, "positionTooltip");
      visibleTooltip.componentDidMount();
      expect(visibleTooltip.positionTooltip).toHaveBeenCalled();
    });

    it("does not position the tooltip if not visible", () => {
      spyOn(topTooltip, "positionTooltip");
      topTooltip.componentDidMount();
      expect(topTooltip.positionTooltip).not.toHaveBeenCalled();
    });
  });

  describe("on show", () => {
    beforeEach(() => {
      spyOn(topTooltip, "positionTooltip");
    });

    it("shows the tooltip after a timeout", () => {
      spyOn(topTooltip, "setState");
      topTooltip.onShow();
      jest.runTimersToTime(300);
      expect(topTooltip.setState).toHaveBeenCalledWith({ isVisible: true });
    });

    it("clears the timeout", () => {
      topTooltip.state.isVisible = true;
      spyOn(window, "clearTimeout");

      topTooltip.onShow();
      jest.runTimersToTime(300);
      expect(window.clearTimeout).toHaveBeenCalledWith(
        topTooltip._hideTooltipTimeout
      );
    });

    it("calls positionTooltip after a timeout", () => {
      topTooltip.onShow();
      jest.runTimersToTime(300);
      expect(topTooltip.positionTooltip).toHaveBeenCalled();
    });
  });

  describe("on hide", () => {
    it("hides the tooltip after a timeout", () => {
      topTooltip.state.isVisible = true;
      spyOn(topTooltip, "setState");
      topTooltip.onHide();
      jest.runTimersToTime(300);
      expect(topTooltip.setState).toHaveBeenCalledWith({ isVisible: false });
    });

    it("clears the timeout", () => {
      spyOn(window, "clearTimeout");
      topTooltip.onHide();
      jest.runTimersToTime(300);
      expect(window.clearTimeout).toHaveBeenCalledWith(
        topTooltip._showTooltipTimeout
      );
    });
  });

  describe("when there is no tooltip", () => {
    it("hides the tooltip", () => {
      noTooltip.onShow();
      jest.runTimersToTime(100);
      expect(noTooltip.state.isVisible).toBeFalsy();
    });
  });

  describe("when there is no target", () => {
    beforeEach(() => {
      spyOn(topTooltip, "getTarget").and.returnValue(null);
      spyOn(topTooltip, "getTooltip").and.returnValue({
        offsetWidth: 100,
        offsetHeight: 50,
        style: {},
        children: [
          { foo: "bar" },
          {
            offsetHeight: 7,
          },
        ],
      });
    });

    it("hides the tooltip", () => {
      topTooltip.onShow();
      jest.runTimersToTime(100);
      expect(topTooltip.state.isVisible).toBeFalsy();
    });
  });

  describe("componentProps", () => {
    it("sets an onMouseEnter event of chained functions", () => {
      spyOn(topTooltip, "onShow");
      spyOn(topTooltip, "onMouseEnter");
      topTooltip.componentProps.onMouseEnter();
      expect(topTooltip.onShow).toHaveBeenCalled();
      expect(topTooltip.onMouseEnter).toHaveBeenCalled();
    });

    it("sets an onMouseLeave event of chained functions", () => {
      spyOn(topTooltip, "onHide");
      spyOn(topTooltip, "onMouseLeave");
      topTooltip.componentProps.onMouseLeave();
      expect(topTooltip.onHide).toHaveBeenCalled();
      expect(topTooltip.onMouseLeave).toHaveBeenCalled();
    });

    it("sets an onBlur event of chained functions", () => {
      spyOn(topTooltip, "onHide");
      spyOn(topTooltip, "onBlur");
      topTooltip.componentProps.onBlur();
      expect(topTooltip.onHide).toHaveBeenCalled();
      expect(topTooltip.onBlur).toHaveBeenCalled();
    });

    it("sets an onFocus event of chained functions", () => {
      spyOn(topTooltip, "onShow");
      spyOn(topTooltip, "onFocus");
      topTooltip.componentProps.onFocus();
      expect(topTooltip.onShow).toHaveBeenCalled();
      expect(topTooltip.onFocus).toHaveBeenCalled();
    });

    it("adds a touchEnd handler that toggles the tooltip on or off", () => {
      spyOn(topTooltip, "onShow");
      spyOn(topTooltip, "onHide");
      spyOn(topTooltip, "positionTooltip");

      topTooltip.setState({ isVisible: true });
      topTooltip.componentProps.onTouchEnd();
      expect(topTooltip.onHide).toHaveBeenCalled();

      topTooltip.setState({ isVisible: false });
      topTooltip.componentProps.onTouchEnd();
      expect(topTooltip.onShow).toHaveBeenCalled();
    });

    describe("when no tooltipMessage is defined", () => {
      it("sets the original onMouseEnter", () => {
        spyOn(noTooltip, "onShow");
        spyOn(noTooltip, "onMouseEnter");
        noTooltip.componentProps.onMouseEnter();
        expect(noTooltip.onShow).not.toHaveBeenCalled();
        expect(noTooltip.onMouseEnter).toHaveBeenCalled();
      });

      it("sets the original onMouseLeave event", () => {
        spyOn(noTooltip, "onHide");
        spyOn(noTooltip, "onMouseLeave");
        noTooltip.componentProps.onMouseLeave();
        expect(noTooltip.onHide).not.toHaveBeenCalled();
        expect(noTooltip.onMouseLeave).toHaveBeenCalled();
      });

      it("sets the original onBlur event", () => {
        spyOn(noTooltip, "onHide");
        spyOn(noTooltip, "onBlur");
        noTooltip.componentProps.onBlur();
        expect(noTooltip.onHide).not.toHaveBeenCalled();
        expect(noTooltip.onBlur).toHaveBeenCalled();
      });

      it("sets the original onFocus event", () => {
        spyOn(noTooltip, "onShow");
        spyOn(noTooltip, "onFocus");
        noTooltip.componentProps.onFocus();
        expect(noTooltip.onShow).not.toHaveBeenCalled();
        expect(noTooltip.onFocus).toHaveBeenCalled();
      });

      it("does not add a touchEnd handler", () => {
        expect(noTooltip.componentProps.onTouchEnd).not.toBeDefined();
      });
    });

    describe("when the super class lacks a componentProps method", () => {
      it("sets props to an empty object", () => {
        expect(strippedTooltip.componentProps).toEqual({});
      });
    });
  });

  describe("tooltipHTML", () => {
    describe("when a tooltipMessage is defined", () => {
      it("returns a Tooltip", () => {
        expect(topTooltip.getTooltip()).toBeDefined();
      });
    });
  });

  describe("when no tooltip message is provided", () => {
    it("does not render a tooltip", () => {
      expect(noTooltip.getTooltip()).toEqual(null);
    });
  });

  describe("displayName", () => {
    class Foo extends React.Component {
      // eslint-disable-line react/no-multi-comp
      bar = () => {
        return "bar";
      };
    }

    const displayName = "FooClass";

    describe("when ComposedComponent.displayName is defined", () => {
      beforeEach(() => {
        Foo.displayName = displayName;
      });
      afterEach(() => {
        Foo.displayName = undefined;
      });

      it("sets Component.displayName to ComposedComponent.displayName", () => {
        const DecoratedComponent = TooltipDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe(displayName);
      });
    });

    describe("when ComposedComponent.displayName is undefined", () => {
      it("sets Component.displayName to ComposedComponent.name", () => {
        const DecoratedComponent = TooltipDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe("Foo");
      });
    });
  });
});

// refactored tests
describe("tooltip-decorator", () => {
  describe.each([
    ["top", "45px"],
    ["bottom", "105px"],
  ])(
    "when the position prop is set to %s",
    (position, expectedVerticalValue) => {
      describe.each([
        ["left", "95px"],
        ["center", "65px"],
        ["right", "30px"],
      ])(
        "and when the align prop is set to %s",
        (align, expectedHorizontalValue) => {
          it('sets the correct "top" and "left" styles', () => {
            const wrapper = render(
              {
                tooltipMessage: "Hello",
                tooltipPosition: position,
                tooltipAlign: align,
              },
              mount
            );
            const tooltip = wrapper.find(Tooltip);

            expect(tooltip.getDOMNode().style.top).toBe(expectedVerticalValue);
            expect(tooltip.getDOMNode().style.left).toBe(
              expectedHorizontalValue
            );
          });
        }
      );
    }
  );

  describe.each([
    ["left", "20px"],
    ["right", "105px"],
  ])(
    "when the position prop is set to %s",
    (position, expectedHorizontalValue) => {
      describe.each([
        ["top", "100px"],
        ["center", "90px"],
        ["bottom", "80px"],
      ])(
        "and when the align prop is set to %s",
        (align, expectedVerticalValue) => {
          it('sets the correct "top" and "left" styles', () => {
            const wrapper = render(
              {
                tooltipMessage: "Hello",
                tooltipPosition: position,
                tooltipAlign: align,
              },
              mount
            );
            const tooltip = wrapper.find(Tooltip);

            expect(tooltip.getDOMNode().style.top).toBe(expectedVerticalValue);
            expect(tooltip.getDOMNode().style.left).toBe(
              expectedHorizontalValue
            );
          });
        }
      );
    }
  );

  describe("when the tooltip is offscreen left", () => {
    beforeAll(() => {
      mockPositionValues = {
        horizontal: {
          bottom: 80,
          center: 90,
          top: 100,
        },
        tooltipDistances: {
          bottom: 105,
          left: 0,
          right: 105,
          top: 45,
        },
        vertical: {
          center: 10,
          left: 95,
          right: 30,
        },
      };
    });

    afterAll(() => {
      mockPositionValues = notOffscreenPositionValues;
    });

    describe("and positioned to the top with center align", () => {
      it("should realign to the left", () => {
        const wrapper = render(
          {
            tooltipMessage: "Hello",
            tooltipPosition: "top",
            tooltipAlign: "center",
          },
          mount
        );
        const tooltip = wrapper.find(Tooltip);
        expect(tooltip.props().align).toBe("left");
      });
    });

    describe("and positioned to the left with center align", () => {
      it("should realign to the left", () => {
        const wrapper = render(
          {
            tooltipMessage: "Hello",
            tooltipPosition: "left",
            tooltipAlign: "center",
          },
          mount
        );
        const tooltip = wrapper.find(Tooltip);
        expect(tooltip.props().align).toBe("left");
      });
    });

    describe("and positioned to the right with center align", () => {
      it("should not realign", () => {
        const wrapper = render(
          {
            tooltipMessage: "Hello",
            tooltipPosition: "right",
            tooltipAlign: "center",
          },
          mount
        );
        const tooltip = wrapper.find(Tooltip);
        expect(tooltip.props().align).toBe("center");
      });
    });
  });

  describe("when the tooltip is offscreen right", () => {
    const innerWidth = window.innerWidth;

    beforeEach(() => {
      window.innerWidth = 0;
    });

    describe("and positioned to the top with center align", () => {
      it("realigns to the right", () => {
        const wrapper = render(
          {
            tooltipMessage: "Hello",
            tooltipPosition: "top",
            tooltipAlign: "center",
          },
          mount
        );
        const tooltip = wrapper.find(Tooltip);
        expect(tooltip.props().align).toBe("right");
        window.innerWidth = innerWidth;
      });
    });

    describe("and positioned to the right with center align", () => {
      it("repositions to the top and realigns to the right", () => {
        const wrapper = render(
          {
            tooltipMessage: "Hello",
            tooltipPosition: "right",
            tooltipAlign: "center",
          },
          mount
        );
        const tooltip = wrapper.find(Tooltip);
        expect(tooltip.props().position).toBe("top");
        expect(tooltip.props().align).toBe("right");
      });
    });

    afterEach(() => {
      window.innerWidth = innerWidth;
    });
  });

  describe("when the tooltipVisible prop is set to false", () => {
    it("then the tooltip should be not rendered", () => {
      const wrapper = render(
        {
          tooltipMessage: "Hello",
          tooltipPosition: "top",
          tooltipAlign: "center",
        },
        mount
      );
      wrapper.setProps({ tooltipVisible: false });

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.exists()).toBe(false);
    });
  });
});

describe("tooltip-decorator Modern Themes", () => {
  describe.each([["small"], ["medium"], ["large"]])(
    "when the size prop is set to %s",
    (size) => {
      describe.each([
        ["top", "top"],
        ["bottom", "top"],
        ["left", "left"],
        ["right", "left"],
      ])(
        "and when the position prop is set to %s",
        (position, styleProperty) => {
          it(`sets the correct "${styleProperty}" style`, () => {
            const wrapper = render(
              {
                size: size,
                tooltipMessage: "Hello",
                tooltipPosition: position,
                isThemeModern: true,
                isPartOfInput: true,
              },
              mount
            );
            const tooltip = wrapper.find(Tooltip);

            expect(tooltip.getDOMNode().style[styleProperty]).toBe(
              expecterModernThemesPositionValues[size][position]
            );
          });
        }
      );
    }
  );
});

function render(props, renderer) {
  const Decorated = TooltipDecorator(BasicClass);

  return renderer(<Decorated tooltipVisible {...props} />);
}
