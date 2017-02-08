import Link from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from './../link/definition';
import tooltipDefinition from './../tooltip/definition';

let definition = new Definition('link', Link, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'layout',
  associatedDefinitions: [tooltipDefinition],
  requiredProps: ['actions'],
  propValues: {
    children: 'I\'m a link'
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    disabled: 'Boolean',
    href: 'String',
    iconAlign: 'String',
    tabbable: 'Boolean',
    to: 'String'
  },
  propDescriptions: {
    children: 'Child content to render in the link.',
    className: 'A custom class name for the component',
    disabled: 'The disabled state of the link',
    href: 'An href for an anchor tag',
    iconAlign: 'Which side of the link to the render the link.',
    tabbable: 'Whether to include the link in the tab order of the page',
    to: 'Using `to` instead of `href` will create a React Router link rather than a web href.'
  }
});


export default definition;
