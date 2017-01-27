import Tooltip from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Tooltip,
  key: 'tooltip',
  text: {
    bemClass: 'carbon-tooltip',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Tooltip',
    type: 'misc'
  },
  defaultProps: Tooltip.defaultProps,
  props: Tooltip.propTypes,
  propOptions: {
    align: OptionsHelper.alignFull(),
    position: OptionsHelper.positions()
  }
};

definition.demoProps = {
  align: 'left',
  children: 'test',
  isVisible: true,
  position: 'top'
};

export default definition;
