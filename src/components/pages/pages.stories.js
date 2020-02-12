import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import DefaultPages from './pages.component';
import Page from './page/page.component';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import DialogFullScreen from '../dialog-full-screen';
import Heading from '../heading/heading';
import Button from '../button';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

Page.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /page\.js(?!spec)/
);

DefaultPages.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /pages(?!spec)/
);

const store = new Store({
  open: false,
  pageIndex: 0,
  pageHistory: [],
  previouspageHistoryPointer: 0,
  isDisabled: false,
  transitionTime: 600
});

const handleSlide = (_, pageIndex) => {
  action('slide')(`Page index: ${pageIndex}`);

  if (store.get('isDisabled')) return store.get('previouspageHistoryPointer');

  const newpageHistory = [...store.get('pageHistory'), pageIndex];

  store.set({
    isDisabled: true,
    pageHistory: newpageHistory,
    pageIndex: (pageIndex || 0),
    previouspageHistoryPointer: newpageHistory.length - 1
  });

  setTimeout(() => {
    store.set({ isDisabled: false });
  }, store.get('transitionTime'));

  return pageIndex;
};

const handlePreviousSlide = (ev) => {
  ev.preventDefault();
  if (store.get('isDisabled')) return;
  const previouHistoryPointer = store.get('previouspageHistoryPointer');
  const pointer = (previouHistoryPointer - 1) > 0 ? (previouHistoryPointer - 1) : 0;

  store.set({
    isDisabled: true,
    pageHistory: store.get('pageHistory').slice(0, -1),
    pageIndex: (store.get('pageHistory')[pointer] || 0),
    previouspageHistoryPointer: pointer
  });

  setTimeout(() => {
    store.set({ isDisabled: false });
  }, store.get('transitionTime'));
};

const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};

const handleCancel = () => {
  action('cancel')();
  store.set({
    pageIndex: 0,
    open: false,
    pageHistory: [0]
  });
};

const CustomState = (props) => {
  return (
    <State store={ store }>
      { props.children }
    </State>
  );
};

CustomState.propTypes = {
  children: PropTypes.node
};

const DialogState = props => new CustomState(props);
const PageState = props => new CustomState(props);
const indexConfig = [0, 1, 2];
const pageIndex = () => select('pageIndex', indexConfig, indexConfig[0]);

function makeStory(name, themeSelector) {
  const component = () => {
    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <DialogState>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
            showCloseIcon
          >
            <PageState>
              <DefaultPages
                pageIndex={ handleSlide(null, pageIndex()) }
              >
                <Page title={ <Heading title='My First Page' /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to second page
                  </Button>
                </Page>

                <Page title={ <Heading title='My Second Page' backLink={ handlePreviousSlide } /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                    Go to third page
                  </Button>
                </Page>
                <Page title={ <Heading title='My Third Page' backLink={ handlePreviousSlide } /> } />
              </DefaultPages>
            </PageState>
          </DialogFullScreen>
        </DialogState>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: <p>Allows to slide to different pages in a full screen dialog.</p>,
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, DefaultPages, Page, State]
    }
  };

  return [name, component, metadata];
}

storiesOf('Pages', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
