import InlineInputs from './';
import TextboxDefinition from '../../__deprecated__/components/textbox/__definition__';
import DecimalDefinition from '../../__deprecated__/components/decimal/__definition__';
import DropdownFilterAjaxDefintion from '../../__deprecated__/components/dropdown-filter-ajax/__definition__';
import Definition from '../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('inline-inputs', InlineInputs, {
  description: 'Edits a set of closely related inputs that are grouped together.',
  propTypes: {
    label: 'String',
    children: 'Node',
    className: 'String',
    htmlFor: 'String',
    gutter: 'String'
  },
  propValues: {
    label: 'Inline Inputs'
  },
  hiddenProps: ['className', 'htmlFor'],
  propDescriptions: {
    label: 'Label applied to set of inputs',
    htmlFor: 'label for property',
    className: 'Classes applied to the inline inputs component',
    children: 'Supports all inputs as children',
    gutter: 'Define how wide the gutter between the inputs should be.'
  },
  propOptions: {
    gutter: OptionsHelper.sizesFull
  }
});

const inputProps = {
  fieldHelp: null,
  label: null,
  labelHelp: null
}

definition.addChildByDefinition(TextboxDefinition, inputProps);
definition.addChildByDefinition(DecimalDefinition, inputProps);
definition.addChildByDefinition(DropdownFilterAjaxDefintion, inputProps);

export default definition;
