import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Rainbow from './rainbow';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

/* global jest */

describe('Rainbow', () => {
  global.Highcharts = {
    chart() {
      return {
        setTitle() {},
        series: [
          { setData() {} }
        ]
      };
    }
  };

  let wrapper, data, chart;

  function render(props={}) {
    wrapper = mount(
      <Rainbow title="My Title" data={ data } { ...props } />
    );
  };

  beforeEach(() => {
    data = Immutable.fromJS([
      {
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit'
      }, {
        y: 70,
        name: 'Second Bit',
        label: 'label for second bit',
        tooltip: 'more info about this bit'
      }
    ]);

    render();

    const instance = wrapper.instance();
    chart = instance._chart;
  });

  describe('shouldComponentUpdate', () => {
    beforeEach(() => {
      chart.setTitle = jest.fn();
      chart.series[0].setData = jest.fn();
      // spyOn(chart, 'setTitle');
      // spyOn(chart.series[0], 'setData');
    });

    describe('when title changes', () => {
      test("calls setTitle", () => {
        wrapper.setProps({ title: 'different title', data: wrapper.props().data });
        expect(chart.setTitle).toHaveBeenCalledWith({ text: "different title" });
      });
    });

    describe('when data changes', () => {
      it("calls setData", () => {
        const newData = Immutable.fromJS({ foo: "bar" });
        wrapper.setProps({ title: wrapper.props().title, data: newData });
        expect(chart.series[0].setData).toHaveBeenCalledWith(newData.toJS());
      });
    });

    describe('when nothing has changed', () => {
      it("calls neither set methods", () => {
        const theProps = wrapper.props();
        wrapper.setProps({ title: theProps.title, data: theProps.data });
        expect(chart.setTitle).not.toHaveBeenCalled();
        expect(chart.series[0].setData).not.toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the base class', () => {
      expect(wrapper.instance().mainClasses).toEqual('carbon-rainbow');
    });

    describe('when a custom class is passed', () => {
      it('returns base and custom class', () => {
        render({ className: 'customClass' });
        expect(wrapper.instance().mainClasses).toEqual('carbon-rainbow customClass');
      });
    });
  });

  xdescribe('highcharts config', () => {
    it("sets the config to use the data", () => {
      expect(chart.userOptions.series[0].data).toEqual(wrapper.instance().props.data.toJS());
    });

    it("sets the config to use the title", () => {
      expect(chart.userOptions.title.text).toEqual(wrapper.instance().props.title);
    });

    it("calls zIndexSetter when triggering mouse over on a segment", () => {
      let point = chart.series[0].data[0];
      let graphic = point.graphic;

      spyOn(graphic, 'zIndexSetter');
      point.onMouseOver();

      expect(graphic.zIndexSetter).toHaveBeenCalledWith(1);
    });


    it("calls zIndexSetter when triggering mouse over on a segment", () => {
      let point = chart.series[0].data[0];
      let graphic = point.graphic;

      spyOn(graphic, 'zIndexSetter');
      point.onMouseOut();

      expect(graphic.zIndexSetter).toHaveBeenCalledWith(0);
    });

    it("positions the tooltip correctly", () => {
      let opts = {
        plotX: 100,
        plotY: 200
      };
      expect(chart.userOptions.tooltip.positioner(50, 100, opts)).toEqual({ x: 75, y: 105 });
    });

    it("sets the label to be display block if the pointer is visible", () => {
      chart.series[0].setData([{
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit',
        visible: true
      }]);
      let display = chart.series[0].points[0].dataLabel.div.children[0].children[0].style["display"];
      expect(display).toEqual('block');
    });

    it("sets the label to be display none if the pointer is not visible", () => {
      chart.series[0].setData([{
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit',
        visible: false
      }]);
      let display = chart.series[0].points[0].dataLabel.div.children[0].children[0].style["display"];
      expect(display).toEqual('none');
    });

    describe('config property', () => {
      describe('uses some default chart config when no config is passed', () => {
        it("can use the config property to override some chart properties", () => {
          expect(chart.options.chart.backgroundColor).toEqual(null);
          expect(chart.options.credits.enabled).toEqual(false);
        });
      });

      describe('it is possible to override the chart properties using the config props', () => {
        let config = {
          credits: {
            enabled: true
          },
          chart: {
            backgroundColor: '#ff00cc'
          }
        };

        beforeEach(() => {
          render({config});
        });

        it("can use the config property to override some chart properties", () => {
          expect(chart.options.chart.backgroundColor).toEqual('#ff00cc');
          expect(chart.options.credits.enabled).toEqual(true);
        });
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(
      <Rainbow
        data-element='bar'
        data-role='baz'
        data={ {} }/>
      );

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'rainbow', 'bar', 'baz');
    });
  });
});
