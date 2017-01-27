import Icon from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Icon,
  key: 'icon',
  text: {
    bemClass: 'carbon-icon',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Icon',
    type: 'misc'
  },
  defaultProps: Icon.defaultProps,
  props: Icon.propTypes,
  propOptions: {
    type: OptionsHelper.icons(),
    bgShape: OptionsHelper.shapes(),
    bgSize: OptionsHelper.sizesRestricted(),
    bgTheme: OptionsHelper.colors(),
    tooltipAlign: OptionsHelper.alignFull(),
    tooltipPosition: OptionsHelper.positions()
  }
};

let demoProps = OptionsHelper.tooltipDecoratorDemoProps();

demoProps.type = OptionsHelper.icons()[0];
demoProps.bgShape = 'square';
demoProps.bgSize = 'medium';
demoProps.bgTheme = 'success';

definition.demoProps = demoProps;

export default definition;
