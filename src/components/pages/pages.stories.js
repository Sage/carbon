import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { Pages, Page } from './pages';
import DialogFullScreen from '../dialog-full-screen';
import Heading from '../heading/heading';
import Button from '../button/button';

const store = new Store({
  open: false,
  slideIndex: 0
});

const handleSlide = (ev) => {
  action('slide')(ev);
  store.set({ slideIndex: (ev.target.name || 0) });
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


storiesOf('Pages', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, DialogFullScreen, DialogState, PageState, State]
    }
  })
  .add('default', () => {
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
                  <Button onClick={ handleSlide } name='1'>
                    Go to next page.
                  </Button>
                </Page>

                <Page title={ <Heading title='My Second Page' backLink={ handleSlide } /> }>
                  <Button onClick={ handleSlide } name='0'>
                    Go to previous page.
                  </Button>
                </Page>
              </Pages>
            </PageState>
          </DialogFullScreen>
        </DialogState>
      </div>
    );
  }, {
    info: { text: <p>Allows to slide to different pages in a full screen dialog.</p> }
  });
