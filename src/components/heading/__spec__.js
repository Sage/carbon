import React from "react";
import TestUtils from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import Heading from "./heading";
import Help from "./../help";
import Link from "./../link";
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
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Heading
        className="custom"
        title="foo"
        subheader="subheader"
        help="bar"
        helpLink="/bar"
        backLink="/foobar"
      />
    );
  });

  it("renders a h1 with the title", () => {
    const div = TestUtils.findRenderedDOMComponentWithClass(
      instance,
      "carbon-heading__title"
    );
    expect(div.textContent).toEqual("foo");
  });

  it("renders a help component", () => {
    const wrapper = mount(<Heading title="Test" help="bar" helpLink="/bar" />);
    const help = wrapper.find(Help);

    expect(help.props().className).toEqual("carbon-heading__help");
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
      />
    );

    const link = wrapper.find(Link);
    expect(link.prop("className")).toEqual("carbon-heading__back");
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
    const div = TestUtils.findRenderedDOMComponentWithClass(
      instance,
      "carbon-heading__subheader"
    );
    expect(div.textContent).toEqual("subheader");
  });

  describe("no subheader", () => {
    it("returns nothing", () => {
      instance = TestUtils.renderIntoDocument(<Heading />);
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          instance,
          "carbon-heading__subheader"
        ).length
      ).toEqual(0);
    });
  });

  describe("no divider", () => {
    it("returns nothing", () => {
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" divider={false} />
      );
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          instance,
          "carbon-heading--has-divider"
        ).length
      ).toEqual(0);
    });
  });

  describe("no title", () => {
    it("returns nothing", () => {
      instance = TestUtils.renderIntoDocument(<Heading />);
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          instance,
          "carbon-heading__title"
        ).length
      ).toEqual(0);
    });
  });

  describe("no help", () => {
    it("returns no help component", () => {
      instance = TestUtils.renderIntoDocument(<Heading title="foo" />);
      expect(
        TestUtils.scryRenderedComponentsWithType(instance, Help).length
      ).toEqual(0);
    });
  });

  describe("no help text but a help link", () => {
    it("still renders the help icon", () => {
      const wrapper = mount(<Heading title="Test" helpLink="/bar" />);
      const help = wrapper.find(Help);

      expect(help.props().className).toEqual("carbon-heading__help");
      expect(help.props().href).toEqual("/bar");
    });
  });

  describe("no back href", () => {
    it("returns no back link", () => {
      instance = TestUtils.renderIntoDocument(<Heading title="foo" />);
      expect(
        TestUtils.scryRenderedComponentsWithType(instance, Link).length
      ).toEqual(0);
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
      instance = TestUtils.renderIntoDocument(
        <Heading title="foo" separator />
      );
      const separator = TestUtils.findRenderedDOMComponentWithTag(
        instance,
        "hr"
      );
      expect(separator.className).toEqual("carbon-heading__separator");
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
