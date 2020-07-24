import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import FormField from '.';
import FormFieldStyle from './form-field.style';
import classicTheme from '../../../style/themes/classic';
import Label from '../label/label.component';
import { TabContext } from '../../../components/tabs/__internal__/tab';

const setError = jest.fn();
const setWarning = jest.fn();
const setInfo = jest.fn();

function render(props, renderer = shallow) {
  return renderer(
    <FormField { ...props }><input /></FormField>
  );
}

function renderWithContext(props) {
  return mount(
    <TabContext.Provider value={ { setError, setWarning, setInfo } }>
      <FormField { ...props }><input /></FormField>
    </TabContext.Provider>
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
        id: 'foo',
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

    describe('with TabContext', () => {
      it('calls "setError" when has "error" is true', () => {
        renderWithContext({ error: true, id: 'foo' });
        expect(setError).toHaveBeenCalledWith('foo', true);
      });

      it('calls "setWarning" when has "warning" is true', () => {
        renderWithContext({ warning: true, id: 'foo' });
        expect(setWarning).toHaveBeenCalledWith('foo', true);
      });

      it('calls "setInfo" when has "info" is true', () => {
        renderWithContext({ info: true, id: 'foo' });
        expect(setInfo).toHaveBeenCalledWith('foo', true);
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
