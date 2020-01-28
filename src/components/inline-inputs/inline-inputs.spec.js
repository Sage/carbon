import React from 'react';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';
import { Row, Column } from '../row';
import Label from '../../__experimental__/components/label';
import Textbox from '../../__experimental__/components/textbox';
import InlineInputs from './inline-inputs.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import LabelStyle from '../../__experimental__/components/label/label.style';
import classicTheme from '../../style/themes/classic';

describe('Inline Inputs', () => {
  let wrapper;

  describe('when a className prop is passed in', () => {
    it('renders with main class', () => {
      const customClass = 'my-custom-class';
      wrapper = render({ className: customClass });
      expect([customClass].every(c => wrapper.hasClass(c))).toBeTruthy();
    });
  });

  describe('when a label prop is passed in', () => {
    const labelText = 'Test Label';

    beforeEach(() => {
      wrapper = render({ label: labelText }, mount);
    });

    it('contains a label with a text specified in that prop', () => {
      const label = wrapper.find(Label);
      expect(label.props().children).toEqual(labelText);
    });

    it('then the label should have specific styles', () => {
      assertStyleMatch({
        fontWeight: 'bold',
        marginRight: '15px',
        width: 'auto'
      }, wrapper, { modifier: `${LabelStyle}` });
    });
  });

  describe('when a label prop is not passed in', () => {
    beforeEach(() => {
      wrapper = render();
    });

    it('does not contain a label', () => {
      const label = wrapper.find(Label);

      expect(label.exists()).toBe(false);
    });
  });

  describe('when the default theme is set', () => {
    const labelText = 'Test Label';

    beforeEach(() => {
      wrapper = render({ label: labelText }, mount);
    });

    it('then the carbon-row CSS class styled elements should have flex-grow set to 1', () => {
      assertStyleMatch({
        flexGrow: '1'
      }, wrapper, { modifier: '.carbon-row' });
    });

    it('then all inputs should have 100% width', () => {
      assertStyleMatch({
        width: '100%'
      }, wrapper, { modifier: 'input' });
    });

    it('then columns should have negative margin to create 1px borders between inputs', () => {
      assertStyleMatch({
        marginLeft: '-1px'
      }, wrapper, { modifier: '.carbon-column + .carbon-column' });
    });
  });

  describe('when the Classic Theme is set', () => {
    const labelText = 'Test Label';

    beforeEach(() => {
      wrapper = renderWithTheme({ carbonTheme: classicTheme, label: labelText });
    });

    it('then the carbon-row CSS class styled elements should have flex-grow set to 0', () => {
      assertStyleMatch({
        flexGrow: '0'
      }, wrapper, { modifier: '.carbon-row' });
    });
  });

  describe('when a gutter prop is passed in', () => {
    const gutterValue = 'medium';

    beforeEach(() => {
      wrapper = render({ gutter: gutterValue }, mount);
    });

    it('then the gutter prop should be passed down to the row component', () => {
      expect(wrapper.find('Row').props().gutter).toEqual(gutterValue);
    });
  });

  describe('when no gutter prop is passed in', () => {
    beforeEach(() => {
      wrapper = render();
    });

    it('then the gutter prop on the row component should be "none"', () => {
      expect(wrapper.find('Row').props().gutter).toEqual('none');
    });
  });

  it('contains a row', () => {
    wrapper = render();
    const row = wrapper.find(Row);
    expect(row.exists()).toBe(true);
  });

  describe('children', () => {
    beforeEach(() => {
      wrapper = render();
    });

    describe('when their are multiple children', () => {
      it('renders its children', () => {
        expect(wrapper.find(Textbox).length).toEqual(2);
      });

      it('wraps all its children in a Column', () => {
        expect(wrapper.find(Column).length).toEqual(2);
      });
    });

    describe('when there is one child', () => {
      beforeEach(() => {
        wrapper.setProps({ children: <Textbox /> });
      });

      it('renders the child', () => {
        expect(wrapper.find(Textbox).length).toEqual(1);
      });

      it('wraps the child in a Column', () => {
        expect(wrapper.find(Column).length).toEqual(1);
      });
    });
  });
});

function render(props = {}, renderer = shallow) {
  return renderer(
    <InlineInputs { ...props }>
      <Textbox />
      <Textbox />
    </InlineInputs>
  );
}

function renderWithTheme(props = {}, renderer = mount) {
  return renderer(
    <ThemeProvider theme={ props.carbonTheme }>
      <InlineInputs { ...props }>
        <Textbox />
        <Textbox />
      </InlineInputs>
    </ThemeProvider>
  );
}
