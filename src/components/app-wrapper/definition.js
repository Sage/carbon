import AppWrapper from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('app-wrapper', AppWrapper, {
  propValues: {
    children: `<div style={{ backgroundColor: "white"  }}>
    This component will wrap it's children within the width constraints of your application.
  </div>`
  },
  hiddenProps: ['children'],
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
