import React from "react";
import { mount } from "enzyme";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledValue,
} from "./progress-tracker.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";
import ProgressBar from "./progress-tracker.component";

describe("ProgressBar", () => {
  let wrapper;

  testStyledSystemMargin((props) => <ProgressBar {...props} />);

  it("renders component as expected", () => {
    wrapper = mount(<ProgressBar />);
    const innerBar = wrapper.find(InnerBar);
    expect(innerBar).toBeTruthy();
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
          backgroundColor: baseTheme.progressTracker.innerBackground,
          width: "calc(256px * 0.5)",
          height: "8px",
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
            backgroundColor: baseTheme.progressTracker.innerBackground,
            height: "calc(256px * 0.5)",
            width: "8px",
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
          height: "4px",
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
            backgroundColor: baseTheme.progressTracker.innerBackground,
            height: "calc(256px * 0.5)",
            width: "4px",
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
          height: "16px",
        },
        wrapper.find(StyledProgressBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        {
          width: "calc(256px * 0.5)",
          height: "16px",
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
            backgroundColor: baseTheme.progressTracker.innerBackground,
            height: "calc(256px * 0.5)",
            width: "16px",
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
                width: "8px",
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

  describe.each(["horizontal", "vertical"])("variant prop", (orientation) => {
    it("applies proper background color when progress < 20 when orientation is %s", () => {
      wrapper = mount(
        <ProgressBar
          orientation={orientation}
          progress={10}
          variant="traffic"
        />
      );
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.error,
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper background color when 20 < progress < 100", () => {
      wrapper = mount(
        <ProgressBar
          orientation={orientation}
          progress={50}
          variant="traffic"
        />
      );
      assertStyleMatch(
        {
          backgroundColor: baseTheme.progressTracker.trafficNeutral,
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper background color when 20 < progress < 100", () => {
      wrapper = mount(
        <ProgressBar
          orientation={orientation}
          progress={100}
          variant="traffic"
        />
      );
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.success,
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
      expect(wrapper.prop("aria-label")).toBe("FooBar");
    });

    it("should allow an aria-describedby prop to be passed to the component", () => {
      expect(wrapper.prop("aria-describedby")).toBe("Foo");
    });

    it.each([
      ["aria-valuemin", 0],
      ["aria-valuenow", 10],
      ["aria-valuemax", 100],
      ["aria-valuetext", "Bar"],
    ])("should allow a value to be passed to %s ", (prop, value) => {
      expect(wrapper.prop(prop)).toBe(value);
    });
  });
});
