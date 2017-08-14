import Link from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import linkDefinition from './../link/__definition__';
import tooltipDefinition from './../tooltip/__definition__';

let definition = new Definition('link', Link, {
  description: `Navigates the user to another location.`,
  designerNotes: `
* Avoid using links for commands (performing an action like saving a form) - use them for navigating the user to a new location.
* If you’re navigating the user away from your site, consider using an icon after the link, and open the link in a new window, so the user doesn’t lose their place.
* To make the meaning of a link clearer, you can add an icon before it. Just name one of the Carbon icons.
* Make your link names meaningful - for example, instead of ‘Click here’, try ‘Download Invoice 001’.
* WCAG guidelines recommend that Color is not used as the only visual means of conveying information, indicating an action. Carbon applies bold weight, but you could also use text decoration.
  `,
  relatedComponentsNotes: `
* Need an icon to go with your link? [View Icons](/style/icons).
 `,
  type: 'action',
  propValues: {
    children: 'I\'m a link'
  },
  propTypes: {
    children: 'Node',
    className: 'String',
    disabled: 'Boolean',
    href: 'String',
    iconAlign: 'String',
    onClick: 'Function',
    onKeyDown: 'Function',
    tabbable: 'Boolean',
    to: 'String',
    tooltipAlign: "String",
    tooltipPosition: "String",
    tooltipMessage: "String"
  },
  propDescriptions: {
    children: 'Child content to render in the link.',
    className: 'Classes to apply to the component.',
    disabled: 'The disabled state of the link',
    href: 'An href for an anchor tag',
    icon: 'An icon to display next to the link.',
    iconAlign: 'Which side of the link to the render the link.',
    onClick: 'Function called when the mouse is clicked.',
    onKeyDown: 'Function called when a key is pressed.',
    tabbable: 'Whether to include the link in the tab order of the page',
    to: 'Using `to` instead of `href` will create a React Router link rather than a web href.',
    tooltipAlign: "Aligns the tooltip.",
    tooltipMessage: "A message to display as a tooltip to the link.",
    tooltipPosition: "Positions the tooltip with the link."
  },
  propOptions: {
    icon: OptionsHelper.icons,
    iconAlign: OptionsHelper.alignBinary,
    tooltipAlign: OptionsHelper.alignAroundEdges,
    tooltipPosition: OptionsHelper.positions
  }
});


export default definition;
