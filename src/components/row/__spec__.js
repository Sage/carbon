import Benchmark from "react-component-benchmark";
import React from "react";
import { mount, shallow } from "enzyme";
import { Row, Column } from "./row";

const printOnCompleteResults = (resultName, results) => {
  console.log(
    `${resultName} ... Min: ${Math.round(
      results.min * 1000
    )} | Mean: ${Math.round(results.mean * 1000)} | Max: ${Math.round(
      results.max * 1000
    )}`
  );
};

describe("Row", () => {
  let wrapper;
  let props;
  let meanTime;

  beforeEach(() => {
    meanTime = 0;
    props = {
      component: Row,
      onComplete: jest.fn((results) => {
        const mappedResults = {
          max: results.max,
          min: results.min,
          median: results.median,
          mean: results.mean,
          stdDev: results.stdDev,
          p70: results.p70,
          p95: results.p95,
          p99: results.p99,
        };
        meanTime = mappedResults.mean;
      }),
      samples: 20,
    };
  });

  it("mounts in a reasonable amount of time", () => {
    props.onComplete = printOnCompleteResults.bind(this, "Row)");
    const component = mount(<Benchmark {...props} />);
    component.instance().start();
  });

  it("updates in a reasonable amount of time", () => {
    props.onComplete = printOnCompleteResults.bind(this, "Row");
    const component = mount(<Benchmark {...props} type="update" />);
    component.instance().start();
  });

  it("unmounts in a reasonable amount of time", () => {
    props.onComplete = printOnCompleteResults.bind(this, "Row");
    const component = mount(<Benchmark {...props} type="unmount" />);
    component.instance().start();
  });

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
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("when column number is passed", () => {
      it("sets the passed column as the number of columns", () => {
        wrapper = shallow(
          <Row columns="50">
            <Column />
          </Row>
        );
        expect(wrapper).toMatchSnapshot();
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

  describe("gutter", () => {
    it("applies a gutter class", () => {
      wrapper = shallow(<Row />);
      wrapper.setProps({ gutter: "small" });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("columnDivide", () => {
    describe("when columnDivide is true", () => {
      it("passes columnDivide to its children", () => {
        wrapper = shallow(
          <Row>
            <Column />
          </Row>
        );
        wrapper.setProps({ columnDivide: true });
        expect(wrapper).toMatchSnapshot();
      });
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
      expect(wrapper).toMatchSnapshot();
    });
  });
});
