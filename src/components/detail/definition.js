import Detail from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Detail,
  key: 'detail',
  text: {
    bemClass: 'carbon-detail',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Detail',
    type: 'layout'
  },
  defaultProps: Detail.defaultProps,
  props: Detail.propTypes,
  propOptions: {
    icon: DefinitionHelper.icons()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'Test detail',
  footnote: 'Test footnote',
  icon: 'tick'
});

export default definition;
