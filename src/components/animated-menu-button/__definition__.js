import AnimatedMenuButton from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('animated-menu-button', AnimatedMenuButton, {
  description: `Quick access to a number of especially useful hyperlinks.`,
  designerNotes: `
* A quick way for users to access a number of useful hyperlinks in context.
* This pattern tends to be used as a quick way of allowing the user to create a range of new items (e.g. New Sales Invoice, New Quote, New Payment).
* Try not to mix navigation options with action options.
* Try not to create any duplication between the Menu component, and this component.
  `,
  relatedComponentsNotes: `
* Choosing between variants of the same page, or filtering content? [Try Tabs](/components/tabs).
* Positioning your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Navigating the hierarchy of the app? [Try Menu](/components/menu).
  `,
  hiddenProps: ["children"],
  propOptions: {
    direction: OptionsHelper.alignBinary,
    size: OptionsHelper.sizesFull
  },
  propTypes: {
    className: 'String',
    children: 'Node',
    direction: 'String',
    label: 'String',
    size: 'String'
  },
  propDescriptions: {
    className: 'Classes to apply to the component.',
    children: 'This component supports children.',
    direction: 'The direction in which the component should expand.',
    label: 'An optional title for the component.',
    size: 'The size in which the component should expand to.'
  },
  propValues: {
    children: `<Row>
    <Column>
      <h2>1st Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </Column>

    <Column>
      <h2>2nd Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </Column>

    <Column>
      <h2>3rd Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </Column>
  </Row>`,
    direction: 'right'
  }
});

export default definition;
