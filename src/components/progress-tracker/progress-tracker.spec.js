import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledValue,
  StyledProgressTracker,
} from "./progress-tracker.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import ProgressBar from "./progress-tracker.component";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../hooks/__internal__/useResizeObserver");

describe("ProgressBar", () => {
  let wrapper;
  let loggerSpy;

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetHeight"
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetWidth"
  );

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate");
  });
  afterEach(() => {
    loggerSpy.mockRestore();
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 256,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 256,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      "offsetHeight",
      originalOffsetHeight
    );
    Object.defineProperty(
      HTMLElement.prototype,
      "offsetWidth",
      originalOffsetWidth
    );
  });

  testStyledSystemMargin((props) => <ProgressBar {...props} />);

  describe("deprecation warning", () => {
    it("should be called only once when the `orientation` or `direction` props are set", () => {
      wrapper = mount(
        <>
          <ProgressBar direction="up" />
          <ProgressBar orientation="vertical" />
        </>
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `orientation` and `direction` props in `ProgressTracker` component are deprecated and will soon be removed."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("renders component as expected", () => {
    wrapper = mount(<ProgressBar />);
    const innerBar = wrapper.find(InnerBar);
    expect(innerBar).toBeTruthy();
  });

  describe("when a custom length is set", () => {
    describe("horizontal orientation", () => {
      it.each(["50px", "100%", "auto"])(
        "sets the width to %s as expected",
        (width) => {
          wrapper = mount(<ProgressBar length={width} />);
          assertStyleMatch(
            {
              width,
            },
            wrapper.find(StyledProgressTracker)
          );
        }
      );
    });
  });

  describe("when the outer bar is resized", () => {
    it("the inner bar length is recalculated", () => {
      wrapper = mount(<ProgressBar progress={50} />);

      act(() => {
        useResizeObserver.mock.calls[
          useResizeObserver.mock.calls.length - 1
        ][1]();
      });

      wrapper.update();

      assertStyleMatch(
        {
          width: "calc(256px * 0.5)",
        },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("when size is not specified", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar progress={50} />);
    });

    it("renders outer bar as expected", () => {
      assertStyleMatch(
        {
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "256px",
        },
        wrapper.find(ProgressBar)
      );
    });

    it("renders inner bar as expected", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsSemanticNeutral500)",
          width: "calc(256px * 0.5)",
          height: "var(--sizing100)",
        },
        wrapper.find(InnerBar)
      );
    });

    describe("and orientation is vertical", () => {
      beforeEach(() => {
        wrapper = mount(<ProgressBar orientation="vertical" progress={50} />);
      });

      it("renders outer bar as expected", () => {
        assertStyleMatch(
          {
            textAlign: "center",
            whiteSpace: "nowrap",
            height: "256px",
          },
          wrapper.find(ProgressBar)
        );
      });

      it("renders inner bar as expected", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsSemanticNeutral500)",
            height: "calc(256px * 0.5)",
            width: "var(--sizing100)",
          },
          wrapper.find(InnerBar)
        );
      });
    });
  });

  describe("when size is set to small", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar size="small" progress={50} />);
    });

    it("applies proper width and height to outer bar", () => {
      assertStyleMatch({ width: "256px" }, wrapper.find(ProgressBar));
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        {
          width: "calc(256px * 0.5)",
          height: "var(--sizing050)",
        },
        wrapper.find(InnerBar)
      );
    });

    describe("and orientation is vertical", () => {
      beforeEach(() => {
        wrapper = mount(
          <ProgressBar orientation="vertical" size="small" progress={50} />
        );
      });

      it("renders outer bar as expected", () => {
        assertStyleMatch(
          {
            height: "256px",
          },
          wrapper.find(ProgressBar)
        );
      });

      it("renders inner bar as expected", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsSemanticNeutral500)",
            height: "calc(256px * 0.5)",
            width: "var(--sizing050)",
          },
          wrapper.find(InnerBar)
        );
      });
    });
  });

  describe("when size is set to large", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar size="large" progress={50} />);
    });

    it("applies proper width and height to outer bar", () => {
      assertStyleMatch(
        {
          width: "100%",
          height: "var(--sizing200)",
        },
        wrapper.find(StyledProgressBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        {
          width: "calc(256px * 0.5)",
          height: "var(--sizing200)",
        },
        wrapper.find(InnerBar)
      );
    });

    describe("and orientation is vertical", () => {
      beforeEach(() => {
        wrapper = mount(
          <ProgressBar orientation="vertical" size="large" progress={50} />
        );
      });

      it("renders outer bar as expected", () => {
        assertStyleMatch(
          {
            height: "256px",
          },
          wrapper.find(ProgressBar)
        );
      });

      it("renders inner bar as expected", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsSemanticNeutral500)",
            height: "calc(256px * 0.5)",
            width: "var(--sizing200)",
          },
          wrapper.find(InnerBar)
        );
      });
    });
  });

  describe.each(["top", "bottom"])(
    "default labels and labelsPosition is %s",
    (labelsPosition) => {
      beforeEach(() => {
        wrapper = mount(
          <ProgressBar
            labelsPosition={labelsPosition}
            size="large"
            progress={50}
            showDefaultLabels
          />
        );
      });

      it("shows current progress correctly", () => {
        expect(wrapper.text().includes("50%")).toBeTruthy();
      });

      it("shows maximum progress limit correctly", () => {
        expect(wrapper.text().includes("100%")).toBeTruthy();
      });

      it("renders the current progress labels as expected", () => {
        assertStyleMatch(
          {
            textAlign: "start",
            display: "flex",
            justifyContent: "space-between",
            [labelsPosition === "top" ? "paddingBottom" : "paddingTop"]: "4px",
          },
          wrapper.find(StyledValuesLabel)
        );
      });

      describe.each(["up", "down"])(
        "and orientation is vertical adn direction is %s",
        (direction) => {
          beforeEach(() => {
            wrapper = mount(
              <ProgressBar
                direction={direction}
                orientation="vertical"
                showDefaultLabels
                progress={50}
              />
            );
          });

          it("shows current progress correctly", () => {
            expect(wrapper.text().includes("50%")).toBeTruthy();
          });

          it("shows maximum progress limit correctly", () => {
            expect(wrapper.text().includes("100%")).toBeTruthy();
          });

          it("applies expected styles to the wrapper", () => {
            assertStyleMatch(
              {
                overflowY: "hidden",
                width: "var(--sizing100)",
                height: "100%",
                alignItems: direction === "up" ? "flex-end" : undefined,
              },
              wrapper.find(StyledProgressBar)
            );
          });

          it("renders the current progress labels as expected", () => {
            assertStyleMatch(
              {
                textAlign: "start",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                paddingLeft: "4px",
              },
              wrapper.find(StyledValuesLabel)
            );
          });
        }
      );
    }
  );

  describe("custom labels", () => {
    beforeEach(() => {
      wrapper = mount(
        <ProgressBar
          progress={50}
          currentProgressLabel="foo"
          maxProgressLabel="bar"
        />
      );
    });

    it("shows currentProgressLabel correctly", () => {
      expect(
        wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
      ).toEqual("foo");
    });

    it("shows maxProgressLabel correctly", () => {
      expect(
        wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
      ).toEqual("bar");
    });

    describe("when showDefaultLabels is not set", () => {
      it("only shows the currentProgressLabel that has a value", () => {
        wrapper = mount(
          <ProgressBar progress={50} currentProgressLabel="foo" />
        );

        expect(
          wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
        ).toEqual("foo");

        expect(
          wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
        ).toEqual("");
      });

      it("only shows the maxProgressLabel that has a value", () => {
        wrapper = mount(<ProgressBar progress={50} maxProgressLabel="bar" />);

        expect(
          wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
        ).toEqual("");

        expect(
          wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
        ).toEqual("bar");
      });
    });

    describe.each([
      ["up", "left"],
      ["up", "right"],
      ["down", "left"],
      ["down", "right"],
    ])(
      "and orientation is vertical, direction is %s and labelsPosition is %s",
      (direction, labelsPosition) => {
        beforeEach(() => {
          wrapper = mount(
            <ProgressBar
              orientation="vertical"
              currentProgressLabel="foo"
              maxProgressLabel="bar"
              progress={50}
              direction={direction}
              labelsPosition={labelsPosition}
            />
          );
        });

        it("shows currentProgressLabel correctly", () => {
          expect(
            wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
          ).toEqual(direction === "up" ? "bar" : "foo");
        });

        it("shows maxProgressLabel correctly", () => {
          expect(
            wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
          ).toEqual(direction === "up" ? "foo" : "bar");
        });

        it("renders the currentProgressLabel labels as expected", () => {
          assertStyleMatch(
            {
              textAlign: "start",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              [labelsPosition === "left"
                ? "paddingRight"
                : "paddingLeft"]: "4px",
            },
            wrapper.find(StyledValuesLabel)
          );

          if (labelsPosition === "left") {
            assertStyleMatch(
              {
                textAlign: "right",
              },
              wrapper.find(StyledValuesLabel),
              { modifier: `${StyledValue}` }
            );
          }
        });
      }
    );
  });

  describe.each(["horizontal", "vertical"])("progress color", (orientation) => {
    it("applies the correct background colour when it is in progress", () => {
      wrapper = mount(<ProgressBar orientation={orientation} progress={50} />);
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsSemanticNeutral500)",
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper background color when the progress is equal to 100", () => {
      wrapper = mount(<ProgressBar orientation={orientation} progress={100} />);
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsSemanticPositive500)",
        },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      wrapper = mount(
        <ProgressBar
          progress={10}
          aria-label="FooBar"
          aria-describedby="Foo"
          aria-valuemin={0}
          aria-valuenow={10}
          aria-valuemax={100}
          aria-valuetext="Bar"
        />
      );
    });

    it("should allow an aria-label prop to be passed to the component", () => {
      expect(wrapper.getDOMNode().getAttribute("aria-label")).toBe("FooBar");
    });

    it("should allow an aria-describedby prop to be passed to the component", () => {
      expect(wrapper.getDOMNode().getAttribute("aria-describedby")).toBe("Foo");
    });

    it.each([
      ["aria-valuemin", "0"],
      ["aria-valuenow", "10"],
      ["aria-valuemax", "100"],
      ["aria-valuetext", "Bar"],
    ])("should allow a value to be passed to %s ", (prop, value) => {
      expect(wrapper.getDOMNode().getAttribute(prop)).toBe(value);
    });

    it("should calculate aria-valuenow from the values of progress, aria-valuemin and aria-valuemax if not provided", () => {
      wrapper.setProps({ "aria-valuenow": undefined });
      expect(wrapper.getDOMNode().getAttribute("aria-valuenow")).toBe("10");
    });
  });
});
