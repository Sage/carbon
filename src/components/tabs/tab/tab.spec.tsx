import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import Tab, { TabProps } from ".";
import Textbox from "../../textbox";
import StyledTab, { StyledTabProps } from "./tab.style";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";

const updateErrors = jest.fn();
const updateWarnings = jest.fn();
const tabId = "uniqueid1";
function render(props: Partial<TabProps> = {}) {
  return mount(
    <Tab
      errorMessage="error"
      warningMessage="warning"
      infoMessage="info"
      title="Tab Title 1"
      tabId={tabId}
      {...props}
    >
      <p>TabContent 1</p>
      <p>TabContent 2</p>
    </Tab>
  );
}

function renderWithValidation(
  props: Partial<TabProps> & {
    id?: string;
    validations: Record<string, string | boolean>;
  }
) {
  return mount(
    <Tab
      errorMessage="error"
      warningMessage="warning"
      infoMessage="info"
      title="Tab Title 1"
      tabId={tabId}
      {...props}
    >
      <Textbox
        value=""
        onChange={jest.fn()}
        id={props.id}
        {...props.validations}
      />
    </Tab>
  );
}

function renderStyles(props: StyledTabProps = {}) {
  return TestRenderer.create(<StyledTab title="Tab Title 1" {...props} />);
}

describe("Tab", () => {
  let wrapper;

  testStyledSystemPadding((props) => (
    <Tab title="Tab Title 1" tabId={tabId} isTabSelected {...props}>
      TabContent
    </Tab>
  ));

  testStyledSystemPadding((props) => (
    <Tab
      position="left"
      title="Tab Title 1"
      tabId={tabId}
      isTabSelected
      {...props}
    >
      TabContent
    </Tab>
  ));

  it("has display property equals to none", () => {
    wrapper = renderStyles();
    assertStyleMatch(
      {
        display: "none",
      },
      wrapper.toJSON()
    );
  });

  it("renders its children correctly", () => {
    expect(render().find(StyledTab).find("div").children()).toHaveLength(2);
  });

  it("contains custom className if passed as a prop", () => {
    wrapper = render({ className: "class" });
    expect(wrapper.find(".class").exists()).toEqual(true);
  });

  it("has a default role if not set", () => {
    wrapper = render();
    expect(wrapper.find("[role='tabpanel']").exists()).toEqual(true);
  });

  it("has a custom role if provided", () => {
    wrapper = render({ role: "anotherRole" });
    expect(wrapper.find("[role='anotherRole']").exists()).toEqual(true);
  });

  it("sets the aria-labelledby based on ariaLabelledBy prop", () => {
    wrapper = render({ ariaLabelledby: "ariaLabelledby" });
    expect(wrapper.find("[aria-labelledby='ariaLabelledby']").exists()).toEqual(
      true
    );
  });

  it("does not pass title prop down to DOM element", () => {
    expect(render({}).getDOMNode().getAttribute("title")).toEqual(null);
  });

  describe("if `href` prop provided", () => {
    it("should not render the content", () => {
      wrapper = render({ href: "#" });

      expect(wrapper.find("p").exists()).toBe(false);
    });
  });

  describe("when a tab is selected", () => {
    it("applies display block property", () => {
      wrapper = renderStyles({
        isTabSelected: true,
      });

      assertStyleMatch(
        {
          display: "block",
        },
        wrapper.toJSON()
      );
    });

    describe("when position prop is set to left and the tab is selected", () => {
      it("applies width of 80%", () => {
        wrapper = renderStyles({
          isTabSelected: true,
          position: "left",
        });
        assertStyleMatch(
          {
            width: "80%",
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe("Tab validation", () => {
    describe("updateErrors", () => {
      it("calls the parent tab context with the new state", () => {
        wrapper = renderWithValidation({
          updateErrors,
          updateWarnings,
          id: "foo",
          validations: { error: true },
        });
        expect(updateErrors).toHaveBeenCalledWith(tabId, { foo: true });
      });
    });

    describe("updateWarnings", () => {
      it("calls the parent tab context with the new state", () => {
        wrapper = renderWithValidation({
          updateErrors,
          updateWarnings,
          id: "foo",
          validations: { warning: true },
        });
        expect(updateWarnings).toHaveBeenCalledWith(tabId, { foo: true });
      });
    });
  });
});
