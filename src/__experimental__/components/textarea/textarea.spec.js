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

  describe('when textarea is rendered with default props', () => {
    let textarea;

    beforeAll(() => {
      wrapper = renderTextarea();
      textarea = wrapper.find('textarea').instance();
    });

    it('the height of the textarea should remain unchanged', () => {
      const expectedScrollHeight = 500;
      const originalHeight = '50px';

      textarea.style.height = originalHeight;
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => expectedScrollHeight);
      window.dispatchEvent(new Event('resize'));
      expect(textarea.style.height).toEqual(originalHeight);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('when the "expandable" prop is set to "true"', () => {
    let textarea, textareaInstance;

    beforeEach(() => {
      wrapper = renderTextarea({ expandable: true });
      textarea = wrapper.find('textarea');
      textareaInstance = textarea.instance();
    });

    it('then on window resize the height of the textarea should be the same as it\'s scrollHeight', () => {
      const expectedScrollHeight = 500;

      jest.spyOn(textareaInstance, 'scrollHeight', 'get').mockImplementation(() => expectedScrollHeight);
      window.dispatchEvent(new Event('resize'));
      expect(textareaInstance.style.height).toEqual(`${expectedScrollHeight}px`);
    });

    it('then on component update the height of the textarea should be the same as it\'s scrollHeight', () => {
      const expectedScrollHeight = 500;

      jest.spyOn(textareaInstance, 'scrollHeight', 'get').mockImplementation(() => expectedScrollHeight);
      wrapper.setProps({ value: 'abc' });
      expect(textareaInstance.style.height).toEqual(`${expectedScrollHeight}px`);
    });
  });

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = renderTextarea();
    });

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
        name='textarea'
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
  return renderer(<Textarea name='textarea' { ...props } />);
}
