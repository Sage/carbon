import { Menu } from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Menu,
  key: 'menu',
  text: {
    bemClass: 'carbon-menu',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Menu',
    type: 'action'
  },
  defaultProps: Menu.defaultProps,
  props: Menu.propTypes,
  propOptions: {
    as: OptionsHelper.themesBinary()
  }
};

definition.demoProps = {
  as: 'primary',
  children: 'test'
};

export default definition;
