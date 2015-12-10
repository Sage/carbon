import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Rainbow from './rainbow';
import Immutable from 'immutable';

describe('Rainbow', () => {
  var instance;

  beforeEach(() => {
    let data = Immutable.fromJS([
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

    instance = TestUtils.renderIntoDocument(
      <Rainbow title="My Title" data={ data } />
    );
  });

  describe('shouldComponentUpdate', () => {
    beforeEach(() => {
      spyOn(instance.refs.chart.chart, 'setTitle');
      spyOn(instance.refs.chart.chart.series[0], 'setData');
    });

    describe('when title changes', () => {
      it("calls setTitle", () => {
        instance.shouldComponentUpdate({ title: "different title", data: instance.props.data });
        expect(instance.refs.chart.chart.setTitle).toHaveBeenCalledWith({ text: "different title" });
      });
    });

    describe('when data changes', () => {
      it("calls setData", () => {
        let newData = Immutable.fromJS({ foo: "bar" });
        instance.shouldComponentUpdate({ title: instance.props.title, data: newData  });
        expect(instance.refs.chart.chart.series[0].setData).toHaveBeenCalledWith(newData.toJS());
      });
    });

    describe('when nothing has changed', () => {
      it("calls neither set methods", () => {
        instance.shouldComponentUpdate({ title: instance.props.title, data: instance.props.data  });
        expect(instance.refs.chart.chart.setTitle).not.toHaveBeenCalled();
        expect(instance.refs.chart.chart.series[0].setData).not.toHaveBeenCalled();
      });
    });
  });

  describe('highcharts config', () => {
    it("sets the config to use the data", () => {
      expect(instance.refs.chart.chart.userOptions.series[0].data).toEqual(instance.props.data.toJS());
    });

    it("sets the config to use the title", () => {
      expect(instance.refs.chart.chart.userOptions.title.text).toEqual(instance.props.title);
    });

    it("calls zIndexSetter when triggering mouse over on a segment", () => {
      let point = instance.refs.chart.chart.series[0].data[0];
      let graphic = point.graphic;

      spyOn(graphic, 'zIndexSetter');
      point.onMouseOver();

      expect(graphic.zIndexSetter).toHaveBeenCalledWith(1);
    });


    it("calls zIndexSetter when triggering mouse over on a segment", () => {
      let point = instance.refs.chart.chart.series[0].data[0];
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
      expect(instance.refs.chart.chart.userOptions.tooltip.positioner(50, 100, opts)).toEqual({ x: 75, y: 105 });
    });

    it("sets the label to be display block if the pointer is visible", () => {
      instance.refs.chart.chart.series[0].setData([{
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit',
        visible: true
      }]);
      let display = instance.refs.chart.chart.series[0].points[0].dataLabel.div.children[0].children[0].style["display"];
      expect(display).toEqual('block');
    });

    it("sets the label to be display none if the pointer is not visible", () => {
      instance.refs.chart.chart.series[0].setData([{
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit',
        visible: false
      }]);
      let display = instance.refs.chart.chart.series[0].points[0].dataLabel.div.children[0].children[0].style["display"];
      expect(display).toEqual('none');
    });
  });
});
