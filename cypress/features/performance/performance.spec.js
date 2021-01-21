import { visitComponentUrl } from '../../support/helper';
import { commonButtonPreviewNoIFrameRoot, noPreview } from '../../locators';

const componentList = [
  'alert',
  'appwrapper',
  'button-toggle',
  'button-toggle-group',
  'carousel',
  'configurable items',
  'confirm',
  'content',
  'design system accordion',
  'design system action popover',
  'design system advanced color picker',
  'test anchornavigation',
  'design system badge',
  'design system batch selection',
  'design system box',
  'design system button',
  'design system card',
  'design system draggable',
  'design system drawer',
  'test duellingpicklist',
  'design system fieldset address fieldset examples',
  'design system flat table',
  'design system form',
  'design system grid',
  'design system hr',
  'design system loader',
  'design system menu',
  'design system navigation bar',
  'design system note',
  'design system numeral date',
  'design system pager',
  'design system pill test',
  'design system popover container',
  'design system search',
  'design system select',
  'design system select filterable',
  'design system select multiselect',
  'design system tabs',
  'design system text editor',
  'design system tile',
  'design system tile select',
  'design system toast test',
  'design system typography',
  'design system verticaldivider',
  'detail',
  'dialog',
  'draggablecontext',
  'experimental checkbox',
  'experimental date input',
  'experimental date range',
  'experimental decimal input',
  'experimental fieldset',
  'experimental groupedcharacter',
  'experimental number input',
  'experimental radiobutton',
  'experimental simple color picker',
  'experimental switch',
  'experimental textarea',
  'experimental textbox',
  'heading',
  'help',
  'i18ncomponent',
  'icon',
  'link',
  'message',
  'mount in app',
  'multi action button',
  'pod',
  'portrait',
  'preview',
  'profile',
  'row',
  'settingsrow',
  'showeditpod',
  'sidebar',
  'split button',
  'step sequence',
  'table',
  'table ajax',
  'test definition list',
];

const componentListOpenPreview = [
  'dialog full screen',
  'multi action button',
];

describe('Performance testing', () => {
  componentList.forEach((component) => {
    it(`${component}`, () => {
      cy.fixture('./performance/componentList.json')
        .then((json) => {
          const el = json[component];
          // eslint-disable-next-line no-restricted-syntax
          for (const prop in el) {
            if ({}.hasOwnProperty.call(el, prop)) {
              visitComponentUrl(component, el[prop], true);
              noPreview().then(($el) => {
                expect($el).not.be.visible;
              });
            }
          }
        });
    });
  });
});

describe('Performance testing for modals', () => {
  componentListOpenPreview.forEach((component) => {
    it(`${component}`, () => {
      cy.fixture('./performance/componentList.json')
        .then((json) => {
          const el = json[component];
          // eslint-disable-next-line no-restricted-syntax
          for (const prop in el) {
            if ({}.hasOwnProperty.call(el, prop)) {
              visitComponentUrl(component, el[prop], true);
              noPreview().then(($el) => {
                expect($el).not.be.visible;
                commonButtonPreviewNoIFrameRoot().click();
              });
            }
          }
        });
    });
  });
});

// const test = {
//   type: 'cons:log',
//   severity: 'success',
//   message: 'component: alert--default-story, phase: mount, actual time: 15.650000117602758, start time: 601.8350000085775, base time: 14.250000109313987, commit time: 618.6950000119396',
// };

// describe('console.log', () => {
//   it('Test', () => {
//     const parsedData = parseJsonData(test);
//     splitString(parsedData);
//   });
// });
