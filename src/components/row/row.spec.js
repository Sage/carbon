import React from "react";
import { mount, shallow } from "enzyme";

import baseTheme from "../../style/themes/base";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { Row, Column } from ".";
import StyledRow from "./row.style";
import StyledColumn from "./column/column.style";

describe("Row", () => {
  let wrapper;

  describe("render", () => {
    it("renders a parent div with calculated CSS classes", () => {
      wrapper = shallow(<Row />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("columns", () => {
    describe("when column number is not passed", () => {
      it("determines the columns from the number of children", () => {
        wrapper = shallow(
          <Row>
            <Column />
            <Column />
            <Column />
            <Column />
          </Row>
        );
        expect(wrapper.find(Column).first().props().columns).toBe(4);
      });
    });

    describe("when column number is passed", () => {
      it("sets the passed column as the number of columns", () => {
        wrapper = shallow(
          <Row columns="50">
            <Column />
          </Row>
        );
        expect(wrapper.find(Column).first().props().columns).toBe("50");
      });
    });

    describe("when a null column is passed", () => {
      it("ignores the null child", () => {
        const columns = [<Column key="0" />, <Column key="1" />, null];

        wrapper = shallow(<Row>{columns}</Row>);

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe.each([
    ["extra-small", 2],
    ["small", 5],
    ["medium-small", 10],
    ["medium", 15],
    ["medium-large", 30],
    ["large", 60],
    ["extra-large", 90],
  ])("gutter", (gutter, size) => {
    it("applies proper css values to Row element", () => {
      wrapper = mount(<Row gutter={gutter} />);
      assertStyleMatch(
        {
          marginBottom: `-${size}px`,
          marginLeft: `-${size}px`,
        },
        wrapper.find(StyledRow)
      );
    });

    it("applies proper css values to Column element", () => {
      wrapper = mount(<Row gutter={gutter} />);
      assertStyleMatch(
        {
          marginBottom: `${size}px`,
          paddingLeft: `${size}px`,
        },
        wrapper.find(StyledRow),
        { modifier: `${StyledColumn}` }
      );
    });

    it("applies proper css values to Column element when columnDivide is provided", () => {
      wrapper = mount(<Row gutter={gutter} columnDivide />);
      assertStyleMatch({ position: "relative" }, wrapper.find(StyledRow), {
        modifier: `${StyledColumn}`,
      });

      assertStyleMatch(
        {
          content: `""`,
          position: "absolute",
          width: "1px",
          height: "100%",
          backgroundColor: baseTheme.palette.slateTint(70),
          left: `${size / 2}px`,
          top: "0",
        },
        wrapper.find(StyledRow),
        {
          modifier: `${StyledColumn}:before`,
        }
      );
    });
  });

  describe("columnClasses", () => {
    it("passes the prop to its children", () => {
      wrapper = shallow(
        <Row>
          <Column />
        </Row>
      );
      wrapper.setProps({ columnClasses: "myChildClasses" });
      expect(wrapper.find(Column).first().props().columnClasses).toBe(
        "myChildClasses"
      );
    });
  });
});
