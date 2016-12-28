import Content from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Content,
  key: 'content',
  text: {
    bemClass: 'carbon-content',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Content',
    type: 'layout'
  },
  defaultProps: Content.defaultProps,
  props: Content.propTypes,
  propOptions: {
    align: ['left', 'right'],
    as: ['primary', 'secondary']
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test',
  inline: true,
  title: 'Test',
  titleWidth: 20
});

export default definition;
