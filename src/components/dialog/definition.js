import Dialog from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('dialog', Dialog, {
  description: 'A dialog box overlaid on top of any page.',
  designerNotes: `
* Useful to perform an action in context without navigating the user to a separate page.
* Several pre-set widths are available - the height of the dialog will flex to fit the content. It’s best to avoid
 dialogs that are taller than the user’s viewport height. Typical user viewport heights can be as little as 650 pixels.
* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the dialog.
* A configuration shows a close icon at the top right of the Dialog. Sometimes users are more likely to click this than
 a traditional ‘Cancel’ button.
  `,
  relatedComponentsNotes: `
* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).
* Need to refer back to the underlying page? [Try Sidebar](/components/sidebar).
 `,
  propOptions: {
    size: OptionsHelper.sizesFull
  },
  propValues: {
    title: 'Example Title for a Dialog',
    children: '<Form><Tabs><Tab tabId="1" title="Tab 1"><Textarea rows="37"></Tab><Tab tabId="2" title="Tab 2"><Textarea rows="40" /></Tab></Tabs></Form>',
    height: "900px"
  },
  propTypes: {
    autoFocus: 'Boolean',
    title: 'String',
    size: 'String',
    showCloseIcon: 'Boolean',
    subtitle: 'String'
  },
  propDescriptions: {
    autoFocus: 'When set to true the dialog will receive keyboard focus when it opens.',
    showCloseIcon: 'Set this prop to false to hide the close icon within the dialog.',
    size: `Change this prop to set the dialog to a specific size. Possible values include:
     ${OptionsHelper.sizesFull.join(', ')}`,
    subtitle: 'Controls the subtitle of the dialog.',
    title: 'Controls the main title of the dialog.'
  }
});

definition.isAModal();

export default definition;
