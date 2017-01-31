import Pill from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Pill,
  key: 'pill',
  text: {
    bemClass: 'carbon-pill',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Pill',
    type: 'misc'
  },
  defaultProps: Pill.defaultProps,
  props: Pill.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = {
  as: 'default',
  children: 'test',
  fill: true
};

export default definition;
