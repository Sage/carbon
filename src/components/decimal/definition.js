import Decimal from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Decimal,
  key: 'decimal',
  text: {
    bemClass: 'carbon-decimal',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Decimal',
    type: 'form'
  },
  props: Decimal.propTypes,
  defaultProps: Decimal.defaultProps,
  propOptions: {
    align: ['left', 'right']
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  align: 'right',
  precision: 2
});

export default definition;
