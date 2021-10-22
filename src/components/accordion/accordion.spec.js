import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import {
  simulate,
  assertStyleMatch,
  testStyledSystemSpacing,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Textbox from "../textbox";
import { Accordion } from ".";
import {
  StyledAccordionContainer,
  StyledAccordionSubTitle,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContent,
  StyledAccordionContentContainer,
  StyledAccordionHeadingsContainer,
} from "./accordion.style";
import AccordionGroup from "./accordion-group/accordion-group.component";
import ValidationIcon from "../../__internal__/validations";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";

jest.mock("../../hooks/__internal__/useResizeObserver");

const contentHeight = 200;

const isExpanded = (wrapper) => {
  assertStyleMatch(
    {
      transform: undefined,
    },
    wrapper.find(StyledAccordionIcon)
  );
  assertStyleMatch(
    {
      visibility: undefined,
      maxHeight: `${contentHeight}px`,
      height: `${contentHeight}px`,
    },
    wrapper.find(StyledAccordionContentContainer)
  );
};

const isCollapsed = (wrapper) => {
  assertStyleMatch(
    {
      transform: "rotate(90deg)",
    },
    wrapper.find(StyledAccordionIcon)
  );
  assertStyleMatch(
    {
      visibility: "hidden",
      maxHeight: "0px",
      height: "0px",
    },
    wrapper.find(StyledAccordionContentContainer)
  );
};

testStyledSystemSpacing(
  (props) => <Accordion title="foo" {...props} />,
  {},
  (wrapper) => wrapper.find(StyledAccordionContainer)
);

describe("Accordion", () => {
  let wrapper;

  const render = (props) => {
    wrapper = mount(<Accordion title="Title" {...props} />);
    jest
      .spyOn(
        wrapper.find(StyledAccordionContent).getDOMNode(),
        "scrollHeight",
        "get"
      )
      .mockImplementation(() => contentHeight);
  };

  beforeEach(() => {
    render();
  });

  it("renders content without paddings if `disableCustomPadding` is applied", () => {
    render({ disableContentPadding: true });

    assertStyleMatch(
      {
        padding: "0",
      },
      wrapper.find(StyledAccordionContent)
    );
  });

  describe("when title prop is not a string", () => {
    it("should not render inside of a StyledAccordionTitle", () => {
      render({ title: <div id="customTitle">Title content</div> });

      expect(wrapper.find(StyledAccordionTitle).exists()).toBe(false);
      expect(wrapper.find("#customTitle").exists()).toBe(true);
    });
  });

  describe(" with headerSpacing prop", () => {
    it("should apply correct padding", () => {
      render({ headerSpacing: { p: 3 } });

      assertStyleMatch(
        {
          padding: "24px",
        },
        wrapper.find(StyledAccordionTitleContainer)
      );
    });
  });

  describe("controlled behaviour", () => {
    it("mounts expanded when expanded prop is passed as true", () => {
      act(() => render({ expanded: true }));
      wrapper.update();
      isExpanded(wrapper);
    });

    it("mounts collapsed when expanded prop is passed as false", () => {
      render({ expanded: false });
      isCollapsed(wrapper);
    });

    it("fires provided onChange prop when clicked on the header area", () => {
      const onChange = jest.fn();
      render({ onChange, expanded: false });
      const ev = {};
      wrapper.find(StyledAccordionTitleContainer).prop("onClick")(ev);
      expect(onChange).toHaveBeenCalledWith(ev, true);
    });

    it.each([
      ["enter", 13],
      ["space", 32],
    ])(
      "fires provided onChange prop when $s key is pressed on the header area",
      (key, keyCode) => {
        const onChange = jest.fn();
        render({ onChange, expanded: false });
        const ev = { which: keyCode };
        wrapper.find(StyledAccordionTitleContainer).prop("onKeyDown")(ev);
        expect(onChange).toHaveBeenCalledWith(ev, true);
      }
    );

    it("adjusts accordions height when the content changes", () => {
      act(() => render({ expanded: true }));
      wrapper.update();
      isExpanded(wrapper);

      const newContentHeight = 400;
      jest
        .spyOn(
          wrapper.find(StyledAccordionContent).getDOMNode(),
          "scrollHeight",
          "get"
        )
        .mockImplementation(() => newContentHeight);
      wrapper.setProps({ children: <div /> });
      wrapper.update();
      assertStyleMatch(
        {
          maxHeight: `${newContentHeight}px`,
        },
        wrapper.find(StyledAccordionContentContainer)
      );
    });
  });

  describe("uncontrolled behaviour", () => {
    it("mounts expanded when defaultExpanded prop is passed as true", () => {
      act(() => render({ defaultExpanded: true }));
      wrapper.update();
      isExpanded(wrapper);
    });

    it("mounts collapsed when defaultExpanded prop is not passed at all", () => {
      isCollapsed(wrapper);
    });

    it("toggles expansion state when clicking on the header area", () => {
      act(() => wrapper.find(StyledAccordionTitleContainer).prop("onClick")());
      wrapper.update();
      isExpanded(wrapper);
      act(() => wrapper.find(StyledAccordionTitleContainer).prop("onClick")());
      wrapper.update();
      isCollapsed(wrapper);
    });

    it.each([
      ["enter", 13],
      ["space", 32],
    ])(
      "toggles expansion state when pressing %s key on the header area",
      (key, keyCode) => {
        act(() =>
          wrapper.find(StyledAccordionTitleContainer).prop("onKeyDown")({
            which: keyCode,
          })
        );
        wrapper.update();
        isExpanded(wrapper);
        act(() =>
          wrapper.find(StyledAccordionTitleContainer).prop("onKeyDown")({
            which: keyCode,
          })
        );
        wrapper.update();
        isCollapsed(wrapper);
      }
    );

    it("does not toggle expansion state when keys other than enter or space pressed on the header area", () => {
      act(() =>
        wrapper.find(StyledAccordionTitleContainer).prop("onKeyDown")({
          which: 10,
        })
      );
      wrapper.update();
      isCollapsed(wrapper);
    });

    describe("resize observer", () => {
      it("recalculates the content height", () => {
        act(() => render({ expanded: true }));
        wrapper.update();
        isExpanded(wrapper);

        assertStyleMatch(
          {
            maxHeight: `${contentHeight}px`,
          },
          wrapper.find(StyledAccordionContentContainer)
        );

        const newContentHeight = 400;

        jest
          .spyOn(
            wrapper.find(StyledAccordionContent).getDOMNode(),
            "scrollHeight",
            "get"
          )
          .mockImplementation(() => newContentHeight);

        act(() => {
          global.innerWidth = 500;
          global.innerHeight = 500;

          useResizeObserver.mock.calls[
            useResizeObserver.mock.calls.length - 1
          ][1]();
        });
        wrapper.update();

        assertStyleMatch(
          {
            maxHeight: `${newContentHeight}px`,
          },
          wrapper.find(StyledAccordionContentContainer)
        );
      });
    });
  });

  describe("layout", () => {
    it(`renders header area with justify-content: space-between and flex-direction: "row-reverse"
      when iconAlign is set to "left"`, () => {
      render({ iconAlign: "left" });
      assertStyleMatch(
        {
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
        },
        wrapper.find(StyledAccordionTitleContainer)
      );
    });

    it('renders header area with justify-content: space-between when iconAlign is set to "right"', () => {
      assertStyleMatch(
        {
          justifyContent: "space-between",
        },
        wrapper.find(StyledAccordionTitleContainer)
      );
    });

    it("renders accordion with white background and top/bottom borders by default", () => {
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.white,
          border: `1px solid ${baseTheme.accordion.border}`,
          borderLeft: "none",
          borderRight: "none",
        },
        wrapper.find(StyledAccordionContainer)
      );
    });

    it('renders accordion with transparent background and border when scheme is set to "transparent"', () => {
      render({ scheme: "transparent" });
      assertStyleMatch(
        {
          backgroundColor: "transparent",
          border: `1px solid ${baseTheme.accordion.border}`,
          borderLeft: "none",
          borderRight: "none",
        },
        wrapper.find(StyledAccordionContainer)
      );
    });

    it('has full border when borders prop is "full"', () => {
      render({ borders: "full" });
      assertStyleMatch(
        {
          border: `1px solid ${baseTheme.accordion.border}`,
        },
        wrapper.find(StyledAccordionContainer)
      );
    });

    it('has no border when borders prop is "none"', () => {
      render({ borders: "none" });
      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.find(StyledAccordionContainer)
      );
    });

    it('renders icon rotated when accordion is collapsed (iconAlign "right")', () => {
      render({ expanded: false });
      assertStyleMatch(
        {
          transform: "rotate(90deg)",
        },
        wrapper.find(StyledAccordionIcon)
      );
    });

    it('renders icon rotated when accordion is collapsed (iconAlign "left")', () => {
      render({ iconAlign: "left", expanded: false });
      assertStyleMatch(
        {
          transform: "rotate(-90deg)",
        },
        wrapper.find(StyledAccordionIcon)
      );
    });

    it("renders accordion content container with visibility: hidden when is not expanded", () => {
      assertStyleMatch(
        {
          visibility: "hidden",
        },
        wrapper.find(StyledAccordionContentContainer)
      );
    });

    it("adds a sub title when subTitle prop set and size is large (default)", () => {
      render({ subTitle: "A sub title" });
      const subTitle = wrapper.find(StyledAccordionSubTitle);
      assertStyleMatch(
        {
          marginTop: "8px",
        },
        subTitle
      );
      expect(subTitle.text()).toEqual("A sub title");
    });

    it("does not add a sub title when subTitle prop set and size is small", () => {
      render({ subTitle: "A sub title", size: "small" });
      expect(wrapper.find(StyledAccordionSubTitle)).toEqual({});
    });

    it("has the correct title container padding when size is large", () => {
      render({ size: "large" });
      assertStyleMatch(
        {
          padding: "24px",
        },
        wrapper.find(StyledAccordionTitleContainer)
      );
    });

    it("sets the accordion width when the width prop is passed in", () => {
      render({ width: "500px" });
      assertStyleMatch(
        {
          width: "500px",
        },
        wrapper.find(StyledAccordionContainer)
      );
    });

    describe("with validation icon", () => {
      it.each([{ error: "error" }, { warning: "warning" }, { info: "info" }])(
        "renders the validation icon when a message is provided",
        (status) => {
          wrapper = mount(<Accordion title="Title" {...status} />);
          expect(wrapper.find(ValidationIcon).exists()).toEqual(true);
        }
      );

      it("applies expected styling when the icon is not rendered", () => {
        wrapper = mount(<Accordion title="Title" />);

        assertStyleMatch(
          {
            display: "grid",
            gridTemplateRows: "auto auto",
          },
          wrapper.find(StyledAccordionHeadingsContainer)
        );
      });

      it("applies expected styling when the icon is rendered", () => {
        wrapper = mount(<Accordion title="Title" error="error" />);

        assertStyleMatch(
          {
            display: "grid",
            gridTemplateColumns: "min-content auto",
          },
          wrapper.find(StyledAccordionHeadingsContainer)
        );

        assertStyleMatch(
          {
            gridColumn: "span 3",
          },
          wrapper.find(StyledAccordionHeadingsContainer),
          { modifier: `${StyledAccordionSubTitle}` }
        );

        assertStyleMatch(
          {
            height: "20px",
            position: "relative",
            top: "2px",
          },
          wrapper.find(StyledAccordionHeadingsContainer),
          { modifier: `${StyledValidationIcon}` }
        );

        assertStyleMatch(
          {
            marginLeft: "8px",
          },
          wrapper
            .find(StyledAccordionHeadingsContainer)
            .find(StyledValidationIcon)
        );
      });
    });
  });

  describe("when buttonHeading set", () => {
    it("should apply the expected styling", () => {
      wrapper = mount(<Accordion title="Title" buttonHeading />).find(
        StyledAccordionTitleContainer
      );

      assertStyleMatch(
        {
          boxSizing: "border-box",
          fontWeight: "600",
          textDecoration: "none",
          fontSize: baseTheme.text.size,
          minHeight: `${baseTheme.spacing * 5}px`,
          color: baseTheme.colors.primary,
          width: "150px",
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: baseTheme.colors.primary,
        },
        wrapper,
        { modifier: `${StyledAccordionIcon}` }
      );

      assertStyleMatch(
        {
          color: baseTheme.colors.secondary,
        },
        wrapper,
        { modifier: "&:hover" }
      );

      assertStyleMatch(
        {
          color: baseTheme.colors.secondary,
        },
        wrapper,
        { modifier: `&:hover ${StyledAccordionIcon}` }
      );
    });

    it.each([
      ["left", "32px"],
      ["right", "64px"],
    ])(
      "should set the icon position of the button correctly",
      (iconPosition, marginValue) => {
        wrapper = mount(
          <Accordion title="Title" buttonHeading iconAlign={iconPosition} />
        ).find(StyledAccordionTitleContainer);

        assertStyleMatch(
          {
            marginLeft: marginValue,
          },
          wrapper,
          { modifier: `${StyledAccordionHeadingsContainer}` }
        );

        assertStyleMatch(
          {
            position: "relative",
            [iconPosition]: "16px",
          },
          wrapper,
          { modifier: `${StyledAccordionIcon}` }
        );
      }
    );

    it.each(Array.from({ length: 10 }).map((_, i) => 100 + i))(
      "sets the width of the button to the value passed in via the buttonWidth prop",
      (buttonWidth) => {
        wrapper = mount(
          <Accordion title="Title" buttonHeading buttonWidth={buttonWidth} />
        ).find(StyledAccordionTitleContainer);

        assertStyleMatch(
          {
            width: `${buttonWidth}px`,
          },
          wrapper
        );
      }
    );

    describe("when openTitle prop set", () => {
      it("should display the title when closed", () => {
        wrapper = mount(
          <Accordion title="Title" buttonHeading openTitle="Less info" />
        ).find(StyledAccordionTitleContainer);
        expect(wrapper.text()).toEqual("Title");
      });

      it("should display the openTitle when open", () => {
        wrapper = mount(
          <Accordion
            title="Title"
            buttonHeading
            openTitle="Less info"
            expanded
          />
        ).find(StyledAccordionTitleContainer);
        expect(wrapper.text()).toEqual("Less info");
      });
    });

    describe("when openTitle prop false", () => {
      it("should display the title when open", () => {
        wrapper = mount(
          <Accordion title="Title" buttonHeading expanded />
        ).find(StyledAccordionTitleContainer);
        expect(wrapper.text()).toEqual("Title");
      });
    });
  });

  describe("props", () => {
    it("passes data-role attribute to the root element of component", () => {
      render({
        "data-role": "role",
      });

      expect(wrapper.find(StyledAccordionContainer).props()["data-role"]).toBe(
        "role"
      );
    });
  });
});

