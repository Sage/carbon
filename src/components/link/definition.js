import Link from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Link,
  key: 'link',
  text: {
    bemClass: 'carbon-link',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Link',
    type: 'action'
  },
  defaultProps: Link.defaultProps,
  props: Link.propTypes,
  propOptions: {
    icon: DefinitionHelper.icons(),
    iconAlign: DefinitionHelper.alignBinary(),
    tooltipAlign: DefinitionHelper.alignPlusCenter(),
    tooltipPosition: DefinitionHelper.positions()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
