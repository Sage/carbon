import { Pages } from './';
import Definition from './../../../demo/utils/definition';
import pageDefinition from './page/definition';

global.goToPage = (ev) => {
  window.Dispatcher.dispatch({
    actionType: window.ComponentConstants.UPDATE_DEFINITION,
    name: 'pages',
    prop: 'slideIndex',
    value: ev.target.name || '0'
  });
};

const definition = new Definition('pages', Pages, {
  description: 'Allows to slide to different pages in a full screen dialog.',
  designerNotes: '',
  associatedDefinitions: [pageDefinition],
  propTypes: {
    children: 'Node',
    className: 'String',
    slideIndex: 'Number || String'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
    slideIndex: 'Set this prop to change slide'
  },
  wrap: 'DialogFullScreen',
  wrapProps: ['open', 'onCancel'],
  props: ['slideIndex'],
  propValues: {
    children: `<Page title={ <Heading title='My First Page' /> }>
    <Button onClick={ window.goToPage } name="1">
      Go to next page.
    </Button>
  </Page>

  <Page title={ <Heading title='My Second Page' backLink={ window.goToPage } /> }>
    <Button onClick={ window.goToPage } name="0">
      Go to previous page.
    </Button>
  </Page>`,
    slideIndex: 0
  },
  openPreview: true
});

definition.stubAction('onCancel', 'open', false);

export default definition;
