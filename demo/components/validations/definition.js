import Validations from './';
import Definition from './../../utils/definition';
import ComponentActions from './../../actions/component';

let definition = new Definition('validations', Validations, {
  propValues: {
    value: '',
    validator: 'length',
    onOptionsChange: ComponentActions.updateValidationOption
  },
  propOptions: {
    validator: [
      'blank',
      'email',
      'exclusion',
      'inclusion',
      'length',
      'numeral',
      'presence',
      'regex',
    ]
  },
  hiddenProps: [ 'value' ]
});

definition.stubAction('onChange', 'value');

export default definition;
