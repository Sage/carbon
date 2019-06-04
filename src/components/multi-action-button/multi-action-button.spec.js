import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import MultiActionButton from './multi-action-button.component';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('MultiActionButton', () => {
  describe('tags', () => {
    describe('on component', () => {
      const multiActionButtonSelector = '[data-component="multi-action-button"]';
      const wrapper = shallow(
        <MultiActionButton
          data-element='bar'
          data-role='baz'
          text='Test'
        >
          <Button>Test</Button>
        </MultiActionButton>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find(multiActionButtonSelector), 'multi-action-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(
        <MultiActionButton text='Test'>
          <Button>Test</Button>
        </MultiActionButton>
      );
      wrapper.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper, [
        'additional-buttons',
        'toggle-button'
      ]);
    });
  });
});
