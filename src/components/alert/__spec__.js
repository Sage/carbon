import React from 'react';
import { shallow, mount } from 'enzyme';
import Alert from './alert';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Alert', () => {
  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
      const wrapper = mount(
        <Alert
          title='Alert'
          open
        />
      );

      expect(wrapper
        .find('.carbon-dialog.carbon-dialog--alert')
        .exists())
        .toBe(true);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Alert open data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'alert', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(<Alert open title='Test' subtitle='Test' showCloseIcon />);

      elementsTagTest(wrapper, [
        'close',
        'subtitle',
        'title'
      ]);
    });
  });

  describe('keyboard focus', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Alert open title='Test' subtitle='Test' showCloseIcon={ false } />
      );

      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('keydown', () => {
      let ev;

      beforeEach(() => {
        ev = {
          key: 'Tab',
          preventDefault() {}
        };

        spyOn(ev, 'preventDefault');
      });

      it('calls preventDefault when the Tab key is pressed', () => {
        wrapper.instance().onCloseKeyDown(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('does not call preventDefault when the Tab key is not pressed', () => {
        ev.key = 'Enter';
        wrapper.instance().onCloseKeyDown(ev);

        expect(ev.preventDefault).not.toHaveBeenCalled();
      });
    });
  });
});
