import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { Pages, Page } from './pages';
import DialogFullScreen from '../dialog-full-screen';
import Heading from '../heading/heading';
import Button from '../button';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

Page.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /page\.js(?!spec)/
);

Pages.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /pages(?!spec)/
);

const store = new Store({
  open: false,
  slideIndex: 0
});

const handleSlide = (ev, pageIndex) => {
  action('slide')(ev);
  store.set({ slideIndex: (pageIndex || 0) });
};

const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};

const handleCancel = () => {
  action('cancel')();
  store.set({ open: false });
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

function makeStory(name, themeSelector) {
  const component = () => {
    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <DialogState>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
          >
            <PageState>
              <Pages
                slideIndex={ store.get('slideIndex') }
              >
                <Page title={ <Heading title='My First Page' /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 1); } }>
                    Go to next page.
                  </Button>
                </Page>

                <Page title={ <Heading title='My Second Page' backLink={ (ev) => { handleSlide(ev, 0); } } /> }>
                  <Button onClick={ (ev) => { handleSlide(ev, 0); } }>
                    Go to previous page.
                  </Button>
                </Page>
              </Pages>
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
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, State]
    }
  };

  return [name, component, metadata];
}

storiesOf('Pages', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
