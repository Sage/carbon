import React from 'react';
import GroupedCharacter from './grouped-character';
import { mount, shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('GroupedCharacter', () => {
  let wrapper, input;

  beforeEach(() => {
    wrapper = mount(
      <GroupedCharacter onChange={ jasmine.createSpy('onChange') } groups={ [2, 2, 2] } inputWidth='60' />
    );
    input = wrapper.find('.carbon-grouped-character__input');
  });

  describe('props', () => {
    describe('inputWidth', () => {
      it('sets the input width when passed', () => {
        const commonInput = wrapper.find('.common-input__field');
        // TODO FIGURE OUT WHY % RATHER THAN PX
        expect(commonInput.prop('style').width).toEqual('60%');
      });
    });

    describe('separator custom validation', () => {
      beforeEach(() => {
        spyOn(console, 'error');
        let badWrapper = mount(
          <GroupedCharacter separator={ 22 } groups={ [2, 2, 2] } />
        );
      });

      describe('for a separator that is not a string', () => {
        it('throws an error', () => {
          expect(console.error.calls.argsFor(0)[0]).toContain('Invalid prop separator');
        });
      });
    });
  });

  describe('value formatting', () => {
    describe('the visible value', () => {
      it('is formatted with separators', () => {
        input.simulate('change', { target: { value: '123456', selectionEnd: 8 } });
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.props().value).toEqual('12-34-56');
      });
    });

    describe('custom separators', () => {
      let input;
      let wrapper;

      beforeAll(() => {
        wrapper = mount(
          <GroupedCharacter onChange={ jasmine.createSpy('onChange') } groups={ [2, 4, 4] } separator='/' />
        );

        input = wrapper.find('.carbon-grouped-character__input');
      });

      it('renders the value with custom separator', () => {
        input.simulate('change', { target: { value: '123456789', selectionEnd: 8 } });
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.props().value).toEqual('12/3456/789');
      });
    });

    describe('on initial render when a value is passed in', () => {
      it('renders the value with separators', () => {
        wrapper = mount(
          <GroupedCharacter groups={ [2, 2, 2] } value='123456' />
        );
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.props().value).toEqual('12-34-56');
      });
    });
  });

  describe('key presses', () => {
    describe('when an invalid key is pressed', () => {
      it('prevents the default behaviour and returns the current value and cursor position', () => {
        input.simulate('change', { target: { value: '123456', selectionEnd: 8 } } );
        input.simulate('keydown', { which: 111, key: '/' });
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.props().value).toEqual('12-34-56');
        expect(input.instance().selectionEnd).toEqual(8);
      });
    });
  });

  describe('maximum length', () => {
    describe('when value is already max length', () => {
      it('strips the new character from the value', () => {
        input.simulate('change', { target: { value: '1234567', selectionEnd: 9 } } );
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.instance().value).toEqual('12-34-56');
      });
    });
  });

  describe('cursor position', () => {
    describe('when typing a new character within a group', () => {
      it('leaves the cursor where it was last', () => {
        input.simulate('change', { target: { value: '1', selectionEnd: 1 } });
        input = wrapper.find('.carbon-grouped-character__input');
        expect(input.instance().selectionEnd).toEqual(1);
      });

      describe('when typing a character ending a group', () => {
        it('moves the cursor 1 space to the right', () => {
          input.simulate('change', { target: { value: '12345', selectionEnd: 6 } } );
          expect(input.instance().selectionEnd).toEqual(7);
        });
      });
    });

    describe('when deleting', () => {
      it('leaves the cursor where it was last', () => {
        input.simulate('keydown', { which: 46, key: 'Delete' } )
        input.simulate('change', { target: { value: '12345', selectionEnd: 5 } } );
        expect(input.instance().selectionEnd).toEqual(5);
      });
    });

    describe('when backspacing', () => {
      describe('a character not adjacent to a separator', () => {
        it('leaves the cursor where it was last', () => {
          input.simulate('keydown', { which: 8, key: 'Backspace' } )
          input.simulate('change', { target: { value: '12345', selectionEnd: 7 } } );
          expect(input.instance().selectionEnd).toEqual(7);
        });
      });

      describe('a character following a separator', () => {
        it('moves the cursor one position to the left', () => {
          input.simulate('keydown', { which: 8, key: 'Backspace' } )
          input.simulate('change', { target: { value: '1234', selectionEnd: 6 } } );
          expect(input.instance().selectionEnd).toEqual(5);
        });
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<GroupedCharacter data-element='bar' data-role='baz' groups={ [2, 2, 2] } />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'grouped-character', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <GroupedCharacter
          fieldHelp='test'
          groups={ [2, 2, 2] }
          label='test'
        />
      );

      elementsTagTest(wrapper, [
        'help',
        'input',
        'label'
      ]);
    });
  });
});
