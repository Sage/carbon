import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { elementsTagTest, rootTagTest } from '../../../../utils/helpers/tags/tags-specs/tags-specs';
import Icon from '../../../../components/icon';
import FormSummary from './form-summary.component';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';

describe('<FormSummary />', () => {
  let wrapper;

  describe('errors renders', () => {
    beforeEach(() => { wrapper = shallow(<FormSummary errors={ 1 } warnings={ 0 } />); });

    it('a block for errors if errors are provided', () => {
      expect(wrapper.find('[data-element="errors"]').length).toEqual(1);
    });

    it('an error icon', () => {
      const icons = wrapper.find(Icon);
      expect(icons.find('[type="error"]').length).toEqual(1);
    });

    it('the correct translation wrapped in the text class', () => {
      const text = wrapper.find('[data-element="errors"]').render().text();
      expect(text).toContain('There is 1 error');
    });
  });

  describe('warnings renders', () => {
    beforeEach(() => { wrapper = shallow(<FormSummary errors={ 0 } warnings={ 1 } />); });

    it('a block for warnings if warnings are provided', () => {
      expect(wrapper.find('[data-element="warnings"]').length).toEqual(1);
    });

    it('a warning icon', () => {
      const icons = wrapper.find(Icon);
      expect(icons.find('[type="warning"]').length).toEqual(1);
    });

    it('the correct translation wrapped in a class that brings accessible contrast', () => {
      const text = wrapper.find('[data-element="warnings"]').render().text();
      expect(text).toContain('There is 1 warning');
    });
  });

  describe('errors and warnings renders', () => {
    beforeEach(() => { wrapper = shallow(<FormSummary errors={ 1 } warnings={ 1 } />); });

    it('a block for errors if errors are provided', () => {
      expect(wrapper.find('[data-element="errors"]').length).toEqual(1);
    });

    it('a block for warnings if warnings are provided', () => {
      expect(wrapper.find('[data-element="warnings"]').length).toEqual(1);
    });

    it('both icons', () => {
      const icons = wrapper.find(Icon);
      ['error', 'warning'].forEach(type => expect(icons.find(`[type='${type}']`).length).toEqual(1));
    });

    it('the correct translation', () => {
      const text = wrapper.render().text();
      expect(text).toContain('There is 1 error');
      expect(text).toContain('and 1 warning');
    });

    it('renders with a default and invalid class', () => {
      wrapper = TestRenderer.create(
        <FormSummary errors={ 1 } warnings={ 0 } />
      );

      assertStyleMatch({
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '13px',
        fontWeight: '700',
        margin: '-8px',
        whiteSpace: 'nowrap',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#F2F4F5',
        marginLeft: '15px'
      }, wrapper.toJSON());
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        wrapper = shallow(<FormSummary data-element='bar' data-role='baz' />);
        rootTagTest(wrapper, 'form-summary', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      wrapper = shallow(<FormSummary errors='1' warnings='1' />);

      elementsTagTest(wrapper, [
        'errors',
        'warnings'
      ]);
    });
  });
});
