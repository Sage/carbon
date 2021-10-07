import React from "react";
import { shallow, mount } from "enzyme";
import Heading from "./heading.component";
import {
  StyledHeader,
  StyledSubHeader,
  StyledSeparator,
  StyledHeadingTitle,
  StyledHeadingPills,
} from "./heading.style";
import Help from "../help";
import Link from "../link";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import DefaultPages from "../pages/pages.component";
import Page from "../pages/page/page.component";
import mintTheme from "../../style/themes/mint";
import Hr from "../hr";
import Pill from "../pill";

describe("Heading", () => {
  testStyledSystemMargin((props) => (
    <Heading title="foo" subheader="subheader" {...props} />
  ));

  it("renders a h1 with the title", () => {
    const wrapper = mount(
      <Heading
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
    expect(wrapper.find(StyledHeadingTitle).text()).toEqual("foo");
  });

  it("renders a help component", () => {
    const wrapper = mount(<Heading title="Test" help="bar" helpLink="/bar" />);
    const help = wrapper.find(Help);

    expect(help.props().href).toEqual("/bar");
  });

  it("renders a back link and applies correct styling to header and subheader", () => {
    const wrapper = mount(
      <Heading
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
        divider={false}
      />
    );

    const link = wrapper.find(Link);
    expect(link.prop("href")).toEqual("/foobar");

    assertStyleMatch(
      {
        display: "grid",
        gridTemplateColumns: "min-content auto",
      },
      wrapper.find(StyledHeader)
    );

    assertStyleMatch(
      {
        marginTop: "5px",
        gridRow: "2",
        gridColumn: "2",
      },
      wrapper.find(StyledSubHeader)
    );
  });

  it("renders a back link as a button with an outline", () => {
    const wrapper = mount(
      <DefaultPages>
        <Page title={<Heading title="My Second Page" backLink={() => {}} />}>
          test
        </Page>
      </DefaultPages>
    );

    const link = wrapper.find(Link);
    link.find("button").simulate("mousedown");

    assertStyleMatch(
      {
        outline: `3px solid ${mintTheme.colors.focus}`,
      },
      link,
      { modifier: `button:focus` }
    );
  });

  it("renders a subheader", () => {
    const wrapper = mount(
      <Heading
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
    expect(wrapper.find(StyledSubHeader).text()).toEqual("subheader");
  });

  it("renders passed components inside pills container when provided", () => {
    const testPills = [
      <Pill key="1">test pill 1</Pill>,
      <Pill key="2">test pill 2</Pill>,
    ];
    const wrapper = shallow(<Heading title="test" pills={testPills} />);
    expect(wrapper.find(StyledHeadingPills).children()).toHaveLength(2);
    expect(wrapper.find(Pill)).toHaveLength(2);
  });

  describe("renders title with margin ", () => {
    it("if pills provided", () => {
      const wrapper = mount(
        <Heading title="Test" pills={<Pill>Pill</Pill>} />
      ).find(StyledHeadingTitle);
      assertStyleMatch({ marginRight: "16px" }, wrapper);
    });

    it("if help provided", () => {
      const wrapper = mount(<Heading title="Test" help="Help" />).find(
        StyledHeadingTitle
      );
      assertStyleMatch({ marginRight: "16px" }, wrapper);
    });

    it("if pills and help provided", () => {
      const wrapper = mount(
        <Heading title="Test" help="Help" pills={<Pill>Pill</Pill>} />
      ).find(StyledHeadingTitle);
      assertStyleMatch({ marginRight: "16px" }, wrapper);
    });
  });

  describe("no subheader", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading />);
      expect(wrapper.find(StyledSubHeader).exists()).toBe(false);
    });
  });

  describe("no divider", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading title="foo" divider={false} />);
      expect(wrapper.find(Hr).exists()).toBe(false);
    });
  });

  describe("no title", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading />);
      expect(wrapper.find(StyledHeadingTitle).length).toEqual(0);
    });
  });

  describe("no help", () => {
    it("returns no help component", () => {
      const wrapper = mount(<Heading title="foo" />);
      expect(wrapper.find(Help).length).toEqual(0);
    });
  });

  describe("no pills", () => {
    it("returns no pills wrapper", () => {
      const wrapper = mount(<Heading title="test" />);
      expect(wrapper.find(StyledHeadingPills).exists()).toBe(false);
    });
  });

  describe("no help text but a help link", () => {
    it("still renders the help icon", () => {
      const wrapper = mount(<Heading title="Test" helpLink="/bar" />);
      const help = wrapper.find(Help);

      expect(help.props().href).toEqual("/bar");
    });
  });

  describe("no back href", () => {
    it("returns no back link", () => {
      const wrapper = mount(<Heading title="foo" />);
      expect(wrapper.find(Link).length).toEqual(0);
    });
  });

  describe("when the backLink is a function", () => {
    it("sets it as the link onClick prop", () => {
      const backLinkSpy = jasmine.createSpy(),
        wrapper = shallow(<Heading title="Test" backLink={backLinkSpy} />),
        link = wrapper.find('[data-element="back"]');

      expect(link.props().onClick.toBeDefined);
      expect(link.props().onClick()).toEqual(wrapper.props().backLink);
    });
  });

  describe("with separator", () => {
    it("renders a separator after the title", () => {
      const wrapper = mount(<Heading title="foo" separator />);
      expect(wrapper.find(StyledSeparator).length).toEqual(1);
    });

    it("applies the correct style to the subheader", () => {
      const wrapper = mount(<Heading title="foo" separator subheader="bar" />);

      assertStyleMatch(
        {
          gridRow: "3",
          marginTop: "0px",
        },
        wrapper.find(StyledSubHeader)
      );
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <Heading title="Test" data-element="bar" data-role="baz" />
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "heading", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = shallow(
        <Heading
          backLink="test"
          help="Test"
          helpLink="test"
          subheader="Sub Title"
          title="Test"
          pills={<Pill>Test</Pill>}
        />
      );

      elementsTagTest(wrapper, ["back", "help", "subtitle", "title", "pills"]);
    });
  });
});
