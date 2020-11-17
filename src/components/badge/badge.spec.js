import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import Badge from "./badge.component";
import Button from "../button";
import { StyledCounter } from "./badge.style";
import { baseTheme } from "../../style/themes";

const renderComponent = (props = {}) => (
  <ThemeProvider theme={baseTheme}>
    <Badge {...props}>
      <Button buttonType="primary">Button</Button>
    </Badge>
  </ThemeProvider>
);

const BADGE = '[data-component="badge"]';

describe("Badge", () => {
  it("should render correctly", () => {
    const wrapper = mount(renderComponent({ counter: 1 }));

    expect(wrapper.find(BADGE).exists()).toBe(true);
  });

  describe("when counter is between 1 and 99", () => {
    const wrapper = mount(renderComponent({ counter: 50 }));

    it("should render delivered number", () => {
      expect(wrapper.find(StyledCounter).text()).toEqual("50");
    });
  });

  describe("when counter is higher than 99", () => {
    const wrapper = mount(renderComponent({ counter: 101 }));

    it("should render number `99`", () => {
      expect(wrapper.find(StyledCounter).text()).toEqual("99");
    });
  });

  describe("when counter is `0`", () => {
    const wrapper = mount(renderComponent({ counter: 0 }));

    it("should not render badge", () => {
      expect(wrapper.find(BADGE).exists()).toBe(false);
    });
  });
});
