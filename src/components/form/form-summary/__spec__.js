import React from 'react';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';

import Icon from './../../icon';

import FormSummary from './form-summary';

describe('<FormSummary />', () => {
  let block = '.carbon-form-summary',
      wrapper;

  describe("errors renders", () => {
    beforeEach(() => wrapper = shallow( <FormSummary errors='1' /> ));

    it("a block for errors if errors are provided", () => {
      expect(wrapper.find(`${block}__error-summary`).length).toEqual(1);
    });

    it("an error icon", () => {
      let icons = wrapper.find(Icon);
      expect(icons.find('[type="error"]').length).toEqual(1);
    });

    it("the correct translation wrapped in the text class", () => {
      let text = wrapper.find(`${block}__text`).text();
      expect(text).toContain('There is 1 error');
    });
  });

  describe("warnings renders", () => {
    beforeEach(() => wrapper = shallow( <FormSummary warnings='1' /> ));

    it("a block for warnings if warnings are provided", () => {
      expect(wrapper.find(`${block}__warning-summary`).length).toEqual(1);
    });

    it("a warning icon", () => {
      let icons = wrapper.find(Icon);
      expect(icons.find('[type="warning"]').length).toEqual(1);
    });

    it("the correct translation wrapped in a class that brings accessible contrast", () => {
      let text = wrapper.find(`${block}__text`).text();
      expect(text).toContain('There is 1 warning');
    });
  });

  describe("errors and warnings renders", () => {
    beforeEach(() => wrapper = shallow( <FormSummary errors='1' warnings='1' /> ));

    it("a block for errors if errors are provided", () => {
      expect(wrapper.find(`${block}__error-summary`).length).toEqual(1);
    });

    it("a block for warnings if warnings are provided", () => {
      expect(wrapper.find(`${block}__warning-summary`).length).toEqual(1);
    });

    it("both icons", () => {
      let icons = wrapper.find(Icon);
      ['error','warning'].forEach(type => expect(icons.find(`[type='${type}']`).length).toEqual(1));
    });

    it("the correct translation", () => {
      let text = wrapper.text();
      expect(text).toContain('There is 1 error');
      expect(text).toContain('and 1 warning');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<FormSummary data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'form-summary', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<FormSummary errors='1' warnings='1' />);

      elementsTagTest(wrapper, [
        'errors',
        'warnings'
      ]);
    });
  });
});
