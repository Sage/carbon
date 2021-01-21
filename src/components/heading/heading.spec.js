import React from "react";
import { shallow, mount } from "enzyme";
import Heading from "./heading.component";
import {
  StyledSubHeader,
  StyledDivider,
  StyledSeparator,
} from "./heading.style";
import Help from "../help";
import Link from "../link";
import Typeography from "../typography";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import DefaultPages from "../pages/pages.component";
import Page from "../pages/page/page.component";
import { PagesContent } from "../pages/pages.style";
import LinkStyleAnchor from "../link/link.style";
import mintTheme from "../../style/themes/mint";

describe("Heading", () => {
  it("renders a h1 with the title", () => {
    const wrapper = mount(
      <Heading
        className="custom"
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
    expect(wrapper.find(Typeography).text()).toEqual("foo");
  });

  it("renders a help component", () => {
    const wrapper = mount(<Heading title="Test" help="bar" helpLink="/bar" />);
    const help = wrapper.find(Help);

    expect(help.props().href).toEqual("/bar");
  });

  it("renders a back link", () => {
    const wrapper = mount(
      <Heading
        className="custom"
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
  });

  it("renders a back link as a button with focus support on Internet Explorer", () => {
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
        outline: `solid 3px ${mintTheme.colors.focus}`,
      },
      wrapper.find(PagesContent),
      { modifier: `&&&& ${LinkStyleAnchor} button:focus` }
    );
  });

  it("renders a subheader", () => {
    const wrapper = mount(
      <Heading
        className="custom"
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
    expect(wrapper.find(StyledSubHeader).text()).toEqual("subheader");
  });

  describe("no subheader", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading />);
      expect(wrapper.find(StyledSubHeader).length).toEqual(0);
    });
  });

  describe("no divider", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading title="foo" divider={false} />);
      expect(wrapper.find(StyledDivider).length).toEqual(0);
    });
  });

  describe("no title", () => {
    it("returns nothing", () => {
      const wrapper = mount(<Heading />);
      expect(wrapper.find(Typeography).length).toEqual(0);
    });
  });

  describe("no help", () => {
    it("returns no help component", () => {
      const wrapper = mount(<Heading title="foo" />);
      expect(wrapper.find(Help).length).toEqual(0);
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
        />
      );

      elementsTagTest(wrapper, ["back", "help", "subtitle", "title"]);
    });
  });
});
