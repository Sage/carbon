import Rainbow from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('rainbow', Rainbow, {
  hiddenProps: ['config', 'data'],
  js: `function getData() {
  return Immutable.List([{
    y: 30,
    name: 'First Bit',
    label: 'label for first bit',
    tooltip: 'More info about first bit!',
    color: '#50B848'
  }, {
    y: 70,
    name: 'Second Bit',
    label: 'label for second bit',
    tooltip: 'More info about second bit!',
    color: '#ED1C5F'
  }]);
}`,
  propTypes: {
    config: "Object",
    data: "Object",
    title: "String"
  },
  propDescriptions: {
    config: "Supply a custom config object to the Highcharts.",
    data: "Supply data for the chart.",
    title: "Supply a custom title for the chart."
  },
  propValues: {
    data: "getData()"
  }
});

export default definition;
