import React from 'react';
import { mount, shallow } from 'enzyme';
import Portal from './portal';
import Icon from './../icon';
import Browser from '../../utils/helpers/browser';

describe('Portal', () => {
  let wrapper;
  describe('when using default node', () => {
    beforeEach(() => {
      wrapper = mount(
        <Portal>
          <Icon
            tooltipMessage='Test'
            tooltipAlign='left'
            tooltipPosition='top'
            type='tick'
          />
        </Portal>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('will mount correctly on document', () => {
      expect(document.body.innerHTML).toEqual('<div class="carbon-portal"><span class="carbon-icon icon-tick" type="tick" data-component="icon"></span></div>');
    });

    it('can be able to access Icon', () => {
      expect(wrapper.find(Icon).length).toBe(1);
    });    

    it('will mount second portal', () => {
      const wrapper2 = mount(
        <Portal>
          <Icon
            tooltipMessage='Test'
            tooltipAlign='left'
            tooltipPosition='top'
            type='tick'
          />
        </Portal>
      );
      
      expect(document.body.getElementsByClassName('carbon-portal').length).toEqual(2);
      wrapper2.unmount();
    });

    it('will unmount two portals', () => {
      wrapper.unmount();
      const wrapper2 = mount(
        <Portal>
          <Icon
            tooltipMessage='Test'
            tooltipAlign='left'
            tooltipPosition='top'
            type='tick'
          />
        </Portal>
      );
      wrapper2.unmount();
      expect(document.body.innerHTML).toEqual('');
    });

    it('to match snapshot ', () => {
      expect(wrapper).toMatchSnapshot();
    });

  });

  it('mount a <p/> tag as child', () => {
    const wrapper = mount(
      <Portal>
        <p>john</p>
      </Portal>
    );

    expect(document.body.innerHTML).toEqual('<div class="carbon-portal"><p>john</p></div>');
  });

  it('will NOT mount with no DOM', () => {
    spyOn(Browser, 'getWindow').and.returnValue(undefined);
    const wrapper = mount(
      <Portal>
        <Icon
          tooltipMessage='Test'
          tooltipAlign='left'
          tooltipPosition='top'
          type='tick'
        />
      </Portal>
      );
    expect(wrapper.html()).toBe(null);
  });
});
