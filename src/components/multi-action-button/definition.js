import MultiActionButton from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: MultiActionButton,
  key: 'multi-action-button',
  text: {
    bemClass: 'carbon-multi-action-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'MultiActionButton',
    type: 'action'
  },
  defaultProps: MultiActionButton.defaultProps,
  props: MultiActionButton.propTypes,
  propOptions: {
    align: OptionsHelper.alignBinary(),
    as: OptionsHelper.themesBinary()
  }
};

definition.demoProps = {
  children: 'test',
  text: 'Multi action button'
};

export default definition;
