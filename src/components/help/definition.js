import Help from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Help,
  key: 'help',
  text: {
    bemClass: 'carbon-help',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Help',
    type: 'misc'
  },
  defaultProps: Help.defaultProps,
  props: Help.propTypes,
  propOptions: {
    tooltipAlign: OptionsHelper.alignFull(),
    tooltipPosition: OptionsHelper.positions()
  }
};

definition.demoProps = {
  children: 'Tooltip test',
  tooltipAlign: 'left',
  tooltipPosition: 'top'
};

export default definition;
