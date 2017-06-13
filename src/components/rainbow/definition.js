import Rainbow from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('rainbow', Rainbow, {
  description: `Simple information visualised in a chart.`,
  designerNotes: `
* Helps the user visualise some data in a chart - it works best to show a relative proportion, a little like how you might use a pie chart.
* Specify the source data, and the colours to use. Check out the Carbon Colours in the Style section.
 `,
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
    className: "String",
    config: "Object",
    data: "Object",
    title: "String"
  },
  propDescriptions: {
    className: "Classes to apply to the component.",
    config: "Supply a custom config object to the Highcharts.",
    data: "Supply data for the chart.",
    title: "Supply a custom title for the chart."
  },
  propValues: {
    data: "getData()"
  }
});

export default definition;
