import { Menu } from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
    as: DefinitionHelper.themesBinary()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
