import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import FormField from '.';
import FormFieldStyle from './form-field.style';
import classicTheme from '../../../style/themes/classic';
import Label from '../label/label.component';

function render(props, renderer = shallow) {
  return renderer(
    <FormField { ...props }><input /></FormField>
  );
}

describe('FormField', () => {
  describe('default', () => {
    it('renders children with styling', () => {
      expect(render({}, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe('with a label', () => {
    it('renders the label component above the childen', () => {
      expect(render({
        label: 'Name',
        labelAlign: 'left',
        labelHelp: 'Help me!',
        labelInline: true,
        labelWidth: 20,
        size: 'small'
      }).children()).toMatchSnapshot();
    });

    it('passes the id to the Label htmlFor prop', () => {
      const comp = render({
        name: 'foo',
        label: 'Name'
      });
      expect(comp.find(Label).props().htmlFor).toEqual('foo');
    });
  });

  describe('with fieldHelp', () => {
    describe('default', () => {
      it('renders the FieldHelp component below the childen', () => {
        expect(render({
          fieldHelp: 'Help me!',
          labelInline: true,
          labelWidth: 20
        }).children()).toMatchSnapshot();
      });
    });

    describe('and fieldHelpInline=true', () => {
      it('renders the FieldHelp component below the childen', () => {
        expect(render({
          fieldHelp: 'Help me!',
          fieldHelpInline: true,
          labelInline: true,
          labelWidth: 20
        }).children()).toMatchSnapshot();
      });
    });
  });

  describe('classic theme', () => {
    it('adds custom margin top', () => {
      const wrapper = renderFormFieldStyle({
        theme: classicTheme
      });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    describe('when inline', () => {
      it('renders the FieldHelp component below the childen', () => {
        const wrapper = renderFormFieldStyle({
          inline: true
        });

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

function renderFormFieldStyle(props) {
  return TestRenderer.create(<FormFieldStyle { ...props } />);
}
