import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  StyledProgressTracker,
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledValue,
  StyledDescription,
} from "./progress-tracker.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import ProgressTracker from "./progress-tracker.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

jest.mock("../../hooks/__internal__/useResizeObserver");

describe("ProgressTracker", () => {
  let wrapper: ReactWrapper;

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetHeight"
  ) as PropertyDescriptor;
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetWidth"
  ) as PropertyDescriptor;

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

  testStyledSystemMargin((props) => <ProgressTracker {...props} />);

  it("renders component as expected", () => {
    wrapper = mount(<ProgressTracker />);
    const innerBar = wrapper.find(InnerBar);
    expect(innerBar).toBeTruthy();
  });

  describe("when a custom length is set", () => {
    it.each(["50px", "100%", "auto"])(
      "sets the width to %s as expected",
      (width) => {
        wrapper = mount(<ProgressTracker length={width} />);
        assertStyleMatch(
          {
            width,
          },
          wrapper.find(StyledProgressTracker)
        );
      }
    );
  });

  describe("when size is not specified", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressTracker progress={50} />);
    });

    it("renders outer bar as expected", () => {
      assertStyleMatch(
        {
          textAlign: "center",
          whiteSpace: "nowrap",
          width: "256px",
        },
        wrapper.find(ProgressTracker)
      );

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius400)",
        },
        wrapper.find(StyledProgressBar)
      );
    });

    it("renders inner bar as expected", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsSemanticNeutral500)",
          width: "50%",
          height: "var(--sizing100)",
          borderRadius: "var(--borderRadius400)",
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies error background color when the error occurs", () => {
      wrapper = mount(<ProgressTracker progress={100} error />);
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsSemanticNegative500)",
        },
        wrapper.find(InnerBar)
      );
    });

    it("renders with expected border radius values when roundedCornersOptOut is true", () => {
      wrapper = mount(
        <CarbonProvider roundedCornersOptOut>
          <ProgressTracker progress={100} />
        </CarbonProvider>
      );

      assertStyleMatch(
        {
          borderRadius: "25px",
        },
        wrapper.find(StyledProgressBar)
      );

      assertStyleMatch(
        {
          borderRadius: "25px",
        },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("when size is set to small", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressTracker size="small" progress={50} />);
    });

    it("applies proper width and height to outer bar", () => {
      assertStyleMatch({ width: "256px" }, wrapper.find(ProgressTracker));
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        {
          width: "50%",
          height: "var(--sizing050)",
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper font size to labels", () => {
      assertStyleMatch(
        {
          fontSize: "var(--fontSizes100)",
        },
        wrapper.find(StyledValuesLabel)
      );
    });
  });

  describe("when size is set to large", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressTracker size="large" progress={50} />);
    });

    it("applies proper width and min-height to outer bar", () => {
      assertStyleMatch(
        {
          width: "100%",
          minHeight: "fit-content",
        },
        wrapper.find(StyledProgressBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        {
          width: "50%",
          height: "var(--sizing200)",
        },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper font size to labels", () => {
      assertStyleMatch(
        {
          fontSize: "var(--fontSizes200)",
        },
        wrapper.find(StyledValuesLabel)
      );
    });
  });

  describe("when description is provided", () => {
    it("renders description as expected", () => {
      wrapper = mount(<ProgressTracker description="description" />);
      expect(wrapper.find(StyledDescription).text()).toEqual("description");
    });
  });

  describe("get a correct background of inner and outer bar color, when progress is 100 or the error occurs", () => {
    it("applies correct background color if progress is 100", () => {
      wrapper = mount(<ProgressTracker progress={100} />);
      assertStyleMatch(
        { backgroundColor: "var(--colorsSemanticPositive500)" },
        wrapper.find(InnerBar)
      );
    });

    it("applies proper border color if progress is 100", () => {
      wrapper = mount(<ProgressTracker progress={100} />);
      assertStyleMatch(
        { border: "1px solid var(--colorsSemanticPositive500)" },
        wrapper.find(StyledProgressBar)
      );
    });

    it("applies proper border color if progress is less than 100", () => {
      wrapper = mount(<ProgressTracker progress={99} />);
      assertStyleMatch(
        { border: "1px solid var(--colorsSemanticNeutral500)" },
        wrapper.find(StyledProgressBar)
      );
    });
  });
});

describe("labels", () => {
  let wrapper;

  it("display customValuePreposition", () => {
    wrapper = mount(
      <ProgressTracker
        progress={50}
        currentProgressLabel="foo"
        maxProgressLabel="bar"
        customValuePreposition="baz"
      />
    );
    expect(wrapper.find(StyledValuesLabel).find("span").at(2).text()).toEqual(
      "baz"
    );
  });

  it("shows currentProgressLabel correctly", () => {
    wrapper = mount(
      <ProgressTracker
        progress={50}
        currentProgressLabel="foo"
        maxProgressLabel="bar"
      />
    );
    expect(
      wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
    ).toEqual("foo");
  });

  it("shows maxProgressLabel correctly", () => {
    wrapper = mount(
      <ProgressTracker
        progress={50}
        currentProgressLabel="foo"
        maxProgressLabel="bar"
      />
    );
    expect(
      wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
    ).toEqual("bar");
  });

  it("only shows the currentProgressLabel that has a value", () => {
    wrapper = mount(
      <ProgressTracker progress={50} currentProgressLabel="foo" />
    );

    expect(
      wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
    ).toEqual("foo");

    expect(wrapper.find(StyledValuesLabel).find(StyledValue).length).toBe(1);
  });

  it("renders default labels if maxProgressLabel is set but no currentProgressLabel is provided", () => {
    wrapper = mount(<ProgressTracker progress={50} maxProgressLabel="bar" />);
    expect(
      wrapper.find(StyledValuesLabel).find(StyledValue).first().text()
    ).toEqual("50%");

    expect(
      wrapper.find(StyledValuesLabel).find(StyledValue).last().text()
    ).not.toEqual("bar");
  });

  describe("when labelsPosition is set", () => {
    it("renders labels above the progress bar", () => {
      wrapper = mount(<ProgressTracker progress={50} labelsPosition="top" />);

      assertStyleMatch(
        {
          marginBottom: "var(--spacing100)",
        },
        wrapper.find(StyledValuesLabel)
      );
    });

    it("renders labels below the progress bar", () => {
      wrapper = mount(
        <ProgressTracker progress={50} labelsPosition="bottom" />
      );

      assertStyleMatch(
        {
          marginTop: "var(--spacing100)",
        },
        wrapper.find(StyledValuesLabel)
      );
    });

    it("renders labels to the left of the progress bar", () => {
      wrapper = mount(<ProgressTracker progress={50} labelsPosition="left" />);

      assertStyleMatch(
        {
          marginRight: "var(--spacing100)",
        },
        wrapper.find(StyledValuesLabel)
      );

      assertStyleMatch(
        {
          alignItems: "center",
        },
        wrapper.find(StyledProgressTracker)
      );
    });
  });

  describe("when labelWidth is set", () => {
    it("renders labels with the correct width", () => {
      wrapper = mount(
        <ProgressTracker
          progress={50}
          labelsPosition="left"
          labelWidth="45px"
        />
      );

      assertStyleMatch(
        {
          width: "45px",
        },
        wrapper.find(StyledValuesLabel)
      );
    });
  });
});

it("applies the correct background colour when it is in progress", () => {
  const wrapper = mount(<ProgressTracker progress={50} />);
  assertStyleMatch(
    {
      backgroundColor: "var(--colorsSemanticNeutral500)",
    },
    wrapper.find(InnerBar)
  );
});
