import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from './radio-button';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('RadioButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RadioButton
        name='radiobutton'
        label='radiobutton'
      />
    )
  });

  describe('render', () => {
    it('renders a parent div with a radio button class', () => {
      expect(wrapper.hasClass('carbon-radio-button')).toBeTruthy();
    });

    describe('input', () => {
      it('renders an input with type radiobutton', () => {
        const input = wrapper.find('.carbon-radio-button__input');
        expect(input.props().type).toEqual('radio');
      });

      it('renders a radiobuttonSprite to be used as the visible input', () => {
        expect(wrapper.find('.carbon-radio-button__sprite').length).toEqual(1);
      });
    });

    describe('fieldHelp', () => {
      describe('when reversed', () => {
        it('sets a field help class of reverse', () => {
          wrapper = shallow(
            <RadioButton
              name='radiobutton'
              label='radiobutton'
              reverse={ true }
              fieldHelp='foo'
            />
          );
          expect(wrapper.find('.carbon-radio-button__help-text').length).toEqual(1);
          expect(wrapper.find('.carbon-radio-button__help-text--reverse').length).toEqual(1);
        });

        describe('when inline', () => {
          it('sets a field help class of inline', () => {
            wrapper = shallow(
              <RadioButton
                name='radiobutton'
                label='radiobutton'
                fieldHelpInline={ true }
                reverse={ true }
                fieldHelp='foo'
              />
            );
            expect(wrapper.find('.carbon-radio-button__help-text').length).toEqual(1);
            expect(wrapper.find('.carbon-radio-button__help-text--inline').length).toEqual(1);
          });
        });
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<RadioButton data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'radio-button', 'bar', 'baz');
    });
  });
});
