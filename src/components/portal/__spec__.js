import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
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
      expect(document.body.innerHTML).toMatchSnapshot();
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

  describe('will manager listeners', () => {
    describe('when NOT given  reposition prop', () => {
      let parentDiv;
      beforeEach(() => {
        spyOn(Browser.getWindow(), 'addEventListener');
        spyOn(Browser.getWindow(), 'removeEventListener');
        spyOn(ReactDOM, 'findDOMNode').and.returnValue(parentDiv);

        parentDiv = Browser.getDocument().createElement('div');
        spyOn(parentDiv, 'addEventListener');
        spyOn(parentDiv, 'removeEventListener');

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

      it('will NOT add window "resize" listener ', () => {
        expect(Browser.getWindow().addEventListener).not.toHaveBeenCalledWith('resize');
      });

      it('will NOT remove window "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(Browser.getWindow().removeEventListener).not.toHaveBeenCalledWith('resize');
      });

      it('will NOT window "scroll" listener ', () => {
        expect(parentDiv.addEventListener).not.toHaveBeenCalled();
      });

      it('will NOT remove "scroll" listener on unnmount', () => {
        wrapper.unmount();
        expect(parentDiv.removeEventListener).not.toHaveBeenCalled();
      });
    });

    describe('when given reposition prop', () => {
      let repositionCb;
      let parentDiv;
      beforeEach(() => {
        repositionCb = jasmine.createSpy('onReposition');
        parentDiv = Browser.getDocument().createElement('div');
        parentDiv.style.overflow = 'auto';

        spyOn(Browser.getWindow(), 'addEventListener');
        spyOn(Browser.getWindow(), 'removeEventListener');
        spyOn(ReactDOM, 'findDOMNode').and.returnValue(parentDiv);
        spyOn(parentDiv, 'addEventListener');
        spyOn(parentDiv, 'removeEventListener');
        wrapper = mount(
          <Portal onReposition={ repositionCb }>
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

      it('will add window "resize" listener ', () => {
        expect(Browser.getWindow().addEventListener).toHaveBeenCalledWith('resize', repositionCb);
      });

      it('will remove "resize" listener on unnmount', () => {
        wrapper.unmount();
        expect(Browser.getWindow().removeEventListener).toHaveBeenCalledWith('resize', repositionCb);
      });

      it('will call window "reposition" callback ', () => {
        expect(repositionCb).toHaveBeenCalled();
      });

      it('will add window "scroll" listener ', () => {
        expect(parentDiv.addEventListener).toHaveBeenCalledWith('scroll', repositionCb);
      });

      it('will remove "scroll" listener on unnmount', () => {
        wrapper.unmount();
        expect(parentDiv.removeEventListener).toHaveBeenCalledWith('scroll', repositionCb);
      });
    });
  });

  it('mount a <p/> tag as child', () => {
    mount(
      <Portal>
        <p>john</p>
      </Portal>
    );

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('will NOT mount with no DOM', () => {
    spyOn(Browser, 'getWindow').and.returnValue(undefined);
    const noDOMWrapper = mount(
      <Portal>
        <Icon
          tooltipMessage='Test'
          tooltipAlign='left'
          tooltipPosition='top'
          type='tick'
        />
      </Portal>
      );
    expect(noDOMWrapper.html()).toBe(null);
  });
});
