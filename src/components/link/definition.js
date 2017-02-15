import Link from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from './../link/definition';
import tooltipDefinition from './../tooltip/definition';

let definition = new Definition('link', Link, {
  type: 'action',
  propValues: {
    children: 'I\'m a link'
  },
  propTypes: {
    children: 'Node',
    disabled: 'Boolean',
    href: 'String',
    iconAlign: 'String',
    tabbable: 'Boolean',
    to: 'String'
  },
  propDescriptions: {
    children: 'Child content to render in the link.',
    disabled: 'The disabled state of the link',
    href: 'An href for an anchor tag',
    icon: 'An icon to display next to the link.',
    iconAlign: 'Which side of the link to the render the link.',
    tabbable: 'Whether to include the link in the tab order of the page',
    to: 'Using `to` instead of `href` will create a React Router link rather than a web href.'
  },
  propOptions: {
    icon: OptionsHelper.icons,
    iconAlign: OptionsHelper.alignBinary
  }
});


export default definition;