describe("AccordionGroup", () => {
  let wrapper;
  let container;

  const renderAttached = () => {
    wrapper = mount(
      <AccordionGroup>
        <Accordion title="Title_1" defaultExpanded>
          <Textbox label="Textbox in an Accordion" />
        </Accordion>
        <Accordion title="Title_2" defaultExpanded>
          <Textbox label="Textbox in an Accordion" />
        </Accordion>
        <Accordion title="Title_3" defaultExpanded>
          <Textbox label="Textbox in an Accordion" />
        </Accordion>
      </AccordionGroup>,
      { attachTo: document.getElementById("enzymeContainer") }
    );
  };

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
    renderAttached();
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  testStyledSystemMargin((props) => (
    <AccordionGroup {...props}>
      <Accordion title="Title_1" defaultExpanded>
        <Textbox label="Textbox in an Accordion" />
      </Accordion>
      <Accordion title="Title_2" defaultExpanded>
        <Textbox label="Textbox in an Accordion" />
      </Accordion>
      <Accordion title="Title_3" defaultExpanded>
        <Textbox label="Textbox in an Accordion" />
      </Accordion>
    </AccordionGroup>
  ));

  it.each([
    [0, 1],
    [1, 2],
    [2, 0],
    [0, 1],
  ])(
    "focuses on the next Accordion in a loop when down arrow is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressDownArrow(
        wrapper.find(StyledAccordionTitleContainer).at(focused)
      );
      expect(
        wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  it.each([
    [0, 2],
    [2, 1],
    [1, 0],
    [0, 2],
  ])(
    "focuses on the previous Accordion in a loop when up arrow is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressUpArrow(
        wrapper.find(StyledAccordionTitleContainer).at(focused)
      );
      expect(
        wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  it.each([
    [0, 0],
    [1, 0],
    [2, 0],
  ])(
    "focuses on the first Accordion when 'home' key is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressHome(
        wrapper.find(StyledAccordionTitleContainer).at(focused)
      );
      expect(
        wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  it.each([
    [0, 2],
    [1, 2],
    [2, 2],
  ])(
    "focuses on the last Accordion when 'end' key is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressEnd(
        wrapper.find(StyledAccordionTitleContainer).at(focused)
      );
      expect(
        wrapper.find(StyledAccordionTitleContainer).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  it("validates the incorrect children prop", () => {
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    const InvalidComponent = React.forwardRef(() => <div />);
    mount(
      <AccordionGroup>
        <InvalidComponent />
        <InvalidComponent />
      </AccordionGroup>
    );

    const expected =
      "Warning: Failed prop type: `AccordionGroup` only accepts children of" +
      " type `Accordion`.\n    in AccordionGroup";

    expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
  });

  it("accepts empty children", () => {
    expect(() => {
      mount(
        <AccordionGroup>
          {null}
          {false}
          {undefined}
        </AccordionGroup>
      );
    }).not.toThrow();
  });
});
