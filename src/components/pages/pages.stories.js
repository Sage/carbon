import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import DefaultPages from './pages.component';
import Page from './page/page.component';
import DialogFullScreen from '../dialog-full-screen';
import Heading from '../heading/heading';
import Button, { OriginalButton } from '../button/button.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';
import classic from '../../style/themes/classic';

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
  previouspageHistoryPointer: 0
});

const handleSlide = (ev, pageIndex) => {
  action('slide')(ev);
  const newpageHistory = [...store.get('pageHistory'), pageIndex];

  store.set({
    pageHistory: newpageHistory,
    pageIndex: (pageIndex || 0),
    previouspageHistoryPointer: newpageHistory.length - 1
  });

  return pageIndex;
};

const handlePreviousSlide = (ev) => {
  ev.preventDefault();
  action('previous-slide')(ev);
  const previouHistoryPointer = store.get('previouspageHistoryPointer');
  const pointer = (previouHistoryPointer - 1) > 0 ? (previouHistoryPointer - 1) : 0;

  store.set({
    pageIndex: (store.get('pageHistory')[pointer] || 0),
    previouspageHistoryPointer: pointer
  });
};

const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};

const handleCancel = () => {
  action('cancel')();
  store.set({
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

storiesOf('Pages', module)
  .add('classic', () => {
    const indexConfig = [0, 1, 2];
    const pageIndex = select('pageIndex', indexConfig, indexConfig[0]);
    handleSlide(null, pageIndex);

    return (
      <ThemeProvider theme={ classic }>
        <div>
          <Button onClick={ handleOpen }>Open Preview</Button>
          <DialogState>
            <DialogFullScreen
              open={ store.get('open') }
              onCancel={ handleCancel }
            >
              <PageState>
                <DefaultPages>
                  <Page title={ <Heading title='My First Page' /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                      Go to second page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                      Go to third page
                    </Button>
                  </Page>

                  <Page title={ <Heading title='My Second Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                      Go to first page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 2); } }>
                      Go to third page
                    </Button>
                  </Page>

                  <Page title={ <Heading title='My Third Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                    <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                      Go to first page
                    </Button>
                    <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                      Go to second page
                    </Button>
                  </Page>
                </DefaultPages>
              </PageState>
            </DialogFullScreen>
          </DialogState>
        </div>
      </ThemeProvider>
    );
  }, {
    info: {
      text: <p>Allows to slide to different pages in a full screen dialog.</p>,
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, DefaultPages, Page, State]
    }
  })
  .add('default', () => {
    const indexConfig = [0, 1, 2];
    const pageIndex = select('pageIndex', indexConfig, indexConfig[0]);

    return (
      <div>
        <OriginalButton onClick={ handleOpen }>Open Preview</OriginalButton>
        <DialogState>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
          >
            <PageState>
              <DefaultPages
                pageIndex={ handleSlide(null, pageIndex) }
              >
                <Page title={ <Heading title='My First Page' /> }>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to second page
                  </OriginalButton>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 2); } }>
                    Go to third page
                  </OriginalButton>
                </Page>

                <Page title={ <Heading title='My Second Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 0); } }>
                    Go to first page
                  </OriginalButton>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 2); } }>
                    Go to third page
                  </OriginalButton>
                </Page>

                <Page title={ <Heading title='My Third Page' backLink={ (ev) => { handlePreviousSlide(ev); } } /> }>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 0); } }>
                    Go to first page
                  </OriginalButton>
                  <OriginalButton onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to second page
                  </OriginalButton>
                </Page>
              </DefaultPages>
            </PageState>
          </DialogFullScreen>
        </DialogState>
      </div>
    );
  }, {
    info: {
      text: <p>Allows to slide to different pages in a full screen dialog.</p>,
      propTablesExclude: [OriginalButton, DialogFullScreen, DialogState, PageState, DefaultPages, Page, State]
    }
  });
