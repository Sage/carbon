import AppWrapper from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('app-wrapper', AppWrapper, {
  propValues: {
    children: "This component will wrap its children within the width constraints of your application."
  },
  propTypes: {
    children: 'Node',
    className: 'String',
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
  }
});

export default definition;
