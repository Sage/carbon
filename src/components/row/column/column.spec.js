import React from "react";
import { mount } from "enzyme";

import Column from "./column.component";
import StyledColumn from "./column.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("Column", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Column>
        <span />
      </Column>
    );
  });

  describe("classes", () => {
    describe("when className is passed", () => {
      it("renders a passed className", () => {
        wrapper.setProps({ className: "myclass" });
        expect(wrapper.find(StyledColumn).props().className).toBe("myclass");
      });
    });

    describe("when columnClasses is passed", () => {
      it("renders a passed columnClasses", () => {
        wrapper.setProps({ columnClasses: "myColumnClasses" });
        expect(wrapper.find(StyledColumn).props().className).toBe(
          "myColumnClasses"
        );
      });
    });

    describe("when className and columnClasses is passed", () => {
      it("renders both classes", () => {
        wrapper.setProps({
          columnClasses: "myColumnClasses",
          className: "myClass",
        });
        expect(wrapper.find(StyledColumn).props().className).toBe(
          "myClass myColumnClasses"
        );
      });
    });
  });

  describe("options", () => {
    describe("when columnOffset is passed", () => {
      it("renders Column with proper margin-left value", () => {
        wrapper.setProps({ columnOffset: "2", columns: 12 });
        assertStyleMatch(
          {
            marginLeft: `${(100 / 12) * 2}%`,
          },
          wrapper.find(StyledColumn)
        );
      });
    });

    describe("when columnAlign is passed as right", () => {
      it("renders Column with proper text-align value", () => {
        wrapper.setProps({ columnAlign: "right" });
        assertStyleMatch(
          {
            textAlign: "right",
          },
          wrapper.find(StyledColumn)
        );
      });
    });

    describe("when columnAlign is passed as center", () => {
      it("renders Column with proper text-align value", () => {
        wrapper.setProps({ columnAlign: "center" });
        assertStyleMatch(
          {
            textAlign: "center",
          },
          wrapper.find(StyledColumn)
        );
      });
    });

    describe("when columnAlign is passed as middle", () => {
      it("renders Column with proper text-align value", () => {
        wrapper.setProps({ columnAlign: "middle" });
        assertStyleMatch(
          {
            textAlign: "center",
          },
          wrapper.find(StyledColumn)
        );
      });
    });

    describe("columnSpan", () => {
      it("renders a columnSpan class", () => {
        wrapper.setProps({ columnSpan: "2", columns: 12 });
        assertStyleMatch(
          {
            width: `${(100 / 12) * 2}%`,
          },
          wrapper.find(StyledColumn)
        );
      });
    });
  });
});
