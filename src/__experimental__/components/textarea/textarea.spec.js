import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import CharacterCount from './character-count';
import Textarea from '.';
import baseTheme from '../../../style/themes/base';

describe('Textarea', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderTextarea();
  });

  describe('componentDidMount', () => {
    describe('when textarea can be expanded', () => {
      let expandableInstance;

      beforeEach(() => {
        expandableInstance = wrapper.setProps({ expandable: true }).instance();
      });

      it('adds a event listener to the window', () => {
        spyOn(window, 'addEventListener');
        expandableInstance.componentDidMount();
        expect(window.addEventListener).toHaveBeenCalledWith(
          'resize', expandableInstance.expandTextarea
        );
      });

      it('sets the minHeight to the rendered client height', () => {
        expect(expandableInstance.minHeight).toEqual(
          expandableInstance._input.clientHeight
        );
      });

      it('calls expandTextarea', () => {
        spyOn(expandableInstance, 'expandTextarea');
        expandableInstance.componentDidMount();
        expect(expandableInstance.expandTextarea).toHaveBeenCalled();
      });
    });

    describe('when textarea cannot be expanded', () => {
      let unexpandableInstance;

      beforeEach(() => {
        unexpandableInstance = wrapper.setProps({ expandable: false }).instance();
      });

      it('does not setup the textarea for expanding', () => {
        spyOn(window, 'addEventListener');
        spyOn(unexpandableInstance, 'expandTextarea');
        unexpandableInstance.componentDidMount();
        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(unexpandableInstance.expandTextarea).not.toHaveBeenCalled();
      });
    });
  });

  describe('when rendered', () => {
    it('should have a textarea element as it\'s child', () => {
      expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it('should have not a CharacterCount as it\'s child', () => {
      expect(wrapper.find(CharacterCount).exists()).toBe(false);
    });

    it('should render default', () => {
      expect(renderTextarea({}, TestRenderer.create)).toMatchSnapshot();
    });

    describe('and when characterLimit prop is defined', () => {
      beforeEach(() => {
        wrapper.setProps({ characterLimit: '5' });
      });

      it('should have a CharacterCount as it\'s child', () => {
        expect(wrapper.find(CharacterCount).exists()).toBe(true);
      });

      describe('and when warnOverLimit prop is true and a limit is over', () => {
        it('should be styled for warn over limit', () => {
          wrapper.setProps({ warnOverLimit: true, value: 'abcdefg', onChange: jest.fn() });
          assertStyleMatch({
            color: baseTheme.colors.error
          }, wrapper.find(CharacterCount));
        });
      });
    });
  });

  describe('expandTextarea', () => {
    let expandableInstance;
    beforeEach(() => {
      expandableInstance = wrapper.setProps({ expandable: true }).instance();
    });

    describe('when scrollHeight is greater than the min height', () => {
      it('sets the textareas height to fit the content', () => {
        expandableInstance._input = {
          scrollHeight: 100,
          value: 'foo',
          onChange: jest.fn(),
          style: { height: 0 }
        };
        expandableInstance.expandTextarea();
        expect(expandableInstance._input.style.height).toEqual('100px');
      });
    });

    describe('when the scrollHeight is less than the minHeight', () => {
      it('does not update the textarea', () => {
        expandableInstance._input = {
          scrollHeight: 5,
          value: 'foo',
          onChange: jest.fn(),
          style: { height: 0 }
        };
        expandableInstance.minHeight = 20;
        expandableInstance.expandTextarea();
        expect(expandableInstance._input.style.height).toEqual(0);
      });
    });
  });
});

describe('componentWillUnmount', () => {
  beforeEach(() => {
    spyOn(window, 'removeEventListener');
  });

  describe('when textarea can be expanded', () => {
    const tmpWrapper = mount(
      <Textarea
        value='foo'
        onChange={ jest.fn() }
        label='Label'
        expandable
        cols={ 10 }
        rows={ 10 }
        characterLimit='100'
      />
    );

    it('removes the event listener from the window', () => {
      tmpWrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith(
        'resize', jasmine.any(Function)
      );
    });
  });

  describe('when textarea cannot be expanded', () => {
    const tmpWrapper = shallow(
      <Textarea
        id='Dummy Area'
        value='foo'
        onChange={ jest.fn() }
        label='Label'
        cols={ 10 }
        rows={ 10 }
      />
    );

    it('does not remove event listener from the window', () => {
      tmpWrapper.unmount();
      expect(window.removeEventListener).not.toHaveBeenCalled();
    });
  });
});

function renderTextarea(props, renderer = mount) {
  return renderer(<Textarea { ...props } />);
}
